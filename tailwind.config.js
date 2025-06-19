/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // GOV.UK Design System colors
        'govuk-blue': '#1d70b8',
        'govuk-green': '#00703c',
        'govuk-red': '#d4351c',
        'govuk-yellow': '#ffdd00',
        'govuk-grey': {
          1: '#f3f2f1',
          2: '#e6e5e4', 
          3: '#b1b4b6',
          4: '#626a6e'
        }
      },
      fontFamily: {
        'govuk': ['Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
}