const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch();
  for (const [width, height, reducedMotion] of [[1440, 768, 'no-preference'], [390, 844, 'no-preference'], [320, 640, 'reduce']]) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'warning' && m.text().includes('GSAP')) errors.push(m.text()); });
    await page.goto('http://localhost:3000/medication');
    const hero = page.locator('main > div').first();
    const hand = hero.locator(width >= 1024 ? 'img[alt="Hand holding a green medication capsule"]' : '[data-hero-hand]');
    if (reducedMotion === 'no-preference') {
      await page.waitForFunction(() => [...document.querySelectorAll('main > div img')].some(el => el.style.opacity !== ''));
      const first = await hand.evaluate(el => Number(getComputedStyle(el).opacity));
      assert(first < 1, 'Hand should begin in its entrance animation');
      await hero.screenshot({ path: `tmp/medication-animation-${width}-entering.png` });
      await page.waitForTimeout(3000);
    } else {
      await page.waitForTimeout(500);
    }
    await hero.screenshot({ path: `tmp/medication-animation-${width}-complete.png` });
    assert.equal(await hand.evaluate(el => getComputedStyle(el).opacity), '1');
    const bounds = await hero.boundingBox();
    assert.equal(bounds.height, height, 'Hero and header must fit the viewport');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
    const cta = hero.getByRole('link', { name: 'Start Physician Care' }).filter({ visible: true });
    assert(await cta.isVisible());
    if (width >= 1024) {
      await page.mouse.move(width - 20, 300);
      await page.waitForTimeout(1400);
      const transform = await hand.evaluate(el => getComputedStyle(el).transform);
      assert.notEqual(transform, 'matrix(1, 0, 0, 1, 0, 0)', 'Pointer should add subtle depth');
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(100);
      assert.equal(await hand.evaluate(el => el.style.transform), '', 'Reduced motion must revert transforms');
      await page.setViewportSize({ width: 390, height: 844 });
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.waitForTimeout(3000);
      assert.equal(await hero.locator('[data-hero-hand]').evaluate(el => getComputedStyle(el).opacity), '1');
      await page.goto('http://localhost:3000/sleep');
      await page.goto('http://localhost:3000/medication');
      await page.waitForTimeout(3000);
      assert.equal(await page.locator('[data-hero-hand]').evaluate(el => getComputedStyle(el).opacity), '1');
    } else if (reducedMotion === 'reduce') {
      assert.equal(await hand.evaluate(el => el.style.transform), '');
    }
    assert.deepEqual(errors, []);
    console.log({ width, height, reducedMotion, result: 'passed' });
    await page.close();
  }
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
