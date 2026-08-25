/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.php',
    './privacy/**/*.php',
    './terms/**/*.php',
    './components/**/*.php',
    './includes/**/*.php',
    './templates/**/*.php',
    './car-with-driver-chiangmai/**/*.php',
    './airport-transfer-chiangmai/**/*.php',
    './price/**/*.php',
    './reviews/**/*.php',
    './destinations/**/*.php',
    './vehicles/**/*.php',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#062B4F',
        'navy-deep': '#0B3F70',
        gold: '#F4A900',
        'gold-soft': '#FFC94A',
        ink: '#172033',
        mist: '#F5F7FB',
        line: '#06C755',
      },
      fontFamily: {
        sans: ['"Kanit"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 40px rgba(6, 43, 79, 0.10)',
        card: '0 8px 28px rgba(6, 43, 79, 0.07)',
        lift: '0 18px 40px rgba(6, 43, 79, 0.14)',
        glow: '0 0 0 4px rgba(244, 169, 0, 0.18)',
      },
      borderRadius: {
        brand: '16px',
        'brand-lg': '22px',
      },
      maxWidth: {
        content: '74rem',
      },
      backgroundImage: {
        'hero-mesh':
          'radial-gradient(ellipse 80% 60% at 90% 10%, rgba(244,169,0,0.22), transparent 55%), radial-gradient(ellipse 60% 50% at 10% 90%, rgba(255,255,255,0.12), transparent 50%)',
        'section-fade':
          'linear-gradient(180deg, #F5F7FB 0%, #FFFFFF 100%)',
        'gold-line':
          'linear-gradient(90deg, transparent, #F4A900, transparent)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};
