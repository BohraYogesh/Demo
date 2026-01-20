module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        times: ['"Times New Roman"', "serif"],
        playfair: ['"Playfair Display"', "serif"],

        // ⭐ YOUR CUSTOM CLASS
        yogesh: ['"Playfair Display"', "serif"],
      },
      colors: {
        subtitle: "#6A5AA9",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
