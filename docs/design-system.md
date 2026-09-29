# SAMVAD PERCEPTION ADVISORY — Design System Specification

## 1. Brand Philosophy & Design Principles

SAMVAD is a premier strategic communications, reputation management, and perception advisory firm catering to sovereign entities, multinational conglomerates, high-growth founders, and institutional leadership.

The digital manifestation of this brand **strictly rejects the generic SaaS aesthetic**—no rounded purple pastel pills, no playful bubble illustrations, and no generic gradients. Instead, the interface adopts a **high-stakes editorial, geopolitical intelligence, and bespoke advisory aesthetic** reminiscent of the Financial Times, McKinsey Quarterly, Brunswick Group, and confidential statecraft dossiers.

### Core Tenets

1. **Editorial Authority**: Serif display typography anchored by disciplined, high-density grotesques and monospaced classification indices.
2. **Obsidian & Metallic Depth**: Deep, multi-layered black voids (`#050608` to `#171A21`) juxtaposed with aged warm alabaster paper tones (`#FDFBF7`) and accents of burnished gold (`#C39651`) and champagne bronze (`#C5B38C`).
3. **Architectural Restraint**: Razor-sharp or micro-radius corners (0px to 6px) instead of bloated bubbles. High-contrast micro-borders (1px hairlines) establish spatial discipline.
4. **Cinematic, Damped Motion**: Motion conveys gravitas. No cartoonish bounces; all transitions use damped springs and bespoke cubic beziers (`[0.16, 1, 0.3, 1]`).
5. **Radical Accessibility**: Every component is built on accessible primitives (`@radix-ui`), respecting `prefers-reduced-motion` and meeting WCAG 2.1 AA/AAA contrast guidelines.

---

## 2. Design Tokens

### 2.1 Color Palette Matrix

#### Obsidian & Noir (Canvas & Elevation)

| Token          | Hex Value | Semantic Role                                          |
| -------------- | --------- | ------------------------------------------------------ |
| `obsidian-950` | `#050608` | Deepest canvas void, page base                         |
| `obsidian-900` | `#08090B` | Default dark background, primary shell                 |
| `obsidian-850` | `#0C0E12` | Surface Elevation 1: cards, modals, dropdowns          |
| `obsidian-800` | `#121419` | Surface Elevation 2: inputs, nested cards              |
| `obsidian-750` | `#171A21` | Surface Elevation 3: hover highlights, active segments |
| `obsidian-700` | `#1F232B` | Structural hairline dividers, inactive borders         |
| `obsidian-600` | `#2B303B` | Active borders, subtle focus rings                     |

#### Paper & Alabaster (Typography & High Contrast)

| Token       | Hex Value | Semantic Role                                      |
| ----------- | --------- | -------------------------------------------------- |
| `paper-50`  | `#FDFBF7` | Highest contrast text, highlights, primary buttons |
| `paper-100` | `#FBFBF9` | Primary headings, display text                     |
| `paper-200` | `#F4F3EF` | Secondary text, lead paragraphs                    |
| `paper-300` | `#EAE8E1` | Standard body copy, readable prose                 |
| `paper-400` | `#D6D3C8` | Captions, metadata, inactive labels                |
| `paper-500` | `#B5B0A2` | Footnotes, classifications, muted indices          |

#### Strategic Gold & Champagne (Brand Accents)

| Token           | Hex Value | Semantic Role                                 |
| --------------- | --------- | --------------------------------------------- |
| `gold-500`      | `#C39651` | Primary strategic gold accent, filled CTAs    |
| `gold-400`      | `#D1AE74` | Hover states, active indicators, eyebrow text |
| `gold-300`      | `#E0CAA0` | High-contrast gold text on dark obsidian      |
| `champagne-500` | `#C5B38C` | Subtle metallic highlight, shimmer gradients  |
| `champagne-300` | `#E8DEC8` | Bright specular metallic edge highlights      |

#### Perception Intelligence Status

| Status       | Text Color | Background (12% alpha)      | Usage                                             |
| ------------ | ---------- | --------------------------- | ------------------------------------------------- |
| **Positive** | `#10B981`  | `rgba(16, 185, 129, 0.12)`  | Favorable narrative coverage, strategic stability |
| **Neutral**  | `#94A3B8`  | `rgba(148, 163, 184, 0.12)` | Baseline monitoring, equilibrium                  |
| **Alert**    | `#F59E0B`  | `rgba(245, 158, 11, 0.12)`  | Emerging reputational divergence, early warning   |
| **Crisis**   | `#EF4444`  | `rgba(239, 68, 68, 0.14)`   | Active reputational risk, hostile narrative       |

---

### 2.2 Typography Scale & Hierarchy

All sizes leverage responsive fluid scaling via CSS `clamp()`:

| Token         | Clamp / Value                 | Leading | Tracking   | Weight       | Font Family      |
| ------------- | ----------------------------- | ------- | ---------- | ------------ | ---------------- |
| `display-2xl` | `clamp(3rem, 6.5vw, 5.5rem)`  | 1.02    | `-0.035em` | 300 Light    | Serif            |
| `display-xl`  | `clamp(2.5rem, 5vw, 4.25rem)` | 1.06    | `-0.03em`  | 300 Light    | Serif            |
| `display-lg`  | `clamp(2rem, 3.5vw, 3.25rem)` | 1.10    | `-0.025em` | 400 Regular  | Serif            |
| `heading-xl`  | `2.25rem` (36px)              | 1.20    | `-0.02em`  | 400 Regular  | Serif            |
| `heading-lg`  | `1.75rem` (28px)              | 1.25    | `-0.015em` | 400 Regular  | Serif            |
| `heading-md`  | `1.375rem` (22px)             | 1.30    | `-0.01em`  | 500 Medium   | Serif / Sans     |
| `heading-sm`  | `1.125rem` (18px)             | 1.40    | `0`        | 500 Medium   | Sans             |
| `lead`        | `1.25rem` (20px)              | 1.65    | `-0.01em`  | 300 Light    | Sans             |
| `body`        | `1rem` (16px)                 | 1.65    | `-0.005em` | 400 Regular  | Sans             |
| `small`       | `0.875rem` (14px)             | 1.60    | `0`        | 400 Regular  | Sans             |
| `caption`     | `0.75rem` (12px)              | 1.50    | `0.03em`   | 400 Regular  | Mono / Sans      |
| `eyebrow`     | `0.6875rem` (11px)            | 1.40    | `0.22em`   | 600 SemiBold | Mono (Uppercase) |

---

### 2.3 Spatial Scale & Containers

Based on a strict 4px baseline rhythm:

- Spacing units: `1` (4px), `2` (8px), `3` (12px), `4` (16px), `6` (24px), `8` (32px), `12` (48px), `16` (64px), `24` (96px), `32` (128px), `48` (192px).
- Containers:
  - `sm` (`max-w-3xl` / 768px): Focused intelligence reading, advisory briefs, policy essays.
  - `md` (`max-w-5xl` / 1024px): Standard submission forms, service matrices.
  - `lg` (`max-w-7xl` / 1280px): Standard dashboard and multi-column grid layouts.
  - `xl` (`max-w-[1440px]`): Widescreen cinematic canvas, hero showcases.
  - `full` (`max-w-none`): Bleed sections with standard edge padding.

---

### 2.4 Border Radii & Optical Depth

- Corner Radii:
  - `none`: `0px` (Architectural sharp lines)
  - `xs`: `2px` (Buttons, tags, cards, inputs)
  - `sm`: `4px` (Panels, modal windows)
  - `md`: `6px` (Floating cards)
  - `full`: `9999px` (Status indicators, pill badges)
- Shadows:
  - `elevation-1`: Low depth ambient dark shadow with subtle perimeter rim.
  - `elevation-2`: Mid-level card elevation for floating surfaces.
  - `elevation-3`: High depth modal / drawer dialog elevation.
  - `gold-glow`: Ambient burnished gold luminescence for highlighted active actions.
  - `glass`: Translucent obsidian backdrop with 16px blur and micro-border.

---

## 3. Component Architecture & Catalog

All components are implemented in `@samvad/ui` and exported from the single entrypoint `src/index.ts`.

### 3.1 Buttons & Interactive Triggers

- `Button`: Core interactive primitive with variants: `primary`, `secondary`, `outline`, `ghost`, `gold`, `luxury`, `destructive`, and `link`. Supports size tiers (`sm`, `md`, `lg`, `xl`, `icon`) and an animated `isLoading` state.
- `MagneticButton`: Wraps buttons with interactive magnetic cursor attraction using damped Framer Motion spring physics.

### 3.2 Typography Components

- `Heading`: Polymorphic semantic heading (`h1`–`h6`) with decoupled visual sizing (`display-2xl` through `sm`).
- `Display`: Hero-scale serif statement for impactful advisory thesis lines.
- `Eyebrow`: Monospaced uppercase category kicker with automated zero-padded numeric indices (e.g. `[01] STRATEGIC COMMUNICATIONS`).
- `SectionHeading`: Standardized section header combining Eyebrow, Heading, and Lead description.
- `Text`: Versatile body typography (`lead`, `body`, `small`, `caption`).
- `Lead`: Introductory thesis paragraph.
- `Quote`: Editorial blockquote with metallic accent border and citation attribution.
- `MetricNumber`: High-impact quantitative indicator with delta indicators.
- `AnimatedText`: Character, word, or line-by-line reveal motion.
- `RevealText`: Masked curtain slide reveal on viewport entry.
- `AnimatedCounter`: Spring-driven numeric odometer with formatting and prefixes.

### 3.3 Layout & Structure

- `Container`: Responsive max-width wrapper with padding presets.
- `Grid`: 12-column responsive layout engine with asymmetric editorial ratios (5:7, 4:8, 3:9).
- `GridCol`: Responsive column spanning.
- `Section`: Vertical rhythm container with padding variants (`compact`, `normal`, `spacious`, `hero`) and tone themes.
- `SectionHeader`: Section title block with split action support.
- `SectionDivider`: Hairline or metallic gradient horizontal separator.

### 3.4 Cards & Dossiers

- `Card`: Base obsidian surface with header, title, description, content, footer.
- `GlassCard`: Optical depth card featuring backdrop blur, 1px perimeter border, and a cursor-tracking radial highlight.
- `DossierCard`: Confidential strategic advisory card with classification badge, index number, excerpt, and action trigger.
- `MetricCard`: Quantitative performance card with trend arrows and contextual rationale.

### 3.5 Form & Data Capture

- `Input`: High-contrast field with obsidian-850 fill, micro-border, gold focus ring, and start/end icon slots.
- `Textarea`: Multi-line advisory inquiry field with consistent focus styling.
- `Label`: Accessible Radix label with monospace uppercase tracking.
- `Field`: Accessible wrapper binding Label, Input, Description, and Error validation states.

### 3.6 Navigation & Wayfinding

- `Navbar`: Sticky blurred navigation header with brand signature, link items, active underline animation, and executive CTAs.
- `NavItem`: Individual navigation anchor with smooth hover underline.
- `Breadcrumbs`: Hierarchical navigation trail with custom separators.
- `ScrollProgress`: Top minimal metallic scroll bar tracking document read progress.

### 3.7 Overlays & Dialogs

- `Modal`: Accessible Radix dialog with deep obsidian backdrop blur and smooth scale-in transitions.
- `Drawer`: Slide-in sheet panel from right, left, or bottom for filters and mobile navigation.
- `Tooltip`: High-contrast micro-tooltip with directional slide-in.

### 3.8 Data Display & Disclosures

- `Badge`: Tactical tag with variants (`default`, `secondary`, `outline`, `gold`, `positive`, `neutral`, `alert`, `crisis`) and optional status pulse dot.
- `Tabs`: Accessible Radix tabs supporting both editorial `underline` and obsidian `segmented` styles.
- `Accordion`: Editorial collapsible items featuring zero-padded numeric indices and smooth height animation.
- `Marquee`: Continuous ticker for institutional quotes, perception indices, and strategic partners with edge mask fade.

### 3.9 Media & Visual Unveiling

- `ImageReveal`: Editorial clip-path curtain unveil with subtle image scale-down on viewport entry.
- `HoverImage`: Interactive thumbnail that tracks the cursor on hover over text or link rows.

### 3.10 Feedback & Diagnostics

- `Spinner`: Minimal high-precision rotating SVG loader.
- `ShimmerBar`: Indeterminate metallic loading shimmer line.
- `OrbitLoader`: Luxury double-ring perception intelligence synthesizer loader.
- `Skeleton`: Base pulse placeholder.
- `CardSkeleton`, `TextSkeleton`, `MetricSkeleton`: Pre-composed layout skeletons.
- `EmptyState`: Editorial empty state with diagnostic code and recovery action.
- `ErrorState`, `ErrorCard`: Diagnostic alert containers with crisis badge and retry trigger.

### 3.11 Experience & Motion

- `CustomCursor`: Desktop pinpoint indicator with an ambient trailing ring that expands on interactive hover targets.
- `PageTransition`: Route wrapper providing subtle vertical displacement and opacity fade.

---

## 4. Usage & Integration Guide

### Consuming Components

Any application in the monorepo (`apps/web`, `apps/admin`) can import any token or component directly from `@samvad/ui`:

```tsx
import {
  Section,
  Container,
  SectionHeading,
  Button,
  MagneticButton,
  Card,
  GlassCard,
  DossierCard,
  Badge,
  Input,
  Field,
  FieldLabel,
  AnimatedCounter,
  RevealText,
} from "@samvad/ui";
```

### Motion Guidelines

1. Respect `prefers-reduced-motion`: When users request reduced motion, Framer Motion transitions degrade gracefully to instant or pure opacity fades.
2. Interaction delays should not exceed `0.8s` for entrances and `0.25s` for micro-interactions to maintain an agile, responsive executive feel.
