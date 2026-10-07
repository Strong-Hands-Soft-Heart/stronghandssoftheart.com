# Changelog

Notable changes to stronghandssoftheart.com. The project uses [Semantic Versioning](https://semver.org/).

## [2.2.0] - 2026-10-07

- IndexNow: each Vercel production build sends every sitemap URL to IndexNow (Bing and the other IndexNow engines), as Notes does. `src/utils/indexNow.ts` runs after the sitemap is written, only when `VERCEL_ENV` is `production` (or `INDEXNOW_FORCE=1`), and only when the live site already serves the key file `public/371bfc24-dd96-4308-8494-9a995e795ebb.txt`. It tries `api.indexnow.org`, then `www.bing.com` on a 403. It never fails the build.

## [2.1.2] - 2026-10-07

- Fixed: every page's canonical link and `og:url` ended in `.html` (`/index.html`, `/consulting.html`), an address Vercel redirects. They now match the served URLs (`/`, `/consulting`). The layout strips `.html` and `/index`, because `build.format` is `file`.
- The Organization in the structured data has an ID (`/#organization`), a Florida address region, and the GitHub organization. Its founder points at the Person ID that antoniwan.online defines (`https://antoniwan.online/#person`), so search engines can join the company, the founder and his writing.

## [2.1.1] - 2026-10-07

- The two picture books' source links point at their new home in the company's GitHub organization, Strong-Hands-Soft-Heart. The company publishes and hosts the books, so their repos moved there.

## [2.1.0] - 2026-10-07

- Vercel Web Analytics: `@vercel/analytics` and its Astro component at the end of every page. It counts page views without cookies, beside Google Analytics. The privacy policy names it under third-party services.

## [2.0.0] - 2026-10-07

The rebrand: white, black and strawberry; Unbounded and Geist; the Ground as entropy. Copy unchanged.

- Palette: white, black and Apple's Strawberry (#ff2f92). Tokens renamed to say what they are: `heart` (strawberry: fills, the hero phrase, the mark), `heart-ink` (a deeper strawberry for small text, 5.7:1 on white), `heart-tint`, `on-heart` (black on strawberry), `deep` and `on-deep` (the black surface). `earth`, `air` and `sun` are gone. Night is white on black. Every text pair checked at 4.5:1 or better; strawberry type only at 24px+.
- The mark now carries the name: Soft Heart above the equator in strawberry, Strong Hands below in black. Logos, seal, favicon, app icon and social card recoloured; the SHSH lockup regenerated in Unbounded by `scripts/build-lockup.mjs` (fontkit).
- Type: Unbounded for display, Geist for text, both variable and self-hosted. Fraunces and Source Serif stay with the books and Notes. No italic emphasis; the hero phrase is strawberry, upright.
- Ground v2: forty loose strokes drift in chaos; in eight places they assemble the mark (edges in ink, equator in strawberry), hold, and dissolve, on staggered 18-second cycles. The ground thins to a quarter inside the text block (`data-sh-shield`) so text keeps contrast. Still frame under reduced motion.
- Button variant `earth` → `heart` (hover turns the fill black); Badge tone `air` → `quiet`.
- Fixed: a `.sh-field` class collision that moved the sign-up field; a reserved word (`out`) in the shader that hid the canvas.

## [1.3.0] - 2026-10-07

- The Ground: a WebGL shader draws the mark's own geometry behind the hero, every page head and the deep call-to-action sections. A grid of diamond outlines with their equators, drifting and breathing; one horizon line in earth; a wash of air above and earth below; a trace of sun. Every colour is a design-system token, so day and night both work. Strokes stay between 5 and 14% so text keeps its contrast. One still frame under reduced motion; paused off-screen and when the tab is hidden; hidden without WebGL. About 6 KB of script, no library. The shader lives in the design system (`components/ground.frag`) and is copied to `design-system/ground.frag`.

## [1.2.0] - 2026-10-07

- Notes is Antonio's own writing, not a company publication. The Notes page, the home section, the About page, the footer, llms.txt, and the site description now say so; Notes is no longer a card under "What I Make".
- Consulting selected work lists two client sites (JuanAngustia.com, AbogadaJulia.com) instead of builds.software, which now redirects to antoniwan.online. llms.txt links the founder's code page instead.

## [1.1.2] - 2026-10-07

- The page no longer describes itself: the hero lead ("This page says what is ready…") is gone, and the hero reads "Soap, books and software. Made in Florida."
- "One person, and the people I know" is gone from the hero and the network heading; the network section is titled "Professionals I Trust" and its lead starts with the relationships.
- Soap: "What I Can Say Now" is now "What Each Label Will Carry".

## [1.1.1] - 2026-10-07

- "Networking" is not a field: it is the whole network, the professionals Antonio trusts in the areas where he is not the expert. Removed from the grid; the copy says so, with his examples (a copywriter for the copy, a robotics expert for a signage job). Eight fields sit four by two on desktop.

## [1.1.0] - 2026-10-07

- The network: the company is one person with a wide network, and the site now says so. The hero reads "One person, and the people I know"; a Network section on home and consulting lists the fields of the people Antonio can bring in, by discipline, with the rule "When someone else does part of the work, I name them."
- Contact form topics add "A Project That Needs a Team" and "An Introduction".
- Consulting services sit two by two; the two-column grid is two columns from 760px up.
- llms.txt describes the network.

## [1.0.0] - 2026-10-07

A new site, built from the SH&SH design system. It replaces the Next.js marketing site (`Strong-Hands-Soft-Heart/marketing-website`) and the separate consulting site (`consulting.stronghandssoftheart.com`).

- Astro 7, static, plain CSS from the design system; self-hosted Fraunces and Source Serif 4; day and night themes.
- Pages: home, soap, books, Notes, consulting, about, the logo essay, and the three legal pages.
- Consulting moved in: services, how I work, selected work, LinkedIn recommendations, reading list, and a contact form (Formspree).
- Soap sign-up for launch news (Kit when its form ID is set; Formspree until then).
- The latest Notes essays are read from Notes' JSON Feed at build time.
- Copy rewritten to the design system's honesty rules and status vocabulary.
- `/llms.txt`, generated from the same data as the pages; sitemap; robots.txt; Open Graph image from the SHSH lockup.
- Privacy policy and terms: the third-party list now names Formspree (it said "Freeform") and adds Kit.
