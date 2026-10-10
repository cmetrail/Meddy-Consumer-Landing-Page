const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:960}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
 const states=()=>page.locator('#why-meddy [data-scatter], #why-meddy [data-line]').evaluateAll(els=>els.map(el=>({opacity:getComputedStyle(el).opacity,transform:getComputedStyle(el).transform})));
 console.log('before',await states());
 await page.evaluate(()=>window.scrollTo({top:document.querySelector('#why-meddy').getBoundingClientRect().top+window.scrollY+500,behavior:'instant'}));
 await page.waitForTimeout(500);
 console.log('after',await states());
 if((await states()).some(s=>s.opacity!=='1'))throw new Error('Animations did not finish');
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.waitForTimeout(100);
 console.log('reduced motion',await states()); if((await states()).some(s=>s.opacity!=='1'))throw new Error('Reduced-motion content hidden');
 console.log('runtime errors',errors);
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

