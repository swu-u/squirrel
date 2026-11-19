const L=g.layout.landmarks; P.teleport(L.firstPole.clone().add({x:0,y:0.6,z:0})); await wait(600);
const out=[]; g.world.queryPrims(P.pos.x,P.pos.z,1.5,(c)=>{ if(c.maxY<P.pos.y-1.5) return; out.push([c.type,c.kind,c.type==='capsule'?[c.ax,c.ay,c.az,c.bx,c.by,c.bz].map(v=>+v.toFixed(1)).join(','):[c.cx,c.cy,c.cz,c.hx,c.hy,c.hz].map(v=>+v.toFixed(2)).join(','), c===P.prim?'CUR':'']); });
face(L.firstRoof.x, L.firstRoof.z); F.y=1; await wait(300);
return {pos:P.pos.toArray(), primT:P.primT, wishT:P.wishT.toArray(), out};
