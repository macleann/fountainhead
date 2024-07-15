/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'amethysta': ['Amethysta'],
        'tiny5': ['Tiny5'],
        'wittgenstein': ['Wittgenstein'],
      },
      animation: {
        blink: 'blink 0.7s steps(1) infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
          scrollbarColor: 'white black',
          '&::-webkit-scrollbar': {
            width: '16px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'black',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'white',
            border: '4px solid black',
          },
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}

