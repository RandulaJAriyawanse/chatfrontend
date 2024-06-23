/** @type {import('tailwindcss').Config} */

import daisyuiPlugin from "daisyui";
import getDaisyUIConfig from "./src/daisyui/config/daisyui.config";

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["DM Sans", "sans-serif"],
      },
    },
  },
  daisyui: getDaisyUIConfig(),
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography'), daisyuiPlugin],
}