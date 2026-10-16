const {chromium}=require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch();const errors=[];for(const width of [227,320,390,767,1440]){
 const p=await b.newPage({viewport:{width,height:900}});p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://localhost:3000/weight-loss',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
 const footer=p.locator('section').last();await footer.scrollIntoViewIfNeeded();await p.waitForTimeout(1100);
 await footer.screenshot({path:`tmp/weight-loss-footer-reference-${width}.png`});
 const state=await footer.evaluate(el=>{const r=el.getBoundingClientRect();const nav=el.querySelector('[data-footer-mobile-nav]');const buttons=[...el.querySelectorAll('[data-footer-stores] button')].map(n=>n.getBoundingClientRect().toJSON());return {height:r.height,links:nav.children.length,navDisplay:getComputedStyle(nav).display,desktopNav:getComputedStyle(el.querySelector('[data-footer-nav]')).display,socials:getComputedStyle(el.querySelector('[data-footer-brand] > div')).display,legalOpacity:getComputedStyle(el.querySelector('[data-footer-legal]')).opacity,buttons,overflow:[...el.querySelectorAll('button,nav a,p,img')].filter(n=>{const b=n.getBoundingClientRect();return b.width&&(b.left<r.left-1||b.right>r.right+1)}).map(n=>n.textContent||n.getAttribute('src'))}});
 assert.deepEqual(state.overflow,[]);
 if(width<768){assert.equal(state.links,15);assert.equal(state.navDisplay,'flex');assert.equal(state.desktopNav,'none');assert.equal(state.socials,'none');assert.equal(state.legalOpacity,'1');assert.ok(Math.abs(state.buttons[0].top-state.buttons[1].top)<1);}
 else assert.equal(state.navDisplay,'none');
 console.log(JSON.stringify({width,height:state.height,links:state.links,result:'pass'}));await p.close();
 }assert.deepEqual(errors,[]);await b.close()})().catch(e=>{console.error(e);process.exit(1)});
