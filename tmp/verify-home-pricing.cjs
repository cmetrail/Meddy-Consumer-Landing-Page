const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  for (const width of [282, 320, 390, 540, 767, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.locator('#pricing').evaluate(el => el.scrollIntoView());
    const state = await page.locator('#pricing').evaluate(el => {
      const cards = [...el.querySelectorAll('[data-plan-card]')];
      const row = cards[0].parentElement;
      return {
        overflow: document.documentElement.scrollWidth > innerWidth,
        display: getComputedStyle(row).display,
        firstWidth: cards[0].clientWidth,
        nextX: cards[1].getBoundingClientRect().x,
        cardCount: cards.length,
        buttonOverflow: cards.some(card => {
          const button = card.querySelector('button');
          return button.scrollWidth > button.clientWidth;
        }),
      };
    });
    if (width < 768) {
      const row = page.getByRole('region', { name: 'Pricing plans' });
      await row.evaluate(el => el.scrollTo({ left: el.scrollWidth, behavior: 'instant' }));
      await page.waitForTimeout(200);
      state.swiped = await row.evaluate(el => el.scrollLeft > 0 && el.lastElementChild.getBoundingClientRect().right <= innerWidth);
    }
    console.log(JSON.stringify({ width, errors, ...state }));
    if (errors.length || state.overflow || state.buttonOverflow || state.cardCount !== 3 || (width < 768 && !state.swiped)) throw Error('Layout check failed');
    await page.close();
  }
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
