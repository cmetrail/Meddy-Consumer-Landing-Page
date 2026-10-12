const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  for (const width of [320, 390, 768, 1300, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const result = await page.locator('.a1c-scroll').evaluate(root => {
      const svg = root.querySelector('[data-graph-chart] svg');
      const marker = root.querySelector('.a1c-marker');
      const label = root.querySelector('.a1c-phases span:nth-child(2)');
      const point = svg.createSVGPoint();
      point.x = Number(marker.getAttribute('x1'));
      point.y = Number(marker.getAttribute('y2'));
      const markerX = point.matrixTransform(svg.getScreenCTM()).x;
      const rect = label.getBoundingClientRect();
      return { markerX, labelX: rect.left + rect.width / 2, delta: Math.abs(markerX - rect.left - rect.width / 2), overflow: document.documentElement.scrollWidth > innerWidth };
    });
    console.log(JSON.stringify({ width, ...result }));
    if (result.delta > 1 || result.overflow) throw Error('Alignment failed');
  }
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
