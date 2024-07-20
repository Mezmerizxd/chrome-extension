const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "accent-light": "#1fff94",
        "accent-dark": "#1ad57c",
        background: "#1e2120",
        "background-light": "#2a2e2c",
        "background-dark": "#131514",
        "white-light": "#ECECEC",
        "white-dark": "#CCCCCC",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
};
