module.exports = {
  presets: [require("../../tailwind-preset")],
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
      },
    },
  },
};
