/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B9BD5',
        secondary: '#4A7BA7',
        accent: '#FFB347',
        moomin: '#E8F4F8',
        pink: '#F2448A',
        blue: '#0096FF',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Fredoka', 'sans-serif'],
      },
    }
  },
  plugins: [],
}