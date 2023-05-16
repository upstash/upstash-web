const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
      },
      // for blog
      lineHeight: {
        p: "1.72",
        title: "1.16",
      },
      opacity: {
        "03": "0.03",
      },
    },
  },
};
