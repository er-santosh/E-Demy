import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const FallbackLoader = dynamic(() =>
  import("./FallbackLoader").then((mod) => mod.FallbackLoader)
);
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
    return <FallbackLoader />;
  } else return null;
};
