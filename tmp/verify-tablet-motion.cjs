const {chromium}=require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const sharp=require('sharp');
const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch();for(const [width,height] of [[744,1133],[1032,1376],[960,1280]]){const page=await browser.newPage({viewport:{width,height},hasTouch:true});
await page.goto('http://localhost:3000/biomarkers',{waitUntil:'networkidle'});const track=page.locator(width<1024?'[data-depth-mobile-track]':'[data-depth-track]');const box=await track.boundingBox();await page.evaluate(y=>scrollTo(0,y),box.y);await page.waitForTimeout(700);await page.evaluate(y=>scrollTo(0,y),box.y+box.height-height-2);await page.waitForTimeout(1600);const last=page.locator(width<1024?'[data-depth-mobile-snapshot]':'[data-depth-snapshot]').last();assert.ok(Number(await last.evaluate(el=>getComputedStyle(el).opacity))>.95,'Last biomarker month never appears');
await page.goto('http://localhost:3000/247-care',{waitUntil:'networkidle'});await page.screenshot({path:`tmp/care-tablet-${width}.png`});
await page.goto('http://localhost:3000/',{waitUntil:'networkidle'});await page.waitForTimeout(1200);await page.screenshot({path:`tmp/home-hero-tablet-${width}.png`});for(const id of ['workouts','sleep-monitoring']){const el=page.locator('#'+id);await el.scrollIntoViewIfNeeded();await page.waitForTimeout(700);await el.screenshot({path:`tmp/${id}-tablet-${width}.png`});}
console.log(`PASS touch scroll and screenshots ${width}x${height}`);await page.close();}
await browser.close();})().catch(e=>{console.error(e);process.exit(1)});
