const {chromium}=require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
const browser=await chromium.launch();
for(const width of [1440,390,320]){
 const page=await browser.newPage({viewport:{width,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3000/longevity',{waitUntil:'networkidle'});
 const root=page.locator('.changes-scroll');
 const box=await root.boundingBox();
 if(width===1440){
  const stickyH=await page.locator('.changes-sticky').evaluate(el=>el.offsetHeight);
  const start=box.y-Math.min(0,1000-stickyH),end=box.y+box.height-1000;
  for(const [name,progress] of [['graph',0.12],['summary1',0.25],['summary2',0.6],['summary3',0.99]]){
   await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),start+(end-start)*progress);
   await page.waitForTimeout(300);
   await page.screenshot({path:`tmp/longevity-${name}-${width}.png`});
   console.log(name,await root.locator('.changes-cards [data-change-summary]').evaluateAll(els=>els.map(el=>({visible:getComputedStyle(el).visibility,opacity:getComputedStyle(el).opacity}))));
  }
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(200);
  console.log('reduced',await root.locator('.changes-cards [data-change-summary]').evaluateAll(els=>els.map(el=>getComputedStyle(el).visibility)));
 }else{
  await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),box.y+300);
  await page.screenshot({path:`tmp/longevity-summary-${width}.png`});
 }
 console.log({width,errors,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});
 await page.close();
}
await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
