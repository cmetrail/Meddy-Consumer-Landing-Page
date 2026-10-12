const {chromium}=require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch();
 for(const width of [1920,390]){
  const page=await browser.newPage({viewport:{width,height:958}});
  await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
  await page.waitForTimeout(1000);
  const button=page.getByRole('button',{name:'Open menu',exact:true});
  const expected=await button.locator('xpath=ancestor::header').locator('img').first().boundingBox();
  // Block future logo requests: the menu must render without fetching its mark.
  await page.route('**/*logo*.svg',route=>route.abort());
  for(let attempt=0;attempt<3;attempt++){
   await button.click();
   const dialog=page.getByRole('dialog',{name:'Main navigation'});
   await dialog.waitFor({state:'visible'});
   const logo=dialog.getByRole('link',{name:'Meddy Health home'});
   const state=await logo.evaluate(el=>{
    const r=el.getBoundingClientRect();
    const ancestors=[];
    for(let p=el;p;p=p.parentElement) ancestors.push(getComputedStyle(p).clipPath);
    return {x:r.x,y:r.y,width:r.width,height:r.height,ancestors,svg:!!el.querySelector('svg')};
   });
   assert.ok(state.svg);
   assert.ok(state.ancestors.every(v=>v==='none'));
   for(const key of ['x','y','width','height']) assert.ok(Math.abs(state[key]-expected[key])<1);
   await page.keyboard.press('Escape');
   await dialog.waitFor({state:'detached'});
  }
  console.log(JSON.stringify({width,immediateLogo:'pass',aligned:'pass',repeatedOpens:3}));
  await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
