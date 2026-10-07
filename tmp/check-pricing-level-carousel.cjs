const{chromium}=require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
for(const width of [320,408,767,1024,1440]){
await p.setViewportSize({width,height:906});await p.goto('http://localhost:3000/pricing');await p.evaluate(()=>document.fonts.ready);
const s=p.getByRole('region',{name:'Care that grows with your goals'});await s.evaluate(e=>window.scrollTo(0,e.offsetTop));await p.waitForTimeout(1000);
const track=s.locator('article').first().locator('..');
console.log(JSON.stringify(await s.evaluate(e=>({width:innerWidth,pageWidth:document.documentElement.scrollWidth,height:e.offsetHeight,heading:e.querySelector('h2').getBoundingClientRect().toJSON(),cards:[...e.querySelectorAll('article')].map(c=>({x:c.getBoundingClientRect().x,width:c.offsetWidth,image:c.querySelector('img').getBoundingClientRect().toJSON(),caption:c.querySelector('p').getBoundingClientRect().toJSON()}))}))));
if(width===408)await p.screenshot({path:'tmp/pricing-level-carousel-first.png'});
if(width<1024){for(let i=1;i<3;i++){await track.evaluate((e,i)=>e.scrollTo({left:e.children[i].offsetLeft-e.children[0].offsetLeft,behavior:'instant'}),i);await p.waitForTimeout(300);const card=await s.locator('article').nth(i).boundingBox();if(Math.abs(card.x-21*Math.min(1.4,width/408))>2)throw Error('Carousel alignment failed');if(width===408)await p.screenshot({path:`tmp/pricing-level-carousel-${i}.png`});}
await s.locator('article').first().focus();await p.waitForTimeout(300);if(await track.evaluate(e=>e.scrollLeft)>2)throw Error('Keyboard focus failed');}
}
await b.close();})().catch(e=>{console.error(e);process.exit(1)});
