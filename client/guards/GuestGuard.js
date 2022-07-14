import { FallbackLoader } from "components/loader/FallbackLoader";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export function GuestGuard({ children }) {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // redirect
      router.push("/");
    }
  }, [router, user]);

  // if auth initialized with a valid user show protected page
  if (!user) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return <FallbackLoader />;
}
