/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#F4F7FB',
        foreground: '#0F172A',
        brand: {
          DEFAULT: '#00B894',
          hover: '#00A382',
          light: '#E6F7F4',
          accent: '#00D26A',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#0F172A'
        },
        primary: {
          DEFAULT: '#00B894',
          foreground: '#FFFFFF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      boxShadow: {
        'card': '0 2px 10px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 10px 25px -5px rgba(0, 184, 148, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'brand': '0 4px 14px 0 rgba(0, 184, 148, 0.35)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    }
  },
  plugins: []
};
