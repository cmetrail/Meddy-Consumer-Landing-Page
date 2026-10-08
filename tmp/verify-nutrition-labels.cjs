const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
 const chart=page.locator('[data-nutrition-chart]');
 const root=page.locator('.gbd-scroll');
 const top=await root.evaluate(e=>e.getBoundingClientRect().top+window.scrollY);
 const targets=[160.5,448.5,1087.5,1218.5];
 for(const progress of [0,0.05,0.2,0.4,0.72,0.88,1]){
 await page.evaluate(y=>window.scrollTo(0,y),Math.max(0,top-900+progress*900));
 await page.waitForTimeout(1800);
 const state=await chart.evaluate(e=>({x:45+Number(e.querySelector('[data-graph-reveal]').getAttribute('width')),cards:[...e.querySelectorAll('.gbd-card')].map(c=>({text:c.textContent,opacity:Number(getComputedStyle(c).opacity)}))}));
 state.cards.forEach((c,i)=>{if(state.x<targets[i]-1&&c.opacity>0.01)throw Error('Early label: '+JSON.stringify(state));if(state.x>targets[i]+110&&c.opacity<.99)throw Error('Missing label: '+JSON.stringify(state));});
 console.log(JSON.stringify(state));
 }
 await page.setViewportSize({width:390,height:900});await page.waitForTimeout(300);
 if((await chart.locator('.gbd-card').evaluateAll(cards=>cards.map(c=>Number(getComputedStyle(c).opacity)))).some(v=>v!==1))throw Error('Mobile labels hidden');
 if(errors.length)throw Error(JSON.stringify(errors));console.log('Label timing and mobile passed');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
