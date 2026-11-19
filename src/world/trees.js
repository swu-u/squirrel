// Trees: procedural branching skeletons (collision capsules + merged bark tubes) and
// instanced leaf-cluster cards with wind, translucency, leaf-shaped shadows and a
// camera-friendly dither cut-out between the camera and the player.
//
//   createTrees(world, specs, opts) -> { group, update(dt, time, camera, focus), trees, stats }
//   spec = { x, z, y = 0, type: 'oak' | 'maple' | 'birch' | 'pine' | 'street', seed, scale = 1 }
//   trees[i] = { spec, height, crownRadius, perches: Vector3[], top: Vector3 }
//   opts.quality 0..1 scales the number of leaf cards (cards get a little bigger to keep the crown full).
//   opts.chunkSize (default 80 m): bark and leaves are merged per square of this size for culling.
import * as THREE from 'three';
import { mulberry32 } from '../core/rng.js';
import { PALETTE, SUN_DIR } from './env.js';

const DEG = Math.PI / 180;
const UP = new THREE.Vector3(0, 1, 0);
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (x, a, b) => (x < a ? a : x > b ? b : x);
const sstep = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

// ---------------------------------------------------------------------------------------------
// Tree type parameters. Lengths in metres at scale 1.
// lv[level]: sp = spacing of children along the parent, t0 = first child position (0..1 along parent),
// len = child length as a fraction of parent length, lift = how much the tip bends up (+) or droops (-),
// div = divergence angle range from the parent, roll = range of roll around the parent (0 = sideways, 90 = up),
// rk = child radius as a fraction of the parent radius at the fork.
// ---------------------------------------------------------------------------------------------
const TYPES = {
  oak: {
    gen: 'broad', h: [14, 18], R: [7.0, 8.6], fork: [3.1, 3.9], topExtra: 0.125, trunkR: 0.031, trunkTaper: 0.74, lean: 0.035,
    boughs: [5, 6], elev: [-27, 66], elevPow: 1.5, d0: [10, 60], boughSegs: 6, boughK: 1.18, yc: 0.4, pUp: 2.3, pDn: 4, lobe: 0.13,
    gnarl: 0.15, flare: 0.75, maxLevel: 4, clumpLevel: 2,
    lv: {
      2: { sp: 0.9, t0: 0.22, len: 0.6, segs: 4, lift: 0.16, div: [42, 70], roll: [-18, 50], rk: [0.6, 0.8] },
      3: { sp: 0.8, t0: 0.2, len: 0.58, segs: 3, lift: 0.12, div: [40, 70], roll: [-25, 55], rk: [0.55, 0.7] },
      4: { sp: 0.5, t0: 0.15, len: 0.5, segs: 2, lift: 0.1, div: [35, 70], roll: [-30, 60], rk: [0.5, 0.6] },
    },
    twigLen: [0.7, 1.25], cards: 3200, cardSize: [0.85, 1.3], spread: 0.75, layer: 0.75, tiles: [0, 1],
    hues: [[4, 3], [1, 3], [5, 2], [0, 2.5], [3, 1], [2, 1.5]], bark: [0.7, 0.56, 0.43], barkTile: 0, moss: 1, fallen: 110,
  },
  maple: {
    gen: 'broad', h: [12, 15], R: [5.0, 6.3], fork: [2.5, 3.2], topExtra: 0.12, trunkR: 0.031, trunkTaper: 0.74, lean: 0.03,
    boughs: [4, 5], elev: [-14, 68], elevPow: 1.15, d0: [22, 66], boughSegs: 5, boughK: 1.25, yc: 0.5, pUp: 2.1, pDn: 2.8, lobe: 0.1,
    gnarl: 0.11, flare: 0.6, maxLevel: 4, clumpLevel: 2,
    lv: {
      2: { sp: 0.72, t0: 0.22, len: 0.6, segs: 4, lift: 0.26, div: [38, 64], roll: [-10, 55], rk: [0.62, 0.8] },
      3: { sp: 0.78, t0: 0.2, len: 0.56, segs: 3, lift: 0.2, div: [38, 66], roll: [-20, 55], rk: [0.55, 0.7] },
      4: { sp: 0.5, t0: 0.15, len: 0.5, segs: 2, lift: 0.15, div: [35, 66], roll: [-30, 60], rk: [0.5, 0.6] },
    },
    twigLen: [0.65, 1.15], cards: 2550, cardSize: [0.8, 1.25], spread: 0.7, layer: 0.6, tiles: [2, 3],
    hues: [[3, 3], [0, 3.5], [1, 3], [2, 2], [4, 1]], bark: [0.52, 0.47, 0.43], barkTile: 0, moss: 0.7, fallen: 100,
  },
  street: {
    gen: 'broad', h: [8, 10], R: [3.1, 3.7], fork: [3.0, 3.25], topExtra: 0.1, trunkR: 0.026, trunkTaper: 0.8, lean: 0.012,
    boughs: [5, 6], elev: [-12, 74], elevPow: 1.0, d0: [28, 72], boughSegs: 4, boughK: 1.4, yc: 0.46, pUp: 2.0, pDn: 2.4, lobe: 0.05,
    gnarl: 0.08, flare: 0.4, maxLevel: 3, clumpLevel: 1,
    lv: {
      2: { sp: 0.5, t0: 0.2, len: 0.62, segs: 3, lift: 0.2, div: [40, 66], roll: [-20, 50], rk: [0.6, 0.78] },
      3: { sp: 0.36, t0: 0.2, len: 0.5, segs: 2, lift: 0.15, div: [35, 62], roll: [-30, 60], rk: [0.5, 0.6] },
    },
    twigLen: [0.6, 1.0], cards: 1250, cardSize: [0.7, 1.05], spread: 0.65, fill: 0.55, layer: 0.55, tiles: [0, 2],
    hues: [[2, 3], [1, 3], [5, 2], [0, 1.5]], bark: [0.5, 0.45, 0.42], barkTile: 0, moss: 0.3, fallen: 60,
  },
  birch: {
    gen: 'birch', h: [10, 13], R: [2.5, 3.2], fork: [2.7, 3.5], trunkR: 0.0175, lean: 0.06,
    gnarl: 0.09, flare: 0.35, maxLevel: 3, clumpLevel: 1, leader: true, pUp: 2, pDn: 2, lobe: 0.08,
    lv: {
      2: { sp: 0.48, t0: 0.22, len: 0.6, segs: 3, lift: -0.3, div: [35, 62], roll: [-45, 25], rk: [0.4, 0.55] },
      3: { sp: 0.32, t0: 0.15, len: 0.6, segs: 2, lift: -0.75, div: [30, 60], roll: [-60, 10], rk: [0.5, 0.6] },
    },
    twigLen: [0.5, 0.95], cards: 1500, cardSize: [0.6, 0.9], spread: 0.4, fill: 0.5, layer: 0.15, hang: 0.8, tiles: [4, 5],
    hues: [[2, 5], [5, 2], [1, 1]], bark: [1.0, 0.98, 0.94], barkTile: 1, moss: 0.15, fallen: 70,
  },
  pine: {
    gen: 'pine', h: [16, 20], R: [3.5, 4.5], fork: [3.8, 5.0], trunkR: 0.02, lean: 0.012,
    gnarl: 0.03, flare: 0.4, maxLevel: 2, clumpLevel: 1, leader: true, pUp: 2, pDn: 2, lobe: 0,
    lv: {}, twigLen: [0.5, 0.9], cards: 2300, cardSize: [0.95, 1.45], spread: 0.3, layer: 1.0, flat: true, fill: 0.6, tiles: [6, 7],
    hues: null, bark: [0.62, 0.42, 0.33], barkTile: 0, moss: 0.25, fallen: 0,
  },
};

// ---------------------------------------------------------------------------------------------
// Skeleton helpers
// ---------------------------------------------------------------------------------------------
const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _c = new THREE.Vector3(), _d = new THREE.Vector3();
const _e = new THREE.Vector3(), _f = new THREE.Vector3(), _g = new THREE.Vector3();

function randUnit(rng, out) {
  const z = rng() * 2 - 1, a = rng() * 6.28318, r = Math.sqrt(1 - z * z);
  return out.set(r * Math.cos(a), z, r * Math.sin(a));
}

function bezierChain(S, C, T, n, jit, rng) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, a = (1 - t) * (1 - t), b = 2 * (1 - t) * t, c = t * t;
    pts.push(new THREE.Vector3(S.x * a + C.x * b + T.x * c, S.y * a + C.y * b + T.y * c, S.z * a + C.z * b + T.z * c));
  }
  if (jit > 0) {
    const seg = S.distanceTo(T) / n;
    for (let i = 1; i < n; i++) {
      pts[i].x += (rng() - 0.5) * 2 * jit * seg; pts[i].y += (rng() - 0.5) * 2 * jit * seg; pts[i].z += (rng() - 0.5) * 2 * jit * seg;
    }
  }
  return pts;
}

function makeBranch(T, level, pts, r0, rTip, parent, parentRad, taperPow = 0.9) {
  const n = pts.length - 1;
  const cum = [0];
  for (let i = 1; i <= n; i++) cum.push(cum[i - 1] + pts[i].distanceTo(pts[i - 1]));
  const rad = [];
  for (let i = 0; i <= n; i++) rad.push(r0 + (rTip - r0) * Math.pow(cum[i] / cum[n], taperPow));
  const br = { id: T.branches.length, level, pts, rad, cum, len: cum[n], parent, parentRad, clump: 0 };
  br.clump = (parent && level > T.P.clumpLevel) ? parent.clump : br.id;
  T.branches.push(br);
  return br;
}

/** Position, tangent and radius at fraction t (0..1 by length) of a branch. Returns radius. */
function sampleBranch(br, t, outP, outT) {
  const d = t * br.len, n = br.pts.length - 1;
  let i = 0;
  while (i < n - 1 && br.cum[i + 1] < d) i++;
  const f = clamp((d - br.cum[i]) / Math.max(1e-6, br.cum[i + 1] - br.cum[i]), 0, 1);
  outP.lerpVectors(br.pts[i], br.pts[i + 1], f);
  // smooth tangent: blend the directions of neighbouring pieces
  outT.subVectors(br.pts[i + 1], br.pts[i]).normalize();
  return lerp(br.rad[i], br.rad[i + 1], f);
}

function sampleByHeight(br, y, outP) {
  const n = br.pts.length - 1;
  let i = 0;
  while (i < n - 1 && br.pts[i + 1].y < y) i++;
  const f = clamp((y - br.pts[i].y) / Math.max(1e-6, br.pts[i + 1].y - br.pts[i].y), 0, 1);
  outP.lerpVectors(br.pts[i], br.pts[i + 1], f);
  return lerp(br.rad[i], br.rad[i + 1], f);
}

// Crown envelope: a lumpy super-ellipsoid. Upper and lower halves have their own height and exponent
// (a high exponent below gives the wide flat underside of an open-grown oak).
function envLobe(E, az) { return 1 + E.lobe * (0.6 * Math.sin(az * 2 + E.ph1) + 0.4 * Math.sin(az * 3 + E.ph2)); }
function envE(E, p) {
  const dx = p.x - E.C.x, dz = p.z - E.C.z, dy = p.y - E.C.y;
  const Rl = E.R * envLobe(E, Math.atan2(dz, dx));
  const up = dy >= 0, pw = up ? E.pUp : E.pDn;
  return Math.pow(Math.hypot(dx, dz) / Rl, pw) + Math.pow(Math.abs(dy) / (up ? E.Ru : E.Rd), pw);
}
function envRadius(E, dir) {
  const dh = Math.hypot(dir.x, dir.z);
  const Rl = E.R * envLobe(E, Math.atan2(dir.z, dir.x));
  const up = dir.y >= 0, pw = up ? E.pUp : E.pDn;
  return Math.pow(Math.pow(dh / Rl, pw) + Math.pow(Math.abs(dir.y) / (up ? E.Ru : E.Rd), pw), -1 / pw);
}
/** Pull Tg back towards P until it is inside the envelope (scaled by k). Returns the fraction kept. */
function envClip(E, P, Tg, k) {
  if (Math.pow(envE(E, Tg), 1 / 2) <= k) return 1;
  if (Math.pow(envE(E, P), 1 / 2) >= k) { Tg.lerpVectors(P, Tg, 0.4); return 0.4; }
  let lo = 0, hi = 1;
  for (let i = 0; i < 12; i++) {
    const m = (lo + hi) / 2;
    _g.lerpVectors(P, Tg, m);
    if (Math.pow(envE(E, _g), 1 / 2) <= k) lo = m; else hi = m;
  }
  Tg.lerpVectors(P, Tg, lo);
  return lo;
}

const tipRadius = (r0) => clamp(r0 * 0.18, 0.011, 0.04);

function spawnChildren(T, br, level) {
  const P = T.P, rng = T.rng, cfg = P.lv[level];
  if (!cfg) return;
  const isTwig = level === P.maxLevel, s = T.scale;
  const L = br.len;
  let n = Math.round((L * (0.97 - cfg.t0)) / (cfg.sp * s) + rng.range(-0.4, 0.4));
  if (n < 1) n = L > 0.6 * s ? 1 : 0;
  let sgn = rng.sign();
  const P0 = new THREE.Vector3(), tan = new THREE.Vector3(), side = new THREE.Vector3(), upP = new THREE.Vector3();
  const dir = new THREE.Vector3(), Tg = new THREE.Vector3(), Cp = new THREE.Vector3();
  for (let k = 0; k < n; k++) {
    const t = cfg.t0 + (0.97 - cfg.t0) * (k + rng.range(0.25, 0.75)) / n;
    const rp = sampleBranch(br, t, P0, tan);
    let rc = isTwig ? rng.range(0.012, 0.017) * Math.sqrt(s) : Math.max(0.016, rp * rng.range(cfg.rk[0], cfg.rk[1]));
    rc = Math.min(rc, rp * 0.9);
    let Lc = isTwig ? rng.range(P.twigLen[0], P.twigLen[1]) * s : L * cfg.len * (1 - 0.55 * t) * rng.range(0.8, 1.2);
    Lc = Math.min(Lc, rc * (level <= 2 ? 70 : 48));
    if (!isTwig && Lc < 0.5 * s) continue;
    side.crossVectors(tan, UP);
    if (side.lengthSq() < 0.01) side.set(P0.x - T.axis.x, 0, P0.z - T.axis.z).cross(UP);
    if (side.lengthSq() < 1e-6) side.set(1, 0, 0);
    side.normalize();
    upP.copy(UP).addScaledVector(tan, -tan.y);
    if (upP.lengthSq() < 0.01) upP.crossVectors(side, tan);
    upP.normalize();
    const phi = rng.range(cfg.div[0], cfg.div[1]) * DEG, psi = rng.range(cfg.roll[0], cfg.roll[1]) * DEG;
    for (let attempt = 0; attempt < 2; attempt++) {
      dir.copy(tan).multiplyScalar(Math.cos(phi)).addScaledVector(side, sgn * Math.cos(psi) * Math.sin(phi)).addScaledVector(upP, Math.sin(psi) * Math.sin(phi)).normalize();
      Tg.copy(P0).addScaledVector(dir, Lc);
      Tg.y += Lc * cfg.lift;
      // keep the middle of the crown open: side limbs must not head back towards the trunk
      const hp = Math.hypot(P0.x - T.axis.x, P0.z - T.axis.z), ht = Math.hypot(Tg.x - T.axis.x, Tg.z - T.axis.z);
      if (level <= 2 && ht < hp * 0.92 && attempt === 0) { sgn = -sgn; continue; }
      break;
    }
    const kept = envClip(T.env, P0, Tg, isTwig ? 1.06 : 1.02);
    if (kept < 0.35 && !isTwig) continue;
    Cp.copy(P0).addScaledVector(dir, P0.distanceTo(Tg) * 0.5).addScaledVector(randUnit(rng, _f), P0.distanceTo(Tg) * (isTwig ? 0.05 : 0.11));
    const child = makeBranch(T, level, bezierChain(P0, Cp, Tg, cfg.segs, isTwig ? 0.05 : P.gnarl, rng), rc, isTwig ? rc * 0.6 : tipRadius(rc), br, rp, level === 2 ? 1.1 : 0.9);
    sgn = -sgn;
    spawnChildren(T, child, level + 1);
  }
}

// ---------------------------------------------------------------------------------------------
// Generators (all in tree-local space: origin at the base on the ground, +Y up)
// ---------------------------------------------------------------------------------------------
function genBroad(T) {
  const P = T.P, rng = T.rng, s = T.scale;
  const H = rng.range(P.h[0], P.h[1]) * s, R = rng.range(P.R[0], P.R[1]) * s;
  const fork = rng.range(P.fork[0], P.fork[1]) * s;
  const topY = fork + P.topExtra * H;
  const rBase = P.trunkR * H * rng.range(0.93, 1.07);
  const la = rng() * 6.283, lm = P.lean * topY * rng.range(0.3, 1);
  const top = new THREE.Vector3(Math.cos(la) * lm, topY, Math.sin(la) * lm);
  const yC = fork + (H - fork) * P.yc;
  T.env = { C: new THREE.Vector3(top.x, yC, top.z), R, Ru: H - yC, Rd: yC - fork + 0.7 * s, pUp: P.pUp, pDn: P.pDn, lobe: P.lobe, ph1: rng() * 6.28, ph2: rng() * 6.28 };
  T.axis.set(top.x, 0, top.z);
  // trunk
  const S = new THREE.Vector3(0, -0.5, 0);
  const Cp = new THREE.Vector3(top.x * 0.15 + rng.range(-0.1, 0.1) * s, topY * 0.5, top.z * 0.15 + rng.range(-0.1, 0.1) * s);
  const trunk = makeBranch(T, 0, bezierChain(S, Cp, top, 5, 0.015, rng), rBase, rBase * P.trunkTaper, null, 0, 1);
  // boughs
  const n = rng.int(P.boughs[0], P.boughs[1]);
  const az0 = rng() * 6.283;
  const w = []; let W = 0;
  for (let i = 0; i < n; i++) { w.push(rng.range(0.8, 1.25)); W += w[i]; }
  const dir = new THREE.Vector3(), d0 = new THREE.Vector3(), Sb = new THREE.Vector3(), Tg = new THREE.Vector3(), C2 = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    const f = n > 1 ? i / (n - 1) : 1;
    const el = (lerp(P.elev[0], P.elev[1], Math.pow(f, P.elevPow)) + rng.range(-5, 5)) * DEG;
    const az = az0 + i * 2.39996 + rng.range(-0.22, 0.22);
    dir.set(Math.cos(el) * Math.cos(az), Math.sin(el), Math.cos(el) * Math.sin(az));
    Tg.copy(T.env.C).addScaledVector(dir, envRadius(T.env, dir) * 0.95);
    const hS = fork + (topY - fork) * Math.pow(f, 0.75);
    const rT = sampleByHeight(trunk, hS, Sb);
    const e0 = (lerp(P.d0[0], P.d0[1], f) + rng.range(-6, 6)) * DEG, az2 = az + rng.range(-0.3, 0.3);
    d0.set(Math.cos(e0) * Math.cos(az2), Math.sin(e0), Math.cos(e0) * Math.sin(az2));
    C2.copy(Sb).addScaledVector(d0, Sb.distanceTo(Tg) * 0.45);
    const r0 = rT * Math.sqrt(w[i] / W) * P.boughK;
    const b = makeBranch(T, 1, bezierChain(Sb, C2, Tg, P.boughSegs, P.gnarl, rng), r0, tipRadius(r0), trunk, rT, 1.25);
    spawnChildren(T, b, 2);
  }
  T.capTrunk = true;
}

function genBirch(T) {
  const P = T.P, rng = T.rng, s = T.scale;
  const H = rng.range(P.h[0], P.h[1]) * s, R = rng.range(P.R[0], P.R[1]) * s;
  const fork = rng.range(P.fork[0], P.fork[1]) * s;
  const rBase = P.trunkR * H * rng.range(0.93, 1.07);
  const la = rng() * 6.283, lm = P.lean * H * rng.range(0.4, 1);
  const top = new THREE.Vector3(Math.cos(la) * lm, H * 0.97, Math.sin(la) * lm);
  const yC = fork + (H - fork) * 0.5;
  T.env = { C: new THREE.Vector3(top.x * 0.6, yC, top.z * 0.6), R, Ru: H - yC + 0.4 * s, Rd: yC - fork + 1.2 * s, pUp: P.pUp, pDn: P.pDn, lobe: P.lobe, ph1: rng() * 6.28, ph2: rng() * 6.28 };
  T.axis.set(top.x * 0.6, 0, top.z * 0.6);
  const S = new THREE.Vector3(0, -0.5, 0);
  const Cp = new THREE.Vector3(top.x * 0.9 + rng.range(-0.3, 0.3) * s, H * 0.45, top.z * 0.9 + rng.range(-0.3, 0.3) * s);
  const trunk = makeBranch(T, 0, bezierChain(S, Cp, top, 7, 0.012, rng), rBase, 0.022 * s, null, 0, 1.05);
  const n = rng.int(14, 18), az0 = rng() * 6.283;
  const d0 = new THREE.Vector3(), Sb = new THREE.Vector3(), Tg = new THREE.Vector3(), C2 = new THREE.Vector3(), hz = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    const f = i / (n - 1);
    const y = fork + (H * 0.9 - fork) * Math.pow(f, 0.9);
    const rT = sampleByHeight(trunk, y, Sb);
    const az = az0 + i * 2.39996 + rng.range(-0.25, 0.25);
    hz.set(Math.cos(az), 0, Math.sin(az));
    const L = lerp(R * 1.25, R * 0.5, f) * rng.range(0.85, 1.12);
    const e0 = (lerp(38, 62, f) + rng.range(-6, 6)) * DEG;
    d0.copy(hz).multiplyScalar(Math.cos(e0)).addScaledVector(UP, Math.sin(e0));
    Tg.copy(Sb).addScaledVector(hz, L * lerp(0.8, 0.5, f)).addScaledVector(UP, L * lerp(0.5, 0.78, f));
    C2.copy(Sb).addScaledVector(d0, L * 0.55);
    envClip(T.env, Sb, Tg, 1.0);
    const r0 = clamp(rT * 0.6, 0.062 * s, 0.095 * s);
    const b = makeBranch(T, 1, bezierChain(Sb, C2, Tg, 4, P.gnarl, rng), r0, 0.013, trunk, rT, 1.5);
    spawnChildren(T, b, 2);
  }
  // a few fine drooping twigs straight off the upper trunk
  T.P.lv[2] && spawnChildrenRange(T, trunk, 3, 0.72, 0.98, 5);
}

/** Twigs along part of a branch (used for leaders). */
function spawnChildrenRange(T, br, level, t0, t1, n) {
  const P = T.P, rng = T.rng, s = T.scale, cfg = P.lv[level] || P.lv[P.maxLevel];
  const P0 = new THREE.Vector3(), tan = new THREE.Vector3(), dir = new THREE.Vector3(), Tg = new THREE.Vector3(), Cp = new THREE.Vector3();
  for (let k = 0; k < n; k++) {
    const t = lerp(t0, t1, (k + rng()) / n);
    const rp = sampleBranch(br, t, P0, tan);
    const az = rng() * 6.283, el = rng.range(10, 50) * DEG;
    dir.set(Math.cos(az) * Math.cos(el), Math.sin(el), Math.sin(az) * Math.cos(el));
    const Lc = rng.range(P.twigLen[0], P.twigLen[1]) * s;
    Tg.copy(P0).addScaledVector(dir, Lc); Tg.y += Lc * (cfg ? cfg.lift : 0);
    Cp.copy(P0).addScaledVector(dir, Lc * 0.5);
    const rc = Math.min(rp * 0.8, rng.range(0.012, 0.017));
    makeBranch(T, P.maxLevel, bezierChain(P0, Cp, Tg, 2, 0.05, rng), rc, rc * 0.6, br, rp);
  }
}

function genPine(T) {
  const P = T.P, rng = T.rng, s = T.scale;
  const H = rng.range(P.h[0], P.h[1]) * s, Rmax = rng.range(P.R[0], P.R[1]) * s;
  const first = rng.range(P.fork[0], P.fork[1]) * s;
  const rBase = P.trunkR * H * rng.range(0.93, 1.07);
  const la = rng() * 6.283, lm = P.lean * H * rng.range(0.2, 1);
  const top = new THREE.Vector3(Math.cos(la) * lm, H, Math.sin(la) * lm);
  const yC = first + (H - first) * 0.45;
  T.env = { C: new THREE.Vector3(top.x * 0.5, yC, top.z * 0.5), R: Rmax, Ru: H - yC, Rd: yC - first + 1, pUp: 2, pDn: 2, lobe: 0, ph1: 0, ph2: 0 };
  T.axis.set(top.x * 0.5, 0, top.z * 0.5);
  const S = new THREE.Vector3(0, -0.5, 0);
  const Cp = new THREE.Vector3(top.x * 0.6, H * 0.5, top.z * 0.6);
  const trunk = makeBranch(T, 0, bezierChain(S, Cp, top, 8, 0.006, rng), rBase, 0.03 * s, null, 0, 1.1);
  const Sb = new THREE.Vector3(), hz = new THREE.Vector3(), d0 = new THREE.Vector3(), Tg = new THREE.Vector3(), C2 = new THREE.Vector3();
  const P0 = new THREE.Vector3(), tan = new THREE.Vector3(), side = new THREE.Vector3(), dir = new THREE.Vector3();
  let y = first, azW = rng() * 6.283;
  while (y < H - 0.9 * s) {
    const hf = (y - first) / (H - first);
    const nb = hf > 0.82 ? 3 : rng.int(3, 5);
    const prof = Math.pow(1 - hf, 0.72) * (0.5 + 0.5 * Math.min(1, hf / 0.2));
    for (let k = 0; k < nb; k++) {
      const az = azW + (k + rng.range(-0.18, 0.18)) * 6.283 / nb;
      hz.set(Math.cos(az), 0, Math.sin(az));
      const L = Math.max(0.8 * s, Rmax * prof * rng.range(0.55, 1.12));
      const rT = sampleByHeight(trunk, y + rng.range(-0.4, 0.4) * s, Sb);
      const e0 = (lerp(6, 42, hf * hf) + rng.range(-5, 8)) * DEG;
      d0.copy(hz).multiplyScalar(Math.cos(e0)).addScaledVector(UP, Math.sin(e0));
      Tg.copy(Sb).addScaledVector(hz, L * 0.97).addScaledVector(UP, L * (lerp(-0.18, 0.5, Math.pow(hf, 1.5)) + rng.range(-0.08, 0.1)));
      C2.copy(Sb).addScaledVector(d0, L * 0.5); C2.y -= L * 0.06;
      const r0 = hf > 0.93 ? 0.046 * s : clamp(rT * 0.42, 0.064 * s, 0.1 * s);
      const b = makeBranch(T, 1, bezierChain(Sb, C2, Tg, L > 2.2 * s ? 4 : 3, P.gnarl, rng), r0, 0.016, trunk, rT, 0.85);
      // flat side branchlets
      const nc = Math.round(L / (0.72 * s));
      let sgn = rng.sign();
      for (let c = 0; c < nc; c++) {
        const t = 0.28 + 0.68 * (c + rng.range(0.3, 0.7)) / nc;
        const rp = sampleBranch(b, t, P0, tan);
        side.crossVectors(tan, UP).normalize();
        const phi = rng.range(48, 64) * DEG;
        dir.copy(tan).multiplyScalar(Math.cos(phi)).addScaledVector(side, sgn * Math.sin(phi));
        dir.y += rng.range(-0.2, 0.22); dir.normalize();
        const Lc = Math.max(0.4 * s, L * 0.4 * (1 - 0.5 * t) * rng.range(0.8, 1.2));
        Tg.copy(P0).addScaledVector(dir, Lc); Tg.y += Lc * 0.08;
        C2.copy(P0).addScaledVector(dir, Lc * 0.5);
        const rc = Math.min(rp * 0.7, 0.024 * s);
        makeBranch(T, 2, bezierChain(P0, C2, Tg, 2, 0.04, rng), rc, rc * 0.55, b, rp);
        sgn = -sgn;
      }
    }
    azW += 0.9 + rng.range(-0.2, 0.2);
    y += 1.12 * s * rng.range(0.8, 1.2);
  }
  spawnChildrenRange(T, trunk, 2, 0.955, 0.995, 3);
}

// ---------------------------------------------------------------------------------------------
// Bark geometry
// ---------------------------------------------------------------------------------------------
const SUN_H = new THREE.Vector2(SUN_DIR.x, SUN_DIR.z).normalize();
const radialFor = (r) => (r >= 0.26 ? 10 : r >= 0.12 ? 8 : r >= 0.07 ? 6 : r >= 0.036 ? 5 : r >= 0.024 ? 4 : 3);
const cheapNoise = (x, y, z) => { const v = Math.sin(x * 1.7 + y * 0.9) * Math.sin(z * 1.9 - y * 1.3) + 0.5 * Math.sin(x * 4.1 + z * 3.7 + y * 2.3); return clamp(0.5 + v * 0.4, 0, 1); };

const _col = [0, 0, 0];
function barkColor(T, px, py, pz, nx, ny, nz, r) {
  const P = T.P;
  let cr, cg, cb;
  const h = py - T.y0;
  if (P.barkTile === 1) { // birch: pale limbs, dark twigs, rough dark foot
    const k = sstep(0.02, 0.05, r);
    cr = lerp(0.3, 1.0, k); cg = lerp(0.2, 0.98, k); cb = lerp(0.16, 0.94, k);
    const foot = lerp(0.5, 1, sstep(0.0, 1.1, h + cheapNoise(px * 3, py, pz * 3) * 0.6));
    cr *= foot; cg *= foot; cb *= foot;
  } else {
    const tw = 1 - sstep(0.02, 0.06, r); // young wood is redder and smoother looking
    cr = lerp(T.bark[0], T.bark[0] * 0.95, tw); cg = lerp(T.bark[1], T.bark[1] * 0.8, tw); cb = lerp(T.bark[2], T.bark[2] * 0.7, tw);
  }
  const sd = nx * SUN_H.x + nz * SUN_H.y;
  const nz1 = cheapNoise(px, py, pz);
  // moss: tops of the big limbs, and the shaded side of the lower trunk
  let m = clamp((ny - 0.15) * 1.5, 0, 1) * sstep(0.035, 0.1, r) * (0.25 + 0.75 * nz1);
  m = Math.max(m, clamp(-sd, 0, 1) * sstep(0.12, 0.3, r) * nz1 * Math.exp(-Math.max(h, 0) / 3.5) * 0.8);
  m *= P.moss;
  cr = lerp(cr, 0.46, m * 0.75); cg = lerp(cg, 0.56, m * 0.75); cb = lerp(cb, 0.2, m * 0.75);
  const sh = (1 - 0.16 * clamp(-sd, 0, 1)) * (1 - 0.18 * clamp(-ny, 0, 1)) * (0.9 + 0.1 * nz1);
  _col[0] = cr * sh; _col[1] = cg * sh; _col[2] = cb * sh;
  return _col;
}

const _tt = new THREE.Vector3(), _nn = new THREE.Vector3(), _bb = new THREE.Vector3();
/** Append a tube through pts with radii rads to geometry accumulator G. lobes (optional) = root buttress amount per ring. */
function addTube(G, T, pts0, rads0, radial, tile, lobes0) {
  const uRep = Math.max(1, Math.round(6.2832 * rads0[Math.min(2, pts0.length - 1)] / 0.62));
  // Texture V runs along the limb and bounces between the ends of its atlas tile. On limbs big enough to
  // read the bark, a ring is inserted exactly where it bounces so the texture never stretches.
  const exact = rads0[0] >= 0.12;
  let pts = pts0, rads = rads0, lobes = lobes0;
  const vs = [T.rng()];
  if (exact) { pts = [pts0[0]]; rads = [rads0[0]]; lobes = lobes0 ? [lobes0[0]] : null; }
  {
    let v = vs[0], vdir = 1;
    for (let i = 1; i < pts0.length; i++) {
      const a = pts0[i - 1], b = pts0[i], ra = rads0[i - 1], rb = rads0[i];
      const tileLen = (6.2832 * Math.max(exact ? rads0[0] * 0.8 : rb, 0.03) / uRep) * 2.2;
      let dv = a.distanceTo(b) / tileLen;
      if (exact) {
        let f0 = 0; const total = dv;
        for (let g = 0; g < 12; g++) {
          const room = vdir > 0 ? 1 - v : v;
          if (dv <= room + 1e-4) break;
          f0 += room / total; dv -= room; v = vdir > 0 ? 1 : 0; vdir = -vdir;
          if (f0 > 0.04 && f0 < 0.96) { pts.push(new THREE.Vector3().lerpVectors(a, b, f0)); rads.push(lerp(ra, rb, f0)); if (lobes) lobes.push(lerp(lobes0[i - 1], lobes0[i], f0)); vs.push(v); }
        }
        v += vdir * dv;
        pts.push(b); rads.push(rb); if (lobes) lobes.push(lobes0[i]); vs.push(clamp(v, 0, 1));
      } else {
        v += vdir * dv;
        for (let g = 0; g < 8 && (v > 1 || v < 0); g++) { if (v > 1) { v = 2 - v; vdir = -1; } else { v = -v; vdir = 1; } }
        vs.push(v);
      }
    }
  }
  const n = pts.length, base = G.pos.length / 3;
  const lobeN = T.lobeN, lobePh = T.lobePh;
  for (let i = 0; i < n; i++) {
    if (i === 0) _tt.subVectors(pts[1], pts[0]);
    else if (i === n - 1) _tt.subVectors(pts[n - 1], pts[n - 2]);
    else _tt.subVectors(pts[i + 1], pts[i - 1]);
    _tt.normalize();
    if (i === 0) {
      if (Math.abs(_tt.y) < 0.9) _nn.set(0, 1, 0); else _nn.set(1, 0, 0);
    }
    _nn.addScaledVector(_tt, -_nn.dot(_tt)).normalize();
    _bb.crossVectors(_tt, _nn);
    const r = rads[i], p = pts[i];
    const vt = (tile + 0.02 + 0.96 * vs[i]) * 0.5;
    const lb = lobes ? lobes[i] : 0;
    for (let j = 0; j <= radial; j++) {
      const a = (j % radial) / radial * 6.283185, cs = Math.cos(a), sn = Math.sin(a);
      const nx = _nn.x * cs + _bb.x * sn, ny = _nn.y * cs + _bb.y * sn, nz = _nn.z * cs + _bb.z * sn;
      let rr = r;
      if (lb > 0) { const q = 0.5 + 0.5 * Math.sin(a * lobeN + lobePh); rr *= 1 + lb * q * q; }
      const x = p.x + nx * rr, y = p.y + ny * rr, z = p.z + nz * rr;
      G.pos.push(x, y, z); G.nrm.push(nx, ny, nz); G.uv.push(j / radial * uRep, vt);
      const c = barkColor(T, x, y, z, nx, ny, nz, r);
      G.col.push(c[0], c[1], c[2]);
    }
  }
  const rs = radial + 1;
  for (let i = 0; i < n - 1; i++) for (let j = 0; j < radial; j++) {
    const a = base + i * rs + j, b = a + 1, c = a + rs, d = c + 1;
    G.idx.push(a, b, c, b, d, c);
  }
}

const _p0 = new THREE.Vector3();
function buildBark(G, T) {
  const P = T.P;
  for (const br of T.branches) {
    const n = br.pts.length - 1;
    let pts, rads, lobes = null;
    if (br.level === 0) {
      pts = []; rads = []; lobes = [];
      const rB = br.rad[0], k = Math.max(0.5, rB / 0.42);
      const hs = [-0.45, -0.06, 0.1, 0.27, 0.52, 0.9, 1.5];
      for (const h0 of hs) {
        const h = h0 * k, p = new THREE.Vector3();
        const r = sampleByHeight(br, T.y0 + h, p);
        pts.push(p); rads.push(r * (1 + P.flare * Math.exp(-Math.max(h, 0) / (rB * 0.85))));
        lobes.push(0.34 * Math.exp(-Math.max(h, 0) / (rB * 0.75)));
      }
      const hTop = hs[hs.length - 1] * k + 0.3;
      for (let i = 1; i <= n; i++) if (br.pts[i].y - T.y0 > hTop) { pts.push(br.pts[i]); rads.push(br.rad[i]); lobes.push(0); }
      if (T.capTrunk) { // rounded top hidden inside the union of the upper boughs
        const e = br.pts[n], r = br.rad[n], d = _p0.subVectors(br.pts[n], br.pts[n - 1]).normalize();
        pts.push(e.clone().addScaledVector(d, r * 0.45)); rads.push(r * 0.86); lobes.push(0);
        pts.push(e.clone().addScaledVector(d, r * 0.8)); rads.push(r * 0.5); lobes.push(0);
        pts.push(e.clone().addScaledVector(d, r * 0.95)); rads.push(r * 0.04); lobes.push(0);
      }
    } else if (br.level === P.maxLevel) {
      if (P.gen !== 'pine' && br.id % 4) continue; // most of the finest twigs are only drawn on the leaf cards
      pts = [br.pts[0], br.pts[n]]; rads = [br.rad[0], br.rad[n] * 0.5];
    } else if (br.rad[0] < 0.036 && n === 3) { // thin, never a collision piece: one ring less
      pts = [br.pts[0], br.pts[2], br.pts[3]]; rads = [br.rad[0], br.rad[2], br.rad[3]];
    } else if (br.rad[0] < 0.08 && br.parentRad > 0 && br.rad[0] >= 0.036) {
      const p0 = br.pts[0], p1 = br.pts[1], r0 = br.rad[0];
      const segLen = p0.distanceTo(p1), d = _p0.subVectors(p1, p0).divideScalar(segLen);
      const d1 = Math.min(br.parentRad + r0 * 0.8, segLen * 0.6);
      pts = [p0, p0.clone().addScaledVector(d, d1)]; rads = [r0 * 1.12, lerp(r0, br.rad[1], d1 / segLen) * 1.06];
      for (let i = 1; i <= n; i++) { pts.push(br.pts[i]); rads.push(br.rad[i]); }
    } else if (br.rad[0] >= 0.08 && br.parentRad > 0) {
      // collar: start on the parent's axis, swell where the limb leaves the parent's surface
      const p0 = br.pts[0], p1 = br.pts[1], r0 = br.rad[0];
      const segLen = p0.distanceTo(p1), d = _p0.subVectors(p1, p0).divideScalar(segLen);
      const d1 = Math.min(br.parentRad * 0.8, segLen * 0.4), d2 = Math.min(br.parentRad * 1.05 + r0 * 2.6, segLen * 0.8);
      pts = [p0, p0.clone().addScaledVector(d, d1), p0.clone().addScaledVector(d, d2)];
      const fl = sstep(0.04, 0.12, r0);
      rads = [r0 * (1 + 0.12 * fl), r0 * (1.06 + 0.16 * fl), lerp(r0, br.rad[1], d2 / segLen) * (1.02 + 0.04 * fl)];
      for (let i = 1; i <= n; i++) { pts.push(br.pts[i]); rads.push(br.rad[i]); }
    } else { pts = br.pts; rads = br.rad; }
    addTube(G, T, pts, rads, radialFor(br.rad[0]), P.barkTile, lobes);
  }
}

// ---------------------------------------------------------------------------------------------
// Textures (generated once, shared)
// ---------------------------------------------------------------------------------------------
function hashI(x, y, s) { let h = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(s, 1442695041); h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; }
function pnoise(x, y, px, s) { // value noise, periodic in x with integer period px
  const xi = Math.floor(x), yi = Math.floor(y); let fx = x - xi, fy = y - yi; fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy);
  const x0 = ((xi % px) + px) % px, x1 = (x0 + 1) % px;
  const a = hashI(x0, yi, s), b = hashI(x1, yi, s), c = hashI(x0, yi + 1, s), d = hashI(x1, yi + 1, s);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}
function pfbm(x, y, px, s, oct) { let sum = 0, amp = 0.5; for (let o = 0; o < oct; o++) { sum += amp * pnoise(x, y, px, s + o * 7); x *= 2; y *= 2; px *= 2; amp *= 0.5; } return sum / (1 - Math.pow(0.5, oct)); }

function makeBarkTextures() {
  const W = 512, H = 1024, HT = 512;
  const col = new Uint8Array(W * H * 4), nor = new Uint8Array(W * H * 4), hgt = new Float32Array(W * H);
  const rgb = new Float32Array(W * H * 3);
  // tile 0: ridged bark (oak, maple, pine, street)
  for (let y = 0; y < HT; y++) for (let x = 0; x < W; x++) {
    const u = x / W, v = y / HT, i = y * W + x;
    const wx = pfbm(u * 4, v * 3, 4, 11, 3) - 0.5;
    const f1 = Math.abs(2 * pnoise(u * 12 + wx * 2.6, v * 3.4 + 3.1, 12, 21) - 1);
    const f2 = Math.abs(2 * pnoise(u * 27 + wx * 4, v * 7 + 1.7, 27, 31) - 1);
    const f3 = Math.abs(2 * pnoise(u * 6 + 9, v * 17 + wx * 2, 6, 51) - 1);
    const fine = pfbm(u * 40, v * 40, 40, 41, 3);
    let h = sstep(0.0, 0.42, f1) * 0.72 + sstep(0, 0.45, f2) * 0.28;
    h *= 1 - 0.3 * (1 - sstep(0, 0.1, f3));
    h = h * (0.82 + 0.18 * fine) + (fine - 0.5) * 0.08;
    hgt[i] = h;
    const tone = pfbm(u * 3, v * 2, 3, 61, 3);
    const grain = pnoise(u * 90 + wx * 6, v * 9, 90, 77);
    const lum = (0.4 + 0.52 * Math.pow(clamp(h, 0, 1), 1.1)) * (0.9 + 0.14 * grain);
    rgb[i * 3] = lum * lerp(1.0, 0.94, tone); rgb[i * 3 + 1] = lum * lerp(0.94, 0.96, tone); rgb[i * 3 + 2] = lum * lerp(0.86, 0.98, tone);
  }
  // tile 1: birch (pale, satin, dark lenticels and scars)
  const o1 = HT * W;
  for (let y = 0; y < HT; y++) for (let x = 0; x < W; x++) {
    const u = x / W, v = y / HT, i = o1 + y * W + x;
    const blot = pfbm(u * 3, v * 2.5, 3, 71, 4), streak = pfbm(u * 2, v * 46, 2, 81, 2), fine = pfbm(u * 30, v * 60, 30, 91, 2);
    const lum = 0.86 + 0.12 * blot - 0.1 * sstep(0.55, 0.8, streak) + (fine - 0.5) * 0.05;
    hgt[i] = 0.6 + 0.08 * streak + 0.04 * fine;
    rgb[i * 3] = lum; rgb[i * 3 + 1] = lum * lerp(0.97, 0.99, blot); rgb[i * 3 + 2] = lum * lerp(0.9, 0.97, blot);
  }
  const rng = mulberry32(977);
  const stamp = (cx, cy, hw, hh, dark, depth, soft) => { // soft dark ellipse, wraps in x
    const x0 = Math.floor(cx - hw - 2), x1 = Math.ceil(cx + hw + 2), y0 = Math.max(0, Math.floor(cy - hh - 2)), y1 = Math.min(HT - 1, Math.ceil(cy + hh + 2));
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
      const dx = (x - cx) / hw, dy = (y - cy) / hh, d = dx * dx + dy * dy;
      if (d > 1.6) continue;
      const k = (1 - sstep(soft, 1.3, d));
      const i = o1 + y * W + (((x % W) + W) % W);
      rgb[i * 3] = lerp(rgb[i * 3], dark, k); rgb[i * 3 + 1] = lerp(rgb[i * 3 + 1], dark * 0.9, k); rgb[i * 3 + 2] = lerp(rgb[i * 3 + 2], dark * 0.82, k);
      hgt[i] -= depth * k;
    }
  };
  for (let k = 0; k < 210; k++) stamp(rng() * W, rng() * HT, rng.range(4, 22), rng.range(0.8, 1.5), rng.range(0.1, 0.24), 0.25, 0.25);
  for (let k = 0; k < 7; k++) { // branch scars: a dark eye with whiskers
    const cx = rng() * W, cy = rng.range(40, HT - 40), w = rng.range(10, 22);
    stamp(cx, cy, w, w * 0.3, 0.11, 0.4, 0.1);
    stamp(cx - w * 1.2, cy + w * 0.35, w * 0.9, 2.2, 0.14, 0.2, 0.2); stamp(cx + w * 1.2, cy + w * 0.35, w * 0.9, 2.2, 0.14, 0.2, 0.2);
  }
  for (let y = 0; y < H; y++) {
    const yb = y < HT ? 0 : HT, yy = y - yb;
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      const xl = y * W + ((x + W - 1) % W), xr = y * W + ((x + 1) % W);
      const yu = (yb + Math.max(0, yy - 1)) * W + x, yd = (yb + Math.min(HT - 1, yy + 1)) * W + x;
      const st = y < HT ? 3.2 : 2.0;
      let nx = (hgt[xl] - hgt[xr]) * st, ny = (hgt[yu] - hgt[yd]) * st, nz = 1;
      const l = 1 / Math.hypot(nx, ny, nz); nx *= l; ny *= l; nz *= l;
      nor[i * 4] = (nx * 0.5 + 0.5) * 255; nor[i * 4 + 1] = (ny * 0.5 + 0.5) * 255; nor[i * 4 + 2] = (nz * 0.5 + 0.5) * 255; nor[i * 4 + 3] = 255;
      col[i * 4] = clamp(rgb[i * 3], 0, 1) * 255; col[i * 4 + 1] = clamp(rgb[i * 3 + 1], 0, 1) * 255; col[i * 4 + 2] = clamp(rgb[i * 3 + 2], 0, 1) * 255; col[i * 4 + 3] = 255;
    }
  }
  const mk = (data, srgb) => {
    const t = new THREE.DataTexture(data, W, H, THREE.RGBAFormat);
    t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.ClampToEdgeWrapping;
    t.magFilter = THREE.LinearFilter; t.minFilter = THREE.LinearMipmapLinearFilter; t.generateMipmaps = true; t.anisotropy = 4;
    if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    t.needsUpdate = true;
    return t;
  };
  return { map: mk(col, true), normalMap: mk(nor, false) };
}

// Leaf atlas: 4 x 2 tiles of 256 px, each a small spray of leaves on a twig, stem at the bottom centre.
// GL cell index = col + 4 * row (row 0 = bottom): 0,1 oak  2,3 maple  4,5 birch  6,7 pine needles.
function leafPath(ctx, kind, L, rng) {
  ctx.beginPath();
  if (kind === 'maple') {
    const pts = [[180, 0.1], [150, 0.2], [112, 0.4], [84, 0.2], [55, 0.56], [26, 0.3], [0, 0.66], [-26, 0.3], [-55, 0.56], [-84, 0.2], [-112, 0.4], [-150, 0.2]];
    const cx = L * 0.42;
    pts.forEach(([a, r], i) => {
      const rr = r * L * (0.92 + rng() * 0.16), x = cx + Math.cos(a * DEG) * rr, y = Math.sin(a * DEG) * rr;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
  } else {
    const N = 26, half = [];
    for (let i = 0; i <= N; i++) {
      const l = i / N;
      let w;
      if (kind === 'oak') w = 0.27 * Math.pow(Math.sin(Math.PI * Math.pow(l, 0.8)), 0.7) * (0.7 + 0.3 * Math.cos(l * 6.283 * 3.6 + 0.6)) * (0.5 + 0.7 * l);
      else w = 0.36 * Math.sin(Math.PI * Math.pow(l, 0.62)) * (1 - 0.35 * l);
      half.push([0.1 * L + l * 0.9 * L, w * L]);
    }
    ctx.moveTo(half[0][0], 0);
    for (let i = 0; i <= N; i++) ctx.lineTo(half[i][0], half[i][1]);
    for (let i = N; i >= 0; i--) ctx.lineTo(half[i][0], -half[i][1]);
  }
  ctx.closePath();
}
function drawLeaf(ctx, kind, x, y, ang, L, rng) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
  const sh = 0.8 + rng() * 0.2, warm = rng();
  const r = 255 * sh, g = 255 * sh * lerp(0.9, 1.0, warm), b = 255 * sh * lerp(0.72, 0.9, warm);
  const gr = ctx.createLinearGradient(0, 0, L, 0);
  gr.addColorStop(0, `rgb(${r * 0.8 | 0},${g * 0.8 | 0},${b * 0.78 | 0})`); gr.addColorStop(0.55, `rgb(${r | 0},${g | 0},${b | 0})`); gr.addColorStop(1, `rgb(${r * 0.93 | 0},${g * 0.9 | 0},${b * 0.8 | 0})`);
  ctx.strokeStyle = 'rgb(110,84,60)'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(L * 0.14, 0); ctx.stroke();
  leafPath(ctx, kind, L, rng);
  ctx.fillStyle = gr; ctx.fill();
  ctx.strokeStyle = `rgba(${r * 0.72 | 0},${g * 0.66 | 0},${b * 0.58 | 0},0.5)`; ctx.lineWidth = 1.0; ctx.stroke();
  // veins
  ctx.strokeStyle = `rgba(${r * 0.7 | 0},${g * 0.63 | 0},${b * 0.55 | 0},0.7)`; ctx.lineWidth = 1.2;
  if (kind === 'maple') {
    const cx = L * 0.42;
    for (const a of [0, 55, -55, 112, -112]) { ctx.beginPath(); ctx.moveTo(cx - L * 0.3, 0); ctx.lineTo(cx, 0); ctx.lineTo(cx + Math.cos(a * DEG) * L * 0.5, Math.sin(a * DEG) * L * 0.5); ctx.stroke(); }
  } else {
    ctx.beginPath(); ctx.moveTo(L * 0.1, 0); ctx.lineTo(L * 0.95, 0); ctx.stroke();
    ctx.lineWidth = 0.9;
    for (let k = 1; k <= 4; k++) { const lx = L * (0.15 + k * 0.16); for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(lx, 0); ctx.lineTo(lx + L * 0.12, s * L * 0.17); ctx.stroke(); } }
  }
  ctx.restore();
}
function drawSpray(ctx, kind, rng) {
  if (kind === 'pine') {
    // a flat frond: a twig with side shoots, each a brush of needles
    const shoots = [[128, 250, -90, 150], [128, 200, -140, 80], [128, 190, -40, 85], [128, 140, -150, 70], [128, 130, -30, 72]];
    for (const [sx, sy, a0, len] of shoots) {
      const a = (a0 + rng.range(-8, 8)) * DEG, ex = sx + Math.cos(a) * len, ey = sy + Math.sin(a) * len;
      ctx.strokeStyle = 'rgb(120,92,66)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
      const nN = Math.round(len * 0.85);
      for (let k = 0; k < nN; k++) {
        const f = 0.12 + 0.9 * rng(), bx = sx + (ex - sx) * f, by = sy + (ey - sy) * f;
        const na = a + rng.sign() * rng.range(22, 62) * DEG, nl = rng.range(30, 46) * (1 - 0.25 * f);
        const sh = 0.72 + rng() * 0.28;
        ctx.strokeStyle = `rgb(${225 * sh | 0},${255 * sh | 0},${215 * sh | 0})`; ctx.lineWidth = rng.range(2.4, 3.6);
        ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + Math.cos(na) * nl, by + Math.sin(na) * nl); ctx.stroke();
      }
    }
    return;
  }
  // a main twig with two side twiglets, leaves alternating along each and one at every tip
  const L0 = kind === 'birch' ? 40 : kind === 'maple' ? 60 : 54;
  const per = kind === 'birch' ? 8 : kind === 'maple' ? 4 : 6;
  const bend = rng.range(-14, 14);
  const twig = (x0, y0, a0, len, n, curve) => {
    const pt = (f) => { const a = (a0 + curve * f) * DEG; return [x0 + Math.cos(a) * len * f, y0 + Math.sin(a) * len * f]; };
    ctx.strokeStyle = 'rgb(112,86,62)'; ctx.lineWidth = 2.6; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x0, y0);
    for (let i = 1; i <= 6; i++) { const [x, y] = pt(i / 6); ctx.lineTo(x, y); }
    ctx.stroke();
    let s = rng.sign();
    for (let i = 0; i < n; i++) {
      const last = i === n - 1, f = last ? 1 : 0.22 + 0.76 * i / (n - 1);
      const [x, y] = pt(f);
      const L = L0 * rng.range(0.82, 1.12) * (last ? 1.08 : lerp(0.88, 1, f));
      const a = a0 + curve * f + (last ? rng.range(-12, 12) : s * rng.range(42, 76));
      drawLeaf(ctx, kind, x, y, a * DEG, L, rng);
      s = -s;
    }
    return pt;
  };
  const main = twig(128, 254, -90 + bend * 0.3, 176, per + 2, bend);
  const [ax, ay] = main(0.3), [bx, by] = main(0.5);
  const sl = rng.sign();
  twig(ax, ay, -90 + sl * rng.range(44, 58), 96, per, sl * 14);
  twig(bx, by, -90 - sl * rng.range(40, 54), 84, per - 1, -sl * 14);
}
function makeLeafAtlas(TS) {
  const W = TS * 4, H = TS * 2, cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d', { willReadFrequently: true });
  const kinds = ['oak', 'oak', 'maple', 'maple', 'birch', 'birch', 'pine', 'pine'];
  const rng = mulberry32(4242);
  for (let t = 0; t < 8; t++) {
    const cx = t % 4, cyGL = Math.floor(t / 4);
    ctx.save(); ctx.translate(cx * TS, (1 - cyGL) * TS); ctx.scale(TS / 256, TS / 256);
    ctx.beginPath(); ctx.rect(1, 1, 254, 254); ctx.clip();
    drawSpray(ctx, kinds[t], rng);
    ctx.restore();
  }
  const src = ctx.getImageData(0, 0, W, H).data, data = new Uint8Array(W * H * 4);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4, o = ((H - 1 - y) * W + x) * 4, a = src[i + 3];
    if (a < 8) { data[o] = 232; data[o + 1] = 222; data[o + 2] = 190; data[o + 3] = 0; }
    else { data[o] = src[i]; data[o + 1] = src[i + 1]; data[o + 2] = src[i + 2]; data[o + 3] = a; }
  }
  const t = new THREE.DataTexture(data, W, H, THREE.RGBAFormat);
  t.colorSpace = THREE.SRGBColorSpace; t.magFilter = THREE.LinearFilter; t.minFilter = THREE.LinearMipmapLinearFilter;
  t.generateMipmaps = true; t.anisotropy = 4; t.needsUpdate = true;
  return t;
}

const _tex = { bark: null, leaf: {} };
function getTextures(leafTile) {
  return { bark: _tex.bark || (_tex.bark = makeBarkTextures()), leaf: _tex.leaf[leafTile] || (_tex.leaf[leafTile] = makeLeafAtlas(leafTile)) };
}

// ---------------------------------------------------------------------------------------------
// Leaf material (Lambert patched for instanced cards) and its depth material
// ---------------------------------------------------------------------------------------------
const LEAF_VERT_PARS = /* glsl */`
attribute vec4 aPos;   // anchor xyz (stem base), w = card size in metres
attribute vec4 aQuat;  // card orientation
attribute vec4 aNrm;   // shading normal bent towards a sphere around the clump, w = sway weight
attribute vec4 aCol;   // sRGB colour, a = (atlas tile + phase) / 8
uniform float uTime;
uniform vec3 uWind;    // xy = direction on the ground plane, z = strength
varying vec2 vLeafUv;
varying vec3 vLeafCol;
varying vec3 vWPos;
varying float vFar;
vec3 qrot(vec4 q, vec3 v){ return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v); }
vec3 leafWorld(out vec3 nrm){
  float code = aCol.a * 255.0 / 32.0;
  float tile = floor(code + 0.001), phase = fract(code);
  vLeafUv = (vec2(mod(tile, 4.0), floor(tile / 4.0)) + uv * 0.98 + 0.01) * vec2(0.25, 0.5);
  vec3 anchor = aPos.xyz;
  float size = aPos.w;
#ifdef LEAF_DEPTH
  vFar = 0.0;
#else
  vFar = smoothstep(22.0, 105.0, distance(anchor, cameraPosition));
  size *= 1.0 + 0.4 * vFar;
#endif
  float sway = aNrm.w;
  // gust fronts travelling across the park
  float ga = dot(anchor.xz, uWind.xy) * 0.06 - uTime * 1.0;
  float gust = 0.5 + 0.5 * sin(ga + 1.7 * sin(ga * 0.31 + anchor.z * 0.04));
  gust = uWind.z * (0.3 + 0.7 * gust * gust);
  vec3 lp = vec3(position.x, position.y, 0.0) * size;
  float w1 = sin(uTime * (2.1 + phase * 2.3) + phase * 40.0 + anchor.x * 0.7);
  float w2 = sin(uTime * (3.7 + phase * 3.1) + phase * 91.0 + anchor.z * 0.5);
  lp.z += (position.y * w1 * 0.13 + position.x * w2 * 0.12) * size * gust * sway; // rock about the stem, twist
  vec3 wp = anchor + qrot(aQuat, lp);
  wp.xz += uWind.xy * (gust * sway * 0.06 * (0.3 + position.y) * (0.6 + 0.4 * w1));
  nrm = normalize(aNrm.xyz + qrot(aQuat, vec3(position.x, position.y - 0.5, 0.0)) * 0.5);
  vWPos = wp;
  vLeafCol = pow(aCol.rgb, vec3(2.2));
  return wp;
}`;

const LEAF_FRAG_PARS = /* glsl */`
uniform vec3 uFocus;
uniform float uFocusOn;
varying vec2 vLeafUv;
varying vec3 vLeafCol;
varying vec3 vWPos;
varying float vFar;
float ign(vec2 p){ return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715)))); }`;

const LEAF_FRAG_MAP = /* glsl */`
vec4 leafTex = texture2D(map, vLeafUv);
if (leafTex.a < mix(0.5, 0.2, vFar)) discard;
{
  // camera friendly foliage: dither away leaves right in front of the lens and leaves inside
  // a soft tube from the camera to the player
  vec3 toP = vWPos - cameraPosition;
  float vis = smoothstep(0.25, 0.95, length(toP));
  if (uFocusOn > 0.5) {
    vec3 seg = uFocus - cameraPosition;
    float sl = max(length(seg), 0.001);
    vec3 sd = seg / sl;
    float along = dot(toP, sd);
    float d = length(toP - sd * along);
    float tt = clamp(along / sl, 0.0, 1.0);
    float rad = mix(0.22, 0.85, tt);
    float nearer = step(0.0, along) * (1.0 - smoothstep(sl + 0.1, sl + 0.9, along));
    vis = min(vis, mix(1.0, smoothstep(rad, rad * 2.1, d), nearer));
  }
  if (vis < 0.995 && vis <= ign(gl_FragCoord.xy)) discard;
}
diffuseColor.rgb *= leafTex.rgb * vLeafCol;`;

const LEAF_LIGHT = /* glsl */`
	float ndl = dot( geometryNormal, directLight.direction );
	float wrap = saturate( ( ndl + 0.3 ) / 1.3 );
	float back = saturate( -ndl );
	float vdl = saturate( dot( -geometryViewDir, directLight.direction ) ); // looking towards the sun
	vec3 through = material.diffuseColor * vec3( 1.5, 1.2, 0.5 ) + vec3( 0.06, 0.04, 0.0 );
	reflectedLight.directDiffuse += directLight.color * wrap * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directDiffuse += directLight.color * ( back * 0.22 + pow( vdl, 2.5 ) * ( 0.25 + 0.75 * back ) * 0.9 ) * BRDF_Lambert( through );`;

const LEAF_GLOW = /* glsl */`
reflectedLight.indirectDiffuse *= 1.45;
reflectedLight.indirectDiffuse += diffuseColor.rgb * vec3( 1.0, 0.86, 0.62 ) * 0.2; // light bounced around inside the crown
#if NUM_DIR_LIGHTS > 0
{
	// light soaking through the crown when you look towards the low sun (not cut off by shadows)
	float vdl = saturate( dot( -normalize( vViewPosition ), directionalLights[ 0 ].direction ) );
	vec3 through = diffuseColor.rgb * vec3( 1.5, 1.15, 0.45 ) + vec3( 0.05, 0.03, 0.0 );
	reflectedLight.directDiffuse += directionalLights[ 0 ].color * through * ( pow( vdl, 2.0 ) * 0.14 );
}
#endif`;

function makeLeafMaterials(tex, uniforms) {
  const mat = new THREE.MeshLambertMaterial({ map: tex, side: THREE.DoubleSide });
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, uniforms);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\n' + LEAF_VERT_PARS)
      .replace('#include <beginnormal_vertex>', 'vec3 leafN; vec3 leafP = leafWorld(leafN); vec3 objectNormal = leafN;')
      .replace('#include <begin_vertex>', 'vec3 transformed = leafP;');
    let lam = THREE.ShaderChunk.lights_lambert_pars_fragment;
    const a = lam.indexOf('float dotNL'), b = lam.indexOf('}', a);
    lam = lam.slice(0, a) + LEAF_LIGHT + '\n' + lam.slice(b);
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\n' + LEAF_FRAG_PARS)
      .replace('#include <map_fragment>', LEAF_FRAG_MAP)
      .replace('#include <normal_fragment_begin>', 'vec3 normal = normalize( vNormal ); vec3 nonPerturbedNormal = normal;')
      .replace('#include <lights_lambert_pars_fragment>', lam)
      .replace('#include <lights_fragment_end>', '#include <lights_fragment_end>\n' + LEAF_GLOW);
  };
  mat.customProgramCacheKey = () => 'squirrel-leaf';
  const depth = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: tex, side: THREE.DoubleSide });
  depth.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, uniforms);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#define LEAF_DEPTH\n#include <common>\n' + LEAF_VERT_PARS)
      .replace('#include <begin_vertex>', 'vec3 leafN; vec3 transformed = leafWorld(leafN);');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec2 vLeafUv;')
      .replace('#include <map_fragment>', 'if (texture2D(map, vLeafUv).a < 0.62) discard;');
  };
  depth.customProgramCacheKey = () => 'squirrel-leaf-depth';
  return { mat, depth };
}

// ---------------------------------------------------------------------------------------------
// Leaves
// ---------------------------------------------------------------------------------------------
const PAL = PALETTE.leaves.map((c) => new THREE.Color(c));
const PINE_GREENS = [new THREE.Color(0x4a6b34), new THREE.Color(0x5d7a36), new THREE.Color(0x3f5f38)];
const _m4 = new THREE.Matrix4(), _q = new THREE.Quaternion(), _cc = new THREE.Color(), _hsl = { h: 0, s: 0, l: 0 };
const _sd = new THREE.Vector3(), _n0 = new THREE.Vector3(), _xx = new THREE.Vector3(), _zz = new THREE.Vector3(), _ru = new THREE.Vector3();
const _an = new THREE.Vector3(), _bn = new THREE.Vector3(), _ctr = new THREE.Vector3();

function pickHue(rng, hues) {
  let W = 0; for (const h of hues) W += h[1];
  let x = rng() * W;
  for (const h of hues) { x -= h[1]; if (x <= 0) return h[0]; }
  return hues[0][0];
}

function pushCard(LF, anchor, size, q, bn, sway, col, tile, phase) {
  LF.pos.push(anchor.x, anchor.y, anchor.z, size);
  LF.quat.push(q.x, q.y, q.z, q.w);
  LF.nrm.push(bn.x, bn.y, bn.z, sway);
  LF.col.push(col.r, col.g, col.b, (tile + clamp(phase, 0, 0.96) + 0.01) / 8 * (32 * 8 / 255));
}

function buildLeaves(LF, T, quality, world) {
  const P = T.P, rng = T.rng, s = T.scale, E = T.env;
  // attach points
  const att = [], fill = P.fill ?? 0.12;
  let W = 0;
  const add = (br, i, w) => { w *= fill + (1 - fill) * sstep(0.3, 0.72, Math.sqrt(envE(E, br.pts[i]))); att.push({ p: br.pts[i], q: br.pts[i - 1], w, clump: br.clump }); W += w; };
  for (const br of T.branches) {
    const n = br.pts.length - 1;
    if (br.level === P.maxLevel) for (let i = 1; i <= n; i++) add(br, i, i === n ? 1.6 : 1.1);
    else if (br.level === P.maxLevel - 1 && br.level > 0) { for (let i = 1; i <= n; i++) if (i / n > 0.34) add(br, i, i === n ? 1.4 : 0.9); }
    else if (br.level >= 1 || P.leader) { add(br, n, 1.4); if (br.level >= 1) add(br, n - 1, 0.7); }
  }
  // clump centres (for the bent shading normals)
  const clumps = new Map();
  for (const a of att) {
    let c = clumps.get(a.clump);
    if (!c) clumps.set(a.clump, c = { x: 0, y: 0, z: 0, w: 0, t: rng() });
    c.x += a.p.x * a.w; c.y += a.p.y * a.w; c.z += a.p.z * a.w; c.w += a.w;
  }
  for (const c of clumps.values()) { c.x /= c.w; c.y /= c.w; c.z /= c.w; }
  // colours: one or two hues per tree
  let c1, c2;
  if (P.hues) {
    const green = rng() < 0.12;
    const h1 = green ? 6 : pickHue(rng, P.hues);
    let h2 = rng() < 0.3 ? h1 : pickHue(rng, P.hues);
    if (green) h2 = rng() < 0.6 ? 5 : 2;
    c1 = PAL[h1]; c2 = PAL[h2];
  } else { c1 = PINE_GREENS[rng.int(0, 2)]; c2 = PINE_GREENS[rng.int(0, 2)]; }
  T.c1 = c1; T.c2 = c2;
  const mixBias = rng.range(0.15, 0.5);
  const N = Math.round(P.cards * quality * s * s * rng.range(0.92, 1.08));
  const sizeK = 1 / Math.sqrt(Math.max(0.3, quality));
  const spread = P.spread * s;
  for (const a of att) {
    const cnt = Math.floor(a.w / W * N + rng());
    const cl = clumps.get(a.clump);
    _d.subVectors(a.p, a.q).normalize(); // twig direction
    for (let k = 0; k < cnt; k++) {
      const size = rng.range(P.cardSize[0], P.cardSize[1]) * s * sizeK;
      randUnit(rng, _ru);
      const rr = spread * Math.cbrt(rng());
      _ctr.set(a.p.x + _ru.x * rr, a.p.y + _ru.y * rr * 0.6, a.p.z + _ru.z * rr).addScaledVector(_d, rng.range(-0.25, 0.15) * s);
      // outward (from the crown centre) and clump directions
      _an.subVectors(_ctr, E.C); const eDist = _an.length(); _an.divideScalar(Math.max(eDist, 1e-3));
      _bn.set(_ctr.x - cl.x, _ctr.y - cl.y, _ctr.z - cl.z);
      const cd = _bn.length(); _bn.divideScalar(Math.max(cd, 1e-3));
      // stem direction and the leaf plane
      randUnit(rng, _ru);
      if (P.flat) { _sd.copy(_d).addScaledVector(_ru, 0.5); _sd.y = _sd.y * 0.6 - 0.12; }
      else if (P.hang) _sd.copy(_d).multiplyScalar(0.5).addScaledVector(_ru, 0.55).addScaledVector(UP, -P.hang);
      else _sd.copy(_d).multiplyScalar(0.55).addScaledVector(_ru, 0.9).addScaledVector(_an, 0.4);
      _sd.normalize();
      randUnit(rng, _ru);
      _n0.copy(UP).multiplyScalar(P.layer).addScaledVector(_an, 0.45).addScaledVector(_ru, 0.6).normalize();
      _xx.crossVectors(_sd, _n0);
      if (_xx.lengthSq() < 1e-4) _xx.crossVectors(_sd, _ru);
      _xx.normalize(); _zz.crossVectors(_xx, _sd);
      _q.setFromRotationMatrix(_m4.makeBasis(_xx, _sd, _zz));
      _a.copy(_ctr).addScaledVector(_sd, -size * 0.4); // stem base
      // shading normal: sphere around the clump blended with sphere around the whole crown
      _bn.multiplyScalar(0.38).addScaledVector(_an, 0.7).addScaledVector(UP, 0.2).normalize();
      // colour
      const e = clamp(Math.sqrt(envE(E, _ctr)), 0, 1.1);
      const t = clamp(mixBias * 0.6 + cl.t * 0.55 + (rng() - 0.5) * 0.45, 0, 1);
      _cc.copy(c1).lerp(c2, t);
      if (P.hues) _cc.lerp(PAL[rng() < 0.5 ? 2 : 5], (1 - sstep(0.35, 0.95, e)) * 0.3); // inner leaves turn later: more gold and olive
      _cc.getHSL(_hsl);
      _cc.setHSL(_hsl.h + rng.range(-0.018, 0.018), clamp(_hsl.s * rng.range(0.85, 1.1), 0, 1), clamp(_hsl.l * rng.range(0.82, 1.18), 0, 1));
      const ao = lerp(0.74, 1, sstep(0.3, 0.95, e)) * lerp(0.9, 1, sstep(-0.6, 0.5, (_ctr.y - cl.y) / Math.max(0.5, spread * 2)));
      _cc.multiplyScalar(ao).convertLinearToSRGB();
      const tile = P.tiles[rng() < 0.5 ? 0 : 1];
      pushCard(LF, _a, size, _q, _bn, lerp(0.45, 1, sstep(0.4, 1, e)), _cc, tile, rng());
    }
  }
  // fallen leaves under the tree
  const nf = Math.round((P.fallen || 0) * quality * s * s);
  const Rf = T.env.R * 1.25;
  for (let k = 0; k < nf; k++) {
    const a = rng() * 6.283, r = Rf * Math.pow(rng(), 0.7);
    const x = T.env.C.x + Math.cos(a) * r, z = T.env.C.z + Math.sin(a) * r;
    const size = rng.range(0.3, 0.5);
    const yaw = rng() * 6.283;
    _xx.set(Math.cos(yaw), rng.range(-0.06, 0.06), Math.sin(yaw)).normalize();
    _zz.set(rng.range(-0.08, 0.08), 1, rng.range(-0.08, 0.08)).normalize();
    _sd.crossVectors(_zz, _xx).normalize(); _xx.crossVectors(_sd, _zz);
    _q.setFromRotationMatrix(_m4.makeBasis(_xx, _sd, _zz));
    _a.set(x, world.groundHeight(x, z) + 0.035 + rng() * 0.02, z).addScaledVector(_sd, -size * 0.5);
    _cc.copy(c1).lerp(c2, rng()).lerp(_cc.clone().setHex(0x8a5a2c), rng.range(0.15, 0.55)).multiplyScalar(rng.range(0.7, 0.95)).convertLinearToSRGB();
    pushCard(LF, _a, size, _q, UP, 0, _cc, P.tiles[rng() < 0.5 ? 0 : 1], rng());
  }
}

// ---------------------------------------------------------------------------------------------
// Capsules, perches
// ---------------------------------------------------------------------------------------------
function registerTree(world, T) {
  let count = 0;
  const top = new THREE.Vector3(0, -Infinity, 0);
  const cands = [];
  for (const br of T.branches) {
    const n = br.pts.length - 1;
    for (let i = 0; i < n; i++) {
      let ra = br.rad[i]; const rb = br.rad[i + 1];
      if ((ra + rb) * 0.5 < 0.045) continue;
      const a = br.pts[i], b = br.pts[i + 1];
      if (br.level === 0 && i === 0) ra *= 1.18;
      world.addCapsule(a, b, ra, rb, { kind: br.level === 0 ? 'trunk' : 'branch' });
      count++;
      if (b.y + rb > top.y) top.set(b.x, b.y + rb, b.z);
      if (br.level === 0) continue;
      const rm = (ra + rb) * 0.5, len = a.distanceTo(b), dy = (b.y - a.y) / len;
      if (rm < 0.06 || rm > 0.3) continue;
      let stops = len > 1.6 ? [0.3, 0.7] : [0.5];
      if (i === 0) { const f0 = (br.parentRad + 0.2) / len; if (f0 > 0.9) continue; stops = [Math.max(0.6, f0)]; } // clear of the parent limb
      for (const f of stops) {
        _d.subVectors(b, a).divideScalar(len);
        _e.copy(UP).addScaledVector(_d, -_d.y);
        if (_e.lengthSq() < 1e-4) continue;
        _e.normalize();
        const r = lerp(ra, rb, f);
        cands.push({ p: new THREE.Vector3().lerpVectors(a, b, f).addScaledVector(_e, r), steep: Math.abs(dy) });
      }
    }
  }
  // choose 8..20 perches: highest first, then farthest-point sampling so they spread through the crown
  let pool = cands.filter((c) => c.steep < 0.72);
  if (pool.length < 8) pool = cands;
  const want = clamp(Math.round(pool.length / 5), 8, 20);
  const perches = [];
  if (pool.length) {
    let hi = 0;
    for (let i = 1; i < pool.length; i++) if (pool[i].p.y > pool[hi].p.y) hi = i;
    const dist = pool.map(() => Infinity);
    let cur = hi;
    while (perches.length < want && perches.length < pool.length) {
      perches.push(pool[cur].p);
      let best = -1, bd = -1;
      for (let i = 0; i < pool.length; i++) {
        const d = pool[i].p.distanceTo(pool[cur].p);
        if (d < dist[i]) dist[i] = d;
        if (dist[i] > bd) { bd = dist[i]; best = i; }
      }
      if (bd < 0.6) break;
      cur = best;
    }
  }
  return { count, top, perches };
}

// ---------------------------------------------------------------------------------------------
// Public
// ---------------------------------------------------------------------------------------------
export function createTrees(world, specs, opts = {}) {
  const quality = clamp(opts.quality ?? 1, 0.25, 1.5);
  const chunkSize = opts.chunkSize || 80;
  const group = new THREE.Group(); group.name = 'trees';
  const tex = getTextures(opts.leafTile || (quality >= 0.8 ? 512 : 256));
  const uniforms = {
    uTime: { value: 0 }, uWind: { value: new THREE.Vector3(0.83, 0.55, 1) },
    uFocus: { value: new THREE.Vector3() }, uFocusOn: { value: 0 },
  };
  const barkMat = new THREE.MeshStandardMaterial({ map: tex.bark.map, normalMap: tex.bark.normalMap, normalScale: new THREE.Vector2(1.0, 1.0), vertexColors: true, roughness: 0.96, metalness: 0, envMapIntensity: 0.6 });
  const leafMats = makeLeafMaterials(tex.leaf, uniforms);

  const chunks = new Map();
  let bx0 = Infinity, bx1 = -Infinity, bz0 = Infinity, bz1 = -Infinity;
  for (const sp of specs) { bx0 = Math.min(bx0, sp.x); bx1 = Math.max(bx1, sp.x); bz0 = Math.min(bz0, sp.z); bz1 = Math.max(bz1, sp.z); }
  const ncx = Math.max(1, Math.ceil((bx1 - bx0 + 1) / chunkSize)), ncz = Math.max(1, Math.ceil((bz1 - bz0 + 1) / chunkSize));
  const getChunk = (x, z) => {
    const key = Math.min(ncx - 1, Math.floor((x - bx0) / (bx1 - bx0 + 1) * ncx)) + ',' + Math.min(ncz - 1, Math.floor((z - bz0) / (bz1 - bz0 + 1) * ncz));
    let c = chunks.get(key);
    if (!c) chunks.set(key, c = { G: { pos: [], nrm: [], uv: [], col: [], idx: [] }, LF: { pos: [], quat: [], nrm: [], col: [] } });
    return c;
  };

  const stats = { trees: specs.length, barkTriangles: 0, leafCards: 0, leafTriangles: 0, triangles: 0, capsules: 0, drawCalls: 0, perType: {} };
  const trees = [];
  const origin = new THREE.Vector3();
  for (const spec of specs) {
    const P = TYPES[spec.type] || TYPES.oak;
    const rng = mulberry32((spec.seed ?? 1) * 2654435761 + 12345);
    const T = { P, rng, scale: spec.scale || 1, branches: [], env: null, axis: new THREE.Vector3(), y0: 0, capTrunk: false,
      bark: [P.bark[0] * rng.range(0.9, 1.08), P.bark[1] * rng.range(0.9, 1.08), P.bark[2] * rng.range(0.9, 1.08)].map((v) => Math.min(1, v)),
      lobeN: rng.int(4, 6), lobePh: rng() * 6.28 };
    if (P.gen === 'pine') genPine(T); else if (P.gen === 'birch') genBirch(T); else genBroad(T);
    // to world space
    origin.set(spec.x, spec.y ?? 0, spec.z);
    T.y0 = origin.y;
    for (const br of T.branches) for (const p of br.pts) if (!p._moved) { p.add(origin); p._moved = true; }
    T.env.C.add(origin); T.axis.add(origin);
    const chunk = getChunk(spec.x, spec.z);
    const i0 = chunk.G.idx.length, l0 = chunk.LF.pos.length;
    buildBark(chunk.G, T);
    buildLeaves(chunk.LF, T, quality, world);
    const reg = registerTree(world, T);
    // measured extents
    let maxR = 0, maxY = reg.top.y;
    for (const br of T.branches) for (const p of br.pts) { maxR = Math.max(maxR, Math.hypot(p.x - spec.x, p.z - spec.z)); maxY = Math.max(maxY, p.y); }
    const t = { spec, height: maxY - origin.y + 0.3, crownRadius: maxR + 0.4, perches: reg.perches, top: reg.top };
    trees.push(t);
    if (opts.debug) (stats.skeletons || (stats.skeletons = [])).push(T);
    stats.capsules += reg.count;
    const pt = stats.perType[spec.type] || (stats.perType[spec.type] = { n: 0, barkTriangles: 0, cards: 0, capsules: 0, perches: 0 });
    pt.n++; pt.barkTriangles += (chunk.G.idx.length - i0) / 3; pt.cards += (chunk.LF.pos.length - l0) / 4; pt.capsules += reg.count; pt.perches += reg.perches.length;
  }

  const quad = { pos: new Float32Array([-0.5, 0, 0, 0.5, 0, 0, 0.5, 1, 0, -0.5, 1, 0]), uv: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), idx: [0, 1, 2, 0, 2, 3] };
  for (const c of chunks.values()) {
    const { G, LF } = c;
    if (G.idx.length) {
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(G.pos), 3));
      g.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(G.nrm), 3));
      g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(G.uv), 2));
      const cu = new Uint8Array(G.col.length);
      for (let i = 0; i < cu.length; i++) cu[i] = clamp(G.col[i], 0, 1) * 255;
      g.setAttribute('color', new THREE.BufferAttribute(cu, 3, true));
      g.setIndex(G.pos.length / 3 > 65535 ? new THREE.BufferAttribute(new Uint32Array(G.idx), 1) : new THREE.BufferAttribute(new Uint16Array(G.idx), 1));
      g.computeBoundingSphere(); g.computeBoundingBox();
      const m = new THREE.Mesh(g, barkMat);
      m.castShadow = true; m.receiveShadow = true; m.name = 'bark';
      group.add(m);
      stats.barkTriangles += G.idx.length / 3; stats.drawCalls++;
    }
    const n = LF.pos.length / 4;
    if (n) {
      const g = new THREE.InstancedBufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(quad.pos, 3));
      g.setAttribute('uv', new THREE.BufferAttribute(quad.uv, 2));
      g.setIndex(quad.idx);
      g.instanceCount = n;
      const pos = new Float32Array(LF.pos), qt = new Int16Array(n * 4), nr = new Int8Array(n * 4), cl = new Uint8Array(n * 4);
      const box = new THREE.Box3();
      for (let i = 0; i < n; i++) {
        for (let k = 0; k < 4; k++) {
          qt[i * 4 + k] = Math.round(clamp(LF.quat[i * 4 + k], -1, 1) * 32767);
          nr[i * 4 + k] = Math.round(clamp(LF.nrm[i * 4 + k], -1, 1) * 127);
          cl[i * 4 + k] = Math.round(clamp(LF.col[i * 4 + k], 0, 1) * 255);
        }
        _a.set(pos[i * 4], pos[i * 4 + 1], pos[i * 4 + 2]); box.expandByPoint(_a);
      }
      g.setAttribute('aPos', new THREE.InstancedBufferAttribute(pos, 4));
      g.setAttribute('aQuat', new THREE.InstancedBufferAttribute(qt, 4, true));
      g.setAttribute('aNrm', new THREE.InstancedBufferAttribute(nr, 4, true));
      g.setAttribute('aCol', new THREE.InstancedBufferAttribute(cl, 4, true));
      box.expandByScalar(2.5);
      g.boundingBox = box; g.boundingSphere = box.getBoundingSphere(new THREE.Sphere());
      const m = new THREE.Mesh(g, leafMats.mat);
      m.customDepthMaterial = leafMats.depth;
      m.castShadow = true; m.receiveShadow = true; m.name = 'leaves';
      group.add(m);
      stats.leafCards += n; stats.drawCalls++;
    }
  }
  stats.leafTriangles = stats.leafCards * 2;
  stats.triangles = stats.barkTriangles + stats.leafTriangles;

  function update(dt, time, camera, focus) {
    uniforms.uTime.value = time;
    if (focus) { uniforms.uFocus.value.copy(focus); uniforms.uFocusOn.value = 1; } else uniforms.uFocusOn.value = 0;
  }
  return { group, update, trees, stats, uniforms };
}
