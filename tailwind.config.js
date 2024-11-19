const plugin = require("tailwindcss/plugin");

/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: "media",
  content: ["./src/**/*.{ts,tsx}", "./post/**/*.mdx", "./public/**/*.svg"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        primary: "var(--color-primary)",
        text: "var(--color-text)",
        "text-mute": "var(--color-text-mute)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
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
