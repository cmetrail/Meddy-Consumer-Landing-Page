const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch(); const page=await browser.newPage({viewport:{width:1440,height:1000}}); const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3000/longevity'); await page.evaluate(()=>document.fonts.ready); await page.waitForTimeout(700);
 const root=page.locator('.changes-scroll');
 const bounds=await root.evaluate(el=>({top:el.getBoundingClientRect().top+scrollY,h:el.offsetHeight,stage:el.querySelector('.changes-sticky').offsetHeight}));
 const start=bounds.top-Math.min(0,1000-bounds.stage); const end=bounds.top+bounds.h-1000;
 for(const [step,p] of [[2,.5],[3,.85],[2,.5]]){
  await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),start+(end-start)*p); await page.waitForTimeout(2400);
  const card=root.locator(`[data-change-card='${step}']`); const state=await card.evaluate(el=>({opacity:getComputedStyle(el).opacity,visibility:getComputedStyle(el).visibility,wipe:getComputedStyle(el.querySelector('[data-wipe]')).clipPath}));
  if(state.opacity!=='1'||state.visibility!=='visible'||state.wipe.includes('100%')) throw Error(JSON.stringify({step,state}));
  await card.screenshot({path:`tmp/updated-changes-${step}.png`}); console.log('Desktop step',step,state);
 }
 for(const width of [390,320]){
  await page.setViewportSize({width,height:844}); await page.waitForTimeout(500); await root.scrollIntoViewIfNeeded();
  const cards=await root.locator('.tracking-card-wrap').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();const n=el.querySelector('.tracking-card-note').getBoundingClientRect();return {width:r.width,noteWidth:n.width,noteRight:n.right-r.right,bottom:n.bottom-r.bottom};}));
  if(cards.some(c=>c.noteRight>1||c.bottom>1))throw Error(JSON.stringify(cards));
  console.log('Mobile',width,cards);
 }
 if(errors.length)throw Error(errors.join('\n')); await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
