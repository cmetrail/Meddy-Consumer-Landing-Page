const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
const b=await chromium.launch({headless:true,executablePath:'C:/Users/User/AppData/Local/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-win64/chrome-headless-shell.exe'});const p=await b.newPage({reducedMotion:'reduce'});
for(const width of [390,320,430,1440]){
await p.setViewportSize({width,height:1000});await p.goto('http://localhost:3000/why-meddy',{waitUntil:'domcontentloaded'});
const section=p.locator('main > section').nth(2); await section.scrollIntoViewIfNeeded();
await section.locator('img:visible').evaluateAll(imgs=>Promise.all(imgs.map(img=>{img.loading='eager';return Promise.race([img.decode().catch(()=>{}),new Promise(resolve=>setTimeout(resolve,3000))])})));
await p.waitForTimeout(1000);await section.screenshot({path:`tmp/why-mobile-picture-${width}.png`});console.log(JSON.stringify({width,box:await section.boundingBox(),overflow:await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth)}));
}await b.close();})();


