/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.php',
    './**/*.php',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#062B4F',
        blue: '#0B3F70',
        gold: '#F4A900',
        ink: '#172033',
        mist: '#F8FAFC',
        line: '#06C755',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Thai"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '72rem',
      },
    },
  },
  plugins: [],
};
