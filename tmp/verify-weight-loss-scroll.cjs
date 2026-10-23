const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true});
 for(const [width,height,reduce] of [[1440,900,false],[1024,768,false],[390,844,false],[320,700,true],[1440,900,true]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:reduce?'reduce':'no-preference'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:3000/weight-loss',{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  const section=page.locator('#weight-loss-plan');
  const b=await section.evaluate(e=>({top:e.getBoundingClientRect().top+scrollY,height:e.offsetHeight}));
  const stages=[];
  if(width>=1024&&!reduce){
   for(const i of [0,1,2,3,2,0]){
    await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),b.top+(b.height-height)*(i+.2)/4);
    await page.waitForTimeout(450);
    const active=section.locator('article[data-active="true"]');
    const box=await active.boundingBox();
    stages.push({title:await active.locator('h3').innerText(),box});
    if(i===3) await page.screenshot({path:`tmp/weight-loss-scroll-${width}.png`});
   }
   if(stages.map(s=>s.title).join('|')!=='Your Data|Your Physician|Your Plan|Your Progress|Your Plan|Your Data') throw Error('Incorrect scroll sequence');
   if(stages.some(s=>s.box.y<0||s.box.y+s.box.height>height+1)) throw Error('Clipped panel');
  }else{
   if(await section.locator('article:visible').count()!==4)throw Error('Missing fallback steps');
   await section.locator('article').last().scrollIntoViewIfNeeded();
   await page.screenshot({path:`tmp/weight-loss-scroll-${width}-${reduce}.png`});
  }
  console.log(JSON.stringify({width,reduce,stages,errors,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)}));
  await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
