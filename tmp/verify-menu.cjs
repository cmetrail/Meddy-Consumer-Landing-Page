const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch();
 for (const [width, height, reducedMotion] of [[1920,958,'no-preference'],[768,1024,'no-preference'],[390,844,'no-preference'],[320,650,'reduce']]) {
  const page = await browser.newPage({viewport:{width,height},reducedMotion});
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
  const trigger=page.getByRole('button',{name:'Open menu',exact:true});
  await trigger.click();
  const dialog=page.getByRole('dialog',{name:'Main navigation'});
  await dialog.waitFor({state:'visible'});
  await page.waitForTimeout(1100);
  assert.equal(await dialog.getByRole('link').count(),16);
  assert.equal(await trigger.getAttribute('aria-expanded'),'true');
  assert.equal(await page.evaluate(()=>document.body.style.overflow),'hidden');
  assert.equal(await dialog.evaluate(d=>d.scrollWidth>d.clientWidth),false);
  assert.equal(await page.evaluate(()=>document.activeElement?.getAttribute('aria-label')),'Close menu');
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(()=>!!document.activeElement?.closest('dialog')),true);
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Shift+Tab');
  assert.equal(await page.evaluate(()=>document.activeElement?.textContent),'24/7 Primary care access');
  await page.screenshot({path:`tmp/menu-${width}.png`});
  await page.keyboard.press('Escape');
  await dialog.waitFor({state:'detached'});
  assert.equal(await trigger.getAttribute('aria-expanded'),'false');
  assert.equal(await page.evaluate(()=>document.body.style.overflow),'');
  assert.equal(await trigger.evaluate(b=>b===document.activeElement),true);
  await trigger.click();
  await page.waitForTimeout(1000);
  await page.getByRole('button',{name:'Close menu',exact:true}).click();
  await dialog.waitFor({state:'detached'});
  await trigger.click();
  await page.waitForTimeout(1000);
  await dialog.getByRole('link',{name:'Pricing',exact:true}).click();
  await page.waitForURL('**/pricing');
  await page.waitForTimeout(800);
  assert.equal(await page.locator('dialog[open]').count(),0);
  assert.equal(await page.evaluate(()=>document.body.style.overflow),'');
  assert.deepEqual(errors,[]);
  console.log(JSON.stringify({width,height,reducedMotion,links:15,keyboard:'pass',close:'pass',navigation:'pass',errors}));
  await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

