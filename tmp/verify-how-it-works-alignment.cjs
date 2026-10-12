const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch();
  for (const width of [320, 390, 768, 861, 1024, 1440, 1920]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    await page.goto('http://localhost:3000/how-it-works', { waitUntil: 'networkidle' });
    const logo = await page.locator('header img').evaluate(e => e.getBoundingClientRect().left);
    const headings = await page.locator('main > section h1, main > section h2').all();
    if (width < 1024) headings.push(page.locator('main > section').nth(4).locator('p').first());
    const results = [];
    for (const heading of headings) {
      if (await heading.evaluate(e => e.getBoundingClientRect().width === 0)) continue;
      await heading.evaluate(e => e.closest('section').scrollIntoView());
      const result = await heading.evaluate(e => ({ text: e.textContent.slice(0, 38), left: e.getBoundingClientRect().left }));
      assert.ok(Math.abs(result.left - logo) < 1, JSON.stringify({ width, logo, ...result }));
      results.push(result);
    }
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
    console.log(JSON.stringify({ width, logo, headings: results }));
    if ([390, 861, 1440, 1920].includes(width)) await page.locator('section[aria-labelledby=insights-heading]').screenshot({ path: `tmp/insights-aligned-${width}.png` });
    await page.close();
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
