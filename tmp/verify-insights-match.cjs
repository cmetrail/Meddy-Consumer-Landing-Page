const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
const browser=await chromium.launch({headless:true});
for(const width of [1440,1920,1024,768,390,320]) {
const page=await browser.newPage({viewport:{width,height:width===1440?754:900},reducedMotion:'reduce'});
await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
await page.evaluate(()=>document.fonts.ready);
const section=page.locator('#health-insights');
await section.scrollIntoViewIfNeeded(); await section.locator("img").evaluate(img => img.decode());
await section.screenshot({path:`tmp/insights-match-${width}.png`});
console.log(width,await section.evaluate(el=>{const header=document.querySelector('header');const visual=el.querySelector('[data-feature-image]').getBoundingClientRect();const copy=el.querySelector('h3').parentElement.getBoundingClientRect();return{navbarLeft:header.querySelector('a').getBoundingClientRect().left,navbarRight:header.querySelector('button').getBoundingClientRect().right,visualLeft:visual.left,copyRight:copy.right,pageWidth:document.documentElement.scrollWidth,sectionWidth:el.scrollWidth}}));
await page.close();
}
await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

