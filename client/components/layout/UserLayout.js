import { useEffect } from "react";
import { useRouter } from "next/router";
import { FallbackLoader } from "components/loader/FallbackLoader";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
const DefaultTopNavigation = dynamic(() =>
  import("./navigation/DefaultTopNavigation")
);

const UserLayout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push({
        pathname: "/join/login-popup",
        query: {
          locale: "en-US",
          from: router.pathname,
        },
      });
    }
  }, []);

  if (!user) {
    return <FallbackLoader />;
  }

  return (
    <>
      <DefaultTopNavigation /> {children}
    </>
  );
};

export default UserLayout;
