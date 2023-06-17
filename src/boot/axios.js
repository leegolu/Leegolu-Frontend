import axios from "axios";
import { boot } from "quasar/wrappers";
import { Notify } from "quasar";

axios.defaults.baseURL = "https://moon.leegolu.com/api/v2/";
axios.defaults.headers.common["Content-Type"] =
  "application/json; charset=utf-8";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
const api = axios.create({
  // baseURL: readEnv('baseURL'),
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Credentials": "true",
  },
});

// Get the token from session storage
// let token = localStorage.getItem("token");
// let auth = JSON.parse(localStorage.getItem("pinia_leegoluauth"));
// console.log(auth.token);
// axios.interceptors.response.use(function (response) {
//   if (response.data && response.data.token) {
//     token = response.data.token;
//   }
//   return response;
// });

// api.interceptors.request.use(function (config) {
// Check valid token
// console.log(config);
//   if (auth.token) {
// console.log(token);
//     config.headers.Authorization = "Bearer " + auth.token;
//   }
//   return config;
// });

export default boot(({ router, store, app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  app.config.globalProperties.$store = store;

  // console.log(store);
  // console.log(store.state._value.leegoluauth.token);
  let auth = store.state._value.leegoluauth;
  // let auth = JSON.parse(localStorage.getItem("pinia_leegoluauth"));

  axios.interceptors.response.use(function (response) {
    console.log(response);
    if (response.data && response.data.token) {
      token = response.data.token;
    }
    return response;
  });
  api.interceptors.response.use(
    (response) => {
      // console.log(response);
      // if (response.data && response.data.token) {
      //   token = response.data.token;
      // }
      return response;
    },
    (e) => {
      // console.log(e);
      let status_code = !e.response || e.response.status;
      // console.log(status_code);
      // let error = reader.error(e, true);
      if (status_code === 401) {
        // store.auth.setToken(null);
        Notify.create({
          message: "You need to log in to view this page",
          color: "red",
        });
        // helpers.notify("You need to log in to view this page", "error");
        return router.replace({ name: "login" });
      } else if (e.message === "Network Error") {
        Notify.create({
          message: e.message + "check your internet connection",
          color: "red",
        });
      } else if (status_code === 500) {
        Notify.create({
          message:
            "This is not your fault, we have been notified and is currently fixing any issues.",
          color: "red",
        });
      } else {
        return Promise.reject(e);
      }
      // console.log(e);
      // return e.response;
      // if (status_code === 422) {
      //   return e.response;
      // }
      // return e.response;

      // if (
      //   status_code === 403 &&
      //   error.status === "error" &&
      //   ["broadcasting/auth", "broadcasting/socket"].indexOf(
      //     e.response.config.url
      //   ) < 0
      // ) {
      //   helpers.notify(
      //     error.message || error,
      //     error.status || "error",
      //     true
      //     // "persistent"
      //   );
      // }
      // return Promise.reject(e);
    }
  );

  api.interceptors.request.use(function (config) {
    if (auth.token) {
      config.headers.Authorization = "Bearer " + auth.token;
    }
    return config;
  });
});

export { axios, api };
