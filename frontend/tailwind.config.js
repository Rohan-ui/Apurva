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
        primary: '#bf2e2e',    // Deep blue
        secondary: '#cd1d1d',  // Dark gray
        accent1: '#bf2e2e',    // Orange
        accent2: '#bf2e2e',    // Green
      },
    },
  },
  plugins: [],
}
