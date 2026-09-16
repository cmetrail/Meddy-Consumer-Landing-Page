/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "sans-serif"],
        "dm-serif": ["var(--font-dm-serif)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        playfair: ["var(--font-playfair)", "serif"],
      },
      colors: {
        disabled: "#BBBBBB",
        theme: {
          bg: "var(--color-bg)",
          surface: "var(--color-bg-surface)",
          card: "var(--color-card)",
          cardSurface: "var(--color-card-surface)",
          cardSecondary: "var(--color-card-secondary)",
          cardAlt: "var(--color-card-alt)",
          border: "var(--color-border)",
          textPrimary: "var(--color-text-primary)",
          textSecondary: "var(--color-text-secondary)",
          accent: "var(--color-accent)",
          accentLight: "var(--color-accent-light)",
          error: "var(--color-error)",
          blue: "var(--color-blue)",
          red: "var(--color-red)",
          ink: "var(--color-ink)",
          purple: "var(--color-purple)",
          green: "var(--color-green)",
          amber: "var(--color-amber)",
          neutralBg: "var(--color-neutral-bg)",
          neutralIcons: "var(--color-neutral-icons)",
        },
      },
      backgroundImage: {
        "problem-gradient":
          "linear-gradient(223deg, #D0E2CA 25%, #F6F4ED 42%, #F6F4ED 71%, #F0E6CF 91%)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
