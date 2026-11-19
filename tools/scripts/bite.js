const D=g.dogs(); const d=D.list[1]; const V=g.camera.position.constructor; const log=[];
P.teleport(new V(d.position.x+4,d.position.y+0.6,d.position.z)); g.rig.snap(P); face(d.position.x,d.position.z);
for(let i=0;i<16;i++){ await wait(500); log.push(d.state+' '+d.position.distanceTo(P.pos).toFixed(1)+' hp'+g.info().health+' '+P.mode); if(i==3||i==7||i==12) await shot(); }
// now pounce: go above it
P.teleport(new V(d.position.x,d.position.y+4,d.position.z)); await wait(1200); log.push('after pounce: '+d.state+' dogHealth '+d.health+' '+st());
return log;
