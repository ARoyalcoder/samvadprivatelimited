/**
 * SAMVAD Perception Advisory Design System — Typography Tokens
 *
 * Refined editorial type scale pairing high-character serifs with crisp grotesques.
 */

export const typography = {
  fonts: {
    serif: 'var(--font-serif), Georgia, Cambria, "Times New Roman", Times, serif',
    sans: 'var(--font-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: "var(--font-display), var(--font-serif), Georgia, serif",
    mono: 'var(--font-mono), "JetBrains Mono", Consolas, Menlo, Monaco, monospace',
  },
  scale: {
    "display-2xl": {
      size: "clamp(3rem, 6.5vw, 5.5rem)",
      lineHeight: "1.02",
      letterSpacing: "-0.035em",
      weight: "300",
    },
    "display-xl": {
      size: "clamp(2.5rem, 5vw, 4.25rem)",
      lineHeight: "1.06",
      letterSpacing: "-0.03em",
      weight: "300",
    },
    "display-lg": {
      size: "clamp(2rem, 3.5vw, 3.25rem)",
      lineHeight: "1.1",
      letterSpacing: "-0.025em",
      weight: "400",
    },
    "heading-xl": {
      size: "2.25rem",
      lineHeight: "1.2",
      letterSpacing: "-0.02em",
      weight: "400",
    },
    "heading-lg": {
      size: "1.75rem",
      lineHeight: "1.25",
      letterSpacing: "-0.015em",
      weight: "400",
    },
    "heading-md": {
      size: "1.375rem",
      lineHeight: "1.3",
      letterSpacing: "-0.01em",
      weight: "500",
    },
    "heading-sm": {
      size: "1.125rem",
      lineHeight: "1.4",
      letterSpacing: "0",
      weight: "500",
    },
    lead: {
      size: "1.25rem",
      lineHeight: "1.65",
      letterSpacing: "-0.01em",
      weight: "300",
    },
    body: {
      size: "1rem",
      lineHeight: "1.65",
      letterSpacing: "-0.005em",
      weight: "400",
    },
    small: {
      size: "0.875rem",
      lineHeight: "1.6",
      letterSpacing: "0",
      weight: "400",
    },
    caption: {
      size: "0.75rem",
      lineHeight: "1.5",
      letterSpacing: "0.03em",
      weight: "400",
    },
    eyebrow: {
      size: "0.6875rem",
      lineHeight: "1.4",
      letterSpacing: "0.22em",
      weight: "600",
      textTransform: "uppercase",
    },
  },
} as const;

export type TypographyToken = typeof typography;
