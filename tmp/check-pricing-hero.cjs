const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({headless:true});
  const page = await browser.newPage();
  for (const [width,height] of [[282,615],[390,844],[767,1024],[1440,910]]) {
    await page.setViewportSize({width,height});
    await page.goto('http://localhost:3000/pricing');
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(700);
    console.log(await page.locator('h1').evaluate(el=>({width:innerWidth,pageWidth:document.documentElement.scrollWidth,headline:el.getBoundingClientRect().toJSON(),children:[...el.querySelectorAll('span,img')].map(e=>({text:e.textContent,rect:e.getBoundingClientRect().toJSON()}))})));
    await page.screenshot({path:`tmp/pricing-hero-${width}.png`});
    if (width===390) {
      await page.getByRole('button',{name:'Toggle menu'}).click();
      await page.getByRole('button',{name:'Close menu'}).waitFor({state:'visible'});
      await page.getByRole('button',{name:'Close menu'}).click();
    }
  }
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
