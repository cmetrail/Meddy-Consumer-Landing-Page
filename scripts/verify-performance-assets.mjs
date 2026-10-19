import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
const projectRequire = createRequire(import.meta.url);
const sharp = createRequire(projectRequire.resolve('next/package.json'))('sharp');
async function main() {
  const source = await fs.readFile('public/home/one-physician.svg', 'utf8');
  const output = await fs.readFile('public/home/one-physician.optimized.svg', 'utf8');
  const stripImages = text => text.replace(/data:image\/[^;]+;base64,[A-Za-z0-9+/=]+/g, 'IMAGE');
  if (stripImages(source) !== stripImages(output)) throw Error('SVG structure changed');
  for (const width of [150, 337, 674]) {
    const a = await sharp(Buffer.from(source), { unlimited: true }).resize({ width }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const b = await sharp(Buffer.from(output)).resize({ width }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    let squared = 0;
    let alphaChanges = 0;
    for (let i = 0; i < a.data.length; i++) {
      squared += (a.data[i] - b.data[i]) ** 2;
      if (i % 4 === 3 && a.data[i] !== b.data[i]) alphaChanges++;
    }
    const rmse = Math.sqrt(squared / a.data.length);
    console.log({ width, rmse, alphaChanges });
    if (rmse > 3 || alphaChanges !== 0) throw Error('SVG visual difference exceeds tolerance');
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
