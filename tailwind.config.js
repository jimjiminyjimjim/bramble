/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js"
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    fontSize: {
      xs: "0.75rem",
      sm: "0.8rem",
      base: "1.1rem",
      lg: "1.5rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      "6xl": "3.815rem"
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1380px", // 👈 move it here
      "2xl": "1536px"
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
        md: "3rem",
        lg: "4rem",
        xl: "6rem",
        "2xl": "8rem"
      }
    },
    extend: {
      fontFamily: {
        body: ["var(--font-body)"],
        display: ["var(--font-display)"]
      },
      colors: {
        "my-gradient":
          "linear-gradient(102deg, rgba(3, 5, 29, 0.85) 2.11%, rgba(255, 0, 0, 0.85) 100%)"
      }
    }
  },
  daisyui: {
    themes: true
  },
  plugins: [require("daisyui")]
};
