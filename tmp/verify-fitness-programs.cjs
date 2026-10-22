const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch();
  for (const width of [1440, 1920, 800, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    await page.goto('http://localhost:3000/fitness', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const section = page.locator('section[aria-labelledby="fitness-programs-heading"]');
    const metrics = await section.evaluate(section => {
      const cards = [...section.querySelectorAll('article')];
      const logo = document.querySelector('header img[alt="Meddy Health"]').getBoundingClientRect();
      return {
        logoLeft: logo.left,
        cardLeft: cards[0].getBoundingClientRect().left,
        overflow: document.documentElement.scrollWidth > innerWidth,
        cards: cards.map(card => {
          const title = card.querySelector('h3');
          const features = card.querySelectorAll('ul');
          const button = card.querySelector('button');
          const box = card.getBoundingClientRect();
          return {
            title: title.textContent,
            centered: Math.abs(title.getBoundingClientRect().left + title.getBoundingClientRect().width / 2 - box.left - box.width / 2) < 1,
            rowsFit: [...features].every(row => row.scrollWidth <= card.clientWidth),
            buttonBottom: box.bottom - button.getBoundingClientRect().bottom,
          };
        }),
      };
    });
    assert.ok(Math.abs(metrics.logoLeft - metrics.cardLeft) < 1, 'logo alignment');
    assert.equal(metrics.overflow, false, 'page overflow');
    assert.ok(metrics.cards.every(card => card.centered && card.rowsFit), 'card layout');
    await section.screenshot({ path: `tmp/fitness-programs-${width}.png` });
    console.log(JSON.stringify({ width, ...metrics }));
    await page.close();
  }
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
