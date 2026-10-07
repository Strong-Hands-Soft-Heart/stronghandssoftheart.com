// public/brand/*.svg → public/og.png (1200×630) and public/apple-touch-icon.png (180×180).
// The lockup is outlined, so no fonts are needed to render it. Run with `pnpm og`.

import { readFileSync } from 'node:fs';
import sharp from 'sharp';

const brand = (name) => readFileSync(new URL(`../public/brand/${name}`, import.meta.url), 'utf8');

// The SHSH lockup (ink letters, earth mark), centred on paper with a light grain.
const lockup = brand('shsh-lockup-heart.svg')
  .replace(/width="[^"]*"/, 'width="760"')
  .replace(/height="[^"]*"/, 'height="150"')
  .replace('<svg ', '<svg x="220" y="240" ');

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter></defs>
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect width="1200" height="630" filter="url(#grain)" opacity="0.08"/>
  ${lockup}
  <rect x="520" y="430" width="160" height="2" fill="#ff2f92"/>
</svg>`;

await sharp(Buffer.from(og))
  .png()
  .toFile(new URL('../public/og.png', import.meta.url).pathname);
await sharp(Buffer.from(brand('app-icon.svg')))
  .resize(180, 180)
  .png()
  .toFile(new URL('../public/apple-touch-icon.png', import.meta.url).pathname);

console.log('og.png and apple-touch-icon.png written');
