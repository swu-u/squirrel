// Procedural dog mesh: one skinned mesh per dog (body, head, legs, tail, ears, eyes,
// collar ... all merged, coloured per vertex), a flat list of bones that the animation
// code poses directly in model space, and the fur material.
// Model space: origin = ground point under the chest, +Z = facing, +Y = up.
import * as THREE from 'three';
import { fbm2, valueNoise2 } from '../../core/rng.js';

export const BONE_NAMES = [
  'hips', 'spine', 'chest', 'neck', 'head', 'jaw', 'earL', 'earR', 'browL', 'browR', 'eyes', 'tongue', 'hackle',
  'tail0', 'tail1', 'tail2', 'tail3',
  'FLu', 'FLl', 'FLf', 'FRu', 'FRl', 'FRf', 'HLu', 'HLl', 'HLf', 'HRu', 'HRl', 'HRf',
];
const BI = {};
BONE_NAMES.forEach((n, i) => { BI[n] = i; });

// Proportions for a dog whose withers are 1 unit high; everything is multiplied by S.
export const KINDS = {
  terrier: {
    S: 0.75, L: 0.84, chest: [0.2, 0.2, 0.27], belly: [0.185, 0.19, 0.2], hip: [0.18, 0.19, 0.2], hipTop: 0.97,
    neckLen: 0.3, neckAng: 0.95, neckR0: 0.175, neckR1: 0.14, cr: 0.19, crW: 1.06, ml: 0.25, mr: 0.1, mrW: 1.05, headPitch: 0.22,
    legT: 1.25, sxF: 0.125, sxH: 0.125, ear: 'folded', earLen: 0.3, tailLen: 0.36, tailAng: 1.15, tailR: [0.05, 0.048, 0.042, 0.034, 0.024],
    scruff: 0.03, eye: 0.17, radius: 0.34, maxSpeed: 8.5, health: 2, collar: [0.78, 0.1, 0.08],
  },
  shepherd: {
    S: 1.25, L: 0.98, chest: [0.165, 0.2, 0.3], belly: [0.135, 0.17, 0.17], hip: [0.15, 0.17, 0.19], hipTop: 0.9,
    neckLen: 0.4, neckAng: 0.92, neckR0: 0.165, neckR1: 0.112, cr: 0.128, crW: 1.0, ml: 0.27, mr: 0.066, mrW: 0.95, headPitch: 0.3,
    legT: 1.0, sxF: 0.105, sxH: 0.11, ear: 'pointy', earLen: 0.25, tailLen: 0.62, tailAng: -1.05, tailR: [0.05, 0.068, 0.078, 0.07, 0.03],
    scruff: 0.012, eye: 0.165, radius: 0.46, maxSpeed: 9.5, health: 4, collar: [0.12, 0.2, 0.42],
  },
  bulldog: {
    S: 1.1, L: 0.8, chest: [0.33, 0.21, 0.36], belly: [0.26, 0.2, 0.25], hip: [0.22, 0.19, 0.22], hipTop: 0.93,
    neckLen: 0.2, neckAng: 0.7, neckR0: 0.25, neckR1: 0.23, cr: 0.225, crW: 1.22, ml: 0.13, mr: 0.15, mrW: 1.25, headPitch: 0.12,
    legT: 1.7, sxF: 0.27, sxH: 0.19, ear: 'rose', earLen: 0.2, tailLen: 0.13, tailAng: 0.5, tailR: [0.05, 0.045, 0.04, 0.035, 0.028],
    scruff: 0.006, eye: 0.13, radius: 0.56, maxSpeed: 7, health: 8, collar: [0.07, 0.06, 0.06],
  },
};

// ---------------------------------------------------------------------------- small vector helpers (build time only)
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const mul = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
const lerp3 = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
const mix = (a, b, t) => a + (b - a) * t;
const sat = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const sstep = (a, b, x) => { const t = sat((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const crom = (p0, p1, p2, p3, t) => {
  const t2 = t * t, t3 = t2 * t;
  return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
};

/** ring shorthand: centre, lateral radius, [upper, lower] radius (or one number), bone weights */
const R = (p, rx, ry, w) => ({ p, rx, ryT: Array.isArray(ry) ? ry[0] : ry, ryB: Array.isArray(ry) ? ry[1] : ry, w });

function resample(ctrl, n) {
  const m = ctrl.length, out = [];
  for (let i = 0; i < n; i++) {
    const u = (i / (n - 1)) * (m - 1);
    const k = Math.min(Math.floor(u), m - 2), t = u - k;
    const c0 = ctrl[Math.max(k - 1, 0)], c1 = ctrl[k], c2 = ctrl[k + 1], c3 = ctrl[Math.min(k + 2, m - 1)];
    const p = [0, 1, 2].map((a) => crom(c0.p[a], c1.p[a], c2.p[a], c3.p[a], t));
    const f = (key) => Math.max(0.0005, crom(c0[key], c1[key], c2[key], c3[key], t));
    const ts = t * t * (3 - 2 * t), w = {};
    for (const b in c1.w) w[b] = (w[b] || 0) + c1.w[b] * (1 - ts);
    for (const b in c2.w) w[b] = (w[b] || 0) + c2.w[b] * ts;
    out.push({ p, rx: f('rx'), ryT: f('ryT'), ryB: f('ryB'), w, v: i / (n - 1) });
  }
  return out;
}

// ---------------------------------------------------------------------------- geometry builder
class Builder {
  constructor() {
    this.pos = []; this.nrm = []; this.loc = []; this.meta = []; this.wts = []; this.idx = [];
    this.xf = null; // optional transform for the current part: { o:[3], q: THREE.Quaternion, t:[3] }
    this._p = null;
  }
  begin(part, opts = {}) { this._p = { part, pos: [], wts: [], vt: [], idx: [], scruff: opts.scruff || 0, flat: !!opts.flat }; }
  v(p, w, v = 0, th = 0) { const P = this._p; P.pos.push(p[0], p[1], p[2]); P.wts.push(w); P.vt.push(v, th); return P.pos.length / 3 - 1; }
  tri(a, b, c) { this._p.idx.push(a, b, c); }
  _normals(P) {
    const n = new Float32Array(P.pos.length);
    for (let i = 0; i < P.idx.length; i += 3) {
      const a = P.idx[i] * 3, b = P.idx[i + 1] * 3, c = P.idx[i + 2] * 3;
      const e1 = [P.pos[b] - P.pos[a], P.pos[b + 1] - P.pos[a + 1], P.pos[b + 2] - P.pos[a + 2]];
      const e2 = [P.pos[c] - P.pos[a], P.pos[c + 1] - P.pos[a + 1], P.pos[c + 2] - P.pos[a + 2]];
      const f = cross(e1, e2);
      for (const k of [a, b, c]) { n[k] += f[0]; n[k + 1] += f[1]; n[k + 2] += f[2]; }
    }
    for (let i = 0; i < n.length; i += 3) { const l = Math.hypot(n[i], n[i + 1], n[i + 2]) || 1; n[i] /= l; n[i + 1] /= l; n[i + 2] /= l; }
    return n;
  }
  end() {
    const P = this._p;
    let n = this._normals(P);
    if (P.scruff > 0) {
      for (let i = 0; i < P.pos.length; i += 3) {
        const x = P.pos[i], y = P.pos[i + 1], z = P.pos[i + 2];
        const d = (fbm2(x * 21 + z * 13 + 5, y * 21 - z * 9 + 3, 3) - 0.45) * P.scruff
          + (valueNoise2(x * 55 + z * 37, y * 55 + z * 23) - 0.5) * P.scruff * 0.55;
        P.pos[i] += n[i] * d; P.pos[i + 1] += n[i + 1] * d; P.pos[i + 2] += n[i + 2] * d;
      }
      n = this._normals(P);
    }
    const base = this.pos.length / 3;
    const xf = this.xf, tv = new THREE.Vector3();
    for (let i = 0; i < P.pos.length; i += 3) {
      const lx = P.pos[i], ly = P.pos[i + 1], lz = P.pos[i + 2];
      this.loc.push(lx, ly, lz);
      if (xf) {
        tv.set(lx - xf.o[0], ly - xf.o[1], lz - xf.o[2]).applyQuaternion(xf.q);
        this.pos.push(tv.x + xf.t[0], tv.y + xf.t[1], tv.z + xf.t[2]);
        tv.set(n[i], n[i + 1], n[i + 2]).applyQuaternion(xf.q);
        this.nrm.push(tv.x, tv.y, tv.z);
      } else { this.pos.push(lx, ly, lz); this.nrm.push(n[i], n[i + 1], n[i + 2]); }
      this.meta.push({ part: P.part, v: P.vt[(i / 3) * 2], th: P.vt[(i / 3) * 2 + 1], ln: [n[i], n[i + 1], n[i + 2]] });
      this.wts.push(P.wts[i / 3]);
    }
    for (let i = 0; i < P.idx.length; i++) this.idx.push(P.idx[i] + base);
    this._p = null;
    return { start: base, count: P.pos.length / 3 };
  }
}

/** Tube through rings. opts: segs, rings (resample count), up (frame hint), capA/capB: 'round' | 'none' | number (pole offset) */
function loft(B, part, ctrl, o = {}) {
  const segs = o.segs || 12, up = o.up || [0, 1, 0];
  let rings = o.rings ? resample(ctrl, o.rings) : ctrl.map((c, i) => ({ ...c, v: i / (ctrl.length - 1) }));
  const n = rings.length;
  for (let i = 0; i < n; i++) rings[i].t = norm(sub(rings[Math.min(i + 1, n - 1)].p, rings[Math.max(i - 1, 0)].p));
  const capScale = o.capScale ?? 0.85;
  const mkCap = (r, sign, mode) => {
    if (mode === 'none') return { res: [], pole: null };
    if (typeof mode === 'number') return { res: [], pole: add(r.p, mul(r.t, sign * mode)) };
    const rr = ((r.rx + (r.ryT + r.ryB) / 2) / 2) * capScale, res = [];
    for (const ang of [0.5, 0.95, 1.3]) {
      const sc = Math.cos(ang);
      res.push({ p: add(r.p, mul(r.t, sign * rr * Math.sin(ang))), rx: r.rx * sc, ryT: r.ryT * sc, ryB: r.ryB * sc, w: r.w, t: r.t, v: r.v });
    }
    return { res, pole: add(r.p, mul(r.t, sign * rr)) };
  };
  const cA = mkCap(rings[0], -1, o.capA ?? 'round'), cB = mkCap(rings[n - 1], 1, o.capB ?? 'round');
  rings = [...cA.res.reverse(), ...rings, ...cB.res];
  B.begin(part, o);
  const rows = [];
  for (const r of rings) {
    const s = norm(cross(up, r.t)), u = cross(r.t, s), row = [];
    for (let j = 0; j < segs; j++) {
      const th = (j / segs) * Math.PI * 2 + (o.phase || 0);
      const c = Math.cos(th), sn = Math.sin(th);
      const ry = sn >= 0 ? r.ryT : r.ryB;
      const p = [r.p[0] + s[0] * r.rx * c + u[0] * ry * sn, r.p[1] + s[1] * r.rx * c + u[1] * ry * sn, r.p[2] + s[2] * r.rx * c + u[2] * ry * sn];
      row.push(B.v(p, r.w, r.v, th));
    }
    rows.push(row);
  }
  for (let i = 0; i < rows.length - 1; i++) for (let j = 0; j < segs; j++) {
    const a = rows[i][j], b = rows[i][(j + 1) % segs], c = rows[i + 1][j], d = rows[i + 1][(j + 1) % segs];
    B.tri(a, b, c); B.tri(b, d, c);
  }
  if (cA.pole) { const pv = B.v(cA.pole, rings[0].w, 0, 0); for (let j = 0; j < segs; j++) B.tri(rows[0][(j + 1) % segs], rows[0][j], pv); }
  if (cB.pole) { const L = rows.length - 1, pv = B.v(cB.pole, rings[L].w, 1, 0); for (let j = 0; j < segs; j++) B.tri(rows[L][j], rows[L][(j + 1) % segs], pv); }
  return B.end();
}

/** ellipsoid, long axis along `axis` (unit vector), radii [across-a, across-b, along] */
function blob(B, part, c, r, w, o = {}) {
  const ax = norm(o.axis || [0, 0, 1]), ctrl = [];
  const N = o.n || 7;
  for (let i = 0; i < N; i++) {
    const a = mix(-1.25, 1.25, i / (N - 1));
    ctrl.push(R(add(c, mul(ax, r[2] * Math.sin(a))), r[0] * Math.cos(a), r[1] * Math.cos(a), w));
  }
  const cap = r[2] * (1 - Math.sin(1.25));
  return loft(B, part, ctrl, { segs: o.segs || 10, up: o.up || (Math.abs(ax[1]) > 0.9 ? [0, 0, 1] : [0, 1, 0]), capA: cap, capB: cap, scruff: o.scruff });
}

function torus(B, part, c, axis, sideHint, Ra, Rb, tr, tl, w, nu = 28, nv = 8) {
  const t = norm(axis), s = norm(cross(sideHint, t)), u = cross(t, s);
  B.begin(part);
  const rows = [];
  for (let i = 0; i < nu; i++) {
    const a = (i / nu) * Math.PI * 2, ca = Math.cos(a), sa = Math.sin(a);
    const out = norm([s[0] * ca * Rb + u[0] * sa * Ra, s[1] * ca * Rb + u[1] * sa * Ra, s[2] * ca * Rb + u[2] * sa * Ra]);
    const cen = [c[0] + s[0] * ca * Ra + u[0] * sa * Rb, c[1] + s[1] * ca * Ra + u[1] * sa * Rb, c[2] + s[2] * ca * Ra + u[2] * sa * Rb];
    const row = [];
    for (let j = 0; j < nv; j++) {
      const b = (j / nv) * Math.PI * 2;
      row.push(B.v(add(cen, add(mul(out, Math.cos(b) * tr), mul(t, Math.sin(b) * tl))), w, i / nu, b));
    }
    rows.push(row);
  }
  for (let i = 0; i < nu; i++) for (let j = 0; j < nv; j++) {
    const a = rows[i][j], b = rows[i][(j + 1) % nv], c2 = rows[(i + 1) % nu][j], d = rows[(i + 1) % nu][(j + 1) % nv];
    B.tri(a, c2, b); B.tri(b, c2, d);
  }
  return B.end();
}

function surfacePoint(B, range, origin, dir) {
  // furthest vertex (in local coords) from origin within a narrow cone around dir
  const d = norm(dir);
  let best = -1, bestD = -1e9, fallback = -1, fbA = -2;
  for (let i = range.start; i < range.start + range.count; i++) {
    const v = [B.loc[i * 3] - origin[0], B.loc[i * 3 + 1] - origin[1], B.loc[i * 3 + 2] - origin[2]];
    const l = Math.hypot(v[0], v[1], v[2]) || 1e-6, al = dot(v, d);
    const ca = al / l;
    if (ca > fbA) { fbA = ca; fallback = i; }
    if (ca > 0.975 && al > bestD) { bestD = al; best = i; }
  }
  const i = best >= 0 ? best : fallback;
  return { p: [B.loc[i * 3], B.loc[i * 3 + 1], B.loc[i * 3 + 2]], n: B.meta[i].ln };
}

// ---------------------------------------------------------------------------- coats
function makeCoat(kind, K, ctx) {
  const { L } = K;
  const n2 = (x, y, f) => fbm2(x * f + 31.7, y * f + 12.3, 3);
  const out = { r: 1, g: 1, b: 1, gloss: 0, brindle: 0 };
  const set = (c, gloss = 0, br = 0) => { out.r = c[0]; out.g = c[1]; out.b = c[2]; out.gloss = gloss; out.brindle = br; return out; };
  const mixc = (a, b, t) => [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)];
  const isHead = (p) => p === 'head' || p === 'jaw' || p === 'earL' || p === 'earR' || p === 'brow';
  const fixed = (part, l, ln) => {
    switch (part) {
      case 'eye': return set([0.05, 0.028, 0.015], 1);
      case 'eyeHi': return set([2.2, 2.2, 2.2], 1);
      case 'eyeRim': return set(kind === 'bulldog' ? [0.2, 0.12, 0.1] : [0.06, 0.045, 0.04], 0.15);
      case 'nose': return set([0.025, 0.02, 0.022], 0.85);
      case 'tongue': return set([0.9, 0.36, 0.42], 0.55);
      case 'tooth': return set([0.97, 0.95, 0.86], 0.45);
      case 'collar': return set(K.collar, 0.3);
      case 'tag': return set([1.0, 0.72, 0.18], 0.9);
      case 'stud': return set([0.85, 0.86, 0.9], 1);
      case 'pad': return set([0.08, 0.06, 0.06], 0.2);
      default: return null;
    }
  };
  const mouth = (part, l, ln) => {
    if (part === 'head' && ln[1] < -0.6 && l[2] > ctx.zStop + K.ml * 0.08 && l[1] < ctx.yM) return set([0.2, 0.05, 0.06], 0.3);
    if (part === 'jaw' && ln[1] > 0.55 && l[2] > ctx.zStop * 0.7) return set([0.5, 0.13, 0.16], 0.35);
    return null;
  };
  let fur;
  if (kind === 'terrier') {
    const white = [0.95, 0.92, 0.86], tan = [0.72, 0.42, 0.18], dark = [0.42, 0.22, 0.1];
    fur = (part, p, l, ln) => {
      if (isHead(part)) {
        const ax = Math.abs(l[0]);
        if (part === 'earL' || part === 'earR') return set(mixc(tan, dark, 0.35 + 0.3 * n2(l[1], l[2], 14)));
        // tan mask over cranium and eyes, white blaze down the middle and white muzzle
        const blaze = sstep(0.055, 0.02, ax - 0.03 * sstep(ctx.zStop, 0, l[2])) ;
        const maskZ = sstep(ctx.zStop + K.ml * 0.45, ctx.zStop - 0.02, l[2] + 0.05 * n2(l[0], l[1], 16));
        const lower = sstep(-K.cr * 0.75, -K.cr * 0.35, l[1]);
        const m = maskZ * (1 - blaze) * lower;
        const c = mixc(white, mixc(tan, dark, 0.25 * n2(l[0], l[2], 20)), m);
        if (part === 'brow') return set(mixc(tan, white, 0.35));
        return set(c);
      }
      if (part === 'tail') return set(mixc(tan, white, sstep(0.45, 0.75, p.v)));
      if (part === 'body' || part === 'hackle') {
        const nz = n2(p.x, p.z, 4.5) - 0.5;
        const saddle = sstep(0.62 + nz * 0.5, 0.74 + nz * 0.5, p.y) * sstep(-L * 0.98, -L * 0.82, p.z + nz * 0.2) * sstep(-L * 0.28, -L * 0.42, p.z + nz * 0.25 + (p.x > 0 ? 0.1 : 0));
        const rump = sstep(-L * 0.9, -L * 1.02, p.z) * sstep(0.7, 0.8, p.y);
        return set(mixc(white, mixc(tan, dark, 0.3 * n2(p.x, p.z, 18)), Math.max(saddle, rump)));
      }
      return set(mixc(white, [0.86, 0.8, 0.72], sstep(0.12, 0.0, p.y)));
    };
  } else if (kind === 'shepherd') {
    const tan = [0.8, 0.5, 0.2], black = [0.055, 0.05, 0.05], cream = [0.9, 0.72, 0.46];
    fur = (part, p, l, ln) => {
      if (isHead(part)) {
        if (part === 'earL' || part === 'earR') return set(ln[2] > 0.35 ? mixc(cream, [0.8, 0.5, 0.42], 0.5) : mixc(black, tan, 0.12));
        const muz = sstep(ctx.zStop - 0.01, ctx.zStop + K.ml * 0.3, l[2] + 0.03 * n2(l[0], l[1], 20));
        const fore = sstep(K.cr * 0.3, K.cr * 0.8, l[1]) * sstep(K.cr * 0.9, 0.0, l[2]) * 0.75;
        const eyeDark = sstep(K.cr * 0.75, K.cr * 0.3, Math.hypot(Math.abs(l[0]) - ctx.eyeX, l[1] - ctx.eyeY, (l[2] - ctx.eyeZ) * 0.6)) * 0.5;
        let c = mixc(tan, cream, sstep(-K.cr * 0.2, -K.cr * 0.8, l[1]) * 0.7);
        c = mixc(c, black, Math.max(muz * 0.94, fore, eyeDark));
        if (part === 'brow') return set(mixc(tan, black, 0.5));
        return set(c);
      }
      if (part === 'tail') return set(mixc(mixc(tan, black, sstep(-0.3, 0.5, ln[1] - ln[2] * 0.5)), black, sstep(0.72, 0.95, p.v)));
      if (part === 'body' || part === 'hackle') {
        const nz = n2(p.z, p.y, 5) - 0.5;
        // black saddle over the back, running down the flanks; tan/cream chest ruff and belly
        const topLine = mix(K.hipTop, 1.0, sat((p.z + L) / L));
        const depth = topLine - p.y;
        const zf = sstep(0.16, 0.0, p.z + nz * 0.12) ;
        const sad = sstep(0.3 + nz * 0.16, 0.2 + nz * 0.16, depth) * zf;
        const neckTop = sstep(0.0, 0.12, p.z) * sstep(0.2, 0.6, ln[1] - ln[2] * 0.6) * 0.85;
        let c = mixc(tan, cream, sstep(0.25, 0.5, depth) * 0.8);
        c = mixc(c, cream, sstep(0.02, 0.16, p.z) * sstep(0.2, -0.5, ln[1]) * 0.6);
        return set(mixc(c, black, Math.max(sad, neckTop)));
      }
      if (part === 'legH') return set(mixc(tan, black, sstep(0.52, 0.72, p.y) * 0.75 * sstep(-0.2, -0.6, ln[2] - 0.3)));
      return set(mixc(tan, cream, sstep(0.3, 0.0, p.y) * 0.8));
    };
  } else {
    const white = [0.94, 0.9, 0.84], brown = [0.5, 0.27, 0.12], skin = [0.3, 0.2, 0.19];
    fur = (part, p, l, ln) => {
      if (isHead(part)) {
        if (part === 'earR') return set(brown, 0, 1);
        if (part === 'earL') return set(mixc(brown, white, 0.0), 0, 1);
        const nz = n2(l[0], l[1], 9) - 0.5;
        // brown patch over the right eye and ear side, white blaze, dark jowls
        const patch = sstep(K.cr * 0.75, K.cr * 0.55, Math.hypot(l[0] + ctx.eyeX * 1.25, (l[1] - ctx.eyeY) * 0.9, (l[2] - ctx.eyeZ * 0.6) * 0.6) + nz * 0.1);
        const back = sstep(K.cr * 0.1, -K.cr * 0.5, l[2] + nz * 0.15) * sstep(-0.05, 0.02, l[0] * -1 + 0.1);
        const jowl = sstep(ctx.zStop - 0.03, ctx.zStop + 0.05, l[2]) * sstep(ctx.yM + K.mr * 0.3, ctx.yM - K.mr * 0.2, l[1]);
        let c = white; let br = Math.max(patch, back * 0.9);
        c = mixc(c, brown, br);
        c = mixc(c, skin, jowl * 0.75);
        if (part === 'brow') return set(l[0] < 0 ? mixc(brown, [0.3, 0.16, 0.08], 0.5) : [0.8, 0.74, 0.66], 0, l[0] < 0 ? 1 : 0);
        return set(c, 0, br * (1 - jowl));
      }
      if (part === 'tail') return set(white);
      if (part === 'body' || part === 'hackle') {
        const nz = n2(p.x * 0.6 + p.z, p.y, 3.2) - 0.5;
        const topLine = mix(K.hipTop, 1.0, sat((p.z + L) / L));
        const depth = topLine - p.y;
        const back = sstep(0.34 + nz * 0.4, 0.26 + nz * 0.4, depth - (p.x < 0 ? 0.16 : 0)) * sstep(-L * 0.12, -L * 0.3, p.z + nz * 0.3) * sstep(-L * 1.2, -L * 1.0, p.z - 0.2 + nz * 0.2);
        const sh = sstep(0.2, 0.1, Math.hypot(p.x - 0.3, (p.y - 0.75) * 0.8, p.z - 0.05) + nz * 0.25) * 0.0;
        const br = Math.max(back, sh);
        return set(mixc(white, brown, br), 0, br);
      }
      return set(mixc(white, [0.85, 0.78, 0.7], sstep(0.1, 0.0, p.y)));
    };
  }
  return (part, p, l, ln) => fixed(part, l, ln) || mouth(part, l, ln) || fur(part, p, l, ln);
}

// ---------------------------------------------------------------------------- fur material
const FUR_KEY = 'dogFur1';
export function makeFurMaterial() {
  const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, metalness: 0.0 });
  mat.userData.uFade = { value: 1 };
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.uFade = mat.userData.uFade;
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nattribute vec2 aFx;\nvarying vec2 vFx;\nvarying vec3 vRest;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvFx = aFx; vRest = position;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec2 vFx; varying vec3 vRest; uniform float uFade;
float dHash(vec3 p){ p = fract(p * 0.3183099 + vec3(0.1, 0.23, 0.37)); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float dNoise(vec3 x){ vec3 i = floor(x), f = fract(x); f = f*f*(3.0-2.0*f);
  return mix(mix(mix(dHash(i), dHash(i+vec3(1,0,0)), f.x), mix(dHash(i+vec3(0,1,0)), dHash(i+vec3(1,1,0)), f.x), f.y),
             mix(mix(dHash(i+vec3(0,0,1)), dHash(i+vec3(1,0,1)), f.x), mix(dHash(i+vec3(0,1,1)), dHash(i+vec3(1,1,1)), f.x), f.y), f.z); }`)
      .replace('#include <color_fragment>', `#include <color_fragment>
{
  if (uFade < 0.999) {
    float dth = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
    if (dth > uFade) discard;
  }
  float furAmt = 1.0 - smoothstep(0.0, 0.3, vFx.x);
  // fine fur streaks running back along the body + soft mottling
  float n1 = dNoise(vRest * vec3(95.0, 95.0, 26.0));
  float n2 = dNoise(vRest * 13.0 + 7.0);
  diffuseColor.rgb *= mix(1.0, 0.8 + 0.26 * n1 + 0.14 * n2, furAmt);
  // brindle: broken dark stripes wrapping the body
  float st = sin(vRest.z * 46.0 + (n2 - 0.5) * 9.0 + vRest.y * 9.0) * 0.5 + 0.5;
  st = smoothstep(0.45, 0.8, st) * (0.55 + 0.45 * dNoise(vRest * 30.0));
  diffuseColor.rgb *= 1.0 - 0.62 * st * vFx.y;
}`)
      .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nroughnessFactor = mix(roughnessFactor, 0.12, vFx.x);')
      .replace('#include <opaque_fragment>', `{
  // soft fuzz rim: fur catches light at grazing angles
  float furAmt2 = 1.0 - smoothstep(0.0, 0.3, vFx.x);
  float fres = pow(1.0 - saturate(dot(normalize(normal), normalize(vViewPosition))), 2.6);
  vec3 rimLight = vec3(0.2, 0.2, 0.23);
  #if NUM_DIR_LIGHTS > 0
    float wrap = saturate(dot(normalize(normal), directionalLights[0].direction) * 0.6 + 0.4);
    rimLight += directionalLights[0].color * 0.12 * wrap;
  #endif
  outgoingLight += fres * furAmt2 * rimLight * mix(diffuseColor.rgb, vec3(1.0), 0.3);
}
#include <opaque_fragment>`);
  };
  mat.customProgramCacheKey = () => FUR_KEY;
  return mat;
}

// ---------------------------------------------------------------------------- the dog
function solveKnee(H, A, l1, l2, bend) {
  const d = sub(A, H), dist = Math.min(Math.hypot(d[0], d[1], d[2]), (l1 + l2) * 0.999);
  const dir = norm(d), a = (l1 * l1 - l2 * l2 + dist * dist) / (2 * dist), h = Math.sqrt(Math.max(0, l1 * l1 - a * a));
  const perp = norm(cross([1, 0, 0], dir));
  return add(add(H, mul(dir, a)), mul(perp, h * bend));
}

export function buildDog(kind) {
  const K = KINDS[kind], S = K.S, L = K.L;
  const B = new Builder();
  const yC = 1 - K.chest[1], yH = K.hipTop - K.hip[1];
  const rest = {};
  rest.hips = [0, yH, -L]; rest.spine = [0, (yC + yH) / 2 - 0.01, -L / 2]; rest.chest = [0, yC, 0];
  rest.hackle = rest.chest.slice();
  const dN = [0, Math.sin(K.neckAng), Math.cos(K.neckAng)];
  const Nb = [0, yC + 0.05, 0.15];
  rest.neck = Nb;
  rest.head = add(Nb, mul(dN, K.neckLen));

  // ------------------------------------------------ torso + neck (one continuous tube)
  const top = (z) => mix(K.hipTop, 1.0, sat((z + L) / L)) - 0.012 * Math.sin(sat((z + L) / L) * Math.PI);
  const ringTop = (z, rx, ryT, ryB, w, dy = 0) => R([0, top(z) - ryT + dy, z], rx, [ryT, ryB], w);
  const mixR = (a, b, t) => [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)];
  const hb = mixR(K.hip, K.belly, 0.6), bc = mixR(K.belly, K.chest, 0.72);
  const body = [
    ringTop(-L - 0.15, K.hip[0] * 0.62, K.hip[1] * 0.6, K.hip[2] * 0.62, { hips: 1 }, -0.05),
    ringTop(-L - 0.02, K.hip[0], K.hip[1], K.hip[2], { hips: 1 }),
    ringTop(-L * 0.76, hb[0], hb[1], hb[2], { hips: 0.6, spine: 0.4 }),
    ringTop(-L * 0.5, K.belly[0], K.belly[1], K.belly[2], { spine: 1 }),
    ringTop(-L * 0.25, bc[0], bc[1], bc[2], { spine: 0.45, chest: 0.55 }),
    ringTop(-0.01, K.chest[0], K.chest[1], K.chest[2], { chest: 1 }),
    R([0, yC + 0.03, 0.11], K.chest[0] * 0.86, [K.chest[1] * 0.98, K.chest[2] * 0.86], { chest: 1 }),
    R(add(Nb, mul(dN, 0.04)), K.neckR0 * 1.04, [K.neckR0 * 0.95, K.neckR0 * 1.12], { chest: 0.55, neck: 0.45 }),
    R(add(Nb, mul(dN, K.neckLen * 0.5)), mix(K.neckR0, K.neckR1, 0.6), mix(K.neckR0, K.neckR1, 0.6), { neck: 1 }),
    R(add(Nb, mul(dN, K.neckLen * 0.85)), K.neckR1, K.neckR1, { neck: 0.45, head: 0.55 }),
    R(add(Nb, mul(dN, K.neckLen * 1.08)), K.neckR1 * 0.8, K.neckR1 * 0.8, { head: 1 }),
  ];
  loft(B, 'body', body, { segs: 26, rings: 40, scruff: K.scruff });

  // ------------------------------------------------ hackles (hidden inside the back until raised)
  for (let i = 0; i < 8; i++) {
    const z = mix(-L * 0.55, 0.06, i / 7), h = 0.085 * (0.7 + 0.5 * Math.sin((i / 7) * Math.PI));
    const b0 = [0, top(z) - 0.03, z];
    loft(B, 'hackle', [
      R(b0, 0.05, 0.05, { hackle: 1 }),
      R(add(b0, [0, 0.03 + h * 0.4, -0.012]), 0.034, 0.045, { hackle: 1 }),
      R(add(b0, [0, 0.03 + h, -0.05]), 0.006, 0.01, { hackle: 1 }),
    ], { segs: 6, up: [0, 0, 1], capA: 'none', capB: 0.01 });
  }

  // ------------------------------------------------ head (built in its own frame, then pitched onto the neck)
  const cr = K.cr, crx = cr * K.crW, mr = K.mr, mrx = mr * K.mrW, ml = K.ml;
  const zStop = cr * 0.8, yM = -cr * 0.36, zEnd = zStop + ml;
  const headJoint = [0, -cr * 0.35, -cr * 0.45]; // where the neck meets the skull, in head space
  B.xf = { o: headJoint, q: new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), K.headPitch), t: rest.head };
  const toModel = (l) => { const v = new THREE.Vector3(l[0] - headJoint[0], l[1] - headJoint[1], l[2] - headJoint[2]).applyQuaternion(B.xf.q); return [v.x + rest.head[0], v.y + rest.head[1], v.z + rest.head[2]]; };
  const bull = kind === 'bulldog';
  const headRings = [
    R([0, 0, -cr * 0.82], crx * 0.55, cr * 0.55, { head: 1 }),
    R([0, 0, -cr * 0.45], crx * 0.9, [cr * 0.88, cr * 0.86], { head: 1 }),
    R([0, 0, 0], crx, [cr, cr * 0.92], { head: 1 }),
    R([0, -cr * 0.03, cr * 0.42], crx * 0.94, [cr * 0.88, cr * 0.84], { head: 1 }),
    R([0, -cr * 0.2, zStop - cr * 0.02], mix(crx, mrx, bull ? 0.3 : 0.6), [cr * 0.52, cr * (bull ? 0.72 : 0.6)], { head: 1 }),
    R([0, yM, zStop + ml * 0.33], mrx * 1.08, [mr * 0.95, mr * 0.45], { head: 1 }),
    R([0, yM - mr * 0.02, zStop + ml * 0.72], mrx * 1.0, [mr * 0.9, mr * 0.42], { head: 1 }),
    R([0, yM - mr * 0.05, zEnd], mrx * (bull ? 0.96 : 0.86), [mr * 0.8, mr * 0.4], { head: 1 }),
  ];
  const headRange = loft(B, 'head', headRings, { segs: 22, rings: 22, scruff: K.scruff * 0.9, capScale: bull ? 0.45 : 0.7 });

  // lower jaw
  const jawLen = bull ? zStop + ml * 1.22 : zStop + ml * 0.93;
  const jawY = yM - mr * 0.5;
  rest.jaw = toModel([0, -cr * 0.5, cr * 0.2]);
  loft(B, 'jaw', [
    R([0, -cr * 0.48, cr * 0.15], crx * 0.55, [cr * 0.12, cr * 0.3], { jaw: 1 }),
    R([0, jawY, zStop * 0.95], mrx * (bull ? 1.02 : 0.96), [mr * 0.22, mr * 0.56], { jaw: 1 }),
    R([0, jawY, mix(zStop, jawLen, 0.6)], mrx * (bull ? 1.06 : 0.92), [mr * 0.2, mr * 0.52], { jaw: 1 }),
    R([0, jawY + (bull ? mr * 0.14 : 0), jawLen], mrx * (bull ? 0.98 : 0.78), [mr * 0.18, mr * 0.44], { jaw: 1 }),
  ], { segs: 14, rings: 9, scruff: K.scruff * (kind === 'terrier' ? 1.4 : 0.6), capScale: bull ? 0.5 : 0.7 });
  if (kind === 'terrier') { // beard and moustache tufts
    loft(B, 'jaw', [
      R([0, jawY - mr * 0.1, zStop + ml * 0.35], mrx * 0.7, mr * 0.4, { jaw: 1 }),
      R([0, jawY - mr * 0.55, zStop + ml * 0.62], mrx * 0.85, mr * 0.5, { jaw: 1 }),
      R([0, jawY - mr * 1.0, zStop + ml * 0.74], mrx * 0.3, mr * 0.2, { jaw: 1 }),
    ], { segs: 10, rings: 7, scruff: K.scruff * 1.6, up: [0, 0, 1] });
    for (const sgn of [-1, 1]) loft(B, 'head', [
      R([sgn * mrx * 0.35, yM + mr * 0.1, zEnd - ml * 0.12], mr * 0.5, mr * 0.55, { head: 1 }),
      R([sgn * mrx * 1.0, yM - mr * 0.25, zEnd - ml * 0.3], mr * 0.52, mr * 0.6, { head: 1 }),
      R([sgn * mrx * 1.25, yM - mr * 0.9, zEnd - ml * 0.45], mr * 0.2, mr * 0.22, { head: 1 }),
    ], { segs: 8, rings: 6, scruff: K.scruff * 1.6, up: [0, 0, 1] });
  }
  if (bull) { // jowls hanging either side of the muzzle
    for (const sgn of [-1, 1]) loft(B, 'head', [
      R([sgn * mrx * 0.5, yM + mr * 0.25, zEnd - ml * 0.2], mr * 0.45, mr * 0.5, { head: 1 }),
      R([sgn * mrx * 0.86, yM - mr * 0.25, zEnd - ml * 0.55], mr * 0.5, mr * 0.62, { head: 1 }),
      R([sgn * mrx * 0.92, yM - mr * 0.85, zEnd - ml * 0.9], mr * 0.34, mr * 0.46, { head: 1 }),
      R([sgn * mrx * 0.86, yM - mr * 1.05, zEnd - ml * 1.3], mr * 0.16, mr * 0.2, { head: 1 }),
    ], { segs: 10, rings: 8, up: [0, 0, 1] });
  }

  // nose
  const noseP = surfacePoint(B, headRange, [0, yM, zStop], [0, 0.22, 1]);
  blob(B, 'nose', add(noseP.p, [0, mr * (bull ? 0.05 : 0.1), -mr * 0.2]), [mr * (bull ? 0.4 : 0.38), mr * 0.3, mr * 0.32], { head: 1 }, { n: 7, segs: 10 });

  // eyes, rims, highlights, brows
  const er = cr * K.eye;
  const eyeDir = bull ? [0.5, 0.2, 0.84] : [0.4, 0.25, 0.88];
  const eS = surfacePoint(B, headRange, [0, -cr * 0.05, 0], eyeDir);
  const eyeC = add(eS.p, mul(norm(eyeDir), -er * 0.45));
  rest.eyes = toModel([0, eyeC[1], eyeC[2]]);
  for (const sgn of [-1, 1]) {
    const c = [eyeC[0] * sgn, eyeC[1], eyeC[2]];
    const fw = norm([eyeDir[0] * sgn * 0.6, 0.1, 1]);
    blob(B, 'eyeRim', add(c, mul(fw, -er * 0.25)), [er * 1.22, er * 1.22, er * 1.0], { eyes: 1 }, { n: 6, segs: 10 });
    blob(B, 'eye', c, [er, er, er], { eyes: 1 }, { n: 7, segs: 12 });
    blob(B, 'eyeHi', add(c, add(mul(fw, er * 0.82), [er * 0.3, er * 0.36, 0])), [er * 0.2, er * 0.2, er * 0.12], { eyes: 1 }, { n: 4, segs: 6, axis: fw });
    // brow
    const bS = surfacePoint(B, headRange, [0, -cr * 0.05, 0], [eyeDir[0] * sgn, eyeDir[1] + (bull ? 0.3 : 0.26), eyeDir[2]]);
    const bc0 = add(bS.p, mul(bS.n, cr * 0.02));
    const bw = cr * (kind === 'terrier' ? 0.26 : 0.22), bt = cr * (kind === 'terrier' ? 0.1 : 0.075);
    rest[sgn < 0 ? 'browR' : 'browL'] = toModel(bc0);
    const bone = sgn < 0 ? 'browR' : 'browL';
    loft(B, 'brow', [
      R(add(bc0, [-sgn * bw, -cr * 0.02, cr * 0.06]), bt * 0.7, bt * 0.6, { [bone]: 1 }),
      R(bc0, bt * 1.1, bt, { [bone]: 1 }),
      R(add(bc0, [sgn * bw, -cr * 0.06, -cr * 0.1]), bt * 0.6, bt * 0.5, { [bone]: 1 }),
    ], { segs: 8, rings: 5, up: [0, 1, 0], scruff: K.scruff * 1.2, capScale: 1.2 });
  }

  // ears
  for (const sgn of [-1, 1]) {
    const bone = sgn < 0 ? 'earR' : 'earL', w = { [bone]: 1 }, wb = { [bone]: 0.5, head: 0.5 };
    const e = K.earLen;
    if (K.ear === 'pointy') {
      const bS = surfacePoint(B, headRange, [0, 0, 0], [0.52 * sgn, 0.8, -0.28]);
      const b0 = add(bS.p, [0, -cr * 0.12, 0]);
      rest[bone] = toModel(b0);
      const P = (x, y, z) => add(b0, [x * sgn * e, y * e, z * e]);
      loft(B, bone, [
        R(P(0, -0.05, 0), cr * 0.46, [cr * 0.12, cr * 0.26], wb),
        R(P(0.03, 0.3, -0.01), cr * 0.42, [cr * 0.035, cr * 0.19], w),
        R(P(0.08, 0.68, -0.03), cr * 0.27, [cr * 0.02, cr * 0.1], w),
        R(P(0.13, 1.0, -0.06), cr * 0.06, [cr * 0.012, cr * 0.03], w),
      ], { segs: 12, rings: 8, up: [0, 0, 1], capA: 'none', capB: 0.012 });
    } else if (K.ear === 'folded') {
      const bS = surfacePoint(B, headRange, [0, 0, 0], [0.62 * sgn, 0.7, -0.2]);
      const b0 = add(bS.p, [0, -cr * 0.1, 0]);
      rest[bone] = toModel(b0);
      const P = (x, y, z) => add(b0, [x * sgn * e, y * e, z * e]);
      // rises from the skull, folds over and hangs forward: wide axis = ry here (frame hint is X)
      loft(B, bone, [
        R(P(-0.05, -0.08, 0), cr * 0.1, cr * 0.36, wb),
        R(P(0.1, 0.28, 0.06), cr * 0.07, cr * 0.42, w),
        R(P(0.3, 0.42, 0.34), cr * 0.05, cr * 0.44, w),
        R(P(0.5, 0.18, 0.66), cr * 0.045, cr * 0.36, w),
        R(P(0.56, -0.2, 0.86), cr * 0.035, cr * 0.2, w),
        R(P(0.56, -0.42, 0.95), cr * 0.02, cr * 0.05, w),
      ], { segs: 10, rings: 12, up: [1, 0, 0], capA: 'none', capB: 0.01, scruff: K.scruff * 0.5 });
    } else {
      const bS = surfacePoint(B, headRange, [0, 0, 0], [0.72 * sgn, 0.62, -0.3]);
      const b0 = add(bS.p, [0, -cr * 0.08, 0]);
      rest[bone] = toModel(b0);
      const P = (x, y, z) => add(b0, [x * sgn * e, y * e, z * e]);
      loft(B, bone, [
        R(P(-0.1, -0.1, 0.05), cr * 0.08, cr * 0.3, wb),
        R(P(0.25, 0.3, 0.0), cr * 0.06, cr * 0.34, w),
        R(P(0.75, 0.3, -0.25), cr * 0.045, cr * 0.32, w),
        R(P(1.1, -0.05, -0.55), cr * 0.04, cr * 0.22, w),
        R(P(1.2, -0.4, -0.75), cr * 0.02, cr * 0.06, w),
      ], { segs: 10, rings: 10, up: [0, 0.3, 1], capA: 'none', capB: 0.01 });
    }
  }

  // tongue and teeth
  rest.tongue = toModel([0, jawY + mr * 0.2, zStop * 0.7]);
  {
    const ty = jawY + mr * 0.26, tl = (bull ? ml * 1.5 : ml), w = { tongue: 1 };
    loft(B, 'tongue', [
      R([0, ty, zStop * 0.75], mrx * 0.4, mr * 0.1, w),
      R([0, ty, zStop + tl * 0.45], mrx * 0.56, mr * 0.11, w),
      R([0, ty - mr * 0.06, zStop + tl * 0.8], mrx * 0.56, mr * 0.1, w),
      R([0, ty - mr * 0.5, zStop + tl * 1.02], mrx * 0.5, mr * 0.09, w),
      R([0, ty - mr * 1.05, zStop + tl * 1.06], mrx * 0.36, mr * 0.07, w),
    ], { segs: 8, rings: 9, capScale: 2 });
    const tooth = (c, len, r, w2, dir) => loft(B, 'tooth', [R(c, r, r, w2), R(add(c, mul(dir, len * 0.5)), r * 0.75, r * 0.75, w2), R(add(c, mul(dir, len)), r * 0.15, r * 0.15, w2)],
      { segs: 6, up: [0, 0, 1], capA: 'none', capB: 0.004 });
    for (const sgn of [-1, 1]) {
      tooth([sgn * mrx * 0.62, yM - mr * 0.3, zEnd - ml * 0.2], mr * 0.5, mr * 0.13, { head: 1 }, [0, -1, 0.1]);
      tooth([sgn * mrx * 0.3, yM - mr * 0.34, zEnd - ml * 0.05], mr * 0.22, mr * 0.1, { head: 1 }, [0, -1, 0.1]);
      if (bull) {
        tooth([sgn * mrx * 0.56, jawY + mr * 0.12, jawLen - ml * 0.1], mr * 0.44, mr * 0.13, { jaw: 1 }, [0, 1, 0.12]);
        tooth([sgn * mrx * 0.2, jawY + mr * 0.14, jawLen + ml * 0.0], mr * 0.2, mr * 0.1, { jaw: 1 }, [0, 1, 0.12]);
      } else tooth([sgn * mrx * 0.5, jawY + mr * 0.1, jawLen - ml * 0.2], mr * 0.42, mr * 0.11, { jaw: 1 }, [0, 1, 0.05]);
    }
  }
  const mouthRest = toModel([0, yM - mr * 0.4, zEnd - ml * 0.1]);
  const headTopRest = toModel([0, cr * 1.0, 0]);
  B.xf = null;

  // ------------------------------------------------ collar, tag, studs
  {
    const f = 0.3, cen = add(Nb, mul(dN, K.neckLen * f + 0.02));
    const rr = mix(K.neckR0, K.neckR1, f * 0.9) * 1.05, w = { neck: 0.6, chest: 0.4 };
    torus(B, 'collar', cen, dN, [1, 0, 0], rr, rr * 0.98, 0.014, bull ? 0.05 : 0.034, w, 30, 8);
    const u = cross(dN, [1, 0, 0]); // up-back; -u = down-front
    const tagC = add(cen, add(mul(u, -(rr + 0.045)), mul(dN, -0.02)));
    blob(B, 'tag', tagC, [0.036, 0.04, 0.01], w, { n: 5, segs: 10, axis: norm(add(mul(u, -1), mul(dN, 0.5))) });
    if (bull) for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 + 0.26, dir = norm(add(mul([1, 0, 0], Math.cos(a)), mul(u, Math.sin(a))));
      const c = add(cen, mul(dir, rr + 0.008));
      loft(B, 'stud', [R(c, 0.024, 0.024, w), R(add(c, mul(dir, 0.045)), 0.004, 0.004, w)], { segs: 6, up: dN, capA: 'none', capB: 0.004 });
    }
  }

  // ------------------------------------------------ legs
  const legT = K.legT;
  const legDefs = [];
  const mkLeg = (name, front, sgn) => {
    const sx = (front ? K.sxF : K.sxH) * sgn;
    let J0, paw, ankOff, l1, l2, bend;
    if (front) {
      J0 = [sx, 0.66, 0.03]; paw = [sx * 1.04, 0, 0.03]; ankOff = [0, 0.1, -0.012];
      const d = Math.hypot(...sub(add(paw, ankOff), J0)); l1 = l2 = (d * 1.045) / 2; bend = 1;
    } else {
      J0 = [sx, yH - 0.04, -L + 0.0]; paw = [sx * 1.1, 0, -L - 0.14]; ankOff = [0, 0.25, -0.09];
      const d = Math.hypot(...sub(add(paw, ankOff), J0)); l1 = d * 1.2 * 0.5; l2 = d * 1.2 * 0.5; bend = -1;
    }
    const A = add(paw, ankOff), Kn = solveKnee(J0, A, l1, l2, bend);
    const bodyBone = front ? 'chest' : 'hips';
    const u = name + 'u', l = name + 'l', f = name + 'f';
    rest[u] = J0; rest[l] = Kn; rest[f] = A;
    const pawTop = add(paw, [0, 0.055 * legT, 0.0]);
    const rr = front
      ? [[0.062, 0.1], [0.072, 0.118], [0.064, 0.088], [0.05, 0.062], [0.044, 0.05], [0.04, 0.044], [0.04, 0.043], [0.046, 0.05]]
      : [[0.06, 0.13], [0.08, 0.155], [0.074, 0.125], [0.052, 0.07], [0.042, 0.05], [0.036, 0.043], [0.036, 0.04], [0.046, 0.05]];
    const q = (i) => rr[i].map((x, k) => x * (k === 0 ? Math.min(legT, 1.45) : legT) * (i < 3 ? mix(1, 1 / legT, 0.35) * (front ? 1 : 1) : 1));
    const pts = [add(J0, [-(sgn * 0.02), 0.11, front ? -0.01 : 0.02]), J0, lerp3(J0, Kn, 0.5), Kn, lerp3(Kn, A, 0.5), A, lerp3(A, pawTop, 0.6), pawTop];
    const ws = [{ [bodyBone]: 0.7, [u]: 0.3 }, { [u]: 0.75, [bodyBone]: 0.25 }, { [u]: 1 }, { [u]: 0.5, [l]: 0.5 }, { [l]: 1 }, { [l]: 0.5, [f]: 0.5 }, { [f]: 1 }, { [f]: 1 }];
    loft(B, front ? 'legF' : 'legH', pts.map((p, i) => R(p, q(i)[0], q(i)[1], ws[i])), { segs: 12, rings: 20, up: [0, 0, 1], scruff: K.scruff * 0.7, capB: 'none' });
    // paw
    const pw = 0.06 * legT, py = 0.036 * legT;
    loft(B, 'paw', [
      R(add(paw, [0, py, -0.055 * legT]), pw * 0.8, [py * 1.0, py * 0.9], { [f]: 1 }),
      R(add(paw, [0, py, 0.0]), pw, [py * 1.25, py * 0.95], { [f]: 1 }),
      R(add(paw, [0, py * 0.9, 0.06 * legT]), pw * 1.08, [py * 1.0, py * 0.85], { [f]: 1 }),
      R(add(paw, [0, py * 0.8, 0.1 * legT]), pw * 0.8, [py * 0.7, py * 0.75], { [f]: 1 }),
    ], { segs: 10, rings: 7, scruff: K.scruff * 0.5 });
    legDefs.push({ name, front, sgn, hip: J0, knee: Kn, ankle: A, paw, ankOff, l1, l2, bend, body: bodyBone });
  };
  mkLeg('FL', true, 1); mkLeg('FR', true, -1); mkLeg('HL', false, 1); mkLeg('HR', false, -1);

  // ------------------------------------------------ tail
  const dT = [0, Math.sin(K.tailAng), -Math.cos(K.tailAng)];
  const Tb = [0, K.hipTop - 0.1, -L - 0.13];
  {
    const ctrl = [];
    for (let i = 0; i < 5; i++) {
      const p = add(Tb, mul(dT, K.tailLen * (i / 4)));
      if (i < 4) rest['tail' + i] = p;
      const w = i === 0 ? { tail0: 0.6, hips: 0.4 } : i === 4 ? { tail3: 1 } : { ['tail' + (i - 1)]: 0.5, ['tail' + i]: 0.5 };
      ctrl.push(R(add(p, i === 0 ? mul(dT, -0.05) : [0, 0, 0]), K.tailR[i], K.tailR[i], w));
    }
    loft(B, 'tail', ctrl, { segs: 10, rings: 13, up: [1, 0, 0], scruff: K.scruff * (kind === 'shepherd' ? 2.2 : 1), capA: 'none' });
  }

  // ------------------------------------------------ finalize buffers
  const nV = B.pos.length / 3;
  const pos = new Float32Array(nV * 3), nrm = new Float32Array(B.nrm), col = new Float32Array(nV * 3), fx = new Float32Array(nV * 2);
  const si = new Uint16Array(nV * 4), sw = new Float32Array(nV * 4);
  const ctx = { zStop, yM, eyeX: Math.abs(eyeC[0]), eyeY: eyeC[1], eyeZ: eyeC[2] };
  const coat = makeCoat(kind, K, ctx);
  const pp = { x: 0, y: 0, z: 0, v: 0, th: 0 };
  for (let i = 0; i < nV; i++) {
    const m = B.meta[i];
    pp.x = B.pos[i * 3]; pp.y = B.pos[i * 3 + 1]; pp.z = B.pos[i * 3 + 2]; pp.v = m.v; pp.th = m.th;
    const c = coat(m.part, pp, [B.loc[i * 3], B.loc[i * 3 + 1], B.loc[i * 3 + 2]], m.ln);
    col[i * 3] = Math.pow(c.r, 2.2); col[i * 3 + 1] = Math.pow(c.g, 2.2); col[i * 3 + 2] = Math.pow(c.b, 2.2); fx[i * 2] = c.gloss; fx[i * 2 + 1] = c.brindle;
    pos[i * 3] = pp.x * S; pos[i * 3 + 1] = pp.y * S; pos[i * 3 + 2] = pp.z * S;
    const ent = Object.entries(B.wts[i]).filter((e) => e[1] > 0.001).sort((a, b) => b[1] - a[1]).slice(0, 4);
    const tot = ent.reduce((s, e) => s + e[1], 0);
    for (let k = 0; k < 4; k++) {
      if (k < ent.length) { if (BI[ent[k][0]] === undefined) throw new Error('unknown bone ' + ent[k][0]); si[i * 4 + k] = BI[ent[k][0]]; sw[i * 4 + k] = ent[k][1] / tot; }
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('normal', new THREE.BufferAttribute(nrm, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('aFx', new THREE.BufferAttribute(fx, 2));
  geo.setAttribute('skinIndex', new THREE.BufferAttribute(si, 4));
  geo.setAttribute('skinWeight', new THREE.BufferAttribute(sw, 4));
  geo.setIndex(nV > 65535 ? new THREE.BufferAttribute(new Uint32Array(B.idx), 1) : new THREE.BufferAttribute(new Uint16Array(B.idx), 1));
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, S * 0.7, -L * S * 0.4), S * 2.6);
  geo.boundingBox = new THREE.Box3(new THREE.Vector3(-S * 2, -S, -S * 3), new THREE.Vector3(S * 2, S * 3, S * 2.5));

  const material = makeFurMaterial();
  const mesh = new THREE.SkinnedMesh(geo, material);
  mesh.castShadow = true; mesh.receiveShadow = true;
  mesh.boundingSphere = geo.boundingSphere.clone();
  mesh.boundingBox = geo.boundingBox.clone();

  const boneList = [], bones = {}, restV = {}, inverses = [];
  for (const name of BONE_NAMES) {
    const b = new THREE.Bone(); b.name = name;
    const r = rest[name]; if (!r) throw new Error('no rest for ' + name);
    restV[name] = new THREE.Vector3(r[0] * S, r[1] * S, r[2] * S);
    b.position.copy(restV[name]);
    boneList.push(b); bones[name] = b;
    inverses.push(new THREE.Matrix4().makeTranslation(-restV[name].x, -restV[name].y, -restV[name].z));
  }
  const skeleton = new THREE.Skeleton(boneList, inverses);
  const sc = (a) => new THREE.Vector3(a[0] * S, a[1] * S, a[2] * S);
  const legs = legDefs.map((d) => ({
    name: d.name, front: d.front, sgn: d.sgn, body: d.body, bend: d.bend, l1: d.l1 * S, l2: d.l2 * S,
    hip: sc(d.hip), knee: sc(d.knee), ankle: sc(d.ankle), paw: sc(d.paw), ankOff: sc(d.ankOff),
  }));
  return {
    kind, K, S, mesh, skeleton, bones, boneList, rest: restV, legs,
    mouthRest: sc(mouthRest), headTopRest: sc(headTopRest),
    dims: { S, L: L * S, yC: yC * S, yH: yH * S, legF: 0.66 * S, legH: (yH - 0.04) * S, neckLen: K.neckLen * S, tailLen: K.tailLen * S, cr: cr * S },
    triCount: B.idx.length / 3,
  };
}
