/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e82574', 
        'primary-dark': '#bc1c5c',
      },
    },
  },
  plugins: [],
}

