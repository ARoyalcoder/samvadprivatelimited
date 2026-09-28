# ADR-0005: shadcn/ui and Tailwind CSS for Enterprise Design System

## Status

Accepted

## Context

Enterprise corporate identity requires bespoke visual elegance (obsidian surfaces, champagne gold accents, crisp borders) without the rigidity of monolithic UI libraries or the unmaintainability of ad-hoc CSS.

## Decision

We adopt **shadcn/ui** primitives built on top of **Tailwind CSS** and **Radix UI**:

- Components reside directly within `@samvad/ui`, giving the team complete ownership of the source code.
- Custom tokens defined in `@samvad/config/tailwind` reflect SAMVAD's perception advisory brand identity (`brand-*`, `gold-*`, `zinc-*`).
- Full accessibility (ARIA attributes, keyboard navigation, screen reader support) is inherited natively from Radix UI primitives.

## Consequences

### Positive

- Zero runtime CSS overhead; Tailwind purges unused classes during build.
- Complete visual control without third-party vendor lock-in.
- Accessible, responsive, mobile-first component patterns out of the box.

### Negative / Trade-offs

- Utility classes can create verbose JSX if not properly abstracted into reusable UI primitives.
