const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch();
  try {
    for (const width of [1440, 390, 320]) {
      const page = await browser.newPage({ viewport: { width, height: 910 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://localhost:3000/pricing', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2800);
      const hero = page.locator('section').first();
      assert.ok(await hero.locator('[data-pricing-word], [data-pricing-portrait], [data-pricing-hands-reveal]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === '1')), 'entrance finishes');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no horizontal overflow');
      const lastWord = await hero.locator('[data-pricing-word]').last().boundingBox();
      assert.ok(lastWord.x >= 0 && lastWord.x + lastWord.width <= width, 'headline fits');
      if (width === 1440) {
        await page.mouse.move(1250, 350);
        await page.waitForTimeout(1500);
        assert.ok(await hero.locator('[data-pricing-hands-pointer]').evaluate(node => new DOMMatrix(getComputedStyle(node).transform).m41 > 2), 'cursor depth works');
      }
      await page.mouse.move(0, 0);
      await hero.screenshot({ path: `tmp/pricing-motion-${width}.png` });
      await page.evaluate(() => window.scrollTo({ top: 300, behavior: 'instant' }));
      await page.waitForTimeout(1700);
      assert.ok(await hero.locator('[data-pricing-hands-depth]').evaluate(node => new DOMMatrix(getComputedStyle(node).transform).m42 < -3), 'scroll depth works');
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(200);
      assert.ok(await hero.locator('[data-pricing-word], [data-pricing-portrait], [data-pricing-float], [data-pricing-hands-depth], [data-pricing-hands-pointer], [data-pricing-hands-reveal]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).transform === 'none' && getComputedStyle(node).opacity === '1')), 'reduced motion clears animations');
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.getByRole('button', { name: 'Open menu', exact: true }).click();
      await page.getByRole('button', { name: 'Close menu', exact: true }).click();
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.setViewportSize({ width: width === 1440 ? 390 : 1440, height: 910 });
      await page.waitForTimeout(2800);
      assert.equal(await hero.locator('[data-pricing-hands-reveal]').evaluate(node => getComputedStyle(node).opacity), '1', 'breakpoint resets entrance correctly');
      assert.deepEqual(errors, []);
      console.log(JSON.stringify({ width, entrance: 'pass', overflow: 'pass', pointer: width === 1440 ? 'pass' : 'disabled', scroll: 'pass', reducedMotion: 'pass', menu: 'pass', resize: 'pass' }));
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
