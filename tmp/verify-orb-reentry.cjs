const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1906,height:962}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
 const top=await page.locator('.gbd-scroll').evaluate(e=>e.getBoundingClientRect().top+window.scrollY);
 for(let i=0;i<3;i++){
 await page.evaluate(y=>window.scrollTo(0,y),top+240);await page.waitForTimeout(1300);
 await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(300);
 }
 await page.evaluate(y=>window.scrollTo(0,y),top+240);await page.waitForTimeout(1300);
 const counts=await page.locator('[data-nutrition-chart],[data-fitness-chart],[data-sleep-chart]').evaluateAll(charts=>charts.map(c=>({chart:[...c.attributes].find(a=>a.name.endsWith('-chart')).name,count:c.querySelectorAll('canvas').length})));
 if(counts.some(c=>c.count>1)||counts[0].count!==1)throw Error(JSON.stringify(counts));
 await page.locator('.gbd-scroll').screenshot({path:'tmp/nutrition-single-canvas.png'});
 if(errors.length)throw Error(JSON.stringify(errors));console.log(JSON.stringify(counts));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
