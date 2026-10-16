const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch();
 try {
  const page = await browser.newPage({viewport:{width:1440,height:900}, reducedMotion:'reduce'});
  const errors=[]; page.on('pageerror', e=>errors.push(e.message));
  await page.goto('http://localhost:3000/fitness',{waitUntil:'networkidle'});
  const group=page.getByRole('group',{name:'Training category',exact:true});
  await group.scrollIntoViewIfNeeded();
  await page.mouse.move(0,0);
  const current=()=>group.locator('[aria-pressed="true"]').innerText();
  const first=await current();
  await page.waitForTimeout(5300);
  assert.notEqual(await current(),first,'auto advances');
  await group.getByRole('button',{name:'Cardio',exact:true}).click();
  assert.equal(await current(),'Cardio','manual selection');
  await page.waitForTimeout(5300);
  assert.equal(await current(),'Cardio','pauses during interaction');
  await group.getByRole('button',{name:'Cardio',exact:true}).evaluate(e=>e.blur());
  await page.mouse.move(0,0);
  await page.waitForTimeout(5300);
  assert.equal(await current(),'Intensity','resumes in order');
  await page.waitForTimeout(10200);
  assert.equal(await current(),'Strength','wraps to first tab');
  assert.deepEqual(errors,[]);
  console.log('PASS: automatic rotation, manual selection, interaction pause, resume, loop; no browser errors.');
 } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exit(1)});
