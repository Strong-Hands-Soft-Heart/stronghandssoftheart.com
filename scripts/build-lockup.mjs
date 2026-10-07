// The SHSH lockup, in Unbounded 700: SH, the mark, SH. Letters are outlined so the
// SVG needs no font. Writes public/brand/shsh-lockup{,-heart,-paper}.svg. Run `pnpm lockup`.
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const fontkit = require('fontkit');
const woff2 = require('wawoff2');

const ttf = await woff2.decompress(readFileSync(new URL('../public/fonts/Unbounded-Variable.woff2', import.meta.url)));
const font = fontkit.create(Buffer.from(ttf)).getVariation({ wght: 700 });
const cap = font.capHeight; // font units, 1000 per em
const gap = 0.15 * cap; // the system's rule: 15% of the cap on each side of the mark
const markSize = 0.94 * cap; // 94% of the cap height
const stroke = 0.075 * cap;

const letters = (text, x) => {
  const run = font.layout(text);
  let paths = '';
  for (const glyph of run.glyphs) {
    paths += `<path d="${glyph.path.toSVG()}" transform="translate(${x.toFixed(1)} 0) scale(1 -1)"/>`;
    x += glyph.advanceWidth;
  }
  return { paths, x };
};

const one = letters('SH', 0);
const markX = one.x + gap;
const half = markSize / 2;
const cy = -cap / 2;
const two = letters('SH', markX + markSize + gap);
const width = two.x;
const pad = stroke;

const svg = (ink, heart) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-cap - pad} ${width + 2 * pad} ${cap + 2 * pad}" width="${Math.round((width + 2 * pad) / 10)}" height="${Math.round((cap + 2 * pad) / 10)}" role="img" aria-label="SHSH">
<g fill="${ink}">${one.paths}${two.paths}</g>
<g fill="none" stroke="${heart}" stroke-width="${stroke.toFixed(1)}" stroke-linejoin="miter">
<polygon points="${markX + half},${cy - half} ${markX + markSize},${cy} ${markX + half},${cy + half} ${markX},${cy}"/>
<line x1="${markX}" y1="${cy}" x2="${markX + markSize}" y2="${cy}"/>
</g>
</svg>
`;

const out = (name, ink, heart) => writeFileSync(new URL(`../public/brand/${name}`, import.meta.url), svg(ink, heart));
out('shsh-lockup.svg', '#0a0a0a', '#0a0a0a');
out('shsh-lockup-heart.svg', '#0a0a0a', '#ff2f92');
out('shsh-lockup-paper.svg', '#ffffff', '#ffffff');
console.log(`lockup: ${Math.round(width)} × ${cap} units, mark ${Math.round(markSize)}`);
