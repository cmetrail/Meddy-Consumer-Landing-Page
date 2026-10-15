const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1146, height: 850 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  for (const variant of ['nutrition', 'fitness', 'sleep']) {
    const root = page.locator(`[data-variant=${variant}]`);
    await root.scrollIntoViewIfNeeded();
    await root.screenshot({ path: `tmp/texts-${variant}-desktop.png` });
    console.log(variant, await root.locator('h3').textContent());
  }
  await page.setViewportSize({ width: 390, height: 844 });
  const root = page.locator('[data-variant=sleep]');
  await root.scrollIntoViewIfNeeded();
  await root.screenshot({ path: 'tmp/texts-sleep-mobile.png' });
  console.log('overflow', await page.evaluate(() => document.documentElement.scrollWidth > innerWidth));
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
