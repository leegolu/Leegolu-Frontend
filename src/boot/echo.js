import axios from "axios";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

export default ({ app, store }) => {
  console.log(store);
  let auth = store.state._value.leegoluauth;
  window.Pusher = Pusher;
  window.Echo = new Echo({
    broadcaster: "pusher",
    key: "1df8fa73c55387320515",
    cluster: "eu",
    encrypted: true,
    authorizer: (channel, options) => {
      console.log(channel, options);
      return {
        authorize: (socketId, callback) => {
          console.log(socketId);
          axios
            .post(
              "http://moon.leegolu.com/api/broadcasting/auth",
              { socket_id: socketId, channel_name: channel.name },
              {
                headers: {
                  Authorization: `Bearer ${auth.token}`,
                  "X-Requested-With": "XMLHttpRequest",
                  Accept: "application/json",
                  "Content-Type": "application/json; charset=utf-8",
                  "Access-Control-Allow-Credentials": "true",
                },
              }
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
};
