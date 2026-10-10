const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({headless:true});
  for (const width of [1440, 768, 390, 320]) {
    const page = await browser.newPage({viewport:{width,height:960},reducedMotion:'reduce'});
    const errors=[]; page.on('pageerror', e=>errors.push(e.message));
    await page.goto('http://localhost:3000', {waitUntil:'networkidle'});
    await page.locator('#why-meddy').scrollIntoViewIfNeeded();
    await page.evaluate(()=>document.fonts.ready);
    await page.locator('#why-meddy').screenshot({path:`tmp/most-care-${width}.png`});
    console.log(JSON.stringify({width,box:await page.locator('#why-meddy').boundingBox(),errors,overflow:await page.locator('#why-meddy').evaluate(el=>el.scrollWidth>el.clientWidth)}));
    await page.close();
  }
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
