const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true});
 for(const width of [390,768]){
 const page=await browser.newPage({viewport:{width,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
 for(const [prefix,name] of [['gbd','nutrition'],['ft','fitness'],['st','sleep']]){
 const root=page.locator(`.${prefix}-scroll`);
 const top=await root.evaluate(e=>e.getBoundingClientRect().top+window.scrollY);
 const samples=[];
 for(const fraction of [-.2,.25,.7]){
 await page.evaluate(({top,fraction})=>window.scrollTo(0,top+fraction*window.innerHeight),{top,fraction});
 await page.waitForTimeout(1500);
 samples.push(await root.evaluate(e=>{const chart=e.querySelector('[data-nutrition-chart],[data-fitness-chart],[data-sleep-chart]');const r=chart.getBoundingClientRect();return {mask:Number(e.querySelector('rect[data-graph-reveal],rect[data-path-reveal]').getAttribute('width')),top:r.top,bottom:r.bottom,viewport:window.innerHeight,canvases:chart.querySelectorAll('canvas').length,cards:[...chart.querySelectorAll('.gbd-card,.ft-card,.st-card')].map(c=>Number(getComputedStyle(c).opacity))};}));
 }
 if(samples[0].mask>1||samples[1].mask<400||samples[1].mask>1000||samples[2].mask<1349||samples.some(s=>s.top<0||s.bottom>s.viewport||s.canvases!==1)||samples[0].cards.some(v=>v!==0)||samples[2].cards.some(v=>v!==1))throw Error(JSON.stringify({width,name,samples}));
 await root.locator(`[data-${name}-chart]`).screenshot({path:`tmp/${name}-mobile-${width}.png`});
 console.log(JSON.stringify({width,name,samples}));
 }
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(300);
 if(await page.locator('[data-nutrition-chart] canvas,[data-fitness-chart] canvas,[data-sleep-chart] canvas').count())throw Error('Reduced motion canvas');
 if(await page.locator('.st-sticky').evaluate(e=>getComputedStyle(e).position)!=='relative')throw Error('Reduced motion sticky');
 if(errors.length)throw Error(JSON.stringify(errors));await page.close();
 }
 await browser.close();console.log('Touch animations and reduced motion passed');
})().catch(e=>{console.error(e);process.exit(1)});

