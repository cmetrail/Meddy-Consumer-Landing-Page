const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch();
  try {
    for (const width of [1440, 390, 320]) {
      const page = await browser.newPage({ viewport: { width, height: 1024 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://localhost:3000/personalized-health-plans', { waitUntil: 'networkidle' });
      const hero = page.locator('#personalized-health-plans-hero');
      await page.waitForTimeout(3000);
      assert.ok(await hero.locator('[data-plan-line], [data-plan-reveal], [data-plan-badge]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === '1')), 'entrance completes');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no horizontal overflow');
      const float = hero.locator('[data-plan-float]').first();
      const before = await float.evaluate(node => getComputedStyle(node).transform);
      await page.waitForTimeout(400);
      assert.notEqual(await float.evaluate(node => getComputedStyle(node).transform), before, 'badges float');
      if (width === 1440) {
        await page.mouse.move(1250, 400);
        await page.waitForTimeout(1600);
        assert.ok(await hero.locator('[data-plan-pointer]').evaluate(node => new DOMMatrix(getComputedStyle(node).transform).m41 > 2), 'cursor parallax');
        await hero.locator('[data-plan-cta]').hover();
        await page.waitForTimeout(300);
        assert.ok(await hero.locator('[data-plan-cta]').evaluate(node => new DOMMatrix(getComputedStyle(node).transform).m42 < -0.5), 'CTA responds');
      }
      await page.mouse.move(0, 0);
      await hero.screenshot({ path: `tmp/health-plan-motion-${width}.png` });
      await page.evaluate(() => window.scrollTo({ top: 300, behavior: 'instant' }));
      await page.waitForTimeout(1700);
      assert.ok(await hero.locator('[data-plan-depth]').evaluate(node => new DOMMatrix(getComputedStyle(node).transform).m42 < -2), 'scroll depth');
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(200);
      assert.ok(await hero.locator('[data-plan-line], [data-plan-reveal], [data-plan-badge], [data-plan-float], [data-plan-pointer], [data-plan-depth]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).transform === 'none' && getComputedStyle(node).opacity === '1')), 'reduced motion restores static layout');
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await hero.screenshot({ path: `tmp/health-plan-motion-reduced-${width}.png` });
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.setViewportSize({ width: width === 1440 ? 390 : 1440, height: 1024 });
      await page.waitForTimeout(3000);
      assert.equal(await hero.locator('[data-plan-line]').first().evaluate(node => getComputedStyle(node).opacity), '1', 'resize completes entrance');
      assert.equal(await hero.locator('[data-plan-cta]').getAttribute('href'), '/book-consultation');
      assert.deepEqual(errors, []);
      console.log(JSON.stringify({ width, entrance: 'pass', float: 'pass', scroll: 'pass', reducedMotion: 'pass', resize: 'pass', errors }));
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
