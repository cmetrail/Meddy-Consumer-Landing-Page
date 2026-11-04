const {chromium}=require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch();
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:3001',{waitUntil:'networkidle'});
  await page.evaluate(()=>window.scrollTo(0,1000));
  await page.waitForTimeout(300);
  console.log(await page.evaluate(()=>({y:scrollY,header:document.querySelector('header:has(nav)').parentElement.outerHTML.slice(0,350)}))); assert.equal(await page.locator('header:has(nav)').count(),1);
  assert.equal(await page.locator('header:has(nav)').evaluate(h=>h.parentElement.inert),true);
  await page.evaluate(()=>window.scrollBy(0,-5));
  await page.waitForTimeout(300);
  assert.equal(await page.locator('header:has(nav)').evaluate(h=>h.getBoundingClientRect().top),0);
  assert.equal(await page.locator('header:has(nav)').evaluate(h=>h.parentElement.inert),false);
  await page.getByRole('button',{name:'Open menu',exact:true}).click();
  await page.waitForTimeout(300);
  assert.equal(await page.getByRole('dialog').isVisible(),true);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  await page.evaluate(()=>window.scrollBy(0,30));
  await page.waitForTimeout(300);
  assert.equal(await page.locator('header:has(nav)').evaluate(h=>h.parentElement.inert),true);
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.waitForTimeout(300);
  console.log(await page.evaluate(()=>({y:scrollY,header:document.querySelector('header:has(nav)').parentElement.outerHTML.slice(0,350)}))); assert.equal(await page.locator('header:has(nav)').count(),1);
  assert.equal(await page.locator('header:has(nav)').evaluate(h=>h.getBoundingClientRect().top),0);
  assert.deepEqual(errors,[]);
  console.log(`PASS ${width}px: hides down, reveals after 5px up, menu works, restores at top`);
  await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});



