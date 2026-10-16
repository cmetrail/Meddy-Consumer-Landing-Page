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
      await page.evaluate(() => document.fonts.ready);
      const section = page.locator('#personalized-health-plans-goals');
      await section.locator('h2').evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
      await page.waitForTimeout(1600);
      assert.ok(await section.locator('[data-goals-heading]').evaluateAll(nodes => nodes.every(node => Math.abs(new DOMMatrix(getComputedStyle(node).transform).m42) < 1)), 'heading settles');
      const cards = section.locator('[data-goals-card]');
      for (let index = 0; index < await cards.count(); index++) {
        const card = cards.nth(index);
        const photo = card.locator('[data-goals-photo]');
        await photo.evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
        await page.waitForTimeout(1900);
        assert.equal(await photo.evaluate(el => getComputedStyle(el).opacity), '1', 'photo visible');
        const before = await card.locator('[data-goals-parallax]').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m42);
        await page.evaluate(() => window.scrollBy({ top: 100, behavior: 'instant' }));
        await page.waitForTimeout(1400);
        const after = await card.locator('[data-goals-parallax]').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m42);
        assert.ok(after < before, 'scroll moves photo');
        if (width === 1440 && index === 0) {
          const box = await photo.boundingBox();
          await page.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.65);
          await page.waitForTimeout(1100);
          assert.ok(await card.locator('[data-goals-pointer]').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m41 > 1), 'desktop cursor depth');
          await page.mouse.move(0, 0);
        }
        await card.locator('[data-goals-caption]').evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
        await page.waitForTimeout(1400);
        assert.ok(await card.locator('[data-goals-caption], [data-goals-chip]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === '1')), 'caption and chips visible');
      }
      await section.locator('[data-goals-statement]').evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
      await page.waitForTimeout(1700);
      assert.ok(await section.locator('[data-goals-word]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === '1')), 'statement visible');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no horizontal overflow');
      await section.screenshot({ path: `tmp/health-plan-goals-motion-${width}.png` });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(200);
      assert.ok(await section.locator('[data-goals-heading], [data-goals-image], [data-goals-parallax], [data-goals-pointer], [data-goals-chip], [data-goals-word]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).transform === 'none' && getComputedStyle(node).opacity === '1')), 'reduced motion clears transforms');
      await page.setViewportSize({ width: width === 1440 ? 390 : 1440, height: 900 });
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await section.locator('h2').evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
      await page.waitForTimeout(1700);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'resize has no overflow');
      assert.deepEqual(errors, []);
      console.log(JSON.stringify({ width, reveals: 'pass', parallax: 'pass', reducedMotion: 'pass', resize: 'pass', errors }));
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
