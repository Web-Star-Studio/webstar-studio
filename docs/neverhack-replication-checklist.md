# Neverhack Replication Checklist

This checklist is based on the local mirror at [tmp/httrack/neverhack/2026-03-25T19-43-30-seeded](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/tmp/httrack/neverhack/2026-03-25T19-43-30-seeded), especially the mirrored homepage at [neverhack.com/en.html](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/tmp/httrack/neverhack/2026-03-25T19-43-30-seeded/neverhack.com/en.html).

## Goal

Rebuild the Neverhack experience inside our own brand and codebase with the highest possible structural and behavioral fidelity:

- Match section order and pacing.
- Match spacing, typography scale, and motion rhythm.
- Match media behavior, sticky layouts, and card systems.
- Keep our branding and copy distinct where needed, but preserve the productized interaction model.

## Current Gap In Our App

Our current homepage is still mostly a single hero section:

- [src/app/page.tsx](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/src/app/page.tsx)
- [components/Hero.tsx](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/components/Hero.tsx)

Neverhack’s homepage is a full multi-section narrative. The biggest gap is not just styling, it is page architecture.

## Neverhack Homepage Structure

From the mirrored homepage and compiled assets, the shipped homepage order is:

1. Global nav with language switch and compact utility actions
2. Hero with oversized left-aligned statement, right-side paragraph, and full-width background video
3. Sticky use-cases section with horizontal selector and stacked 3D cards
4. Values section with scroll-driven narrative panels and progress indicator
5. Key numbers section with offset video + metric grid
6. Globe/chat contact section with conversational CTA
7. News/events listing grid with a final “View all” tile
8. Dense footer with social links, compliance/legal links, language switcher, and large statement

Relevant mirrored evidence:

- [neverhack.com/en.html](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/tmp/httrack/neverhack/2026-03-25T19-43-30-seeded/neverhack.com/en.html)
- [HeroHome-BDyXqEcy.css](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/tmp/httrack/neverhack/2026-03-25T19-43-30-seeded/neverhack.com/build/assets/HeroHome-BDyXqEcy.css)
- [UseCasesListing-CmNbZw7i.css](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/tmp/httrack/neverhack/2026-03-25T19-43-30-seeded/neverhack.com/build/assets/UseCasesListing-CmNbZw7i.css)
- [Values-OqvUctEO.css](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/tmp/httrack/neverhack/2026-03-25T19-43-30-seeded/neverhack.com/build/assets/Values-OqvUctEO.css)
- [KeyNumbersHome-DoPMhX0S.css](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/tmp/httrack/neverhack/2026-03-25T19-43-30-seeded/neverhack.com/build/assets/KeyNumbersHome-DoPMhX0S.css)
- [ChatGlobe-cBNqBshC.css](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/tmp/httrack/neverhack/2026-03-25T19-43-30-seeded/neverhack.com/build/assets/ChatGlobe-cBNqBshC.css)
- [NewsListing-DwxihF-z.css](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/tmp/httrack/neverhack/2026-03-25T19-43-30-seeded/neverhack.com/build/assets/NewsListing-DwxihF-z.css)
- [web-CS453ml-.css](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/tmp/httrack/neverhack/2026-03-25T19-43-30-seeded/neverhack.com/build/assets/web-CS453ml-.css)

## Design System Checklist

### 1. Typography

- Use a primary grotesk close to Roobert for body and display.
- Use a monospace secondary style close to Geist Mono for labels, microcopy, counters, and utility text.
- Preserve the large display scale:
  - Hero title reaches roughly `4.5rem` to `5.625rem` desktop.
  - Section titles reach roughly `4rem`.
  - Metric numbers reach roughly `4rem`.
- Keep letter-spacing tight on hero/display headlines.
- Keep utility text uppercase and small, often `0.75rem` or smaller.

### 2. Color + Materials

- Base background is near-black, around `#0e0e0e`.
- Main text is white with layered opacities rather than many different colors.
- Borders are thin and low-contrast, often around `rgba(255,255,255,0.15)`.
- Hover surfaces use faint white overlays like `#ffffff05` and `#ffffff0d`.
- The site relies on contrast, motion, and video more than bright accent colors.

### 3. Motion Language

- Use text reveal and scramble animations repeatedly for labels and links.
- Use sticky sections and scroll-linked transitions instead of simple fade-ins.
- Use hover wipes that expand horizontally on interactive surfaces.
- Use slight opacity ramps and layered card transforms instead of springy bouncing UI.
- Use media transitions between poster and video states.

## Component-By-Component Rebuild Plan

### A. Navigation

Replicate:

- Minimal dark header
- Language selector integrated into nav/footer
- Dense utility-like interaction style
- Social links and legal/compliance pathways

Current files to adapt:

- [components/Navigation.tsx](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/components/Navigation.tsx)
- [components/Header.tsx](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/components/Header.tsx)

Checklist:

- Replace current overlay-menu emphasis with a more persistent site-navigation frame.
- Add compact language switcher styling.
- Use bordered interactive cells rather than floating links.
- Add a footer-level duplicate of utility navigation.

### B. Hero

Replicate:

- Giant three-line statement on the left
- Supporting paragraph on the right
- Large cinematic background video underneath
- Bottom “scroll to discover” rail with arrow
- Desktop layout width around a `1680px` max container

Current file to adapt:

- [components/Hero.tsx](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/components/Hero.tsx)

Checklist:

- Keep the large left headline architecture, but reduce the current abstract cube dominance.
- Replace the placeholder background with actual video/poster behavior.
- Match Neverhack’s asymmetrical layout:
  - headline left
  - description right
  - media centered below/behind
- Keep the bottom rail and arrow, but make it calmer and more editorial than the current bounce.
- Match Neverhack’s top padding rhythm so the hero breathes under the header.

### C. Use Cases Section

Replicate:

- Sticky section
- Horizontal tab/selector rail
- Large stacked cards with perspective
- Embedded videos inside the cards
- Desktop button inside each card and mobile bottom CTA strip

Suggested new component:

- `components/UseCasesShowcase.tsx`

Checklist:

- Build a sticky wrapper with viewport-height pinning behavior.
- Create a horizontally scrollable selector on mobile and centered rail on desktop.
- Use one active card state at a time.
- Add perspective and subtle stack offset between cards.
- Pair each use case with:
  - small mono category label
  - large short title
  - supporting sentence
  - media or looping video
- Use the mirrored Neverhack card proportions as the starting point:
  - mobile aspect ratio around `342 / 510`
  - desktop around `1250 / 620`

### D. Values Section

Replicate:

- Large centered title intro
- Scroll-driven sequence of values
- 2x2 desktop split feeling with title and description occupying opposite quadrants
- Progress indicator with numbered steps and dashed lines

Suggested new component:

- `components/ValuesSequence.tsx`

Checklist:

- Make the section height depend on item count.
- Use sticky positioning for the active frame.
- Animate values in sequence during scroll.
- Add a visible progress tracker.
- Use a structured value object:
  - title
  - description
  - small description
  - optional CTA

### E. Key Numbers Section

Replicate:

- Offset media block
- Large heading and paragraph
- 3x2 stat grid with thin borders
- CTA near the section end

Suggested new component:

- `components/KeyNumbersSection.tsx`

Checklist:

- Use a video or animated visual aligned to the right on desktop.
- Place copy slightly overlapping below the media.
- Use a bordered grid with six metrics.
- Fade/animate number appearance on scroll.

### F. Globe + Chat CTA

Replicate:

- Large title above
- Globe visual on the left
- Chat-style stacked message bubbles on the right
- Contact button anchored near the chat thread

Current files we can likely reuse:

- [src/components/CinematicGlobe.tsx](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/src/components/CinematicGlobe.tsx)
- [src/components/GlobeSection.tsx](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/src/components/GlobeSection.tsx)

Checklist:

- Keep the globe interactive/animated but reduce decorative excess.
- Build the right panel as a staged conversation, not as a generic CTA card.
- Use soft translucent message panels.
- Add small inline quick links inside one chat message.

### G. News Grid

Replicate:

- “Events and news” heading
- Card grid with strong borders
- Responsive layout:
  - horizontal scroll on mobile
  - bordered grid on desktop
- Final tile linking to all news

Suggested new component:

- `components/NewsGrid.tsx`

Checklist:

- Use real card boundaries, not loose masonry spacing.
- Keep one “View all” tile with centered CTA.
- Use 3-column desktop first, with 4-column behavior at wider screens.

### H. Footer

Replicate:

- Large statement at top
- Utility rows with borders
- Social, language, compliance/legal, press, certifications, sitemap
- Dense, low-glow, technical editorial feel

Current file to replace or heavily refactor:

- [components/Footer.tsx](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/components/Footer.tsx)

Checklist:

- Replace the current oversized logo-footer treatment with a more structured grid/footer rail system.
- Add duplicated utility navigation for desktop.
- Keep a separate mobile footer layout.
- Add compliance, press, certifications, and sitemap links.
- Use thin dividers throughout.

## Asset Checklist

### Fonts

- Roobert-like display/body replacement
- Geist Mono-like mono replacement

Mirrored references:

- [Roobert-Regular-CznfJWXD.woff2](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/tmp/httrack/neverhack/2026-03-25T19-43-30-seeded/neverhack.com/build/assets/Roobert-Regular-CznfJWXD.woff2)
- [GeistMono-Regular-Cgn4a1uh.woff2](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/tmp/httrack/neverhack/2026-03-25T19-43-30-seeded/neverhack.com/build/assets/GeistMono-Regular-Cgn4a1uh.woff2)

### Media Patterns

- Hero videos
- Use case videos
- Section posters
- Showcase / proxy images
- Compliance PDFs and certification assets

Examples:

- [videos/hero](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/tmp/httrack/neverhack/2026-03-25T19-43-30-seeded/neverhack.com/videos/hero)
- [videos/usecases](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/tmp/httrack/neverhack/2026-03-25T19-43-30-seeded/neverhack.com/videos/usecases)
- [showcase-prod.s3.rbx.io.cloud.ovh.net](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/tmp/httrack/neverhack/2026-03-25T19-43-30-seeded/showcase-prod.s3.rbx.io.cloud.ovh.net)

## High-Fidelity Rules

- Do not flatten the site into generic centered sections.
- Do not replace sticky narrative sections with simple scroll stacks.
- Do not overuse bright accent colors.
- Do not soften the typography scale.
- Do not turn the footer into a marketing-style big-CTA block.
- Do preserve the thin borders, dense grids, and editorial/product feel.
- Do preserve the asymmetric layouts.
- Do preserve video-first presentation where Neverhack uses video.

## Recommended Build Order

### Phase 1. Structural parity

- Expand homepage beyond hero in [src/app/page.tsx](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/src/app/page.tsx)
- Rebuild navigation shell
- Rebuild footer shell
- Add the homepage sections in the correct order

### Phase 2. Motion parity

- Hero media behavior
- Sticky use-case stack
- Values scroll sequence
- Number reveal and chat staging

### Phase 3. Content parity

- Pull copy rhythm from mirrored English pages
- Add use-case, offer, and news datasets
- Add legal/compliance/certification utility links

### Phase 4. Visual refinement

- Tighten spacing and border rhythm
- Tune type scale
- Match hover states and text-scramble feel
- Polish mobile layouts

## Suggested File Plan For Our Repo

- [src/app/page.tsx](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/src/app/page.tsx)
  Replace single-hero homepage composition with full homepage sequence.

- [components/Hero.tsx](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/components/Hero.tsx)
  Refactor to a Neverhack-like cinematic hero.

- [components/Navigation.tsx](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/components/Navigation.tsx)
  Move toward utility navigation rather than only a fullscreen menu overlay.

- [components/Footer.tsx](/Users/webstarstudiomac1/Documents/GitHub/webstar-studio/components/Footer.tsx)
  Rebuild as a bordered, utility-heavy footer.

- New components to add:
  - `components/UseCasesShowcase.tsx`
  - `components/ValuesSequence.tsx`
  - `components/KeyNumbersSection.tsx`
  - `components/ChatContactSection.tsx`
  - `components/NewsGrid.tsx`

## Mirror Caveats

The HTTrack mirror is strong, but not perfect:

- Some external links and malformed rich-text links were mirrored as broken pseudo-paths.
- Some legal pages respect robots meta behavior in the log, even though key HTML pages are present.
- This is a rendered-site mirror, not their original source code.

That means we can replicate the experience very accurately, but we still need to rebuild it by hand in our own components.
