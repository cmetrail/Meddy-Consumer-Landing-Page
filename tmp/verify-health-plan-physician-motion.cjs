const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch();
  try {
    for (const width of [1440, 390, 320]) {
      const page = await browser.newPage({ viewport: { width, height: width === 1440 ? 1100 : 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://localhost:3000/personalized-health-plans', { waitUntil: 'networkidle' });
      const section = page.locator('#personalized-health-plans-physician');
      const surface = section.locator(width === 1440 ? '[data-physician-desktop]' : '[data-physician-mobile]');
      for (const selector of ['[data-physician-copy]', '[data-physician-bullets]', '[data-physician-cta-group]', '[data-physician-stage]']) {
        await surface.locator(selector).evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
        await page.waitForTimeout(selector === '[data-physician-stage]' ? 2300 : 1500);
      }
      assert.ok(await surface.locator('[data-physician-copy] > p, [data-physician-bullet], [data-physician-cta-group], [data-physician-portrait], [data-physician-pill]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === '1')), 'reveals complete');
      const float = surface.locator('[data-physician-float]').first();
      const before = await float.evaluate(el => getComputedStyle(el).transform);
      await page.waitForTimeout(400);
      assert.notEqual(await float.evaluate(el => getComputedStyle(el).transform), before, 'labels float');
      const depth = surface.locator('[data-physician-depth]');
      const depthBefore = await depth.evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m42);
      await page.evaluate(() => window.scrollBy({ top: 100, behavior: 'instant' }));
      await page.waitForTimeout(1500);
      assert.ok(await depth.evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m42) < depthBefore, 'scroll depth');
      if (width === 1440) {
        await page.mouse.move(1250, 450);
        await page.waitForTimeout(1400);
        assert.ok(await surface.locator('[data-physician-pointer]').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m41 > 2), 'cursor depth');
      }
      await surface.locator('[data-physician-cta]').focus();
      await page.waitForTimeout(550);
      assert.ok(await surface.locator('[data-physician-cta]').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m42 < -2), 'focus lift');
      assert.equal(await surface.locator('[data-physician-cta]').getAttribute('href'), '/book-consultation');
      await surface.locator('[data-physician-cta]').evaluate(el => el.blur());
      await page.mouse.move(0, 0);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no horizontal overflow');
      await section.evaluate(el => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
      await page.waitForTimeout(700);
      await section.screenshot({ path: `tmp/health-plan-physician-motion-${width}.png` });
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForTimeout(350);
      const paused = await float.evaluate(el => getComputedStyle(el).transform);
      await page.waitForTimeout(350);
      assert.equal(await float.evaluate(el => getComputedStyle(el).transform), paused, 'offscreen float pauses');
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(350);
      assert.ok(await surface.locator('[data-physician-portrait], [data-physician-pill], [data-physician-float], [data-physician-depth], [data-physician-pointer], [data-physician-cta-group]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).transform === 'none' && getComputedStyle(node).opacity === '1')), 'reduced motion restores static composition');
      const newWidth = width === 1440 ? 390 : 1440;
      await page.setViewportSize({ width: newWidth, height: 900 });
      await page.waitForTimeout(350);
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      const resized = section.locator(newWidth === 1440 ? '[data-physician-desktop]' : '[data-physician-mobile]');
      await resized.locator('[data-physician-stage]').evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
      await page.waitForTimeout(2300);
      assert.equal(await resized.locator('[data-physician-portrait]').evaluate(el => getComputedStyle(el).opacity), '1', 'breakpoint restores portrait');
      assert.deepEqual(errors, []);
      console.log(JSON.stringify({ width, reveals: 'pass', float: 'pass', depth: 'pass', focus: 'pass', offscreenPause: 'pass', reducedMotion: 'pass', resize: 'pass', errors }));
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
