const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  const page = await browser.newPage({viewport:{width:1442,height:842},deviceScaleFactor:1});
  await page.goto('http://localhost:3000/pricing');
  await page.evaluate(() => document.fonts.ready);
  const section = page.getByRole('region', {name:'Meddy membership plans'});
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  console.log(await section.evaluate(el => ({rect:el.getBoundingClientRect().toJSON(),cards:[...el.querySelectorAll('article')].map(e=>({rect:e.getBoundingClientRect().toJSON(),filter:getComputedStyle(e).backdropFilter})),font:getComputedStyle(el.querySelector('h3')).fontFamily})));
  await section.screenshot({path:'tmp/pricing-plans-crop.png'});
  await page.setViewportSize({width:390,height:844});
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await section.screenshot({path:'tmp/pricing-plans-mobile.png'});
  console.log(await page.evaluate(() => ({viewport:innerWidth,pageWidth:document.documentElement.scrollWidth})));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
