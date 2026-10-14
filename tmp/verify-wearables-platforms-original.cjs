const {chromium}=require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const b=await chromium.launch();
 for(const width of [1440,800,390,320]){
  const p=await b.newPage({viewport:{width,height:960}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto('http://localhost:3000/wearables',{waitUntil:'networkidle'});await p.waitForTimeout(800);
  const rows=p.locator('[data-platform-row]');
  const geometry=()=>p.locator('[data-platform-card]').evaluateAll(ns=>ns.map(n=>{const r=n.getBoundingClientRect();return {x:r.x,width:r.width,height:r.height}}));
  const original=await geometry();
  if(width>=768){
   for(let row=0;row<2;row++){
    const start=await rows.nth(row).evaluate(n=>n.getBoundingClientRect().top+scrollY-Math.max(80,(innerHeight-n.offsetHeight)/2));
    for(let card=0;card<2;card++){
     await p.evaluate(y=>scrollTo({top:y,behavior:'instant'}),start+1440*(.2+card*1.5+.9)/3.9);
     await p.waitForTimeout(1100);
     const opacity=await rows.nth(row).locator('[data-platform-card]').evaluateAll(ns=>ns.map(n=>+getComputedStyle(n).opacity));
     assert.ok(opacity[card]>.99);assert.ok(opacity[1-card]<.51);
     assert.deepEqual(await geometry(),original,'Card geometry remains unchanged while focused');
     if(row===0&&card===0)await p.screenshot({path:`tmp/platforms-original-${width}.png`});
    }
   }
  }else{
   await rows.first().locator('[data-platform-card]').first().scrollIntoViewIfNeeded();await p.waitForTimeout(1000);
   assert.deepEqual(await geometry(),original);
   await p.screenshot({path:`tmp/platforms-original-${width}.png`});
  }
  await p.emulateMedia({reducedMotion:'reduce'});await p.waitForTimeout(350);
  assert.deepEqual(await geometry(),original,'Reduced motion retains original geometry');
  assert.ok(await p.locator('[data-platform-card]').evaluateAll(ns=>ns.every(n=>+getComputedStyle(n).opacity===1)));
  assert.equal(await p.locator('[id*=wearables-platform-row]').count(),0);
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.deepEqual(errors,[]);console.log(JSON.stringify({width,geometry:'passed',focus:'passed',reducedMotion:'passed'}));await p.close();
 }
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
