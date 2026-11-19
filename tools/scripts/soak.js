const V=g.camera.position.constructor; let nan=0, stuck=0, lastP=P.pos.clone(), maxY=0; const kinds={};
const starts=[[5,1,5],[0,14,0],[-22,10,-51.6],[60,0.5,0],[-70,12,-70],[80,3,80]];
for(let s=0;s<starts.length;s++){ P.teleport(new V(...starts[s])); g.rig.snap(P);
  for(let i=0;i<28;i++){ const a=Math.random()*6.28; F.x=Math.cos(a); F.y=Math.sin(a)*0.5+0.5; F.hold=Math.random()<0.5; if(Math.random()<0.3) F.jump=true; g.rig.yaw+=Math.random()-0.5; await wait(260);
    if(!isFinite(P.pos.x+P.pos.y+P.pos.z)||!isFinite(g.camera.position.x)) nan++; if(P.pos.distanceTo(lastP)<0.05) stuck++; lastP.copy(P.pos); maxY=Math.max(maxY,P.pos.y); const k=P.prim?(P.prim.kind||P.prim.type):'air'; kinds[k]=(kinds[k]||0)+1; if(P.pos.y<-2) nan+=100; }
  await shot(); }
return {nan, stuck, maxY, kinds, info:g.info(), acorns:g.stats.acorns};
