const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1000 }, reducedMotion: 'reduce' });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  for (const width of [1920, 1440, 1024, 768, 390, 320, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(250);
    await page.locator('#why-meddy').scrollIntoViewIfNeeded();
    await page.waitForTimeout(350);
    const data = await page.locator('#why-meddy').evaluate(section => {
      const bounds = section.getBoundingClientRect();
      const cards = [...section.querySelectorAll('[data-scatter]')].map(el => {
        const b = el.getBoundingClientRect();
        return { left: b.left, right: b.right, width: b.width };
      });
      return { left: bounds.left, right: bounds.right, cards, detachedHeader: !document.querySelector('#hero header') };
    });
    assert.equal(data.cards.length, 6);
    for (const card of data.cards) {
      assert.ok(card.width > 0 && card.left >= data.left - 1 && card.right <= data.right + 1, JSON.stringify({width,card}));
    }
    assert.ok(data.detachedHeader, 'Verify after the header has moved into its portal');
    await page.locator('#why-meddy img').evaluateAll(async imgs => Promise.all(imgs.map(img => img.decode().catch(() => {}))));
    await page.locator('#why-meddy').screenshot({ path: `tmp/most-care-fixed-${width}.png` });
    console.log(`${width}px: all six visuals within section after header moves`);
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
