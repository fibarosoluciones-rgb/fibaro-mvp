import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        tuline: {
          blush: "#f9ebe6",
          sand: "#f2e9e4",
          gold: "#caa87e",
          ink: "#1c1a1a",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
      container: {
        center: true,
        padding: "1.5rem",
      },
      boxShadow: {
        soft: "0 20px 80px -40px rgba(20,20,20,0.45)",
      },
    },
  },
  plugins: [],
}

export default config
