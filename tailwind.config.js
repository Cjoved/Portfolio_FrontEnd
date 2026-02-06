/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      fontSize: {
        'section-title': ['2.25rem', { lineHeight: '2.5rem' }],
        'section-title-lg': ['3rem', { lineHeight: '1.2' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75rem' }],
      },
      colors: {
        accent: { DEFAULT: '#fbbf24', light: '#fcd34d' }, // amber-400 style for section accent (reference-style)
      },
    },
  },
  plugins: [],
}


