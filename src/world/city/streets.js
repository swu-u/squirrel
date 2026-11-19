// Streets: road paint, parked cars, street lamps, street trees, utility poles and the wire network.
import * as THREE from 'three';
import { mulberry32 } from '../../core/rng.js';
import { C, mulC, varyC } from './builder.js';
import { G, SIDE_YAW, SIDE_NAME } from './ground.js';
import { ATLAS } from './textures.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const WIRE_COL = C(0x18191b);

/** Sagging wire between two world points: straight capsule pieces, visual == collision. */
export function wire(S, A, B, o = {}) {
  const b = S.b, n = o.pieces || 5, len = A.distanceTo(B), sag = o.sag ?? 0.028 * len, r = o.r || 0.03;
  const pts = [];
  for (let i = 0; i <= n; i++) { const t = i / n, p = new THREE.Vector3().lerpVectors(A, B, t); p.y -= sag * 4 * t * (1 - t); pts.push(p); }
  b.pushAbs();
  const col = o.col || WIRE_COL;
  for (let i = 0; i < n; i++) {
    const p = pts[i], q = pts[i + 1];
    b.cyl(S.mats.plain, [p.x, p.y, p.z], [q.x, q.y, q.z], r * 1.15, r * 1.15, 3, col, 0);
    S.world.addCapsule(p, q, r, r, { kind: o.kind || 'wire', tag: o.tag || 'wire' });
  }
  const at = (t) => { const f = Math.min(n - 1e-6, Math.max(0, t * n)), i = Math.floor(f); return new THREE.Vector3().lerpVectors(pts[i], pts[i + 1], f - i); };
  if (o.bulbs) for (let i = 1; i <= o.bulbs; i++) { const p = at(i / (o.bulbs + 1)); b.blob(S.mats.glow, p.x, p.y - 0.09, p.z, 0.055, 0.07, 0.055, [1, 0.85, 0.55], { seg: 6, rings: 4, bottomAo: 1 }); }
  if (o.clothes) {
    const r2 = mulberry32(o.clothes), cols = [0xf1ebde, 0xc8452f, 0x3a6f9f, 0xe8b030, 0x6f9a6a, 0xd98aa0, 0xf1ebde, 0x7a5a8a, 0xe8e2d0];
    const dir = new THREE.Vector3().subVectors(B, A).setY(0).normalize();
    let t = 0.14 + r2() * 0.05;
    while (t < 0.86) {
      const w = 0.45 + r2() * 0.5, h = 0.5 + r2() * 0.7, p = at(t), q = at(Math.min(1, t + w / len)), c = C(cols[(r2() * cols.length) | 0]);
      const sw = (r2() - 0.5) * 0.12, nx = -dir.z * sw, nz = dir.x * sw;
      b.quad(S.mats.cards, [p.x + nx, p.y - h, p.z + nz], [q.x + nx, q.y - h, q.z + nz], [q.x, q.y - 0.02, q.z], [p.x, p.y - 0.02, p.z], null, c, 0.8, 1);
      if (h > 0.85 && w > 0.6) { // sleeves
        for (const [pp, sg] of [[p, -1], [q, 1]]) b.quad(S.mats.cards, [pp.x + dir.x * sg * 0.26, pp.y - 0.42, pp.z + dir.z * sg * 0.26], [pp.x, pp.y - 0.5, pp.z], [pp.x, pp.y - 0.04, pp.z], [pp.x + dir.x * sg * 0.22, pp.y - 0.16, pp.z + dir.z * sg * 0.22], null, c, 0.85, 1);
      }
      t += w / len + 0.03 + r2() * 0.1;
    }
  }
  b.pop();
  const w = { a: A.clone(), b: B.clone(), pts, len, tag: o.tag || 'wire', at, r };
  S.wires.push(w);
  return w;
}

/** Wooden utility pole in the current frame; the line runs along local x. Returns attachment points (world). */
export function utilityPole(S, x, z, yaw, o = {}) {
  const b = S.b, M = S.mats, h = o.h || 9.2, wood = C(0x6a4a34, 1.2), dark = C(0x2c2e30), cer = C(0xd8d2c4);
  b.push(x, 0, z, yaw);
  b.cyl(M.wood, [0, 0, 0], [0, h, 0], 0.17, 0.115, 9, wood, 2, 0.55, 1);
  b.ccap([0, 0, 0], [0, h - 0.1, 0], 0.17, 0.115, 'pole', { tag: 'utility' });
  const ay = h - 0.65;
  b.sbox(M.wood, 0, ay, 0, 0.12, 0.13, 2.1, 'pole', { c: mulC(wood, 0.9), tile: 0.9 }, { tag: 'crossarm' });
  for (const sg of [-1, 1]) {
    b.box(M.plain, 0.02, ay - 0.32, sg * 0.42, 0.03, 0.05, 0.95, { c: dark, rot: [sg * 0.72, 0, 0] });
    b.cyl(M.plain, [0, ay + 0.06, sg * 0.85], [0, ay + 0.22, sg * 0.85], 0.045, 0.035, 6, cer, 2);
    b.cyl(M.plain, [0, ay + 0.06, sg * 0.42], [0, ay + 0.2, sg * 0.42], 0.04, 0.03, 6, cer, 2);
  }
  b.cyl(M.plain, [0, h, 0], [0, h + 0.2, 0], 0.045, 0.035, 6, cer, 2);
  // climbing pegs
  for (let i = 0; i < 10; i++) { const y = 2.6 + i * 0.55, sg = i % 2 ? 1 : -1; b.cyl(M.plain, [sg * 0.1, y, 0], [sg * 0.3, y + 0.02, 0], 0.014, 0.014, 3, dark, 0); }
  if (o.drum) {
    b.cyl(M.plain, [0.46, h - 2.6, 0], [0.46, h - 1.65, 0], 0.3, 0.3, 12, C(0x8a9094), 3, 0.7, 1);
    b.cyl(M.plain, [0.46, h - 1.65, 0], [0.46, h - 1.58, 0], 0.31, 0.2, 12, C(0x7a8084), 2);
    b.box(M.plain, 0.2, h - 2.1, 0, 0.3, 0.08, 0.1, { c: dark });
    for (const sz of [-0.12, 0.12]) b.cyl(M.plain, [0.46, h - 1.58, sz], [0.46, h - 1.38, sz], 0.04, 0.025, 5, cer, 2);
    b.ccap([0.46, h - 2.3, 0], [0.46, h - 1.9, 0], 0.3, 0.3, 'prop', { tag: 'drum' });
  }
  if (o.lamp) {
    b.cyl(M.plain, [0, h - 2.2, -0.1], [0, h - 1.75, -1.7], 0.035, 0.03, 6, dark, 0);
    b.ccap([0, h - 2.2, -0.1], [0, h - 1.75, -1.7], 0.035, 0.03, 'rail');
    b.box(M.plain, 0, h - 1.74, -1.95, 0.22, 0.1, 0.6, { c: dark }); b.box(M.glow, 0, h - 1.8, -1.95, 0.16, 0.04, 0.46, { c: [1, 0.88, 0.62] });
    b.cbox(0, h - 1.75, -1.95, 0.22, 0.12, 0.6, 'prop');
  }
  const rec = {
    base: b.toWorld(0, 0, 0), top: b.toWorld(0, h + 0.2, 0), h,
    out: b.toWorld(0, ay + 0.24, -0.85), in: b.toWorld(0, ay + 0.24, 0.85), pin: b.toWorld(0, h + 0.22, 0),
    comm: b.toWorld(0, h - 2.5, 0.16), drop: b.toWorld(0, h - 1.4, -0.14), dropIn: b.toWorld(0, h - 1.4, 0.14),
  };
  b.pop();
  S.poles.push(rec);
  return rec;
}

function car(S, x, z, yaw, col, van, r) {
  const b = S.b, M = S.mats, glass = C(0x18222c), dark = C(0x17181a), chrome = C(0xc9ccd0);
  b.push(x, G.ROAD_Y, z, yaw);
  const W = van ? 1.95 : 1.76, hw = W / 2;
  // side profile, clockwise from the rear bottom: [x, y, half width, surface] (surface: 0 paint, 1 glass)
  const P = van
    ? [[-2.45, 0.4, hw, 0], [-2.45, 1.98, hw - 0.06, 0], [-2.3, 2.1, hw - 0.1, 0], [0.95, 2.1, hw - 0.1, 1], [1.6, 1.32, hw - 0.02, 0], [2.3, 1.2, hw - 0.02, 0], [2.46, 0.98, hw - 0.05, 0], [2.48, 0.4, hw - 0.03, 0]]
    : [[-2.14, 0.4, hw - 0.03, 0], [-2.16, 0.8, hw - 0.03, 0], [-2.04, 0.99, hw - 0.04, 0], [-1.42, 1.03, hw - 0.02, 1], [-0.92, 1.43, hw - 0.2, 0], [0.22, 1.45, hw - 0.2, 1], [0.86, 1.03, hw - 0.02, 0], [1.72, 0.96, hw - 0.03, 0], [2.1, 0.82, hw - 0.06, 0], [2.15, 0.4, hw - 0.04, 0]];
  const n = P.length;
  // smooth normals along the profile except at sharp corners
  const sn = []; for (let i = 0; i < n - 1; i++) { const dx = P[i + 1][0] - P[i][0], dy = P[i + 1][1] - P[i][1], l = Math.hypot(dx, dy); sn.push([-dy / l, dx / l, 0]); }
  const vn = (i, k) => { const a = sn[i], c = sn[k]; if (!c || a[0] * c[0] + a[1] * c[1] < 0.45) return a; const x = a[0] + c[0], y = a[1] + c[1], l = Math.hypot(x, y); return [x / l, y / l, 0]; };
  for (let i = 0; i < n - 1; i++) {
    const p = P[i], q = P[i + 1], c = p[3] ? glass : col, n0 = vn(i, i - 1), n1 = vn(i, i + 1);
    b.quad(M.gloss, [p[0], p[1], -p[2]], [p[0], p[1], p[2]], [q[0], q[1], q[2]], [q[0], q[1], -q[2]], null, c, 1, 1, [n0, n0, n1, n1]);
  }
  // sides: body below the belt line as a fan, glasshouse as a quad
  const belt = van ? [0, 1, 2, 3, 4, 5, 6, 7] : [0, 1, 2, 3, 6, 7, 8, 9];
  for (const sg of [1, -1]) {
    const cx = 0, cy = 0.4;
    for (let k = 0; k < belt.length - 1; k++) {
      const p = P[belt[k]], q = P[belt[k + 1]];
      const A = [cx, cy, sg * hw], Bp = [p[0], p[1], sg * p[2]], Cp = [q[0], q[1], sg * q[2]];
      if (sg > 0) b.tri(M.gloss, A, Cp, Bp, [0, 0], [0, 0], [0, 0], col, 0.6, 1, 1, [0, 0.08, 1]); else b.tri(M.gloss, A, Bp, Cp, [0, 0], [0, 0], [0, 0], col, 0.6, 1, 1, [0, 0.08, -1]);
    }
    if (!van) {
      const a = P[3], c = P[4], d = P[5], e = P[6], o = 0.004;
      const q4 = sg > 0 ? [[a[0] + 0.1, a[1] + 0.03, a[2] + o], [e[0] - 0.12, e[1] + 0.03, e[2] + o], [d[0] - 0.04, d[1] - 0.06, d[2] + o], [c[0] + 0.06, c[1] - 0.06, c[2] + o]] : [[e[0] - 0.12, e[1] + 0.03, -e[2] - o], [a[0] + 0.1, a[1] + 0.03, -a[2] - o], [c[0] + 0.06, c[1] - 0.06, -c[2] - o], [d[0] - 0.04, d[1] - 0.06, -d[2] - o]];
      // painted frame behind the glass
      const f4 = sg > 0 ? [[a[0], a[1], a[2]], [e[0], e[1], e[2]], [d[0], d[1], d[2]], [c[0], c[1], c[2]]] : [[e[0], e[1], -e[2]], [a[0], a[1], -a[2]], [c[0], c[1], -c[2]], [d[0], d[1], -d[2]]];
      b.quad(M.gloss, f4[0], f4[1], f4[2], f4[3], null, col);
      b.quad(M.gloss, q4[0], q4[1], q4[2], q4[3], null, glass);
      // centre pillar
      const mx = -0.28; b.box(M.gloss, mx, 1.23, sg * (hw - 0.1), 0.07, 0.42, 0.03, { c: col, rot: [sg * 0.33, 0, 0] });
      b.box(M.gloss, 0.78, 1.08, sg * (hw + 0.07), 0.1, 0.09, 0.16, { c: col });
    } else {
      const o = 0.004, z0 = sg * (hw - 0.02 + o), z1 = sg * (hw - 0.1 + o);
      const pts = [[0.7, 1.36, z0], [1.5, 1.36, z0], [1.0, 1.98, z1], [0.7, 1.98, z1]];
      if (sg > 0) b.quad(M.gloss, pts[0], pts[1], pts[2], pts[3], null, glass); else b.quad(M.gloss, pts[1], pts[0], pts[3], pts[2], null, glass);
      b.box(M.gloss, 1.52, 1.4, sg * (hw + 0.08), 0.1, 0.16, 0.14, { c: dark });
    }
    // door seams and sill
    b.box(M.plain, van ? -0.4 : -0.3, 0.72, sg * (hw + 0.002), 0.02, 0.56, 0.01, { c: mulC(col, 0.45), skip: 'py ny px nx' });
    b.box(M.plain, 0, 0.43, sg * (hw - 0.02), van ? 4.3 : 3.6, 0.1, 0.06, { c: dark });
  }
  // wheels with dark arches
  const wx = van ? [-1.5, 1.5] : [-1.3, 1.32];
  for (const sx of wx) for (const sz of [-1, 1]) {
    b.cyl(M.plain, [sx, 0.33, sz * (hw - 0.22)], [sx, 0.33, sz * (hw + 0.02)], 0.33, 0.33, 12, C(0x222325), 2);
    b.cyl(M.metal, [sx, 0.33, sz * (hw + 0.022)], [sx, 0.33, sz * (hw + 0.04)], 0.2, 0.17, 10, chrome, 2);
  }
  b.box(M.plain, 0, 0.36, 0, van ? 4.6 : 4.0, 0.2, W - 0.3, { c: dark, skip: 'py' });
  // bumpers, lights, plates
  const xf = P[n - 1][0], xr = P[0][0];
  b.box(M.plain, xf - 0.02, 0.5, 0, 0.14, 0.16, W - 0.04, { c: dark }); b.box(M.plain, xr + 0.02, 0.5, 0, 0.14, 0.16, W - 0.04, { c: dark });
  const ly = van ? 0.86 : 0.74;
  for (const sz of [-1, 1]) { b.box(M.glow, xf - (van ? 0.015 : 0.03), ly, sz * (hw - 0.32), 0.04, 0.13, 0.32, { c: [1, 0.95, 0.8] }); b.box(M.plain, xr - 0.0, van ? 1.2 : 0.74, sz * (hw - 0.26), 0.04, van ? 0.4 : 0.12, van ? 0.12 : 0.34, { c: C(0xb02a22) }); }
  b.box(M.plain, xf + 0.055, 0.5, 0, 0.02, 0.11, 0.46, { c: C(0xe8e2c8) }); b.box(M.plain, xr - 0.055, 0.5, 0, 0.02, 0.11, 0.46, { c: C(0xe8c838) });
  if (!van) b.box(M.plain, xf - 0.03, 0.72, 0, 0.03, 0.1, 0.7, { c: dark });
  // collision
  if (van) { b.cbox(-0.67, 1.05, 0, 3.56, 2.1, W, 'car'); b.cbox(1.78, 0.63, 0, 1.36, 1.26, W, 'car'); }
  else { b.cbox(0, 0.5, 0, 4.3, 1.0, W, 'car'); b.cbox(-0.32, 1.22, 0, 1.75, 0.45, W - 0.36, 'car'); }
  if (r() < 0.6) S.run('special', [b.toWorld(van ? -0.6 : -0.35, (van ? 2.1 : 1.45) + 0.25, 0)], 'car');
  b.pop();
}

function streetLamp(S, x, z, yaw) {
  const b = S.b, M = S.mats, iron = C(0x2a2c2f), h = 6.4;
  b.push(x, 0, z, yaw);
  b.cyl(M.plain, [0, 0, 0], [0, 0.9, 0], 0.13, 0.09, 8, iron, 0, 0.55, 1);
  b.cyl(M.plain, [0, 0.9, 0], [0, h, 0], 0.075, 0.055, 8, iron, 0);
  b.ccap([0, 0, 0], [0, h, 0], 0.09, 0.055, 'pole');
  // curved arm toward +z (the road)
  const arm = [[0, h, 0], [0, h + 0.5, 0.35], [0, h + 0.68, 1.0], [0, h + 0.6, 1.7]];
  for (let i = 0; i < 3; i++) { b.cyl(M.plain, arm[i], arm[i + 1], 0.045, 0.04, 6, iron, 0); b.ccap(arm[i], arm[i + 1], 0.045, 0.04, 'rail'); }
  b.cyl(M.plain, [0, h + 0.6, 1.7], [0, h + 0.36, 1.75], 0.05, 0.24, 10, iron, 1);
  b.cyl(M.glow, [0, h + 0.36, 1.75], [0, h + 0.2, 1.75], 0.22, 0.12, 10, [1, 0.88, 0.62], 2);
  b.cbox(0, h + 0.36, 1.75, 0.44, 0.34, 0.44, 'prop');
  S.run('special', [b.toWorld(0, h + 0.68 + 0.3, 1.0)], 'lamp');
  b.pop();
}

function decals(S) {
  const b = S.b, M = S.mats, white = [0.92, 0.92, 0.9], yel = C(0xe8c040), y = G.ROAD_Y + 0.012;
  const P = (x0, z0, x1, z1, c = white) => b.hq(M.paint, x0, z0, x1, z1, y, c);
  for (let s = 0; s < 4; s++) {
    b.push(0, 0, 0, SIDE_YAW[s]);
    const zeb = [-47, 0, 47];
    // centre dashes (skip zebra crossings)
    for (let x = -51; x < 51; x += 5) { if (zeb.some((q) => Math.abs(x + 1.25 - q) < 4.2)) continue; P(x, -58.07, x + 2.5, -57.93); }
    // parking bays on the block side
    P(-44, -61.0, 44, -60.9);
    for (let x = -44; x <= 44; x += 5.5) { if (Math.abs(x) < 4) continue; P(x - 0.05, -62.9, x + 0.05, -61.0); }
    // yellow line on the park side
    P(-52.5, -53.45, 52.5, -53.33, yel);
    // zebra crossings
    for (const q of zeb) { for (let k = 0; k < 10; k++) P(q - 1.6, -62.75 + k, q + 1.6, -62.25 + k); P(q - 3.2, -62.9, q - 3.0, -57.9); P(q + 3.0, -58.1, q + 3.2, -53.1); }
    // arms: centre dashes
    for (let x = 66; x < 116; x += 5) P(x, -58.07, x + 2.5, -57.93);
    for (let z = -116; z < -66; z += 5) P(57.93, z, 58.07, z + 2.5);
    // manholes
    b.quad(M.atlas, [-20.6, y, -56.4], [-19.4, y, -56.4], [-19.4, y, -57.6], [-20.6, y, -57.6], ATLAS.manhole, [0.8, 0.8, 0.8]);
    b.quad(M.atlas, [27.4, y, -59.4], [28.6, y, -59.4], [28.6, y, -60.6], [27.4, y, -60.6], ATLAS.manhole, [0.8, 0.8, 0.8]);
    b.pop();
  }
}

export function buildStreets(S) {
  const b = S.b, M = S.mats, r = mulberry32(8080);
  b.setChunk('base');
  decals(S);
  const carCols = [0xb8352a, 0x2f5f8f, 0xe8e2d6, 0x3a3c40, 0x5f8f6a, 0xe0a830, 0x8a8f94, 0x7a2f3a, 0x2f6f6a, 0xd97a3a];
  const ring = [];
  for (let s = 0; s < 4; s++) {
    b.push(0, 0, 0, SIDE_YAW[s]);
    b.setChunk('q' + S.quadOf(b.wx(0, -60), b.wz(0, -60)));
    // parked cars (bays are 5.5 m)
    for (let k = -8; k < 8; k++) {
      const x = k * 5.5 + 2.75;
      if (Math.abs(x) < 5 || Math.abs(x) > 42 || r() < 0.42) continue;
      const van = r() < 0.16;
      b.setChunk('q' + S.quadOf(b.wx(x, -62), b.wz(x, -62)));
      car(S, x + (r() - 0.5) * 0.5, -62.0 + (van ? 0.02 : 0), (r() < 0.5 ? 0 : Math.PI) + (r() - 0.5) * 0.04, varyC(C(carCols[(r() * carCols.length) | 0]), r, 0.06), van, r);
    }
    // street trees and lamps on the block side
    for (let k = 0; k < 8; k++) {
      const x = -45.5 + k * 13 + (r() - 0.5) * 1.2, w = b.toWorld(x, 0, -64.5);
      S.treeSpecs.push({ x: w.x, z: w.z, y: 0, type: 'street', seed: 5000 + s * 100 + k, scale: 0.85 + r() * 0.2, role: 'street' });
      b.setChunk('q' + S.quadOf(w.x, w.z));
      // tree pit with a low kerb
      b.hq(M.plain, x - 0.7, -65.2, x + 0.7, -63.8, 0.012, C(0x4a3828));
      for (const [ox, oz, sx, sz] of [[0, -0.74, 1.56, 0.09], [0, 0.74, 1.56, 0.09], [-0.74, 0, 0.09, 1.4], [0.74, 0, 0.09, 1.4]]) b.box(M.plain, x + ox, 0.04, -64.5 + oz, sx, 0.08, sz, { c: C(0x9a958c) });
    }
    for (const x of [-39, -13, 13, 39]) { b.setChunk('q' + S.quadOf(b.wx(x, -63.6), b.wz(x, -63.6))); streetLamp(S, x, -63.6, 0); }
    // pavement furniture
    for (const [x, kind] of [[-27, 'bin'], [24.5, 'bin'], [-3.6, 'bollard'], [3.6, 'bollard'], [30, 'hydrant'], [-34.5, 'postbox']]) {
      b.setChunk('q' + S.quadOf(b.wx(x, -63.7), b.wz(x, -63.7)));
      if (kind === 'bin') { b.cyl(M.plain, [x, 0, -63.9], [x, 0.9, -63.9], 0.26, 0.28, 10, C(0x26282b), 2, 0.55, 1); b.cyl(M.metal, [x, 0.6, -63.9], [x, 0.68, -63.9], 0.285, 0.29, 10, C(0xc9a24a), 0); b.cbox(x, 0.45, -63.9, 0.52, 0.9, 0.52, 'prop'); }
      if (kind === 'bollard') for (const z of [-63.5, -52.5]) { b.cyl(M.plain, [x, 0, z], [x, 0.85, z], 0.09, 0.075, 8, C(0x26282b), 0, 0.55, 1); b.blob(M.plain, x, 0.88, z, 0.1, 0.08, 0.1, C(0x26282b), { seg: 8, rings: 4 }); b.cyl(M.plain, [x, 0.6, z], [x, 0.68, z], 0.086, 0.084, 8, C(0xe8e2d0), 0); b.ccap([x, 0, z], [x, 0.85, z], 0.09, 0.09, 'pole'); }
      if (kind === 'hydrant') { b.cyl(M.gloss, [x, 0, -63.6], [x, 0.55, -63.6], 0.12, 0.1, 8, C(0xc8352a), 0, 0.55, 1); b.blob(M.gloss, x, 0.58, -63.6, 0.12, 0.1, 0.12, C(0xc8352a), { seg: 8, rings: 4 }); b.cyl(M.gloss, [x - 0.2, 0.36, -63.6], [x + 0.2, 0.36, -63.6], 0.05, 0.05, 6, C(0xc8352a), 3); b.ccap([x, 0, -63.6], [x, 0.55, -63.6], 0.13, 0.12, 'prop'); }
      if (kind === 'postbox') { b.cyl(M.gloss, [x, 0, -64.2], [x, 1.25, -64.2], 0.24, 0.24, 12, C(0xc0282a), 0, 0.55, 1); b.cyl(M.gloss, [x, 1.25, -64.2], [x, 1.42, -64.2], 0.27, 0.12, 12, C(0xc0282a), 2); b.box(M.plain, x, 1.0, -63.965, 0.22, 0.04, 0.02, { c: C(0x1a1a1a) }); b.cbox(x, 0.7, -64.2, 0.46, 1.4, 0.46, 'prop'); }
    }
    // utility poles on the park side pavement
    b.setChunk('base');
    const poles = [];
    for (let i = 0; i < 5; i++) poles.push(utilityPole(S, -44 + i * 22, -51.6, 0, { drum: i === 1 || i === 3, lamp: i % 2 === 0 }));
    ring.push(poles);
    // extension poles down the side street leaving this side's corner (line along local z)
    const ext = [utilityPole(S, 51.6, -75, -Math.PI / 2, { lamp: true, h: 8.8 }), utilityPole(S, 51.6, -99, -Math.PI / 2, { drum: true, h: 8.8 })];
    S.extPoles[s] = ext;
    b.pop();
  }
  // ---- wires
  const span = (A, B, tag, withComm = true, sagK = 0.03) => {
    const d = A.out.distanceTo(B.out);
    const w = wire(S, A.out, B.out, { tag, sag: d * sagK }); wire(S, A.in, B.in, { tag, sag: d * sagK });
    S.spans.push(w);
    wire(S, A.pin, B.pin, { tag, sag: d * sagK * 0.8, r: 0.025 });
    if (withComm) wire(S, A.comm, B.comm, { tag: tag + 'Comm', sag: d * sagK * 1.25, r: 0.04 });
    return w;
  };
  for (let s = 0; s < 4; s++) {
    const P = ring[s], N = ring[(s + 1) % 4];
    for (let i = 0; i < 4; i++) span(P[i], P[i + 1], 'ring');
    span(P[4], N[0], 'ring');
    // side street line: next side's first pole -> extension poles
    const e = S.extPoles[s];
    const long = wire(S, N[0].out, e[0].out, { tag: 'cross', sag: 1.0, pieces: 6 }); wire(S, N[0].in, e[0].in, { tag: 'cross', sag: 1.0, pieces: 6 });
    S.crossWires.push(long);
    if (s === 3) S.longWire = long;
    wire(S, e[0].out, e[1].out, { tag: 'side' }); wire(S, e[0].in, e[1].in, { tag: 'side' }); wire(S, e[0].comm, e[1].comm, { tag: 'sideComm', r: 0.04, sag: 0.9 });
  }
  S.ringPoles = ring;
}
