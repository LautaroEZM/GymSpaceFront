import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    menuButton: {
      main: "#414141",
      light: "#414141",
      dark: "#414141",
      contrastText: "#FFF",
    },
    confirmButton: {
      main: "#414141",
      light: "#414141",
      dark: "#414141",
      contrastText: "#FFF",
    },
    regularButton: {
      main: "#414141",
      light: "#ff9721",
      dark: "#ff9721",
      contrastText: "#FFF",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#131313",
    },
  },
});

export default theme;
