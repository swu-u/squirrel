const r=[]; const spots=[[5,1,5],[0,14,0],[-22,10,-51.6],[60,0.3,0],[0,0.5,-80]];
for(const s of spots){ P.teleport(new (g.camera.position.constructor)(s[0],s[1]+0.5,s[2])); g.rig.snap(P); await wait(2500); const i=g.info(); r.push(s.join(',')+' calls '+i.calls+' tris '+Math.round(i.tris/1000)+'k ms '+i.frameAvg.toFixed(1)); }
await shot(); return r;
