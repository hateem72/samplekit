// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#B91C1C", // Red
          light: "#EF4444",
          dark: "#991B1B",
        },
        secondary: {
          DEFAULT: "#1E3A8A", // Dark Blue
          light: "#3B82F6",
          dark: "#1E3A8A",
        },
        accent: {
          DEFAULT: "#FBBF24", // Amber for highlights
          light: "#FCD34D",
        },
        background: {
          DEFAULT: "#F9FAFB", // Light gray
          white: "#FFFFFF",
          pattern: "#E5E7EB", // For pattern overlays
        },
        text: {
          primary: "#1F2937", // Dark gray
          secondary: "#6B7280", // Gray
          accent: "#B91C1C", // Matches primary
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern": "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23B91C1C\" fill-opacity=\"0.1\" fill-rule=\"evenodd\"%3E%3Ccircle cx=\"3\" cy=\"3\" r=\"3\"/%3E%3Ccircle cx=\"13\" cy=\"13\" r=\"3\"/%3E%3C/g%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
};