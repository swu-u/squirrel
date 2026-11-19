// City blocks on the four sides of the park: a front row facing the park, back yards with
// fences and sheds, a back lane, a taller back row, plus the wire drops that tie it together.
import * as THREE from 'three';
import { mulberry32 } from '../../core/rng.js';
import { C, mulC, varyC } from './builder.js';
import { G, SIDE_YAW, SIDE_NAME } from './ground.js';
import { ATLAS } from './textures.js';
import { building, makeStyle, heightFor, PAINT, STUCCO } from './buildings.js';
import { utilityPole, wire } from './streets.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const LANE_Z0 = -97, FENCE_Z = -92.2;

/** 1D lot generator along a street of length len. */
export function makeLots(rng, len, o = {}) {
  const lots = []; let u = 0, prevFloors = 0, gid = 0, groups = 0;
  while (u < len - 0.01) {
    const remain = len - u;
    let kind = o.kinds ? o.kinds[(rng() * o.kinds.length) | 0] : rng() < 0.4 ? 'terrace' : rng() < 0.55 ? 'shop' : 'apt';
    if (o.force && o.force[groups]) kind = o.force[groups];
    gid++; groups++;
    if (kind === 'terrace') {
      const hw = 6.2 + rng() * 1.3; let n = 2 + ((rng() * 3) | 0); n = Math.min(n, Math.floor(remain / hw));
      if (n < 1) kind = 'apt';
      else {
        let floors = 2 + (rng() < 0.45 ? 1 : 0); if (floors === prevFloors) floors = floors === 2 ? 3 : 2;
        const d = 10.2 + rng() * 2, painted = rng() < 0.5, hex = rng();
        let w = hw; if (remain - n * hw < 6.5) w = remain / n;
        for (let i = 0; i < n; i++) lots.push({ u0: u + i * w, u1: u + (i + 1) * w, kind, floors, d, gid, painted, hex, mirror: i % 2 === 1, roof: 'pitch' });
        u += n * w; prevFloors = floors;
      }
    }
    if (kind !== 'terrace') {
      let w = (o.wMin || 9) + rng() * (o.wVar || 5);
      if (o.forceW && o.forceW[groups - 1]) w = o.forceW[groups - 1];
      if (remain - w < 6.5) w = remain;
      const lo = o.minFloors || (kind === 'shop' ? 2 : 3), hi = o.maxFloors || (kind === 'shop' ? 4 : 5);
      let floors = lo + ((rng() * (hi - lo + 1)) | 0); if (floors === prevFloors) floors = floors === hi ? lo : floors + 1;
      lots.push({ u0: u, u1: u + w, kind, floors, d: (o.dMin || 11) + rng() * (o.dVar ?? 2.5), gid, roof: 'flat' });
      u += w; prevFloors = floors;
    }
    if (o.gaps !== false && len - u > 16 && rng() < (o.gapP || 0.5)) { u += 2.4 + rng() * 1.4; lots[lots.length - 1].gapAfter = true; }
  }
  // snap the last lot to the end
  const last = lots[lots.length - 1]; if (last.u1 !== len) last.u1 = len;
  lots.forEach((l, i) => { const p = lots[i - 1], n = lots[i + 1]; l.expL = !p || p.gapAfter; l.expR = !n || !!l.gapAfter; });
  return lots;
}

/** Build a row of lots. place(uc, d) -> { x, z, yaw } in the current frame. */
export function buildRow(S, rng, lots, place, o) {
  const recs = [];
  const groupStyle = new Map();
  lots.forEach((l, i) => {
    const shop = l.kind === 'shop';
    l.h = heightFor(l.floors, shop);
    let st;
    if (l.kind === 'terrace') {
      if (l.painted) st = makeStyle(S, 'terrace', rng, { style: 'painted' });
      else { if (!groupStyle.has(l.gid)) groupStyle.set(l.gid, makeStyle(S, 'terrace', rng, { style: 'brick' })); const gs = groupStyle.get(l.gid); st = { ...gs, door: (rng() * 3) | 0, flowers: rng() < 0.3 }; }
    } else st = makeStyle(S, l.kind, rng);
    l.st = st;
  });
  lots.forEach((l, i) => {
    const p = lots[i - 1], n = lots[i + 1], w = l.u1 - l.u0, P = place((l.u0 + l.u1) / 2, l.d);
    const rec = building(S, {
      x: P.x, z: P.z, yaw: P.yaw, w, d: l.d, floors: l.floors, kind: l.kind, roof: l.roof, st: l.st, mirror: l.mirror,
      expL: l.expL, expR: l.expR, hL: l.expL ? 0 : p.h, hR: l.expR ? 0 : n.h,
      detL: i === 0 && o.detStart, detR: i === lots.length - 1 && o.detEnd,
      sideName: o.sideName, row: o.row, fire: rng() < 0.55, fireSide: l.expR && l.gapAfter && rng() < 0.35 ? 'R' : null,
      dormer: l.roof === 'pitch' && rng() < 0.6, dormerX: (rng() - 0.5) * 1.5, sign: o.sign, noBack: o.noBack,
    }, rng);
    rec.lot = l; l.rec = rec; recs.push(rec);
  });
  return recs;
}

// ---------------------------------------------------------------- yard furniture
export function fence(S, x0, z0, x1, z1, col, h = 1.8, run = false) {
  const b = S.b, M = S.mats, len = Math.hypot(x1 - x0, z1 - z0), yaw = Math.atan2(-(z1 - z0), x1 - x0);
  b.push((x0 + x1) / 2, 0, (z0 + z1) / 2, yaw);
  b.sbox(M.wood, 0, h / 2, 0, len, h, 0.07, 'fence', { c: col, ao: [0.6, 1], tile: 2.0 }, { noCamera: true });
  b.box(M.wood, 0, h + 0.03, 0, len + 0.04, 0.06, 0.13, { c: mulC(col, 0.85), tile: 2.0 });
  const n = Math.max(1, Math.round(len / 2.4));
  for (let i = 0; i <= n; i++) b.box(M.wood, -len / 2 + (i * len) / n, h / 2 + 0.03, 0, 0.11, h + 0.1, 0.13, { c: mulC(col, 0.8), ao: [0.6, 1], tile: 2.0 });
  if (run && len > 6) S.run('ground', [0, 1, 2, 3].map((i) => b.toWorld(-2.4 + i * 1.6, h + 0.06 + 0.25, 0)), 'fence');
  b.pop();
}
function shed(S, x, z, yaw, rng) {
  const b = S.b, M = S.mats, col = varyC(C([0x7a5a3c, 0x5a6a5a, 0x8a4a3a, 0x6a6e72][(rng() * 4) | 0], 1.2), rng, 0.08);
  b.push(x, 0, z, yaw);
  b.sbox(M.wood, 0, 1.0, 0, 2.4, 2.0, 1.9, 'prop', { c: col, ao: [0.6, 1], tile: 2.0 }, { tag: 'shed' });
  const o = { c: C(0x4a4c50, 1.2), rot: [0.16, 0, 0], tile: 2 };
  b.box(M.roofing, 0, 2.13, 0, 2.7, 0.09, 2.3, o); b.cbox(0, 2.13, 0, 2.7, 0.09, 2.3, 'roof', o, { tag: 'shed' });
  b.fq(M.wood, -0.45, 0.05, 0.45, 1.8, 0.955, mulC(col, 0.7));
  b.box(M.plain, 0.34, 0.95, 0.965, 0.05, 0.12, 0.03, { c: C(0x1c1c1e) });
  b.fq(M.atlas, -1.0, 1.1, -0.6, 1.6, 0.955, [1, 1, 1], 1, 1, ATLAS.win[4]);
  S.run('ground', [b.toWorld(0, 2.2 + 0.28, 0)], 'shed');
  b.pop();
}
function wheelieBin(S, x, z, yaw, hex) {
  const b = S.b, M = S.mats, c = C(hex);
  b.push(x, 0, z, yaw);
  b.sbox(M.plain, 0, 0.5, 0, 0.55, 0.95, 0.65, 'prop', { c, ao: [0.6, 1] });
  b.box(M.plain, 0, 1.0, 0.02, 0.6, 0.07, 0.72, { c: mulC(c, 0.8), rot: [0.08, 0, 0] });
  b.pop();
}
function crate(S, x, y, z, s, yaw) {
  const b = S.b, M = S.mats;
  b.push(x, y, z, yaw);
  b.sbox(M.wood, 0, s / 2, 0, s, s, s, 'prop', { c: C(0xb89460), ao: [0.65, 1], tile: 0.9 });
  b.pop();
}
function kennel(S, x, z, yaw) {
  const b = S.b, M = S.mats, col = C(0xa8553a, 1.1);
  b.push(x, 0, z, yaw);
  b.sbox(M.wood, 0, 0.45, 0, 1.0, 0.9, 1.3, 'prop', { c: col, ao: [0.6, 1], tile: 1.0 });
  for (const sg of [-1, 1]) { const o = { c: C(0x4a4c50, 1.2), rot: [0, 0, sg * -0.7], tile: 2 }; b.box(M.roofing, sg * 0.3, 1.1, 0, 0.85, 0.07, 1.5, o); b.cbox(sg * 0.3, 1.1, 0, 0.85, 0.07, 1.5, 'roof', o); }
  b.tri(M.wood, [-0.5, 0.9, 0.65], [0.5, 0.9, 0.65], [0, 1.32, 0.65], [0, 0], [1, 0], [0.5, 0.4], col);
  b.blob(M.plain, 0, 0.36, 0.652, 0.24, 0.34, 0.02, C(0x0c0a08), { seg: 8, rings: 5, bottomAo: 1 });
  b.box(M.plain, 0.9, 0.06, 0.9, 0.34, 0.12, 0.34, { c: C(0xc8452f) });
  b.pop();
}

function mast(S, x, y0, z, hgt) {
  const b = S.b, M = S.mats;
  b.scyl(M.metal, [x, y0, z], [x, y0 + hgt, z], 0.035, 0.03, 6, C(0x8a8f94), 'pole', 2, { tag: 'mast' });
  b.cyl(M.plain, [x, y0 + hgt - 0.16, z], [x, y0 + hgt - 0.02, z], 0.05, 0.045, 6, C(0xd8d2c4), 2);
  return b.toWorld(x, y0 + hgt - 0.1, z);
}
function bracket(S, x, y, z, nz) {
  const b = S.b, M = S.mats;
  b.box(M.plain, x, y, z + nz * 0.06, 0.1, 0.16, 0.14, { c: C(0x2a2c2e) });
  b.cyl(M.plain, [x, y, z + nz * 0.1], [x, y, z + nz * 0.22], 0.045, 0.035, 6, C(0xd8d2c4), 2);
  return b.toWorld(x, y, z + nz * 0.2);
}
/** Where a wire coming from the street side (nz = +1) or from the back (nz = -1) lands on a lot. */
function attachPoint(S, rec, px, nz) {
  const l = rec.lot, x0 = rec.x - rec.w / 2, x1 = rec.x + rec.w / 2, ax = Math.max(x0 + 0.8, Math.min(x1 - 0.8, px));
  const zf = rec.z + nz * rec.d / 2;
  if (rec.roof === 'pitch') { const t = 0.7; return { p: mast(S, ax, rec.h + t * Math.tan(rec.pitch) - 0.1, zf - nz * t, 1.2), roof: true }; }
  if (rec.h <= 11.6) return { p: mast(S, ax, rec.h, zf - nz * 0.5, rec.ph + 1.2), roof: true };
  return { p: bracket(S, ax, 8.9, zf, nz), roof: false };
}

// ---------------------------------------------------------------- one side block
function sideBlock(S, s) {
  const b = S.b, M = S.mats, rng = mulberry32(100 + s * 17), name = SIDE_NAME[s];
  // front row
  const lots = makeLots(rng, 98, { force: { 1: 'apt' }, forceW: { 1: 13.6 } });
  for (const px of [-22, 22]) { const l = lots.find((q) => q.u0 - 49 <= px && q.u1 - 49 >= px); if (l && l.kind !== 'terrace' && l.floors > 3) l.floors = 3; }
  const front = buildRow(S, rng, lots, (uc, d) => ({ x: -49 + uc, z: -G.B0 - d / 2, yaw: 0 }), { sideName: name, row: 'front', detStart: true, detEnd: true });
  // back row
  const blots = makeLots(rng, 98, { kinds: ['apt'], minFloors: 4, maxFloors: 5, wMin: 12, wVar: 7, dMin: 14, dVar: 0, gapP: 0.35 });
  const back = buildRow(S, rng, blots, (uc, d) => ({ x: -49 + uc, z: LANE_Z0 - d / 2, yaw: 0 }), { sideName: name, row: 'back', detStart: true, detEnd: true });
  S.blocks[s] = { front, back };

  // lane
  b.setChunk('q' + S.quadOf(b.wx(-20, -95), b.wz(-20, -95)));
  b.hq(M.stone, -49, LANE_Z0, 0, FENCE_Z, 0, C(0x9f978a, 1.2), 1.3);
  b.setChunk('q' + S.quadOf(b.wx(20, -95), b.wz(20, -95)));
  b.hq(M.stone, 0, LANE_Z0, 49, FENCE_Z, 0, C(0x9f978a, 1.2), 1.3);
  b.hq(M.paving, -49, -G.EDGE - 4, 49, LANE_Z0 - 14, 0, C(0xa9a196));
  // yards
  const fenceCols = [0x8a6a48, 0x6a5a48, 0x7a7468, 0x5f6f5a, 0x9a7a52];
  const dogLot = lots.reduce((a, l) => (l.kind !== 'terrace' && l.u1 - l.u0 > (a ? a.u1 - a.u0 : 0) ? l : a), null);
  lots.forEach((l, i) => {
    const x0 = -49 + l.u0, x1 = -49 + l.u1, zb = -G.B0 - l.d, cx = (x0 + x1) / 2, w = x1 - x0, n = lots[i + 1];
    b.setChunk('q' + S.quadOf(b.wx(cx, -86), b.wz(cx, -86)));
    const paved = rng() < 0.25, fc = varyC(C(fenceCols[(rng() * fenceCols.length) | 0], 1.2), rng, 0.08);
    if (paved) b.hq(M.paving, x0, FENCE_Z, x1, zb, 0, C(0x9a9288)); else b.hq(M.grassTile, x0, FENCE_Z, x1, zb, 0.012, varyC(C(0x7d9a45, 1.25), rng, 0.1));
    const isDog = l === dogLot;
    // fences: lane side, right side, and left side if open
    fence(S, x0, FENCE_Z, x1, FENCE_Z, fc, 1.8, rng() < 0.35);
    b.box(M.wood, cx + (rng() - 0.5) * (w - 3), 0.9, FENCE_Z, 1.0, 1.84, 0.1, { c: mulC(fc, 0.72), tile: 2 });
    const zr = -G.B0 - (n && !l.gapAfter ? Math.min(l.d, n.d) : l.d);
    fence(S, x1 - 0.035, FENCE_Z, x1 - 0.035, zr, fc, 1.8, rng() < 0.3);
    if (l.expL) fence(S, x0 + 0.035, FENCE_Z, x0 + 0.035, zb, fc, 1.8);
    // contents
    if (isDog) {
      kennel(S, x0 + 1.4, FENCE_Z + 1.5, 0.4);
      // worn patches, stepping stones, bowl, ball, bushes
      for (const [px, pz, pr] of [[cx - 1, (FENCE_Z + zb) / 2 + 1, 2.2], [x0 + 2.6, FENCE_Z + 3.2, 1.5], [cx + 2.5, zb - 2.5, 1.6]]) b.cyl(M.plain, [px, 0.014, pz], [px, 0.016, pz], pr, pr * 0.96, 12, C(0x8a7350), 2);
      for (let k = 0; k < 6; k++) b.box(M.stone, cx + 1.5 + (k % 2) * 0.25, 0.03, zb - 0.9 - k * 1.0, 0.6, 0.06, 0.5, { c: C(0xb3a48c, 1.2), tile: 1, skip: 'ny' });
      b.cyl(M.metal, [x0 + 2.6, 0, FENCE_Z + 2.9], [x0 + 2.6, 0.1, FENCE_Z + 2.9], 0.16, 0.2, 10, C(0xb0b4b8), 2);
      b.blob(M.gloss, cx - 1.2, 0.14, (FENCE_Z + zb) / 2 + 1.4, 0.14, 0.14, 0.14, C(0xd8452f), { seg: 8, rings: 5 });
      for (const [px, pz] of [[x1 - 1.0, zb - 1.0], [x0 + 0.9, zb - 1.2], [x1 - 1.1, FENCE_Z + 3.2]]) for (let k = 0; k < 3; k++) b.blob(M.plain, px + Math.cos(k * 2.1) * 0.4, 0.45, pz + Math.sin(k * 2.1) * 0.4, 0.5, 0.45, 0.5, k % 2 ? C(0x4f7a34) : C(0x6a8a36), { seg: 8, rings: 5, noise: 0.12, seed: k + px, top: C(0x8fb04a), bottomAo: 0.4 });
      b.box(M.plain, x1 - 0.1, 1.3, (FENCE_Z + zb) / 2, 0.03, 0.4, 0.62, { c: C(0xe8c838) }); b.box(M.plain, x1 - 0.12, 1.3, (FENCE_Z + zb) / 2, 0.03, 0.12, 0.46, { c: C(0x1c1c1e) });
      S.dogYards[s] = { center: b.toWorld(cx, 0, (FENCE_Z + zb) / 2), radius: 6, w, depth: zb - FENCE_Z, corner: b.toWorld(x1 - 1.2, 0.3, FENCE_Z + 1.2) };
    } else {
      if (rng() < 0.5) shed(S, x1 - 1.6, FENCE_Z + 1.35, 0, rng);
      if (rng() < 0.4 && w > 6) { // vegetable bed
        const bx = x0 + 1.5, bz = zb - 3.4;
        b.sbox(M.wood, bx, 0.15, bz, 1.6, 0.3, 3.0, 'prop', { c: C(0x7a5a3c), ao: [0.6, 1], tile: 1.5 });
        b.hq(M.plain, bx - 0.7, bz - 1.4, bx + 0.7, bz + 1.4, 0.3, C(0x3a2a1c));
        for (let k = 0; k < 5; k++) b.blob(M.plain, bx + (k % 2 ? 0.3 : -0.3), 0.42, bz - 1.1 + k * 0.55, 0.22, 0.18, 0.22, k % 3 ? C(0x4f8a3c) : C(0x8fb04a), { seg: 6, rings: 3, noise: 0.2, seed: k });
      }
      if (rng() < 0.45) { // low washing line on two posts
        const z = zb - 2.2 - rng() * 2, xa = x0 + 1.0, xb = x1 - 1.0;
        for (const px of [xa, xb]) b.scyl(M.plain, [px, 0, z], [px, 2.1, z], 0.035, 0.035, 5, C(0x8a8f94), 'pole', 2);
        wire(S, b.toWorld(xa, 2.05, z), b.toWorld(xb, 2.05, z), { r: 0.02, sag: 0.12, pieces: 3, tag: 'washLow', clothes: 11 + i + s * 10, col: C(0xd8d2c4) });
      }
    }
    wheelieBin(S, x0 + 0.9 + rng() * 2, zb - 0.5, 0, [0x2f5a3a, 0x3a3c40, 0x2f4a6a][(rng() * 3) | 0]);
    // alley after this lot
    if (l.gapAfter && n) {
      const ax0 = x1, ax1 = -49 + n.u0, acx = (ax0 + ax1) / 2;
      b.hq(M.stone, ax0, FENCE_Z, ax1, -G.B0, 0, C(0xa39a8c, 1.2), 1.1);
      b.box(M.plain, ax0 + 0.12, 3.3, -G.B0 - 5, 0.24, 0.1, 0.1, { c: C(0x25272a) }); b.box(M.glow, ax0 + 0.3, 3.2, -G.B0 - 5, 0.2, 0.26, 0.2, { c: [1, 0.85, 0.6] }); b.box(M.plain, ax0 + 0.3, 3.36, -G.B0 - 5, 0.3, 0.06, 0.3, { c: C(0x25272a) });
      wheelieBin(S, ax0 + 0.42, -G.B0 - 3 - rng() * 3, Math.PI / 2, 0x3a3c40);
      if (rng() < 0.7) { crate(S, ax1 - 0.5, 0, -G.B0 - 6, 0.8, 0.2); crate(S, ax1 - 0.48, 0.8, -G.B0 - 6.05, 0.6, 0.5); }
      S.run('ground', [0, 1, 2, 3].map((k) => b.toWorld(acx, 0.25, -G.B0 - 2 - k * 2.2)), 'alley');
      S.alleys.push({ s, center: b.toWorld(acx, 0, -80), w: ax1 - ax0 });
    }
  });
  // high washing lines from the front row backs to the back row fronts
  let washN = 0;
  lots.forEach((l, i) => {
    if ((i + s) % 2 || washN >= 4) return;
    const x = -49 + (l.u0 + l.u1) / 2 + 1.2, tgt = back.find((r) => r.x - r.w / 2 + 1 < x && r.x + r.w / 2 - 1 > x);
    if (!tgt) return;
    const y1 = Math.min(l.h - 0.7, 8.6), y2 = Math.min(tgt.h - 0.8, y1 + 0.5 + rng() * 1.5), zb = -G.B0 - l.d;
    b.setChunk('base');
    const A = bracket(S, x, y1, zb, -1), B2 = bracket(S, x, y2, LANE_Z0, 1);
    const w = wire(S, A, B2, { r: 0.022, sag: 0.45, pieces: 5, tag: 'wash', clothes: 3 + i * 7 + s * 13, col: C(0xd8d2c4) });
    S.washLines.push(w); washN++;
  });
  // lane clutter
  for (let k = 0; k < 5; k++) { const x = -44 + k * 21 + rng() * 6; b.setChunk('q' + S.quadOf(b.wx(x, -96), b.wz(x, -96))); if (!back.some((r) => Math.abs(r.x - x) < r.w / 2)) continue; if (k % 2) wheelieBin(S, x, LANE_Z0 + 0.45, 0, 0x3a3c40); else { crate(S, x, 0, LANE_Z0 + 0.5, 0.9, 0.1); crate(S, x + 1.0, 0, LANE_Z0 + 0.45, 0.7, -0.2); } }
}

export function buildBlocks(S) {
  const b = S.b;
  for (let s = 0; s < 4; s++) { b.push(0, 0, 0, SIDE_YAW[s]); sideBlock(S, s); b.pop(); }
}

/** Wire drops: ring poles -> front row roofs, lane poles + their lines, drops to both rows. */
export function buildDrops(S) {
  const b = S.b;
  b.setChunk('base');
  for (let s = 0; s < 4; s++) {
    b.push(0, 0, 0, SIDE_YAW[s]);
    const { front, back } = S.blocks[s];
    const find = (rows, px) => rows.find((r) => r.x - r.w / 2 <= px && r.x + r.w / 2 >= px) || rows.reduce((a, r) => (Math.abs(r.x - px) < Math.abs(a.x - px) ? r : a));
    S.ringPoles[s].forEach((pole, i) => {
      const px = -44 + i * 22, rec = find(front, px), at = attachPoint(S, rec, px, 1);
      const w = wire(S, pole.drop, at.p, { tag: 'drop', sag: 0.45, pieces: 5 });
      w.roof = at.roof; w.rec = rec; pole.dropWire = w;
      if (s === 0 && at.roof && (i === 1 || (i === 3 && !S.landmarks.firstPole))) { S.landmarks.firstPole = pole.top.clone(); S.landmarks.firstRoof = rec.toWorld(Math.max(-rec.w / 2 + 1, Math.min(rec.w / 2 - 1, px - rec.x)), rec.top + 0.05, rec.roof === 'flat' ? rec.d / 2 - 1.5 : 0); S.firstDrop = w; }
    });
    // lane poles
    const lp = [-37, -12.5, 12.5, 37].map((x, i) => utilityPole(S, x, -93.0, 0, { h: 8.2, drum: i === 2, lamp: i === 1 }));
    for (let i = 0; i < 3; i++) { wire(S, lp[i].out, lp[i + 1].out, { tag: 'lane' }); wire(S, lp[i].in, lp[i + 1].in, { tag: 'lane' }); wire(S, lp[i].comm, lp[i + 1].comm, { tag: 'laneComm', r: 0.04, sag: 0.9 }); }
    lp.forEach((pole, i) => {
      const px = [-37, -12.5, 12.5, 37][i];
      const rf = find(front, px), a1 = attachPoint(S, rf, px + 1.5, -1);
      wire(S, pole.dropIn, a1.p, { tag: 'laneDrop', sag: 0.35, pieces: 4 });
      const rb = find(back, px);
      if (Math.abs(rb.x - px) < rb.w / 2 - 0.5) wire(S, pole.drop, bracket(S, px - 0.6, Math.min(rb.h - 1, 9.6), LANE_Z0, 1), { tag: 'laneDrop', sag: 0.1, pieces: 3 });
    });
    S.lanePoles[s] = lp;
    b.pop();
  }
}
