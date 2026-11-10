// node bilder.cjs <datei.html> <ausgabeordner>  → speichert jede <section> als JPG (1080×1350, Instagram-Hochformat)
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
(async () => {
  const [datei, aus] = process.argv.slice(2);
  fs.mkdirSync(aus, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: Number(process.argv[4] || 1350) } });
  await p.goto('file://' + path.resolve(datei));
  await p.evaluate(() => document.fonts.ready);
  const s = await p.$$('section');
  for (let i = 0; i < s.length; i++) {
    await s[i].screenshot({ path: `${aus}/${path.basename(datei, '.html')}-${i + 1}.jpg`, type: 'jpeg', quality: 92 });
  }
  await b.close();
  console.log(s.length, 'Bilder');
})();
