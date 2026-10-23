const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright-core');
const assert = require('node:assert/strict');
(async()=>{
const browser=await chromium.launch({headless:true,executablePath:'C:/Users/User/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe'});
for (const width of [1920,1440,975,390,320]) {
const page=await browser.newPage({viewport:{width,height:956},reducedMotion:'reduce'});
await page.goto('http://localhost:3000/physician-care',{waitUntil:'networkidle'});
await page.evaluate(()=>document.fonts.ready);
const section=page.locator('#physician-care-profile');
await section.scrollIntoViewIfNeeded();
const state=await page.evaluate(()=>{const s=document.querySelector('#physician-care-profile'),c=s.querySelector('h2'),f=s.querySelector('figure'),logo=document.querySelector('header a img');return {logoLeft:logo.getBoundingClientRect().left,copyLeft:c.getBoundingClientRect().left,portraitWidth:f.clientWidth,portraitHeight:f.clientHeight,overflow:document.documentElement.scrollWidth>innerWidth};});
assert.ok(Math.abs(state.logoLeft-state.copyLeft)<1,'Align copy with logo');
assert.equal(state.overflow,false);
if(width===1920){await section.screenshot({path:'tmp/physician-profile-logo-aligned-1920.png'});await section.locator('figure').screenshot({path:'tmp/physician-profile-portrait-1920.png'});}
if(width===390)await section.screenshot({path:'tmp/physician-profile-logo-aligned-390.png'});
console.log(JSON.stringify({width,...state}));
await page.close();
}
await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
