const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async () => {
 const browser = await chromium.launch({headless:true});
 const page = await browser.newPage({viewport:{width:1012,height:800}});
 await page.goto('http://localhost:3000/pricing');
 await page.evaluate(() => document.fonts.ready);
 const panel = page.locator('[aria-labelledby="pricing-consultation-heading"]');
 await panel.scrollIntoViewIfNeeded();
 await page.waitForTimeout(1200);
 await panel.screenshot({path:'tmp/pricing-footer-desktop.png'});
 console.log(await panel.evaluate(el => ({height:el.offsetHeight, heading:el.querySelector('h2').textContent, button:el.querySelector('a').textContent})));
 await page.setViewportSize({width:390,height:844});
 await panel.scrollIntoViewIfNeeded();
 await panel.screenshot({path:'tmp/pricing-footer-mobile.png'});
 console.log(await page.evaluate(() => ({viewport:innerWidth,pageWidth:document.documentElement.scrollWidth})));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
