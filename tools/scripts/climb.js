// Hold up at the base of many trees: how high does the squirrel get, does it ever go down while up is held, does it stall?
const T = g.layout.trees; const out = [];
const res = [];
for (let k = 0; k < 14; k++) {
  const tr = T[(k * 5) % T.length]; const tp = tr.spec;
  const gx = tp.x, gz = tp.z, a = k * 2.1;
  const sx = gx + Math.sin(a) * 2.6, sz = gz + Math.cos(a) * 2.6;
  P.teleport(new P.pos.constructor(sx, g.world.groundHeight(sx, sz) + 0.3, sz), new P.pos.constructor(gx - sx, 0, gz - sz));
  face(gx, gz); g.rig.snap(P);
  F.x = 0; F.y = 1;
  let maxH = 0, down = 0, stall = 0, maxStall = 0, kinds = {};
  for (let i = 0; i < 70; i++) {
    await wait(100);
    const h = P.heightAboveGround; maxH = Math.max(maxH, h);
    if (P.mode === 'surface') { kinds[P.prim && P.prim.kind] = 1; if (P.normal.y < 0.5 && P.vel.y < -1.5) down++; if (P.speed < 0.1 && !P.atTip) { stall++; maxStall = Math.max(maxStall, stall); } else stall = 0; }
  }
  F.y = 0;
  res.push(`tree ${k}: max height ${maxH.toFixed(1)} m, going down while up held ${down}/70, longest stall ${maxStall}, ended ${st()} on ${Object.keys(kinds).join('/')}`);
  if (k === 2 || k === 7) await shot();
}
return res;
