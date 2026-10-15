const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  for (const width of [711, 390, 320]) {
    await page.setViewportSize({ width, height: 850 });
    for (const variant of ['nutrition', 'fitness', 'sleep']) {
      const root = page.locator(`[data-variant=${variant}]`);
      await root.scrollIntoViewIfNeeded();
      await root.screenshot({ path: `tmp/mobile-graph-${variant}-${width}.png` });
      const layout = await root.evaluate(element => {
        const heading = element.querySelector('header');
        const summary = element.querySelector('[data-reveal-x="680"]');
        const cards = [...element.querySelectorAll('[data-reveal-x="648"], [data-reveal-x="678"]')];
        return {
          centered: getComputedStyle(heading).textAlign === 'center',
          summaryBackground: getComputedStyle(summary).backgroundColor,
          summaryFont: getComputedStyle(summary.querySelector(':scope > p')).fontSize,
          cardsVisible: cards.every(card => card.getBoundingClientRect().width > 0),
          fits: cards.every(card => card.getBoundingClientRect().right <= innerWidth),
          overflow: document.documentElement.scrollWidth > innerWidth,
        };
      });
      if (!layout.centered || !layout.cardsVisible || !layout.fits || layout.overflow || parseFloat(layout.summaryFont) < 14 || layout.summaryBackground !== 'rgba(0, 0, 0, 0)') throw Error(JSON.stringify({ width, variant, layout }));
      console.log(JSON.stringify({ width, variant, layout }));
    }
  }
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
