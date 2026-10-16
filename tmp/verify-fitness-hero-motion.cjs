const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch();
  try {
    for (const width of [1440, 390, 320]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://localhost:3000/fitness', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2600);
      const hero = page.locator('section').filter({ has: page.locator('[data-fitness-line]') });
      assert.ok(await hero.locator('[data-fitness-line], [data-fitness-description], [data-fitness-cta], [data-fitness-reveal]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === '1')), 'entrance completed');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no horizontal overflow');
      if (width === 1440) {
        await page.mouse.move(1250, 400);
        await page.waitForTimeout(1500);
        assert.ok(await hero.locator('[data-fitness-pointer]').evaluate(node => new DOMMatrix(getComputedStyle(node).transform).m41 > 2), 'cursor depth');
      }
      await page.mouse.move(0, 0);
      await hero.screenshot({ path: `tmp/fitness-hero-motion-${width}.png` });
      await page.evaluate(() => window.scrollTo({ top: 300, behavior: 'instant' }));
      await page.waitForTimeout(1600);
      assert.ok(await hero.locator('[data-fitness-depth]').evaluate(node => new DOMMatrix(getComputedStyle(node).transform).m42 < -3), 'scroll parallax');
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(200);
      assert.ok(await hero.locator('[data-fitness-reveal], [data-fitness-pointer], [data-fitness-depth], [data-fitness-line]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).transform === 'none' && getComputedStyle(node).opacity === '1')), 'reduced motion clears transforms');
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.setViewportSize({ width: width === 1440 ? 390 : 1440, height: 900 });
      await page.waitForTimeout(2600);
      assert.equal(await hero.locator('[data-fitness-reveal]').evaluate(node => getComputedStyle(node).opacity), '1', 'resize restores composition');
      assert.deepEqual(errors, []);
      console.log(JSON.stringify({ width, entrance: 'pass', pointer: width === 1440 ? 'pass' : 'disabled', scroll: 'pass', reducedMotion: 'pass', resize: 'pass', errors }));
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
