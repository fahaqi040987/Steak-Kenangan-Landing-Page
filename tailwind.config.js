import tailwindcssAnimate from "tailwindcss-animate";

/**
 * Tailwind config — the token seam. The whole identity (palette, fonts, shadow)
 * is defined here once; components reference semantic tokens only.
 * Palette from the brand's own :root (Steak-Kenangan-Paket-Lengkap-Website/07-Website/css/style.css):
 * Charcoal #18120C · Cream #F7F1E6 · Gold #C0923E · Gold Light #DEB86E · Maroon #8C2F2A
 */
/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{js,ts,jsx,tsx}",
    "./types/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    colors: {
      body: "#F7F1E6",
      white: "#fff",
      charcoal: { DEFAULT: "#18120C", soft: "#241B12" },
      cream: { DEFAULT: "#F7F1E6", soft: "#EFE7D7" },
      gold: {
        DEFAULT: "#C0923E",
        hover: "#DEB86E",
        light: "#E6D2A3",
        // Antique gold for TEXT on light surfaces — #C0923E fails WCAG AA there (≈2.7:1), deep passes (≈4.6:1)
        deep: "#8C6D2F",
      },
      maroon: "#8C2F2A",
      grey: "#60564A",
      line: "#E0D6C4",
    },
    extend: {
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        primary: "0 12px 32px 0 rgba(24, 18, 12, 0.16)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
