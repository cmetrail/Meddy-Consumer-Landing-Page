const{chromium}=require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch();
for(const [width,height] of [[320,700],[390,844],[480,800],[767,960],[667,375]]){
 const p=await b.newPage({viewport:{width,height}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://localhost:3000/wearables',{waitUntil:'networkidle'});await p.waitForTimeout(700);
 const story=p.locator('[data-signal-mobile-story]');
 const start=await story.evaluate(n=>n.getBoundingClientRect().top+scrollY-(innerHeight>=650?24:innerHeight*.85));
 const distance=height>=650?height*1.4:await story.evaluate(n=>n.offsetHeight+innerHeight*.55);
 for(const progress of [.25,.65,.98]){
  await p.evaluate(y=>scrollTo(0,y),start+distance*progress);await p.waitForTimeout(900);
  if(height>=650){
   const rect=await story.boundingBox();assert.ok(Math.abs(rect.y-24)<2,JSON.stringify(rect));
   const h=await story.locator('h2').boundingBox();assert.ok(h.y>=20&&h.y<40);
   const gap=await story.evaluate(n=>{const heading=n.firstElementChild.getBoundingClientRect();const stack=n.querySelector('[data-signal-mobile]').getBoundingClientRect();return stack.top-heading.bottom});
   assert.ok(gap>=23&&gap<=25,gap);
   assert.ok(rect.y+rect.height<height,JSON.stringify(rect));
  }
  if(width===390)await p.screenshot({path:`tmp/health-heading-${progress}.png`});
 }
 await p.emulateMedia({reducedMotion:'reduce'});await p.waitForTimeout(300);
 assert.equal(await p.locator('.pin-spacer-wearables-health-signals').count(),0);
 assert.deepEqual(errors,[]);console.log({width,height,passed:true});await p.close();
}
await b.close();})().catch(e=>{console.error(e);process.exit(1)});
