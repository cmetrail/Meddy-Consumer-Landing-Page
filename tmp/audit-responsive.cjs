const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const fs = require('node:fs');
const routes = ['/', '/how-it-works', '/why-meddy', '/physician-care', '/biomarkers', '/fitness', '/nutrition', '/sleep', '/weight-loss', '/longevity', '/medication', '/wearables', '/247-care', '/personalized-health-plans', '/pricing', '/what-we-test', '/book-consultation'];
(async () => {
 const browser = await chromium.launch();
 const results = [];
 for (const width of (process.env.WIDTHS || '768,1032').split(',').map(Number)) {
  const page = await browser.newPage({viewport:{width,height:width===768?1024:1376},hasTouch:true,reducedMotion:'reduce'});
  for (const route of routes) {
   await page.goto('http://localhost:3000'+route,{waitUntil:'networkidle'});
   await page.evaluate(()=>document.fonts.ready);
   const result = await page.evaluate(() => {
    const visible = el => { const r=el.getBoundingClientRect(); const s=getComputedStyle(el); return r.width>0 && r.height>0 && s.display!=='none' && s.visibility!=='hidden'; };
    const clipped = el => { for(let p=el.parentElement;p&&p!==document.body;p=p.parentElement) { if(['hidden','clip','auto','scroll'].includes(getComputedStyle(p).overflowX)) return true; } return false; };
    return {scrollWidth:document.documentElement.scrollWidth, height:document.documentElement.scrollHeight,
     overflow:[...document.querySelectorAll('main *')].filter(el=>visible(el)&&!clipped(el)).map(el=>({el,rect:el.getBoundingClientRect()})).filter(({rect})=>rect.left < -2 || rect.right>innerWidth+2).slice(0,12).map(({el,rect})=>({tag:el.tagName,cls:el.className?.baseVal??el.className,text:el.textContent.slice(0,60),left:Math.round(rect.left),right:Math.round(rect.right)})),
     sections:[...document.querySelectorAll('main section')].filter(visible).map(el=>({cls:el.className,title:el.querySelector('h1,h2,h3')?.textContent,height:Math.round(el.getBoundingClientRect().height)}))};
   });
   results.push({width,route,...result});
   console.log(JSON.stringify({width,route,scrollWidth:result.scrollWidth,height:result.height,overflow:result.overflow}));
   if (route==='/') await page.screenshot({path:`tmp/home-tablet-before-${width}.png`,fullPage:true});
  }
  await page.close();
 }
 fs.writeFileSync('tmp/responsive-audit.json',JSON.stringify(results,null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
