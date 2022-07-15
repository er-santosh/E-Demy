import "../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import CustomTheme from "../customs/CustomMuiTheme";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store, { persistor } from "../store";
import ReduxProvider from "../providers/ReduxProvider";
import { PersistGate } from "redux-persist/integration/react";
import { AuthGuard } from "../guards/AuthGuard";
import { PageTransitionLoader } from "../components/loader/PageTransitionLoader";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { FallbackLoader } from "../components/loader/FallbackLoader";
import { useRouter } from "next/router";
import { GuestGuard } from "guards/GuestGuard";

const TopNavigation = dynamic(
  () => import("../components/layout/TopNavigation"),
  {
    suspense: true,
  }
);

function MyApp({ Component, pageProps }) {
  const router = useRouter();

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
          {/* <PageTransitionLoader /> */}
          <Suspense fallback={<FallbackLoader />}>
            {router.pathname !== "/_error" && <TopNavigation />}
            {/* if requiresAuth property is present - protect the page */}
            {Component.requiresAuth ? (
              <AuthGuard>
                <Component {...pageProps} />
              </AuthGuard>
            ) : Component.guestMode ? (
              <GuestGuard>
                {/* guest page */}
                <Component {...pageProps} />
              </GuestGuard>
            ) : (
              // public page
              <Component {...pageProps} />
            )}
          </Suspense>
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

export default MyApp;
