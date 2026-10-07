const {chromium}=require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
for(const width of [282,402,767,1440]){
await p.setViewportSize({width,height:714});await p.goto('http://localhost:3000/pricing');await p.evaluate(()=>document.fonts.ready);
const s=p.getByRole('region',{name:'Meddy membership plans'});await s.evaluate(e=>window.scrollTo(0,e.offsetTop));await p.waitForTimeout(300);
const track=s.locator('article').first().locator('..');
console.log(await track.evaluate(e=>({width:innerWidth,documentWidth:document.documentElement.scrollWidth,trackWidth:e.clientWidth,scrollWidth:e.scrollWidth,cards:[...e.children].map(c=>({x:c.offsetLeft,y:c.offsetTop,width:c.offsetWidth,height:c.offsetHeight,lastBottom:c.querySelector('li:last-child').getBoundingClientRect().bottom,buttonTop:c.querySelector('button').getBoundingClientRect().top}))})));
if(width===402)await p.screenshot({path:'tmp/pricing-carousel-first.png'});
if(width<768){
for(let i=1;i<3;i++){await track.evaluate((e,i)=>e.scrollTo({left:e.children[i].offsetLeft-e.children[0].offsetLeft,behavior:'instant'}),i);await p.waitForTimeout(300);const rect=await s.locator('article').nth(i).boundingBox();if(Math.abs(rect.x-18*Math.max(.85,Math.min(1.4,width/344)))>2)throw Error('Incorrect snap alignment');if(width===402)await p.screenshot({path:`tmp/pricing-carousel-${i}.png`});}
await s.locator('article').first().focus();await p.waitForTimeout(300);if(await track.evaluate(e=>e.scrollLeft)>2)throw Error('Keyboard focus did not return to first card');
}}
await b.close();})().catch(e=>{console.error(e);process.exit(1)});
