# stronghandssoftheart.com

The website of Strong Hands, Soft Heart LLC: cold-process soap (planned for late 2026), two free bilingual picture books, Notes, and AI and engineering consulting.

Live: [www.stronghandssoftheart.com](https://www.stronghandssoftheart.com)

## Stack

- [Astro](https://astro.build) 7, static output, no adapter
- Plain CSS from the SH&SH design system (`src/styles/shsh.css`); no CSS framework
- The Ground: a WebGL fragment shader (`design-system/ground.frag`, a copy of the design system's) draws the mark's geometry as entropy behind the hero, page heads and deep sections, thinned under the text block; vanilla WebGL in `src/scripts/ground.ts`, no library
- Self-hosted Unbounded (display) and Geist (text), variable, OFL (`public/fonts/`)
- Contact posts to [Formspree](https://formspree.io). Sign-up posts to Formspree while the Kit form ID is empty, then to [Kit](https://kit.com) when that ID is set. No server code, no API keys
- Deployed on Vercel

## Run it

```bash
pnpm install
pnpm dev
```

Open http://localhost:4321.

```bash
pnpm build     # static site in dist/
pnpm check     # type check
pnpm tokens    # rebuild src/styles/tokens.css from design-system/tokens.json
pnpm og        # rebuild public/og.png and public/apple-touch-icon.png
pnpm lockup    # regenerate the SHSH lockup SVGs from the Unbounded font
```

## Where things live

| Path                        | What                                                      |
| --------------------------- | --------------------------------------------------------- |
| `src/config/site.ts`        | Name, URLs, email, nav, form IDs, analytics ID            |
| `src/data/`                 | Crafts and their status, books, consulting content        |
| `src/components/`           | Design-system components as Astro components              |
| `src/pages/`                | One file per page, plus `llms.txt.ts` and `robots.txt.ts` |
| `design-system/tokens.json` | A copy of the design system's tokens                      |
| `src/styles/tokens.css`     | Generated from `tokens.json`; never edit by hand          |

## The design system

The source of truth for color, type, components, and copy rules is the **Strong Hands, Soft Heart** design system in Claude ([artifact](https://claude.ai/artifact/DgKWHM1nNAfz2vCYi13KbY)). Read its README before you change copy: every line on this site is a fact, an intention, or a feeling, and says which.

To change tokens: edit them in the design system, copy `project/tokens.json` to `design-system/tokens.json`, run `pnpm tokens`, and commit both files.

## Email list

`KIT_FORM_ID` in `src/config/site.ts` holds the Kit form ID. While it is empty, the sign-up form posts to Formspree, and those addresses are imported into Kit later.

## License

Code: MIT. Text, the mark, and the book art: © Strong Hands, Soft Heart LLC; see the [terms](https://www.stronghandssoftheart.com/terms-of-service).
