// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        archivo: ['Archivo', 'sans-serif'],
        daysOne: ['Days One', 'sans-serif'], 
      },
      backgroundImage: {
        'newsletter-bg': "url('/src/assets/newsletterbg.jpg')", // Custom background image
      },
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        accent1: 'var(--accent1-color)',
        accent2: 'var(--accent2-color)',
      },
    },
  },
  plugins: [],
}
