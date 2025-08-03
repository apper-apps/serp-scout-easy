/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1f2e',
        secondary: '#2d3748',
        accent: '#48bb78',
        surface: '#2a2f3e',
        background: '#0f1419',
        success: '#48bb78',
        warning: '#ed8936',
        error: '#f56565',
        info: '#4299e1',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'elevation': '0 4px 8px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}