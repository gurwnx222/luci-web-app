/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        '9.5': '2.375rem',    // 38px
        '11': '2.75rem',      // 44px
        '22': '5.5rem',       // 88px
        '29': '7.25rem',      // 116px
        '30': '7.5rem',       // 120px
        '40': '10rem',        // 160px
        '45': '11.25rem',     // 180px
        '49': '12.25rem',     // 196px
        '50': '12.5rem',      // 200px
        '70': '17.5rem',      // 280px
        '99': '24.75rem',     // 396px
        '119': '29.75rem',    // 476px
        '147': '36.75rem',    // 588px
        '150': '37.5rem',     // 600px
      },
      rotate: {
        '345': '345deg',
      },
      translate: {
        '15': '3.75rem',      // 60px
      },
      borderRadius: {
        '4xl': '2rem',        // 32px
      },
    },
  },
  plugins: [],
}
