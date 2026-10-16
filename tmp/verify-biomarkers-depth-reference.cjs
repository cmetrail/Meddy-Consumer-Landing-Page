const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch();
 for(const [width,height] of [[292,638],[320,740],[390,844],[768,1024],[1440,900]]) {
  const page=await browser.newPage({viewport:{width,height}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:3000/biomarkers',{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  await page.locator('#depth').scrollIntoViewIfNeeded();
  const y=await page.locator('#depth').evaluate(n=>n.getBoundingClientRect().top+scrollY);
  await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);
  await page.waitForTimeout(1100);
  await page.screenshot({path:`tmp/biomarkers-depth-reference-${width}.png`});
  assert.ok(await page.locator('#depth').evaluate(n=>n.scrollWidth<=innerWidth),'section has no overflow');
  if(width<1024){
   const snapshots=page.locator('[data-depth-mobile-snapshot]');
   assert.ok(await snapshots.nth(0).evaluate(n=>getComputedStyle(n).opacity==='1'),'initial month visible');
   await page.evaluate(y=>scrollTo({top:y+innerHeight*2.95,behavior:'instant'}),y);
   await page.waitForTimeout(1200);
   assert.ok(await snapshots.nth(3).evaluate(n=>getComputedStyle(n).opacity==='1'),'final month visible');
   assert.equal(await snapshots.nth(3).getAttribute('aria-hidden'),'false');
   await page.emulateMedia({reducedMotion:'reduce'});
  }
  assert.deepEqual(errors,[]);
  console.log(JSON.stringify({width,height,layout:'pass',months:width<1024?'pass':'desktop',errors}));
  await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
