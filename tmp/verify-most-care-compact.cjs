const {chromium}=require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch();
 for(const width of [1440,1292,1024,768,390,320]){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
  const section=page.locator('#why-meddy');
  await section.scrollIntoViewIfNeeded();
  await section.locator('img').evaluateAll(async imgs=>await Promise.all(imgs.map(img=>{img.loading='eager';return img.decode().catch(()=>{});} )));
  await section.screenshot({path:`tmp/most-care-compact-${width}.png`});
  const state=await section.evaluate(el=>{
   const text=[...el.querySelectorAll('p,span,strong,b')].filter(n=>n.getBoundingClientRect().width>0&&!n.closest('svg'));
   return {width:el.clientWidth,height:el.clientHeight,overflow:el.scrollWidth>el.clientWidth,minFont:Math.min(...text.map(n=>parseFloat(getComputedStyle(n).fontSize))),broken:[...el.querySelectorAll('img')].some(i=>!i.naturalWidth),clipped:text.filter(n=>n.scrollWidth>n.clientWidth+2&&getComputedStyle(n).display!=='inline').map(n=>n.textContent)};
  });
  console.log(JSON.stringify({width,errors,...state}));
  if(state.overflow||state.broken||errors.length)throw new Error('Readability check failed');
  await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

