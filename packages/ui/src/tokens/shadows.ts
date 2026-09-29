/**
 * SAMVAD Perception Advisory Design System — Shadows & Optical Glow Tokens
 *
 * Multi-layer dark elevation with subtle metallic highlights.
 */

export const shadows = {
  elevation1: "0 1px 2px 0 rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.04)",
  elevation2: "0 4px 16px 0 rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.06)",
  elevation3: "0 16px 40px 0 rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.08)",
  goldGlow: "0 0 35px -5px rgba(195, 150, 81, 0.2), 0 0 12px -2px rgba(195, 150, 81, 0.12)",
  goldSubtle: "0 0 20px -3px rgba(195, 150, 81, 0.1)",
  glass: "0 8px 32px 0 rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.06)",
  innerSubtle: "inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)",
} as const;

export type ShadowToken = typeof shadows;
