/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Poppins',
      },
      screens: {
        '3xs': '280px',
        '2xs': '320px',
        xs: '360px',
      },
      colors: {
        primary: {
          100: '#5570F1',
          90: '#6078EC',
          80: '#6D83EC',
          70: '#7C8FEC',
          60: '#8899E9',
          50: '#97A5EB',
          40: '#ABB5E9',
          30: '#B6BFE8',
          20: '#C4CAE8',
          10: '#DBDEEE',
        },
        secondary: {
          100: '#FFCC91',
          90: '#FFD29E',
          80: '#FFDAAE',
          70: '#FFDFBA',
          60: '#FFE5C8',
          50: '#FFEAD1',
          40: '#FFF0DE',
          30: '#FFF2E2',
          20: '#FEF5EA',
          10: '#FEF9F2',
        },
        black: {
          100: '#1C1D22',
          90: '#2C2D33',
          80: '#33343A',
          70: '#37393F',
          60: '#45464E',
          50: '#53545C',
          40: '#6E7079',
          30: '#8B8D97',
          20: '#A6A8B1',
          10: '#BEC0CA',
        },
        action: {
          green: '#519C66',
          red: '#CC5F5F',
        },
      },
      spacing: {},
    },
  },
  plugins: [],
}
