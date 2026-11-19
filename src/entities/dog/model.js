// Procedural animation for a dog built by build.js. The owner sets `group.position`
// (ground point under the chest), `group.rotation.y` (facing) and the control values in
// `model.c`; `update(dt, time)` poses every bone. Feet are planted in world space and only
// move during a swing, so there is no foot sliding. Nothing is allocated per frame.
import * as THREE from 'three';
import { buildDog } from './build.js';
import { mulberry32 } from '../../core/rng.js';

const _v = new THREE.Vector3(), _v2 = new THREE.Vector3(), _v3 = new THREE.Vector3();
const _H = new THREE.Vector3(), _A = new THREE.Vector3(), _K = new THREE.Vector3(), _P = new THREE.Vector3(), _n = new THREE.Vector3();
const _bx = new THREE.Vector3(), _by = new THREE.Vector3(), _bz = new THREE.Vector3();
const _q = new THREE.Quaternion(), _q2 = new THREE.Quaternion(), _qBody = new THREE.Quaternion(), _qFoot = new THREE.Quaternion();
const _e = new THREE.Euler(0, 0, 0, 'YXZ'), _m = new THREE.Matrix4();
const TAU = Math.PI * 2;
const damp = (cur, target, rate, dt) => cur + (target - cur) * (1 - Math.exp(-rate * dt));
const mix = (a, b, t) => a + (b - a) * t;
const sat = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const sstep = (a, b, x) => { const t = sat((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const clamp = (x, a, b) => (x < a ? a : x > b ? b : x);
const frac = (x) => x - Math.floor(x);
const qe = (q, x, y, z) => q.setFromEuler(_e.set(x, y, z));

function basisQuat(out, ax, ay, az, bx, by, bz, n) { // bone runs from a (top) down to b
  _by.set(ax - bx, ay - by, az - bz).normalize();
  _bx.copy(n).addScaledVector(_by, -n.dot(_by)).normalize();
  _bz.crossVectors(_bx, _by);
  _m.makeBasis(_bx, _by, _bz);
  return out.setFromRotationMatrix(_m);
}

// gait phase offsets per leg [FL, FR, HL, HR]
const WALK = [0.25, 0.75, 0.0, 0.5], TROT = [0.5, 1.0, 0.0, 0.5], GALLOP = [0.5, 0.62, 0.0, 0.12];
const CONTROLS = ['speed', 'turn', 'lookW', 'sit', 'lie', 'sniff', 'growl', 'alert', 'crouch', 'leap', 'leapT', 'skid', 'rear', 'rearDist',
  'scrabble', 'stun', 'fear', 'pant', 'wag', 'jaw', 'hackle', 'shake'];
const RATES = { sit: 5, lie: 4, sniff: 6, growl: 9, alert: 12, crouch: 16, leap: 30, skid: 14, rear: 7, stun: 9, fear: 8, pant: 5, wag: 6, jaw: 20, hackle: 7, scrabble: 8, lookW: 8, shake: 10 };

export class DogModel {
  constructor(kind, seed = 1) {
    const b = buildDog(kind);
    this.b = b; this.kind = kind; this.K = b.K; this.d = b.dims;
    this.group = new THREE.Group();
    this.group.add(b.mesh);
    for (const bone of b.boneList) this.group.add(bone);
    b.mesh.bind(b.skeleton, new THREE.Matrix4());
    this.rng = mulberry32(seed * 7919 + 13);
    this.ground = () => 0;
    this.c = { look: new THREE.Vector3() };
    this.s = {};
    for (const k of CONTROLS) { this.c[k] = 0; this.s[k] = 0; }
    this.c.rearDist = 1;
    this.phase = this.rng(); this.t = this.rng() * 10;
    this.barkT = 1; this.hopT = 1; this.hopH = 0; this.sq = 0; this.sqV = 0;
    this.flX = 0; this.flZ = 0; this.flV = 0; this.blinkT = 2; this.blink = 0; this.squint = 0;
    this.lookYaw = 0; this.lookPitch = 0; this.idleYaw = 0; this.idlePitch = 0; this.idleRoll = 0; this.idleT = 1;
    this.tailYaw = [0, 0, 0, 0]; this.tailLag = 0; this.earFlop = 0; this.earV = 0; this.prevCy = 0; this.vyS = 0;
    this.roll = 0; this.bend = 0;
    this.mouthLocal = b.mouthRest.clone(); this.headTopLocal = b.headTopRest.clone();
    this.legs = b.legs.map((l, i) => ({
      def: l, i, wx: 0, wy: 0, wz: 0, sx: 0, sy: 0, sz: 0, swing: false, timed: false, tt: 0, lift: 0, pitch: 0, init: false,
      u: b.bones[l.name + 'u'], l: b.bones[l.name + 'l'], f: b.bones[l.name + 'f'],
      qU: new THREE.Quaternion(), qL: new THREE.Quaternion(),
    }));
    _n.set(1, 0, 0);
    for (const L of this.legs) {
      const d = L.def;
      basisQuat(L.qU, d.hip.x, d.hip.y, d.hip.z, d.knee.x, d.knee.y, d.knee.z, _n).invert();
      basisQuat(L.qL, d.knee.x, d.knee.y, d.knee.z, d.ankle.x, d.ankle.y, d.ankle.z, _n).invert();
    }
    this.pitch0 = Math.atan2(this.d.yC - this.d.yH, this.d.L);
    this.bodyLen = Math.hypot(this.d.yC - this.d.yH, this.d.L);
  }

  // ---- one-shot triggers
  bark() { this.barkT = 0; }
  hop(h = 0.25) { this.hopT = 0; this.hopH = h * this.d.S; }
  squash(v = 1) { this.sqV += 9 * v; }
  /** flinch away from a hit; (dx, dz) = hit direction in world space */
  flinch(dx, dz, power = 1) {
    const yaw = this.group.rotation.y, cy = Math.cos(yaw), sy = Math.sin(yaw);
    this.flX = (dx * cy - dz * sy) * power; this.flZ = (dx * sy + dz * cy) * power; this.squint = 1;
  }
  setFade(f) { this.b.mesh.material.userData.uFade.value = f; this.b.mesh.castShadow = f > 0.5; }
  /** forget planted feet (after a teleport) */
  resetFeet() { for (const L of this.legs) L.init = false; }

  _attach(child, parent, restC, restP, qLocal) {
    _v.copy(restC).sub(restP).applyQuaternion(parent.quaternion);
    child.position.copy(parent.position).add(_v);
    child.quaternion.copy(parent.quaternion).multiply(qLocal);
  }

  update(dt, time) {
    const c = this.c, s = this.s, d = this.d, S = d.S, b = this.b, B = b.bones, Rst = b.rest, K = this.K, g = this.group;
    dt = Math.min(dt, 0.05);
    this.t += dt;
    const t = this.t;
    for (const k in RATES) s[k] = damp(s[k], c[k], RATES[k], dt);
    s.speed = damp(s.speed, c.speed, 14, dt); s.turn = damp(s.turn, c.turn, 10, dt); s.leapT = c.leapT; s.rearDist = damp(s.rearDist, c.rearDist, 6, dt);
    if (this.barkT < 1) this.barkT += dt / 0.24;
    const bp = this.barkT < 1 ? Math.sin(Math.PI * this.barkT) : 0;
    if (this.hopT < 1) this.hopT += dt / 0.36;
    const hopY = this.hopT < 1 ? Math.sin(Math.PI * this.hopT) * this.hopH : 0;
    this.sqV += (-this.sq * 140 - this.sqV * 10) * dt; this.sq += this.sqV * dt;
    const sq = clamp(this.sq, -0.3, 1);
    this.flX = damp(this.flX, 0, 5, dt); this.flZ = damp(this.flZ, 0, 5, dt); this.squint = damp(this.squint, 0, 4, dt);
    this.blinkT -= dt;
    if (this.blinkT < 0) { this.blinkT = 1.5 + this.rng() * 4; this.blink = 1; }
    this.blink = Math.max(0, this.blink - dt * 7);

    const px = g.position.x, py = g.position.y, pz = g.position.z, yaw = g.rotation.y, cyw = Math.cos(yaw), syw = Math.sin(yaw);
    const v = s.speed, av = Math.abs(v), rel = sat(av / K.maxSpeed);
    const Lg = d.legF;

    // ---------------------------------------------------------------- gait
    const wt = sstep(0.2, 0.36, rel), wg = sstep(0.5, 0.68, rel);
    const duty = mix(mix(0.64, 0.5, wt), 0.34, wg);
    const stance = Lg * mix(mix(0.8, 0.95, wt), 1.3, wg);
    const stride = stance / duty;
    const turnArc = Math.abs(s.turn) * d.L * 0.5;
    const adv = Math.max(av, av < 0.6 ? Math.min(turnArc, 1.2) : 0);
    const moving = adv > 0.22 && s.leap < 0.3 && s.rear < 0.5 && s.lie < 0.5 && s.sit < 0.5;
    if (moving) this.phase = frac(this.phase + (adv * dt) / stride);
    const ph = this.phase;
    const liftH = Lg * mix(mix(0.12, 0.2, wt), 0.3, wg);
    const widen = 1 + 0.3 * s.stun + 0.45 * Math.max(0, sq) + 0.15 * s.crouch;
    const dirSign = v >= 0 ? 1 : -1;

    // ---------------------------------------------------------------- torso targets (model space)
    const gal = wg * sat(rel * 1.4), trot = wt * (1 - wg);
    const cph = Math.cos(TAU * (ph - 0.25)), hph = Math.cos(TAU * (ph - 0.75));
    const flex = Math.cos(TAU * (ph - 0.92)) * gal; // +1 gathered, -1 stretched
    let cx = 0, cy = d.yC, cz = 0, hx = 0, hy = d.yH, hz = -d.L;
    cy += gal * cph * 0.07 * S - trot * Math.cos(2 * TAU * ph) * 0.018 * S;
    hy += gal * hph * 0.075 * S - trot * Math.cos(2 * TAU * ph + 0.6) * 0.016 * S;
    hz += flex * 0.07 * d.L + gal * 0.03 * d.L;
    const walkW = (1 - wt) * sat(av * 2);
    hx += Math.sin(TAU * ph) * 0.02 * S * walkW; cx -= Math.sin(TAU * ph) * 0.012 * S * walkW;
    // poses
    cy -= s.crouch * 0.34 * Lg + s.sniff * 0.1 * S + s.growl * 0.07 * S + s.skid * 0.16 * Lg + s.fear * 0.04 * S;
    hy += s.crouch * 0.04 * S - s.skid * 0.22 * d.legH - s.fear * 0.05 * S;
    hx += Math.sin(t * 40) * 0.03 * S * s.crouch;
    cz -= s.crouch * 0.08 * S; cz -= s.skid * 0.1 * S;
    cy += s.sit * 0.035 * S; hy = mix(hy, d.yH * 0.47, s.sit); hz += s.sit * 0.1 * d.L;
    cy = mix(cy, K.chest[2] * S * 0.95, s.lie); hy = mix(hy, K.hip[2] * S * 0.95, s.lie);
    cy -= Math.max(sq, -0.2) * 0.42 * Lg; hy -= Math.max(sq, -0.2) * 0.4 * d.legH;
    // bark bounce, stun sway, growl tremble, flinch
    cy += bp * 0.07 * S * (1 - s.rear) * (1 - s.lie) * (1 - s.sit * 0.5);
    cx += Math.sin(t * 3.3) * 0.09 * S * s.stun; hx += Math.sin(t * 3.3 + 1.3) * 0.07 * S * s.stun;
    cz += Math.cos(t * 2.1) * 0.03 * S * s.stun;
    cx += Math.sin(t * 61) * 0.004 * S * s.growl;
    cx += this.flX * 0.06 * S; cz += this.flZ * 0.08 * S;
    cx += Math.sin(t * 24) * 0.035 * S * s.shake; hx -= Math.sin(t * 24) * 0.02 * S * s.shake;
    // breathing
    const breath = Math.sin(t * (1.6 + s.pant * 9)) * (0.004 + 0.006 * s.pant) * S;
    cy += breath;
    // leap arc
    const leapArc = s.leap * Math.sin(Math.PI * sat(s.leapT)) * 0.2 * S;
    cy += leapArc + s.leap * 0.04 * S; hy += leapArc * 0.8 + s.leap * 0.1 * S; hz -= s.leap * 0.1 * d.L;
    // rearing up against something: pitch the torso about the hips
    let pitch = Math.atan2(cy - hy, cz - hz);
    let len = Math.hypot(cy - hy, cz - hz);
    if (s.rear > 0.001) {
      hy = mix(hy, d.yH * 0.94, s.rear) + hopY;
      hz += s.rear * 0.6 * d.L;
      pitch += s.rear * (0.86 + 0.05 * Math.sin(t * 9)) + (hopY / S) * 0.25;
      cy = hy + len * Math.sin(pitch); cz = hz + len * Math.cos(pitch);
    }
    const yawL = Math.atan2(cx - hx, cz - hz);
    // lean and bend into turns
    this.roll = damp(this.roll, clamp(-s.turn * (0.03 + av * 0.012), -0.4, 0.4), 8, dt);
    this.bend = damp(this.bend, clamp(s.turn * 0.09, -0.45, 0.45), 8, dt);
    const roll = this.roll + Math.sin(t * 3.3 + 0.5) * 0.1 * s.stun + Math.sin(t * 24) * 0.12 * s.shake + this.flX * 0.1
      + Math.sin(TAU * ph) * 0.03 * walkW;

    qe(_qBody, -(pitch - this.pitch0), yawL, roll);
    const hipsB = B.hips, chestB = B.chest, spineB = B.spine;
    hipsB.position.set(hx, hy, hz);
    qe(_q, -flex * 0.3 - s.sit * 0.35 + s.crouch * 0.12 - s.fear * 0.12, -this.bend * 0.6, 0);
    hipsB.quaternion.copy(_qBody).multiply(_q);
    chestB.position.set(cx, cy, cz);
    qe(_q, flex * 0.16 + s.crouch * 0.2 + s.sniff * 0.12 - s.rear * 0.1, this.bend * 0.7, roll * 0.4);
    chestB.quaternion.copy(_qBody).multiply(_q);
    spineB.quaternion.copy(hipsB.quaternion).slerp(chestB.quaternion, 0.5);
    _v.set(0, Rst.spine.y - (Rst.hips.y + Rst.chest.y) * 0.5 + flex * 0.06 * S - s.sit * 0.02 * S + s.fear * 0.03 * S, 0).applyQuaternion(_qBody);
    spineB.position.set((hx + cx) * 0.5 + _v.x - this.bend * 0.1 * d.L, (hy + cy) * 0.5 + _v.y, (hz + cz) * 0.5 + _v.z);
    // hackles ride on the chest and grow out of the back
    const hk = sat(Math.max(s.hackle, s.growl));
    B.hackle.position.copy(chestB.position); B.hackle.quaternion.copy(chestB.quaternion);
    B.hackle.scale.set(1, mix(0.55, 1.0, hk), 1);
    const vy = (cy - this.prevCy) / Math.max(dt, 1e-4); this.prevCy = cy;
    this.vyS = damp(this.vyS, clamp(vy, -3, 3), 12, dt);

    // ---------------------------------------------------------------- legs
    let anySwing = 0;
    for (let i = 0; i < 4; i++) if (this.legs[i].swing) anySwing++;
    for (let i = 0; i < 4; i++) {
      const L = this.legs[i], df = L.def, front = df.front;
      // home under the body, world space
      const hmx = df.paw.x * (front ? widen + 0.2 * s.growl : widen) + (front ? cx : hx) * 0.6, hmz = df.paw.z + (front ? 0 : s.sit * 0.06 * d.L - s.fear * 0.05 * d.L + s.rear * 0.58 * d.L);
      const hwx = px + hmx * cyw + hmz * syw, hwz = pz - hmx * syw + hmz * cyw;
      if (!L.init) { L.init = true; L.wx = hwx; L.wz = hwz; L.wy = this.ground(hwx, hwz); L.swing = false; L.timed = false; }
      // pose overrides (model space)
      let ow = 0, ox = 0, oy = 0, oz = 0;
      if (s.leap > 0.01) {
        const w = s.leap, lt = sat(s.leapT); ow += w;
        if (front) { ox += w * df.paw.x * 0.8; oy += w * (cy - Lg * mix(0.75, 0.5, lt)); oz += w * (cz + Lg * mix(0.35, 0.8, Math.sin(lt * Math.PI * 0.9))); }
        else { ox += w * df.paw.x; oy += w * (hy - d.legH * mix(0.85, 0.6, lt)); oz += w * (hz - d.legH * mix(0.3, 0.85, Math.sin(lt * Math.PI * 0.8))); }
      }
      if (s.skid > 0.01) {
        const w = s.skid; ow += w;
        ox += w * df.paw.x * 1.2; oy += 0; oz += w * (front ? Lg * 0.5 : -d.L + d.legH * 0.12);
      }
      if (s.rear > 0.01 && front) {
        const w = s.rear; ow += w;
        const scr = Math.sin(t * 13 + (df.sgn > 0 ? 0 : Math.PI)) * s.scrabble;
        ox += w * df.paw.x * 0.9; oy += w * (cy + Lg * (0.05 + 0.2 * scr)); oz += w * Math.min(s.rearDist - 0.05 * S, cz + Lg * 0.8) - w * Math.max(0, -scr) * 0.08 * S;
      }
      if (s.rear > 0.01 && !front && hopY > 0.001) { ow += 1; ox += df.paw.x; oy += hopY * 0.9; oz += df.paw.z + s.rear * 0.58 * d.L; }
      if (s.lie > 0.01) {
        const w = s.lie; ow += w;
        ox += w * df.paw.x * (front ? 1 : 1.5); oy += w * 0.0; oz += w * (front ? Lg * 0.62 : -d.L + d.legH * 0.42);
      }
      const ovW = Math.min(1, ow);
      if (ow > 0) { ox /= ow; oy /= ow; oz /= ow; }

      // stepping in world space
      let lift = 0, footPitch = 0;
      if (ovW > 0.5) {
        L.swing = false; L.timed = false;
        L.wx = px + ox * cyw + oz * syw; L.wz = pz - ox * syw + oz * cyw; L.wy = this.ground(L.wx, L.wz);
      } else if (L.timed) {
        L.tt += dt / 0.15;
        const e = sat(L.tt), es = e * e * (3 - 2 * e);
        L.wx = mix(L.sx, hwx, es); L.wz = mix(L.sz, hwz, es);
        L.wy = mix(L.sy, this.ground(hwx, hwz), es);
        lift = Math.sin(Math.PI * e) * Lg * 0.1; footPitch = Math.sin(Math.PI * e) * 0.4;
        if (e >= 1) { L.timed = false; L.swing = false; }
      } else if (moving) {
        const off = mix(mix(WALK[i], TROT[i], wt), GALLOP[i], wg);
        const lp = frac(ph + off);
        if (lp < duty) {
          if (L.swing) L.swing = false;
          const ex = L.wx - hwx, ez = L.wz - hwz;
          if (ex * ex + ez * ez > stance * stance * 1.6) { L.timed = true; L.tt = 0; L.sx = L.wx; L.sy = L.wy; L.sz = L.wz; L.swing = true; }
        } else {
          if (!L.swing) { L.swing = true; L.sx = L.wx; L.sy = L.wy; L.sz = L.wz; }
          const sp = (lp - duty) / (1 - duty);
          const rem = ((1 - sp) * (1 - duty) * stride) / Math.max(adv, 0.3);
          const ahead = dirSign * (stance * 0.5) * sat(av * 3) + v * rem;
          // predicted touch-down point: home + half a stance ahead (+ what the body covers meanwhile, + turning)
          const tyaw = yaw + s.turn * rem, tc = Math.cos(tyaw), tsn = Math.sin(tyaw);
          const tx = px + syw * v * rem + hmx * tc + (hmz + dirSign * stance * 0.5 * sat(av * 3)) * tsn;
          const tz = pz + cyw * v * rem - hmx * tsn + (hmz + dirSign * stance * 0.5 * sat(av * 3)) * tc;
          const es = sp * sp * (3 - 2 * sp);
          L.wx = mix(L.sx, tx, es); L.wz = mix(L.sz, tz, es);
          L.wy = mix(L.sy, this.ground(tx, tz), es);
          lift = Math.sin(Math.PI * Math.pow(sp, 0.8)) * liftH * (front ? 1 : 0.85);
          footPitch = Math.sin(Math.PI * sp) * mix(0.5, 1.1, wg) * (sp < 0.6 ? 1 : -0.5);
          void ahead;
        }
      } else {
        if (L.swing) { L.swing = false; }
        const ex = L.wx - hwx, ez = L.wz - hwz, thr = Lg * 0.2;
        const partner = this.legs[3 - i];
        if (ex * ex + ez * ez > thr * thr && anySwing < 2 && !(anySwing === 1 && !partner.timed)) {
          L.timed = true; L.tt = 0; L.sx = L.wx; L.sy = L.wy; L.sz = L.wz; L.swing = true; anySwing++;
        }
      }
      // world -> model
      const dx = L.wx - px, dz = L.wz - pz;
      let fx = dx * cyw - dz * syw, fz = dx * syw + dz * cyw, fy = L.wy - py + lift;
      if (front && bp > 0) fy += bp * 0.06 * S * (1 - s.rear) * (1 - s.lie);
      if (ovW > 0) { fx = mix(fx, ox, ovW); fy = mix(fy, oy + (ovW > 0.5 ? 0 : 0), ovW); fz = mix(fz, oz, ovW); }
      if (s.leap > 0.3) footPitch = front ? -0.5 : 1.0;
      if (s.rear > 0.3 && front) footPitch = -0.9 * s.rear;
      // analytic two-bone IK
      const body = front ? chestB : hipsB;
      _H.copy(df.hip).sub(Rst[df.body]).applyQuaternion(body.quaternion).add(body.position);
      qe(_qFoot, footPitch, 0, 0);
      _A.copy(df.ankOff).applyQuaternion(_qFoot); _A.x += fx; _A.y += fy; _A.z += fz;
      _v.copy(_A).sub(_H);
      const maxLen = (df.l1 + df.l2) * 0.998;
      let dist = _v.length();
      if (dist > maxLen) { _v.multiplyScalar(maxLen / dist); _A.copy(_H).add(_v); dist = maxLen; }
      dist = Math.max(dist, Math.abs(df.l1 - df.l2) + 0.01 * S, 0.02 * S);
      _v.normalize();
      const a = (df.l1 * df.l1 - df.l2 * df.l2 + dist * dist) / (2 * dist), h = Math.sqrt(Math.max(0, df.l1 * df.l1 - a * a));
      _n.set(1, 0, 0).applyQuaternion(body.quaternion); // knees bend in the body's sagittal plane
      _n.y *= 0.3; _n.normalize();
      _v2.crossVectors(_n, _v).normalize();
      _K.copy(_H).addScaledVector(_v, a).addScaledVector(_v2, h * df.bend);
      L.u.position.copy(_H);
      basisQuat(L.u.quaternion, _H.x, _H.y, _H.z, _K.x, _K.y, _K.z, _n).multiply(L.qU);
      L.l.position.copy(_K);
      basisQuat(L.l.quaternion, _K.x, _K.y, _K.z, _A.x, _A.y, _A.z, _n).multiply(L.qL);
      L.f.position.copy(_A); L.f.quaternion.copy(_qFoot);
    }

    // ---------------------------------------------------------------- neck and head
    // look target in the chest frame
    let tYaw = 0, tPitch = 0;
    if (s.lookW > 0.01) {
      const lx = c.look.x - px, lz = c.look.z - pz;
      _v.set(lx * cyw - lz * syw, c.look.y - py, lx * syw + lz * cyw);
      _v2.copy(Rst.head).sub(Rst.chest).applyQuaternion(chestB.quaternion).add(chestB.position);
      _v.sub(_v2); _q.copy(chestB.quaternion).invert(); _v.applyQuaternion(_q);
      tYaw = Math.atan2(_v.x, _v.z); tPitch = Math.atan2(_v.y, Math.hypot(_v.x, _v.z)) + K.headPitch * 0.8;
      if (Math.abs(tYaw) > 2.4) tYaw = this.lookYaw > 0 ? 2.4 : -2.4;
    }
    this.idleT -= dt;
    if (this.idleT < 0) {
      this.idleT = 0.7 + this.rng() * 2.6;
      this.idleYaw = (this.rng() - 0.5) * 1.9; this.idlePitch = (this.rng() - 0.6) * 0.3; this.idleRoll = this.rng() < 0.3 ? (this.rng() - 0.5) * 0.7 : 0;
    }
    const idleW = (1 - s.lookW) * (1 - s.sniff) * (1 - rel) * (1 - s.stun);
    tYaw = clamp(tYaw * s.lookW + this.idleYaw * idleW, -1.7, 1.7);
    tPitch = clamp(tPitch * s.lookW + this.idlePitch * idleW, -0.8 - s.rear * 0.8, 1.35);
    this.lookYaw = damp(this.lookYaw, tYaw, 11, dt); this.lookPitch = damp(this.lookPitch, tPitch, 11, dt);
    const ly = this.lookYaw + Math.sin(t * 2.4) * 0.5 * s.stun + this.bend * 0.6 + Math.sin(t * 5) * 0.25 * s.sniff + this.flX * 0.5 + Math.sin(t * 24) * 0.5 * s.shake;
    const lpch = this.lookPitch;
    const snf = s.sniff * (1 + 0.06 * Math.sin(t * 11));
    const neckP = snf * 1.15 + s.growl * 0.55 + s.crouch * 0.5 + s.fear * 0.35 + s.stun * 0.4 - s.alert * 0.1 - bp * 0.12 + s.lie * 0.15 + gal * 0.3 + trot * 0.1
      - flex * 0.08 + s.skid * 0.3 + Math.max(sq, 0) * 0.5 - this.flZ * 0.25 - lpch * 0.4 + s.sit * 0.1 - s.rear * 0.25;
    const headP = -snf * 0.35 - s.growl * 0.45 - s.crouch * 0.45 + s.stun * 0.25 - bp * 0.12 - gal * 0.25 - s.skid * 0.1 - lpch * 0.6 - this.flZ * 0.3 - s.lie * 0.1;
    const headRoll = Math.cos(t * 2.4) * 0.35 * s.stun + this.idleRoll * idleW + this.flX * 0.3 - this.roll * 0.5 + Math.sin(t * 24 + 1) * 0.3 * s.shake;
    qe(_q, neckP, ly * 0.45, 0);
    this._attach(B.neck, chestB, Rst.neck, Rst.chest, _q);
    qe(_q, headP, ly * 0.55, headRoll);
    this._attach(B.head, B.neck, Rst.head, Rst.neck, _q);
    // bark thrust: push the head forward along its own axis
    if (bp > 0) { _v.set(0, 0, bp * 0.07 * S).applyQuaternion(B.head.quaternion); B.head.position.add(_v); }
    const head = B.head;
    // jaw
    const snap = s.leap > 0.3 ? (s.leapT < 0.78 ? 0.85 : 0.0) : 0;
    const jaw = Math.max(bp * 0.75, s.pant * (0.24 + 0.05 * Math.sin(t * 15)), s.growl * 0.13, s.jaw, snap, s.stun * 0.18, s.rear * s.scrabble * 0.12);
    qe(_q, jaw, 0, 0);
    this._attach(B.jaw, head, Rst.jaw, Rst.head, _q);
    // tongue slides out when panting / stunned
    const tOut = sat(Math.max(s.pant, s.stun * 0.9) - bp);
    _q.identity();
    this._attach(B.tongue, B.jaw, Rst.tongue, Rst.jaw, _q);
    _v.set(Math.sin(t * 2.4) * 0.02 * S * s.stun, 0.004 * S * Math.sin(t * 15) * s.pant, -(1 - tOut) * K.ml * S * 0.95).applyQuaternion(B.jaw.quaternion);
    B.tongue.position.add(_v);
    B.tongue.scale.set(1, mix(0.3, 1, tOut), mix(0.5, 1, tOut));
    // eyes: blink, squint when hit, sleepy when stunned
    _q.identity();
    this._attach(B.eyes, head, Rst.eyes, Rst.head, _q);
    const lid = Math.max(this.blink > 0 ? Math.sin(Math.min(this.blink, 1) * Math.PI) : 0, this.squint, s.stun * 0.55, Math.max(sq, 0) * 0.9);
    B.eyes.scale.set(1, mix(1, 0.12, sat(lid)) * (1 + s.alert * 0.12 + s.fear * 0.1), 1);
    // brows: angry = inner ends down, worried = inner ends up, alert = raised
    const anger = sat(s.growl + s.crouch + s.leap + s.hackle * 0.6), worry = sat(s.fear + s.stun * 0.7 + this.squint);
    for (let sgn = -1; sgn <= 1; sgn += 2) {
      const bone = sgn > 0 ? B.browL : B.browR, rst = sgn > 0 ? Rst.browL : Rst.browR;
      qe(_q, 0, 0, sgn * (anger * 0.55 - worry * 0.6));
      this._attach(bone, head, rst, Rst.head, _q);
      _v.set(0, (s.alert * 0.035 - anger * 0.03 + worry * 0.02) * d.cr, anger * 0.02 * d.cr).applyQuaternion(head.quaternion);
      bone.position.add(_v);
    }
    // ears
    this.earV += (-this.earFlop * 160 - this.earV * 9 - this.vyS * 22) * dt; this.earFlop = clamp(this.earFlop + this.earV * dt, -0.7, 0.7);
    const floppy = K.ear === 'pointy' ? 0.12 : 1;
    const earBack = sat(s.fear + s.growl * 0.8 + s.crouch * 0.6 + gal * 0.6 + s.stun * 0.5 + this.squint * 0.6);
    for (let sgn = -1; sgn <= 1; sgn += 2) {
      const bone = sgn > 0 ? B.earL : B.earR, rst = sgn > 0 ? Rst.earL : Rst.earR;
      const tw = Math.sin(t * 1.3 + sgn) > 0.93 ? 0.2 : 0;
      if (K.ear === 'pointy') qe(_q, -earBack * 0.85 + s.alert * 0.1 + this.earFlop * floppy, sgn * (earBack * 0.3), -sgn * (0.12 + earBack * 0.35 - s.alert * 0.14 + tw));
      else qe(_q, -earBack * 0.5 + this.earFlop * 0.5 * floppy, sgn * earBack * 0.25, sgn * (s.alert * 0.12 - earBack * 0.15 + tw * 0.5 + Math.abs(this.earFlop) * 0.3));
      this._attach(bone, head, rst, Rst.head, _q);
    }

    // ---------------------------------------------------------------- tail with follow-through
    const wagF = 9 + s.wag * 6;
    const tuck = s.fear;
    const up = (s.alert * 0.35 + s.crouch * 0.5 + s.growl * 0.25 + gal * 0.3) * (K.tailAng < 0 ? 2.2 : 0.4) - s.sit * 0.2;
    this.tailLag = damp(this.tailLag, clamp(-s.turn * 0.25 - this.flX, -1, 1), 5, dt);
    const tuckTotal = (-2.15 - K.tailAng) * tuck;
    let prev = hipsB, prevRest = Rst.hips;
    for (let i = 0; i < 4; i++) {
      const bone = B['tail' + i], rst = Rst['tail' + i];
      const wag = Math.sin(t * wagF - i * 0.7) * (0.1 + 0.12 * i) * (s.wag * (1 - tuck) + s.crouch * 0.8);
      this.tailYaw[i] = damp(this.tailYaw[i], i === 0 ? this.tailLag * 0.4 : this.tailYaw[i - 1] * 1.25, 9 - i * 1.5, dt);
      const pitchD = tuckTotal * (i === 0 ? 0.4 : 0.2) + (i === 0 ? up : up * 0.15) + this.vyS * -0.05 * (i + 1) * (K.tailAng < 0 ? 1 : 0.4)
        + Math.sin(t * 1.1 + i) * 0.03 + (i > 0 ? gal * flex * 0.12 : 0);
      qe(_q, pitchD, wag + this.tailYaw[i], 0);
      this._attach(bone, prev, rst, prevRest, _q);
      prev = bone; prevRest = rst;
    }

    // outputs (model space)
    this.mouthLocal.copy(b.mouthRest).sub(Rst.head).applyQuaternion(head.quaternion).add(head.position);
    this.headTopLocal.copy(b.headTopRest).sub(Rst.head).applyQuaternion(head.quaternion).add(head.position);
  }
}
