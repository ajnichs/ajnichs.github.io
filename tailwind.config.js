/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: { DEFAULT: '#0B0C0E', surface: '#121418' },
        text: { DEFAULT: '#E8F0F2', dim: '#C8D5D7' },
        brand: {
          primary: '#99A07C',
          primaryMuted: '#6A674B',
          secondary: '#97B1C9',
          secondaryMuted: '#A3B9BF',
          tertiary: '#ACC9D9',
          cloud: '#C8D5D7'
        },
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      boxShadow: {
        glow: '0 0 24px rgba(153,160,124,0.25)',
        glowBlue: '0 0 24px rgba(151,177,201,0.25)'
      }
    },
  },
  plugins: [],
}
