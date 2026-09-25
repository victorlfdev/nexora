---
name: NEXORA — Design System
description: Dark-to-light landing page design system for a fictional software house
colors:
  electric-blue: "#4D7CFE"
  electric-blue-dim: "rgba(77, 124, 254, 0.15)"
  orbit-blue: "#4D7CFE"
  flux-purple: "#7C4DFF"
  pulse-pink: "#FF4D7C"
  obsidian: "#050505"
  graphite: "#0B0B0B"
  warm-white: "#F5F5F2"
  pure-white: "#FFFFFF"
typography:
  display:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(3rem, 8vw, 8rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "normal"
  headline:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "normal"
  body:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Space Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.2em"
  caption:
    fontFamily: "Space Mono, monospace"
    fontSize: "0.625rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.3em"
rounded:
  card: "12px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "40px"
  4xl: "80px"
  section: "128px"
components:
  button-cta:
    backgroundColor: "transparent"
    textColor: "{colors.warm-white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "12px 48px"
    height: "auto"
  button-cta-hover:
    backgroundColor: "{colors.electric-blue-dim}"
    textColor: "{colors.electric-blue}"
  service-item:
    backgroundColor: "transparent"
    textColor: "{colors.warm-white}"
    rounded: "0px"
    padding: "40px 0px"
    height: "auto"
  case-card:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.card}"
    padding: "40px"
    height: "auto"
    width: "600px"
---

# Design System: NEXORA

## Overview

**Creative North Star: "The Precision Workshop"**

This design system lives in the tension between chaos and order — technical poetry rendered in pixels. The experience is architectural: every section is a calibrated moment in a narrative arc that moves from darkness into light, from complexity into clarity. The interface doesn't decorate; it reveals.

Density is intentional. Dark sections feel immersive and controlled, like a workshop at night. Light sections feel like revelation — clean, spacious, almost clinical. The accent color appears sparingly, only to signal interaction, data, or technology. Its rarity is what gives it force.

The system rejects warmth where precision is needed. No gradients for decoration. No shadows for depth. No rounded corners for softness. Every curve, every opacity value, every tracking measurement serves a structural purpose.

**Key Characteristics:**
- Dark-to-light narrative arc across the page
- Monospace labels with wide letter-spacing as the system voice
- Sans-serif display type with tight tracking for impact
- Accent blue used on ≤10% of any screen
- Flat surfaces; depth through opacity layering and borders
- Scroll-driven choreography as primary interaction model

## Colors

A restrained palette of near-black backgrounds, warm-white text, and a single electric-blue accent that cuts through like a signal light.

### Primary

- **Electric Blue** (#4D7CFE): The only chromatic voice. Used for primary CTAs, active states, data visualization, and the "next" keyword in the hero. Its rarity is the point — when it appears, it communicates interaction or technology.

### Case Accents

- **Orbit Blue** (#4D7CFE): Case study color for ORBIT — enterprise intelligence. Matches the primary accent to maintain unity.
- **Flux Purple** (#7C4DFF): Case study color for FLUX — AI workflow. Introduces a cool purple for differentiation.
- **Pulse Pink** (#FF4D7C): Case study color for PULSE — digital operations. A warm counterpoint for contrast.

### Neutral

- **Obsidian** (#050505): Primary background for dark sections. Not pure black — it has a faint warmth that keeps it from feeling sterile.
- **Graphite** (#0B0B0B): Secondary dark surface for cards and elevated elements on dark backgrounds.
- **Warm White** (#F5F5F2): Primary text color on dark backgrounds; background color for light sections. Slightly off-white to avoid harsh contrast.
- **Pure White** (#FFFFFF): Reserved for pure white needs; not heavily used in the current system.

### Named Rules

**The One Accent Rule.** The electric blue appears on ≤10% of any given screen. Its rarity is the point — it's a signal, not a paintbrush.

**The No-Shadow Rule.** This system never uses box-shadow for elevation. Depth comes from opacity layering, border strokes, and tonal contrast alone.

## Typography

**Display Font:** Space Grotesk (with system-ui, sans-serif fallback)
**Label Font:** Space Mono (with monospace fallback)

Character: Space Grotesk's geometric forms and open apertures give the display a confident, technical presence. Space Mono's narrow proportions and monospaced grid provide the system voice — labels, numbers, metadata — that reads like instrument panel data. The pairing is functional, not decorative.

### Hierarchy

- **Display** (700, clamp(3rem, 8vw, 8rem), 0.9 line-height): Hero headlines only. Tight tracking for visual density. Always uppercase or title case.
- **Headline** (700, clamp(2rem, 4vw, 4rem), 1.1 line-height): Section titles and case study names. Tracking-tight for impact.
- **Body** (400, 1rem, 1.6 line-height): Paragraph text. Relaxed line-height for readability. Max-width ~65ch for optimal line length.
- **Label** (400, 0.75rem, 0.2em letter-spacing): Monospace metadata, section headers, navigation labels. Uppercase. Wide tracking for technical readability.
- **Caption** (400, 0.625rem, 0.3em letter-spacing): Ultra-small monospace labels for case numbers, technical tags, and system elements.

### Named Rules

**The Monospace Rule.** Space Mono is reserved for system voice only — labels, numbers, metadata, technical tags. Never for body copy or narrative text.

**The Tight Tracking Rule.** Display and headline type always use tracking-tight (or default). Loose tracking is never applied to large type — it's a label/monospace property only.

## Layout

The page is a single-column narrative with a max-width container of 672px (max-w-5xl) centered on screen. Horizontal padding is 24px (px-6) at all breakpoints.

Section vertical padding is 128px (py-32) for standard sections. Hero and CTA sections break out to min-h-screen or min-h-[80vh] for dramatic presence.

The spacing scale is modular: 4px, 8px, 16px, 24px, 32px, 40px, 60px, 80px, 128px. All internal component spacing derives from these steps.

Case cards on desktop use min-w-[85vw] with max-w-[600px] for a controlled reading width. On mobile, they stack vertically at full container width.

Responsive breakpoints follow Tailwind v4 defaults: sm (640px), md (768px), lg (1024px). The page is desktop-first but degrades gracefully to mobile with vertical stacking and reduced animation complexity.

## Elevation & Depth

This system is flat by design. There are no box-shadows. Depth is conveyed through three mechanisms:

1. **Opacity layering:** Elements at different "depths" use opacity (text-light/20, text-light/40, text-light/60) rather than elevation. Background grids at 3% opacity create subtle texture without breaking the flat aesthetic.
2. **Border strokes:** 1px borders at low opacity (border-light/10, border-light/5) define structure without weight. Active or hover states increase border thickness (2px) and introduce the accent color.
3. **Tonal contrast:** Dark-on-dark (obsidian vs. graphite) and light-on-light create the only surface hierarchy. Cards on dark backgrounds use graphite against obsidian.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are always flat. No shadows, no blur, no backdrop-filter. If an element needs to feel elevated, it earns it through border and color alone.

## Shapes

Corner treatment is binary: sharp (0px) for service items and structural elements, fully rounded (12px) for case cards, and pill (9999px) for the primary CTA button.

Border treatment is consistently 1px, with 2px reserved for active/hover states. No element uses a stroke thicker than 2px.

The orbit ring in the Technology section uses rounded-full for a perfect circle — the only curved structural element that isn't a corner radius.

## Components

### Service Items

- **Shape:** Sharp edges (0px radius), full-width horizontal bands
- **Structure:** Top border (1px, light/10), left border on hover (2px, accent)
- **Typography:** Monospace number (0.75rem, wide tracking) + sans-serif title (1.125rem, bold, tight tracking)
- **Hover:** Left border appears in accent color; padding shifts right (pl-4); title text transitions to accent color
- **Focus:** Same as hover + focus ring (2px accent, 4px offset)
- **Description:** Appears on the right on hover/touch (monospace, 0.75rem, light/40)

### Case Cards

- **Shape:** Rounded corners (12px radius), full pill treatment
- **Background:** Graphite (#0B0B0B) on dark sections
- **Border:** 1px light/10 at rest
- **Internal padding:** 40px desktop, 24px mobile
- **Structure:** Case number (monospace, caption size) → Name (3rem bold) → Tag (monospace, small) → Description (body, light/60) → Metrics grid (3 columns) → Visual placeholder
- **Metrics:** Large colored values (2rem bold) + monospace labels (10px, wide tracking)
- **Visual placeholder:** Gradient background using case color at 10%/5% opacity, bordered at 20%

### CTA Button

- **Shape:** Pill (fully rounded)
- **Background:** Transparent at rest
- **Border:** 1px light/20 at rest, transitions to accent on hover
- **Typography:** Monospace label (0.75rem, 0.2em tracking)
- **Padding:** 12px vertical, 48px horizontal
- **Hover:** Background shifts to accent-dim (rgba(77, 124, 254, 0.15)); text color transitions to accent; secondary text slides up from below (translate-y-full → translate-y-0)
- **Focus:** 2px accent ring, 4px offset

### Navigation Labels

- **Typography:** Monospace, 0.75rem, 0.3em tracking, uppercase
- **Color:** Light/40 at rest, light/30 for secondary metadata
- **Hover:** Transitions to accent color (200ms duration)

### Section Headers

- **Typography:** Monospace label (0.75rem, 0.3em tracking) above sans-serif headline (clamp(2rem, 4vw, 4rem), bold, tight tracking)
- **Spacing:** 80px gap between label and headline (mb-20)
- **Color:** Light/40 for label; light or dark (depending on section background) for headline

## Do's and Don'ts

### Do:
- **Do** use the accent color sparingly — it's a signal, not decoration. If it appears on more than 10% of a screen, you've lost precision.
- **Do** keep monospace reserved for system voice: labels, numbers, metadata, technical tags. Never for narrative copy.
- **Do** use tight tracking on display and headline type. Loose tracking is a monospace/label property only.
- **Do** maintain the dark-to-light narrative arc. Dark sections are immersive; light sections are revelatory.
- **Do** use opacity layering (not shadows) for depth. text-light/20, text-light/40, text-light/60 are your elevation scale.
- **Do** respect prefers-reduced-motion. All GSAP animations must have graceful degradation — content must be readable without motion.
- **Do** use exact spacing from the modular scale (4px, 8px, 16px, 24px, 32px, 40px, 60px, 80px, 128px).

### Don't:
- **Don't** use box-shadows for elevation. This system is flat by design.
- **Don't** use gradients for decoration. Gradient backgrounds are reserved for case study visual placeholders only.
- **Don't** apply rounded corners to service items or structural elements. Only case cards get rounded corners.
- **Don't** use warm colors outside the case accent palette. The palette is cool and technical — no oranges, yellows, or earth tones.
- **Don't** mix font families for body copy. Space Grotesk is the only sans-serif; Space Mono is the only monospace. No third typeface.
- **Don't** use pure black (#000000) or pure white (#FFFFFF) as backgrounds. The warmth in obsidian and warm-white is intentional.
- **Don't** break the max-w-5xl container for content sections. The 672px max-width is the reading width for all narrative content.
