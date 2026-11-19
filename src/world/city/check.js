// Reachability check for the wire network: can the squirrel get from park tree tops to the
// roofs on every side of the park using only trees, poles, wires, rails and roofs
// (no ground, no walls), with leaps of at most 6 m horizontally and 2.5 m upward?
const AIR = { trunk: 1, branch: 1, pole: 1, wire: 1, rail: 1, nest: 1 };
const TOPS = { building: 1, roof: 1, awning: 1 };

export function checkReachability(world, layout, o = {}) {
  const maxH = o.maxH || 6, maxUp = o.maxUp || 2.5, CELL = maxH;
  const nodes = [], grid = new Map();
  const add = (x, y, z, prim) => {
    const side = (prim.kind === 'roof' || (prim.kind === 'building' && prim.flat)) && prim.side && 'SENW'.includes(prim.side) ? prim.side : null;
    const n = { x, y, z, side, kind: prim.kind, tag: prim.tag, d: -1, from: -1 };
    const k = Math.floor(x / CELL) * 4096 + Math.floor(z / CELL);
    let c = grid.get(k); if (!c) grid.set(k, c = []);
    c.push(nodes.length); nodes.push(n);
  };
  for (const p of world.prims) {
    if (p.type === 'capsule') {
      if (!AIR[p.kind]) continue;
      const n = Math.max(1, Math.ceil(p.len / 1.0));
      for (let i = 0; i <= n; i++) { const t = i / n, r = p.ra + (p.rb - p.ra) * t; add(p.ax + p.dx * p.len * t, p.ay + p.dy * p.len * t + r * (1 - Math.abs(p.dy)), p.az + p.dz * p.len * t, p); }
    } else if (p.type === 'box') {
      if (!TOPS[p.kind] || p.maxY < 2.5) continue;
      const nx = Math.max(1, Math.ceil((p.hx * 2) / 2)), nz = Math.max(1, Math.ceil((p.hz * 2) / 2));
      for (let i = 0; i <= nx; i++) for (let j = 0; j <= nz; j++) {
        const lx = -p.hx + (i / nx) * p.hx * 2, lz = -p.hz + (j / nz) * p.hz * 2;
        add(p.cx + lx * p.xx + p.hy * p.yx + lz * p.zx, p.cy + lx * p.xy + p.hy * p.yy + lz * p.zy, p.cz + lx * p.xz + p.hy * p.yz + lz * p.zz, p);
      }
    }
  }
  const bfs = (sx, sy, sz) => {
    for (const n of nodes) { n.d = -1; n.from = -1; }
    // start from every node within 2 m of the start point
    let q = [];
    nodes.forEach((n, i) => { if (Math.hypot(n.x - sx, n.z - sz) < 2.5 && Math.abs(n.y - sy) < 3) { n.d = 0; q.push(i); } });
    const found = {};
    while (q.length) {
      const nq = [];
      for (const i of q) {
        const a = nodes[i];
        if (a.side && found[a.side] === undefined) found[a.side] = i;
        const cx = Math.floor(a.x / CELL), cz = Math.floor(a.z / CELL);
        for (let ix = cx - 1; ix <= cx + 1; ix++) for (let iz = cz - 1; iz <= cz + 1; iz++) {
          const c = grid.get(ix * 4096 + iz); if (!c) continue;
          for (const j of c) { const n = nodes[j]; if (n.d >= 0) continue; if (n.y - a.y > maxUp) continue; const dx = n.x - a.x, dz = n.z - a.z; if (dx * dx + dz * dz > maxH * maxH) continue; n.d = a.d + 1; n.from = i; nq.push(j); }
        }
      }
      q = nq;
    }
    const out = {};
    for (const s of 'SENW') {
      if (found[s] === undefined) { out[s] = null; continue; }
      const path = []; let i = found[s];
      while (i >= 0) { path.push(nodes[i].tag || nodes[i].kind); i = nodes[i].from; }
      // compress the path into a readable route
      const route = []; for (const k of path.reverse()) if (route[route.length - 1] !== k) route.push(k);
      out[s] = { hops: nodes[found[s]].d, route: route.join(' > ') };
    }
    return out;
  };
  const trees = layout.trees, res = [];
  const starts = o.starts || [0, 1, 4, 8, 12, 16, 20, 21, 22, 23, 24, 25, 26, 27];
  let ok = true; const sideOk = { S: 0, E: 0, N: 0, W: 0 };
  for (const i of starts) {
    const t = trees[i]; if (!t) continue;
    const r = bfs(t.top.x, t.top.y, t.top.z);
    for (const s of 'SENW') if (r[s]) sideOk[s]++;
    res.push({ tree: i, type: t.spec.type, role: t.spec.role, x: +t.spec.x.toFixed(1), z: +t.spec.z.toFixed(1), S: r.S && r.S.hops, E: r.E && r.E.hops, N: r.N && r.N.hops, W: r.W && r.W.hops, example: (r.S || r.E || r.N || r.W || {}).route });
  }
  for (const s of 'SENW') if (!sideOk[s]) ok = false;
  // closest approach of each link tree to the pole and wire network
  const net = nodes.filter((n) => n.kind === 'wire' || n.kind === 'pole'), gaps = [];
  trees.forEach((t, i) => {
    if (t.spec.role !== 'link') return;
    const mine = nodes.filter((n) => (n.kind === 'trunk' || n.kind === 'branch') && Math.hypot(n.x - t.spec.x, n.z - t.spec.z) < t.crownRadius + 1.5 && Math.hypot(n.x - t.spec.x, n.z - t.spec.z) < 9);
    let best = 1e9;
    for (const a of mine) for (const c of net) { if (Math.abs(c.x - a.x) > 8 || Math.abs(c.z - a.z) > 8) continue; const d = Math.hypot(a.x - c.x, a.y - c.y, a.z - c.z); if (d < best) best = d; }
    gaps.push({ tree: i, gap: +best.toFixed(2) });
  });
  return { ok, nodes: nodes.length, treesReachingRoofs: sideOk, starts: res, linkTreeGapToWires: gaps };
}
