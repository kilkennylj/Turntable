/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Hendangan: ['Hendangan'],
        TWGb: ['twoweekendgo-bold'],
        TWGr: ['twoweekendgo-regular'],
        TWGsb: ['twoweekendgo-semibold'],
      },
      colors: {
        'red': '#FF4141',
        'gray': {
          50: '#D9D9D9',
          100: '#6C6C6C',
          200: '#656565',
          300: '#3B3B3B',
        },
        'white': '#FFFFFF',
        'transparent': 'transparent',
      },
    },
  },
  plugins: [],
}

