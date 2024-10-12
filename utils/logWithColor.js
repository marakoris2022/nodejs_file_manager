import { COLORS_CONSOLE } from "../constants/colors.js";

export const logWithColor = {
  black: function (text) {
    console.log(COLORS_CONSOLE.FgBlack + "%s\x1b[0m", text);
  },
  blue: function (text) {
    console.log(COLORS_CONSOLE.FgBlue + "%s\x1b[0m", text);
  },
  cyan: function (text) {
    console.log(COLORS_CONSOLE.FgCyan + "%s\x1b[0m", text);
  },
  gray: function (text) {
    console.log(COLORS_CONSOLE.FgGray + "%s\x1b[0m", text);
  },
  green: function (text) {
    console.log(COLORS_CONSOLE.FgGreen + "%s\x1b[0m", text);
  },
  magenta: function (text) {
    console.log(COLORS_CONSOLE.FgMagenta + "%s\x1b[0m", text);
  },
  red: function (text) {
    console.log(COLORS_CONSOLE.FgRed + "%s\x1b[0m", text);
  },
  white: function (text) {
    console.log(COLORS_CONSOLE.FgWhite + "%s\x1b[0m", text);
  },
  yellow: function (text) {
    console.log(COLORS_CONSOLE.FgYellow + "%s\x1b[0m", text);
  },
};
