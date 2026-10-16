const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch();
 try {
  for (const width of [1440,390,320]) {
   const page=await browser.newPage({viewport:{width,height:900}});
   const errors=[]; page.on('pageerror',e=>errors.push(e.message));
   await page.goto('http://localhost:3000/biomarkers',{waitUntil:'networkidle'});
   await page.waitForTimeout(2400);
   assert.equal(await page.locator('[data-bio-hero]').count(),1);
   await page.screenshot({path:`tmp/biomarkers-hero-${width}.png`});
   assert.ok(await page.locator('[data-bio-intro]').evaluateAll(ns=>ns.every(n=>Number(getComputedStyle(n).opacity)>.99)),'hero revealed');
   for (let y=0; y<await page.evaluate(()=>document.documentElement.scrollHeight); y+=500) {
    await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),y);
    await page.waitForTimeout(65);
   }
   await page.waitForTimeout(1800);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no horizontal overflow');
   const hidden=await page.locator('[data-bio-reveal], [data-bio-card]').evaluateAll(ns=>ns.filter(n=>n.getClientRects().length && Number(getComputedStyle(n).opacity)<.99).map(n=>n.textContent.slice(0,80)));
   assert.deepEqual(hidden,[],'all scroll content revealed');
   await page.locator('[aria-label="Next biomarker categories"]').click();
   await page.waitForTimeout(600);
   assert.ok(await page.locator('#biomarkers-breadth-carousel').evaluate(n=>n.scrollLeft>0),'breadth arrows work');
   await page.locator('[data-ce-tab]').nth(1).click();
   await page.waitForTimeout(650);
   assert.equal(await page.locator('[data-ce-tab]').nth(1).getAttribute('aria-pressed'),'true');
   await page.screenshot({path:`tmp/biomarkers-cause-effect-${width}.png`});
   await page.emulateMedia({reducedMotion:'reduce'});
   await page.waitForTimeout(350);
   assert.ok(await page.locator('[data-bio-intro], [data-bio-reveal], [data-bio-card]').evaluateAll(ns=>ns.every(n=>getComputedStyle(n).opacity==='1' && getComputedStyle(n).transform==='none')),'reduced motion restores content');
   await page.locator('[data-ce-tab]').nth(2).click();
   assert.equal(await page.locator('#cause-effect-chart > div').evaluate(n=>getComputedStyle(n).opacity),'1');
   await page.emulateMedia({reducedMotion:'no-preference'});
   await page.setViewportSize({width:width===1440?390:1440,height:900});
   await page.waitForTimeout(1600);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'resize no overflow');
   assert.deepEqual(errors,[]);
   console.log(JSON.stringify({width,reveals:'pass',carousel:'pass',tabs:'pass',reducedMotion:'pass',resize:'pass',errors}));
   await page.close();
  }
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
