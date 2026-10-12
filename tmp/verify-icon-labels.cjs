const {chromium}=require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch();
 for(const width of [1440,768,390,320]){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
  await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
  const strip=page.locator('[data-hmw-strip]');
  await strip.scrollIntoViewIfNeeded();
  await strip.locator('img').evaluateAll(async imgs=>await Promise.all(imgs.map(img=>img.decode().catch(()=>{}))));
  await strip.screenshot({path:`tmp/icon-labels-${width}.png`});
  const state=await strip.evaluate(el=>({labels:[...el.querySelectorAll('span')].map(s=>s.textContent),overflow:el.scrollWidth>el.clientWidth,broken:[...el.querySelectorAll('img')].some(i=>!i.naturalWidth)}));
  if(state.labels.length!==6||state.overflow||state.broken)throw new Error(JSON.stringify(state));
  console.log(JSON.stringify({width,...state}));
  await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
