/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        mobile: "576px",
        xl: "1200px",
      },
      colors: {
        secon: "#2563eb",
      },
    },
  },
  plugins: [],
};
