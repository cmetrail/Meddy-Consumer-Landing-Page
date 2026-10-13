const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch();
 const page = await browser.newPage();
 const errors = [];
 page.on('pageerror', e => errors.push(e.message));
 for (const viewport of [{width:1440,height:900},{width:390,height:844},{width:320,height:568}]) {
  await page.setViewportSize(viewport);
  await page.goto('http://localhost:3000/longevity');
  await page.evaluate(() => document.fonts.ready);
  const section = page.locator('section[aria-labelledby="longevity-prevention-title"]');
  await section.waitFor();
  await page.waitForTimeout(600);
  const bounds = await section.evaluate(el=>({top:el.getBoundingClientRect().top+scrollY,height:el.offsetHeight}));
  async function at(progress) {
   const liveBounds = await section.evaluate(el=>({top:el.getBoundingClientRect().top+scrollY,height:el.offsetHeight})); await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),liveBounds.top+(liveBounds.height-viewport.height)*progress);
   await page.waitForTimeout(200);
   return section.locator('figure').evaluateAll(els=>els.map(el=>({caption:el.textContent,opacity:+getComputedStyle(el).opacity,visibility:getComputedStyle(el).visibility})));
  }
  for (const [index, progress] of [0.1,0.35,0.6,0.9].entries()) {
   const state=await at(progress); if(viewport.width===320) console.log('320 geometry', await section.evaluate(el=>({scrollY,top:el.getBoundingClientRect().top,height:el.offsetHeight,stage:el.dataset.stage,docHeight:document.documentElement.scrollHeight})));
   assert.equal(state[index].opacity,1,JSON.stringify({viewport,progress,state}));
   assert.equal(state.filter(s=>s.visibility==='visible').length,1);
   const before=JSON.stringify(state);
   await page.waitForTimeout(250);
   assert.equal(JSON.stringify(await section.locator('figure').evaluateAll(els=>els.map(el=>({caption:el.textContent,opacity:+getComputedStyle(el).opacity,visibility:getComputedStyle(el).visibility})))),before,'No autoplay');
   await page.screenshot({path:`tmp/longevity-prevention-${viewport.width}-step-${index}.png`});
  }
  assert.equal((await at(0.35))[1].opacity,1,'Reverse scrolling restores second step');
  const geometry=await section.evaluate(el=>({width:innerWidth,documentWidth:document.documentElement.scrollWidth,buttonBottom:el.querySelector('button').getBoundingClientRect().bottom,viewport:innerHeight}));
  assert.ok(geometry.buttonBottom<=geometry.viewport,JSON.stringify(geometry));
  console.log('Scroll sequence, idle and reverse checks passed:',viewport,geometry);
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.waitForTimeout(250);
 assert.equal(await page.locator('section[aria-labelledby="longevity-prevention-title"] figure').evaluateAll(els=>els.filter(el=>getComputedStyle(el).visibility==='visible').length),4);
 assert.deepEqual(errors,[]);
 console.log('Reduced-motion fallback and browser errors passed');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

