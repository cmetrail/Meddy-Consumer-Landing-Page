const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const [prefix,name] of [['gbd','nutrition'],['ft','fitness'],['st','sleep']]){
 await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
 const root=page.locator(`.${prefix}-scroll`);
 const top=await root.evaluate(e=>e.getBoundingClientRect().top+window.scrollY);
 const samples=[];
 for(const fraction of [-.2,.25,.7]){
 await page.evaluate(y=>window.scrollTo(0,y),top+fraction*900);
 await page.waitForTimeout(1600);
 samples.push(await root.evaluate(e=>{const chart=e.querySelector('[data-nutrition-chart],[data-fitness-chart],[data-sleep-chart]');const r=chart.getBoundingClientRect();return {width:Number(e.querySelector('rect[data-graph-reveal],rect[data-path-reveal]').getAttribute('width')),top:r.top,bottom:r.bottom};}));
 }
 if(samples[0].width>1||samples[1].width<400||samples[1].width>1000||samples[2].width<(name==='nutrition'?1099:1349)||samples.some(s=>s.top<0||s.bottom>900))throw Error(JSON.stringify({name,samples}));
 console.log(JSON.stringify({name,samples}));
 }
 await page.setViewportSize({width:390,height:900});await page.waitForTimeout(300);
 if(await page.locator('.st-sticky').evaluate(e=>getComputedStyle(e).position)!=='relative')throw Error('Mobile sticky');
 if(errors.length)throw Error(JSON.stringify(errors));console.log('Passed');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
