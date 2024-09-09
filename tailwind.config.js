/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}' ,
    './index.html'
  ],
  theme: {
    extend: {
      container:{
        center: true //hghyr al defult bta3 al container fe kol al tailwand 
      }
    },
  },
  plugins: [],
}

