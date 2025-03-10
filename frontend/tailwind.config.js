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
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in-up-delayed': {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '30%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        'fade-in-right-delayed': {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '20%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'fade-in-up-delayed': 'fade-in-up-delayed 1s ease-out forwards',
        'fade-in-right': 'fade-in-right 1s ease-out forwards',
        'fade-in-right-delayed': 'fade-in-right-delayed 1.2s ease-out forwards'
      }
    },
  },
  plugins: [],
}
