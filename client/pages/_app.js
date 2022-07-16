import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@mui/material/styles";
import CustomTheme from "../customs/CustomMuiTheme";
import { ToastContainer, Slide } from "react-toastify";
import store, { persistor } from "../store";
import ReduxProvider from "../providers/ReduxProvider";
import { PersistGate } from "redux-persist/integration/react";
import dynamic from "next/dynamic";
import DefaultLayout from "components/layout/DefaultLayout";
const PageTransitionLoader = dynamic(() =>
  import("../components/loader/PageTransitionLoader").then(
    (mod) => mod.PageTransitionLoader
  )
);

function MyApp({ Component, pageProps }) {
  const layout =
    Component.layout || ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={CustomTheme}>
          <ToastContainer
            theme="colored"
            transition={Slide}
            pauseOnFocusLoss={false}
            position="top-center"
            autoClose={3000}
          />
          <PageTransitionLoader />
          {layout(<Component {...pageProps} />)}
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

export default MyApp;
