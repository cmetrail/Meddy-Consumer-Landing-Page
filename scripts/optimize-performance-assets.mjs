// Run from the project root: node scripts/optimize-performance-assets.mjs
// Keep source artwork available; only generated files are used by the pages.
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
const projectRequire = createRequire(import.meta.url);
const sharp = createRequire(projectRequire.resolve('next/package.json'))('sharp');

async function main() {
  const file = 'public/home/one-physician.svg';
  const original = await fs.readFile(file, 'utf8');
  let optimized = original;
  for (const match of original.matchAll(/data:image\/jpeg;base64,([A-Za-z0-9+/=]+)/g)) {
    const image = await sharp(Buffer.from(match[1], 'base64'))
      .resize({ width: 2048, height: 2048, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 95, chromaSubsampling: '4:4:4', mozjpeg: true })
      .toBuffer();
    optimized = optimized.replace(match[0], `data:image/jpeg;base64,${image.toString('base64')}`);
  }
  // Width/height, transforms, paths, filters, and all other SVG markup stay exact.
  await fs.writeFile('public/home/one-physician.optimized.svg', optimized);
  console.log(`Enrollment SVG: ${Buffer.byteLength(original)} -> ${Buffer.byteLength(optimized)} bytes`);

  for (const name of ['doctor', 'womenn', 'runner', 'women-with-pillow', 'fitness/fitness-measurable-bg']) {
    const source = `public/${name}.png`;
    const output = `public/${name}.lossless.webp`;
    const input = await fs.readFile(source);
    const encoded = await sharp(input).webp({ lossless: true, effort: 6 }).toBuffer();
    const before = await sharp(input).ensureAlpha().raw().toBuffer();
    const after = await sharp(encoded).ensureAlpha().raw().toBuffer();
    // WebP can discard RGB under fully transparent pixels; those never display.
    for (let pixel = 0; pixel < before.length; pixel += 4) {
      if (before[pixel + 3] !== after[pixel + 3] ||
          (before[pixel + 3] !== 0 && !before.subarray(pixel, pixel + 3).equals(after.subarray(pixel, pixel + 3)))) {
        throw new Error(`Visible pixel verification failed: ${source} at ${pixel / 4}`);
      }
    }
    await fs.writeFile(output, encoded);
    console.log(`${name}: ${input.length} -> ${encoded.length} bytes; visible decoded pixels identical`);
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
