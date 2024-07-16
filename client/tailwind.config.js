/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode : "class",
  theme: {
    extend: {
      flexGrow :{
        1 : "0.2",
        2 : "0.8"
      },
      colors:{
        icons : "#808080",
        primary : "#16172A",
        secondary : "#4f46e5",
        darkBg : "#181818"
      },
      borderRadius:{
        sm : "10px"
      }
    },
  },
  plugins: [],
}

