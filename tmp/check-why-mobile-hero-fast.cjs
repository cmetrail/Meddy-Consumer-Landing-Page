const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
const b=await chromium.launch({headless:true,executablePath:'C:/Users/User/AppData/Local/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-win64/chrome-headless-shell.exe'});
const p=await b.newPage();
for(const [width,height] of [[390,844],[320,690],[430,932],[1440,1000]]){
 await p.setViewportSize({width,height}); await p.goto('http://localhost:3000/why-meddy',{waitUntil:'domcontentloaded',timeout:60000});  await p.waitForFunction(()=>{const img=document.querySelector('main > section img');return img && img.complete && img.naturalWidth>0},{},{timeout:15000}); await p.waitForTimeout(1000);
 await p.locator('main > section').first().screenshot({path:`tmp/why-mobile-hero-${width}.png`});
 console.log(JSON.stringify({width,height,overflow:await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),hero:await p.locator('main > section').first().boundingBox()}));
}
await p.setViewportSize({width:390,height:844});await p.reload({waitUntil:'domcontentloaded'});await p.getByRole('button',{name:'Toggle menu'}).click(); console.log('menu opens:',await p.getByRole('button',{name:'Close menu'}).isVisible());await p.getByRole('button',{name:'Close menu'}).click();console.log('menu closes:',await p.getByRole('button',{name:'Close menu'}).count()===0);
await b.close();
})();



