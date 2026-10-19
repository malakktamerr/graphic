/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: ['Lexend', 'sans-serif'],
              climate: ['"Climate Crisis"', 'sans-serif'],

      },
      animation: {
        marquee: "marquee 20s linear infinite",
        'marquee-reverse': 'marquee-reverse 20s linear infinite reverse',
        'border-spin': 'border-spin 3s linear infinite',
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        'marquee-reverse': {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        'border-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    },
    function({ addUtilities }) {
      addUtilities({
        '.rtl-mirror': {
          '[dir="rtl"] &': {
            transform: 'scaleX(-1)',
          },
        },
        '.rtl-text-right': {
          '[dir="rtl"] &': {
            'text-align': 'right',
          },
        },
        '.rtl-text-left': {
          '[dir="rtl"] &': {
            'text-align': 'left',
          },
        },
      });
    },
  ],
}
