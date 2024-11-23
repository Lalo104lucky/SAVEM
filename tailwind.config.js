/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js}", 
      "./node_modules/flowbite/**/*.js"],
      theme: {
        extend: {
          fontFamily: {
            quicksand: ['Quicksand', 'sans-serif'],
          },
        },
      },
  plugins: [require('flowbite/plugin')],
}