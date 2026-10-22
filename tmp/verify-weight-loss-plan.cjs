const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async () => {
 const browser = await chromium.launch({headless:true});
 for (const [width,height,reduce] of [[1440,900,false],[1366,768,false],[1920,1080,false],[390,844,false],[320,568,false],[768,1024,false],[1440,900,true]]) {
  const page = await browser.newPage({viewport:{width,height},reducedMotion:reduce?'reduce':'no-preference'});
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:3000/weight-loss',{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  const section=page.locator('#weight-loss-plan');
  await page.waitForTimeout(700);
  const bounds=await section.evaluate(e=>({top:e.getBoundingClientRect().top+scrollY,height:e.offsetHeight}));
  await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),bounds.top);
  await page.waitForTimeout(600);
  const stages=[];
  if(width>=1024&&!reduce) {
   for(const i of [0,1,2,3,2,0]) {
    await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),bounds.top+(bounds.height-height)*(i+.35)/4);
    await page.waitForTimeout(180);
    stages.push(await section.locator('button[aria-current]').innerText());
   }
  }
  await section.locator('button').nth(2).click();
  await page.waitForTimeout(1400);
  const selected=await section.locator('button[aria-current]').innerText();
  const panel=await section.locator('article[data-active="true"]').boundingBox();
  await page.screenshot({path:`tmp/weight-loss-plan-${width}-${reduce?'reduced':'motion'}.png`});
  console.log(JSON.stringify({width,height,reduce,stages,selected,panel,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),errors}));
  await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});


