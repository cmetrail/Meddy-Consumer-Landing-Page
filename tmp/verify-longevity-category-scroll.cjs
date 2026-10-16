const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch();
  try {
    for (const width of [1440, 390, 320]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.goto('http://localhost:3000/longevity', { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(1200);
      const section = page.locator('#longevity-know-stand');
      const bounds = await section.locator('[data-stand-categories]').evaluate(n => {
        const r = n.getBoundingClientRect();
        return { start: r.top + scrollY - innerHeight * .75, end: r.bottom + scrollY - innerHeight * .4 };
      });
      for (const i of [0, 1, 2, 3, 4, 3, 2, 1, 0]) {
        const target = bounds.start + (bounds.end - bounds.start) * ((i + .5) / 5);
        await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), target);
        await page.waitForTimeout(900);
        const buttons = section.getByRole('button');
        assert.equal(await buttons.nth(i).getAttribute('aria-pressed'), 'true', `scroll category ${i} at ${width}`);
        assert.equal(await section.locator('button[aria-pressed="true"]').count(), 1);
      }
      await section.getByRole('button', { name: 'Fitness', exact: true }).click();
      await page.waitForTimeout(700);
      assert.equal(await section.getByRole('button', { name: 'Fitness', exact: true }).getAttribute('aria-pressed'), 'true', 'click still works');
      assert.ok(await section.locator('[data-stand-pill]').filter({ hasText: 'Strength' }).isVisible());
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await section.getByRole('button', { name: 'Body & Nutrition', exact: true }).click();
      await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), bounds.end);
      await page.waitForTimeout(500);
      assert.equal(await section.getByRole('button', { name: 'Body & Nutrition', exact: true }).getAttribute('aria-pressed'), 'true', 'reduced motion keeps manual selection');
      assert.deepEqual(errors, []);
      console.log(JSON.stringify({ width, scrollDown: 'pass', scrollUp: 'pass', click: 'pass', reducedMotion: 'pass', errors }));
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exit(1); });
