import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./_components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        surface: {
          DEFAULT: "#0b1020",
          100: "#0f172a",
          200: "#111827",
        },
      },
      borderColor: { DEFAULT: "rgba(255,255,255,0.08)" },
    },
  },
  plugins: [],
} satisfies Config;
