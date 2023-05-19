import axios from "axios";
import { boot } from "quasar/wrappers";

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

  api.interceptors.request.use(function (config) {
    if (auth.token) {
      config.headers.Authorization = "Bearer " + auth.token;
    }
    return config;
  });
});

export { axios, api };
