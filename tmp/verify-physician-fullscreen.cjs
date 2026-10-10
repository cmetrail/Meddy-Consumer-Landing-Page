const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch();
 for(const [width,height] of [[1920,958],[1440,900],[593,447],[390,844]]){
 const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
 const section=page.locator('#physician-care');
 await section.evaluate(s=>window.scrollTo(0,s.getBoundingClientRect().top+scrollY));
 await section.locator('img').evaluateAll(async imgs=>{await Promise.all(imgs.map(i=>{i.loading='eager';return i.decode()}))});
 await page.screenshot({path:`tmp/physician-fullscreen-${width}.png`});
 console.log(JSON.stringify({width,height,errors,...await section.evaluate(s=>{const rect=s.getBoundingClientRect();const badges=s.querySelector('[data-ray-badges]').getBoundingClientRect();const card=s.querySelector('[data-ray-social]').getBoundingClientRect();return {sectionHeight:rect.height,sectionWidth:rect.width,overflow:document.documentElement.scrollWidth>innerWidth,badgesVisible:badges.bottom<=innerHeight,cardVisible:card.bottom<=innerHeight,images:[...s.querySelectorAll('img')].every(i=>i.complete&&i.naturalWidth)}})}));
 await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
