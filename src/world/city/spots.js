// Pickup spots, dog zones and landmarks assembled from what the builders recorded.
import * as THREE from 'three';
import { mulberry32 } from '../../core/rng.js';
import { groundHeight as gh, SIDE_YAW } from './ground.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);

export function finishLayout(S, trees, nestPos) {
  const r = mulberry32(2468);
  const along = (w, n, t0 = 0.2, t1 = 0.8) => Array.from({ length: n }, (_, i) => { const p = w.at(t0 + ((t1 - t0) * i) / (n - 1)); p.y += w.r + 0.25; return p; });
  // ---- wire runs
  S.spans.forEach((w, i) => { if (i % 3 === 1) S.run('wire', along(w, 5), 'ring'); });
  S.ringPoles.forEach((ps, s) => ps.forEach((p, i) => { const w = p.dropWire; if (w && w.roof && (w === S.firstDrop || (i + s) % 2 === 0)) S.run('wire', along(w, 4, 0.25, 0.85), 'drop', w === S.firstDrop); }));
  S.crossWires.forEach((w, i) => { if (w !== S.longWire && i % 2 === 0) S.run('wire', along(w, 5, 0.25, 0.75), 'cross'); });
  S.wires.forEach((w, i) => { if (w.tag === 'lane' && i % 5 === 0) S.run('wire', along(w, 4), 'lane'); });
  S.washLines.forEach((w, i) => { if (i % 3 === 0) S.run('wire', along(w, 3, 0.3, 0.7), 'wash'); });
  S.poles.forEach((p, i) => { if (i % 4 === 0) S.run('special', [V(p.in.x, p.in.y + 0.3, p.in.z)], 'pole'); });

  // ---- choose acorns
  const quota = { ground: 46, wire: 46, roof: 64, special: 36 }, spots = [];
  for (const where of Object.keys(quota)) {
    const runs = S.runs.filter((q) => q.where === where);
    // deterministic shuffle, "must" runs first
    for (let i = runs.length - 1; i > 0; i--) { const j = (r() * (i + 1)) | 0; [runs[i], runs[j]] = [runs[j], runs[i]]; }
    runs.sort((a, c) => (c.must ? 1 : 0) - (a.must ? 1 : 0));
    let left = quota[where];
    const tagCount = {};
    for (const run of runs) {
      if (left <= 0) break;
      const cap = { path: 5, wall: 3, parapet: 9, ridge: 9, escape: 5, fence: 4, alley: 3, car: 6, lamp: 8, bench: 4, balcony: 5, awning: 4, chimney: 5, tank: 4, hut: 3, garden: 3, pole: 7, shed: 4 }[run.tag] ?? 99;
      tagCount[run.tag] = (tagCount[run.tag] || 0) + 1;
      if (tagCount[run.tag] > cap && !run.must) continue;
      if (run.pts.length > left) continue;
      for (const p of run.pts) spots.push({ pos: p.clone(), kind: 'acorn', where });
      left -= run.pts.length;
    }
  }

  // ---- golden acorns
  const golden = S.golden.slice();
  let tall = null;
  trees.forEach((t, i) => { if (i === 0 || t.spec.type === 'street' || t.spec.role === 'yard') return; if (!tall || t.top.y > tall.top.y) tall = t; });
  if (tall) golden.push({ pos: V(tall.top.x, tall.top.y + 0.3, tall.top.z), where: 'tree', name: 'Top of the tallest park tree' });
  const bull = S.dogYards[2];
  if (bull) golden.push({ pos: V(bull.corner.x, 0.3, bull.corner.z), where: 'special', name: "The bulldog's back yard" });
  if (S.longWire) { const p = S.longWire.at(0.5); p.y += 0.3; golden.push({ pos: p, where: 'wire', name: 'Middle of the long wire' }); }
  const pick = (side, kinds) => { let best = null; for (const k of kinds) { for (const t of S.roofTops) if (t.side === side && t.kind === k && (!best || t.pos.y > best.pos.y)) best = t; if (best) return best; } return best; };
  const gE = pick('E', ['garden', 'tank', 'hut', 'chimney']);
  if (gE) golden.push({ pos: gE.pos.clone().add(V(0, 0.1, 0)), where: 'roof', name: gE.kind === 'garden' ? 'Roof garden on the east side' : 'High rooftop on the east side' });
  const cS = pick('S', ['chimney', 'tank', 'hut']);
  if (cS) golden.push({ pos: cS.pos.clone().add(V(0, 0.1, 0)), where: 'roof', name: cS.kind === 'chimney' ? 'Tallest chimney on the south side' : 'High rooftop on the south side' });
  for (const g of golden) {
    // drop ordinary acorns that sit on top of a golden one
    for (let i = spots.length - 1; i >= 0; i--) if (spots[i].pos.distanceTo(g.pos) < 0.8) spots.splice(i, 1);
    spots.push({ pos: g.pos, kind: 'golden', where: g.where, name: g.name });
  }

  // ---- dog zones
  const zones = [
    { center: V(21, gh(21, -21), -21), radius: 8, kind: 'terrier', name: 'Picnic lawn' },
    { center: V(-33, gh(-33, 33), 33), radius: 10, kind: 'shepherd', name: 'Pond meadow' },
    { center: V(34, gh(34, -34), -34), radius: 9, kind: 'terrier', name: 'South-east lawn' },
  ];
  if (S.dogYards[2]) zones.push({ center: S.dogYards[2].center, radius: 6, kind: 'bulldog', name: "The bulldog's yard" });
  if (S.dogYards[0]) zones.push({ center: S.dogYards[0].center, radius: 6, kind: 'terrier', name: 'Back yard, south side' });
  if (S.dogYards[1]) zones.push({ center: S.dogYards[1].center, radius: 6, kind: 'shepherd', name: 'Back yard, east side' });
  { const c = Math.cos(SIDE_YAW[3]), sn = Math.sin(SIDE_YAW[3]), x = 8, z = -94.6; zones.push({ center: V(x * c + z * sn, 0, -x * sn + z * c), radius: 6, kind: 'shepherd', name: 'Back lane, west side' }); }
  for (const z of S.zonesRaw) zones.push(z);

  const lm = S.landmarks;
  lm.home = nestPos.clone();
  lm.spawn = V(5.6, gh(5.6, 5.6), 5.6);
  if (bull) lm.bulldogYard = bull.center.clone();
  return { pickupSpots: spots, dogZones: zones, landmarks: lm };
}
