const { chromium } = require('playwright');
const fs = require('fs');
const name = process.argv[2];
(async () => {
  const b = await chromium.launch({ args: ['--disable-gpu-vsync'] });
  const t0 = Date.now();
  const ctx = await b.newContext({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1, recordVideo: { dir: 'roh/' + name, size: { width: 1080, height: 1920 } } });
  const p = await ctx.newPage();
  await p.goto('http://127.0.0.1:8765/reel.html?reel=' + name, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const start = (Date.now() - t0) / 1000;
  p.evaluate(() => window.__start());
  await p.waitForFunction(() => window.__fertig === true, null, { timeout: 120000, polling: 200 });
  const dauer = (Date.now() - t0) / 1000 - start;
  const video = p.video(); await ctx.close(); const pfad = await video.path();
  fs.writeFileSync('roh/' + name + '.json', JSON.stringify({ pfad, start, dauer }));
  console.log(name, 'start', start.toFixed(2), 'dauer', dauer.toFixed(1));
  await b.close();
})();
