const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
const reveals = '[data-cs-reveal], [data-cs-health-line], [data-cs-portrait], [data-cs-icon], [data-cs-access-line], [data-cs-item], [data-cs-cta]';

(async () => {
  const browser = await chromium.launch();
  try {
    for (const width of [1440, 768, 390, 320]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://localhost:3000/247-care', { waitUntil: 'networkidle' });
      assert.equal(await page.locator('[data-cs-health-line]').first().evaluate(el => getComputedStyle(el).opacity), '0', 'health content waits for scroll');
      for (const kind of ['health', 'knows', 'access']) {
        const section = page.locator(`[data-care-story="${kind}"]`);
        const bounds = await section.evaluate(el => ({ top: el.getBoundingClientRect().top + scrollY, height: el.offsetHeight }));
        for (let offset = 0; offset < bounds.height; offset += 350) {
          await page.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), bounds.top + offset);
          await page.waitForTimeout(100);
        }
        await page.waitForTimeout(2500);
        assert.ok(await section.locator(reveals).evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === '1')), `${kind} entrance completes`);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${kind} no overflow`);
        await page.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), bounds.top);
        await page.waitForTimeout(1500);
        if (kind === 'knows') {
          const image = section.locator('[data-cs-landscape]');
          const before = await image.evaluate(el => getComputedStyle(el).transform);
          await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'instant' }));
          await page.waitForTimeout(1500);
          assert.notEqual(await image.evaluate(el => getComputedStyle(el).transform), before, 'photo responds to scroll');
        }
        await section.screenshot({ path: `tmp/care-${kind}-motion-${width}.png` });
      }
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(200);
      assert.ok(await page.locator(reveals).evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === '1' && getComputedStyle(node).transform === 'none')), 'reduced motion restores content');
      assert.equal(await page.locator('[data-cs-timeline]').evaluate(el => getComputedStyle(el).clipPath), 'none', 'reduced motion shows complete timeline');
      assert.equal(await page.locator('[data-cs-landscape]').evaluate(el => getComputedStyle(el).transform), 'none');
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.setViewportSize({ width: width === 1440 ? 390 : 1440, height: 900 });
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.waitForTimeout(200);
      const button = page.locator('[data-cs-cta]');
      await button.focus();
      assert.equal(await button.evaluate(el => getComputedStyle(el).opacity), '1', 'keyboard focus immediately reveals CTA after resize');
      assert.deepEqual(errors, []);
      console.log(JSON.stringify({ width, entrances: 'pass', parallax: 'pass', overflow: 'pass', reducedMotion: 'pass', resizeAndFocus: 'pass', errors }));
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
