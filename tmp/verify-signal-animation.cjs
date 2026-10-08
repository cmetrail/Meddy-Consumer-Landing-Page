const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async () => {
 const browser = await chromium.launch({headless:true});
 for (const width of [1440, 390]) {
  const page = await browser.newPage({viewport:{width,height:900}});
  const errors=[]; page.on('pageerror', e=>errors.push(e.message));
  await page.goto('http://localhost:3000/how-it-works', {waitUntil:'networkidle'});
  const section=page.locator('section').filter({has:page.getByRole('heading',{name:'See what matters with less noise and more signal'})});
  const card=section.locator(width>=1024 ? 'div.lg\\:flex' : 'div.lg\\:hidden').filter({hasText:'7.6 hrs'}).first();
  const chart=card.locator('img[alt^="Blood pressure"]').locator('..').locator('..');
  const result=card.getByText('124/80 mmHg',{exact:true});
  const get=()=>card.evaluate(el=>{
   const wrapper=el.querySelector('div.overflow-hidden');
   const result=[...el.querySelectorAll('p')].find(el=>el.textContent==='124/80 mmHg');
   const chart=el.querySelector('img[alt^="Blood pressure"]').parentElement.parentElement;
   return {cardHeight:el.getBoundingClientRect().height,graphHeight:wrapper.getBoundingClientRect().height, resultOpacity:getComputedStyle(result).opacity,chartClip:getComputedStyle(chart).clipPath, top:el.getBoundingClientRect().top};
  });
  await card.scrollIntoViewIfNeeded();
  const samples=[];
  samples.push(await get());
  await page.waitForTimeout(1900); samples.push(await get());
  await page.waitForTimeout(1400); samples.push(await get());
  await page.waitForTimeout(1700); samples.push(await get());
  await page.waitForTimeout(800); const held=await get();
  if(samples[0].graphHeight>1 || samples[1].graphHeight<200 || samples[2].resultOpacity!=='0' || held.resultOpacity!=='1' || held.chartClip!=='inset(0px 0% 0px 0px)' || errors.length) throw Error(JSON.stringify({width,samples,held,errors}));
  console.log(JSON.stringify({width,samples,held,errors}));
  await page.close();
 }
 const page=await browser.newPage({viewport:{width:390,height:900}, reducedMotion:'reduce'});
 await page.goto('http://localhost:3000/how-it-works',{waitUntil:'networkidle'});
 const card=page.locator('section').filter({has:page.getByRole('heading',{name:'See what matters with less noise and more signal'})}).locator('div.lg\\:hidden').filter({hasText:'7.6 hrs'}).first();
 await card.scrollIntoViewIfNeeded(); await page.waitForTimeout(100);
 const opacity=await card.getByText('124/80 mmHg',{exact:true}).evaluate(el=>getComputedStyle(el).opacity);
 if(opacity!=='1') throw Error('Reduced motion result not immediate');
 console.log('Reduced motion passed'); await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
