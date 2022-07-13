import { createTheme } from "@mui/material/styles";

const CustomMuiTheme = createTheme({
  palette: {
    primary: {
      main: "#9c27b0",
      light: "#ba68c8",
      dark: "#7b1fa2",
      contrastText: "#fff",
    },
    secondary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#fff",
    },
  },
});

export default CustomMuiTheme;
