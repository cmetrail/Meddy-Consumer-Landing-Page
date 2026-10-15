const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  await Promise.all([1440, 390].map(async width => {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://localhost:3000/how-it-works', { waitUntil: 'networkidle' });
    const section = page.locator('#track-your-day');
    const panel = page.locator('#daily-health-panel');
    const assertLabel = async expected => {
      const actual = await panel.locator('h3').textContent();
      const selected = await section.locator('button[aria-pressed="true"]').textContent();
      if (actual !== expected || selected !== expected) throw Error(JSON.stringify({ width, expected, actual, selected }));
    };
    await page.waitForTimeout(5200);
    await assertLabel('Nutrients');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    for (const label of ['Fitness', 'Sleep', 'Recovery', 'Nutrients']) {
      await page.waitForTimeout(5100);
      await assertLabel(label);
    }
    await panel.hover();
    await page.waitForTimeout(5200);
    await assertLabel('Nutrients');
    await section.getByRole('button', { name: 'Sleep', exact: true }).click();
    await page.mouse.move(0, 0);
    await page.waitForTimeout(5200);
    await assertLabel('Sleep');
    await page.evaluate(() => { document.activeElement.blur(); window.scrollTo(0, 0); });
    await page.waitForTimeout(5200);
    await assertLabel('Sleep');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(5500);
    await assertLabel('Recovery');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const animation = await panel.locator('h3').evaluate(el => getComputedStyle(el).animationName);
    if (animation !== 'none') throw Error('Reduced-motion animation remains active');
    if (errors.length) throw Error(JSON.stringify(errors));
    console.log(`PASS ${width}px: full rotation, hover/focus pause, manual selection, offscreen pause, resume, reduced motion`);
    await page.close();
  }));
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
