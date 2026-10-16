const {chromium}=require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch();
 try {
  for(const width of [1440,390,320]) {
   const page=await browser.newPage({viewport:{width,height:900}});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto('http://localhost:3000/weight-loss',{waitUntil:'networkidle'});
   await page.waitForTimeout(2800);
   const hero=page.locator('#weight-loss-hero');
   assert.equal(await hero.locator('[data-wl-line]').count(),3);
   assert.ok(await hero.locator('[data-wl-line]').evaluateAll(ns=>ns.every(n=>Math.abs(new DOMMatrix(getComputedStyle(n).transform).m42)<1)),'headlines settled');
   assert.ok(await hero.locator('[data-wl-reveal]').evaluateAll(ns=>ns.every(n=>getComputedStyle(n).opacity==='1')),'copy and CTA revealed');
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no overflow');
   assert.equal(await hero.locator('[data-wl-cta]').getAttribute('href'),'/book-consultation');
   await page.screenshot({path:`tmp/weight-loss-hero-motion-${width}.png`});
   const ring=hero.locator('[data-wl-pointer]:visible').first();
   if(width===1440) {
    await page.mouse.move(1350,180);await page.waitForTimeout(1400);
    assert.ok(await ring.evaluate(n=>Math.abs(new DOMMatrix(getComputedStyle(n).transform).m41)>1),'pointer depth responds');
    await hero.locator('[data-wl-cta]').hover();await page.waitForTimeout(500);
    assert.ok(await hero.locator('[data-wl-cta]').evaluate(n=>new DOMMatrix(getComputedStyle(n).transform).m11>1.01),'CTA hover responds');
    await page.mouse.move(1430,880);
    await page.evaluate(()=>window.scrollTo({top:450,behavior:'instant'}));await page.waitForTimeout(1600);
    assert.ok(await hero.locator('[data-wl-copy]').evaluate(n=>new DOMMatrix(getComputedStyle(n).transform).m42<-5),'desktop scroll depth responds');
   }
   await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(250);
   assert.ok(await hero.locator('[data-wl-line], [data-wl-reveal], [data-wl-ring], [data-wl-float], [data-wl-pointer], [data-wl-photo], [data-wl-copy], [data-wl-cta]').evaluateAll(ns=>ns.every(n=>getComputedStyle(n).opacity==='1'&&getComputedStyle(n).transform==='none')),'reduced motion restores baseline');
   await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
   await page.screenshot({path:`tmp/weight-loss-hero-reduced-${width}.png`});
   await page.emulateMedia({reducedMotion:'no-preference'});
   await page.setViewportSize({width:width===1440?390:1440,height:900});await page.waitForTimeout(2600);
   assert.ok(await hero.locator('[data-wl-reveal]').evaluateAll(ns=>ns.every(n=>getComputedStyle(n).opacity==='1')),'resize rebuilds entrance');
   assert.deepEqual(errors,[]);
   console.log(JSON.stringify({width,entrance:'pass',interaction:'pass',reducedMotion:'pass',resize:'pass',errors}));
   await page.close();
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
