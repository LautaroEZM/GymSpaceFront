import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const primary = {
  main: "red",
  light: "green",
  dark: "blue",
  contrastText: "#fff",
};
// A custom theme for this app
const theme = createTheme({
  palette: {
    primary,
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#111111",
    },
  },
});

export default theme;
