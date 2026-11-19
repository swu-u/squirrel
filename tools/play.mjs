// Scripted playtest: node tools/play.mjs <name> "<js run in page>"  -> takes shots/play-<name>-N.png whenever the script calls await shot()
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
let [name, script, w = 844, h = 390] = process.argv.slice(2);
if (script.startsWith('@')) script = fs.readFileSync(script.slice(1), 'utf8');
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist', '--mute-audio', `--window-size=${w},${h}`] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: +w, height: +h, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  page.on('console', (m) => { const t = m.text(); if (m.type() === 'error' || t.startsWith('T:')) console.log(`[${m.type()}]`, t); });
  page.on('pageerror', (e) => console.log('[pageerror]', e.message));
  let n = 0;
  await page.exposeFunction('shot', async () => { n++; await page.screenshot({ path: `shots/play-${name}-${n}.png` }); return n; });
  await page.goto('http://localhost:5173/?autostart=1&fs=0' + (process.env.Q ? '&' + process.env.Q : ''), { waitUntil: 'load' });
  await page.waitForFunction('window.game && typeof window.game.info === "function" && window.game.info().mode === "play"', { timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));
  const res = await page.evaluate(`(async()=>{ const g = window.game, P = g.player; const F = window.__fake = {x:0,y:0,hold:false,jump:false};
    const wait = (ms)=>new Promise(r=>setTimeout(r,ms));
    const face=(x,z)=>{g.rig.yaw=Math.atan2(-(x-P.pos.x),-(z-P.pos.z)); g.rig.manualTime=0;};
    const dark = async ()=>{ const gl=g.renderer.getContext(); const px=new Uint8Array(64); let d=0; const W=gl.drawingBufferWidth,H=gl.drawingBufferHeight; await new Promise(r=>requestAnimationFrame(()=>{ for(let k=0;k<16;k++) gl.readPixels(Math.floor((k%4+0.5)/4*W),Math.floor((Math.floor(k/4)+0.5)/4*H),1,1,gl.RGBA,gl.UNSIGNED_BYTE,px,k*4); r();})); for(let k=0;k<16;k++) if(px[k*4]+px[k*4+1]+px[k*4+2]<6) d++; return d; };
    const st = ()=> 'T: '+P.mode+' '+(P.prim?P.prim.kind||P.prim.type:'-')+' pos '+P.pos.toArray().map(v=>v.toFixed(1)).join(',')+' sp '+P.speed.toFixed(1)+' tgt '+(P.target.valid?(P.target.prim?P.target.prim.kind:'dog'):'-');
    ${script}
  })()`);
  if (res !== undefined) console.log('[result]', JSON.stringify(res));
} finally { await browser.close(); }
