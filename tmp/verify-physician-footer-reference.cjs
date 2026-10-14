const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async () => {
 const browser = await chromium.launch();
 for (const width of [212,320,390,767,1440]) {
  const page = await browser.newPage({viewport:{width,height:1000}, reducedMotion:'reduce'});
  await page.goto('http://localhost:3000/physician-care',{waitUntil:'networkidle'});
  const footer = page.locator('[aria-labelledby="physician-care-footer-heading"] [data-footer-inner]');
  await footer.scrollIntoViewIfNeeded();
  await footer.locator('img').evaluateAll(async imgs=>Promise.all(imgs.map(i=>i.decode().catch(()=>{}))));
  const state=await footer.evaluate(el=>{
   const navs=[...el.querySelectorAll('nav')].filter(n=>getComputedStyle(n).display!=='none');
   const stores=el.querySelector('[data-footer-stores]');
   const nav=navs[0]; const logo=el.querySelector('[data-footer-brand]>img');
   return {navs:navs.length, links:nav.querySelectorAll('a').length, overflow:el.scrollWidth>el.clientWidth, badgesFit:[...stores.querySelectorAll('button')].every(b=>b.scrollWidth<=b.clientWidth+1), storesTop:stores.getBoundingClientRect().top, navTop:nav.getBoundingClientRect().top, logoTop:logo.getBoundingClientRect().top};
  });
  console.log(JSON.stringify({width,...state}));
  if(state.navs!==1||state.overflow||!state.badgesFit||(width<768&&!(state.storesTop<state.navTop&&state.navTop<state.logoTop))) throw Error('Footer layout check failed');
  if([212,390,1440].includes(width)) await footer.locator('..').screenshot({path:`tmp/physician-footer-mobile-reference-${width}.png`});
  await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
