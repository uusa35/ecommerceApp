const {plugin} = require('twrnc');
module.exports = {
  theme: {
    extend: {
      colors: {
        'modal-bg': 'rgb(0, 0, 0, 0.4)',
        'hippie-blue': {
          300: '#b4d4db',
          400: '#7bb4c1',
          500: '#4394a6',
          600: '#3c8595',
          800: '#285964',
          900: '#304b52',
        },
        red: {
          900: '#d7161f',
        },
        green: {
          900: '#078231',
          950: '#25d366',
        },
        yellow: {
          400: '#FBBF24',
        },
        corn: {
          50: '#fefcf2',
          100: '#fcf9e6',
          200: '#f8f0c0',
          300: '#f4e69a',
          400: '#ebd44e',
          500: '#e3c102',
          600: '#ccae02',
          700: '#aa9102',
          800: '#887401',
          900: '#6f5f01',
        },
        midnight: {
          50: '#f3f3f5',
          100: '#e6e8ea',
          200: '#c1c5cb',
          300: '#9ca1ac',
          400: '#515b6e',
          500: '#071530',
          600: '#06132b',
          700: '#051024',
          800: '#040d1d',
          900: '#030a18',
        },
      },
    },
    fontFamily: {
      'Tajawal-Medium': ['font-tajwal-medium', 'sans-serif'],
      NizarBBCKurdish: ['font-bbc', 'sans-serif'],
      'NotoKufiArabic-Regular': ['font-noto', 'sans-serif'],
      'NotoKufiArabic-Regular_Bold': ['font-kufi', 'sans-serif'],
      'Janna LT Bold': ['font-gesst', 'sans-serif'],
      'beIN Normal': ['font-bein', 'sans-serif'],
      'beIN Black': ['font-bein-bold', 'sans-serif'],
      'Fredoka-Regular': ['font-fredoka', 'sans-serif'],
      'Helvetica Neue': ['font-helve', 'sans-serif'],
    },
  },
  plugins: [
    plugin(({addUtilities}) => {
      addUtilities({
        'font-tajwal-medium': {
          fontFamily: 'Tajawal-Medium',
        },
        'font-bbc': {
          fontFamily: 'Tajawal-Medium',
        },
        'font-gesst': {
          fontFamily: 'Tajawal-Medium',
        },
        'font-bein': {
          fontFamily: 'Tajawal-Medium',
        },
        'font-bein-bold': {
          fontFamily: 'Tajawal-Medium',
        },
        'font-noto': {
          fontFamily: 'Tajawal-Medium',
        },
        'font-kufi': {
          fontFamily: 'Tajawal-Medium',
        },
        'font-fredoka': {
          fontFamily: 'Tajawal-Medium',
        },
        'font-helve': {
          fontFamily: 'Tajawal-Medium',
        },
        'font-helve-one': {
          fontFamily: 'Tajawal-Medium',
        },
      });
    }),
  ],
};
