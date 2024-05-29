/** @type {import('tailwindcss').Config} */
import tailgridsPlugin from '@tailgrids/plugin'

export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [tailgridsPlugin],
  }