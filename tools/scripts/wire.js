// go to the first pole and run the wire to the first roof
const L=g.layout.landmarks; P.teleport(L.firstPole.clone().add({x:0,y:0.6,z:0})); await wait(600); console.log(st()); await shot();
face(L.firstRoof.x, L.firstRoof.z); F.y=1; F.hold=false; await wait(1200); console.log(st()); await shot(); await wait(1200); console.log(st()); await shot(); await wait(1500); console.log(st()); await shot();
return [g.stats.wireDist, g.stats.onRoof, g.info()];
