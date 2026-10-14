const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch();
  for (const width of [1440, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 960 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://localhost:3000/wearables', { waitUntil: 'networkidle' });
    const hero = page.locator('#wearables-hero');
    const cluster = hero.locator(width >= 768 ? '[data-cluster-desktop]' : '[data-cluster-mobile]');
    await page.waitForTimeout(3200);
    assert.ok(await hero.locator('[data-hero-copy]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === '1')));
    assert.ok(await cluster.locator('[data-connector]').evaluateAll(nodes => nodes.every(node => parseFloat(getComputedStyle(node).strokeDashoffset) === 0)));
    assert.ok(await hero.evaluate(el => el.getBoundingClientRect().width <= innerWidth));
    const ringBefore = await cluster.locator('[data-ring]').first().evaluate(node => getComputedStyle(node).transform);
    await page.waitForTimeout(250);
    const ringAfter = await cluster.locator('[data-ring]').first().evaluate(node => getComputedStyle(node).transform);
    assert.notEqual(ringBefore, ringAfter, 'ambient ring rotation runs');
    if (width >= 768) {
      await page.mouse.move(1250, 400);
      await page.waitForTimeout(1200);
      assert.notEqual(await cluster.locator('[data-pointer-layer]').evaluate(node => getComputedStyle(node).transform), 'none');
      await page.evaluate(() => window.scrollTo({ top: 300, behavior: 'instant' }));
      await page.waitForTimeout(1600);
      assert.notEqual(await cluster.evaluate(node => getComputedStyle(node).transform), 'none');
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForTimeout(1300);
    }
    await hero.screenshot({ path: `tmp/wearables-hero-${width}.png` });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(200);
    const reducedBefore = await cluster.locator('[data-ring]').first().evaluate(node => getComputedStyle(node).transform);
    await page.waitForTimeout(300);
    assert.equal(await cluster.locator('[data-ring]').first().evaluate(node => getComputedStyle(node).transform), reducedBefore, 'reduced-motion ring stays at authored angle');
    assert.ok(await hero.locator('[data-hero-copy]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === '1')));
    assert.ok(await cluster.locator('[data-connector]').evaluateAll(nodes => nodes.every(node => parseFloat(getComputedStyle(node).strokeDashoffset) === 0)));
    await page.setViewportSize({ width: width >= 768 ? 390 : 1440, height: 960 });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.waitForTimeout(3300);
    assert.ok(await hero.evaluate(el => el.getBoundingClientRect().width <= innerWidth));
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ width, entrance: 'passed', ambient: 'passed', reducedMotion: 'passed', resize: 'passed', errors }));
    await page.close();
  }
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });

