const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch(); const page=await browser.newPage({reducedMotion:'reduce',viewport:{width:1000,height:900}});
 await page.goto('http://localhost:3000/biomarkers');
 const track=page.locator('#biomarkers-breadth-carousel');await track.scrollIntoViewIfNeeded();
 const rect=await track.boundingBox();const y=rect.y+60;
 await page.mouse.move(rect.x+600,y);await page.mouse.down();await page.mouse.move(rect.x+200,y,{steps:10});
 const during=await track.evaluate(el=>({left:el.scrollLeft,dragging:el.dataset.dragging,cursor:getComputedStyle(el).cursor}));
 if(during.left<390||during.dragging!=='true'||during.cursor!=='grabbing')throw Error('Mouse drag did not follow pointer');
 await page.mouse.up();await page.waitForTimeout(300);
 const after=await track.evaluate(el=>el.scrollLeft);
 if(after<=0||await track.getAttribute('data-dragging'))throw Error('Drag did not finish');
 await page.mouse.move(rect.x+200,y);await page.mouse.down();await page.mouse.move(rect.x+650,y,{steps:10});await page.mouse.up();await page.waitForTimeout(300);
 if(await track.evaluate(el=>el.scrollLeft)>1)throw Error('Reverse drag did not return to start');
 await page.mouse.move(rect.x+600,y);await page.mouse.down();await page.mouse.move(rect.x-30,y-100,{steps:10});await page.mouse.up();await page.waitForTimeout(300);
 if(await track.getAttribute('data-dragging'))throw Error('Release outside carousel left drag active');
 console.log('Mouse drag forward/backward, pointer capture outside carousel, and drag cleanup passed');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
