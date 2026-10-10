const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
const browser=await chromium.launch({headless:true});
for (const [width,height] of [[1440,900],[1920,1080],[1024,900],[1440,702],[390,844]]) {
const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
await page.evaluate(()=>document.fonts.ready);
const section=page.locator('#sleep-monitoring');
await section.scrollIntoViewIfNeeded(); await section.locator("img").evaluateAll(images => Promise.all(images.map(img => img.decode())));
await section.screenshot({path:`tmp/sleep-fill-${width}-${height}.png`});
console.log(width,height,await section.evaluate(el=>({height:el.clientHeight,width:el.clientWidth,scrollWidth:el.scrollWidth,pageWidth:document.documentElement.scrollWidth,cards:Array.from(el.querySelectorAll('[data-feature-card]')).map(c=>({x:c.getBoundingClientRect().x,right:c.getBoundingClientRect().right,bottomGap:el.getBoundingClientRect().bottom-c.getBoundingClientRect().bottom}))})));
await page.close();
}
await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

