const {chromium}=require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
 const b=await chromium.launch();
 const p=await b.newPage({viewport:{width:440,height:956}});
 await p.goto('http://localhost:3000',{waitUntil:'networkidle'});
 for(const width of [440,1440,440,1440,390,1440,320,440]){
  await p.setViewportSize({width,height:956});await p.waitForTimeout(400); await p.evaluate(()=>window.scrollTo({top:document.querySelector("#why-meddy").getBoundingClientRect().top+window.scrollY,behavior:"instant"})); await p.waitForTimeout(1000); await p.evaluate(()=>window.scrollTo({top:document.querySelector("#why-meddy").getBoundingClientRect().top+window.scrollY+600,behavior:"instant"})); await p.waitForTimeout(1000);
  const sizes=await p.locator('#why-meddy').evaluate(el=>{
   const image=el.querySelector('img[alt="Athlete resting after a workout"]');
   return {workoutWidth:image.getBoundingClientRect().width,overflow:el.scrollWidth>el.clientWidth, parents:[image.parentElement,image.parentElement.parentElement,image.parentElement.parentElement.parentElement].map(e=>({width:getComputedStyle(e).width,transform:getComputedStyle(e).transform,scale:getComputedStyle(e).scale,style:e.getAttribute("style"),pending:e.getAttribute("data-mobile-motion")}))};
  });
  const expected=width<=767?91*width/282:240;
  console.log({width,...sizes,expected});
  if(sizes.overflow||Math.abs(sizes.workoutWidth-expected)>1)throw new Error('Resize changed card dimensions');
 }
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});



