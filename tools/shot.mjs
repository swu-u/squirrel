// Headless screenshot of a page using the installed Chrome.
// node tools/shot.mjs <url> <out.png> [--w 844] [--h 390] [--dpr 2] [--wait 2500] [--eval "js to run before the shot"] [--evalwait 500]
// Prints page console errors and the return value of --eval. Default viewport = phone landscape.
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const url = args[0], out = args[1];
const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const w = +opt('w', 844), h = +opt('h', 390), dpr = +opt('dpr', 2), wait = +opt('wait', 2500);
const ev = opt('eval', null), evalwait = +opt('evalwait', 500);
if (!url || !out) { console.error('usage: node tools/shot.mjs <url> <out.png> [--w --h --dpr --wait --eval --evalwait]'); process.exit(1); }

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist', '--enable-webgl', '--hide-scrollbars', '--mute-audio', '--autoplay-policy=no-user-gesture-required', `--window-size=${w},${h}`],
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: dpr, isMobile: opt('mobile', '1') === '1', hasTouch: opt('mobile', '1') === '1' });
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.log(`[page ${m.type()}]`, m.text()); else if (args.includes('--log')) console.log('[page]', m.text()); });
  page.on('pageerror', (e) => console.log('[pageerror]', e.message));
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await new Promise((r) => setTimeout(r, wait));
  if (ev) {
    const res = await page.evaluate(`(async()=>{ ${ev} })()`);
    if (res !== undefined) console.log('[eval]', typeof res === 'string' ? res : JSON.stringify(res));
    await new Promise((r) => setTimeout(r, evalwait));
  }
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
  await page.screenshot({ path: out });
  console.log('saved', out);
} finally {
  await browser.close();
}
