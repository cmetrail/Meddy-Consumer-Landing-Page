const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true});
 for(const [width,height,reduce] of [[1440,1024,false],[1024,768,false],[390,844,false],[320,700,true]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:reduce?'reduce':'no-preference'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:3000/weight-loss',{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  const section=page.locator('#weight-loss-plan');
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await section.screenshot({path:`tmp/weight-loss-plan-reference-${width}.png`});
  console.log(JSON.stringify({width,errors,box:await section.boundingBox(),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),images:await section.locator('img').evaluateAll(es=>es.map(e=>({src:e.getAttribute('src'),loaded:e.complete&&e.naturalWidth>0,w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height}))),tags:await section.locator('li').count()}));
  await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
