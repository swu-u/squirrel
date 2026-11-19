// One building: facades with recessed windows, roofs (flat with parapet and roof props, or
// pitched with dormers), balconies, fire escapes, awnings, drainpipes. All in the building's
// local frame: origin on the ground at the centre of the footprint, +z is the street front.
import * as THREE from 'three';
import { C, mulC, varyC, mixC } from './builder.js';
import { ATLAS } from './textures.js';

export const BRICK = [0x9c4a36, 0xb5654a, 0x7d3f33, 0xc9a27e, 0x8a5a44, 0xa8553a, 0x70727a, 0xb98a62];
export const STUCCO = [0xe8dcc0, 0xf0e6d6, 0xd9b06a, 0xd99a7c, 0xa9b89a, 0xa8c0cc, 0xd6a84a, 0xc98a8a, 0xe2d2b0, 0xb8c8b0];
export const PAINT = [0x3f6f8f, 0x9a4040, 0x4f7f5f, 0xe0b040, 0x5a4a7a, 0xd97a4a, 0x2f5a5a, 0xe8d8c0, 0x7aa0b0, 0xc86a6a];
const TRIM = [0xf2ede4, 0xf2ede4, 0xe8dcc8, 0xf2ede4, 0x33353a, 0xe8dcc8];
const ROOFC = [0xb5553a, 0x56626e, 0x8a4a36, 0x9a5a40, 0x666b72];
const AWN = [0xb8352a, 0x2f5f8f, 0x2f6a4a, 0xe0a830, 0x7a2f4a, 0x3a3c40];
const IRON = C(0x25272a);
const G0 = 3.3, GS = 3.8, FU = 2.95, TOPB = 0.45;
export const heightFor = (floors, shop) => (shop ? GS : G0) + (floors - 1) * FU + TOPB;

export function makeStyle(S, kind, rng, fixed = {}) {
  const M = S.mats;
  const style = fixed.style || (kind === 'terrace' ? (rng() < 0.55 ? 'brick' : 'painted') : rng() < 0.55 ? 'brick' : 'stucco');
  const pal = style === 'brick' ? BRICK : style === 'stucco' ? STUCCO : PAINT;
  const hex = fixed.hex ?? pal[(rng() * pal.length) | 0];
  const tint = style === 'brick' ? mulC(C(hex), 1.28) : mulC(C(hex), 1.1);
  const trimHex = TRIM[(rng() * TRIM.length) | 0];
  const st = {
    style, mat: style === 'brick' ? M.brick : M.stucco, tint: varyC(tint, rng, 0.05), hex,
    trim: C(trimHex), lintel: style === 'brick' ? C(0xd8cfbe) : mulC(C(hex), 0.82), stone: C(0xcfc6b4),
    sills: rng() < 0.75, band: rng() < 0.6, shutters: style !== 'brick' && rng() < 0.4, shutterC: C(PAINT[(rng() * 7) | 0], 0.8),
    roofC: mulC(C(ROOFC[(rng() * ROOFC.length) | 0]), 1.3), deck: varyC(C(rng() < 0.5 ? 0x8a8478 : 0x6f7074, 1.25), rng, 0.08),
    door: (rng() * 3) | 0, awn: C(AWN[(rng() * AWN.length) | 0]), ww: 1.05 + rng() * 0.3, wh: 1.55 + rng() * 0.25,
    flowers: rng() < 0.3,
  };
  return st;
}

function winRect(rng, litP = 0.17) { const lit = rng() < litP; const a = lit ? ATLAS.winLit : ATLAS.winDark; return ATLAS.win[a[(rng() * a.length) | 0]]; }

// ---------------------------------------------------------------- facade panel (frame: x right, y up, z out of the wall)
function opening(S, o, st) {
  const b = S.b, M = S.mats, d = o.depth ?? 0.1, tr = o.trim || st.trim;
  b.fq(M.atlas, o.x0, o.y0, o.x1, o.y1, -d, o.col || [1, 1, 1], 1, 1, o.rect);
  b.quad(M.plain, [o.x0, o.y0, 0], [o.x0, o.y0, -d], [o.x0, o.y1, -d], [o.x0, o.y1, 0], null, tr, 0.85, 0.7);
  b.quad(M.plain, [o.x1, o.y0, -d], [o.x1, o.y0, 0], [o.x1, o.y1, 0], [o.x1, o.y1, -d], null, tr, 0.85, 0.7);
  b.quad(M.plain, [o.x0, o.y1, 0], [o.x0, o.y1, -d], [o.x1, o.y1, -d], [o.x1, o.y1, 0], null, tr, 0.55, 0.55);
  if (!(o.kind === 'win' && st.sills && !o.noSill)) b.quad(M.plain, [o.x0, o.y0, 0], [o.x1, o.y0, 0], [o.x1, o.y0, -d], [o.x0, o.y0, -d], null, tr, 0.95, 0.8);
  const cx = (o.x0 + o.x1) / 2, w = o.x1 - o.x0, h = o.y1 - o.y0;
  if (o.kind === 'win') {
    if (st.sills && !o.noSill) {
      b.box(M.plain, cx, o.y0 - 0.045, 0.1, w + 0.26, 0.09, 0.4, { c: st.stone, ao: [0.75, 1], skip: 'nz' });
      b.cbox(cx, o.y0 - 0.045, 0.14, w + 0.26, 0.09, 0.32, 'ledge');
      if (o.flowers) {
        b.box(M.plain, cx, o.y0 + 0.1, 0.2, w * 0.86, 0.2, 0.2, { c: C(0x6a4630), ao: [0.7, 1], skip: 'nz ny' });
        b.blob(M.plain, cx, o.y0 + 0.24, 0.2, w * 0.42, 0.1, 0.12, C(0x4f7a34), { seg: 6, rings: 2, top: C(0x7a9a3a) });
        const fc = [[1, 0.45, 0.4], [1, 0.85, 0.3], [0.95, 0.95, 0.95], [0.9, 0.5, 0.9]][(cx * 7.3 + o.y0) % 4 | 0];
        for (let i = 0; i < 5; i++) { const wp = b.toWorld(cx + (i - 2) * w * 0.17, o.y0 + 0.2, 0.2 + (i % 2) * 0.05); S.flowers.push([wp.x, wp.y, wp.z, 0.55, fc[0], fc[1], fc[2]]); }
      }
    }
    if (st.style === 'brick') b.fq(M.plain, o.x0 - 0.15, o.y1, o.x1 + 0.15, o.y1 + 0.22, 0.012, st.lintel, 0.9, 1);
    else { b.box(M.plain, cx, o.y1 + 0.07, 0.03, w + 0.28, 0.14, 0.08, { c: st.trim, skip: 'nz px nx' }); for (const sx of [o.x0 - 0.06, o.x1 + 0.06]) b.fq(M.plain, sx - 0.06, o.y0, sx + 0.06, o.y1, 0.014, st.trim); }
    if (st.shutters && !o.noShutter) for (const sg of [-1, 1]) b.box(M.plain, cx + sg * (w / 2 + 0.36), o.y0 + h / 2, 0.035, 0.44, h, 0.05, { c: st.shutterC, ao: [0.8, 1], skip: 'nz py ny' + (sg > 0 ? ' nx' : ' px') });
  }
}

/** floors: [{ y0, y1, ops: [{x0,x1,y0,y1,rect,kind,depth}] }] */
function facade(S, W, H, floors, st) {
  const b = S.b, mat = st.mat, tint = st.tint;
  const aoAt = (y) => (y < 0.9 ? 0.58 + 0.42 * (y / 0.9) : y > H - 0.5 ? 1 - 0.22 * ((y - (H - 0.5)) / 0.5) : 1);
  for (const fl of floors) {
    const ops = fl.ops.slice().sort((a, c) => a.x0 - c.x0);
    const ys = [fl.y0, fl.y1];
    for (const o of ops) { if (o.y0 > fl.y0) ys.push(o.y0); if (o.y1 < fl.y1) ys.push(o.y1); }
    if (fl.y0 < 0.9 && fl.y1 > 0.9) ys.push(0.9);
    if (fl.y0 < H - 0.5 && fl.y1 > H - 0.5) ys.push(H - 0.5);
    ys.sort((a, c) => a - c);
    for (let j = 0; j < ys.length - 1; j++) {
      const y0 = ys[j], y1 = ys[j + 1]; if (y1 - y0 < 1e-4) continue;
      const ym = (y0 + y1) / 2; let x = 0;
      for (const o of ops) if (ym > o.y0 && ym < o.y1) { if (o.x0 > x + 1e-4) b.fq(mat, x, y0, o.x0, y1, 0, tint, aoAt(y0), aoAt(y1)); x = o.x1; }
      if (x < W - 1e-4) b.fq(mat, x, y0, W, y1, 0, tint, aoAt(y0), aoAt(y1));
    }
    for (const o of ops) opening(S, o, st);
  }
}

function floorList(o) {
  const g = o.shop ? GS : G0, fl = [{ y0: 0, y1: g, ops: [] }];
  for (let k = 1; k < o.floors; k++) fl.push({ y0: g + (k - 1) * FU, y1: k === o.floors - 1 ? o.h : g + k * FU, ops: [] });
  if (o.floors === 1) fl[0].y1 = o.h;
  return fl;
}

// ---------------------------------------------------------------- extras
function balcony(S, cx, y, w, st, iron) {
  const b = S.b, M = S.mats, dep = 1.0;
  b.sbox(M.plain, cx, y - 0.07, dep / 2, w, 0.14, dep, 'ledge', { c: st.stone, ao: [0.7, 1] });
  if (iron) {
    const rail = (a, c) => { b.scyl(M.plain, [a[0], y + 1.0, a[1]], [c[0], y + 1.0, c[1]], 0.028, 0.028, 5, IRON, 'rail', 0); b.cyl(M.plain, [a[0], y + 0.12, a[1]], [c[0], y + 0.12, c[1]], 0.018, 0.018, 4, IRON, 0);
      const n = Math.max(2, Math.round(Math.hypot(c[0] - a[0], c[1] - a[1]) / 0.2)), sk = Math.abs(c[0] - a[0]) > 0.1 ? 'py ny px nx' : 'py ny pz nz'; for (let i = 0; i <= n; i++) { const t = i / n; b.box(M.plain, a[0] + (c[0] - a[0]) * t, y + 0.56, a[1] + (c[1] - a[1]) * t, 0.024, 0.9, 0.024, { c: IRON, skip: sk }); } };
    rail([cx - w / 2 + 0.03, dep - 0.03], [cx + w / 2 - 0.03, dep - 0.03]); rail([cx - w / 2 + 0.03, 0], [cx - w / 2 + 0.03, dep - 0.03]); rail([cx + w / 2 - 0.03, 0], [cx + w / 2 - 0.03, dep - 0.03]);
  } else {
    const pc = mulC(st.tint, st.style === 'brick' ? 0.7 : 0.95);
    b.sbox(M.stucco, cx, y + 0.45, dep - 0.04, w, 0.9, 0.08, 'rail', { c: pc, ao: [0.8, 1] }, { noCamera: true });
    for (const sg of [-1, 1]) b.sbox(M.stucco, cx + sg * (w / 2 - 0.04), y + 0.45, dep / 2 - 0.04, 0.08, 0.9, dep - 0.08, 'rail', { c: pc, ao: [0.8, 1] }, { noCamera: true });
    b.box(M.plain, cx, y + 0.93, dep - 0.04, w + 0.06, 0.06, 0.14, { c: st.trim });
  }
  if (S.rng() < 0.5) { b.box(M.plain, cx - w * 0.25, y + 0.17, dep - 0.3, 0.34, 0.34, 0.34, { c: C(0xa8553a), ao: [0.7, 1] }); b.blob(M.plain, cx - w * 0.25, y + 0.55, dep - 0.3, 0.26, 0.3, 0.26, C(0x4f7a34), { seg: 7, rings: 4, noise: 0.15, seed: cx * 7, top: C(0x8fb04a) }); }
  if (S.rng() < 0.4) S.run('special', [b.toWorld(cx + w * 0.2, y + 0.25, dep * 0.5)], 'balcony');
}

/** Fire escape on a facade (facade frame). floorsY: landing heights. */
function fireEscape(S, cx, floorsY, topY, flatTop = true) {
  const b = S.b, M = S.mats, W = 2.7, D = 0.95, col = IRON, pts = [];
  floorsY.forEach((y, i) => {
    b.sbox(M.plain, cx, y - 0.03, D / 2 + 0.02, W, 0.06, D, 'prop', { c: col }, { noCamera: true, tag: 'escape' });
    b.scyl(M.plain, [cx - W / 2, y + 1.0, D], [cx + W / 2, y + 1.0, D], 0.027, 0.027, 4, col, 'rail', 0);
    b.cyl(M.plain, [cx - W / 2, y + 0.5, D], [cx + W / 2, y + 0.5, D], 0.018, 0.018, 3, col, 0);
    for (const sg of [-1, 1]) { b.scyl(M.plain, [cx + sg * W / 2, y + 1.0, 0.04], [cx + sg * W / 2, y + 1.0, D], 0.027, 0.027, 4, col, 'rail', 0); b.cyl(M.plain, [cx + sg * W / 2, y + 0.5, 0.04], [cx + sg * W / 2, y + 0.5, D], 0.018, 0.018, 3, col, 0); }
    for (let k = 0; k <= 4; k++) b.box(M.plain, cx - W / 2 + (k * W) / 4, y + 0.5, D, 0.03, 1.0, 0.03, { c: col, skip: 'py ny px nx' });
    for (const sg of [-1, 1]) { b.box(M.plain, cx + sg * (W / 2 - 0.1), y - 0.3, D / 2, 0.04, 0.04, D * 1.1, { c: col, rot: [0.55, 0, 0], skip: 'pz nz' }); }
    pts.push(b.toWorld(cx + (i % 2 ? 0.6 : -0.6), y + 0.25, D * 0.55));
    if (i < floorsY.length - 1) {
      // stair to the next landing
      const y2 = floorsY[i + 1], dir = i % 2 ? -1 : 1, x0 = cx - dir * 0.95, x1 = cx + dir * 0.95;
      for (const z of [0.34, 0.8]) b.scyl(M.plain, [x0, y, z], [x1, y2, z], 0.03, 0.03, 4, col, 'rail', 0, { tag: 'escape' });
      const n = Math.round((y2 - y) / 0.26);
      for (let k = 1; k < n; k++) { const t = k / n; b.box(M.plain, x0 + (x1 - x0) * t, y + (y2 - y) * t, 0.57, 0.24, 0.03, 0.46, { c: col, skip: 'px nx pz nz' }); }
    }
  });
  // drop ladder below the first landing, and ladder to the roof
  const y0 = floorsY[0], yl = Math.max(2.3, y0 - 2.6);
  for (const sx of [-0.22, 0.22]) { b.scyl(M.plain, [cx + 0.9 + sx, yl, D - 0.1], [cx + 0.9 + sx, y0 + 1.0, D - 0.1], 0.022, 0.022, 4, col, 'rail', 0, { tag: 'escape' }); }
  for (let y = yl + 0.15; y < y0; y += 0.3) b.box(M.plain, cx + 0.9, y, D - 0.1, 0.44, 0.025, 0.025, { c: col, skip: 'px nx py ny' });
  const yt = floorsY[floorsY.length - 1];
  for (const sx of [-0.22, 0.22]) b.scyl(M.plain, [cx - 0.9 + sx, yt, 0.16], [cx - 0.9 + sx, topY + 0.9, 0.16], 0.022, 0.022, 4, col, 'rail', 0, { tag: 'escape' });
  for (let y = yt + 0.3; y < topY + 0.8; y += 0.3) b.box(M.plain, cx - 0.9, y, 0.16, 0.44, 0.025, 0.025, { c: col, skip: 'px nx py ny' });
  if (flatTop) pts.push(b.toWorld(cx - 0.9, topY + 0.25, -0.15));
  S.run('roof', pts, 'escape');
}

function drainpipe(S, x, H) {
  const b = S.b, M = S.mats, col = C(0x3a3c3e);
  b.scyl(M.plain, [x, 0.05, 0.1], [x, H - 0.15, 0.1], 0.055, 0.055, 6, col, 'pipe', 0);
  for (let y = 1.2; y < H - 0.3; y += 2.4) b.box(M.plain, x, y, 0.07, 0.16, 0.05, 0.12, { c: mulC(col, 0.8), skip: 'nz py ny' });
  b.cyl(M.plain, [x, 0.05, 0.1], [x, 0.0, 0.3], 0.055, 0.06, 6, col, 0);
}

// ---------------------------------------------------------------- roofs
function roofProps(S, o, st, rng, y) {
  const b = S.b, M = S.mats, { w, d } = o, cell = 2.5;
  const nx = Math.max(1, Math.floor((w - 1.6) / cell)), nz = Math.max(1, Math.floor((d - 1.6) / cell));
  const used = new Set(), free = () => { for (let t = 0; t < 12; t++) { const i = (rng() * nx) | 0, j = (rng() * nz) | 0, k = i * 50 + j; if (!used.has(k)) { used.add(k); return [(i + 0.5 - nx / 2) * cell, (j + 0.5 - nz / 2) * cell, i, j]; } } return null; };
  const grey = C(0xc4c6c2), tops = [];
  const count = Math.min(nx * nz, 2 + ((rng() * 4) | 0) + (w * d > 120 ? 2 : 0));
  let hasTank = false, hasHut = false;
  for (let n = 0; n < count; n++) {
    const p = free(); if (!p) break;
    const [x, z] = p, t = rng();
    if (t < 0.2) { // chimney stack
      const ch = 1.3 + rng() * 1.1, cw = 0.9 + rng() * 0.5;
      b.sbox(M.brick, x, y + ch / 2, z, cw, ch, 0.7, 'building', { c: mulC(C(BRICK[(rng() * 3) | 0]), 1.3), ao: [0.65, 1] }, { tag: 'chimney' });
      b.sbox(M.plain, x, y + ch + 0.05, z, cw + 0.14, 0.1, 0.84, 'building', { c: st.stone });
      for (let k = 0; k < 2; k++) b.cyl(M.plain, [x - cw / 4 + k * cw / 2, y + ch + 0.1, z], [x - cw / 4 + k * cw / 2, y + ch + 0.45, z], 0.13, 0.1, 8, C(0xb5654a), 2);
      tops.push([x, y + ch + 0.1 + 0.25, z, 'chimney']);
    } else if (t < 0.34 && !hasTank && w > 8 && d > 8) { // water tank on stilts
      hasTank = true; const R = 0.95, leg = 1.3 + rng() * 0.5, th = 1.8, wd = C(0x9a6a44, 1.15);
      for (const [sx, sz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) b.scyl(M.plain, [x + sx * 0.72, y, z + sz * 0.72], [x + sx * 0.6, y + leg, z + sz * 0.6], 0.05, 0.05, 5, IRON, 'pole', 0);
      for (const [a, c] of [[[1, 1], [1, -1]], [[-1, 1], [-1, -1]], [[1, 1], [-1, 1]], [[1, -1], [-1, -1]]]) b.cyl(M.plain, [x + a[0] * 0.72, y + 0.1, z + a[1] * 0.72], [x + c[0] * 0.6, y + leg - 0.05, z + c[1] * 0.6], 0.02, 0.02, 4, IRON, 0);
      b.sbox(M.plain, x, y + leg + 0.05, z, 1.75, 0.1, 1.75, 'prop', { c: IRON });
      b.cyl(M.wood, [x, y + leg + 0.1, z], [x, y + leg + 0.1 + th, z], R, R, 14, wd, 0, 0.75, 1);
      for (const hy of [0.25, 0.9, 1.55]) b.cyl(M.metal, [x, y + leg + 0.1 + hy, z], [x, y + leg + 0.16 + hy, z], R + 0.012, R + 0.012, 14, C(0x55585c), 0);
      b.cyl(M.metal, [x, y + leg + 0.1 + th, z], [x, y + leg + 0.1 + th + 0.55, z], R + 0.1, 0.05, 14, C(0x7a7f84), 1);
      b.ccyl(x, z, y + leg + 0.1, y + leg + 0.1 + th, R, 'prop', { tag: 'tank' });
      b.ccap([x, y + leg + th + 0.12, z], [x, y + leg + th + 0.6, z], R * 0.8, 0.06, 'prop', { tag: 'tank' });
      tops.push([x, y + leg + 0.1 + th + 0.55 + 0.3, z, 'tank']);
    } else if (t < 0.52) { // air conditioner
      const yaw = ((rng() * 4) | 0) * Math.PI / 2;
      b.sbox(M.plain, x, y + 0.42, z, 1.05, 0.7, 0.72, 'prop', { c: grey, ao: [0.7, 1], yaw });
      b.box(M.plain, x, y + 0.04, z, 0.9, 0.08, 0.6, { c: IRON, yaw });
      const fx = Math.sin(yaw) * 0.365, fz = Math.cos(yaw) * 0.365, cxx = Math.cos(yaw) * 0.3, czz = -Math.sin(yaw) * 0.3;
      b.quad(M.atlas, [x + fx - cxx, y + 0.12, z + fz - czz], [x + fx + cxx, y + 0.12, z + fz + czz], [x + fx + cxx, y + 0.72, z + fz + czz], [x + fx - cxx, y + 0.72, z + fz - czz], ATLAS.fan);
    } else if (t < 0.64 && !hasHut && o.floors >= 3 && w > 7.5) { // stair bulkhead
      hasHut = true;
      b.sbox(st.mat, x, y + 1.25, z, 2.3, 2.5, 2.3, 'building', { c: st.tint, ao: [0.65, 1] }, { tag: 'hut' });
      b.sbox(M.plain, x, y + 2.56, z, 2.6, 0.12, 2.6, 'building', { c: st.stone });
      b.quad(M.atlas, [x - 0.5, y + 0.02, z + 1.155], [x + 0.5, y + 0.02, z + 1.155], [x + 0.5, y + 2.1, z + 1.155], [x - 0.5, y + 2.1, z + 1.155], ATLAS.door[3]);
      tops.push([x, y + 2.62 + 0.25, z, 'hut']);
    } else if (t < 0.74) { // skylight
      b.sbox(M.plain, x, y + 0.2, z, 1.7, 0.4, 1.2, 'prop', { c: C(0xd8d2c4), ao: [0.7, 1] });
      b.hq(M.glow, x - 0.72, z - 0.47, x + 0.72, z + 0.47, y + 0.405, [0.75, 0.6, 0.4]);
      b.box(M.plain, x, y + 0.41, z, 0.05, 0.03, 1.0, { c: C(0xd8d2c4) });
    } else if (t < 0.88) { // planters and a deck
      b.hq(M.wood, x - 1.1, z - 1.1, x + 1.1, z + 1.1, y + 0.03, C(0xb89468), 1.2);
      for (const [px, pz, sx, sz] of [[-0.95, 0, 0.5, 2.1], [0.2, -0.95, 1.6, 0.5]]) {
        b.sbox(M.wood, x + px, y + 0.27, z + pz, sx, 0.54, sz, 'prop', { c: C(0x8a6844), ao: [0.65, 1], tile: 1.1 });
        const n = 3; for (let k = 0; k < n; k++) { const tt = (k + 0.5) / n - 0.5; const gcol = [C(0x4f7a34), C(0x7a9a3a), C(0xb5482a)][(rng() * 3) | 0]; b.blob(M.plain, x + px + (sx > sz ? tt * sx : 0), y + 0.72, z + pz + (sx > sz ? 0 : tt * sz), 0.3, 0.3 + rng() * 0.2, 0.3, gcol, { seg: 7, rings: 4, noise: 0.18, seed: n * 7 + k, top: mulC(gcol, 1.4) }); }
      }
      b.sbox(M.plain, x + 0.4, y + 0.42, z + 0.4, 0.6, 0.05, 0.6, 'prop', { c: C(0xe8e2d0) }); for (const [lx, lz] of [[0.16, 0.16], [0.64, 0.16], [0.16, 0.64], [0.64, 0.64]]) b.box(M.plain, x + lx, y + 0.2, z + lz, 0.03, 0.4, 0.03, { c: IRON, skip: 'py ny' });
      tops.push([x + 0.4, y + 0.445 + 0.25, z + 0.4, 'garden']);
    } else { // aerial mast
      const mh = 2.2 + rng() * 1.4;
      b.scyl(M.plain, [x, y, z], [x, y + mh, z], 0.03, 0.022, 5, C(0x8a8f94), 'pole', 2);
      for (let k = 0; k < 4; k++) b.cyl(M.plain, [x - 0.45 + k * 0.05, y + mh - 0.25 - k * 0.22, z], [x + 0.45 - k * 0.05, y + mh - 0.25 - k * 0.22, z], 0.012, 0.012, 4, C(0x8a8f94), 0);
      b.cyl(M.plain, [x, y + mh - 0.3, z], [x + 0.5, y + 0.02, z + 0.3], 0.008, 0.008, 3, IRON, 0);
    }
  }
  // satellite dish on the parapet
  if (rng() < 0.45) { const x = (rng() - 0.5) * (w - 2), z = -d / 2 + 0.35; b.cyl(M.plain, [x, y + o.ph, z], [x, y + o.ph + 0.5, z], 0.025, 0.025, 4, IRON, 0); b.cyl(M.plain, [x, y + o.ph + 0.5, z + 0.02], [x, y + o.ph + 0.62, z + 0.2], 0.38, 0.12, 12, C(0xe2e0da), 1); b.cyl(M.plain, [x, y + o.ph + 0.5, z + 0.02], [x, y + o.ph + 0.62, z + 0.2], 0.38, 0.12, 12, C(0xb0aea8), 0); }
  return tops;
}

function flatRoof(S, o, st, rng) {
  const b = S.b, M = S.mats, { w, d, h } = o, ph = o.ph, t = 0.26;
  b.hq(M.roofing, -w / 2, -d / 2, w / 2, d / 2, h, st.deck);
  // darker felt strips along the parapets and a couple of repair patches
  const dk = mulC(st.deck, 0.72);
  b.hq(M.roofing, -w / 2 + t, d / 2 - t - 0.5, w / 2 - t, d / 2 - t, h + 0.006, dk); b.hq(M.roofing, -w / 2 + t, -d / 2 + t, w / 2 - t, -d / 2 + t + 0.5, h + 0.006, dk);
  for (let k = 0; k < 2; k++) { const px = (rng() - 0.5) * (w - 4), pz = (rng() - 0.5) * (d - 4), sw = 1 + rng() * 2, sd = 0.8 + rng() * 1.6; b.hq(M.roofing, px - sw / 2, pz - sd / 2, px + sw / 2, pz + sd / 2, h + 0.008, mulC(st.deck, 0.8 + rng() * 0.35)); }
  const wallC = mulC(st.tint, 0.96), cope = st.stone;
  const par = (x, z, sx, sz) => { b.sbox(st.mat, x, h + ph / 2, z, sx, ph, sz, 'building', { c: wallC, ao: [0.8, 1], skip: 'ny' }, { tag: 'parapet' }); b.box(M.plain, x, h + ph + 0.035, z, sx + 0.08, 0.07, sz + 0.08, { c: cope, skip: 'ny' }); };
  par(0, d / 2 - t / 2, w, t); par(0, -d / 2 + t / 2, w, t); par(-w / 2 + t / 2, 0, t, d - 2 * t); par(w / 2 - t / 2, 0, t, d - 2 * t);
  // cornice below the parapet, front and back
  for (const sg of [1, -1]) {
    b.box(M.plain, 0, h - 0.13, sg * (d / 2 + 0.13), w + (o.expL ? 0.2 : 0) + (o.expR ? 0.2 : 0), 0.26, 0.3, { c: cope, ao: [0.7, 1] });
    b.box(M.plain, 0, h - 0.33, sg * (d / 2 + 0.07), w, 0.14, 0.16, { c: mulC(cope, 0.92), ao: [0.7, 1] });
    b.cbox(0, h - 0.13, sg * (d / 2 + 0.13), w, 0.26, 0.3, 'ledge');
  }
  const tops = roofProps(S, o, st, rng, h);
  // acorn runs: along the front parapet, plus prop tops
  const n = Math.min(5, Math.max(3, Math.round(w / 2.6)));
  S.run('roof', Array.from({ length: n }, (_, i) => b.toWorld((i - (n - 1) / 2) * 2.0, h + ph + 0.07 + 0.25, d / 2 - t / 2)), 'parapet');
  for (const tp of tops) { const wp = b.toWorld(tp[0], tp[1], tp[2]); S.run('roof', [wp], tp[3]); S.roofTops.push({ pos: wp, kind: tp[3], side: o.sideName, row: o.row }); }
}

function pitchRoof(S, o, st, rng) {
  const b = S.b, M = S.mats, { w, d, h } = o, pitch = o.pitch, over = 0.22;
  const tan = Math.tan(pitch), cos = Math.cos(pitch), sin = Math.sin(pitch);
  const rise = (d / 2) * tan, ridge = h + rise, L = (d / 2 + over) / cos, T = (d / 2) * sin;
  const xo = (o.expL ? over : 0), xo2 = (o.expR ? over : 0), cx = (xo2 - xo) / 2, W = w + xo + xo2;
  for (const sg of [1, -1]) {
    // top surface runs from the ridge (z=0) to the eave tip (z = sg*(d/2+over))
    const mz = sg * (d / 2 + over) / 2, my = ridge - ((d / 2 + over) / 2) * tan;
    const rot = [sg * pitch, 0, 0];
    // visual: thin slab; collision: thick slab that also closes the gable ends
    b.box(M.tiles, cx, my - 0.06 * cos, mz - sg * 0.06 * sin, W, 0.12, L, { c: st.roofC, rot, tile: 2.0 });
    const nx = 0, ny = cos, nz = sg * sin;
    b.cbox(cx, my - ny * T / 2, mz - nz * T / 2, W, T, L, 'roof', { rot }, { side: o.sideName, row: o.row });
    // gutter
    b.box(M.plain, cx, h - over * tan - 0.02, sg * (d / 2 + over + 0.05), W, 0.1, 0.12, { c: C(0x3a3c3e) });
  }
  b.box(M.plain, cx, ridge + 0.06, 0, W, 0.12, 0.26, { c: mulC(st.roofC, 0.8) });
  // gable ends
  const wallC = st.tint, tl = st.mat.userData.tile || 1;
  for (const sg of [-1, 1]) {
    const x = sg * w / 2, zb = sg * d / 2;
    b.tri(st.mat, [x, h, zb], [x, h, -zb], [x, ridge, 0], [(zb + d / 2) / tl, h / tl], [(-zb + d / 2) / tl, h / tl], [d / 2 / tl, ridge / tl], wallC, 1, 1, 0.85);
  }
  // chimney on the party wall, dormer on the front slope
  const tops = [];
  const chx = w / 2 - 0.5, chz = -0.6, chBase = ridge - 0.6 * tan - 0.3, chTop = ridge + 1.0;
  b.sbox(M.brick, chx, (chBase + chTop) / 2, chz, 0.8, chTop - chBase, 1.0, 'building', { c: mulC(C(BRICK[(rng() * 3) | 0]), 1.3), ao: [0.8, 1] }, { tag: 'chimney' });
  b.sbox(M.plain, chx, chTop + 0.05, chz, 0.94, 0.1, 1.14, 'building', { c: st.stone });
  for (let k = 0; k < 2; k++) b.cyl(M.plain, [chx, chTop + 0.1, chz - 0.25 + k * 0.5], [chx, chTop + 0.45, chz - 0.25 + k * 0.5], 0.13, 0.1, 8, C(0xb5654a), 2);
  tops.push([chx, chTop + 0.1 + 0.25, chz, 'chimney']);
  if (o.dormer) {
    const dw = 1.5, dz = d / 2 - 1.5, yb = h + (d / 2 - dz) * tan, dh = 1.1, front = dz + 0.85;
    const yBase = h + (d / 2 - front) * tan, cy = (yBase + yb + dh) / 2, hh = yb + dh - yBase;
    const dx = o.dormerX || 0;
    b.sbox(st.mat, dx, cy, dz + 0.05, dw, hh, 1.7, 'building', { c: st.tint, skip: 'ny', ao: [0.85, 1] }, { tag: 'dormer' });
    b.sbox(M.plain, dx, yb + dh + 0.05, dz + 0.1, dw + 0.3, 0.1, 2.0, 'building', { c: mulC(st.roofC, 0.75) });
    b.fq(M.atlas, dx - 0.5, yBase + 0.42, dx + 0.5, yb + dh - 0.12, front + 0.062, [1, 1, 1], 1, 1, winRect(rng, 0.5));
    b.box(M.plain, dx, yBase + 0.37, front + 0.08, 1.2, 0.08, 0.1, { c: st.trim });
    tops.push([dx, yb + dh + 0.1 + 0.25, dz + 0.3, 'dormer']);
  }
  const n = Math.min(6, Math.max(3, Math.round(w / 1.7)));
  S.run('roof', Array.from({ length: n }, (_, i) => b.toWorld(-w / 2 + 0.8 + (i * (w - 2.4)) / (n - 1), ridge + 0.12 + 0.25, 0)), 'ridge');
  for (const tp of tops) { const wp = b.toWorld(tp[0], tp[1], tp[2]); if (tp[3] === 'chimney') S.roofTops.push({ pos: wp, kind: tp[3], side: o.sideName, row: o.row }); if (rng() < 0.5) S.run('roof', [wp], tp[3]); }
  o.ridge = ridge;
}

// ---------------------------------------------------------------- the building
/**
 * o: { x, z, yaw, w, d, floors, kind: 'terrace'|'apt'|'shop', roof: 'flat'|'pitch', st (style), expL, expR, hL, hR,
 *      sideName, row, sign, backDetail, fire, noBack }
 */
export function building(S, o, rng) {
  const b = S.b, M = S.mats, st = o.st;
  const shop = o.kind === 'shop';
  o.shop = shop; o.h = o.h || heightFor(o.floors, shop);
  const { w, d, h } = o;
  o.ph = o.roof === 'flat' ? (o.ph || 0.55 + rng() * 0.45) : 0;
  o.pitch = o.pitch || 0.66;
  b.push(o.x, 0, o.z, o.yaw || 0);
  b.setChunk('q' + S.quadOf(b.wx(0, 0), b.wz(0, 0)));
  b.uvOx = (rng() * 20) | 0; b.uvOy = 0;
  b.cbox(0, h / 2, 0, w, h, d, 'building', null, { side: o.sideName, row: o.row, flat: o.roof === 'flat', tag: 'body' });
  const fl = floorList(o), g = fl[0].y1;

  // ---------- front
  const nb = Math.max(2, Math.round(w / 3.0)), bw = w / nb, ww = Math.min(st.ww, bw - 0.9), wh = st.wh;
  const doorBay = o.kind === 'terrace' ? (o.mirror ? nb - 1 : 0) : shop ? nb - 1 : (nb / 2) | 0;
  const front = floorList(o);
  const balconies = [];
  if (shop) {
    const dcx = (doorBay + 0.5) * bw;
    front[0].ops.push({ x0: dcx - 0.55, x1: dcx + 0.55, y0: 0.12, y1: 2.7, rect: ATLAS.door[3], kind: 'door', depth: 0.22, trim: C(0x2a2622) });
    const x0 = 0.45, x1 = doorBay * bw - 0.1, np = Math.max(1, Math.round((x1 - x0) / 2.5)), pw = (x1 - x0 - (np - 1) * 0.16) / np;
    const si = (rng() * 2) | 0;
    for (let i = 0; i < np; i++) front[0].ops.push({ x0: x0 + i * (pw + 0.16), x1: x0 + i * (pw + 0.16) + pw, y0: 0.6, y1: 2.78, rect: ATLAS.shop[si], kind: 'shop', depth: 0.16, trim: C(0x2a2622) });
  } else {
    const dcx = (doorBay + 0.5) * bw;
    front[0].ops.push({ x0: dcx - 0.55, x1: dcx + 0.55, y0: 0.32, y1: 2.72, rect: ATLAS.door[st.door], kind: 'door', depth: 0.2 });
    for (let i = 0; i < nb; i++) if (i !== doorBay) { const cx = (i + 0.5) * bw; front[0].ops.push({ x0: cx - ww / 2, x1: cx + ww / 2, y0: 1.05, y1: 1.05 + wh, rect: winRect(rng), kind: 'win', flowers: st.flowers && rng() < 0.5 }); }
  }
  const balc = o.kind === 'apt' && rng() < 0.6, balcIron = rng() < 0.5;
  for (let k = 1; k < o.floors; k++) for (let i = 0; i < nb; i++) {
    const cx = (i + 0.5) * bw, y = front[k].y0;
    const isB = balc && (nb < 3 || (i > 0 && i < nb - 1) || nb === 3 && i === 1) && (k + i) % 2 === (nb % 2 ? 1 : 0);
    if (isB) { front[k].ops.push({ x0: cx - ww / 2, x1: cx + ww / 2, y0: y + 0.12, y1: y + 0.95 + wh, rect: winRect(rng, 0.25), kind: 'win', noSill: true, noShutter: true }); balconies.push([cx, y + 0.12, Math.min(bw - 0.4, ww + 1.0)]); }
    else front[k].ops.push({ x0: cx - ww / 2, x1: cx + ww / 2, y0: y + 0.95, y1: y + 0.95 + wh, rect: winRect(rng), kind: 'win', flowers: st.flowers && rng() < 0.35 });
  }
  b.push(-w / 2, 0, d / 2, 0);
  facade(S, w, h, front, st);
  // string courses hide the floor seams
  if (st.band || shop) for (let k = 1; k < o.floors; k++) { b.box(M.plain, w / 2, front[k].y0, 0.035, w, 0.14, 0.09, { c: st.stone, ao: [0.8, 1] }); }
  // plinth
  b.box(st.style === 'brick' ? M.stone : M.plain, w / 2, 0.25, 0.03, w, 0.5, 0.08, { c: st.style === 'brick' ? C(0x9a9184, 1.2) : mulC(st.tint, 0.72), ao: [0.6, 0.95] });
  for (const bc of balconies) balcony(S, bc[0], bc[1], bc[2], st, balcIron);
  const dcx = (doorBay + 0.5) * bw;
  if (shop) {
    const x0 = 0.3, x1 = w - 0.3;
    // stall riser, fascia sign, awning
    b.box(M.plain, (0.45 + doorBay * bw - 0.1) / 2, 0.32, 0.03, doorBay * bw - 0.55, 0.56, 0.08, { c: mulC(st.awn, 0.55), ao: [0.6, 1] });
    b.box(M.plain, w / 2, 3.32, 0.07, x1 - x0, 0.62, 0.14, { c: mulC(st.awn, 0.5), ao: [0.85, 1] });
    const si = o.sign ?? ((rng() * 8) | 0), sw = Math.min(x1 - x0 - 0.3, 5.2);
    b.fq(M.atlas, w / 2 - sw / 2, 3.06, w / 2 + sw / 2, 3.06 + sw / 8, 0.142, [1, 1, 1], 1, 1, ATLAS.sign[si]);
    for (const px of [0.2, w - 0.2]) b.box(M.plain, px, 1.7, 0.05, 0.3, 3.4, 0.1, { c: mulC(st.awn, 0.5), ao: [0.6, 1] });
    if (o.awning !== false) {
      const ax1 = doorBay * bw + 0.1, aw = ax1 - 0.2, dep = 1.55, ang = 0.33, ay = 2.98;
      const o2 = { c: st.awn, rot: [ang, 0, 0], tile: 0.56 };
      const cy = ay - Math.sin(ang) * dep / 2, cz = 0.1 + Math.cos(ang) * dep / 2;
      b.box(M.cloth, 0.2 + aw / 2, cy, cz, aw, 0.05, dep, o2); b.cbox(0.2 + aw / 2, cy, cz, aw, 0.05, dep, 'awning', o2);
      const ey = ay - Math.sin(ang) * dep, ez = 0.1 + Math.cos(ang) * dep;
      b.fq(M.cloth, 0.2, ey - 0.24, 0.2 + aw, ey, ez, st.awn, 0.9, 1);
      for (const px of [0.25, 0.15 + aw]) b.cyl(M.plain, [px, ay - 0.75, 0.05], [px, ey + 0.03, ez - 0.05], 0.015, 0.015, 4, IRON, 0);
      S.run('special', [0.25, 0.5, 0.75].map((t) => b.toWorld(0.2 + aw * t, cy + 0.3, cz)), 'awning');
      S.awnings.push(b.toWorld(0.2 + aw / 2, cy + 0.3, cz));
    }
  } else {
    // steps and a little door hood
    b.sbox(M.stone, dcx, 0.08, 0.42, 1.7, 0.16, 0.84, 'prop', { c: C(0xb3a48c, 1.2), ao: [0.7, 1] });
    b.sbox(M.stone, dcx, 0.24, 0.24, 1.5, 0.16, 0.46, 'prop', { c: C(0xb3a48c, 1.2) });
    if (st.style !== 'brick' || rng() < 0.5) { b.sbox(M.plain, dcx, 2.98, 0.3, 1.7, 0.1, 0.62, 'ledge', { c: st.trim }); for (const sg of [-1, 1]) { b.box(M.plain, dcx + sg * 0.74, 2.78, 0.1, 0.08, 0.3, 0.2, { c: st.trim, skip: 'nz' }); b.box(M.plain, dcx + sg * 0.74, 2.86, 0.32, 0.08, 0.14, 0.26, { c: st.trim, skip: 'nz' }); } }
    else b.box(M.plain, dcx, 2.86, 0.04, 1.5, 0.24, 0.08, { c: st.lintel });
    if (o.kind === 'terrace' && rng() < 0.6) { const px = dcx + (o.mirror ? -1 : 1) * 1.25; b.box(M.plain, px, 0.2, 0.42, 0.36, 0.4, 0.36, { c: C(0xa8553a), ao: [0.7, 1] }); b.blob(M.plain, px, 0.62, 0.42, 0.26, 0.32, 0.26, C(0x4f7a34), { seg: 7, rings: 4, noise: 0.14, seed: px * 3, top: C(0x8fb04a) }); }
  }
  if (rng() < 0.7) drainpipe(S, rng() < 0.5 ? 0.14 : w - 0.14, h);
  b.pop();

  // ---------- back
  if (!o.noBack) {
    const back = floorList(o), nbb = Math.max(2, Math.round(w / 3.4)), bbw = w / nbb, bdoor = (rng() * nbb) | 0;
    const fe = o.fire && o.floors >= 3 ? ((rng() * (nbb - 1)) | 0) : -9;
    for (let k = 0; k < o.floors; k++) for (let i = 0; i < nbb; i++) {
      const cx = (i + 0.5) * bbw, y = back[k].y0;
      if (k === 0 && i === bdoor) back[0].ops.push({ x0: cx - 0.5, x1: cx + 0.5, y0: 0.1, y1: 2.5, rect: ATLAS.door[(rng() * 3) | 0], kind: 'door', depth: 0.15 });
      else if (rng() < 0.86) back[k].ops.push({ x0: cx - 0.5, x1: cx + 0.5, y0: y + 1.0, y1: y + 2.45, rect: winRect(rng, 0.2), kind: 'win', noShutter: true });
    }
    b.push(w / 2, 0, -d / 2, Math.PI);
    facade(S, w, h, back, { ...st, flowers: false });
    if (fe >= 0) fireEscape(S, (fe + 1) * bbw, back.slice(1).map((f) => f.y0 + 0.8), h + o.ph, o.roof === 'flat');
    drainpipe(S, rng() < 0.5 ? 0.16 : w - 0.16, h);
    b.pop();
  }
  // ---------- sides
  const sideFace = (left) => {
    const exp = left ? o.expL : o.expR, hn = left ? o.hL : o.hR;
    b.push(left ? -w / 2 : w / 2, 0, left ? -d / 2 : d / 2, left ? -Math.PI / 2 : Math.PI / 2);
    if (exp) {
      const side = floorList(o), det = left ? o.detL : o.detR;
      const cols = det ? Math.max(2, Math.round(d / 3.2)) : 2;
      for (let k = 0; k < o.floors; k++) for (let i = 0; i < cols; i++) {
        if (!det && rng() < 0.4) continue;
        const cx = ((i + 0.5) * d) / cols, y = side[k].y0;
        if (k === 0 && shop && det) { side[0].ops.push({ x0: cx - 1.0, x1: cx + 1.0, y0: 0.6, y1: 2.78, rect: ATLAS.shop[1], kind: 'shop', depth: 0.16, trim: C(0x2a2622) }); continue; }
        side[k].ops.push({ x0: cx - 0.5, x1: cx + 0.5, y0: y + 1.0, y1: y + 2.5, rect: winRect(rng), kind: 'win', noShutter: !det });
      }
      facade(S, d, h, side, st);
      if (o.fireSide === (left ? 'L' : 'R') && o.floors >= 3) fireEscape(S, d / 2, side.slice(1).map((f) => f.y0 + 0.8), h + o.ph, o.roof === 'flat');
      if (rng() < 0.3) { const px = d * (0.3 + rng() * 0.4); b.fq(M.atlas, px - 0.5, 1.2, px + 0.5, 2.2, 0.012, [0.9, 0.9, 0.9], 1, 1, ATLAS.poster); }
    } else if (h > hn + 0.3) {
      const y0 = Math.max(0, hn - 0.3);
      b.fq(st.mat, 0, y0, d, h, 0, mulC(st.tint, 0.92), 0.8, 1);
    }
    b.pop();
  };
  sideFace(true); sideFace(false);

  // ---------- roof
  if (o.roof === 'flat') flatRoof(S, o, st, rng); else pitchRoof(S, o, st, rng);
  b.uvOx = 0;
  // record (frame-local coordinates of the parent are kept by the caller)
  const rec = { ...o, wx: b.wx(0, 0), wz: b.wz(0, 0), top: o.roof === 'flat' ? h : o.ridge, wyaw: b.yaw };
  rec.toWorld = ((fx, fz, yaw, cs, sn) => (x, y, z) => new THREE.Vector3(fx + x * cs + z * sn, y, fz - x * sn + z * cs))(b.fx, b.fz, b.yaw, b.cs, b.sn);
  b.pop();
  S.buildings.push(rec);
  return rec;
}
