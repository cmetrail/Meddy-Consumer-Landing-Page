const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  for (const width of [282, 320, 390, 540, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.locator('#testimonials').scrollIntoViewIfNeeded();
    await page.locator('#testimonials').evaluate(async section => {
      await Promise.all([...section.querySelectorAll('img')].filter(img => img.getBoundingClientRect().width > 0).map(img => {
        img.loading = 'eager';
        return Promise.race([img.decode().catch(() => {}), new Promise(resolve => setTimeout(resolve, 5000))]);
      }));
    });
    await page.locator('#testimonials').screenshot({ path: `tmp/testimonials-${width}.png` });
    const state = await page.locator('#testimonials').evaluate(section => ({
      width: section.clientWidth,
      height: section.clientHeight,
      headings: [...section.querySelectorAll('h2')].filter(node => node.getBoundingClientRect().width > 0).length,
      overflow: document.documentElement.scrollWidth > innerWidth,
      brokenImages: [...section.querySelectorAll('img')].filter(img => img.getBoundingClientRect().width > 0 && (!img.complete || !img.naturalWidth)).length,
      brokenSources: [...section.querySelectorAll('img')].filter(img => img.getBoundingClientRect().width > 0 && (!img.complete || !img.naturalWidth)).map(img => img.src),
    }));
    console.log(JSON.stringify({ width, errors, ...state }));
    if (errors.length || state.overflow || state.brokenImages || state.headings !== 1) throw new Error('Responsive layout check failed');
    await page.close();
  }
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
