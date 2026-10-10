const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  for (const width of [282, 320, 390, 540, 767, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const footer = page.locator('#pricing > div').last();
    await footer.evaluate(async el => {
      el.scrollIntoView();
      await Promise.all([...el.querySelectorAll('img')].map(img => { img.loading = 'eager'; return img.decode().catch(() => {}); }));
    });
    const state = await footer.evaluate(el => {
      const navs = [...el.querySelectorAll('nav')].filter(n => getComputedStyle(n).display !== 'none');
      const buttons = [...el.querySelectorAll('button')];
      return {
        overflow: document.documentElement.scrollWidth > innerWidth,
        visibleNavs: navs.length,
        links: navs[0].querySelectorAll('a').length,
        badgesFit: buttons.every(b => b.scrollWidth <= b.clientWidth),
        badgesSameRow: Math.abs(buttons[0].getBoundingClientRect().top - buttons[1].getBoundingClientRect().top) < 1,
        brokenImages: [...el.querySelectorAll('img')].some(img => !img.naturalWidth),
      };
    });
    console.log(JSON.stringify({ width, errors, ...state }));
    if (errors.length || state.overflow || state.visibleNavs !== 1 || state.links !== 16 || !state.badgesFit || state.brokenImages || (width < 768 && !state.badgesSameRow)) throw Error('Footer check failed');
    if (width === 390) await footer.screenshot({ path: 'tmp/home-footer-mobile-390.png' });
    await page.close();
  }
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
