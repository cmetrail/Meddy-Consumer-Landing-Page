const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch();
 for(const width of [1440,800,390,320]){
  const page=await browser.newPage({viewport:{width,height:960}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:3000/wearables',{waitUntil:'networkidle'});
  await page.waitForTimeout(1200);
  const root=page.locator('#wearables-platforms');
  const cards=root.locator('[data-platform-card]');
  if(width>=768){
   assert.equal(await root.getAttribute('data-platform-motion'),'showcase');
   const pin=root.locator('[data-platform-pin]');
   const start=await pin.evaluate(el=>el.getBoundingClientRect().top+scrollY-80);
   const distance=960*3.6;
   for(let i=0;i<4;i++){
    const progress=(.3+i*1.8+1.15)/8.75;
    await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),start+distance*progress);
    await page.waitForTimeout(1400);
    const state=await cards.evaluateAll(nodes=>nodes.map(n=>({opacity:+getComputedStyle(n).opacity,width:n.getBoundingClientRect().width})));
    assert.ok(state[i].opacity>.99,JSON.stringify(state));
    assert.ok(state.filter((_,j)=>j!==i).every(n=>n.opacity<.05),JSON.stringify(state));
    await root.screenshot({path:`tmp/platforms-${width}-focus-${i}.png`});
   }
   await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),start+distance);
   await page.waitForTimeout(1400);
   assert.ok(await cards.evaluateAll(ns=>ns.every(n=>+getComputedStyle(n).opacity>.99)));
   await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),start+distance*.16);
   await page.waitForTimeout(1400);
   assert.ok(await cards.first().evaluate(n=>+getComputedStyle(n).opacity>.99));
  }else{
   await cards.nth(1).scrollIntoViewIfNeeded();await page.waitForTimeout(1200);
   await cards.nth(1).screenshot({path:`tmp/platforms-${width}-mobile.png`});
  }
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(400);
  assert.equal(await root.getAttribute('data-platform-motion'),null);
  assert.ok(await cards.evaluateAll(ns=>ns.every(n=>+getComputedStyle(n).opacity===1)));
  assert.equal(await page.locator('.pin-spacer').filter({has:root.locator('[data-platform-pin]')}).count(),0);
  assert.deepEqual(errors,[]);
  console.log(JSON.stringify({width,focus:'passed',reducedMotion:'passed',errors}));
  await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
