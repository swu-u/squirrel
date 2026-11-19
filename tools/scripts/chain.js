face(0,0); F.y=1; await wait(3000); F.hold=true; const bad=[];
for(let i=0;i<40;i++){ await wait(250); const d=await dark(); if(d>=5){ bad.push(i+":"+d+" "+st()); if(bad.length<3) await shot(); } if(i==12||i==24||i==36){console.log(st()); await shot();} }
return bad;
