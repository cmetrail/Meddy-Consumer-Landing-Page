const {chromium}=require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
for(const width of [1440,1024,390,320]){
 await p.setViewportSize({width,height:1000});await p.goto('http://localhost:3000/medication');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
 const s=p.locator('main > section').first();await s.screenshot({path:`tmp/medication-hero-match-${width}.png`});
 console.log(await s.evaluate(el=>({width:innerWidth,pageWidth:document.documentElement.scrollWidth,height:el.offsetHeight,links:[...el.querySelectorAll('a')].map(a=>a.getAttribute('href'))})));
}console.log({errors});await b.close();})().catch(e=>{console.error(e);process.exit(1)});
