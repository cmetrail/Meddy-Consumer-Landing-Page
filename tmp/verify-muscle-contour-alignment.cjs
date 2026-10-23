const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch();
 try{
 for(const width of [1440,390,320]){
 const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
 await page.goto('http://localhost:3000/fitness',{waitUntil:'networkidle'});
 const diagram=page.locator('[aria-label="Training load by muscle group"]');
 await diagram.scrollIntoViewIfNeeded();
 const result=await diagram.evaluate(el=>{
 const body=el.querySelector('[data-muscle-body]').getBoundingClientRect();
 const svg=el.querySelector('[aria-label="Explore muscle targets"]').getBoundingClientRect();
 const anchors=[...el.querySelectorAll('[data-muscle-connector]')].map(g=>{
 const p=el.querySelector(`[data-muscle-region="${g.dataset.muscleConnector}"]`);
 const circle=g.querySelector('[data-connector-end]');
 const point=new DOMPoint(+circle.getAttribute('cx'),+circle.getAttribute('cy')).matrixTransform(circle.getScreenCTM()).matrixTransform(p.getScreenCTM().inverse());
 return {label:g.dataset.muscleConnector,inside:p.isPointInFill(point)};
 });
 return {aligned:['x','y','width','height'].every(key=>Math.abs(body[key]-svg[key])<0.1),anchors};
 });
 assert.equal(result.aligned,true,'overlay matches source image bounds');
 assert.ok(result.anchors.every(item=>item.inside),JSON.stringify(result.anchors));
 for(const name of ['Chest','Biceps']){
 await diagram.locator(`[data-muscle-label="${name}"]`).click();
 assert.equal(await diagram.locator(`[data-muscle-region="${name}"]`).count(),0);
 assert.match(await diagram.locator('[class*="exampleNote"]').innerText(),/Not visible in this back view/);
 }
 console.log(`${width}px: source alignment, all connector anchors, anterior muscle handling passed`);
 await page.close();
 }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
