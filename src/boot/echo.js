// import { dexieStorage, readEnv } from "src/plugins/builder";

import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { api } from "./axios";
import { boot } from "quasar/wrappers";
import store from "stores/loader";
import { watch } from "vue";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {
  window.Pusher = Pusher;
  window.echo = {};
  const user = store.userDetails;

  const unwatch = watch(
    (e) => user?.id,
    async (id) => {
      if (id) {
        let auth = localStorage.getItem("pinia_leegoluauth");
        // let auth = await dexieStorage("pinia").getItem("auth");
        console.log(auth);
        if (!window.echo.private) {
          window.echo = new Echo({
            broadcaster: "pusher",
            key: "1df8fa73c55387320515",
            cluster: "eu",
            forceTLS: false,
            useTLS: true,
            disableStats: false,
            authorizer: (channel, options) => {
              console.log(channel);
              return {
                authorize: (socketId, callback) => {
                  api
                    .post(
                      "broadcasting/auth",
                      { socket_id: socketId, channel_name: channel.name },
                      { headers: { Authorization: `Bearer ${auth.token}` } }
                    )
                    .then((response) => {
                      api.defaults.headers.common["X-Socket-ID"] = socketId;
                      callback(null, response.data);
                    })
                    .catch((error) => {
                      callback(error);
                    });
                },
              };
            },
          });

          let socketId = window.echo.socketId();
          window.echo.connector.pusher.connection.bind("connected", () => {
            socketId = window.echo.socketId();
            api.defaults.headers.common["X-Socket-ID"] = socketId;
          });

          // window.echo.channel = window.echo.private(
          //   `App.Models.v1.User.${user.data.id}`
          // );
        }
        unwatch();
      }
    },
    {
      immediate: true,
    }
  );
});
