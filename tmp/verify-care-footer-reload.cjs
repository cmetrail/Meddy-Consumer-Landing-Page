const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch();
  try {
    for (const width of [1440, 390, 320]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://localhost:3000/247-care', { waitUntil: 'networkidle' });
      for (let reload = 0; reload < 2; reload++) {
        await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
        await page.waitForTimeout(500);
        const before = await page.evaluate(() => scrollY);
        assert.ok(before > 2000, 'reload starts at footer');
        await page.reload({ waitUntil: 'networkidle' });
        await page.waitForTimeout(3000);
        assert.deepEqual(errors, [], 'footer reload produces no runtime errors');
        assert.ok(Math.abs(await page.evaluate(() => scrollY) - before) < 10, 'footer scroll position is preserved');
        assert.ok(await page.locator('[data-cs-reveal], [data-cs-health-line], [data-cs-portrait], [data-cs-icon], [data-cs-item], [data-cs-access-line], [data-cs-cta], [data-cq-copy], [data-cq-card], [data-cq-illustration]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === '1')), 'sections above restored position are visible');
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForTimeout(500);
      const card = page.locator('[data-cs-item]').first();
      await card.scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
      assert.equal(await card.evaluate(node => getComputedStyle(node).opacity), '1', 'completed entrances stay visible on re-entry');
      await page.setViewportSize({ width: width === 1440 ? 390 : 1440, height: 900 });
      await page.waitForTimeout(2500);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(200);
      assert.deepEqual(errors, [], 'resize and reduced motion remain error free');
      console.log(JSON.stringify({ width, footerReloads: 2, preservedScroll: 'pass', sectionsVisible: 'pass', reentry: 'pass', resize: 'pass', errors }));
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
