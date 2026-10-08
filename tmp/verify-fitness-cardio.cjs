const {chromium}=require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
await page.goto('http://localhost:3000/fitness');
await page.evaluate(()=>document.fonts.ready);
const card=page.getByRole('group',{name:'Training category'}).locator('..');
await card.getByRole('button',{name:'Cardio',exact:true}).click();
await card.scrollIntoViewIfNeeded();
await card.screenshot({path:'tmp/fitness-cardio-reference.png'});
console.log('Desktop',await card.boundingBox());
console.log(await card.innerText());
for(const width of [390,320]){
await page.setViewportSize({width,height:844});
await card.scrollIntoViewIfNeeded();
await card.screenshot({path:`tmp/fitness-cardio-${width}.png`});
console.log('Mobile',width,await card.evaluate(el=>({width:el.clientWidth,scrollWidth:el.scrollWidth,pageWidth:document.documentElement.scrollWidth})));
}
await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
