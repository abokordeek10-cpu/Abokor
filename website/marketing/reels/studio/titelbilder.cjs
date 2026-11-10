// Titelbilder (Cover) aus den Drehbüchern: node titelbilder.cjs <id> [<id> ...] <ausgabeordner>
// Nutzt das Feld "titelbild" in geschichten/<id>.json: { "zeilen": "Text mit <b>gelb</b>", "zeit": "<b>Di.</b> 7:30" (optional) }
// Text steht mittig, damit Instagram (Raster 3:4) und TikTok nichts abschneiden.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const args = process.argv.slice(2);
const aus = args.pop();
fs.mkdirSync(aus, { recursive: true });
const css = fs.readFileSync(path.join(__dirname, 'titelbild.html'), 'utf8').match(/<style>([\s\S]*?)<\/style>/)[1];
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  for (const id of args) {
    const g = JSON.parse(fs.readFileSync(path.join(__dirname, 'geschichten', id + '.json'), 'utf8'));
    const t = g.titelbild || { zeilen: g.szenen[0].zeilen ? g.szenen[0].zeilen.join(' ') : g.serie };
    const hell = g.stil === 'papier';
    const serie = g.serie.split(' · ')[0];
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
      <section class="${hell ? 'hell' : ''}"><div class="serie">${serie}</div>${t.zeit ? `<div class="zeit">${t.zeit}</div>` : ''}<h1>${t.zeilen}</h1>
      <img class="logo" src="logo/${hell ? 'quer-dunkel' : 'quer-hell'}.png"></section></body></html>`;
    const tmp = path.join(__dirname, '.titelbild-tmp.html');
    fs.writeFileSync(tmp, html);
    await p.goto('file://' + tmp);
    fs.unlinkSync(tmp);
    await p.evaluate(() => document.fonts.ready);
    await (await p.$('section')).screenshot({ path: path.join(aus, `titelbild-${id}.jpg`), type: 'jpeg', quality: 92 });
    console.log('Titelbild', id);
  }
  await b.close();
})();
