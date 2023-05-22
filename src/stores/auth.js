import { defineStore } from "pinia";
import axios from "axios";
export const useAuthStore = defineStore("leegoluauth", {
  state: () => ({
    token: "",
    userDetails: {},
    vendorDetails: {},
    vendor: {},
    modal: true,
    previousRoute: "",
    // token: localStorage.getItem("token") || "",
  }),
  getters: {
    registrationForm: (state) => state.userDetails,
    authToken: (state) => state.token,
  },
  actions: {
    setUserDetails(data) {
      const token = data.token;
      const user = data;
      localStorage.setItem("token", token);
      localStorage.setItem("userdet", JSON.stringify(user));
      this.userDetails = data.user;
      this.vendor = data.vendor;
      this.token = token;
    },

    async logOut(userDetails) {
      return axios
        .post("/logout")
        .then((e) => {
          this.token = null;
          this.userDetails = null;
          userDetails = null;
        })
        .catch((e) => {
          console.log({ e });
          this.token = null;
          this.userDetails = null;
          userDetails = null;
          localStorage.setItem("token", "");
          localStorage.setItem("userdet", "");
        });
    },
  },
});
