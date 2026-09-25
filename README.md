# NEXORA — Digital Systems & Experiences

A high-impact landing page for NEXORA, a fictional Brazilian software house positioned at the intersection of software engineering, creative technology, and digital experiences.

## Overview

NEXORA differentiates through solid engineering behind memorable digital experiences. The brand sits between a traditional software house and a creative agency — a partner that transforms complex ideas into extraordinary digital products.

This page serves as both a marketing surface and a portfolio demonstration of engineering + motion craft.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** GSAP (with ScrollTrigger)
- **Smooth Scroll:** Lenis
- **Fonts:** Space Grotesk (display), Space Mono (labels/system elements)
- **Testing:** Playwright

## Sections

| Section | Description |
|---|---|
| Preloader | Animated loading screen |
| Hero | Full-screen intro with brand positioning |
| Complexity → Clarity | Narrative arc: problem → solution |
| Services | Interactive services list with hover reveals |
| Process | Pinned scroll-driven process (5 scenes) |
| Cases | Horizontal scroll gallery (3 fictional case studies) |
| Technology | Tech stack / capabilities showcase |
| About | Company info, team, location |
| CTA | Call-to-action |
| Footer | Contact, social links, legal |

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the page.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Project Structure

```
nexora-landing/
├── app/
│   ├── components/          # Section components
│   │   ├── About.tsx
│   │   ├── CTA.tsx
│   │   ├── Cases.tsx
│   │   ├── ComplexityClarity.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Preloader.tsx
│   │   ├── Process.tsx
│   │   ├── Services.tsx
│   │   └── Technology.tsx
│   ├── globals.css          # Global styles + Tailwind
│   ├── layout.tsx           # Root layout (fonts, metadata)
│   └── page.tsx             # Main page (scroll orchestration)
├── public/                  # Static assets
├── tests/                   # Playwright E2E tests
├── package.json
├── tsconfig.json
└── next.config.ts
```

## Design System

### Colors

| Token | Value | Usage |
|---|---|---|
| Dark | `#050505` | Primary background |
| Dark Secondary | `#0B0B0B` | Cards, surfaces |
| Light | `#F5F5F2` | Primary text |
| White | `#FFFFFF` | Headlines, accents |
| Accent | `#4D7CFE` | Interactive states, data, technology indicators |

### Typography

- **Display:** Space Grotesk (weights 400–700)
- **Monospace:** Space Mono (weights 400, 700) — labels, numbering, system elements

### Brand

- **Name:** NEXORA — `Digital Systems & Experiences`
- **Tagline:** "We build what comes next."
- **Location:** São Paulo · Brazil

## Principles

1. **Show, don't tell.** The page experience itself demonstrates NEXORA's capabilities.
2. **Dark to Light.** The narrative arc mirrors the product journey: complexity → clarity.
3. **Engineering as craft.** Motion and interaction are deliberate, not decorative.
4. **Premium restraint.** The accent color appears only to communicate interaction, technology, or data.
5. **Realism over fantasy.** Fictional cases look like real products; copy reads as if the company exists.

## Accessibility

- Scroll animations respect `prefers-reduced-motion`
- All content remains readable without animation
- Keyboard navigation works for services list and case gallery

## Testing

```bash
npx playwright test
```

