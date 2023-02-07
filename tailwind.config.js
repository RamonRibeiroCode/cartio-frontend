/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xs': '280px',
        '2xs': '320px',
        xs: '360px',
      },
      colors: {
        primary: {
          black: '#01080E',
        },
      },
      spacing: {},
    },
  },
  plugins: [],
}
