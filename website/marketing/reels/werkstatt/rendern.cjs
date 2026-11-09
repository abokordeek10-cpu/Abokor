const { chromium } = require('playwright');
const { spawn } = require('child_process');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('http://127.0.0.1:8766/werkstatt.html'); await p.evaluate(() => window.bereit);
  const dauer = await p.evaluate(() => window.DAUER); const fps = 30; const n = Math.ceil(dauer * fps);
  const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    '-i', 'stimme.mp3', '-filter_complex', `[1:a]adelay=300|300,loudnorm=I=-14:TP=-1.5:LRA=11,apad[a]`,
    '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '19', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '192k', '-t', String(n / fps), '-movflags', '+faststart', 'abora-werkstatt.mp4'], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now();
  for (let i = 0; i < n; i++) {
    const t = i / fps - 0.3; // Ton startet 0,3 s später
    await p.evaluate(t => window.render(t), Math.max(0, t));
    const buf = await p.screenshot({ type: 'jpeg', quality: 90 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 300 === 0) console.log(`${i}/${n} Bilder, ${Math.round((Date.now() - t0) / 1000)} s`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close();
  console.log('fertig', Math.round((Date.now() - t0) / 1000), 's');
})();
