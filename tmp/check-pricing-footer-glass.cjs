const{chromium}=require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
for(const width of [1440,390]){await p.setViewportSize({width,height:900});await p.goto('http://localhost:3000/pricing');await p.evaluate(()=>document.fonts.ready);
const footer=p.locator('[data-footer-nav]').locator('../..').locator('..');
await footer.scrollIntoViewIfNeeded();await p.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight));await p.waitForTimeout(1200);
console.log(await footer.evaluate(e=>({width:innerWidth,pageWidth:document.documentElement.scrollWidth,blur:getComputedStyle(e).backdropFilter,background:getComputedStyle(e).backgroundColor,border:getComputedStyle(e).borderTop,radius:getComputedStyle(e).borderRadius})));
await p.screenshot({path:`tmp/pricing-footer-glass-${width}.png`});}
await b.close();})().catch(e=>{console.error(e);process.exit(1)});
