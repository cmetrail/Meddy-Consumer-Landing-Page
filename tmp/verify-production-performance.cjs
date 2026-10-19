const assert = require('node:assert/strict');
const { createRequire } = require('node:module');
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
const { chromium } = require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');

async function main() {
  const browser = await chromium.launch({ headless: true, args: ['--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader'] });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://localhost:3100', { waitUntil: 'networkidle' });
    await page.waitForTimeout(11000);
    const hero = await page.locator('#hero').evaluate(root => [...root.querySelectorAll('img')].map(image => ({ src: image.currentSrc, loaded: image.complete && image.naturalWidth > 0 })));
    assert(hero.some(image => image.src.includes('lossless.webp')));
    assert(hero.slice(0, 3).every(image => image.loaded), 'upcoming hero slides must load');
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      const chart = page.locator('[data-variant="nutrition"]');
      await chart.scrollIntoViewIfNeeded();
      await chart.locator('canvas').waitFor({ state: 'attached', timeout: 30000 });
      const geometry = await page.locator('[data-trend-path]').evaluateAll(paths => {
        let maxDistance = 0;
        for (const path of paths) {
          const total = path.getTotalLength();
          const samples = Array.from({ length: 257 }, (_, i) => path.getPointAtLength(total * i / 256));
          for (let x = 0; x <= 720; x += 3) {
            let a = 0, b = total;
            for (let i = 0; i < 22; i++) { const m = (a + b) / 2; if (path.getPointAtLength(m).x < x) a = m; else b = m; }
            const original = path.getPointAtLength((a + b) / 2);
            let left = 0, right = 256;
            while (right - left > 1) { const m = (left + right) / 2; if (samples[m].x < x) left = m; else right = m; }
            a = total * left / 256; b = total * right / 256;
            for (let i = 0; i < 14; i++) { const m = (a + b) / 2; if (path.getPointAtLength(m).x < x) a = m; else b = m; }
            const optimized = path.getPointAtLength((a + b) / 2);
            maxDistance = Math.max(maxDistance, Math.hypot(original.x - optimized.x, original.y - optimized.y));
          }
        }
        return { paths: paths.length, maxDistance };
      });
      assert(geometry.paths > 0);
      assert(geometry.maxDistance < 0.001, 'graph motion must retain original precision');
      await page.emulateMedia({ reducedMotion: 'reduce' });
      const section = page.locator('#physician-care');
      await section.scrollIntoViewIfNeeded();
      await section.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      const after = await section.screenshot({ path: `tmp/performance-enrollment-${width}.png` });
      const graphic = section.locator('img[src*="one-physician"]');
      const optimizedSource = await graphic.getAttribute('src');
      await graphic.evaluate(async image => { image.src = '/home/one-physician.svg'; await image.decode(); });
      const before = await section.screenshot({ path: `tmp/performance-enrollment-original-${width}.png` });
      const a = await sharp(before).raw().toBuffer();
      const b = await sharp(after).raw().toBuffer();
      assert.equal(a.length, b.length, 'section dimensions must be unchanged');
      let squared = 0;
      for (let i = 0; i < a.length; i++) squared += (a[i] - b[i]) ** 2;
      const rmse = Math.sqrt(squared / a.length);
      assert(rmse < 3, `section visual difference exceeds tolerance: ${rmse}`);
      await graphic.evaluate(async (image, src) => { image.src = src; await image.decode(); }, optimizedSource);
      console.log({ width, geometry, sectionPixelRMSE: rmse });
      await page.emulateMedia({ reducedMotion: 'no-preference' });
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(200);
    assert.equal(await page.locator('[data-variant="nutrition"] canvas').count(), 0);
    await page.goto('http://localhost:3100/fitness', { waitUntil: 'networkidle' });
    const background = page.locator('img[src*="fitness-measurable-bg"]').first();
    await background.evaluate(async image => { image.loading = 'eager'; await image.decode(); });
    for (const route of ['/why-meddy', '/how-it-works', '/biomarkers', '/physician-care', '/']) {
      await page.goto(`http://localhost:3100${route}`, { waitUntil: 'networkidle' });
    }
    assert.deepEqual(errors, []);
    console.log('Production hero loading, desktop/mobile charts, reduced motion, images, routes, and browser errors passed.');
  } finally {
    await browser.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
