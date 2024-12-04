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
        primary: {
          DEFAULT: '#FF89A0',
          dark: '#FF6B88',
        },
        secondary: {
          DEFAULT: '#FFB5C2',
          dark: '#FF9EAF',
        },
        background: {
          light: '#FFF9FA',
          dark: '#2D2D2D',
        },
        accent: {
          peach: '#FFDAD6',
          lavender: '#E8D5FF',
          mint: '#D5FFE8',
        }
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'typing': 'typing 1.5s steps(40, end)',
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.8' },
        },
      },
    },
  },
  plugins: [],
}

export default config;
