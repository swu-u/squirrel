// Geometry batcher for the city: merges boxes, quads, cylinders and blobs into one
// mesh per (material, chunk), and registers matching collision primitives.
// Works in a stack of local frames (translation + yaw).
import * as THREE from 'three';

const _q = new THREE.Quaternion(), _qy = new THREE.Quaternion(), _e = new THREE.Euler(0, 0, 0, 'YXZ');
const _m = new THREE.Matrix4(), _v = new THREE.Vector3(), _n = new THREE.Vector3();
const WHITE = [1, 1, 1];
const snap = (v) => (Math.abs(v) < 1e-12 ? 0 : Math.abs(v - 1) < 1e-12 ? 1 : Math.abs(v + 1) < 1e-12 ? -1 : v);

// sRGB hex -> linear [r,g,b]
const _c = new THREE.Color();
export function C(hex, mul = 1) { _c.set(hex); return [_c.r * mul, _c.g * mul, _c.b * mul]; }
export function mixC(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
export function mulC(a, k) { return [a[0] * k, a[1] * k, a[2] * k]; }
export function varyC(a, rng, amt = 0.08) { const k = 1 + (rng() - 0.5) * 2 * amt; return [a[0] * k, a[1] * k * (1 + (rng() - 0.5) * amt), a[2] * k * (1 + (rng() - 0.5) * amt)]; }

class Batch {
  constructor(mat) { this.mat = mat; this.pos = []; this.nor = []; this.uv = []; this.col = []; this.idx = []; this.n = 0; }
}

// box faces: [normal axis, sign, corner signs x4 (a,b,c,d)]
const FACES = [
  { k: 'pz', n: [0, 0, 1], c: [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]], u: 0, v: 1 },
  { k: 'nz', n: [0, 0, -1], c: [[1, -1, -1], [-1, -1, -1], [-1, 1, -1], [1, 1, -1]], u: 0, v: 1 },
  { k: 'px', n: [1, 0, 0], c: [[1, -1, 1], [1, -1, -1], [1, 1, -1], [1, 1, 1]], u: 2, v: 1 },
  { k: 'nx', n: [-1, 0, 0], c: [[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]], u: 2, v: 1 },
  { k: 'py', n: [0, 1, 0], c: [[-1, 1, 1], [1, 1, 1], [1, 1, -1], [-1, 1, -1]], u: 0, v: 2 },
  { k: 'ny', n: [0, -1, 0], c: [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]], u: 0, v: 2 },
];

export class Builder {
  constructor(world) {
    this.world = world;
    this.batches = new Map();
    this.chunk = 'base';
    this.stack = [];
    this.fx = 0; this.fy = 0; this.fz = 0; this.yaw = 0; this.cs = 1; this.sn = 0;
    this.uvOx = 0; this.uvOy = 0;
    this.collide = true;
  }
  push(x, y, z, yaw = 0) {
    this.stack.push(this.fx, this.fy, this.fz, this.yaw);
    const wx = this.wx(x, z), wz = this.wz(x, z);
    this.fx = wx; this.fy += y; this.fz = wz; this.yaw += yaw;
    this.cs = snap(Math.cos(this.yaw)); this.sn = snap(Math.sin(this.yaw));
  }
  /** push an absolute (world) frame */
  pushAbs() { this.stack.push(this.fx, this.fy, this.fz, this.yaw); this.fx = this.fy = this.fz = this.yaw = 0; this.cs = 1; this.sn = 0; }
  pop() {
    this.yaw = this.stack.pop(); this.fz = this.stack.pop(); this.fy = this.stack.pop(); this.fx = this.stack.pop();
    this.cs = snap(Math.cos(this.yaw)); this.sn = snap(Math.sin(this.yaw));
  }
  wx(x, z) { return this.fx + x * this.cs + z * this.sn; }
  wz(x, z) { return this.fz - x * this.sn + z * this.cs; }
  toWorld(x, y, z, out = new THREE.Vector3()) { return out.set(this.wx(x, z), this.fy + y, this.wz(x, z)); }
  setChunk(k) { this.chunk = k; }
  batch(mat) {
    const key = mat.name + '|' + (mat.userData.global ? 'all' : this.chunk);
    let b = this.batches.get(key);
    if (!b) this.batches.set(key, b = new Batch(mat));
    return b;
  }
  // push one vertex given in the local frame
  _v(B, x, y, z, nx, ny, nz, u, v, r, g, b, a) {
    B.pos.push(this.fx + x * this.cs + z * this.sn, this.fy + y, this.fz - x * this.sn + z * this.cs);
    B.nor.push(nx * this.cs + nz * this.sn, ny, -nx * this.sn + nz * this.cs);
    B.uv.push(u, v); B.col.push(r, g, b, a);
    return B.n++;
  }
  /** Quad a,b,c,d ([x,y,z] local, counter-clockwise seen from the front). uv = [u0,v0,u1,v1].
   *  col multiplied by ao0 on a,b and ao1 on c,d. */
  quad(mat, a, b, c, d, uv, col = WHITE, ao0 = 1, ao1 = 1, nrm = null) {
    const B = this.batch(mat);
    let nx, ny, nz;
    if (nrm && nrm.length === 4) {
      const u0 = uv ? uv[0] : 0, v0 = uv ? uv[1] : 0, u1 = uv ? uv[2] : 1, v1 = uv ? uv[3] : 1;
      const i0 = this._v(B, a[0], a[1], a[2], nrm[0][0], nrm[0][1], nrm[0][2], u0, v0, col[0] * ao0, col[1] * ao0, col[2] * ao0, ao0);
      this._v(B, b[0], b[1], b[2], nrm[1][0], nrm[1][1], nrm[1][2], u1, v0, col[0] * ao0, col[1] * ao0, col[2] * ao0, ao0);
      this._v(B, c[0], c[1], c[2], nrm[2][0], nrm[2][1], nrm[2][2], u1, v1, col[0] * ao1, col[1] * ao1, col[2] * ao1, ao1);
      this._v(B, d[0], d[1], d[2], nrm[3][0], nrm[3][1], nrm[3][2], u0, v1, col[0] * ao1, col[1] * ao1, col[2] * ao1, ao1);
      B.idx.push(i0, i0 + 1, i0 + 2, i0, i0 + 2, i0 + 3);
      return;
    }
    if (nrm) { nx = nrm[0]; ny = nrm[1]; nz = nrm[2]; } else {
      const e1x = b[0] - a[0], e1y = b[1] - a[1], e1z = b[2] - a[2], e2x = d[0] - a[0], e2y = d[1] - a[1], e2z = d[2] - a[2];
      nx = e1y * e2z - e1z * e2y; ny = e1z * e2x - e1x * e2z; nz = e1x * e2y - e1y * e2x;
      const l = Math.hypot(nx, ny, nz) || 1; nx /= l; ny /= l; nz /= l;
    }
    const u0 = uv ? uv[0] : 0, v0 = uv ? uv[1] : 0, u1 = uv ? uv[2] : 1, v1 = uv ? uv[3] : 1;
    const i0 = this._v(B, a[0], a[1], a[2], nx, ny, nz, u0, v0, col[0] * ao0, col[1] * ao0, col[2] * ao0, ao0);
    this._v(B, b[0], b[1], b[2], nx, ny, nz, u1, v0, col[0] * ao0, col[1] * ao0, col[2] * ao0, ao0);
    this._v(B, c[0], c[1], c[2], nx, ny, nz, u1, v1, col[0] * ao1, col[1] * ao1, col[2] * ao1, ao1);
    this._v(B, d[0], d[1], d[2], nx, ny, nz, u0, v1, col[0] * ao1, col[1] * ao1, col[2] * ao1, ao1);
    B.idx.push(i0, i0 + 1, i0 + 2, i0, i0 + 2, i0 + 3);
  }
  /** Quad in the frame's XY plane at depth z, facing +z. Tiled uv from the material, or an atlas rect. */
  fq(mat, x0, y0, x1, y1, z, col, ao0 = 1, ao1 = 1, rect = null) {
    let uv = rect;
    if (!uv) { const t = mat.userData.tile || 1; uv = [(x0 + this.uvOx) / t, (y0 + this.uvOy) / t, (x1 + this.uvOx) / t, (y1 + this.uvOy) / t]; }
    this.quad(mat, [x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z], uv, col, ao0, ao1);
  }
  /** Horizontal quad at height y, facing up, tiled uv from x,z. */
  hq(mat, x0, z0, x1, z1, y, col, tile) {
    const t = tile || mat.userData.tile || 1;
    // world-anchored uv so neighbouring quads line up
    const ax = this.wx(x0, z1), az = this.wz(x0, z1);
    const w = x1 - x0, d = z1 - z0;
    const B = this.batch(mat), c = col || WHITE;
    const u0 = ax / t, v0 = az / t;
    const i0 = this._v(B, x0, y, z1, 0, 1, 0, u0, v0, c[0], c[1], c[2], 1);
    this._v(B, x1, y, z1, 0, 1, 0, u0 + w / t, v0, c[0], c[1], c[2], 1);
    this._v(B, x1, y, z0, 0, 1, 0, u0 + w / t, v0 + d / t, c[0], c[1], c[2], 1);
    this._v(B, x0, y, z0, 0, 1, 0, u0, v0 + d / t, c[0], c[1], c[2], 1);
    B.idx.push(i0, i0 + 1, i0 + 2, i0, i0 + 2, i0 + 3);
  }
  tri(mat, a, b, c, uva, uvb, uvc, col = WHITE, aoa = 1, aob = 1, aoc = 1, nrm = null) {
    const B = this.batch(mat);
    const e1x = b[0] - a[0], e1y = b[1] - a[1], e1z = b[2] - a[2], e2x = c[0] - a[0], e2y = c[1] - a[1], e2z = c[2] - a[2];
    let nx = e1y * e2z - e1z * e2y, ny = e1z * e2x - e1x * e2z, nz = e1x * e2y - e1y * e2x;
    const l = Math.hypot(nx, ny, nz) || 1; nx /= l; ny /= l; nz /= l;
    if (nrm) { nx = nrm[0]; ny = nrm[1]; nz = nrm[2]; }
    const i0 = this._v(B, a[0], a[1], a[2], nx, ny, nz, uva[0], uva[1], col[0] * aoa, col[1] * aoa, col[2] * aoa, aoa);
    this._v(B, b[0], b[1], b[2], nx, ny, nz, uvb[0], uvb[1], col[0] * aob, col[1] * aob, col[2] * aob, aob);
    this._v(B, c[0], c[1], c[2], nx, ny, nz, uvc[0], uvc[1], col[0] * aoc, col[1] * aoc, col[2] * aoc, aoc);
    B.idx.push(i0, i0 + 1, i0 + 2);
  }
  _localQuat(o) {
    if (o && o.rot) { _e.set(o.rot[0], o.rot[1], o.rot[2], 'YXZ'); _q.setFromEuler(_e); return _q; }
    if (o && o.yaw) { _e.set(0, o.yaw, 0, 'YXZ'); _q.setFromEuler(_e); return _q; }
    return null;
  }
  /** Box centred at x,y,z with full sizes sx,sy,sz. o: { c, ao:[bottom,top], rot:[rx,ry,rz] (YXZ), yaw, tile, skip:'py ny ...', rect } */
  box(mat, x, y, z, sx, sy, sz, o) {
    const B = this.batch(mat);
    const col = (o && o.c) || WHITE, ao0 = o && o.ao ? o.ao[0] : 1, ao1 = o && o.ao ? o.ao[1] : 1;
    const t = (o && o.tile) || mat.userData.tile || 1, skip = o && o.skip;
    const q = this._localQuat(o);
    let ax = [1, 0, 0], ay = [0, 1, 0], az = [0, 0, 1];
    if (q) { _m.makeRotationFromQuaternion(q); const e = _m.elements; ax = [e[0], e[1], e[2]]; ay = [e[4], e[5], e[6]]; az = [e[8], e[9], e[10]]; }
    const hx = sx / 2, hy = sy / 2, hz = sz / 2, hs = [hx, hy, hz], ctr = [x, y, z];
    for (let f = 0; f < 6; f++) {
      const F = FACES[f];
      if (skip && skip.indexOf(F.k) >= 0) continue;
      const nx = F.n[0] * ax[0] + F.n[1] * ay[0] + F.n[2] * az[0], ny = F.n[0] * ax[1] + F.n[1] * ay[1] + F.n[2] * az[1], nz = F.n[0] * ax[2] + F.n[1] * ay[2] + F.n[2] * az[2];
      const i0 = B.n;
      for (let k = 0; k < 4; k++) {
        const cx = F.c[k][0] * hx, cy = F.c[k][1] * hy, cz = F.c[k][2] * hz;
        const px = x + ax[0] * cx + ay[0] * cy + az[0] * cz, py = y + ax[1] * cx + ay[1] * cy + az[1] * cz, pz = z + ax[2] * cx + ay[2] * cy + az[2] * cz;
        const ao = F.c[k][1] < 0 ? ao0 : ao1;
        const lu = F.c[k][F.u] * hs[F.u] + ctr[F.u], lv = F.c[k][F.v] * hs[F.v] + ctr[F.v];
        this._v(B, px, py, pz, nx, ny, nz, (lu + this.uvOx) / t, (lv + this.uvOy) / t, col[0] * ao, col[1] * ao, col[2] * ao, ao);
      }
      B.idx.push(i0, i0 + 1, i0 + 2, i0, i0 + 2, i0 + 3);
    }
  }
  /** Cylinder / cone from a to b ([x,y,z] local). caps: 1 = cap at a, 2 = cap at b, 3 = both. */
  cyl(mat, a, b, ra, rb, seg = 8, col = WHITE, caps = 2, ao0 = 1, ao1 = 1) {
    const B = this.batch(mat);
    let dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    const len = Math.hypot(dx, dy, dz) || 1e-6; dx /= len; dy /= len; dz /= len;
    // perpendicular basis
    let px, py, pz;
    if (Math.abs(dy) > 0.99) { px = 1; py = 0; pz = 0; } else { px = -dz; py = 0; pz = dx; const l = Math.hypot(px, pz); px /= l; pz /= l; }
    const qx = dy * pz - dz * py, qy = dz * px - dx * pz, qz = dx * py - dy * px;
    const t = mat.userData.tile || 1, slope = (ra - rb) / len;
    const i0 = B.n;
    for (let i = 0; i <= seg; i++) {
      const an = (i / seg) * Math.PI * 2, c = Math.cos(an), s = Math.sin(an);
      const rx = px * c + qx * s, ry = py * c + qy * s, rz = pz * c + qz * s;
      let nx = rx + dx * slope, ny = ry + dy * slope, nz = rz + dz * slope; const nl = Math.hypot(nx, ny, nz); nx /= nl; ny /= nl; nz /= nl;
      const u = (i / seg) * Math.max(1, Math.round((Math.PI * 2 * Math.max(ra, rb)) / t));
      this._v(B, a[0] + rx * ra, a[1] + ry * ra, a[2] + rz * ra, nx, ny, nz, u, 0, col[0] * ao0, col[1] * ao0, col[2] * ao0, ao0);
      this._v(B, b[0] + rx * rb, b[1] + ry * rb, b[2] + rz * rb, nx, ny, nz, u, len / t, col[0] * ao1, col[1] * ao1, col[2] * ao1, ao1);
    }
    for (let i = 0; i < seg; i++) { const k = i0 + i * 2; B.idx.push(k, k + 2, k + 1, k + 1, k + 2, k + 3); }
    const cap = (p, r, sgn, ao) => {
      if (r < 1e-4) return;
      const c0 = this._v(B, p[0], p[1], p[2], dx * sgn, dy * sgn, dz * sgn, 0.5, 0.5, col[0] * ao, col[1] * ao, col[2] * ao, ao);
      for (let i = 0; i <= seg; i++) {
        const an = (i / seg) * Math.PI * 2, c = Math.cos(an), s = Math.sin(an);
        this._v(B, p[0] + (px * c + qx * s) * r, p[1] + (py * c + qy * s) * r, p[2] + (pz * c + qz * s) * r, dx * sgn, dy * sgn, dz * sgn, 0.5 + c * 0.5, 0.5 + s * 0.5, col[0] * ao, col[1] * ao, col[2] * ao, ao);
      }
      for (let i = 0; i < seg; i++) { if (sgn > 0) B.idx.push(c0, c0 + 1 + i, c0 + 2 + i); else B.idx.push(c0, c0 + 2 + i, c0 + 1 + i); }
    };
    if (caps & 1) cap(a, ra, -1, ao0);
    if (caps & 2) cap(b, rb, 1, ao1);
  }
  /** Ellipsoid blob. o: { seg, rings, noise, seed, top (colour at top), flat (cut below centre fraction 0..1) } */
  blob(mat, x, y, z, rx, ry, rz, col = WHITE, o) {
    const B = this.batch(mat);
    const seg = (o && o.seg) || 8, rings = (o && o.rings) || 5, noise = (o && o.noise) || 0, seed = (o && o.seed) || 1;
    const top = (o && o.top) || col, bot = (o && o.bottomAo) || 0.6;
    const i0 = B.n;
    for (let j = 0; j <= rings; j++) {
      const v = j / rings, ph = v * Math.PI, sp = Math.sin(ph), cp = Math.cos(ph);
      for (let i = 0; i <= seg; i++) {
        const u = (i % seg) / seg, th = u * Math.PI * 2;
        let k = 1;
        if (noise) { const h = Math.sin((i % seg) * 12.9898 + j * 78.233 + seed * 37.719) * 43758.5453; k = 1 + ((h - Math.floor(h)) - 0.5) * 2 * noise; }
        if (j === 0 || j === rings) k = 1;
        const nx = sp * Math.cos(th), ny = cp, nz = sp * Math.sin(th);
        const t = (cp + 1) / 2, ao = bot + (1 - bot) * t;
        this._v(B, x + nx * rx * k, y + ny * ry * k, z + nz * rz * k, nx, ny, nz, u, v,
          (col[0] + (top[0] - col[0]) * t) * ao, (col[1] + (top[1] - col[1]) * t) * ao, (col[2] + (top[2] - col[2]) * t) * ao, 1);
      }
    }
    for (let j = 0; j < rings; j++) for (let i = 0; i < seg; i++) {
      const a = i0 + j * (seg + 1) + i, b = a + seg + 1;
      B.idx.push(a, a + 1, b, a + 1, b + 1, b);
    }
  }
  // ---------- collision ----------
  cbox(x, y, z, sx, sy, sz, kind, o, extra) {
    if (!this.collide) return null;
    const q = this._localQuat(o);
    _e.set(0, this.yaw, 0, 'YXZ'); _qy.setFromEuler(_e);
    if (q) _qy.multiply(q);
    return this.world.addBox({ x: this.wx(x, z), y: this.fy + y, z: this.wz(x, z) }, { x: sx / 2, y: sy / 2, z: sz / 2 }, _qy, { kind, ...(extra || {}) });
  }
  ccap(a, b, ra, rb, kind, extra) {
    if (!this.collide) return null;
    return this.world.addCapsule({ x: this.wx(a[0], a[2]), y: this.fy + a[1], z: this.wz(a[0], a[2]) }, { x: this.wx(b[0], b[2]), y: this.fy + b[1], z: this.wz(b[0], b[2]) }, ra, rb, { kind, ...(extra || {}) });
  }
  /** Octagonal prism (4 boxes) standing in for a vertical cylinder of radius r. */
  ccyl(x, z, y0, y1, r, kind, extra) {
    const a = r * Math.cos(Math.PI / 8), s = r * Math.sin(Math.PI / 8);
    for (let i = 0; i < 4; i++) this.cbox(x, (y0 + y1) / 2, z, a * 2, y1 - y0, s * 2, kind, { yaw: (i * Math.PI) / 4 }, extra);
  }
  /** visual + collision box */
  sbox(mat, x, y, z, sx, sy, sz, kind, o, extra) { this.box(mat, x, y, z, sx, sy, sz, o); return this.cbox(x, y, z, sx, sy, sz, kind, o, extra); }
  /** visual cylinder + collision capsule (capsule shortened by its radius at both ends) */
  scyl(mat, a, b, ra, rb, seg, col, kind, caps = 2, extra) {
    this.cyl(mat, a, b, ra, rb, seg, col, caps);
    return this.ccap(a, b, ra, rb, kind, extra);
  }
  // ---------- output ----------
  build(group) {
    let tris = 0;
    for (const [key, B] of this.batches) {
      if (!B.n) continue;
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(B.pos, 3));
      g.setAttribute('normal', new THREE.Float32BufferAttribute(B.nor, 3));
      g.setAttribute('uv', new THREE.Float32BufferAttribute(B.uv, 2));
      g.setAttribute('color', new THREE.Float32BufferAttribute(B.col, 4));
      g.setIndex(B.n > 65535 ? new THREE.Uint32BufferAttribute(B.idx, 1) : new THREE.Uint16BufferAttribute(B.idx, 1));
      g.computeBoundingSphere(); g.computeBoundingBox();
      const m = new THREE.Mesh(g, B.mat);
      m.name = key; m.castShadow = !!B.mat.userData.cast; m.receiveShadow = B.mat.userData.receive !== false;
      m.matrixAutoUpdate = false;
      if (B.mat.userData.order) m.renderOrder = B.mat.userData.order;
      group.add(m);
      tris += B.idx.length / 3;
    }
    this.batches.clear();
    return tris;
  }
}
