---
name: Amlan Tripathy — Portfolio
description: A cinematic, editorial portfolio for a Creative Strategist and filmmaker — strategy made visible.
colors:
  paper: "#F7F6F3"
  paper-dim: "#ECEAE6"
  ink: "#111111"
  ink-soft: "#666666"
  indigo: "#4F46E5"
  film-green: "#7AF5C8"
  crimson: "#D94A64"
typography:
  display:
    fontFamily: "General Sans, Satoshi, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.75rem, 3.2rem + 5vw, 9rem)"
    fontWeight: 500
    lineHeight: 0.94
    letterSpacing: "-0.03em"
  h1:
    fontFamily: "General Sans, Satoshi, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.25rem, 1.8rem + 3.2vw, 5rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "General Sans, Satoshi, ui-sans-serif, sans-serif"
    fontSize: "clamp(1.5rem, 1.2rem + 1.6vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Satoshi, General Sans, ui-sans-serif, sans-serif"
    fontWeight: 300
  eyebrow:
    fontFamily: "Satoshi, General Sans, ui-sans-serif, sans-serif"
    fontWeight: 500
    fontSize: "0.75rem"
    letterSpacing: "0.14em"
rounded:
  sm: "2px"
  md: "12px"
  lg: "16px"
  pill: "9999px"
spacing:
  section-y: "clamp(7rem, 5rem + 10vw, 10rem)"
  container-x: "clamp(1.25rem, 4vw, 4.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.indigo}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "16px 32px"
---

# Design System: Amlan Tripathy — Portfolio

## Overview

**Creative North Star: "The Editing Suite"**

The whole site is staged as a film being cut, not a brochure being scrolled. Whitespace reads as unexposed paper stock; the near-black ink is the projector-off state; the three accents (indigo, film green, crimson) behave like a colorist's scopes — they never sit idle as decoration, only appearing on interaction, highlight, or timeline state. Structural motifs (waveforms, playheads, timeline tracks, render/export bars) recur across the Career Timeline, Portrait Reveal, and the intro loader, because they are the one visual world the whole system commits to, not a one-off illustration.

Confirmed visual rejections: no gradients-as-decoration, no neon/cyberpunk, no glassmorphism, no Bootstrap-style card grids, no orange-and-black agency-template energy. Section identifiers ("01 —", "02 —") are a deliberate exception to generic AI-slop "eyebrow" patterns: they mirror the client's own brief, which structures the narrative as numbered cinematic scenes, and they carry real sequence information across a long one-page scrollytelling journey.

**Key Characteristics:**
- Warm paper background, near-black ink, whitespace-dominant
- Accent color appears only on interaction/highlight/CTA — never at rest
- Typography is animation material: word-masked reveals, huge editorial display type
- Motion is authored per-scene (GSAP ScrollTrigger pins + scrub), not generic fade-ins
- Every placeholder (unreleased client names, testimonials, stats) is honestly labeled, never fabricated

## Colors

Two neutrals carry ~90% of every screen; the three accents are rationed to interaction states only.

### Primary
- **Deep Indigo** (`#4F46E5`): links, hover states, primary CTA hover, active nav underline, progress fills.

### Secondary
- **Film Green** (`#7AF5C8`): "verified/positive" signal — timeline progress, metric particles, footer CTA hover.
- **Muted Crimson** (`#D94A64`): playhead/marker accent — the one color that means "you are here" (scroll progress bar, timeline playhead).

### Neutral
- **Paper** (`#F7F6F3`): primary background.
- **Paper Dim** (`#ECEAE6`): secondary surfaces, cards, alternating section backgrounds.
- **Ink** (`#111111`): primary text, dark section backgrounds (Career Timeline, Metrics, Footer).
- **Ink Soft** (`#666666`): secondary/supporting text.

### Named Rules
**The Idle-Neutral Rule.** No accent color may render at rest. If a color other than paper/ink appears on first paint without a hover, focus, or active scroll state driving it, it's a violation.

## Typography

**Display Font:** General Sans (with Satoshi, ui-sans-serif fallback)
**Body Font:** Satoshi (with General Sans fallback)
**Label/Mono Font:** ui-monospace (system mono, used only for genuine data: timecodes, waveform labels, metric notes)

**Character:** A confident, slightly condensed grotesque pairing — General Sans carries the huge cinematic headlines, Satoshi carries reading copy at a lighter weight, so the display type feels authored while body copy stays quiet and editorial.

### Hierarchy
- **Display** (500, `clamp(2.75rem, 3.2rem + 5vw, 9rem)`, line-height 0.94): hero/closing statements only — one per page, at most.
- **H1** (500, `clamp(2.25rem, 1.8rem + 3.2vw, 5rem)`, line-height 1): page-level headlines (Footer CTA, Philosophy statements, article titles).
- **H2** (500, `clamp(1.5rem, 1.2rem + 1.6vw, 2.75rem)`, line-height 1.05): section headlines within a page.
- **Body** (300, fluid `clamp(1.0625rem, 1rem + 0.4vw, 1.375rem)`, line-height 1.55): supporting paragraphs, max width ~65ch via `max-w-xl`/`max-w-2xl` utilities.
- **Eyebrow/Label** (500, 0.75rem, 0.14em tracking, uppercase): section identifiers and metadata only, never a substitute for a heading.

### Named Rules
**The Type-Class Rule.** Custom heading classes are named `.type-h1` / `.type-h2` / `.h-display` — never `.h-1` / `.h-2`, which collide with Tailwind's own height utilities (`height: 0.25rem` / `0.5rem`) and silently collapse the heading's box to a few pixels while text still paints outside it. This exact bug shipped once during this build and was fixed by renaming; do not reintroduce the collision.

## Layout

`container-edit` is the shared page gutter: `max-width: 90rem`, horizontal padding `clamp(1.25rem, 4vw, 4.5rem)`. Section vertical rhythm is generous and asymmetric — more space above a heading than below it (`py-28 md:py-40` is the standard section pad). The one-page Landing Experience composes nine full-bleed scenes edge-to-edge with no shared card chrome between them; each scene owns its own background color and can invert to `bg-ink` for a "reel" beat (Career Timeline, Metrics). Sub-pages (`/work`, `/philosophy`, `/services`, `/about`, `/journal`, `/contact`) reuse the same section rhythm and container but stay single-background unless a scene explicitly needs contrast.

Responsive strategy: mobile stacks everything vertically (`flex-col` defaults), pinned/horizontal-scroll scenes (Creative Process, Career Timeline, Portrait Reveal) fall back to normal vertical flow below `md`, and GSAP ScrollTrigger pins are skipped entirely under `prefers-reduced-motion` or on narrow viewports where pinning would fight mobile scroll.

## Elevation & Depth

Flat by default — no ambient drop shadows on cards or type. Depth is conveyed through layered translucency (`backdrop-blur` on the nav and empty-state cards), border hairlines (`border-line` = `rgba(17,17,17,0.1)`), and z-index stacking of floating fragment blocks in the hero, not through box-shadow.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. The only elevation-like device in the system is the project card's hover scale + 3D tilt (`rotateX`/`rotateY` via pointer position) — a physical response to interaction, never a static shadow.

## Shapes

Two radii only: pill (`rounded-full`, all buttons, chips, "coming soon" badges) and a soft rectangle (`rounded-xl`/`rounded-2xl`, cards, panels, images). No sharp corners on interactive elements, no radius above `rounded-2xl`. Borders are always 1px hairlines (`border-line` / `border-line-soft`), never colored or thick.

## Components

### Buttons (`MagneticButton`)
- **Shape:** full pill (`rounded-full`), 16px/32px padding.
- **Primary:** ink background → indigo on hover, paper text; magnetic cursor-follow translate on pointer move.
- **Outline:** transparent, ink border at 25% opacity → indigo border+text on hover.
- **Icon:** authored SVG arrow (`ArrowRight`), never a Unicode glyph — translates on hover.

### Cards (`ProjectCard`)
- **Corner:** `rounded-2xl`.
- **Background:** gradient tint from the accent trio (never full-saturation), `paper-dim` base.
- **Hover:** pointer-driven 3D tilt (`perspective` + `rotateX`/`rotateY` springs) plus a "coming soon" badge for unreleased case studies — always honest about placeholder status, never disguised as real content.
- **Border:** 1px `border-line`.

### Navigation (`Nav`)
- Fixed, hides on scroll-down / reappears on scroll-up past 200px; solid paper/blur background only after 24px of scroll or when the mobile menu is open.
- Active route gets a 1px indigo underline; mobile menu is a height-animated accordion, not an overlay.

### Custom Cursor
- Two-layer: a zero-lag dot + a spring-eased ring. Ring swells and relabels itself ("View") over `data-cursor="view"` targets (case-study cards), tints indigo over `data-cursor="link"` targets. Desktop/fine-pointer only; disabled on touch and `prefers-reduced-motion`.

### Reveal Typography (`RevealText`)
- Word-masked reveal: each word sits in its own `overflow-hidden` box and translates up from 110% on intersection. Driven by a manual `IntersectionObserver` (`useInView` hook) rather than framer-motion's `whileInView`, which does not reliably fire in this project's installed framer-motion version (v13) — confirmed via headless-browser DOM inspection during the finish pass. Any new scroll-triggered reveal should reuse `useInView`, not `whileInView`.

## Do's and Don'ts

### Do:
- **Do** keep every accent color (indigo/film-green/crimson) tied to an interaction or state change, never a resting decoration.
- **Do** route all scroll-triggered animation through the `useInView` hook (`src/lib/useInView.ts`), not framer-motion's `whileInView`.
- **Do** name new heading utility classes `type-h*`, never `h-1`/`h-2`/etc., to avoid colliding with Tailwind's height scale.
- **Do** keep unreleased content (client names, testimonials, stats) visibly marked as placeholder — dashed borders, "coming soon" badges, or empty-state copy — rather than inventing plausible-sounding facts.
- **Do** author icons as inline SVG (`src/components/ui/Icon.tsx`), matching a single 1.4px stroke weight.

### Don't:
- **Don't** use elastic/bounce easing (`cubic-bezier` with values >1) — the system's easing floor is exponential ease-out (`--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`).
- **Don't** animate `width`/`height`/`padding`/`margin` directly; animate `transform: scaleX()`/`scaleY()` with `transform-origin` instead (see `CareerTimeline`'s progress bar).
- **Don't** introduce card-grid page scaffolds (icon + heading + text, same-size tiles) as a default layout — every scene in this system has a bespoke composition tied to what it demonstrates.
- **Don't** fabricate brand names, testimonials, or metrics anywhere in copy or data files, per `PRODUCT.md`.
