const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        xxs: "0.5rem",
      },
      lineHeight: {
        11: "4.2rem",
      },
      boxShadow: {
        input: "0 4px 0 0 rgba(255, 56, 0, 0.1)",
        button: "0 10px 30px 0 rgba(255,56,0,0.40)",
      },

      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        "mv-waheed": ["mv_waheed"],
        aammu: ["aammu"],
        "mv-typewriter": ["mv_typewriter"],
        "mv-typewriter-bold": ["mv_typewriter_bold"],
      },
      colors: {
        rose: colors.rose,
        primary: "#F9F4EC",
        secondry: "#DBD2CD",
        "light-gray": "#95928D",
        red: "#FF3800",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
