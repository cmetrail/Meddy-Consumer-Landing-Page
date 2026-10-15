const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  for (const width of [1146, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 850 } });
    const errors = [];
    const models = new Set();
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => {
      if (response.url().endsWith('.glb') && response.ok()) models.add(response.url().split('/').pop());
    });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);
    for (const variant of ['nutrition', 'fitness', 'sleep']) {
      const root = page.locator(`[data-variant=${variant}]`);
      const top = await root.evaluate(element => element.getBoundingClientRect().top + window.scrollY);
      const samples = [];
      for (const fraction of [.9, .47, .05]) {
        await page.evaluate(y => window.scrollTo(0, y), top - 850 * fraction);
        await page.waitForTimeout(1600);
        samples.push(await root.evaluate(element => ({
          width: Number(element.querySelector('[data-graph-reveal]').getAttribute('width')),
          cards: [...element.querySelectorAll('[data-marker]')].map(card => Number(getComputedStyle(card).opacity)),
          canvas: element.querySelectorAll('canvas').length,
          summary: Number(getComputedStyle(element.querySelector('[data-reveal-x="680"]')).opacity),
        })));
        if (fraction === .47) await root.screenshot({ path: `tmp/orb-${variant}-${width}.png` });
      }
      if (samples[0].width > 2 || samples[0].cards.some(opacity => opacity > .01) || samples[0].summary > .01 || samples[1].width < 200 || samples[1].width > 500 || samples[2].width < 719 || samples[1].canvas !== 1 || samples[2].cards.some(opacity => opacity < .99) || samples[2].summary < .99) {
        throw Error(JSON.stringify({ width, variant, samples }));
      }
      console.log(JSON.stringify({ width, variant, samples }));
    }
    if (!models.has('emerald-orb.glb') || !models.has('pearl-orb.glb')) throw Error('Both GLB models did not load: ' + [...models]);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(400);
    const reduced = await page.locator('[data-variant]').evaluateAll(roots => roots.map(root => ({
      width: Number(root.querySelector('[data-graph-reveal]').getAttribute('width')),
      canvas: root.querySelectorAll('canvas').length,
      hidden: [...root.querySelectorAll('[data-reveal-x]')].some(card => Number(getComputedStyle(card).opacity) < 1),
    })));
    if (reduced.some(root => root.width !== 720 || root.canvas || root.hidden)) throw Error(JSON.stringify(reduced));
    if (errors.length) throw Error(JSON.stringify(errors));
    await page.close();
  }
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
