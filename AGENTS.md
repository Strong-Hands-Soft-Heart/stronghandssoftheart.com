# Agent instructions: stronghandssoftheart.com

This file wins for work in this repository.

## Before you change anything

1. Read the SH&SH design system README: `https://claude.ai/artifact/DgKWHM1nNAfz2vCYi13KbY` (read `project/README.md`).
2. Follow its content rules. The first rule is honesty: every sentence is true today and no bigger than the thing it describes.
3. Use the status vocabulary only: Available, Free, In progress, Planned (with a date), Paused (with since when), Retired.

## Rules

- Do not invent product facts: ingredients, scents, prices, dates, or claims. If a fact is not in the repo or the design system, ask Antonio.
- Write product and book text in English and Spanish. Mark the Spanish with `lang="es"`. Flag any Spanish you drafted, so Antonio can rewrite it.
- No stock photos, renders, or AI images of product. Book art stays inside its book card.
- Use the design system's classes in `src/styles/shsh.css`. Do not add a CSS framework.
- Never edit `src/styles/tokens.css`. Change `design-system/tokens.json` and run `pnpm tokens`.
- Quote testimonials as written. Do not edit them.
- The legal pages carry Antonio's legal text. Change them only when he asks, and update the "Last updated" date when you do.
- When you add a component, add it to the design system too: its README, its preview, and `bundle.css`.

## Check before you commit

```bash
pnpm check && pnpm build
```

Then open `dist/llms.txt` and confirm it still describes the site.
