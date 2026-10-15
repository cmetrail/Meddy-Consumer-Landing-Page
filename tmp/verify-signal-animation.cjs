const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  for (const width of [1440, 390]) {
    for (const reducedMotion of ['no-preference', 'reduce']) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://localhost:3000/how-it-works', { waitUntil: 'networkidle' });
      const section = page.locator('section[aria-labelledby="signal-heading"]');
      const sample = () => section.evaluate(root => ({
        lines: [...root.querySelectorAll('h2 > span')].map(el => Number(getComputedStyle(el).opacity)),
        values: [...root.querySelectorAll('p[aria-label]')].map(el => el.textContent),
        chartLines: [...root.querySelectorAll('svg[role="img"] > path[fill="none"]')].map(el => el.getAttribute('stroke-dasharray')),
        endpoints: [...root.querySelectorAll('svg[role="img"] > g')].map(el => Number(getComputedStyle(el).opacity)),
        cardOpacity: Number(getComputedStyle(root.querySelector('p[aria-label]').closest('.mobile-glass-card')).opacity),
        overflow: document.documentElement.scrollWidth > window.innerWidth,
      }));
      const before = await sample();
      if (reducedMotion === 'no-preference' && (before.cardOpacity !== 0 || before.lines.some(value => value !== 0))) throw Error('Animation started before scrolling: ' + JSON.stringify(before));
      if (reducedMotion === 'reduce' && (before.cardOpacity !== 1 || before.values.join() !== '32g,9,100' || before.lines.some(value => value !== 1))) throw Error('Reduced motion hides content: ' + JSON.stringify(before));
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(550);
      const during = await sample();
      await page.waitForTimeout(2000);
      const after = await sample();
      if (after.cardOpacity !== 1 || after.lines.some(value => value !== 1) || after.values.join() !== '32g,9,100' || after.endpoints.some(value => value !== 1) || after.overflow) throw Error('Incomplete reveal: ' + JSON.stringify(after));
      if (reducedMotion === 'no-preference' && during.values.join() === after.values.join()) throw Error('Values did not animate');
      await section.screenshot({ path: `tmp/signal-${width}-${reducedMotion}.png` });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      await section.scrollIntoViewIfNeeded();
      const reentry = await sample();
      if (reentry.values.join() !== after.values.join() || reentry.cardOpacity !== 1) throw Error('Animation replayed on reentry');
      if (errors.length) throw Error(JSON.stringify(errors));
      console.log(JSON.stringify({ width, reducedMotion, before, during, after }));
      await page.close();
    }
  }
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
