# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js, TypeScript, React, GSAP (with ScrollTrigger), Lenis (smooth scroll), Tailwind CSS

## Users

Decision-makers (CTOs, product managers, founders) seeking a software house to build digital products — SaaS platforms, web applications, AI solutions, dashboards, and APIs.

## Product Purpose

A high-impact landing page for NEXORA — a fictional Brazilian software house positioned at the intersection of software engineering, creative technology, and digital experiences. The page serves as both a marketing surface and a portfolio demonstration of engineering + motion craft.

## Positioning

NEXORA differentiates through solid engineering behind memorable digital experiences. The brand sits between a traditional software house and a creative agency — not just "a company that makes websites," but a partner that transforms complex ideas into extraordinary digital products.

## Operating Context

- Single-page landing experience (~1500–2000vh total scroll height)
- Desktop-first, responsive to mobile
- Heavy use of scroll-driven animations and GSAP timelines
- Serves as a portfolio piece demonstrating creative development skills
- References: vanlent.dev (creative developer), crency.com (strong aesthetic + conversion)

## Capabilities and Constraints

- **Confirmed:** Dark → Light narrative arc across the page
- **Confirmed:** GSAP for complex choreography; CSS Scroll-Driven Animations for simple reveals
- **Confirmed:** Three fictional case studies (ORBIT, FLUX, PULSE)
- **Confirmed:** Interactive services list with hover reveals
- **Confirmed:** Pinned process section with ScrollTrigger (5 scenes)
- **Confirmed:** Horizontal scroll case gallery
- **Constraint:** No fabricated testimonials, clients, or real-world proof
- **Constraint:** 3D (Three.js/R3F) only if it meaningfully adds value

## Brand Commitments

- **Name:** NEXORA — `Digital Systems & Experiences`
- **Tagline:** "We build what comes next."
- **Subheadline:** "Produtos digitais, sistemas e experiências desenvolvidos para transformar ideias complexas em soluções reais."
- **Four pillars:** Strategy → Design → Engineering → Experience
- **Palette:** `#050505`, `#0B0B0B`, `#F5F5F2`, `#FFFFFF` / Accent: `#4D7CFE` (electric blue, used sparingly)
- **Display font:** Space Grotesk / Geist / Satoshi / Instrument Sans
- **Monospace:** Technical labels, numbering, system elements
- **Location:** São Paulo · Brazil

## Evidence on Hand

- `briefing.txt` — comprehensive design brief with section-by-section specifications
- No real imagery, testimonials, or client data — all cases are fictional

## Product Principles

1. **Show, don't tell.** The page experience itself demonstrates NEXORA's capabilities.
2. **Dark to Light.** The narrative arc mirrors the product journey: complexity → clarity.
3. **Engineering as craft.** Motion and interaction are deliberate, not decorative.
4. **Premium restraint.** The accent color appears only to communicate interaction, technology, or data.
5. **Realism over fantasy.** Fictional cases look like real products; copy reads as if the company exists.

## Accessibility & Inclusion

- Scroll animations must be respect `prefers-reduced-motion`
- All content must remain readable without animation
- Keyboard navigation must work for services list and case gallery
