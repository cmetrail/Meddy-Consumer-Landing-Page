const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch();
  try {
    for (const width of [1440, 390, 320]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://localhost:3000/personalized-health-plans', { waitUntil: 'networkidle' });
      const section = page.locator('#personalized-health-plans-progress');
      const stage = section.locator('[data-progress-stage]');
      const track = section.locator('[data-progress-track]');
      const x = () => track.evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m41);
      await section.locator('h2').evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
      await page.waitForTimeout(1600);
      assert.equal(await section.locator('h2').evaluate(el => getComputedStyle(el).opacity), '1');
      await stage.evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
      await page.waitForTimeout(2800);
      assert.ok(await section.locator('[data-progress-card], [data-progress-phone-reveal]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === '1')), 'cards and phone revealed');
      assert.ok(await section.locator('[data-progress-bar], [data-progress-nutrient]').evaluateAll(nodes => nodes.every(node => Math.abs(new DOMMatrix(getComputedStyle(node).transform).m22 - 1) < 0.001)), 'chart bars populated');
      const before = await x();
      await page.waitForTimeout(400);
      assert.ok(await x() < before - 1, 'marquee moves');
      const depth = section.locator('[data-progress-phone-depth]');
      const depthBefore = await depth.evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m42);
      await page.evaluate(() => window.scrollBy({ top: 120, behavior: 'instant' }));
      await page.waitForTimeout(1500);
      assert.ok(await depth.evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m42) < depthBefore, 'phone scroll depth');
      if (width === 1440) {
        const box = await section.boundingBox();
        await page.mouse.move(box.x + box.width * 0.85, 400);
        await page.waitForTimeout(1400);
        assert.ok(await section.locator('[data-progress-phone-pointer]').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m41 > 2), 'desktop cursor depth');
      }
      await page.mouse.move(0, 0);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no horizontal overflow');
      assert.equal(await section.locator('[aria-hidden="true"]').filter({ has: page.locator('[data-progress-card]') }).count(), 2, 'duplicates hidden from screen readers');
      await section.screenshot({ path: `tmp/health-plan-progress-motion-${width}.png` });
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForTimeout(300);
      const pausedX = await x();
      await page.waitForTimeout(400);
      assert.equal(await x(), pausedX, 'offscreen marquee pauses');
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(200);
      assert.ok(await section.locator('[data-progress-track], [data-progress-phone-reveal], [data-progress-phone-depth], [data-progress-phone-pointer], [data-progress-card], [data-progress-nutrient]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).transform === 'none' && getComputedStyle(node).opacity === '1')), 'reduced motion restores static content');
      await page.setViewportSize({ width: width === 1440 ? 390 : 1440, height: 900 });
      await page.waitForTimeout(350);
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await stage.evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
      await page.waitForTimeout(2800);
      assert.equal(await section.locator('[data-progress-phone-reveal]').evaluate(el => getComputedStyle(el).opacity), '1', 'resize restores phone');
      assert.deepEqual(errors, []);
      console.log(JSON.stringify({ width, entrance: 'pass', charts: 'pass', marquee: 'pass', depth: 'pass', offscreenPause: 'pass', reducedMotion: 'pass', resize: 'pass', errors }));
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
