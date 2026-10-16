const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch();
 try {
  for (const width of [1440, 390, 320]) {
   const page = await browser.newPage({viewport:{width,height:900}});
   const errors=[]; page.on('pageerror', e=>errors.push(e.message));
   await page.goto('http://localhost:3000/physician-care',{waitUntil:'networkidle'});
   await page.waitForTimeout(2800);
   assert.equal(await page.locator('[data-pc-chapter]').count(),7);
   assert.equal(await page.locator('.pin-spacer').count(), width===1440?1:0,'desktop-only pin');
   for (let y=0; y<await page.evaluate(()=>document.documentElement.scrollHeight); y+=420) {
    await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}), y);
    await page.waitForTimeout(75);
   }
   await page.waitForTimeout(2400);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no horizontal overflow');
   assert.ok(await page.locator('[data-pc-reveal], [data-pc-service], [data-pc-faq], [data-pc-milestone], [data-pc-profile-copy]').evaluateAll(ns=>ns.every(n=>getComputedStyle(n).opacity==='1')),'all content revealed');
   assert.ok(await page.locator('[data-pc-progress]').evaluate(n=>new DOMMatrix(getComputedStyle(n).transform).m11>.98),'progress complete');
   await page.locator('[data-pc-faq] button').nth(1).click();
   assert.equal(await page.locator('[data-pc-faq] button').nth(1).getAttribute('aria-expanded'),'true');
   await page.locator('[data-pc-chapter]').nth(3).scrollIntoViewIfNeeded();
   await page.waitForTimeout(1700);
   await page.screenshot({path:`tmp/physician-story-${width}.png`});
   await page.emulateMedia({reducedMotion:'reduce'});
   await page.waitForTimeout(250);
   assert.equal(await page.locator('.pin-spacer').count(),0,'reduced motion removes pin');
   assert.ok(await page.locator('[data-pc-reveal], [data-pc-service], [data-pc-milestone], [data-pc-profile-copy]').evaluateAll(ns=>ns.every(n=>getComputedStyle(n).opacity==='1' && getComputedStyle(n).transform==='none')),'reduced motion restores all content');
   await page.emulateMedia({reducedMotion:'no-preference'});
   await page.setViewportSize({width:width===1440?390:1440,height:900});
   await page.waitForTimeout(500);
   assert.equal(await page.locator('.pin-spacer').count(),width===1440?0:1,'resize rebuilds pin');
   assert.deepEqual(errors,[],'no browser errors');
   console.log(JSON.stringify({width,scroll:'pass',faq:'pass',reducedMotion:'pass',resize:'pass',errors}));
   await page.close();
  }
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
