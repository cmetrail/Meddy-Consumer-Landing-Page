const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  for (const width of [593, 1440, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 1200 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('http://localhost:3000', {waitUntil:'networkidle'});
    const section = page.locator('#physician-care');
    await section.scrollIntoViewIfNeeded();
    await section.locator('img').evaluateAll(async imgs => { await Promise.all(imgs.map(img => { img.loading='eager'; return img.decode(); })); });
    await section.screenshot({path:`tmp/physician-${width}.png`});
    console.log(JSON.stringify({width, errors, state:await section.evaluate(s => ({height:s.clientHeight,overflow:document.documentElement.scrollWidth>innerWidth,images:[...s.querySelectorAll('img')].every(i=>i.complete&&i.naturalWidth),links:[...s.querySelectorAll('a')].map(a=>a.getAttribute('href'))}))}));
    await page.close();
  }
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
