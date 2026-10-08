const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-gl=angle','--use-angle=swiftshader']});
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
 for(const name of ['nutrition','fitness','sleep']){
 const chart=page.locator(`[data-${name}-chart]`);
 await chart.scrollIntoViewIfNeeded();
 await page.waitForFunction(n=>document.querySelector(`[data-${n}-chart] canvas`),name,{timeout:30000});
 await chart.evaluate(el=>el.querySelector('rect[data-path-reveal],rect[data-graph-reveal]').setAttribute('width','675'));
 await page.waitForTimeout(250);
 await chart.screenshot({path:`tmp/${name}-3d-reveal.png`});
 console.log(name,await chart.locator('canvas').evaluate(c=>({width:c.width,height:c.height})));
 }
 await page.setViewportSize({width:390,height:900}); await page.waitForTimeout(300);
 if(await page.locator('[data-nutrition-chart] canvas,[data-fitness-chart] canvas,[data-sleep-chart] canvas').count())throw Error('Mobile canvas still present');
 await page.setViewportSize({width:1440,height:900}); await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(300);
 if(await page.locator('[data-nutrition-chart] canvas,[data-fitness-chart] canvas,[data-sleep-chart] canvas').count())throw Error('Reduced motion canvas still present');
 if(errors.length)throw Error(JSON.stringify(errors));
 console.log('Mobile, reduced motion and browser errors passed');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
