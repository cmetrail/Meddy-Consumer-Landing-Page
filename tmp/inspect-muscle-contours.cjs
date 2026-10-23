const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch();
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 await page.goto('http://localhost:3000/fitness',{waitUntil:'networkidle'});
 const diagram=page.locator('[aria-label="Training load by muscle group"]');
 await diagram.scrollIntoViewIfNeeded();
 for(const name of ['Shoulders','Legs','Calves','Back','Triceps']){
  await diagram.locator(`[data-muscle-label="${name}"]`).click();
  await page.mouse.move(0,0);
  await diagram.screenshot({path:`tmp/muscle-contour-${name}.png`});
 }
 await browser.close();
})();
