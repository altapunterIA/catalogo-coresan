/* Exporta los 40 flyers a PNG (1080 x 1920) en flyers-stock/png/
   Uso:  node flyers-stock/export.js        (requiere Playwright) */
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

(async () => {
  const dir = __dirname;
  const out = path.join(dir, 'png');
  fs.mkdirSync(out, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.join(dir, 'index.html') + '?export', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const ids = await page.$$eval('.flyer', els => els.map(e => e.id));
  for (const id of ids) {
    await page.locator('#' + id).screenshot({ path: path.join(out, id + '.png') });
    process.stdout.write(id + ' ');
  }
  console.log('\nListo:', ids.length, 'flyers en', out);
  await browser.close();
})();
