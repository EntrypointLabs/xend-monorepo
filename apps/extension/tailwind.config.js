/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./popup/**/*.{tsx,jsx,ts,js}",
    "./pages/**/*.{tsx,jsx,ts,js}",
    "./components/**/*.{tsx,jsx,ts,js}",
    "./contents/**/*.{tsx,jsx,ts,js}",
    "./background/**/*.{tsx,jsx,ts,js}",
    "./*.{tsx,jsx,ts,js}"
  ],
  theme: {
    extend: {
      spacing: {
        2.25: "0.5625rem",
        2.75: "0.6875rem",
        4.5: "1.125rem",
        15: "3.75rem",
        18: "4.5rem",
        22: "5.5rem"
      },
      colors: {
        "brand-blue": "#115EBF",
        "border-gray": "#B8B8B8"
      },
      fontFamily: {
        sans: ["Satoshi-Variable", "sans-serif"]
      }
    }
  },
  plugins: [require("tailwind-scrollbar-hide")]
}
