const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
 const b=await chromium.launch();const p=await b.newPage();
 for(const width of [344,282,390,767,1440]){
  await p.setViewportSize({width,height:width===1440?910:613});
  await p.goto('http://localhost:3000/pricing'); await p.evaluate(()=>document.fonts.ready);
  const s=p.getByRole('region',{name:'Meddy membership plans'});
  await s.evaluate(e=>window.scrollTo(0,e.getBoundingClientRect().top+window.scrollY));
  await p.waitForTimeout(400);
  console.log(JSON.stringify(await s.evaluate(e=>({width:innerWidth,pageWidth:document.documentElement.scrollWidth,cards:[...e.querySelectorAll('article')].map(c=>({rect:c.getBoundingClientRect().toJSON(),button:c.querySelector('button').getBoundingClientRect().toJSON(),lastFeature:c.querySelector('li:last-child').getBoundingClientRect().toJSON()}))}))));
  await p.screenshot({path:`tmp/pricing-card-${width}.png`});
 }
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
