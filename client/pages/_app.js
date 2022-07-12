import TopNavigation from "../components/layout/TopNavigation";
import "../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import CustomTheme from "../customs/CustomMuiTheme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={CustomTheme}>
      <TopNavigation />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
