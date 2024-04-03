/** @type {import('tailwindcss').Config} */
// const withMT = require("@material-tailwind/react/utils/withMT");
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      comic: ["Comic neue", "cursive"],
    },
    extend: {
      colors: {
        primeColor: "#ff7849",
        secondaryColor: "#f44336",
        darkBlue: "#191970",
      },
    },
  },
  plugins: [],
});
