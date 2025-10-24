/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./popup/**/*.{tsx,jsx,ts,js}",
    "./components/**/*.{tsx,jsx,ts,js}",
    "./contents/**/*.{tsx,jsx,ts,js}",
    "./background/**/*.{tsx,jsx,ts,js}",
    "./*.{tsx,jsx,ts,js}"
  ],
  plugins: []
}
