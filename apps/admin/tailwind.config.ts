import type { Config } from "tailwindcss";
import sharedPreset from "@samvad/config/tailwind";

const config: Config = {
  presets: [sharedPreset],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
