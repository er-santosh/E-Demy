import axios from "axios";
import { logout } from "../../store/auth-reducer";

export const axiosMiddleware = (store) => (next) => (action) => {
  setInterceptors(store);
  return next(action);
};

export const setInterceptors = (store) => {
  if (!store) {
    return;
  }

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
        window.location.href = `/join/login-popup?locale=en-US&from=${window.location.pathname}`;
      }
      return Promise.reject(error);
    }
  );
};
