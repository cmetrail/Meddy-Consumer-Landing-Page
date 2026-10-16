const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch();
  try {
    for (const width of [1440, 390, 320]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 } });
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.goto('http://localhost:3000/longevity', { waitUntil: 'networkidle' });
      const section = page.locator('#longevity-know-stand');
      await section.locator('h2').scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);
      assert.ok(await section.locator('h2').evaluate(n => +getComputedStyle(n).opacity > .99), 'heading reveal');
      await section.locator('[data-stand-categories]').scrollIntoViewIfNeeded();
      await page.waitForTimeout(1800);
      assert.ok(await section.locator('[data-stand-category]').evaluateAll(ns => ns.every(n => +getComputedStyle(n).opacity > .99)), 'category stagger');
      for (const [label, factor] of [['Body & Nutrition', 'Vitamins'], ['Fitness', 'Strength'], ['Sleep & Recovery', 'Readiness'], ['Labs & Biomarkers', 'Comprehensive physician-directed testing'], ['Heart & Metabolic Health', 'Blood pressure']]) {
        await section.getByRole('button', { name: label, exact: true }).click();
        await page.waitForTimeout(800);
        assert.equal(await section.getByRole('button', { name: label, exact: true }).getAttribute('aria-pressed'), 'true');
        assert.ok(await section.locator('[data-stand-pill]').filter({ hasText: factor }).isVisible(), label);
        assert.ok(await section.locator('[data-stand-pill]').evaluateAll(ns => ns.every(n => +getComputedStyle(n).opacity > .99)), 'pill transition completes');
      }
      await section.locator('[data-stand-photo]').scrollIntoViewIfNeeded();
      await page.waitForTimeout(1700);
      assert.ok(await section.locator('[data-stand-photo]').evaluate(n => +getComputedStyle(n).opacity > .99), 'portrait reveal');
      assert.ok(await section.locator('[data-stand-image]').evaluate(n => getComputedStyle(n).transform !== 'none'), 'portrait parallax');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no overflow');
      await section.screenshot({ path: `tmp/longevity-stand-motion-${width}.png` });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(250);
      assert.ok(await section.locator('[data-stand-reveal], [data-stand-photo], [data-stand-category], [data-stand-image], [data-stand-pill]').evaluateAll(ns => ns.every(n => +getComputedStyle(n).opacity === 1 && getComputedStyle(n).transform === 'none')), 'reduced motion baseline');
      await section.getByRole('button', { name: 'Fitness', exact: true }).click();
      assert.ok(await section.locator('[data-stand-pill]').evaluateAll(ns => ns.every(n => +getComputedStyle(n).opacity === 1)), 'reduced motion category switch');
      assert.deepEqual(errors, []);
      console.log(JSON.stringify({ width, reveal: 'pass', categories: 'pass', portrait: 'pass', reducedMotion: 'pass', errors }));
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exit(1); });
