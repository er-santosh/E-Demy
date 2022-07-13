import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export function AuthGuard({ children }) {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // redirect
      router.push({
        pathname: "/join/login-popup",
        query: {
          locale: "en-US",
          from: router.pathname,
        },
      });
    }
  }, [router, user]);

  // if auth initialized with a valid user show protected page
  if (user) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}
