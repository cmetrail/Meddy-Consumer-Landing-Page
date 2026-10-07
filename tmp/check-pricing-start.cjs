const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async () => {
 const browser = await chromium.launch({headless:true});
 const page = await browser.newPage({viewport:{width:1439,height:900}});
 await page.goto('http://localhost:3000/pricing');
 await page.evaluate(() => document.fonts.ready);
 const section = page.locator('section').filter({has:page.getByRole('heading',{name:'Your health is more than healthcare.'})});
 await section.getByRole('heading').scrollIntoViewIfNeeded();
 await page.waitForTimeout(1600);
 await section.screenshot({path:'tmp/pricing-start-desktop.png'});
 console.log(await section.evaluate(el => [...el.querySelectorAll('h2,p')].map(e => ({text:e.textContent,rect:e.getBoundingClientRect().toJSON()}))));
 await page.setViewportSize({width:390,height:844});
 await section.getByRole('heading').scrollIntoViewIfNeeded();
 await page.waitForTimeout(500);
 await section.screenshot({path:'tmp/pricing-start-mobile.png'});
 console.log(await page.evaluate(() => ({viewport:innerWidth,pageWidth:document.documentElement.scrollWidth})));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

