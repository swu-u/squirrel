const D=g.dogs(); if(!D) return 'no dogs';
const d=D.list[0]; const V=g.camera.position.constructor;
P.teleport(new V(d.position.x+7,d.position.y+0.6,d.position.z)); g.rig.snap(P); face(d.position.x,d.position.z); await wait(1500); console.log(st(),'dog',d.kind,d.state,d.position.distanceTo(P.pos).toFixed(1)); await shot();
await wait(1500); console.log(st(),'dog',d.state,d.position.distanceTo(P.pos).toFixed(1),'hp',g.hud?1:0); await shot();
window.__atk=true; for(let i=0;i<8;i++){ g.input.attackPressed=true; await wait(450); } console.log('dog',d.state,d.health,d.alive,'dogs',g.stats.dogs); await shot();
await wait(1500); console.log('dog',d.state,d.health,d.alive,'dogs',g.stats.dogs); await shot();
return D.list.map(x=>x.kind+':'+x.state);
