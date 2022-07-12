import TopNavigation from "../components/layout/TopNavigation";
import "../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import CustomTheme from "../customs/CustomMuiTheme";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={CustomTheme}>
      <ToastContainer theme="colored" transition={Slide} />
      <TopNavigation />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
