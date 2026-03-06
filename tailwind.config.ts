import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ocean: { DEFAULT: "#0d2b3e", light: "#1a4a63" },
        sand: "#c9a87c",
        ivory: "#f7f2ea",
        gold: "#b8945a",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      fontSize: {
        "fluid-xs": "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
        "fluid-sm": "clamp(0.875rem, 0.8rem + 0.375vw, 1rem)",
        "fluid-base": "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
        "fluid-lg": "clamp(1.125rem, 1rem + 0.625vw, 1.375rem)",
        "fluid-xl": "clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem)",
        "fluid-2xl": "clamp(2rem, 1.5rem + 2.5vw, 3.5rem)",
        "fluid-3xl": "clamp(2.5rem, 1.8rem + 3.5vw, 5rem)",
      },
      maxWidth: {
        container: "1440px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
