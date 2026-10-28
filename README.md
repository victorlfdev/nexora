# NEXORA — Digital Systems & Experiences

Portfolio concept for a fictional Brazilian software house, built with Next.js App Router, TypeScript, React, Tailwind CSS v4, GSAP, Lenis and OGL. ORBIT, FLUX and PULSE are illustrative projects; their metrics are demo data.

## Run locally

Requires Node.js 20.9 or newer and npm.

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Production and validation

```bash
npm run lint
npm run build
npm test
npm audit
```

Playwright starts the production server automatically if one is not already running. Build before testing so the tests exercise the latest source. The suite covers desktop, tablet and mobile, keyboard interaction, fragment navigation, JavaScript-disabled rendering, reduced motion, animation cleanup on resize, and automated WCAG A/AA checks with axe. Desktop-only lifecycle checks are skipped on the other devices.

Run `npm start` to preview the production build. Use `npm run typecheck` for a separate TypeScript check after Next.js has generated its route types.

## Experience

- All page content is rendered into the initial HTML. There is no blocking preloader.
- Header navigation and hero actions link to services, work, about and contact.
- Service disclosures use native `details` and `summary`, supporting touch, keyboard and JavaScript-disabled browsers.
- Desktop scroll timelines retain the dark-to-light transition, five process scenes and horizontal portfolio.
- On narrow screens, short viewports or reduced-motion preferences, the sections return to their natural document flow.
- The horizontal portfolio requires at least 1024px width and 800px height. Other pinned effects require 768px width and 650px height.
- GSAP media queries revert styles and pins when viewport or motion preferences change.
- Lenis uses the GSAP ticker, with cleanup on unmount. Fonts and service disclosures refresh scroll positions.
- The decorative WebGL background loads separately, skips mobile/reduced-motion devices, pauses offscreen and in hidden tabs, and releases its resources on cleanup. The page works without WebGL.
- Typography uses locally served Space Grotesk and Space Mono through `next/font`.
- Semantic landmarks, a skip link, visible keyboard focus and readable secondary text support accessibility.

## Project structure

```text
app/
  page.tsx                       Server-rendered page composition
  layout.tsx                     Fonts and sharing metadata
  globals.css                    Brand tokens and responsive layouts
  hooks/useScrollAnimation.ts    Scoped GSAP media-query lifecycle
  components/
    Header.tsx                   Section navigation
    SmoothScroll.tsx             Lenis and scroll position coordination
    Hero.tsx                     Intro and primary actions
    ComplexityClarity.tsx        Transformation narrative
    Services.tsx                 Native service disclosures
    Process.tsx                  Five-stage process
    Cases.tsx                    Illustrative portfolio and product previews
    Technology.tsx               Stack and decorative globe
    About.tsx                    Positioning
    CTA.tsx                      Contact action
    Footer.tsx                   Internal navigation and contact
    Particles.tsx                Optional WebGL background
tests/homepage.spec.ts            Browser regression and accessibility tests
```

## Brand and content

The existing dark-to-light identity uses obsidian `#050505`, warm white `#F5F5F2`, and electric blue `#4D7CFE`. Case accents are adjusted for text contrast. The site content remains in English.

The contact action opens an email application at `hello@nexora.dev`; there is no backend contact form or verified delivery integration. Configure a real contact address and real project data before using this portfolio concept commercially.
