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
        cyber: {
          bg: "#050505",
          red: "#FF2E63",
          purple: "#B900FF",
        },
      },
      fontFamily: {
        // Chakra Petch (Гугл)
        chakra: ["var(--font-chakra)", "sans-serif"],
        // Inter (Гугл)
        inter: ["var(--font-inter)", "sans-serif"],
        // TacticSans (Локальный) -> если не загрузится, будет Chakra
        tactic: ["TacticSans", "var(--font-chakra)", "sans-serif"], 
      },
      animation: {
        'glitch': 'glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite',
        'shine': 'shine 0.75s ease-in-out',
      },
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' }
        },
        shine: {
          '0%': { left: '-100%' },
          '100%': { left: '200%' }
        }
      }
    },
  },
  plugins: [],
};
export default config;