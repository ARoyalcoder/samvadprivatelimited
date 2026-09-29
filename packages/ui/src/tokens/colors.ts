/**
 * SAMVAD Perception Advisory Design System — Color Tokens
 *
 * Distinctive luxury editorial & strategic communications palette.
 * Avoids generic SaaS blues/purples in favor of obsidian noir,
 * aged warm alabaster, and refined burnished gold/champagne accents.
 */

export const colors = {
  obsidian: {
    950: "#050608", // Deepest void / canvas base
    900: "#08090B", // Default dark background
    850: "#0C0E12", // Surface elevation 1 / deep panels
    800: "#121419", // Surface elevation 2 / cards
    750: "#171A21", // Surface elevation 3 / hover states
    700: "#1F232B", // Muted borders & structural lines
    600: "#2B303B", // Active borders & dividers
  },
  paper: {
    50: "#FDFBF7", // Crisp light text / high contrast
    100: "#FBFBF9", // Primary text on dark backgrounds
    200: "#F4F3EF", // Secondary text / soft white
    300: "#EAE8E1", // Muted editorial white
    400: "#D6D3C8", // Tertiary caption / subtle metadata
    500: "#B5B0A2", // Dimmed metadata & footnotes
  },
  gold: {
    50: "#FDFBF7",
    100: "#F7F1E6",
    200: "#EEE1C8",
    300: "#E0CAA0",
    400: "#D1AE74",
    500: "#C39651", // Primary strategic gold accent
    600: "#A97B3D",
    700: "#865E31",
    800: "#6D4C2B",
    900: "#593F25",
  },
  champagne: {
    300: "#E8DEC8",
    400: "#D6C7A8",
    500: "#C5B38C", // Subtle metallic champagne highlight
    600: "#A8956E",
  },
  perception: {
    positive: "#10B981", // Strategic stability / favorable coverage
    positiveBg: "rgba(16, 185, 129, 0.12)",
    neutral: "#94A3B8", // Equilibrium / baseline coverage
    neutralBg: "rgba(148, 163, 184, 0.12)",
    alert: "#F59E0B", // Emerging narrative shift / warning
    alertBg: "rgba(245, 158, 11, 0.12)",
    crisis: "#EF4444", // Active crisis / hostile sentiment
    crisisBg: "rgba(239, 68, 68, 0.14)",
  },
} as const;

export type ColorToken = typeof colors;
