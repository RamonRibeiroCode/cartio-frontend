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
      fontFamily: {
        sans: 'Poppins',
      },
      fontSize: {
        'sub-heading-1': ['32px', '48px'],
        'sub-heading-2': ['28px', '42px'],
        'sub-heading-3': ['20px', '30px'],
        'paragraph-1': ['16px', '20px'],
        'paragraph-2': ['14px', '17px'],
        'label-1': ['12px', '14.5px'],
        'label-2': ['11px', '13.3px'],
        'label-3': ['10px', '12px'],
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
          transparent: "#5570f129",
          pressed: "#5B6EC6"
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
          "red-transparent": "#cc5f5f33",
          red: '#CC5F5F',
        },
      },
      spacing: {},
    },
  },
  plugins: [],
}
