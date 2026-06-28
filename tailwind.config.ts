import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#FAF8F3",
          dark: "#0E1115",
        },
        ink: {
          DEFAULT: "#15181D",
          dim: "#5B6168",
          dark: "#EAE7DE",
          "dim-dark": "#979CA3",
        },
        surface: {
          DEFAULT: "#F1EDE2",
          dark: "#171B20",
        },
        line: {
          DEFAULT: "#E1DCCE",
          dark: "#272C32",
        },
        accent: {
          DEFAULT: "#15694F",
          dark: "#52DDA8",
        },
        rust: {
          DEFAULT: "#AD5A1E",
          dark: "#E8A33D",
        },
        diff: {
          add: "#1F7A4D",
          addDark: "#3FCB87",
          del: "#B23A2E",
          delDark: "#E5635A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      typography: () => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
          },
        },
      }),
      keyframes: {
        caret: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        caret: "caret 1s step-end infinite",
        "fade-up": "fade-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
