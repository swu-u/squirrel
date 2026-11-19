// Dogs: the enemies. createDogs(scene, world, zones, opts) -> { list, group, update(dt, ctx) }
// Each dog runs a small readable state machine:
//   patrol -> notice (0.5 s warning) -> chase -> windup (0.35 s telegraph) -> lunge -> recover (0.9 s opening) -> chase ...
//   chase -> tree (squirrel above: rear up, bark, snap) -> return (lost interest) -> patrol
//   hit: stagger (nut, scratch) / stunned (pounce) ; health 0: flee -> away -> (40 s) -> patrol, calm
//   bulldog only: chase -> chargeWindup -> charge -> recover
import * as THREE from 'three';
import { DogModel } from './dog/model.js';
import { KINDS } from './dog/build.js';
import { createSignals } from './dog/signals.js';
import { makeHit } from '../core/world.js';
import { mulberry32 } from '../core/rng.js';

const CFG = {
  terrier: { walk: 1.7, lungeRange: 3.0, lungeMin: 2.0, lungeMax: 2.7, damage: 1, turn: 7.5, recover: 0.9 },
  shepherd: { walk: 2.2, lungeRange: 3.2, lungeMin: 2.2, lungeMax: 3.0, damage: 1, turn: 6.5, recover: 0.9 },
  bulldog: { walk: 1.5, lungeRange: 2.9, lungeMin: 2.0, lungeMax: 2.6, damage: 2, turn: 5.0, recover: 1.0, charge: 11.5 },
};
const NOTICE_RANGE = 14, NEAR_RANGE = 5, HIGH = 2.2, TREE_H = 1.4, GIVE_UP_H = 9, BITE_R = 0.7, STEP = 0.3;
const TAU = Math.PI * 2;
const clamp = (x, a, b) => (x < a ? a : x > b ? b : x);
const sat = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const angDiff = (a, b) => { let d = (a - b) % TAU; if (d > Math.PI) d -= TAU; if (d < -Math.PI) d += TAU; return d; };

// ---- collision probes (module-level scratch, no allocations)
const _hit = makeHit(), _pt = new THREE.Vector3(), _o = new THREE.Vector3(), _d = new THREE.Vector3();
let _w = null, _px = 0, _py = 0, _pz = 0, _ph = 1, _pr = 0.4, _pMin = 9, _pushed = false;
function solid(pr) {
  if (pr.type === 'box') return pr.kind !== 'awning';
  return pr.type === 'capsule' && (pr.kind === 'trunk' || pr.kind === 'pole');
}
function probeCb(pr) {
  if (!solid(pr) || pr.minY > _py + _ph || pr.maxY < _py + STEP) return;
  _pt.set(_px, clamp(_py + _ph * 0.6, pr.minY + 0.02, pr.maxY - 0.02), _pz);
  _w.primDistance(pr, _pt, _hit);
  if (_hit.dist < _pMin) _pMin = _hit.dist;
}
function pushCb(pr) {
  if (!solid(pr) || pr.minY > _py + _ph || pr.maxY < _py + STEP) return;
  _pt.set(_px, clamp(_py + _ph * 0.6, pr.minY + 0.02, pr.maxY - 0.02), _pz);
  _w.primDistance(pr, _pt, _hit);
  if (_hit.dist >= _pr) return;
  let nx = _hit.normal.x, nz = _hit.normal.z, l = Math.hypot(nx, nz);
  if (l < 0.25) { // on top of / inside something: leave sideways, away from its middle
    nx = _px - (pr.type === 'box' ? pr.cx : (pr.ax + pr.bx) * 0.5); nz = _pz - (pr.type === 'box' ? pr.cz : (pr.az + pr.bz) * 0.5); l = Math.hypot(nx, nz) || 1;
  }
  const push = Math.min(_pr - _hit.dist, 0.5);
  _px += (nx / l) * push; _pz += (nz / l) * push; _pushed = true;
}

export function createDogs(scene, world, zones, opts = {}) {
  const group = new THREE.Group();
  group.name = 'dogs';
  scene.add(group);
  const list = [];
  const respawnTime = opts.respawnTime ?? 40, calmTime = opts.calmTime ?? 25, treePatience = opts.treePatience ?? 30;
  const rng = mulberry32(opts.seed ?? 4242);
  let onEvent = null, frame = 0;
  const emit = (type, dog, data) => { if (onEvent) onEvent(type, dog, data); };
  const ground = (x, z) => world.groundHeight(x, z);

  /** smallest distance from a dog-sized probe at (x, z) to anything solid */
  function clearance(dog, x, z) {
    _w = world; _px = x; _pz = z; _py = ground(x, z); _ph = dog.shoulder; _pMin = 9;
    world.queryPrims(x, z, dog.radius + 0.6, probeCb);
    return _pMin;
  }
  const isFree = (dog, x, z) => clearance(dog, x, z) > dog.radius * 0.8;
  function lineFree(dog, x0, z0, x1, z1) {
    const n = Math.max(2, Math.ceil(Math.hypot(x1 - x0, z1 - z0) / (dog.radius * 1.2)));
    for (let i = 1; i <= n; i++) if (!isFree(dog, x0 + ((x1 - x0) * i) / n, z0 + ((z1 - z0) * i) / n)) return false;
    return true;
  }
  /** move by (dx, dz), sliding along solids; returns true if something was touched */
  function moveBy(dog, dx, dz) {
    const p = dog.position;
    _w = world; _px = p.x + dx; _pz = p.z + dz; _py = p.y; _ph = dog.shoulder; _pr = dog.radius; _pushed = false;
    for (let it = 0; it < 2; it++) world.queryPrims(_px, _pz, dog.radius + 0.6, pushCb);
    const b = world.bounds;
    p.x = clamp(_px, b.minX + 1, b.maxX - 1); p.z = clamp(_pz, b.minZ + 1, b.maxZ - 1);
    p.y = ground(p.x, p.z);
    return _pushed;
  }
  const STEER = [0, 0.55, -0.55, 1.1, -1.1, 1.65, -1.65, 2.3, -2.3];
  /** pick a heading near (dx, dz) that is not blocked; result in dog.sdx / dog.sdz */
  function steer(dog, dx, dz, look) {
    const p = dog.position;
    for (let i = 0; i < STEER.length; i++) {
      const a = STEER[i] * (i === 0 ? 1 : dog.avoidSide);
      const c = Math.cos(a), s = Math.sin(a), x = dx * c + dz * s, z = -dx * s + dz * c;
      if (isFree(dog, p.x + x * look * 0.5, p.z + z * look * 0.5) && isFree(dog, p.x + x * look, p.z + z * look)) {
        if (i > 0 && dog.avoidHold <= 0) { dog.avoidSide = STEER[i] * dog.avoidSide > 0 ? 1 : -1; }
        if (i > 0) dog.avoidHold = 0.8;
        dog.sdx = x; dog.sdz = z; return i === 0;
      }
    }
    dog.sdx = dx; dog.sdz = dz; return false;
  }
  function turnToward(dog, yawT, rate, dt) {
    const d = angDiff(yawT, dog.yaw), step = clamp(d, -rate * dt, rate * dt);
    dog.yaw += step; dog.turnRate = step / dt;
    return d;
  }
  /** steer + turn + accelerate + move. Returns remaining horizontal distance to the target. */
  function moveToward(dog, tx, tz, speed, dt, stopDist = 0.3) {
    const p = dog.position, cfg = dog.cfg;
    let dx = tx - p.x, dz = tz - p.z;
    const dist = Math.hypot(dx, dz);
    if (dist < stopDist) { dog.speed = Math.max(0, dog.speed - 30 * dt); advance(dog, dt); dog.turnRate = 0; return dist; }
    dx /= dist; dz /= dist;
    dog.steerT -= dt; dog.avoidHold -= dt;
    if (dog.steerT <= 0) {
      dog.steerT = 0.07;
      const look = Math.min(dog.radius * 1.4 + dog.speed * 0.22, dist - dog.radius * 0.5);
      if (look > 0.25) steer(dog, dx, dz, look); else { dog.sdx = dx; dog.sdz = dz; }
    }
    const err = turnToward(dog, Math.atan2(dog.sdx, dog.sdz), cfg.turn * (speed > 4 ? 1 : 0.8), dt);
    const want = speed * clamp(Math.cos(err) * 1.15, 0.12, 1) * (dist < 1 ? clamp(dist / 1, 0.35, 1) : 1);
    dog.speed += clamp(want - dog.speed, -26 * dt, (speed > 4 ? 22 : 8) * dt);
    advance(dog, dt);
    return dist;
  }
  function advance(dog, dt) {
    const p = dog.position, ox = p.x, oz = p.z;
    const fx = Math.sin(dog.yaw), fz = Math.cos(dog.yaw);
    dog.blocked = moveBy(dog, fx * dog.speed * dt + dog.kvx * dt, fz * dog.speed * dt + dog.kvz * dt);
    // the speed the feet see = what was really covered (so legs do not run on the spot against a wall)
    const real = ((p.x - ox) * fx + (p.z - oz) * fz) / dt;
    dog.realSpeed = real;
    if (dog.blocked && dog.speed > 1) dog.speed = Math.max(real, dog.speed - 40 * dt);
    dog.velocity.set((p.x - ox) / dt, 0, (p.z - oz) / dt);
  }

  // ---------------------------------------------------------------- spawning
  function findFree(dog, cx, cz, r) {
    for (let i = 0; i < 24; i++) {
      const a = rng() * TAU, d = Math.sqrt(rng()) * r * Math.min(1, 0.25 + i * 0.06);
      const x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d;
      if (clearance(dog, x, z) > dog.radius * 1.15) { _o.set(x, 0, z); return true; }
    }
    _o.set(cx, 0, cz);
    return false;
  }
  function makeDog(zone, index) {
    const kind = KINDS[zone.kind] ? zone.kind : 'terrier';
    const K = KINDS[kind], cfg = CFG[kind];
    const model = new DogModel(kind, list.length + 1 + (opts.seed || 0));
    model.ground = ground;
    const signals = createSignals(K.S, K.health);
    model.group.add(signals.group);
    group.add(model.group);
    const dog = {
      id: list.length, kind, name: (zone.name || kind) + (index ? ' ' + (index + 1) : ''), zone, cfg, K, model, signals,
      group: model.group, position: model.group.position, velocity: new THREE.Vector3(), mouthPosition: new THREE.Vector3(),
      yaw: rng() * TAU, radius: K.radius, shoulder: K.S, height: K.S,
      health: K.health, maxHealth: K.health, alive: true, state: 'patrol', stateTime: 0, stunned: false, vulnerable: false, calm: false,
      damage: cfg.damage, maxSpeed: K.maxSpeed,
      // internals
      speed: 0, realSpeed: 0, turnRate: 0, kvx: 0, kvz: 0, blocked: false, sdx: 0, sdz: 1, steerT: 0, avoidSide: rng() < 0.5 ? 1 : -1, avoidHold: 0,
      wx: 0, wz: 0, hasWp: false, pauseT: 1 + rng() * 2, pauseKind: 'look', wpT: 0,
      senseT: rng() * 0.2, sees: false, lostT: 0, lastX: 0, lastZ: 0, ignoreT: 0, calmT: 0,
      lungeCd: 0, ldx: 0, ldz: 1, lungeDist: 2.5, lungeDur: 0.24, bit: false, dur: 0, chargeCd: 3 + rng() * 2, charged: false,
      barkT: 0, barkN: 0, noLosT: 0, losT: 0, treeT: 0, snapT: 1, snapCheck: -1, stuckT: 0, stuckX: 0, stuckZ: 0, fade: 1, lodAcc: 0, respawnT: 0,
      fleeX: 0, fleeZ: 1,
      hit: (damage, dir, hitKind) => hitDog(dog, damage, dir, hitKind),
    };
    findFree(dog, zone.center.x + (index ? 1.5 : 0), zone.center.z + (index ? 1.0 : 0), Math.min(zone.radius * 0.5, 4));
    dog.position.set(_o.x, ground(_o.x, _o.z), _o.z);
    dog.group.rotation.y = dog.yaw;
    list.push(dog);
    return dog;
  }
  for (const zone of zones) {
    makeDog(zone, 0);
    if (zone.kind === 'terrier' && zone.radius > 10) makeDog(zone, 1);
  }

  // ---------------------------------------------------------------- state machine
  function setState(dog, state) {
    dog.state = state; dog.stateTime = 0;
    dog.stunned = state === 'stunned';
    dog.vulnerable = state === 'recover' || state === 'stunned' || state === 'stagger';
    dog.signals.setStun(dog.stunned);
  }
  function pickWaypoint(dog) {
    const z = dog.zone, p = dog.position;
    for (let i = 0; i < 8; i++) {
      const a = rng() * TAU, d = Math.sqrt(rng()) * z.radius * 0.85;
      const x = z.center.x + Math.cos(a) * d, zz = z.center.z + Math.sin(a) * d;
      if (Math.hypot(x - p.x, zz - p.z) < 1.5) continue;
      if (lineFree(dog, p.x, p.z, x, zz)) { dog.wx = x; dog.wz = zz; dog.hasWp = true; dog.wpT = 0; return true; }
    }
    return false;
  }
  function startPause(dog, long) {
    dog.hasWp = false;
    const r = rng();
    dog.pauseKind = !long ? (r < 0.5 ? 'look' : 'sniff') : r < 0.3 ? 'sniff' : r < 0.52 ? 'look' : r < 0.7 ? 'pant' : r < 0.88 ? 'sit' : 'lie';
    dog.pauseT = dog.pauseKind === 'sit' || dog.pauseKind === 'lie' ? 4 + rng() * 5 : 1.4 + rng() * 2.6;
  }
  function canSense(dog, pl, dx, dz, dist, cone) {
    if (pl.hidden) return false;
    let f = pl.heightAboveGround > HIGH ? 0.5 : 1;
    if (dog.calm) f *= 0.55;
    const dy = pl.position.y - dog.position.y, d3 = Math.hypot(dist, dy);
    if (d3 > NOTICE_RANGE * f) return false;
    if (cone && dist > NEAR_RANGE * f) {
      const a = angDiff(Math.atan2(dx, dz), dog.yaw + dog.model.lookYaw * 0.6);
      if (Math.abs(a) > 1.25) return false;
    }
    // line of sight from the dog's eyes
    _o.set(dog.position.x, dog.position.y + dog.shoulder * 1.15, dog.position.z);
    _d.set(pl.position.x - _o.x, pl.position.y + 0.15 - _o.y, pl.position.z - _o.z);
    const l = _d.length();
    if (l < 1.2) return true;
    _d.multiplyScalar(1 / l);
    return world.raycast(_o, _d, l) > l - 0.9;
  }
  function tryBite(dog, pl, reach) {
    if (dog.bit || pl.invulnerable) return false;
    const m = dog.mouthPosition, p = pl.position;
    const d = Math.hypot(m.x - p.x, m.y - (p.y + 0.12), m.z - p.z);
    if (d > reach) return false;
    dog.bit = true;
    let bx = p.x - dog.position.x, bz = p.z - dog.position.z; const l = Math.hypot(bx, bz) || 1;
    emit('bite', dog, { damage: dog.damage, dir: new THREE.Vector3(bx / l, 0, bz / l) });
    return true;
  }
  function doBark(dog, type = 'bark') { dog.model.bark(); emit(type, dog, null); }

  function hitDog(dog, damage, dir, kind) {
    if (!dog.alive || dog.state === 'flee' || dog.state === 'away') return false;
    if (kind === 'nut' && dog.state === 'charge') { emit('growl', dog, { shrug: true }); return false; }
    let hx = dir ? dir.x : -Math.sin(dog.yaw), hz = dir ? dir.z : -Math.cos(dog.yaw);
    const hl = Math.hypot(hx, hz) || 1; hx /= hl; hz /= hl;
    dog.health = Math.max(0, dog.health - damage);
    dog.signals.setHealth(dog.health, true);
    dog.calm = false; dog.calmT = 0; dog.ignoreT = 0;
    const m = dog.model;
    if (dog.health <= 0) {
      dog.alive = false;
      m.flinch(hx, hz, 1.2); if (kind === 'pounce') m.squash(0.8);
      dog.fleeX = hx; dog.fleeZ = hz; dog.kvx = hx * 3; dog.kvz = hz * 3;
      setState(dog, 'flee');
      emit('yelp', dog, { kind }); emit('flee', dog, null);
      return true;
    }
    emit('hurt', dog, { kind, damage });
    if (kind === 'pounce') { m.squash(1); dog.speed = 0; dog.dur = 2.0; setState(dog, 'stunned'); }
    else if (kind === 'scratch') {
      const wasOpen = dog.state === 'recover' || dog.state === 'stunned';
      m.flinch(hx, hz, 1.3); dog.kvx = hx * 6; dog.kvz = hz * 6; dog.speed = 0;
      dog.dur = wasOpen ? 0.8 : 0.45; dog.lungeCd = wasOpen ? 0.5 : 0.1; setState(dog, 'stagger');
    } else { m.flinch(hx, hz, 1); dog.kvx = hx * 2; dog.kvz = hz * 2; dog.speed *= 0.3; dog.dur = 0.6; dog.lungeCd = Math.max(dog.lungeCd, 0.3); setState(dog, 'stagger'); }
    return true;
  }

  function think(dog, dt, ctx) {
    const pl = ctx.player, p = dog.position, c = dog.model.c, cfg = dog.cfg, K = dog.K, S = dog.shoulder;
    const dx = pl.position.x - p.x, dz = pl.position.z - p.z, dist = Math.hypot(dx, dz);
    const hag = pl.heightAboveGround || 0;
    const zdx = p.x - dog.zone.center.x, zdz = p.z - dog.zone.center.z, zd = Math.hypot(zdx, zdz);
    const leash = dog.zone.radius * 1.5;
    dog.stateTime += dt;
    dog.lungeCd -= dt; dog.chargeCd -= dt; dog.ignoreT -= dt;
    if (dog.calm) { dog.calmT -= dt; if (dog.calmT <= 0) dog.calm = false; }
    // knock-back decays
    const kd = Math.exp(-7 * dt); dog.kvx *= kd; dog.kvz *= kd;
    // periodic sensing
    dog.senseT -= dt;
    if (dog.senseT <= 0) {
      dog.senseT = 0.18;
      const engaged = dog.state !== 'patrol' && dog.state !== 'return' && dog.state !== 'search';
      dog.sees = dog.state === 'away' || dog.state === 'flee' ? false : canSense(dog, pl, dx, dz, dist, !engaged);
      if (engaged && !pl.hidden && dist < 22 && (dog.sees || dist < 6)) { dog.lastX = pl.position.x; dog.lastZ = pl.position.z; dog.lostT = 0; }
    }
    // reset pose controls; each state sets what it needs
    c.sit = c.lie = c.sniff = c.growl = c.alert = c.crouch = c.leap = c.skid = c.rear = c.scrabble = c.stun = c.fear = c.pant = c.wag = c.jaw = c.hackle = c.shake = 0;
    c.lookW = 0; c.leapT = 0;
    const lookAtPlayer = () => { c.look.set(pl.position.x, pl.position.y + 0.15, pl.position.z); c.lookW = 1; };
    const st = dog.state;

    if (st === 'patrol') {
      c.wag = 0.25;
      if (dog.hasWp) {
        dog.wpT += dt;
        const d = moveToward(dog, dog.wx, dog.wz, cfg.walk * (dog.calm ? 0.8 : 1), dt, 0.5);
        if (d < 0.5 || dog.wpT > 9 || (dog.wpT > 1 && dog.blocked && dog.realSpeed < 0.3)) startPause(dog, d < 0.5);
      } else {
        dog.speed = Math.max(0, dog.speed - 12 * dt); advance(dog, dt); dog.turnRate = 0;
        dog.pauseT -= dt;
        const k = dog.pauseKind;
        if (k === 'sniff') c.sniff = 1; else if (k === 'sit') { c.sit = 1; c.pant = 0.8; } else if (k === 'lie') { c.lie = 1; } else if (k === 'pant') { c.pant = 1; c.wag = 0.6; }
        if (dog.pauseT <= 0) { if (!pickWaypoint(dog)) dog.pauseT = 1; }
      }
      if (dog.sees && dog.ignoreT <= 0) { setState(dog, 'notice'); dog.dur = dog.calm ? 1.0 : 0.5; dog.signals.notice(); doBark(dog, 'notice'); dog.lastX = pl.position.x; dog.lastZ = pl.position.z; dog.lostT = 0; }
    } else if (st === 'notice') {
      c.alert = 1; lookAtPlayer(); c.hackle = 0.4;
      dog.speed = Math.max(0, dog.speed - 20 * dt); advance(dog, dt);
      turnToward(dog, Math.atan2(dx, dz), 3.5, dt);
      if (dog.stateTime >= dog.dur) { setState(dog, 'chase'); dog.barkT = 0.6; dog.stuckT = 0; dog.stuckX = p.x; dog.stuckZ = p.z; }
    } else if (st === 'chase') {
      c.hackle = 0.6; c.growl = 0.15; lookAtPlayer();
      dog.lostT += dt;
      const high = hag > TREE_H;
      const tx = pl.hidden ? dog.lastX : pl.position.x, tz = pl.hidden ? dog.lastZ : pl.position.z;
      const td = Math.hypot(tx - p.x, tz - p.z);
      const facing = Math.abs(angDiff(Math.atan2(dx, dz), dog.yaw));
      moveToward(dog, tx, tz, dog.maxSpeed, dt, high ? 0.9 : dog.radius + 0.25);
      dog.barkT -= dt;
      if (dog.barkT <= 0) { dog.barkT = 1.1 + rng() * 1.2; doBark(dog); }
      // stuck against something for a while: give up
      if (Math.hypot(p.x - dog.stuckX, p.z - dog.stuckZ) > 1.2) { dog.stuckX = p.x; dog.stuckZ = p.z; dog.stuckT = 0; } else dog.stuckT += dt;
      if (zd > leash || dog.lostT > (pl.hidden ? 1.5 : 4) || (dog.stuckT > 4 && td > 3.5) || hag > GIVE_UP_H) {
        if (pl.hidden && zd <= leash) { setState(dog, 'search'); } else giveUp(dog);
      } else if (high) {
        if (td < 1.7 || (dog.blocked && td < 3.2)) { setState(dog, 'tree'); dog.treeT = 0; dog.noLosT = 0; dog.barkN = 0; dog.barkT = 0.3; dog.snapT = 0.7; }
      } else if (!pl.hidden) {
        if (cfg.charge && dog.chargeCd <= 0 && dist > 5 && dist < 10 && facing < 0.3 && lineFree(dog, p.x, p.z, p.x + (dx / dist) * (dist - 0.8), p.z + (dz / dist) * (dist - 0.8))) {
          setState(dog, 'chargeWindup'); emit('growl', dog, { charge: true });
        } else if (dist < cfg.lungeRange && dog.lungeCd <= 0 && facing < 0.6) { setState(dog, 'windup'); emit('growl', dog, null); }
      }
    } else if (st === 'windup') {
      c.crouch = 1; c.hackle = 1; lookAtPlayer();
      dog.speed = Math.max(0, dog.speed - 34 * dt); advance(dog, dt);
      turnToward(dog, Math.atan2(dx, dz), 5, dt);
      if (dog.stateTime >= 0.35) {
        // commit: direction and length are fixed now, the squirrel can still dodge sideways
        const lx = dx + pl.velocity.x * 0.08, lz = dz + pl.velocity.z * 0.08, l = Math.hypot(lx, lz) || 1;
        dog.ldx = lx / l; dog.ldz = lz / l; dog.yaw = Math.atan2(dog.ldx, dog.ldz);
        dog.lungeDist = clamp(dist - K.L * K.S * 0.2 + 0.3, cfg.lungeMin, cfg.lungeMax); dog.lungeDur = 0.24; dog.bit = false;
        setState(dog, 'lunge'); emit('lunge', dog, null);
      }
    } else if (st === 'lunge') {
      const tt = sat(dog.stateTime / dog.lungeDur);
      c.leap = 1; c.leapT = tt; c.hackle = 1; lookAtPlayer();
      const v = (dog.lungeDist / dog.lungeDur) * (Math.PI / 2) * Math.sin(Math.PI * tt);
      dog.speed = v; dog.turnRate = 0; advance(dog, dt);
      if (tt > 0.2 && hag < S * 1.2) tryBite(dog, pl, BITE_R);
      if (tt >= 1 || (dog.blocked && dog.realSpeed < 1)) { dog.dur = cfg.recover; dog.speed = Math.min(dog.speed, 4.5); setState(dog, 'recover'); }
    } else if (st === 'recover') {
      const tt = dog.stateTime;
      c.skid = sat(1 - tt / 0.4); c.pant = sat((tt - 0.2) * 4); c.sniff = 0.15;
      dog.speed = Math.max(0, dog.speed - 14 * dt); dog.turnRate = 0; advance(dog, dt);
      if (tt >= dog.dur) { dog.lungeCd = 0.55 + rng() * 0.4; setState(dog, 'chase'); dog.barkT = 0.4; dog.stuckT = 0; }
    } else if (st === 'chargeWindup') {
      c.crouch = 0.55; c.growl = 1; c.hackle = 1; lookAtPlayer();
      dog.speed = Math.max(0, dog.speed - 30 * dt); advance(dog, dt);
      turnToward(dog, Math.atan2(dx, dz), 4, dt);
      if (dog.stateTime >= 0.6) { dog.ldx = dx / (dist || 1); dog.ldz = dz / (dist || 1); dog.yaw = Math.atan2(dog.ldx, dog.ldz); dog.bit = false; dog.dur = clamp((dist + 2.5) / cfg.charge, 0.6, 1.25); setState(dog, 'charge'); emit('lunge', dog, { charge: true }); }
    } else if (st === 'charge') {
      c.hackle = 1; c.growl = 0.6; lookAtPlayer();
      // a charging bulldog barely steers
      turnToward(dog, Math.atan2(dx, dz), 0.7, dt);
      dog.speed += clamp(cfg.charge - dog.speed, -20 * dt, 40 * dt); advance(dog, dt);
      if (hag < S * 1.1) { if (tryBite(dog, pl, BITE_R + 0.25)) dog.stateTime = Math.max(dog.stateTime, dog.dur - 0.12); }
      if (dog.blocked && dog.realSpeed < 3 && dog.stateTime > 0.15) { // ran into something solid: dazed
        dog.model.squash(0.5); dog.speed = 0; dog.kvx = -dog.ldx * 3; dog.kvz = -dog.ldz * 3; dog.dur = 1.3; dog.chargeCd = 6; setState(dog, 'stunned'); emit('hurt', dog, { kind: 'bonk', damage: 0 });
      } else if (dog.stateTime >= dog.dur) { dog.dur = 1.25; dog.chargeCd = 6 + rng() * 3; setState(dog, 'recover'); }
    } else if (st === 'tree') {
      lookAtPlayer(); c.hackle = 0.5;
      dog.treeT += dt; dog.lostT += dt;
      const under = dist < 1.9 || (dog.blocked && dist < 3.4);
      const watch = dog.treeT > 14 && hag > S * 1.5 + 0.8; // settles down to sit and watch after a while
      if (!under) { moveToward(dog, pl.position.x, pl.position.z, dog.maxSpeed * clamp(dist / 5, 0.35, 0.9), dt, 0.9); }
      else {
        dog.speed = Math.max(0, dog.speed - 25 * dt); advance(dog, dt);
        if (dist > 0.25) turnToward(dog, Math.atan2(dx, dz), 5, dt);
        if (watch) { c.sit = 1; c.pant = 0.6; }
        else {
          c.rear = 1; c.scrabble = 1; c.alert = 1;
          // distance to whatever is in front (trunk, wall) so the paws land on it
          _px = p.x + Math.sin(dog.yaw) * S * 0.5; _pz = p.z + Math.cos(dog.yaw) * S * 0.5;
          const cl = clearance(dog, _px, _pz);
          c.rearDist = clamp(S * 0.5 + (cl > 8 ? S * 0.3 : cl), S * 0.4, S * 0.95);
          // snap upwards when the squirrel is within reach
          dog.snapT -= dt;
          if (dog.snapT <= 0 && hag < S * 1.5 + 0.6 && dist < 1.6) { dog.snapT = 1.2 + rng() * 0.6; dog.snapCheck = 0.3; dog.bit = false; dog.model.hop(0.3); emit('lunge', dog, { up: true }); }
        }
      }
      if (dog.snapCheck > 0) { dog.snapCheck -= dt; c.jaw = 0.8; if (dog.snapCheck < 0.2 && hag < S * 1.5 + 0.35) tryBite(dog, pl, BITE_R); }
      // bark in bursts: woof woof (woof) ... pause
      dog.barkT -= dt;
      if (dog.barkT <= 0 && dog.snapCheck <= 0) {
        doBark(dog); dog.barkN++;
        if (dog.barkN >= (watch ? 1 : 2 + (rng() < 0.4 ? 1 : 0))) { dog.barkN = 0; dog.barkT = (watch ? 2.2 : 0.75) + rng() * 0.7; } else dog.barkT = 0.3;
      }
      dog.losT -= dt;
      if (dog.losT <= 0) { dog.losT = 0.25; if (dog.sees) dog.noLosT = 0; else dog.noLosT += 0.25; }
      if (hag < TREE_H - 0.3) { setState(dog, 'chase'); dog.stuckT = 0; dog.lungeCd = Math.max(dog.lungeCd, 0.3); }
      else if (dog.noLosT > 8 || hag > GIVE_UP_H || zd > leash || (pl.hidden && dog.lostT > 2) || dog.treeT > treePatience) giveUp(dog);
    } else if (st === 'search') {
      const d = moveToward(dog, dog.lastX, dog.lastZ, cfg.walk * 1.6, dt, 0.8);
      if (d < 0.9 || dog.blocked) c.sniff = 1;
      if (dog.sees) { setState(dog, 'chase'); dog.stuckT = 0; }
      else if (dog.stateTime > 4.5 || zd > leash) giveUp(dog);
    } else if (st === 'return') {
      c.wag = 0.1;
      if (!dog.hasWp && !pickWaypoint(dog)) { dog.wx = dog.zone.center.x; dog.wz = dog.zone.center.z; dog.hasWp = true; }
      const d = moveToward(dog, dog.wx, dog.wz, cfg.walk * 1.35, dt, 0.6);
      if (d < 0.7 || dog.stateTime > 14) { setState(dog, 'patrol'); startPause(dog, false); }
      else if (dog.sees && dog.ignoreT <= 0 && zd < dog.zone.radius * 1.2) { setState(dog, 'notice'); dog.dur = 0.5; dog.signals.notice(); doBark(dog, 'notice'); }
    } else if (st === 'stagger') {
      c.shake = sat(1 - dog.stateTime / dog.dur) ; c.fear = 0.4;
      dog.speed = Math.max(0, dog.speed - 20 * dt); dog.turnRate = 0; advance(dog, dt);
      if (dog.stateTime >= dog.dur) { setState(dog, 'chase'); dog.stuckT = 0; dog.lostT = 0; dog.lastX = pl.position.x; dog.lastZ = pl.position.z; }
    } else if (st === 'stunned') {
      c.stun = 1;
      dog.speed = 0; dog.turnRate = 0; advance(dog, dt);
      if (dog.stateTime >= dog.dur) { setState(dog, 'chase'); dog.stuckT = 0; dog.lostT = 0; dog.lungeCd = 0.5; dog.lastX = pl.position.x; dog.lastZ = pl.position.z; }
    } else if (st === 'flee') {
      c.fear = 1;
      // run away from the squirrel, out of the zone, and fade out
      let ax = -dx, az = -dz; const al = Math.hypot(ax, az);
      if (al > 0.5 && al < 25) { ax /= al; az /= al; dog.fleeX += (ax - dog.fleeX) * Math.min(1, dt * 2); dog.fleeZ += (az - dog.fleeZ) * Math.min(1, dt * 2); }
      if (dog.stateTime > 0.25) moveToward(dog, p.x + dog.fleeX * 20, p.z + dog.fleeZ * 20, dog.maxSpeed * 1.05, dt, 0.1);
      else { dog.speed = 0; advance(dog, dt); }
      dog.fade = sat((3.4 - dog.stateTime) / 1.0);
      if (dog.stateTime > 3.4) { setState(dog, 'away'); dog.respawnT = respawnTime; dog.group.visible = false; dog.signals.hide(); dog.speed = 0; dog.velocity.set(0, 0, 0); }
    } else if (st === 'away') {
      dog.respawnT -= dt;
      if (dog.respawnT <= 0) {
        findFree(dog, dog.zone.center.x, dog.zone.center.z, dog.zone.radius * 0.6);
        p.set(_o.x, ground(_o.x, _o.z), _o.z);
        dog.health = dog.maxHealth; dog.alive = true; dog.calm = true; dog.calmT = calmTime; dog.fade = 0; dog.group.visible = true;
        dog.model.resetFeet(); dog.kvx = dog.kvz = 0; dog.ignoreT = 2;
        setState(dog, 'patrol'); startPause(dog, false);
        emit('return', dog, null);
      }
    }
    if (dog.alive && dog.fade < 1) dog.fade = Math.min(1, dog.fade + dt * 0.9);
  }
  function giveUp(dog) {
    dog.hasWp = false; dog.ignoreT = 2.5;
    setState(dog, 'return');
    emit('growl', dog, { giveUp: true });
  }

  function update(dt, ctx) {
    if (dt <= 0) return;
    dt = Math.min(dt, 0.05);
    onEvent = ctx.onEvent || null;
    frame++;
    const pl = ctx.player;
    for (let i = 0; i < list.length; i++) {
      const dog = list[i];
      think(dog, dt, ctx);
    }
    // dogs push apart from each other
    for (let i = 0; i < list.length; i++) {
      const a = list[i];
      if (a.state === 'away') continue;
      for (let j = i + 1; j < list.length; j++) {
        const b = list[j];
        if (b.state === 'away') continue;
        const dx = b.position.x - a.position.x, dz = b.position.z - a.position.z, rr = a.radius + b.radius;
        const d2 = dx * dx + dz * dz;
        if (d2 >= rr * rr) continue;
        const d = Math.sqrt(d2) || 0.001, push = (rr - d) * 0.5 * Math.min(1, dt * 12);
        const nx = d > 0.01 ? dx / d : 1, nz = d > 0.01 ? dz / d : 0;
        moveBy(a, -nx * push, -nz * push); moveBy(b, nx * push, nz * push);
      }
    }
    for (let i = 0; i < list.length; i++) {
      const dog = list[i];
      if (dog.state === 'away') continue;
      const m = dog.model, p = dog.position;
      dog.group.rotation.y = dog.yaw;
      m.c.speed = dog.realSpeed; m.c.turn = dog.turnRate;
      // far dogs animate at a lower rate
      const dc = Math.hypot(p.x - pl.position.x, p.z - pl.position.z);
      const every = dc > 75 ? 4 : dc > 42 ? 2 : 1;
      dog.lodAcc += dt;
      if ((frame + i) % every === 0) { m.update(dog.lodAcc, ctx.time); dog.lodAcc = 0; }
      m.setFade(dog.fade);
      const ml = m.mouthLocal, cy = Math.cos(dog.yaw), sy = Math.sin(dog.yaw);
      dog.mouthPosition.set(p.x + ml.x * cy + ml.z * sy, p.y + ml.y, p.z - ml.x * sy + ml.z * cy);
      dog.height = dog.shoulder * (1 + 0.5 * m.s.rear - 0.4 * m.s.lie - 0.25 * Math.max(0, m.sq));
      dog.signals.update(dt, m.headTopLocal);
    }
  }

  return { list, group, update };
}
