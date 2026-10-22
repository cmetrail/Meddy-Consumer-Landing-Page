const {chromium}=require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const sharp=require('sharp');
(async()=>{const browser=await chromium.launch();const page=await browser.newPage({viewport:{width:1032,height:1376},hasTouch:true,reducedMotion:'reduce'});
const routes=['/','/physician-care','/fitness','/pricing','/wearables','/personalized-health-plans','/nutrition','/why-meddy','/biomarkers'];
for(let i=0;i<routes.length;i+=3){const shots=[];for(const route of routes.slice(i,i+3)){await page.goto('http://localhost:3000'+route,{waitUntil:'networkidle'});shots.push(await sharp(await page.screenshot()).resize(516,688).toBuffer());}await sharp({create:{width:1548,height:688,channels:3,background:'#fff'}}).composite(shots.map((input,j)=>({input,left:j*516,top:0}))).png().toFile(`tmp/tablet-heroes-${i}.png`);}
await page.goto('http://localhost:3000/',{waitUntil:'networkidle'});for(let y=0;y<18000;y+=700){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(80)}await page.screenshot({path:'tmp/home-tablet-loaded.png',fullPage:true});await browser.close();})().catch(e=>{console.error(e);process.exit(1)});
