// Collision world: capsules (trunks, branches, poles, wires), oriented boxes
// (buildings, roofs, props) and a ground height function, in a 2D spatial hash.
// Everything the squirrel can stand on or climb is registered here.
import * as THREE from 'three';

const CELL = 4;
const KEY = (ix, iz) => (ix + 2048) * 4096 + (iz + 2048);
const _e = new THREE.Euler();
const _q = new THREE.Quaternion();
const _m = new THREE.Matrix4();

export class World {
  constructor() {
    this.prims = [];
    this.grid = new Map();
    this.groundFn = () => 0;
    this.groundPrim = { type: 'ground', id: -1, kind: 'ground' };
    this.stamp = 1;
    // playable area (soft wall is applied by the player controller)
    this.bounds = { minX: -120, maxX: 120, minZ: -120, maxZ: 120 };
    this._tmp = { dist: 0, point: new THREE.Vector3(), normal: new THREE.Vector3(), prim: null, t: 0 };
  }

  setGroundHeightFn(fn) { this.groundFn = fn; }
  groundHeight(x, z) { return this.groundFn(x, z); }

  /** Tapered capsule from a to b ({x,y,z}), radius ra at a and rb at b.
   *  opts.kind: 'trunk' | 'branch' | 'pole' | 'wire' | 'rail' | ... (free string)
   *  opts.noJumpTarget: true to hide from jump assist. Returns the primitive. */
  addCapsule(a, b, ra, rb = ra, opts = {}) {
    const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z;
    const len = Math.max(1e-5, Math.hypot(dx, dy, dz));
    const p = {
      type: 'capsule', id: this.prims.length, stamp: 0, kind: 'branch',
      ax: a.x, ay: a.y, az: a.z, bx: b.x, by: b.y, bz: b.z,
      dx: dx / len, dy: dy / len, dz: dz / len, len, ra, rb, ...opts,
    };
    this.prims.push(p);
    const r = Math.max(ra, rb) + 0.01;
    this._insert(p, Math.min(a.x, b.x) - r, Math.max(a.x, b.x) + r, Math.min(a.z, b.z) - r, Math.max(a.z, b.z) + r);
    p.minY = Math.min(a.y, b.y) - r; p.maxY = Math.max(a.y, b.y) + r;
    return p;
  }

  /** Oriented box. center {x,y,z}, half {x,y,z} half extents,
   *  rot: number (yaw, radians) | THREE.Euler | THREE.Quaternion | undefined.
   *  opts.kind: 'building' | 'roof' | 'prop' | 'car' | 'fence' | ... Returns the primitive. */
  addBox(center, half, rot = 0, opts = {}) {
    if (typeof rot === 'number') _q.setFromEuler(_e.set(0, rot, 0));
    else if (rot && rot.isEuler) _q.setFromEuler(rot);
    else if (rot && rot.isQuaternion) _q.copy(rot);
    else _q.identity();
    _m.makeRotationFromQuaternion(_q);
    const e = _m.elements;
    const p = {
      type: 'box', id: this.prims.length, stamp: 0, kind: 'building',
      cx: center.x, cy: center.y, cz: center.z, hx: half.x, hy: half.y, hz: half.z,
      // local axes in world space (columns of rotation matrix)
      xx: e[0], xy: e[1], xz: e[2], yx: e[4], yy: e[5], yz: e[6], zx: e[8], zy: e[9], zz: e[10],
      ...opts,
    };
    this.prims.push(p);
    const ex = Math.abs(p.xx) * half.x + Math.abs(p.yx) * half.y + Math.abs(p.zx) * half.z;
    const ey = Math.abs(p.xy) * half.x + Math.abs(p.yy) * half.y + Math.abs(p.zy) * half.z;
    const ez = Math.abs(p.xz) * half.x + Math.abs(p.yz) * half.y + Math.abs(p.zz) * half.z;
    p.minY = center.y - ey; p.maxY = center.y + ey;
    this._insert(p, center.x - ex, center.x + ex, center.z - ez, center.z + ez);
    return p;
  }

  finalize() { /* primitives are indexed as they are added; kept for API symmetry */ }

  _insert(p, x0, x1, z0, z1) {
    const ix0 = Math.floor(x0 / CELL), ix1 = Math.floor(x1 / CELL);
    const iz0 = Math.floor(z0 / CELL), iz1 = Math.floor(z1 / CELL);
    for (let ix = ix0; ix <= ix1; ix++) for (let iz = iz0; iz <= iz1; iz++) {
      const k = KEY(ix, iz);
      let c = this.grid.get(k);
      if (!c) this.grid.set(k, c = []);
      c.push(p);
    }
  }

  /** Calls cb(prim) once for every primitive whose footprint is within radius of (x,z). */
  queryPrims(x, z, radius, cb) {
    const stamp = ++this.stamp;
    const ix0 = Math.floor((x - radius) / CELL), ix1 = Math.floor((x + radius) / CELL);
    const iz0 = Math.floor((z - radius) / CELL), iz1 = Math.floor((z + radius) / CELL);
    for (let ix = ix0; ix <= ix1; ix++) for (let iz = iz0; iz <= iz1; iz++) {
      const c = this.grid.get(KEY(ix, iz));
      if (!c) continue;
      for (let i = 0; i < c.length; i++) {
        const p = c[i];
        if (p.stamp === stamp) continue;
        p.stamp = stamp;
        cb(p);
      }
    }
  }

  /** Signed distance + closest surface point + normal for ONE primitive.
   *  Writes into out {dist, point, normal, t}. */
  primDistance(prim, p, out) {
    if (prim.type === 'capsule') {
      let t = ((p.x - prim.ax) * prim.dx + (p.y - prim.ay) * prim.dy + (p.z - prim.az) * prim.dz) / prim.len;
      const tRaw = t;
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      const cx = prim.ax + prim.dx * prim.len * t, cy = prim.ay + prim.dy * prim.len * t, cz = prim.az + prim.dz * prim.len * t;
      const r = prim.ra + (prim.rb - prim.ra) * t;
      let vx = p.x - cx, vy = p.y - cy, vz = p.z - cz;
      let l = Math.hypot(vx, vy, vz);
      if (l < 1e-6) { // on the axis: pick any perpendicular, prefer up
        vx = -prim.dy * prim.dx; vy = 1 - prim.dy * prim.dy; vz = -prim.dy * prim.dz;
        l = Math.hypot(vx, vy, vz);
        if (l < 1e-6) { vx = 1; vy = 0; vz = 0; l = 1; }
        vx /= l; vy /= l; vz /= l;
        out.normal.set(vx, vy, vz);
        out.point.set(cx + vx * r, cy + vy * r, cz + vz * r);
        out.dist = -r; out.t = tRaw;
        return out;
      }
      vx /= l; vy /= l; vz /= l;
      out.normal.set(vx, vy, vz);
      out.point.set(cx + vx * r, cy + vy * r, cz + vz * r);
      out.dist = l - r; out.t = tRaw;
      return out;
    }
    if (prim.type === 'box') {
      const rx = p.x - prim.cx, ry = p.y - prim.cy, rz = p.z - prim.cz;
      const qx = rx * prim.xx + ry * prim.xy + rz * prim.xz;
      const qy = rx * prim.yx + ry * prim.yy + rz * prim.yz;
      const qz = rx * prim.zx + ry * prim.zy + rz * prim.zz;
      let lx = qx < -prim.hx ? -prim.hx : qx > prim.hx ? prim.hx : qx;
      let ly = qy < -prim.hy ? -prim.hy : qy > prim.hy ? prim.hy : qy;
      let lz = qz < -prim.hz ? -prim.hz : qz > prim.hz ? prim.hz : qz;
      let nx, ny, nz, dist;
      if (lx === qx && ly === qy && lz === qz) { // inside
        const px = prim.hx - Math.abs(qx), pz = prim.hz - Math.abs(qz);
        let py = prim.hy - Math.abs(qy);
        // boxes standing on the ground never push things out through their bottom face
        if (prim.grounded === undefined) prim.grounded = prim.yy > 0.7 && prim.minY <= this.groundFn(prim.cx, prim.cz) + 0.45;
        if (prim.grounded && qy < 0) py = Infinity;
        nx = ny = nz = 0;
        if (px <= py && px <= pz) { nx = qx < 0 ? -1 : 1; lx = nx * prim.hx; dist = -px; }
        else if (py <= pz) { ny = qy < 0 ? -1 : 1; ly = ny * prim.hy; dist = -py; }
        else { nz = qz < 0 ? -1 : 1; lz = nz * prim.hz; dist = -pz; }
      } else {
        nx = qx - lx; ny = qy - ly; nz = qz - lz;
        dist = Math.hypot(nx, ny, nz);
        nx /= dist; ny /= dist; nz /= dist;
      }
      out.point.set(
        prim.cx + lx * prim.xx + ly * prim.yx + lz * prim.zx,
        prim.cy + lx * prim.xy + ly * prim.yy + lz * prim.zy,
        prim.cz + lx * prim.xz + ly * prim.yz + lz * prim.zz);
      out.normal.set(
        nx * prim.xx + ny * prim.yx + nz * prim.zx,
        nx * prim.xy + ny * prim.yy + nz * prim.zy,
        nx * prim.xz + ny * prim.yz + nz * prim.zz);
      out.dist = dist; out.t = 0;
      return out;
    }
    // ground
    const h = this.groundFn(p.x, p.z);
    const e = 0.35;
    const gx = (this.groundFn(p.x + e, p.z) - this.groundFn(p.x - e, p.z)) / (2 * e);
    const gz = (this.groundFn(p.x, p.z + e) - this.groundFn(p.x, p.z - e)) / (2 * e);
    const il = 1 / Math.hypot(gx, 1, gz);
    out.normal.set(-gx * il, il, -gz * il);
    out.point.set(p.x, h, p.z);
    out.dist = (p.y - h) * il; out.t = 0;
    return out;
  }

  /** Nearest surface to point p within maxDist (signed distance, negative = inside).
   *  out: {dist, point: Vector3, normal: Vector3, prim, t}. Returns out or null.
   *  filter(prim) -> false to skip a primitive. noGround skips the ground. */
  nearest(p, maxDist, out, filter = null, noGround = false) {
    const tmp = this._tmp;
    let best = Infinity;
    out.prim = null;
    if (!noGround) {
      this.primDistance(this.groundPrim, p, tmp);
      if (tmp.dist < maxDist) {
        best = tmp.dist; out.dist = tmp.dist; out.point.copy(tmp.point); out.normal.copy(tmp.normal); out.prim = this.groundPrim; out.t = 0;
      }
    }
    const stamp = ++this.stamp;
    const ix0 = Math.floor((p.x - maxDist) / CELL), ix1 = Math.floor((p.x + maxDist) / CELL);
    const iz0 = Math.floor((p.z - maxDist) / CELL), iz1 = Math.floor((p.z + maxDist) / CELL);
    for (let ix = ix0; ix <= ix1; ix++) for (let iz = iz0; iz <= iz1; iz++) {
      const c = this.grid.get(KEY(ix, iz));
      if (!c) continue;
      for (let i = 0; i < c.length; i++) {
        const pr = c[i];
        if (pr.stamp === stamp) continue;
        pr.stamp = stamp;
        if (p.y < pr.minY - maxDist || p.y > pr.maxY + maxDist) continue;
        if (filter && !filter(pr)) continue;
        this.primDistance(pr, p, tmp);
        if (tmp.dist < best && tmp.dist < maxDist) {
          best = tmp.dist; out.dist = tmp.dist; out.point.copy(tmp.point); out.normal.copy(tmp.normal); out.prim = pr; out.t = tmp.t;
        }
      }
    }
    return out.prim ? out : null;
  }

  /** Sphere-traced ray. Returns hit distance or Infinity. By default only "solid" things
   *  block (ground, boxes, capsules with radius >= minRadius). */
  raycast(origin, dir, maxDist, minRadius = 0.22, skin = 0.05) {
    const out = this._ray || (this._ray = { dist: 0, point: new THREE.Vector3(), normal: new THREE.Vector3(), prim: null, t: 0 });
    const p = this._rp || (this._rp = new THREE.Vector3());
    const filter = (pr) => pr.type === 'box' ? !(pr.noCamera || pr.kind === 'ledge' || pr.kind === 'rail' || pr.kind === 'fence') : Math.max(pr.ra, pr.rb) >= minRadius;
    let t = 0.3;
    for (let i = 0; i < 40 && t < maxDist; i++) {
      p.copy(dir).multiplyScalar(t).add(origin);
      const hit = this.nearest(p, 3, out, filter);
      if (!hit) { t += 3; continue; }
      if (hit.dist < skin) return t;
      t += Math.max(hit.dist, 0.06);
    }
    return Infinity;
  }
}

export function makeHit() {
  return { dist: 0, point: new THREE.Vector3(), normal: new THREE.Vector3(), prim: null, t: 0 };
}
