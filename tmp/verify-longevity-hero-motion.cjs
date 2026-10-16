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
      await page.waitForTimeout(3000);
      const hero = page.locator('#longevity-hero');
      const stage = hero.locator(width >= 1024 ? '[data-lg-desktop]' : '[data-lg-mobile]');
      assert.equal(await stage.locator('[data-lg-photo]').count(), 6);
      assert.ok(await stage.locator('[data-lg-word], [data-lg-photo], [data-lg-description], [data-lg-cta-reveal]').evaluateAll(ns => ns.every(n => +getComputedStyle(n).opacity > .99)), 'entrance complete');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no horizontal overflow');
      const drift = await stage.locator('[data-lg-float]').first().getAttribute('style');
      await page.waitForTimeout(500);
      assert.notEqual(await stage.locator('[data-lg-float]').first().getAttribute('style'), drift, 'ambient drift animates');
      if (width === 1440) {
        await page.mouse.move(1300, 350);
        await page.waitForTimeout(1500);
        assert.ok(await stage.locator('[data-lg-pointer]').first().evaluate(n => Math.abs(new DOMMatrix(getComputedStyle(n).transform).m41) > 1), 'pointer depth responds');
        await stage.locator('[data-lg-cta]').hover();
        await page.waitForTimeout(450);
        assert.ok(await stage.locator('[data-lg-cta]').evaluate(n => new DOMMatrix(getComputedStyle(n).transform).m11 > 1.02), 'CTA hover responds');
        await page.evaluate(() => window.scrollTo({ top: 350, behavior: 'instant' }));
        await page.waitForTimeout(1800);
        assert.ok(await stage.locator('[data-lg-depth]').first().evaluate(n => Math.abs(new DOMMatrix(getComputedStyle(n).transform).m42) > 5), 'scroll depth responds');
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await page.waitForTimeout(1500);
      }
      await page.screenshot({ path: `tmp/longevity-hero-motion-${width}.png` });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(300);
      assert.ok(await stage.locator('[data-lg-word], [data-lg-float], [data-lg-pointer], [data-lg-depth], [data-lg-cta]').evaluateAll(ns => ns.every(n => getComputedStyle(n).transform === 'none' && +getComputedStyle(n).opacity === 1)), 'reduced motion restores baseline');
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.setViewportSize({ width: width === 1440 ? 390 : 1440, height: 1000 });
      await page.waitForTimeout(3000);
      assert.ok(await hero.locator('[data-lg-word]:visible').evaluateAll(ns => ns.length === 3 && ns.every(n => +getComputedStyle(n).opacity > .99)), 'responsive rebuild');
      assert.deepEqual(errors, []);
      console.log(JSON.stringify({ width, entrance: 'pass', drift: 'pass', reducedMotion: 'pass', resize: 'pass', errors }));
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exit(1); });
