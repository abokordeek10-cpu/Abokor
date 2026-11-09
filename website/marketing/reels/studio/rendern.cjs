// Rendert Reels: node rendern.cjs <id> [<id> ...]   (oder "alle")
// Vorher Server starten: python3 -m http.server 8770   (im Ordner studio)
// Mit --vorschau werden nur Standbilder alle 3 s gespeichert (ausgabe/vorschau-<id>-<s>.jpg).
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const args = process.argv.slice(2);
const vorschau = args.includes('--vorschau');
let ids = args.filter(a => !a.startsWith('--'));
if (ids[0] === 'alle') ids = fs.readdirSync('geschichten').filter(f => f.endsWith('.json')).map(f => f.slice(0, -5)).filter(id => fs.existsSync(`ausgabe/${id}.mp3`));
(async () => {
  const b = await chromium.launch();
  for (const id of ids) {
    const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
    p.on('pageerror', e => console.error(id, e.message));
    await p.goto(`http://127.0.0.1:8770/reel.html?g=${id}`); await p.evaluate(() => window.bereit);
    const dauer = await p.evaluate(() => window.DAUER), fps = 30, n = Math.ceil(dauer * fps);
    if (vorschau) {
      for (let s = 0.5; s < dauer; s += 3) { await p.evaluate(t => window.render(t), s); await p.screenshot({ path: `ausgabe/vorschau-${id}-${String(Math.round(s * 10)).padStart(3, '0')}.jpg`, type: 'jpeg', quality: 70 }); }
      console.log('Vorschau', id); await p.close(); continue;
    }
    const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
      '-i', `ausgabe/${id}.mp3`, '-filter_complex', '[1:a]adelay=300|300,loudnorm=I=-14:TP=-1.5:LRA=11,apad[a]',
      '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '19', '-maxrate', '10M', '-bufsize', '20M', '-pix_fmt', 'yuv420p',
      '-c:a', 'aac', '-b:a', '192k', '-t', String(n / fps), '-movflags', '+faststart', `ausgabe/${id}.mp4`], { stdio: ['pipe', 'inherit', 'inherit'] });
    const t0 = Date.now();
    for (let i = 0; i < n; i++) {
      await p.evaluate(t => window.render(t), Math.max(0, i / fps - 0.3));
      const buf = await p.screenshot({ type: 'jpeg', quality: 90 });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r)); await p.close();
    console.log(id, 'fertig in', Math.round((Date.now() - t0) / 1000), 's');
  }
  await b.close();
})();
