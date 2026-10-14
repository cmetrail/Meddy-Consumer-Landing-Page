const {chromium}=require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const b=await chromium.launch();
 for(const [width,height] of [[320,700],[390,844],[480,800],[767,960],[667,375]]){
  const p=await b.newPage({viewport:{width,height}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto('http://localhost:3000/wearables',{waitUntil:'networkidle'});await p.waitForTimeout(500);
  const root=p.locator('#wearables-health-signals');const stage=root.locator('[data-signal-mobile]');const cards=stage.locator('[data-signal-card]');
  const start=await stage.evaluate(n=>n.getBoundingClientRect().top+scrollY-(innerHeight>=650?Math.max(88,(innerHeight-n.offsetHeight)/2):innerHeight*.85));
  const distance=height>=650?height*1.4:418+height*.55;
  for(const progress of [.2,1]){
   await p.evaluate(y=>scrollTo(0,y),start+distance*progress);await p.waitForTimeout(850);
   await p.screenshot({path:`tmp/health-mobile-${width}-${progress}.png`});
  }
  assert.ok(await cards.evaluateAll(ns=>ns.every(n=>+getComputedStyle(n).opacity===1)));
  assert.ok(await root.evaluate(n=>n.getBoundingClientRect().width<=innerWidth));
  const headingX=await root.locator('h2:visible').evaluate(n=>n.getBoundingClientRect().x);
  const logoX=await p.locator('header a').first().evaluate(n=>n.getBoundingClientRect().x);
  assert.ok(Math.abs(headingX-logoX)<1);
  assert.ok(await cards.evaluateAll(ns=>ns.every(n=>{const r=n.getBoundingClientRect();return [...n.querySelectorAll('h3,li')].every(t=>{const a=t.getBoundingClientRect();return a.x>=r.x&&a.right<=r.right+1&&a.bottom<=r.bottom})})));
  await p.emulateMedia({reducedMotion:'reduce'});await p.waitForTimeout(300);
  assert.ok(await cards.evaluateAll(ns=>ns.every(n=>+getComputedStyle(n).opacity===1)));
  assert.equal(await p.locator('.pin-spacer-wearables-health-signals').count(),0);
  assert.deepEqual(errors,[]);console.log({width,height,passed:true});await p.close();
 }
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});



