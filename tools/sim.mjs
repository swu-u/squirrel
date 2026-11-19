import * as THREE from 'three';
import { World } from '../src/core/world.js';
import { Player } from '../src/player/controller.js';
const V = (x,y,z)=>new THREE.Vector3(x,y,z);
function mk(){
  const w = new World();
  w.addCapsule(V(0,-0.5,-6), V(0,8,-6), 0.5, 0.35, {kind:'trunk'});            // trunk at z=-6
  w.addCapsule(V(0,5,-6), V(5,5.6,-6), 0.2, 0.1, {kind:'branch'});             // branch going +x
  w.addCapsule(V(5,5.6,-6), V(8,5.9,-6.5), 0.1, 0.05, {kind:'branch'});
  w.addCapsule(V(11,5.5,-12), V(11,5.2,0), 0.03, 0.03, {kind:'wire'});          // wire 3 m beyond the tip
  w.addBox(V(-10,3,-6), V(3,3,3), 0, {kind:'building'});                        // building 6m tall
  w.addBox(V(-6.8,2,-6), V(0.2,0.05,1), 0, {kind:'ledge'});                    // ledge on its +x wall
  return w;
}
function run(name, script, start=V(0,0.2,0), yaw=0){
  const w = mk(); const p = new Player(w); p.teleport(start, V(0,0,-1));
  const log=[]; let t=0; const dt=1/60; let camYaw=yaw;
  const inp={moveX:0,moveY:0,jumpPressed:false,jumpHeld:false};
  for(let f=0;f<script.frames;f++){
    inp.jumpPressed=false; script.step(f,inp,p,(y)=>camYaw=y);
    p.update(dt,inp,camYaw); t+=dt;
    for(const e of p.events) log.push(`${f}:${e.type}${e.prim?'('+(e.prim.kind)+')':''}`);
    if(script.trace && f%script.trace===0) console.log(f, p.mode, p.prim&&p.prim.kind, p.pos.toArray().map(v=>v.toFixed(2)).join(','), 'n',p.normal.toArray().map(v=>v.toFixed(2)).join(','), 'sp',p.speed.toFixed(1), p.target.valid? 'tgt '+(p.target.prim&&p.target.prim.kind):'' , p.atTip?'TIP':'');
    if(!isFinite(p.pos.x+p.pos.y+p.pos.z)) { console.log('NaN!'); break; }
  }
  console.log('==',name,'final',p.mode,p.prim&&p.prim.kind,p.pos.toArray().map(v=>v.toFixed(2)).join(','),'events',log.join(' '));
  return p;
}
// 1: run forward into the trunk and keep holding forward: should climb to the top
run('climb trunk',{frames:240,trace:40,step(f,i){i.moveY=1;}});
// 2: climb, then at height ~5 on +x side walk onto branch: start at trunk +x side
run('trunk->branch->tip, hold jump to wire',{frames:420,trace:30,step(f,i,p,cam){
  if(f<70){ i.moveY=1; } // run to trunk and climb (camera looking -z)
  else if(p.prim&&p.prim.kind==='trunk'&&p.pos.y<4.6){ i.moveY=1;i.moveX=0.9; } // spiral to +x side
  else if(p.prim&&p.prim.kind==='trunk'&&p.mode==='surface'){ i.moveX=0;i.moveY=0; i.jumpPressed=true; }
  else { cam(-Math.PI/2); i.moveX=0;i.moveY=1; i.jumpHeld = true; } // camera looks +x: forward = +x along branch
}});
// 3: wall climb with ledge + roof
run('wall+ledge+roof',{frames:260,trace:30,step(f,i,p,cam){ cam(Math.PI/2); i.moveY=1; }}, V(-3,0.2,-6));
// 4: run off roof edge: should wrap down the wall
run('roof wrap',{frames:200,trace:25,step(f,i,p,cam){ cam(0); i.moveY=1; }}, V(-10,6.3,-6));
// 5: free jump on ground
run('ground jump',{frames:90,trace:15,step(f,i){ i.moveY=1; if(f===20) i.jumpPressed=true; }}, V(20,0.2,20));
// 6: stand still -> charge -> burst
run('burst',{frames:140,trace:20,step(f,i){ i.moveY = f>80?1:0; }}, V(20,0.2,20));
