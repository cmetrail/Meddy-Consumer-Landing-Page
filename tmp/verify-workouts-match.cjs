const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
const browser=await chromium.launch({headless:true});
for (const width of [1440,390,320]) {
const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
await page.evaluate(()=>document.fonts.ready);
const section=page.locator('#workouts');
await section.scrollIntoViewIfNeeded();
await section.screenshot({path:`tmp/workouts-match-${width}.png`});
console.log(width,await section.boundingBox(),await section.evaluate(el=>({width:el.clientWidth,scrollWidth:el.scrollWidth,pageWidth:document.documentElement.scrollWidth}))); 
await page.close();
}
await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
