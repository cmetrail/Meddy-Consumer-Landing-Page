const{chromium}=require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
for(const width of [724,1440,390]){await p.setViewportSize({width,height:width===1440?1600:804});await p.goto('http://localhost:3000/pricing');await p.evaluate(()=>document.fonts.ready);
const s=p.locator('[aria-labelledby="pricing-consultation-heading"]').locator('..');await s.evaluate(e=>window.scrollTo(0,e.offsetTop));await p.waitForTimeout(1000);
console.log(await s.evaluate(e=>({width:innerWidth,pageWidth:document.documentElement.scrollWidth,section:e.offsetHeight,consultation:e.querySelector('[aria-labelledby]').offsetHeight,footer:e.querySelector('[data-footer-inner]').parentElement.offsetHeight,logo:e.querySelector('[data-footer-brand] > img').getBoundingClientRect().toJSON(),description:e.querySelector('[data-footer-brand] > p').getBoundingClientRect().toJSON(),stores:e.querySelector('[data-footer-stores]').getBoundingClientRect().toJSON()})));
await p.screenshot({path:`tmp/pricing-footer-match-${width}.png`});}
await b.close();})().catch(e=>{console.error(e);process.exit(1)});
