import { useState, useEffect } from "react";
import { Container, Box, Backdrop } from "mui";
import { ScaleLoader } from "react-spinners";
import { useRouter } from "next/router";
export const PageTransitionLoader = () => {
  const router = useRouter();
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      setIsLoaderVisible(true);
    };

    const handleRouteComplete = (url, { shallow }) => {
      setIsLoaderVisible(false);
    };

    // here we subscribe to router change start and complete events
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete);

    // unsubscribing to router events when component unmounts to prevent memeory leaks
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteComplete);
    };
  }, [router]);

  if (isLoaderVisible) {
    return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
          >
            <ScaleLoader color="purple" loading />
          </Backdrop>
        </Box>
      </Container>
    );
  } else return null;
};
