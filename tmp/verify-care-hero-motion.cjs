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
      const hero = page.locator('section').filter({ has: page.locator('[data-care-line]') });
      await page.waitForTimeout(3000);
      assert.ok(await hero.locator('[data-care-line], [data-care-description], [data-care-cta], [data-care-message], [data-care-portrait]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === '1')), 'entrance finishes');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no horizontal overflow');
      if (width === 1440) {
        await page.mouse.move(1250, 400);
        await page.waitForTimeout(1400);
        assert.ok(await hero.locator('[data-care-pointer]').evaluate(node => new DOMMatrix(getComputedStyle(node).transform).m41 > 2), 'pointer depth works');
        const button = hero.locator('[data-care-cta]');
        await button.focus();
        await page.waitForTimeout(450);
        assert.ok(await hero.locator('[data-care-shine]').evaluate(node => new DOMMatrix(getComputedStyle(node).transform).m41 > 10), 'focus sheen plays');
      }
      await hero.screenshot({ path: `tmp/care-hero-motion-${width}.png` });
      await page.evaluate(() => window.scrollTo({ top: 300, behavior: 'instant' }));
      await page.waitForTimeout(1600);
      assert.ok(await hero.locator('[data-care-copy]').evaluate(node => new DOMMatrix(getComputedStyle(node).transform).m42 < -2), 'scroll depth works');
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(200);
      assert.ok(await hero.locator('[data-care-line], [data-care-copy], [data-care-depth], [data-care-pointer], [data-care-float], [data-care-glow]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).transform === 'none' && getComputedStyle(node).opacity === '1')), 'reduced motion clears animation');
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.setViewportSize({ width: width === 1440 ? 390 : 1440, height: 900 });
      await page.waitForTimeout(3000);
      assert.equal(await hero.locator('[data-care-portrait]').evaluate(node => getComputedStyle(node).opacity), '1', 'resize restores image');
      assert.deepEqual(errors, []);
      console.log(JSON.stringify({ width, entrance: 'pass', overflow: 'pass', scroll: 'pass', reducedMotion: 'pass', resize: 'pass', errors }));
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
