module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  purge: [],
  darkMode: 'class', // or 'media' or false
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // main blue
          dark: '#2563EB',    // hover blue
        },
        background: {
          dark: '#111827',    // dark background
          light: '#ffffff',   // light background
        },
        gray: {
          light: '#F3F4F6',  // light gray
          medium: '#6B7280', // medium gray
          dark: '#374151',   // dark gray
          border: '#E5E7EB', // border color
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

