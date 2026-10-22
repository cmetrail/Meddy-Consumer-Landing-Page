const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async () => {
 const browser = await chromium.launch({headless:true});
 for (const [width,height] of [[1440,955],[1920,1080],[1280,800],[1024,768],[768,1024],[390,844],[320,568]]) {
  const page = await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:3000/247-care',{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  const section=page.locator('section[aria-labelledby="care-questions-title"]');
  await section.scrollIntoViewIfNeeded();
  await section.screenshot({path:`tmp/care-questions-${width}.png`});
  const bounds=await section.evaluate(el=>{
   const rect=s=>{const r=el.querySelector(s).getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom}};
   const logo=document.querySelector('header a').getBoundingClientRect();
   return {logoX:logo.x,title:rect('h2'),intro:rect('p'),cards:rect('[data-cq-cards]'),note:rect('p:last-child'),illustration:rect('[data-cq-illustration]'),overflow:document.documentElement.scrollWidth>innerWidth};
  });
  console.log(JSON.stringify({width,height,...bounds,errors}));
  await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
