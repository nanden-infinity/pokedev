/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "verder": "#2c8e3e",
        "header--color": "#e8590c"
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui"],
        mono: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
