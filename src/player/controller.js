// The squirrel's movement: sticks to the nearest surface of the collision world and runs on
// anything (ground, trunks, branches, wires, walls, roofs), with assisted leaps between them.
import * as THREE from 'three';
import { makeHit } from '../core/world.js';

const UP = new THREE.Vector3(0, 1, 0);
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

export const TUNE = {
  runSpeed: 8.2, climbSpeed: 6.0, wireSpeed: 7.0, burstMul: 1.55, burstTime: 1.7,
  accel: 70, turnRate: 17,
  gravity: 27, jumpUp: 8.2, maxLeap: 7.6, maxLeapUp: 3.4, maxLaunch: 15.5,
  chargeTime: 0.85, step: 0.06,
};

const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _c = new THREE.Vector3(), _d = new THREE.Vector3();
const _p = new THREE.Vector3(), _q = new THREE.Vector3(), _m = new THREE.Matrix4();
const _tq = new THREE.Quaternion(), _n0 = new THREE.Vector3();
const _x = new THREE.Vector3(), _y = new THREE.Vector3(), _z = new THREE.Vector3();

function projectOnPlane(v, n) { return v.addScaledVector(n, -v.dot(n)); }

export class Player {
  constructor(world) {
    this.world = world;
    this.pos = new THREE.Vector3();
    this.normal = new THREE.Vector3(0, 1, 0);
    this.heading = new THREE.Vector3(0, 0, 1);
    this.vel = new THREE.Vector3();
    this.mode = 'air';
    this.prim = null;
    this.primT = 0;
    this.speed = 0;
    this.steepW = 0;         // 0 ground-like mapping .. 1 wall-like mapping
    this.thin = 0;
    this.turn = 0;
    this.airTime = 0;
    this.surfaceTime = 0;
    this.stillTime = 0;
    this.alert = 0;
    this.charge = 0;
    this.burstLeft = 0;
    this.jumpBuffer = 0;
    this.atTip = false;
    this.edge = false;
    this.invuln = 0;
    this.stun = 0;
    this.launchPrim = null;
    this.assist = null;       // {point, T, prim} while flying an assisted leap
    this.target = { valid: false, point: new THREE.Vector3(), normal: new THREE.Vector3(0, 1, 0), prim: null, extra: null };
    this.extraTargets = null; // function(cb) supplied by the game: cb(point, radius, ref) for dogs etc.
    this.events = [];
    this.rightSign = 1;
    this.latchValid = false; this.latchDir = new THREE.Vector3(); this.latchStick = 0; this.stickTravel = 0;
    this.forkCooldown = 0;
    this.wishMag = 0;
    this.wishT = new THREE.Vector3();
    this.wishWorld = new THREE.Vector3();
    this.heightAboveGround = 0;
    // smoothed transform for rendering
    this.visPos = new THREE.Vector3();
    this.visQuat = new THREE.Quaternion();
    this._targetQuat = new THREE.Quaternion();
    this._hit = makeHit(); this._hit2 = makeHit(); this._hit3 = makeHit();
    this._lastHeading = new THREE.Vector3(0, 0, 1);
  }

  get hidden() { return this.alert > 0.75 && this.heightAboveGround > 1.5; }
  get bursting() { return this.burstLeft > 0; }

  teleport(p, facing) {
    this.pos.copy(p); this.vel.set(0, 0, 0); this.mode = 'air'; this.prim = null; this.speed = 0; this.assist = null;
    this.normal.set(0, 1, 0);
    if (facing) this.heading.copy(facing).setY(0).normalize();
    this.visPos.copy(p);
    this.airTime = 0; this.stillTime = 0; this.alert = 0; this.charge = 0; this.burstLeft = 0;
  }

  knock(dir, strength = 7) {
    this.mode = 'air'; this.assist = null; this.launchPrim = null; this.prim = null;
    this.vel.copy(dir).setY(0);
    if (this.vel.lengthSq() < 1e-4) this.vel.copy(this.heading).multiplyScalar(-1).setY(0);
    this.vel.normalize().multiplyScalar(strength); this.vel.y = 6.5;
    this.pos.addScaledVector(this.normal, 0.12);
    this.airTime = 0; this.invuln = 1.6; this.burstLeft = 0;
  }

  bounce(vy = 9, keep = 0.6) {
    this.mode = 'air'; this.assist = null; this.launchPrim = null; this.prim = null;
    this.vel.x *= keep; this.vel.z *= keep; this.vel.y = vy; this.airTime = 0;
  }

  // ---------------------------------------------------------------- input mapping
  _computeWish(input, camYaw) {
    const n = this.normal;
    const mx = input.moveX, my = input.moveY;
    const mag = Math.min(1, Math.hypot(mx, my));
    this.wishMag = mag < 0.08 ? 0 : mag;
    const fx = -Math.sin(camYaw), fz = -Math.cos(camYaw);
    const rx = -fz, rz = fx; // right = forward rotated -90deg about Y
    this.wishWorld.set(rx * mx + fx * my, 0, rz * mx + fz * my);
    // steepness weight
    let w;
    if (n.y >= 0) w = clamp((0.78 - n.y) / 0.3, 0, 1); else w = clamp((n.y + 0.75) / 0.3, 0, 1);
    this.steepW = w;
    if (this.wishMag === 0) { this.wishT.set(0, 0, 0); this.latchValid = false; return; }
    // ground-style: camera-relative vector projected on the tangent plane
    const g = _a.copy(this.wishWorld); projectOnPlane(g, n);
    if (g.lengthSq() > 1e-6) g.normalize(); else g.set(0, 0, 0);
    if (w > 0) {
      // wall-style: stick up = up the surface, stick right = screen right along the surface
      const upT = _b.copy(UP); projectOnPlane(upT, n);
      if (upT.lengthSq() < 1e-6) upT.copy(this.heading); upT.normalize();
      const rT = _c.crossVectors(upT, n).normalize();
      const sd = rT.x * rx + rT.z * rz;
      if (Math.abs(sd) > 0.25) this.rightSign = sd > 0 ? 1 : -1;
      const c = _d.copy(upT).multiplyScalar(my).addScaledVector(rT, mx * this.rightSign);
      if (c.lengthSq() > 1e-6) c.normalize();
      g.lerp(c, w);
      if (g.lengthSq() > 1e-6) g.normalize();
    }
    // Latching: while the stick is held, the direction of travel is carried across changes of
    // surface (over a roof edge, from wall to ground...) instead of being re-read from the camera,
    // and the stick steers relative to it. On flat ground it follows the camera as usual.
    const ang = Math.atan2(my, mx);
    const L = this.latchDir;
    if (!this.latchValid || g.lengthSq() < 1e-6) { L.copy(g); this.latchValid = g.lengthSq() > 1e-6; this.stickTravel = 9; }
    else {
      let da = ang - this.latchStick;
      if (da > Math.PI) da -= 2 * Math.PI; else if (da < -Math.PI) da += 2 * Math.PI;
      this.stickTravel += Math.abs(da);
      projectOnPlane(L, n);
      if (L.lengthSq() < 1e-6) L.copy(g); else L.normalize();
      if (da !== 0) L.applyAxisAngle(n, da * (n.y > 0.5 ? 1 : this.rightSign));
      const agree = L.dot(g);
      if (n.y > 0.9) {
        if (agree > 0.2 || this.stickTravel > 0.6) { if (agree > 0.97 || this.stickTravel > 0.6) L.copy(g); else L.lerp(g, 0.25).normalize(); }
      } else if (input.lookActive && agree > 0) L.lerp(g, 0.3).normalize();
    }
    this.latchStick = ang;
    this.wishT.copy(L);
  }

  // carry heading and latched direction across a change of surface normal
  _transport(nOld, nNew) {
    if (nOld.dot(nNew) > 0.9995) return;
    _tq.setFromUnitVectors(nOld, nNew);
    this.heading.applyQuaternion(_tq);
    if (this.latchValid) { this.latchDir.applyQuaternion(_tq); if (nOld.dot(nNew) < 0.8) this.stickTravel = 0; }
  }

  // ---------------------------------------------------------------- main update
  update(dt, input, camYaw) {
    this.events.length = 0;
    dt = Math.min(dt, 0.05);
    if (this.invuln > 0) this.invuln -= dt;
    if (this.forkCooldown > 0) this.forkCooldown -= dt;
    if (input.jumpPressed) this.jumpBuffer = 0.16; else if (this.jumpBuffer > 0) this.jumpBuffer -= dt;
    if (this.stun > 0) { this.stun -= dt; input = NO_INPUT; }
    this._computeWish(input, camYaw);
    this._lastHeading.copy(this.heading);

    if (this.mode === 'surface') this._updateSurface(dt, input);
    else this._updateAir(dt, input);

    // keep inside the world
    const b = this.world.bounds;
    this.pos.x = clamp(this.pos.x, b.minX, b.maxX); this.pos.z = clamp(this.pos.z, b.minZ, b.maxZ);
    this.heightAboveGround = this.pos.y - this.world.groundHeight(this.pos.x, this.pos.z);

    // still / alert / burst charge
    const still = this.mode === 'surface' && this.speed < 0.05 && this.wishMag === 0;
    if (still) {
      this.stillTime += dt;
      this.alert = clamp((this.stillTime - 0.12) / 0.4, 0, 1);
      const before = this.charge;
      this.charge = clamp(this.stillTime / TUNE.chargeTime, 0, 1);
      if (before < 1 && this.charge >= 1) this.events.push({ type: 'charged' });
    } else {
      if (this.stillTime > 0 && this.mode === 'surface' && this.wishMag > 0) {
        if (this.charge >= 1) { this.burstLeft = TUNE.burstTime; this.events.push({ type: 'burst' }); }
        else this.events.push({ type: 'start' });
      }
      this.stillTime = 0; this.charge = 0;
      this.alert = Math.max(0, this.alert - dt * 9);
    }
    if (this.burstLeft > 0) this.burstLeft -= dt;

    // turn rate (signed, about the normal) for the model
    _a.crossVectors(this._lastHeading, this.heading);
    const tr = clamp(_a.dot(this.normal), -1, 1) / Math.max(dt, 1e-4);
    this.turn += (clamp(tr, -12, 12) - this.turn) * Math.min(1, dt * 12);

    this._updateVisual(dt);
  }

  // ---------------------------------------------------------------- surface
  _updateSurface(dt, input) {
    const world = this.world, hit = this._hit;
    this.surfaceTime += dt;
    this.atTip = false; this.edge = false;
    const prim = this.prim;
    const isCap = prim && prim.type === 'capsule';
    const railLike = isCap && Math.abs(prim.dy) < 0.82;
    const rNow = isCap ? prim.ra + (prim.rb - prim.ra) * clamp(this.primT, 0, 1) : 1;
    this.thin += ((isCap && rNow < 0.09 ? 1 : isCap && rNow < 0.16 ? 0.5 : 0) - this.thin) * Math.min(1, dt * 10);

    let moveMag = this.wishMag;
    const moveDir = _x.copy(this.wishT);
    let faceOnly = false;

    if (railLike && moveMag > 0) {
      const ax = _y.set(prim.dx, prim.dy, prim.dz);
      // fork assist: hop onto a touching limb that matches the stick better
      if (this.forkCooldown <= 0) this._tryFork(moveDir, ax);
      const pr = this.prim; ax.set(pr.dx, pr.dy, pr.dz);
      const along = moveDir.dot(ax);
      if (Math.abs(along) > 0.42) moveDir.copy(ax).multiplyScalar(along > 0 ? 1 : -1);
      else faceOnly = true;
    }

    // speed
    let maxSp = TUNE.runSpeed + (TUNE.climbSpeed - TUNE.runSpeed) * this.steepW;
    if (this.thin > 0.5) maxSp = Math.min(maxSp, TUNE.wireSpeed);
    if (this.burstLeft > 0) maxSp *= 1 + (TUNE.burstMul - 1) * clamp(this.burstLeft / 0.45, 0, 1);
    const targetSpeed = faceOnly ? 0 : moveMag * maxSp;
    if (targetSpeed > this.speed) this.speed = Math.min(targetSpeed, this.speed + TUNE.accel * dt);
    else if (moveMag === 0 || faceOnly) this.speed = this.speed < 3 ? 0 : Math.max(0, this.speed - 140 * dt); // stop dead
    else this.speed = Math.max(targetSpeed, this.speed - 40 * dt);

    // heading
    if (moveMag > 0) {
      const h = this.heading;
      const d = h.dot(moveDir);
      if (d < -0.6 || this.speed < 1.5) h.copy(moveDir);
      else { h.lerp(moveDir, Math.min(1, TUNE.turnRate * dt)); projectOnPlane(h, this.normal); if (h.lengthSq() < 1e-6) h.copy(moveDir); h.normalize(); }
    }

    // jump (pressed, buffered, or free-running with the button held)
    let wantJump = this.jumpBuffer > 0;
    if (!wantJump && input.jumpHeld && this.surfaceTime > 0.11 && moveMag > 0 && this.target.valid) wantJump = true;
    this._findTarget();
    // pushing the stick sideways off a limb, or onward at a tip, toward a perch: hop there without needing the button
    if ((faceOnly || this.wasTip) && moveMag > 0.5 && this.target.valid) { this.pushTime = (this.pushTime || 0) + dt; if (this.pushTime > 0.24) wantJump = true; }
    else this.pushTime = 0;
    if (wantJump && this.surfaceTime > 0.03) { this._jump(); return; }

    // move in small steps, re-projecting onto the nearest surface each step
    let dist = this.speed * dt;
    const steps = Math.max(1, Math.ceil(dist / TUNE.step));
    const sl = dist / steps;
    for (let i = 0; i < steps && dist > 0; i++) {
      _p.copy(this.pos).addScaledVector(this.heading, sl);
      if (!world.nearest(_p, 0.6, hit) || hit.dist > 0.4) {
        // nothing under the feet any more: we ran off into the air
        this.mode = 'air'; this.vel.copy(this.heading).multiplyScalar(this.speed); this.airTime = 0; this.assist = null; this.launchPrim = this.prim;
        this.events.push({ type: 'fall' });
        return;
      }
      const np = hit.prim;
      // end caps of limbs: a tip. stop there.
      if (np.type === 'capsule' && (hit.t < 0 || hit.t > 1)) {
        const s = hit.t < 0 ? -1 : 1;
        const out = (hit.normal.x * np.dx + hit.normal.y * np.dy + hit.normal.z * np.dz) * s;
        if (out > 0.55) { this.atTip = true; this.speed = 0; break; }
      }
      // overhangs on boxes: try to scramble over, otherwise stop
      if (np.type === 'box' && hit.normal.y < -0.45) {
        if (this._vault()) continue;
        this.speed = 0; break;
      }
      // convex edge (roof edge, wall corner)
      const conv = hit.normal.dot(this.heading);
      if (conv > 0.45 && np.type !== 'capsule') {
        this.edge = true;
        if (input.jumpHeld && moveMag > 0) { this._findTarget(); this._jump(); return; }
      }
      _n0.copy(this.normal);
      this._attach(hit, dt / steps);
      this._transport(_n0, this.normal);
      projectOnPlane(this.heading, this.normal);
      if (this.heading.lengthSq() < 1e-6) { this.heading.copy(UP); projectOnPlane(this.heading, this.normal); }
      this.heading.normalize();
      if (conv > 0.45 && np.type === 'box') this.pos.addScaledVector(this.heading, 0.03); // commit past the edge
    }
    if (this.speed === 0 || dist === 0) {
      // settle (drift to the top of a limb even while standing)
      if (world.nearest(this.pos, 0.5, hit)) { _n0.copy(this.normal); this._attach(hit, dt); this._transport(_n0, this.normal); }
    }
    this.wasTip = this.atTip;
    if (this.atTip && input.jumpHeld && moveMag > 0) { this._findTarget(); if (this.target.valid) { this._jump(); return; } }
    this.vel.copy(this.heading).multiplyScalar(this.speed);
  }

  _attach(hit, dt) {
    const pr = hit.prim;
    this.prim = pr; this.primT = hit.t;
    if (pr.type === 'capsule' && Math.abs(pr.dy) < 0.82) {
      // drift to the top side of branches and wires
      const t = clamp(hit.t, 0, 1);
      const r = pr.ra + (pr.rb - pr.ra) * t;
      const cx = pr.ax + pr.dx * pr.len * t, cy = pr.ay + pr.dy * pr.len * t, cz = pr.az + pr.dz * pr.len * t;
      const nt = _q.set(-pr.dy * pr.dx, 1 - pr.dy * pr.dy, -pr.dy * pr.dz).normalize();
      const n = this.normal.copy(hit.normal);
      const k = r < 0.13 ? 1 : Math.min(1, 10 * dt);
      if (n.dot(nt) < -0.95) n.addScaledVector(_c.crossVectors(nt, _d.set(pr.dx, pr.dy, pr.dz)), 0.2);
      n.lerp(nt, k).normalize();
      this.pos.set(cx + n.x * r, cy + n.y * r, cz + n.z * r);
    } else {
      this.pos.copy(hit.point); this.normal.copy(hit.normal);
    }
  }

  _vault() {
    // climbing a wall and hit an overhang (ledge, sill, eave): look for the surface just beyond it
    const world = this.world, h = this._hit2, n = this.normal;
    for (let k = 0.2; k <= 0.95; k += 0.15) {
      for (let u = 0.25; u <= 0.75; u += 0.25) {
        _q.copy(this.pos).addScaledVector(n, k).addScaledVector(UP, u);
        if (world.nearest(_q, 0.45, h) && h.normal.y > -0.2 && h.point.y > this.pos.y + 0.05 && h.dist > -0.05) {
          this.pos.copy(h.point); this.normal.copy(h.normal); this.prim = h.prim; this.primT = h.t;
          projectOnPlane(this.heading, this.normal);
          if (this.heading.lengthSq() < 1e-6) this.heading.copy(UP);
          this.heading.normalize();
          this.events.push({ type: 'vault' });
          return true;
        }
      }
    }
    return false;
  }

  _tryFork(wish, ax) {
    const cur = this.prim, world = this.world, h = this._hit2;
    const t = this.primT;
    const a0 = wish.dot(ax);
    let curAlign = 0;
    if (a0 > 0 && t < 0.97) curAlign = a0; else if (a0 < 0 && t > 0.03) curAlign = -a0;
    let best = null, bestAlign = Math.max(0.5, curAlign + 0.18), bt = 0;
    const self = this;
    world.queryPrims(this.pos.x, this.pos.z, 0.9, (c) => {
      if (c === cur || c.type !== 'capsule') return;
      if (self.pos.y < c.minY - 0.6 || self.pos.y > c.maxY + 0.6) return;
      world.primDistance(c, self.pos, h);
      if (h.dist > 0.8) return;
      const d = wish.x * c.dx + wish.y * c.dy + wish.z * c.dz;
      let al = 0;
      if (d > 0 && h.t < 0.92) al = d; else if (d < 0 && h.t > 0.08) al = -d;
      if (al > bestAlign) { bestAlign = al; best = c; bt = h.t; }
    });
    if (best) {
      world.primDistance(best, this.pos, h);
      h.prim = best; h.t = bt;
      this._attach(h, 1);
      this.forkCooldown = 0.18;
      projectOnPlane(this.heading, this.normal); if (this.heading.lengthSq() > 1e-6) this.heading.normalize();
    }
  }

  // ---------------------------------------------------------------- jump targeting
  _findTarget() {
    const tg = this.target; tg.valid = false; tg.extra = null;
    const world = this.world, pos = this.pos, n = this.normal;
    const aim = _a;
    if (this.steepW > 0.5) {
      aim.copy(this.wishT).multiplyScalar(this.wishMag > 0 ? 1 : 0).addScaledVector(n, 0.9);
    } else if (this.wishMag > 0) aim.copy(this.wishWorld);
    else aim.copy(this.heading);
    aim.y = 0;
    if (aim.lengthSq() < 1e-5) return;
    aim.normalize();
    const vPref = this.steepW > 0.5 ? this.wishT.y * this.wishMag : 0;
    const cur = this.prim;
    let bestS = Infinity;
    const h = this._hit3;
    const self = this;
    const consider = (qx, qy, qz, prim, nx, ny, nz, bias, extra) => {
      const dx = qx - pos.x, dz = qz - pos.z, dy = qy - pos.y;
      const dh = Math.hypot(dx, dz);
      if (dh < 0.9 || dh > TUNE.maxLeap || dy > TUNE.maxLeapUp || dy < -9) return;
      const cos = (dx * aim.x + dz * aim.z) / dh;
      if (cos < 0.8) return;
      let s = (1 - cos) * 9 + Math.abs(dh - 3.4) * 0.13 + (dy > 0 ? dy * 0.1 : -dy * 0.06) + bias;
      if (vPref !== 0) s -= clamp(dy, -3, 3) * vPref * 0.25;
      if (s < bestS) { bestS = s; tg.valid = true; tg.point.set(qx, qy, qz); tg.normal.set(nx, ny, nz); tg.prim = prim; tg.extra = extra || null; }
    };
    const cx = pos.x + aim.x * 3.6, cz = pos.z + aim.z * 3.6;
    world.queryPrims(cx, cz, 5.2, (c) => {
      if (c === cur || c.noJumpTarget) return;
      if (c.maxY < pos.y - 9 || c.minY > pos.y + TUNE.maxLeapUp + 0.3) return;
      if (c.type === 'capsule') {
        if (Math.abs(c.dy) < 0.82) {
          // closest point of the limb to the aim line (in plan view)
          const ex = c.dx * c.len, ez = c.dz * c.len;
          const wx = c.ax - pos.x, wz = c.az - pos.z;
          const den = ex * aim.z - ez * aim.x; // cross(e, aim)
          let t;
          if (Math.abs(den) > 1e-4) t = (aim.x * wz - aim.z * wx) / den; // where the limb crosses the aim line
          else t = 0.5;
          // (limb point = a + e t) ; clamp and also try the point nearest to 3.4 m ahead
          for (let k = 0; k < 2; k++) {
            let tt = k === 0 ? t : ((cx - aim.x * 0.2 - c.ax) * ex + (cz - aim.z * 0.2 - c.az) * ez) / (ex * ex + ez * ez + 1e-6);
            tt = clamp(tt, 0.04, 0.96);
            const r = c.ra + (c.rb - c.ra) * tt;
            const ntx = -c.dy * c.dx, nty = 1 - c.dy * c.dy, ntz = -c.dy * c.dz;
            const il = 1 / Math.hypot(ntx, nty, ntz);
            consider(c.ax + c.dx * c.len * tt + ntx * il * r, c.ay + c.dy * c.len * tt + nty * il * r, c.az + c.dz * c.len * tt + ntz * il * r, c, ntx * il, nty * il, ntz * il, r < 0.05 ? 0.12 : 0);
          }
        } else {
          // trunk or pole: the side facing us, a bit above us
          let ty = clamp(pos.y + 1.6 + vPref * 1.2, c.minY + 0.3, c.maxY - 0.15);
          const tt = clamp((ty - c.ay) / (c.dy * c.len), 0.02, 0.98);
          const px = c.ax + c.dx * c.len * tt, py = c.ay + c.dy * c.len * tt, pz = c.az + c.dz * c.len * tt;
          let ox = pos.x - px, oz = pos.z - pz; const ol = Math.hypot(ox, oz) || 1; ox /= ol; oz /= ol;
          const r = c.ra + (c.rb - c.ra) * tt;
          consider(px + ox * r, py, pz + oz * r, c, ox, 0, oz, 0.35);
        }
      } else if (c.type === 'box') {
        if (c.yy < 0.55) return; // only boxes with a usable top
        for (let k = 0; k < 4; k++) {
          const d = 1.6 + k * 1.7;
          const wx = pos.x + aim.x * d - c.cx, wz = pos.z + aim.z * d - c.cz;
          // local coords of the probe (ignoring height), clamped inside the top face
          let lx = wx * c.xx + wz * c.xz, lz = wx * c.zx + wz * c.zz;
          const mx = Math.max(0, c.hx - 0.12), mz = Math.max(0, c.hz - 0.12);
          lx = clamp(lx, -mx, mx); lz = clamp(lz, -mz, mz);
          const qx = c.cx + lx * c.xx + c.hy * c.yx + lz * c.zx;
          const qy = c.cy + lx * c.xy + c.hy * c.yy + lz * c.zy;
          const qz = c.cz + lx * c.xz + c.hy * c.yz + lz * c.zz;
          // the top must really be the outer surface there (not buried in another box)
          _q.set(qx, qy + 0.1, qz);
          if (world.nearest(_q, 0.3, h) && h.dist < 0.04) continue;
          consider(qx, qy, qz, c, c.yx, c.yy, c.yz, 0.15);
        }
      }
    });
    if (this.extraTargets) this.extraTargets((pt, ref) => consider(pt.x, pt.y, pt.z, null, 0, 1, 0, -0.6, ref));
  }

  _jump() {
    const tg = this.target;
    this.jumpBuffer = 0;
    const n = this.normal, v = this.vel;
    let power = 0.5;
    this.assist = null;
    if (tg.valid) {
      const dx = tg.point.x - this.pos.x, dy = tg.point.y - this.pos.y, dz = tg.point.z - this.pos.z;
      const dh = Math.hypot(dx, dz);
      let T = 0.3 + dh * 0.072 + Math.max(0, dy) * 0.1;
      v.set(dx / T, dy / T + 0.5 * TUNE.gravity * T, dz / T);
      if (v.length() <= TUNE.maxLaunch) { this.assist = { point: tg.point.clone(), T, prim: tg.prim, extra: tg.extra }; power = clamp(dh / 7, 0.3, 1); }
    }
    if (!this.assist) {
      if (this.steepW < 0.5) {
        const sp = this.wishMag > 0 ? Math.max(this.speed, 5) : this.speed * 0.5 + 1.2;
        v.copy(this.heading).multiplyScalar(sp); v.y = Math.max(v.y, 0) * 0.3 + TUNE.jumpUp;
      } else {
        v.copy(n).multiplyScalar(4.6).addScaledVector(this.wishT, this.wishMag * 3.2); v.y += 6.8;
      }
    }
    this.pos.addScaledVector(n, 0.06);
    this.mode = 'air'; this.airTime = 0; this.launchPrim = this.prim; this.surfaceTime = 0;
    this.events.push({ type: 'jump', power, assisted: !!this.assist });
  }

  // ---------------------------------------------------------------- air
  _updateAir(dt, input) {
    const world = this.world, hit = this._hit, v = this.vel;
    this.airTime += dt; this.surfaceTime = 0;
    this.thin += (0 - this.thin) * Math.min(1, dt * 10);
    v.y -= TUNE.gravity * dt;
    if (v.y < -32) v.y = -32;
    if (this.assist) {
      const rem = this.assist.T - this.airTime;
      if (this.assist.extra && this.assist.extra.position) { // moving target (a dog)
        const p = this.assist.extra.position; this.assist.point.set(p.x, p.y + (this.assist.extra.height || 0.5), p.z);
      }
      if (rem > 0.06) {
        const tp = this.assist.point;
        _a.set((tp.x - this.pos.x) / rem, (tp.y - this.pos.y) / rem + 0.5 * TUNE.gravity * rem, (tp.z - this.pos.z) / rem);
        v.lerp(_a, Math.min(1, dt * 10));
      } else if (rem < -0.25) this.assist = null;
      // strong opposite stick cancels the assist
      if (this.wishMag > 0.6 && this.wishWorld.x * v.x + this.wishWorld.z * v.z < -2) this.assist = null;
    } else if (this.wishMag > 0) {
      const ac = 16 * dt;
      const nvx = v.x + this.wishWorld.x * ac, nvz = v.z + this.wishWorld.z * ac;
      const lim = Math.max(8.5, Math.hypot(v.x, v.z));
      const l = Math.hypot(nvx, nvz);
      const s = l > lim ? lim / l : 1;
      v.x = nvx * s; v.z = nvz * s;
    }
    const dist = v.length() * dt;
    const steps = Math.max(1, Math.ceil(dist / 0.07));
    const h = dt / steps;
    const lp = this.launchPrim, early = this.airTime < 0.16;
    const filter = early && lp ? (pr) => pr !== lp : null;
    for (let i = 0; i < steps; i++) {
      this.pos.addScaledVector(v, h);
      if (!world.nearest(this.pos, 0.5, hit, filter, early && lp === world.groundPrim)) continue;
      const pr = hit.prim;
      const vn = v.dot(hit.normal);
      let capture = 0.03;
      if (pr.type === 'capsule') capture = this.assist && this.assist.prim === pr ? 0.3 : (v.y < 2 ? 0.17 : 0.1);
      if (hit.dist < capture && (vn < 0.5 || hit.dist < -0.02)) {
        if (pr.type === 'box' && hit.normal.y < -0.45) {
          // bonk off the underside of something
          v.addScaledVector(hit.normal, -1.5 * vn); this.pos.copy(hit.point).addScaledVector(hit.normal, 0.05); this.assist = null; continue;
        }
        if (pr.type === 'capsule' && (hit.t < 0 || hit.t > 1) && hit.dist > -0.02) {
          // do not land on the very tip cap; slide just inside the limb
          const t = clamp(hit.t, 0.03, 0.97);
          _q.set(pr.ax + pr.dx * pr.len * t, pr.ay + pr.dy * pr.len * t, pr.az + pr.dz * pr.len * t).addScaledVector(hit.normal, 0.01);
          world.primDistance(pr, _q.addScaledVector(UP, 0.02), hit); hit.prim = pr;
        }
        this._land(hit, vn);
        return;
      }
    }
    if (v.lengthSq() > 0.5) {
      // face along the flight path (flattened)
      _a.copy(v); _a.y *= 0.35; _a.normalize();
      this.heading.lerp(_a, Math.min(1, dt * 12)).normalize();
      this.normal.lerp(_b.copy(UP).addScaledVector(this.heading, -this.heading.y).normalize(), Math.min(1, dt * 8)).normalize();
    }
  }

  _land(hit, vn) {
    const v = this.vel;
    const impact = clamp(-vn / 16, 0, 1);
    this.mode = 'surface'; this.surfaceTime = 0;
    const wasAssist = !!this.assist; this.assist = null;
    this.normal.copy(hit.normal);
    this._attach(hit, 1);
    // keep the momentum that lies along the new surface
    _a.copy(v); projectOnPlane(_a, this.normal);
    const ts = _a.length();
    if (ts > 0.8) this.heading.copy(_a).multiplyScalar(1 / ts);
    else { projectOnPlane(this.heading, this.normal); if (this.heading.lengthSq() < 1e-5) { this.heading.copy(UP); projectOnPlane(this.heading, this.normal); } this.heading.normalize(); }
    const pr = this.prim;
    if (pr.type === 'capsule' && Math.abs(pr.dy) < 0.82) {
      // on a limb: momentum only counts along it
      const al = this.heading.x * pr.dx + this.heading.y * pr.dy + this.heading.z * pr.dz;
      if (Math.abs(al) > 0.3) this.heading.set(pr.dx, pr.dy, pr.dz).multiplyScalar(al > 0 ? 1 : -1);
      this.speed = this.wishMag > 0 ? Math.min(ts * Math.abs(al), TUNE.runSpeed) : 0;
    } else this.speed = this.wishMag > 0 ? Math.min(ts, TUNE.runSpeed * 1.2) : 0;
    this.events.push({ type: 'land', impact, prim: pr, assisted: wasAssist, from: this.launchPrim });
    this.launchPrim = null;
  }

  // ---------------------------------------------------------------- visual transform
  _updateVisual(dt) {
    const k = this.mode === 'air' ? 1 : Math.min(1, dt * 28);
    this.visPos.lerp(this.pos, k);
    if (this.visPos.distanceToSquared(this.pos) > 4) this.visPos.copy(this.pos);
    _z.copy(this.heading); _y.copy(this.normal);
    _x.crossVectors(_y, _z);
    if (_x.lengthSq() < 1e-6) return;
    _x.normalize(); _z.crossVectors(_x, _y).normalize();
    _m.makeBasis(_x, _y, _z);
    this._targetQuat.setFromRotationMatrix(_m);
    this.visQuat.slerp(this._targetQuat, Math.min(1, dt * (this.mode === 'air' ? 12 : 16)));
  }
}

const NO_INPUT = { moveX: 0, moveY: 0, jumpPressed: false, jumpHeld: false };
