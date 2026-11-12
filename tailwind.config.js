/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        eduai: {
          primary: '#5278D8',
          deep: '#263D70',
          lavender: '#A99BEF',
          light: '#F5F7FC',
          dark: '#111827',
          surface: '#1C2638',
          text: '#202B40',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}