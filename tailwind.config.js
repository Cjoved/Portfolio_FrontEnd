/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      fontSize: {
        'section-title': ['1.5rem', { lineHeight: '2rem' }],      // mobile: 24px
        'section-title-md': ['2rem', { lineHeight: '2.25rem' }], // sm
        'section-title-lg': ['2.5rem', { lineHeight: '2.75rem' }], // md
        'section-title-xl': ['3rem', { lineHeight: '1.2' }],     // lg+
        'body-lg': ['1.125rem', { lineHeight: '1.75rem' }],
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom, 0px)',
        'safe-top': 'env(safe-area-inset-top, 0px)',
      },
      colors: {
        accent: { DEFAULT: '#fbbf24', light: '#fcd34d' }, // amber-400 style for section accent (reference-style)
      },
    },
  },
  plugins: [],
}


