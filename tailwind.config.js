/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-yellow': '#F7B500',
        'hover-yellow': '#E2A200',
        'dark-bg': '#111217',
        'dark-bg-alt': '#14151B',
        'card-gray': '#1C1D25',
        'border-gray': '#2A2B35',
        'text-white': '#FFFFFF',
        'text-muted': '#9EA3B5',
        'yellow-tint': 'rgba(247, 181, 0, 0.10)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle, #181925 0%, #111217 100%)',
      }
    },
  },
  plugins: [],
};
