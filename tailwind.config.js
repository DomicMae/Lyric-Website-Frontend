/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-black": "#021024",
        "custom-blue-black": "#052659",
        "custom-blue-seas": "#5483B3",
        "custom-blue": "#7DA0CA",
        "custom-blue-white": "#C1E8FF",
      },
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', "sans-serif"],
        redhat: ['"Red Hat Text"', "sans-serif"], // Tambahkan font Red Hat Text
      },
    },
  },
  plugins: [require("daisyui")],
};
