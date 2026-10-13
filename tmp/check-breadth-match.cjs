const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async () => {
 const browser = await chromium.launch();
 const page = await browser.newPage();
 for (const width of [1000, 1440, 390]) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto('http://localhost:3000/biomarkers');
  await page.evaluate(() => document.fonts.ready);
  const section = page.locator('section[aria-labelledby="biomarkers-breadth-title"]');
  await section.scrollIntoViewIfNeeded();
  await section.locator('img').first().waitFor();
  await page.waitForFunction(() => [...document.querySelectorAll('section[aria-labelledby="biomarkers-breadth-title"] img')].slice(0, 6).every(i => i.complete && i.naturalWidth > 0));
  await section.screenshot({ path: `tmp/breadth-match-${width}.png` });
  console.log(await section.evaluate(el => ({width: innerWidth, documentWidth:document.documentElement.scrollWidth, sectionHeight:el.offsetHeight, cards:el.querySelector('[role="region"]').children.length, imagesLoaded:[...el.querySelectorAll('img')].every(i=>i.naturalWidth>0)})));
  const track=section.getByRole('region');
  await track.evaluate(el=>el.scrollTo({left:el.scrollWidth,behavior:'instant'}));
  console.log('Scroll reaches remaining cards:',await track.evaluate(el=>el.scrollLeft>0));
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

