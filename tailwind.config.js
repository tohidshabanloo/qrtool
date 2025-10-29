/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        vazir: ['Vazirmatn', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial']
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(0,0,0,0.15)'
      }
    },
  },
  plugins: [],
};

