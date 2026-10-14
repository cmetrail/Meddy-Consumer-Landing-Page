const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch();
 for (const width of [1440, 800, 390, 320]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  const errors=[]; page.on('pageerror', e => errors.push(e.message));
  await page.goto('http://localhost:3000/physician-care', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const faq = page.locator('#physician-care-faq');
  await faq.scrollIntoViewIfNeeded();
  await faq.screenshot({path: `tmp/physician-faq-${width}.png`});
  const state = await faq.evaluate(el => ({overflow:el.scrollWidth>el.clientWidth, next:el.nextElementSibling?.getAttribute('aria-labelledby'), images:[...el.querySelectorAll('img')].map(i=>({loaded:i.complete&&i.naturalWidth>0,width:i.getBoundingClientRect().width,height:i.getBoundingClientRect().height}))}));
  assert.equal(state.overflow,false); assert.equal(state.next,'physician-care-footer-heading'); assert.ok(state.images.every(i=>i.loaded&&i.width===20&&i.height===20));
  const buttons = faq.locator('button');
  assert.equal(await buttons.count(),6); assert.equal(await buttons.nth(0).getAttribute('aria-expanded'),'true');
  await buttons.nth(1).click(); assert.equal(await buttons.nth(0).getAttribute('aria-expanded'),'false'); assert.equal(await buttons.nth(1).getAttribute('aria-expanded'),'true');
  assert.equal(await faq.getByRole('region').count(),1);
  await buttons.nth(1).click(); assert.equal(await faq.getByRole('region').count(),0);
  await buttons.nth(0).focus(); await page.keyboard.press('Enter'); assert.equal(await buttons.nth(0).getAttribute('aria-expanded'),'true');
  assert.equal(await faq.getByRole('link').getAttribute('href'),'/book-consultation'); assert.deepEqual(errors,[]);
  console.log(JSON.stringify({width,...state,accordion:'passed',errors})); await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
