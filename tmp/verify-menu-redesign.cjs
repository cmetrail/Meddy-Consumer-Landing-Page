const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async()=>{
 const browser = await chromium.launch();
 for(const [width,height] of [[1920,958],[1366,768],[768,1024],[390,844],[320,650]]){
  const page = await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
  const trigger=page.getByRole('button',{name:'Open menu',exact:true}); await trigger.click();
  const dialog=page.getByRole('dialog',{name:'Main navigation'});await dialog.waitFor();
  await page.waitForTimeout(600);
  assert.equal(await dialog.getByRole('link').count(),10);
  const layout=await dialog.evaluate(d=>{const p=d.querySelector('[class*="panel"]');return {overflow:p.scrollWidth>p.clientWidth,scroll:p.scrollHeight>p.clientHeight,images:[...d.querySelectorAll('img')].map(i=>i.complete&&i.naturalWidth>0)}});
  assert.equal(layout.overflow,false);assert.ok(layout.images.every(Boolean));
  await page.screenshot({path:`tmp/menu-redesign-${width}.png`});
  await page.keyboard.press('Shift+Tab');await page.keyboard.press('Shift+Tab');
  assert.ok(await dialog.getByRole('link',{name:'Book a free consultation'}).evaluate(e=>document.activeElement===e));
  await page.keyboard.press('Escape');await dialog.waitFor({state:'detached'});
  assert.equal(await trigger.evaluate(e=>document.activeElement===e),true);
  assert.equal(await page.evaluate(()=>document.body.style.overflow),'');
  assert.deepEqual(errors,[]);console.log({width,...layout,keyboard:'pass'});await page.close();
 }await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

