import axios from "axios";
import { FallbackLoader } from "components/loader/FallbackLoader";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "store/AuthReducer";

const StripeCallbackPage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      axios
        .get("/api/get-account-status")
        .then((res) => {
          //store updated user
          dispatch(updateUser(res.data));
          router.push("/instructor/courses");
        })
        .catch((err) => {
          if (err.response.status === 403) {
            toast.error("You need to setup payment first.");
            router.push("/stripe/payment-setup");
          } else {
            toast.error("Something went wrong");
            router.push("/");
          }
        });
    }
  });

  return <FallbackLoader />;
};

StripeCallbackPage.requiresAuth = true;

export default StripeCallbackPage;
