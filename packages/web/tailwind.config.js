const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      opacity: {
        5: "0.06",
      },
      boxShadow: {
        input: "0 4px 0 0 rgba(255, 56, 0, 0.1)",
        button: "0 10px 30px 0 rgba(255,56,0,0.40)",
      },
      container: {
        center: true,
      },
      spacing: {
        20: "4.375rem", // 70px
      },
      fontSize: {
        xxs: "0.5rem",
        menu: "1.75rem",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        "mv-waheed": ["mv_waheed"],
        aammu: ["aammu"],
        "mv-typewriter": ["mv_typewriter"],
        "mv-typewriter-bold": ["mv_typewriter_bold"],
      },
      rotate: {
        25: "25deg",
        "-25": "-25deg",
      },
      height: {
        0.6: "3px",
      },
    },
  },
  variants: {
    fill: ["hover", "focus"],
    stroke: ["hover", "focus"],
  },
  plugins: [require("@tailwindcss/forms")],
};
