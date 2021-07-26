module.exports = {
  presets: [require('../../tailwind-preset')],
  theme: {
    extend: {
      opacity: {
        5: '0.06',
      },
      container: {
        center: true,
      },
      spacing: {
        20: '4.375rem', // 70px
      },
      fontSize: {
        menu: '1.75rem',
      },
      rotate: {
        25: '25deg',
        '-25': '-25deg',
      },
      height: {
        0.6: '3px',
      },
    },
    variants: {
      fill: ['hover', 'focus'],
      stroke: ['hover', 'focus'],
    },
  },
};
