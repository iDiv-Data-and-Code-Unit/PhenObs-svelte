/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  daisyui: {
    themes: [{
      light: {
        "primary": "#d4d4d4",
        "secondary": "#007BFF",
        "accent": "#37CDBE",
        "neutral": "#3D4451",
        "base-100": "#FFFFFF",
        "info": "#3ABFF8",
        "success": "#28A745",
        "warning": "#FF9800",
        "error": "#FF0000",
      },
      dark: {
        ...require("daisyui/src/colors/themes")["[data-theme=night]"],
        "primary": "#334155",
        "secondary": "#007BFF",
        "accent": "#37CDBE",
        "neutral": "#3D4451", 
        "info": "#3ABFF8",
        "success": "#28A745",
        "warning": "#FF9800",
        "error": "#FF0000",
      },
    }, ],
  },
  plugins: [
    require('daisyui')
  ],
}