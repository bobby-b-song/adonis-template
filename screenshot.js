const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto('file://' + path.resolve('paclitaxel.html'));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'paclitaxel_rendered.png', fullPage: true });
  await browser.close();
  console.log('Saved paclitaxel_rendered.png');
})();
