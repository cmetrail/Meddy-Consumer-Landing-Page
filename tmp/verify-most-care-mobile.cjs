const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true});
 for(const width of [282,403,600,767]){
 const page=await browser.newPage({viewport:{width,height:900},isMobile:true,hasTouch:true});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
 const top=await page.locator('#why-meddy').evaluate(el=>el.getBoundingClientRect().top+window.scrollY);
 for(const offset of [0,300,600]){await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),top+offset);await page.waitForTimeout(1000);}
 const state=await page.locator('#why-meddy').evaluate(el=>({overflow:el.scrollWidth>el.clientWidth,hidden:[...el.querySelectorAll('[data-scatter], [data-line]')].filter(e=>getComputedStyle(e).opacity!=='1').length,scales:[...el.querySelectorAll('[data-scatter]')].map(e=>getComputedStyle(e).scale)}));
 console.log(JSON.stringify({width,errors,...state}));
 if(errors.length||state.overflow||state.hidden)throw new Error('Mobile layout/reveal failed');
 if(width===282){await page.emulateMedia({reducedMotion:'reduce'});await page.locator('#why-meddy').screenshot({path:'tmp/most-care-282.png'});}
 await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
