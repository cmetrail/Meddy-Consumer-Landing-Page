const {chromium}=require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
for(const width of [1000,1440,390,320]){
 await p.setViewportSize({width,height:900});await p.goto('http://localhost:3000/biomarkers');await p.evaluate(()=>document.fonts.ready);
 const s=p.locator('#cause-effect');await s.scrollIntoViewIfNeeded();await p.waitForFunction(()=>document.querySelector('#cause-effect img').complete);await p.waitForTimeout(200);
 await s.screenshot({path:`tmp/cause-effect-match-${width}.png`});
 for(const tab of ['Nutrition','Weight','Exercise','Sleep','Medication']){
  const button=s.getByRole('button',{name:tab,exact:true});await button.click();if(await button.getAttribute('aria-pressed')!=='true')throw Error('Inactive tab');
  const overflow=await s.locator('#cause-effect-chart').evaluate(el=>el.scrollWidth>el.clientWidth+2);if(overflow)console.log('Chart overflow:',width,tab);
 }
 console.log(await s.evaluate(el=>({width:innerWidth,pageWidth:document.documentElement.scrollWidth,height:el.offsetHeight})));
}await b.close();})().catch(e=>{console.error(e);process.exit(1)});
