/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'ctblue': '#4255FF', 
        'primary': '#0069D9', 
        'ctred': '#C82333',
        'ctgray': '#5A6268'
        },
    },
  },
  plugins: [],
} 

