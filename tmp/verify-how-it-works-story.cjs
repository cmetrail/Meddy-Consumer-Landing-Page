const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch();
 try {
  for(const width of [1440,390,320]){
   const page=await browser.newPage({viewport:{width,height:900}});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto('http://localhost:3000/how-it-works',{waitUntil:'networkidle'});
   await page.waitForTimeout(1800);
   assert.equal(await page.locator('[data-story-chapter]').count(),7);
   const sections=page.locator('[data-story-chapter]');
   for(let i=0;i<7;i++){
    const top=await sections.nth(i).evaluate(n=>n.getBoundingClientRect().top+scrollY);
    await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),top);
    await page.waitForTimeout(1700);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no overflow');
    if(i>0&&i<6) assert.equal(await page.locator('[data-story-nav]').evaluate(n=>getComputedStyle(n).visibility),'visible','nav visible in story');
    if(i===1){
     await page.getByRole('button',{name:'Fitness',exact:true}).click();
     assert.equal(await page.getByRole('button',{name:'Fitness',exact:true}).getAttribute('aria-pressed'),'true');
    }
    if(i===4) await page.screenshot({path:`tmp/how-it-works-story-${width}.png`});
   }
   assert.ok(await page.locator('[data-story-reveal]').evaluateAll(ns=>ns.filter(n=>n.getBoundingClientRect().width).every(n=>Number(getComputedStyle(n).opacity)>.99)),'all copy revealed');
   await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(300);
   assert.equal(await page.locator('.pin-spacer').count(),0,'reduced motion removes pin');
   assert.ok(await page.locator('[data-story-photo], [data-story-reveal], [data-story-portrait]').evaluateAll(ns=>ns.every(n=>!n.style.transform&&!n.style.opacity)),'GSAP reverts');
   await page.emulateMedia({reducedMotion:'no-preference'});
   await page.setViewportSize({width:width===1440?390:1440,height:900});await page.waitForTimeout(500);
   assert.deepEqual(errors,[]);
   console.log(JSON.stringify({width,scroll:'pass',tabs:'pass',reducedMotion:'pass',resize:'pass',errors}));
   await page.close();
  }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
