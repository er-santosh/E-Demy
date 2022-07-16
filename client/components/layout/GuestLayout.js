import { FallbackLoader } from "components/loader/FallbackLoader";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { reset } from "store/AuthReducer";
const DefaultTopNavigation = dynamic(() =>
  import("./navigation/DefaultTopNavigation")
);

export function GuestLayout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      if (message !== "") {
        toast.success(message);
      }
      if (router.query && router.query.from) {
        router.push(router.query.from);
      } else {
        router.push("/");
      }
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, router, dispatch]);

  // if no auth initialized
  if (!user) {
    return (
      <>
        <DefaultTopNavigation />
        {children}
      </>
    );
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return <FallbackLoader />;
}
