import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        blue: "#4285F4",
        green: "#00FFB0",
        red: "#E92126",
        grey: "#23252D",
        iconBlack: "#191A23",
        footer: "#474859",
        black: "#191A23",
        bg: "#181818",
        line: "#D4D4D4",
        text: "#D4D4D4",
        greenF: "#00FFB0",
        greenT: "#CCFF00",
        redF: "#E92126",
        redT: "#FBBC05",
        blueF: "#4285F4",
        blueT: "#9747FF",
        yellowF: "#CF9500",
        yellowT: "#FFDC81",
        icon: "#949494",
        dataR: "#F11010",
        dataG: "#06A10D",
        dataBR: "#F8D4D4",
        dataBG: "#C0F3C0",
        dataBY: "#D6D663",
        dataBlack: "#1D1B1B",
      },
      backgroundImage: {
        rainbow:
          "linear-gradient(90deg, #00FFB0, #CCFF00, #FBBC05, #E92126, #9747FF, #4285F4)",
        partners:
          "linear-gradient(180deg, rgba(32, 31, 61, 0.50) 0%, rgba(32, 31, 61, 0.00) 77.83%)",
      },
      boxShadow: {
        blueLi: "0px 0px 10px rgba(33, 122, 255, 0.25)",
        yellowLi: "0px 0px 30px 1px rgba(207, 149, 0, 0.5)",
        greenLi: "0px 0px 10px 0px rgba(0, 255, 176, 0.25)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
} satisfies Config;

export default config;
