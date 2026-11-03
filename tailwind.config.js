const plugin = require("tailwindcss/plugin");

/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: "media",
  content: ["./src/**/*.{ts,tsx}", "./post/**/*.mdx", "./public/**/*.svg"],
  theme: {
    extend: {
      screens: {
        xs: "420px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "roll-in": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "roll-out": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-100%)" },
        },
        "logo-in": {
          from: {
            opacity: "0",
            transform: "translateY(8px)",
            filter: "blur(4px)",
          },
          to: { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
      },
      animation: {
        "logo-in": "logo-in 0.6s ease-out both",
        "roll-in": "roll-in 0.7s ease-in-out both",
        "roll-out": "roll-out 0.7s ease-in-out both",
      },
      colors: {
        bg: "var(--color-bg)",
        "bg-mute": "var(--color-bg-mute)",
        primary: "var(--color-primary)",
        "primary-text": "var(--color-primary-text)",
        text: "var(--color-text)",
        "text-mute": "var(--color-text-mute)",
        "pre-bg": "var(--color-pre-bg)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
      },
      // for blog
      lineHeight: {
        p: "1.72",
        title: "1.16",
      },
      opacity: {
        3: "0.03",
      },
      borderRadius: {
        "4xl": "2.2rem",
      },
    },
  },
};
