const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch();
  try {
    for (const width of [1440, 768, 390, 320]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://localhost:3000/247-care', { waitUntil: 'networkidle' });
      const section = page.locator('section[aria-labelledby="care-questions-title"]');
      assert.equal(await section.locator('[data-cq-card]').first().evaluate(el => getComputedStyle(el).opacity), '0', 'cards wait for section scroll');
      const bounds = await section.evaluate(el => ({ top: el.getBoundingClientRect().top + scrollY, height: el.offsetHeight }));
      for (let offset = 0; offset < bounds.height; offset += 350) {
        await page.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), bounds.top + offset);
        await page.waitForTimeout(100);
      }
      await page.waitForTimeout(2100);
      assert.ok(await section.locator('[data-cq-copy], [data-cq-card], [data-cq-illustration]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === '1')), 'all content revealed');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no horizontal overflow');
      await page.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), bounds.top);
      await page.waitForTimeout(1500);
      const depthBefore = await section.locator('[data-cq-depth]').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m42);
      await page.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), bounds.top + 300);
      await page.waitForTimeout(1500);
      const depthAfter = await section.locator('[data-cq-depth]').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m42);
      assert.ok(depthAfter < depthBefore, 'phone scroll depth changes');
      if (width === 1440) {
        const card = section.locator('[data-cq-card]').first();
        await card.hover();
        await page.waitForTimeout(800);
        assert.ok(await card.locator('img').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).a > 1.04), 'hover photo zoom');
        await page.mouse.move(0, 0);
        await page.waitForTimeout(800);
        assert.ok(await card.locator('img').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).a < 1.001), 'hover resets');
      }
      await section.screenshot({ path: `tmp/care-questions-motion-${width}.png` });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(150);
      assert.ok(await section.locator('[data-cq-depth], [data-cq-scene], [data-cq-card], [data-cq-card] img, [data-cq-icon]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).transform === 'none')), 'reduced motion restores transforms');
      assert.ok(await section.locator('[data-cq-copy], [data-cq-card], [data-cq-illustration]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === '1')), 'reduced motion is visible');
      assert.equal(await section.locator('[data-cq-illustration]').evaluate(el => getComputedStyle(el).clipPath), 'none');
      await page.setViewportSize({ width: width === 1440 ? 390 : 1440, height: 900 });
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(2200);
      assert.equal(await section.locator('[data-cq-card]').first().evaluate(el => getComputedStyle(el).opacity), '1', 'resize restores cards');
      assert.deepEqual(errors, []);
      console.log(JSON.stringify({ width, reveal: 'pass', scroll: 'pass', reducedMotion: 'pass', resize: 'pass', overflow: 'pass', errors }));
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
