import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#020917",
          900: "#0a1628",
          800: "#0f2040",
          700: "#1a3560",
          600: "#1e3a5f",
          500: "#1d4ed8",
          400: "#2563eb",
          300: "#3b82f6",
          200: "#93c5fd",
          100: "#bfdbfe",
          50:  "#eff6ff",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delay": "float 6s ease-in-out 2s infinite",
        "float-delay2": "float 6s ease-in-out 4s infinite",
        "shimmer": "shimmer 3s linear infinite",
        "grain": "grain 0.5s steps(1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "30%": { transform: "translate(3%, -1%)" },
          "50%": { transform: "translate(-1%, 2%)" },
          "70%": { transform: "translate(2%, 3%)" },
          "90%": { transform: "translate(-3%, 1%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
