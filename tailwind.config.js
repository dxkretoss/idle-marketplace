/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#003d36',
          dark: '#002a25',
          deep: '#082f2c',
          light: '#004c42',
        },
        idle: {
          emerald: '#004f46',
          teal: '#136c61',
          mint: '#e1f6f1',
          cream: '#faf9f5',
          gold: '#d6a746',
          goldHover: '#c99739',
          goldLight: '#f7e8bb',
          line: '#e3e9e4',
          muted: '#5e756e',
          navy: '#171a3b',
        }
      },
      fontFamily: {
        sans: ['"DM Sans"', 'Inter', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 46, 39, 0.08)',
        'glass-hover': '0 12px 40px 0 rgba(0, 46, 39, 0.14)',
        'glass-gold': '0 8px 24px -4px rgba(214, 167, 70, 0.25)',
        'glass-dark': '0 12px 34px rgba(0, 26, 22, 0.4)',
      },
      maxWidth: {
        'idle': '1440px',
      }
    },
  },
  plugins: [],
}
