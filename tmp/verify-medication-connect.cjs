const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch();
  for (const width of [1440, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://localhost:3000/medication', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const section = page.locator('#medication-connect');
    const layout = section.locator(width >= 1024 ? '[data-connect-desktop]' : '[data-connect-mobile]');
    const scene = width >= 1024 ? layout : layout.locator('[data-connect-scene]');
    const bounds = await scene.evaluate(el => {
      const cards = [...el.querySelectorAll('[data-connect-card]')];
      const top = el.getBoundingClientRect().top + scrollY;
      return { start: top + cards[0].offsetTop - innerHeight * .88, end: top + cards[2].offsetTop + cards[2].offsetHeight - innerHeight * .72 };
    });
    const states = [];
    for (const progress of [0, .25, .5, .75, 1, 0]) {
      await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), bounds.start + (bounds.end - bounds.start) * progress);
      await page.waitForTimeout(1100);
      const state = await scene.evaluate(el => ({
        cards: [...el.querySelectorAll('[data-connect-card]')].map(card => Number(getComputedStyle(card).opacity)),
        lines: [...el.querySelectorAll('[data-connect-path]')].map(path => parseFloat(getComputedStyle(path).strokeDashoffset)),
        overflow: document.documentElement.scrollWidth > innerWidth,
      }));
      assert.equal(state.overflow, false);
      states.push({ progress, ...state });
      if (progress === .5 || progress === 1) await section.screenshot({ path: `tmp/medication-connect-${width}-${progress === 1 ? 'complete' : 'mid'}.png` });
    }
    assert.ok(states[0].cards.every(opacity => opacity < .05), 'Initial cards hidden');
    assert.ok(states[1].lines[0] > .1 && states[1].lines[0] < .95, 'Connector draws continuously with fractional offsets');
    assert.ok(states[2].lines[0] < .05 && states[2].lines[1] > .8, 'First connector draws before second');
    assert.ok(states[4].cards.every(opacity => opacity > .99), 'All cards reveal');
    assert.ok(states[4].lines.every(offset => offset < .01), 'Both lines complete');
    assert.ok(states[5].cards.every(opacity => opacity < .05), 'Scroll reversal works');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(200);
    assert.ok(await layout.locator('[data-connect-card]').evaluateAll(cards => cards.every(c => getComputedStyle(c).opacity === '1' && getComputedStyle(c).visibility === 'visible')));
    assert.ok(await scene.locator('[data-connect-path]').evaluateAll(paths => paths.every(p => parseFloat(getComputedStyle(p).strokeDashoffset) === 0)));
    await section.screenshot({ path: `tmp/medication-connect-${width}-reduced.png` });
    await page.setViewportSize({ width: width >= 1024 ? 390 : 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.waitForTimeout(300);
    const visibleLayout = section.locator(width >= 1024 ? '[data-connect-mobile]' : '[data-connect-desktop]');
    assert.ok(await visibleLayout.locator('[data-connect-path]').first().getAttribute('d'));
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ width, states, errors, reducedMotion: 'passed', breakpoint: 'passed' }));
    await page.close();
  }
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
