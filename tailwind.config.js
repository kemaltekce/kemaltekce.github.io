/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primarycolor: 'var(--primary-color)',
        secondarycolor: 'var(--secondary-color)',
        blackcolor: 'var(--black-color)',
        bgcolor: 'var(--bg-color)'
      }
    },
  },
  plugins: [],
}

