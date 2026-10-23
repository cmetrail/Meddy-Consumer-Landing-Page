const { chromium } = require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async () => {
 const browser = await chromium.launch({headless:true,executablePath:"C:/Users/User/AppData/Local/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-win64/chrome-headless-shell.exe"});
 const page = await browser.newPage({viewport:{width:642,height:900},deviceScaleFactor:1});
 await page.goto('http://localhost:3000/why-meddy');
 const footer = page.locator('main > section').last();
 await footer.scrollIntoViewIfNeeded();
 await page.evaluate(() => document.fonts.ready);
 await page.waitForTimeout(1500);
 await footer.screenshot({path:'tmp/why-meddy-footer-642.png'});
 console.log(await footer.boundingBox());
 for (const width of [390,1440]) {
  await page.setViewportSize({width,height:1000});
  await footer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await footer.screenshot({path:`tmp/why-meddy-footer-${width}.png`});
  console.log(JSON.stringify({width,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)}));
 }
 await browser.close();
})();

