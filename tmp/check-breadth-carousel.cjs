const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch(); const page=await browser.newPage({reducedMotion:'reduce'});
 for(const width of [1000,390]){
  await page.setViewportSize({width,height:900}); await page.goto('http://localhost:3000/biomarkers');
  const section=page.locator('section[aria-labelledby="biomarkers-breadth-title"]');
  await section.scrollIntoViewIfNeeded();
  const track=section.getByRole('region'); const prev=section.getByRole('button',{name:'Previous biomarker categories'}); const next=section.getByRole('button',{name:'Next biomarker categories'});
  if(!await prev.isDisabled())throw Error('Previous must be disabled at start');
  await next.click(); await page.waitForTimeout(150);
  if(await track.evaluate(el=>el.scrollLeft)<=0)throw Error('Next did not advance');
  await prev.click(); await page.waitForTimeout(150);
  if(await track.evaluate(el=>el.scrollLeft)>1)throw Error('Previous did not return to start');
  await track.focus(); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(150);
  if(await track.evaluate(el=>el.scrollLeft)<=0)throw Error('Keyboard did not advance');
  for(let i=0;i<20 && !await next.isDisabled();i++){await next.click();await page.waitForTimeout(100);}
  if(!await next.isDisabled())throw Error('Next must be disabled at end');
  const last=await track.locator('[aria-roledescription="slide"]').last().boundingBox(); const box=await track.boundingBox();
  if(last.x+last.width>box.x+box.width+2)throw Error('Final card is not fully visible');
  await track.evaluate(el=>el.scrollTo({left:0,behavior:'instant'}));await page.waitForTimeout(150);
  await section.screenshot({path:`tmp/breadth-carousel-${width}.png`});
  console.log(`${width}px: next, previous, keyboard, final card and boundary states passed`);
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
