const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async () => {
 const browser = await chromium.launch();
 for (const width of [921, 1440, 390, 320]) {
  const page = await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:3000/how-it-works',{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  const section=page.locator('#track-your-day');
  await section.scrollIntoViewIfNeeded();
  await section.locator('img').evaluate(i=>i.decode());
  await section.screenshot({path:`tmp/track-your-day-${width}.png`});
  for (const name of ['Fitness','Sleep','Recovery','Nutrients']) {
   await section.getByRole('button',{name,exact:true}).click();
   if(await section.locator('h3').innerText()!==name) throw new Error('Tab failed: '+name);
  }
  console.log(JSON.stringify({width,errors,layout:await section.evaluate(s=>({width:s.clientWidth,height:s.clientHeight,overflow:s.scrollWidth>s.clientWidth,card:[...s.querySelectorAll('button')].map(b=>({label:b.innerText,width:b.clientWidth,height:b.clientHeight}))}))}));
  await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
