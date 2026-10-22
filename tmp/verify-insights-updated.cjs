const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true});
 for(const width of [1916,1440,768,390,320]) {
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:3000/how-it-works',{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  const section=page.locator('[data-story-chapter="insights"]');
  await section.scrollIntoViewIfNeeded();
  await section.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));
  await section.screenshot({path:`tmp/insights-updated-${width}.png`});
  console.log(JSON.stringify({width,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),cards:await section.locator('[data-insights-card]').count(),errors}));
  await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
