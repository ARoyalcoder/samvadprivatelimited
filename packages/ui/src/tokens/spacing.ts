/**
 * SAMVAD Perception Advisory Design System — Spacing & Layout Tokens
 */

export const spacing = {
  baseline: "4px",
  scale: {
    0: "0px",
    1: "0.25rem", // 4px
    2: "0.5rem", // 8px
    3: "0.75rem", // 12px
    4: "1rem", // 16px
    5: "1.25rem", // 20px
    6: "1.5rem", // 24px
    8: "2rem", // 32px
    10: "2.5rem", // 40px
    12: "3rem", // 48px
    16: "4rem", // 64px
    20: "5rem", // 80px
    24: "6rem", // 96px
    32: "8rem", // 128px
    40: "10rem", // 160px
    48: "12rem", // 192px
  },
  containers: {
    sm: "768px", // Dossier reading / focused essays
    md: "1024px", // Standard advisory briefings
    lg: "1280px", // Executive dashboards & grid views
    xl: "1440px", // Full-width widescreen canvas
    full: "100%",
  },
} as const;

export type SpacingToken = typeof spacing;
