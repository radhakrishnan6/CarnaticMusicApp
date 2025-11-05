/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./src/**/*.html", "./src/**/*.ts"],
  theme: {
    extend: {
      colors: {
        // South Indian traditional inspired palette
        saffron: {
          50: "#fffbf0",
          100: "#fff6e0",
          200: "#ffecc0",
          300: "#ffd89f",
          400: "#ffb84d",
          500: "#ff9800", // Primary gold/saffron
          600: "#e68900",
          700: "#cc7a00",
          800: "#996000",
          900: "#664000",
        },
        indigo: {
          50: "#f0f4ff",
          100: "#e0e9ff",
          200: "#c0d3ff",
          300: "#9fbfff",
          400: "#7fa7ff",
          500: "#6b5bff", // Deep indigo
          600: "#5b4bef",
          700: "#4c3cd9",
          800: "#3c2db5",
          900: "#2d1f8f",
        },
        gold: {
          50: "#fffef5",
          100: "#fffced",
          200: "#fff9db",
          300: "#fff6c9",
          400: "#fff0a5",
          500: "#f4e4a6",
          600: "#e8d893",
          700: "#d4c66b",
          800: "#b8a850",
          900: "#8b7f3a",
        },
        terracotta: {
          50: "#faf5f0",
          100: "#f5ede0",
          200: "#ebd8c0",
          300: "#ddc4a0",
          400: "#d4a880",
          500: "#c97760", // Warm terracotta
          600: "#b85c47",
          700: "#9d4a39",
          800: "#7f3a2a",
          900: "#632b1f",
        },
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },
      backgroundImage: {
        "gradient-carnatic":
          "linear-gradient(135deg, #f4e4a6 0%, #6b5bff 50%, #c97760 100%)",
        "gradient-soft":
          "linear-gradient(135deg, rgba(255, 152, 0, 0.05) 0%, rgba(107, 91, 255, 0.05) 100%)",
      },
      fontFamily: {
        display: ["system-ui", "sans-serif"],
        body: ["system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      },
      spacing: {
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
