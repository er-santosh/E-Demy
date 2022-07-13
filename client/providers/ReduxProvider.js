import store from "../store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { logout } from "../store/AuthReducer";
import { useRouter } from "next/router";

const ReduxProvider = ({ children }) => {
  const router = useRouter();
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      let res = error.response;

      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        store.dispatch(logout());
        router.push({
          pathname: "/join/login-popup",
          query: {
            locale: "en-US",
            from: router.pathname,
          },
        });
      }
      return Promise.reject(error);
    }
  );
  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get("/api/csrf-token");
      axios.defaults.headers["X-CSRF-Token"] = data.getCsrfToken;
    };
    getCsrfToken();
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
