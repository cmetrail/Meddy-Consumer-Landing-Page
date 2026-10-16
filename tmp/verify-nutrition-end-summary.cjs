const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of [1440, 390, 320]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
      await page.waitForTimeout(1500);
      const root = page.locator('[data-variant="nutrition"]');
      const summary = root.locator('[data-end-summary]').last();
      const totals = root.locator('[data-end-summary]').first();
      const scrollToProgress = async progress => {
        const top = await root.evaluate(element => element.getBoundingClientRect().top + window.scrollY);
        await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), top - 850 + 750 * progress);
        await page.waitForTimeout(1300);
      };
      await scrollToProgress(0.72);
      assert.equal(await summary.evaluate(element => getComputedStyle(element).visibility), 'hidden', 'summary stays hidden while graph draws');
      await scrollToProgress(0.74);
      assert.ok(Number(await root.locator('[data-graph-reveal]').getAttribute('width')) > 719, 'graph completes before summary');
      assert.equal(await summary.evaluate(element => getComputedStyle(element).visibility), 'hidden');
      await scrollToProgress(1);
      assert.equal(await summary.evaluate(element => getComputedStyle(element).opacity), '1');
      assert.equal(await totals.getByText('Daily sodium', { exact: true }).isVisible(), true);
      assert.equal(await root.locator('[class*="chartMetrics"]').count(), 1);
      assert.equal(await totals.evaluate(element => getComputedStyle(element).opacity), '1');
      const bounds = await summary.boundingBox();
      assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= width, 'summary fits screen');
      await root.screenshot({ path: `tmp/nutrition-end-summary-${width}.png` });
      await scrollToProgress(0.5);
      assert.equal(await summary.evaluate(element => getComputedStyle(element).visibility), 'hidden', 'reverse scroll hides summary');
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(250);
      assert.equal(await summary.evaluate(element => getComputedStyle(element).visibility), 'visible', 'reduced motion exposes summary');
      assert.deepEqual(errors, []);
      console.log(`${width}px: graph-first reveal, final summary, reverse scroll, reduced motion, and fit passed`);
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
