/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F19',
        foreground: '#F8FAFC',
        card: {
          DEFAULT: '#111827',
          foreground: '#F8FAFC',
        },
        popover: {
          DEFAULT: '#111827',
          foreground: '#F8FAFC',
        },
        primary: {
          DEFAULT: '#00F0FF',
          foreground: '#0B0F19',
          glow: 'rgba(0, 240, 255, 0.35)',
        },
        secondary: {
          DEFAULT: '#7000FF',
          foreground: '#FFFFFF',
          glow: 'rgba(112, 0, 255, 0.35)',
        },
        accent: {
          DEFAULT: '#FF007A',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#1E293B',
          foreground: '#94A3B8',
        },
        border: 'rgba(255, 255, 255, 0.1)',
        input: 'rgba(255, 255, 255, 0.08)',
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
      },
    },
  },
  plugins: [],
};
