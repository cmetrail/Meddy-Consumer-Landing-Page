const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async () => {
 const browser = await chromium.launch({ headless: true });
 const page = await browser.newPage({ viewport: { width: 882, height: 600 }, reducedMotion: 'reduce' });
 await page.goto('http://localhost:3000/wearables', { waitUntil: 'networkidle' });
 await page.evaluate(() => document.fonts.ready);
 const section = page.locator('section[aria-labelledby="wearables-physician-heading"]');
 await section.scrollIntoViewIfNeeded();
 await section.screenshot({ path: 'tmp/physician-reference-desktop.png' });
 console.log(await section.evaluate(el => ({card:el.firstElementChild.getBoundingClientRect().toJSON(), heading:getComputedStyle(el.querySelector('h2')).fontSize,images:[...el.querySelectorAll('img')].every(i=>i.complete&&i.naturalWidth>0)})));
 for (const width of [320,390,767,1440]) {
  await page.setViewportSize({width,height:900});
  await section.screenshot({path:`tmp/physician-reference-${width}.png`});
  const layout=await section.evaluate(el=>{ const card=el.firstElementChild.getBoundingClientRect();const copy=el.querySelector('button').getBoundingClientRect();return {width:innerWidth,cardWidth:card.width,ctaFits:copy.bottom<=card.bottom&&copy.right<=card.right,overflow:document.documentElement.scrollWidth>innerWidth};});
  console.log(layout);
  if (!layout.ctaFits || layout.overflow) throw new Error(JSON.stringify(layout));
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
