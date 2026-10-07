// design-system/tokens.json → src/styles/tokens.css
//
// tokens.json is a copy of project/tokens.json from the SH&SH design system
// (https://claude.ai/artifact/DgKWHM1nNAfz2vCYi13KbY). Edit tokens there, copy the
// file here, and run `pnpm tokens`. Never edit tokens.css by hand.
//
// Day is the default. Night applies with prefers-color-scheme: dark, unless the page
// pins data-theme="light", and always with data-theme="night".

import { readFileSync, writeFileSync } from 'node:fs';

const tokens = JSON.parse(readFileSync(new URL('../design-system/tokens.json', import.meta.url)));
const [day, night] = tokens.color.themes.map((theme) => theme.id);

const dayVars = [];
const nightVars = [];

const valueFor = (value, theme) =>
  typeof value === 'string' ? value : (value[theme] ?? value[day]);

for (const { name, value } of tokens.color.tokens) {
  dayVars.push(`  --${name}: ${valueFor(value, day)};`);
  if (typeof value !== 'string' && value[night]) nightVars.push(`  --${name}: ${value[night]};`);
}

for (const family of ['spacing', 'radius', 'measure']) {
  for (const { name, value } of tokens[family]?.tokens ?? [])
    dayVars.push(`  --${name}: ${value};`);
}

for (const { name, value } of tokens.shadow?.tokens ?? []) {
  dayVars.push(`  --${name}: ${valueFor(value, day)};`);
  if (typeof value !== 'string' && value[night]) nightVars.push(`  --${name}: ${value[night]};`);
}

dayVars.push(`  --font-display: ${tokens.type.families.display};`);
dayVars.push(`  --font-text: ${tokens.type.families.text};`);

const night_ = nightVars.join('\n');
const css = `/* ${tokens.name} — generated from design-system/tokens.json by scripts/build-tokens.mjs. Do not edit. */

:root {
  color-scheme: light;
${dayVars.join('\n')}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    color-scheme: dark;
${night_.replace(/^/gm, '  ')}
  }
}

:root[data-theme='night'] {
  color-scheme: dark;
${night_}
}
`;

writeFileSync(new URL('../src/styles/tokens.css', import.meta.url), css);
console.log(`tokens.css: ${dayVars.length} variables, ${nightVars.length} night overrides`);
