/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "check": "linear-gradient hsl(192, 100%, 67%) to hsl(280, 87%, 65%)"
      }
    },
  },
  plugins: [],
}

