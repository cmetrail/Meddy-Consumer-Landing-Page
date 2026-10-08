const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1586,height:900}});
 await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
 const root=page.locator('.gbd-scroll');
 const top=await root.evaluate(e=>e.getBoundingClientRect().top+window.scrollY);
 await page.evaluate(y=>window.scrollTo(0,y),top);await page.waitForTimeout(1800);
 const chart=page.locator('[data-nutrition-chart]');
 const positions=await chart.evaluate(e=>{const box=e.getBoundingClientRect();return [...e.querySelectorAll('.gbd-card')].map(c=>{const r=c.getBoundingClientRect();const anchor=box.top+parseFloat(c.style.top)/100*box.height;return {text:c.textContent,offset:r.bottom-anchor,opacity:getComputedStyle(c).opacity,transform:getComputedStyle(c).transform};});});
 if(positions.some(p=>Math.abs(p.offset)>1||p.opacity!=='1'))throw Error(JSON.stringify(positions));
 await root.screenshot({path:'tmp/nutrition-labels-fixed.png'});
 console.log(JSON.stringify(positions));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
