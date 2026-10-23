const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch();
 try {
  for (const width of [1440, 390, 320]) {
   const page = await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
   const errors=[];
   page.on('pageerror', error=>errors.push(error.message));
   await page.goto('http://localhost:3000/fitness',{waitUntil:'networkidle'});
   const diagram=page.locator('[aria-label="Training load by muscle group"]');
   await diagram.scrollIntoViewIfNeeded();
   assert.equal(await diagram.locator('[data-muscle-label]').count(),9);
   await diagram.locator('[data-muscle-label="Legs"]').click();
   assert.equal(await diagram.locator('[data-muscle-region="Legs"]').getAttribute('aria-pressed'),'true');
   assert.match(await diagram.locator('[class*="explorerReadout"]').innerText(),/Legs 11%/);
   const back=diagram.locator('[data-muscle-region="Back"]');
   await back.focus();
   await page.keyboard.press('Enter');
   assert.equal(await diagram.locator('[data-muscle-label="Back"]').getAttribute('aria-pressed'),'true');
   assert.equal(await diagram.getAttribute('data-touring'),'false');
   await page.emulateMedia({reducedMotion:'no-preference'});
   await diagram.locator('[aria-label="Pause muscle tour"]').click();
   await page.mouse.move(0,0);
   await diagram.locator('[aria-label="Play muscle tour"]').click();
   const before=await diagram.locator('[class*="explorerReadout"]').innerText();
   await page.waitForTimeout(2900);
   const after=await diagram.locator('[class*="explorerReadout"]').innerText();
   assert.notEqual(after,before,'tour changes target');
   await diagram.locator('[aria-label="Pause muscle tour"]').click();
   await page.mouse.move(0,0);
   await diagram.locator("xpath=ancestor::section").screenshot({path:`tmp/fitness-muscle-interactive-${width}.png`});
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no horizontal overflow');
   const controls=await diagram.locator('[class*="explorerControls"]').boundingBox();
   const body=await diagram.locator('[data-muscle-body]').first().boundingBox();
   assert.ok(controls.y > body.y + body.height, 'controls clear anatomy');
   assert.deepEqual(errors,[]);
   console.log(`${width}px: muscle cards, selection, keyboard, tour, reduced motion and overflow passed`);
   await page.close();
  }
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
