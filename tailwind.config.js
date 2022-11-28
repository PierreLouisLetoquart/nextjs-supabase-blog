/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Fira: ["Fira Code", "sans-serif"],
      },
      colors: {
        "greenCode": "#008000",
        "darkLight": "#1D1D1E",
        "grayBg": "#A7A7A7",
        "grayCard": "#2C2C2E",
        "blueCode": "#155E75",
        "orangeCode": "#EAB308",
      }
    },
  },
  plugins: [],
}
