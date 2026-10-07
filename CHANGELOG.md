# Changelog

Notable changes to stronghandssoftheart.com. The project uses [Semantic Versioning](https://semver.org/).

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
