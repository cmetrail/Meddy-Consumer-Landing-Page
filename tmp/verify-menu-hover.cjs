const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch();const page=await browser.newPage({viewport:{width:1440,height:900}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
 await page.getByRole('button',{name:'Open menu',exact:true}).click();
 const dialog=page.getByRole('dialog',{name:'Main navigation'});await page.waitForTimeout(1200);
 const nav=dialog.getByRole('navigation',{name:'All pages'});
 for(const link of await nav.getByRole('link').all()){
  await link.hover();await page.waitForTimeout(500);
  const href=await link.getAttribute('href');
  assert.equal(await dialog.locator('[data-active="true"]').count(),1);
  const active=dialog.locator('[data-active="true"] img');
  await active.evaluate(i=>i.decode());
  assert.ok(await active.evaluate(i=>i.naturalWidth>0));
  console.log('Hover preview passed:',href);
 }
 await page.screenshot({path:'tmp/menu-hover-primary-care.png'});
 await page.getByRole('button',{name:'Close menu',exact:true}).hover();await page.waitForTimeout(500);
 assert.ok((await dialog.locator('[data-active="true"] img').getAttribute('src')).includes('photo.png'));
 await nav.getByRole('link',{name:'Wearables & health data'}).focus();await page.waitForTimeout(500);
 assert.ok((await dialog.locator('[data-active="true"] img').getAttribute('src')).includes('smartwatch'));
 await page.screenshot({path:'tmp/menu-hover-wearables.png'});
 await page.keyboard.press('Escape');await dialog.waitFor({state:'detached'});
 assert.deepEqual(errors,[]);console.log('Keyboard focus, default reset, close, and runtime checks passed');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
