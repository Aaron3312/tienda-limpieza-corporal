/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Colores principales de la marca - Azul claro
        primary: {
          50: '#f0f8ff',   // Muy claro
          100: '#e0f1fe',  // Claro
          200: '#bae3fd',
          300: '#7ccdf8',
          400: '#38b6ea',
          500: '#0ea0d9',  // Color base
          600: '#0288be',  // Más oscuro
          700: '#026d9a',
          800: '#025a7f',
          900: '#0b4663',  // Muy oscuro
          950: '#072c3d',  // Extra oscuro
        },
        // Color secundario - puedes usar otro color complementario
        secondary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Color base
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        // Colores neutrales para texto, fondos, etc.
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        }
      },
    },
  },
  plugins: [],
}