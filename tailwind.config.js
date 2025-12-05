export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7a9cff',
          50: '#f0f7ff',
          100: '#e0efff',
          500: '#7a9cff',
          600: '#5d82e8',
          700: '#4568d1',
        },
        success: '#8aefaf',
        warning: '#ffd97d',
        danger: '#ed8d8d',
      },
    },
  },
  plugins: [],
}