import { defineStore } from "pinia";
import axios from "axios";
import { Notify } from "quasar";
export const useAuthStore = defineStore("leegoluauth", {
  state: () => ({
    token: "",
    userDetails: {},
    vendorDetails: {},
    // token: localStorage.getItem("token") || "",
  }),
  getters: {
    registrationForm: (state) => state.userDetails,
  },
  actions: {
    setUserDDetails(data) {
      console.log(data);
      console.log(data.token);
      console.log(data.user);
      const token = data.token;
      const user = data;
      localStorage.setItem("token", token);
      localStorage.setItem("userdet", JSON.stringify(user));
      this.userDetails = data;
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
