/**
 * SAMVAD Perception Advisory Design System — Border Radius Tokens
 *
 * Micro, architectural corner radii avoiding generic SaaS bubble styling.
 */

export const radius = {
  none: "0px", // Razor-sharp editorial lines
  xs: "2px", // Subtle micro-corners for tags & buttons
  sm: "4px", // Standard inputs, cards, and modal containers
  md: "6px", // Elevated floating panels & dossier containers
  lg: "8px", // Maximum corner softness for large dialogs
  xl: "12px", // Special feature cards
  full: "9999px", // Status indicators, pill tags, magnetic triggers
} as const;

export type RadiusToken = typeof radius;
