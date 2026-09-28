# ADR-0002: Next.js App Router & Server-First Rendering

## Status

Accepted

## Context

A premier perception advisory firm relies heavily on organic search indexing, institutional discovery, swift first-contentful-paint (FCP), and uncompromising performance across mobile and desktop. Traditional client-heavy Single Page Applications (SPAs) suffer from SEO penalties, hydration delays, and bloated JavaScript payloads.

## Decision

We adopt **Next.js 15 App Router** using React Server Components (RSC) by default:

- Pages, layouts, and public editorial content are rendered server-side or generated statically.
- Client components (`"use client"`) are strictly reserved for interactive UI islands:
  - Three.js perception network canvas.
  - Lenis smooth scroll provider.
  - Form state management and modal overlays.

## Consequences

### Positive

- Exceptional SEO performance with instant server-rendered HTML.
- Minimal client JS bundle size: server dependencies (Prisma, markdown parsers, Redis) are never shipped to the client browser.
- Built-in Streaming SSR and Suspense boundaries for non-blocking rendering.

### Negative / Trade-offs

- Requires developers to maintain clear mental models of server vs. client execution context boundaries.
