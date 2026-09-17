import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#ECEDE9",
        surface: "#FFFFFF",
        ink: "#1D1F1C",
        muted: "#6B6F68",
        line: "#D6D8D1",
        accent: "#D9A22C",
        "accent-soft": "#F6EBCF",
        confirm: "#2E6B4F",
        "confirm-soft": "#E1EEE7",
        cancel: "#B23A2E",
        "cancel-soft": "#F5DFDB",
      },
      fontFamily: {
        display: ["'Oswald'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
