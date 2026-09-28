# ADR-0006: Hybrid Animation Pipeline (Lenis, GSAP, Framer Motion, Three.js)

## Status

Accepted

## Context

High-consequence leadership expects an engaging, modern digital presence that sets SAMVAD apart from conventional consultancy websites. However, heavy animations frequently cause frame drops, poor mobile battery life, and inaccessible navigation if poorly coordinated.

## Decision

We establish a four-tier **Hybrid Animation Pipeline**:

1. **Lenis**: Provides lightweight, accessible smooth scrolling that normalizes touch and trackpad momentum across browsers.
2. **GSAP**: Orchestrates complex scroll-linked timelines, pinned storytelling, and SVG morphs.
3. **Framer Motion**: Drives declarative React component lifecycle transitions (fade, slide, hover, modal presence).
4. **Three.js & React Three Fiber (R3F)**: Renders the 3D Perception Intelligence network globe, isolated in dedicated client canvas islands with auto-throttling when out of view.

## Consequences

### Positive

- World-class visual polish reflecting high-level strategic intelligence.
- Clear separation: each animation tool is used strictly where it excels.
- Zero jank: GPU-accelerated transforms (`transform`, `opacity`) prevent DOM reflows.

### Negative / Trade-offs

- Three.js adds ~150KB gzip to bundle size; mitigated by dynamic import and client-side code splitting.
