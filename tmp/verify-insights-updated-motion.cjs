const {chromium} = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch();
  for (const width of [1440, 390]) {
    const page = await browser.newPage({viewport: {width, height:1000}});
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('http://localhost:3000/how-it-works', {waitUntil:'networkidle'});
    const section = page.locator('section[aria-labelledby=insights-heading]');
    const cards = section.locator('[data-insights-card]');
    assert.equal(await cards.count(), 3);
    assert.equal(await cards.first().evaluate(e => getComputedStyle(e).opacity), '0');
    await section.evaluate(e => window.scrollTo(0, e.getBoundingClientRect().top + window.scrollY));
    await page.waitForFunction(() => {
      const card = document.querySelector('[data-insights-card]');
      const opacity = Number(getComputedStyle(card).opacity);
      return opacity > 0 && opacity < 1;
    });
    const bar = cards.first().locator('[class*=barColumn] > div').first();
    await page.waitForFunction(() => {
      const bar = document.querySelector('[class*=barColumn] > div');
      const transform = getComputedStyle(bar).transform;
      return transform !== 'none' && Number(transform.split(',')[3]) > 0 && Number(transform.split(',')[3]) < 1;
    });
    if (width < 600) {
      assert.equal(await cards.nth(2).evaluate(e => getComputedStyle(e).opacity), '0');
      await section.locator('[class*=cardScroller]').evaluate(e => e.scrollLeft = e.scrollWidth);
    }
    const plot = cards.nth(2).locator('[class*=plot]');
    await page.waitForFunction(() => {
      const plot = document.querySelectorAll('[data-insights-card]')[2].querySelector('[class*=plot]');
      const clip = getComputedStyle(plot).clipPath;
      return clip !== 'inset(0px 100% 0px 0px)' && clip !== 'inset(0px 0% 0px 0px)';
    });
    await page.waitForTimeout(2200);
    assert.equal(await cards.nth(2).evaluate(e => getComputedStyle(e).opacity), '1');
    assert.equal(await plot.evaluate(e => getComputedStyle(e).clipPath), 'inset(0px 0% 0px 0px)');
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.waitForTimeout(100);
    assert.ok(await cards.evaluateAll(es => es.every(e => getComputedStyle(e).opacity === '1' && !e.style.transform)));
    assert.ok(await section.locator('[class*=plot]').evaluateAll(es => es.every(e => getComputedStyle(e).clipPath === 'none')));
    const logo = await page.locator('header img').evaluate(e => e.getBoundingClientRect().left);
    assert.ok(await section.locator('h2').evaluate(e => e.getBoundingClientRect().right <= innerWidth));
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({width, textReveal:'pass', bars:'pass', graphReveal:'pass', mobileSwipe:width<600?'pass':'n/a', reducedMotion:'pass', textBounds:'pass', errors}));
    await page.close();
  }
  await browser.close();
})().catch(e => {console.error(e);process.exit(1)});

