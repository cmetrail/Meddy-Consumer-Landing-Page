const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch();
 try {
 for (const width of [1440, 390, 320]) {
  const page = await browser.newPage({viewport:{width,height:960}});
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:3000/nutrition',{waitUntil:'networkidle'});
  const hero=page.locator('#nutrition-hero');
  const stage=hero.locator(width>=1024?'[data-nutrition-desktop]':'[data-nutrition-mobile]');
  await page.waitForTimeout(3000);
  assert.equal(await stage.locator('[data-food]').evaluate(e=>getComputedStyle(e).opacity),'1');
  assert.ok(await stage.locator('[data-nutrient]').evaluateAll(ns=>ns.every(e=>getComputedStyle(e).opacity==='1')));
  const before=await stage.locator('[data-float]').evaluate(e=>getComputedStyle(e).transform);
  await page.waitForTimeout(300);
  assert.notEqual(before,await stage.locator('[data-float]').evaluate(e=>getComputedStyle(e).transform),'ambient float');
  if(width>=1024){
   await page.mouse.move(1300,400); await page.waitForTimeout(1400);
   assert.ok(await stage.locator('[data-pointer]').evaluate(e=>Math.abs(new DOMMatrix(getComputedStyle(e).transform).m41)>1),'pointer parallax');
  }
  await page.evaluate(()=>window.scrollTo({top:300,behavior:'instant'})); await page.waitForTimeout(1500);
  assert.ok(await stage.locator('[data-depth]').evaluate(e=>new DOMMatrix(getComputedStyle(e).transform).m42 < -2),'scroll depth');
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'})); await page.waitForTimeout(1500);
  await hero.screenshot({path:`tmp/nutrition-gsap-${width}.png`});
  await page.emulateMedia({reducedMotion:'reduce'}); await page.waitForTimeout(200);
  assert.equal(await stage.locator('[data-float]').evaluate(e=>getComputedStyle(e).transform),'none');
  assert.equal(await stage.locator('[data-pointer]').evaluate(e=>getComputedStyle(e).transform),'none');
  assert.ok(await stage.locator('[data-nutrient], [data-food], [data-headline], [data-hero-copy]').evaluateAll(ns=>ns.every(e=>getComputedStyle(e).opacity==='1')));
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no horizontal overflow');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.setViewportSize({width:width>=1024?390:1440,height:960});
  await page.waitForTimeout(3000);
  const resized=hero.locator(width>=1024?'[data-nutrition-mobile]':'[data-nutrition-desktop]');
  assert.equal(await resized.locator('[data-food]').evaluate(e=>getComputedStyle(e).opacity),'1');
  assert.deepEqual(errors,[]);
  console.log(JSON.stringify({width,entrance:'pass',ambient:'pass',scroll:'pass',reducedMotion:'pass',resize:'pass',errors}));
  await page.close();
 }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
