const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch();
 try {
  for (const [width,height] of [[1440,900],[390,844],[320,740],[1440,1200]]) {
   const page = await browser.newPage({viewport:{width,height}});
   const errors=[]; page.on('pageerror', e=>errors.push(e.message));
   await page.goto('http://localhost:3000/why-meddy',{waitUntil:'networkidle'});
   await page.waitForTimeout(2100);
   assert.equal(await page.locator('[data-why-chapter]').count(),5);
   await page.screenshot({path:`tmp/why-meddy-hero-${width}-${height}.png`});
   const geometry = await page.locator('[data-why-chapter]').evaluateAll(ns=>ns.map(n=>({chapter:n.dataset.whyChapter,height:n.offsetHeight})));
   for (let y=0; y<await page.evaluate(()=>document.documentElement.scrollHeight); y+=200) {
    await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}), y);
    await page.waitForTimeout(45);
   }
   await page.waitForTimeout(1600);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no horizontal overflow');
   assert.ok(await page.locator('[data-why-heading], [data-why-copy], [data-why-closing-copy] > *, [data-why-posters] > div, [data-why-context]').evaluateAll(ns=>ns.every(n=>Number(getComputedStyle(n).opacity)>.99)),'content revealed');
   assert.ok(await page.locator('[data-why-progress]').evaluate(n=>new DOMMatrix(getComputedStyle(n).transform).m11>.98),'progress completes');
   const tiles = page.locator(width<768?'[data-why-picture-mobile] > div':'[data-why-tile]');
   assert.ok(await tiles.evaluateAll(ns=>ns.every(n=>Number(getComputedStyle(n).opacity)>.99)),'mark assembled');
   await page.locator('[data-why-chapter="picture"]').scrollIntoViewIfNeeded();
   await page.waitForTimeout(1800);
   await page.screenshot({path:`tmp/why-meddy-picture-${width}-${height}.png`});
   await page.emulateMedia({reducedMotion:'reduce'});
   await page.waitForTimeout(350);
   assert.equal(await page.locator('.pin-spacer').count(),0);
   assert.ok(await page.locator('[data-why-heading], [data-why-copy], [data-why-tile], [data-why-posters] > div, [data-why-context]').evaluateAll(ns=>ns.every(n=>getComputedStyle(n).opacity==='1' && getComputedStyle(n).transform==='none')),'reduced motion restores content');
   await page.emulateMedia({reducedMotion:'no-preference'});
   await page.setViewportSize({width:width===1440?390:1440,height:900});
   await page.waitForTimeout(500);
   assert.equal(await page.locator('.pin-spacer').count(),0,'resize removes desktop pin');
   assert.deepEqual(errors,[],'browser errors');
   console.log(JSON.stringify({width,height,geometry,scroll:'pass',reducedMotion:'pass',resize:'pass',errors}));
   await page.close();
  }
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
