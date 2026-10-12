const { chromium }=require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch();
 for(const width of [1920,768,390]){
  const page=await browser.newPage({viewport:{width,height:958}});
  await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
  await page.waitForTimeout(1000);
  const button=page.getByRole('button',{name:'Open menu',exact:true});
  const header=button.locator('xpath=ancestor::header');
  const logoBefore=await header.locator('img').first().boundingBox();
  const buttonBefore=await button.boundingBox();
  await button.click();
  const dialog=page.getByRole('dialog',{name:'Main navigation'});
  await page.waitForTimeout(1100);
  const logoAfter=await dialog.locator('img').boundingBox();
  const closeAfter=await dialog.getByRole('button',{name:'Close menu'}).boundingBox();
  for(const key of ['x','y','width','height']){
   assert.ok(Math.abs(logoBefore[key]-logoAfter[key])<1,`logo ${key}: ${logoBefore[key]} vs ${logoAfter[key]}`);
   assert.ok(Math.abs(buttonBefore[key]-closeAfter[key])<1,`button ${key}: ${buttonBefore[key]} vs ${closeAfter[key]}`);
  }
  assert.equal(await dialog.locator('div[aria-hidden=true]').count(),0);
  assert.equal(await dialog.evaluate(d=>d.scrollWidth>d.clientWidth),false);
  await page.screenshot({path:`tmp/menu-aligned-${width}.png`});
  await page.keyboard.press('Escape');
  await dialog.waitFor({state:'detached'});
  console.log(JSON.stringify({width,alignment:'pass',greenCurtain:'removed',close:'pass'}));
  await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});


