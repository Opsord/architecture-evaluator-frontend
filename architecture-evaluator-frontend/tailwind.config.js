module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  purge: [],
  darkMode: false, // or 'media' or false
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#20a8ac", // swamp-500
          dark: "#17848a", // swamp-600
        },
        background: {
          dark: "#17474a", // swamp-900
          light: "#f1fcfb", // swamp-50
        },
        gray: {
          light: "#cff8f5", // swamp-100
          medium: "#68e0de", // swamp-300
          dark: "#175358", // swamp-800
          border: "#a0efeb", // swamp-200
        },
        swamp: {
          50: "#f1fcfb",
          100: "#cff8f5",
          200: "#a0efeb",
          300: "#68e0de",
          400: "#39c6c8",
          500: "#20a8ac",
          600: "#17848a",
          700: "#166a6f",
          800: "#175358",
          900: "#17474a",
          950: "#051c1f",
        },
        bright_turquoise: {
          50: "#F3FEFC",
          100: "#B4F9ED",
          200: "#76F3DF",
          300: "#38EED0",
          400: "#06DEBA",
          500: "#05C2A3",
          600: "#04A68B",
          700: "#048A74",
          800: "#036E5C",
          900: "#025245",
          950: "#01362D",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
