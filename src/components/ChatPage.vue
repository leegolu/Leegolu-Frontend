<template>
  <div>
    <q-card class="card">
      <div class="dialog_content">
        <div
          v-if="productData || this.$store.leegoluauth.vendorDetails.name"
          class="dialog_top advert"
        >
          <div class="left_dialog">
            <img src="/images/usersvg.svg" alt="" />
            <!-- <img src="/images/listing1.png" alt="" /> -->
          </div>

          <div class="det">
            <!-- {{ productData }} -->
            <div class="title name_top">
              {{
                productData.vendor_name
                  ? productData.vendor_name
                  : this.$store.leegoluauth.vendorDetails.name
              }}
              <!-- {{ productData ? productData.vendor.name : "" }} -->
            </div>
            <div class="name_down act text-weight-bold">Active</div>
          </div>
        </div>
        <div v-if="productData" class="dialog_top advert">
          <div class="left_dialog">
            <img :src="productData.uploads[0].url" alt="" />
            <!-- <img src="/images/listing2.png" alt="" /> -->
            <!-- <img :src="productData." alt="" /> -->
          </div>

          <div class="det">
            <div class="title name_top">{{ productData?.name }}</div>
            <div class="name_down text-black">
              ₦{{ productData?.price.toLocaleString() }}
            </div>
          </div>
        </div>
        <div class="chatArea">
          <p class="text-center today">Today</p>
          <!-- {{ conversationMessages }} -->
          <div
            v-if="conversationMessages.length"
            style="width: 100%; max-width: 400px"
          >
            <div ref="myDiv" id="myDiv" class="message_wrap">
              <div v-for="(chat, index) in conversationMessages" :key="index">
                <div v-if="chat.bool === false" class="user chat">
                  <div class="div">
                    <span>
                      <img src="/images/usersvg.svg" alt="" />
                    </span>
                    <span>
                      {{ chat.messages }}
                    </span>
                  </div>
                  <span class="time">
                    {{
                      new Date(chat.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    }}
                  </span>
                </div>

                <div v-else class="vendor chat">
                  <div class="div">
                    <span>{{ chat.messages }} </span>
                  </div>
                  <span class="time">
                    {{
                      new Date(chat.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="start">
            <img src="/images/convo.svg" alt="" />
            <div class="text">Start a convo</div>
          </div>

          <div class="input_area">
            <div class="inp_wra">
              <q-btn
                rounded
                class="emojibtn"
                style="min-height: auto; padding: auto"
                flat
                id="emoji-button"
                data-action="insert_emoticon"
                @click="listeningEmoji = !listeningEmoji"
              >
                <i class="fa-solid fa-face-smile"></i>
              </q-btn>
              <div class="emojs">
                <EmojiPicker
                  :native="true"
                  v-click-outside="closeEmojiDrawer"
                  @select="onSelectEmoji"
                  v-if="listeningEmoji"
                />
              </div>
              <input
                v-model="data.message"
                type="text"
                ref="message_box"
                placeholder="Type something...."
              />

              <div class="row no-wrap items-center">
                <q-btn
                  style="min-height: auto; padding: auto"
                  class="text-secondary sendbtn"
                  @click="sendMessage"
                  flat
                >
                  <!-- <i class="fa-sharp fa-solid fa-paper-plane-top"></i> -->
                  <img src="/images/mess.svg" alt="" />
                </q-btn>
                <!-- <i class="fa-solid fa-microphone"></i> -->
              </div>
            </div>
          </div>
        </div>

        <q-btn @click="closeModal" class="close">
          <i class="fa-solid fa-xmark"></i>
        </q-btn>
      </div>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import EmojiPicker from "vue3-emoji-picker";
import ClickOutside from "@mahdikhashan/vue3-click-outside";
import "vue3-emoji-picker/css";
// import { echo } from "src/boot/echo";
export default {
  data() {
    return {
      whispering: false,
      listening: false,
      listeningEmoji: false,
      emojiDialogToggle: ref(false),
      message: "",
      data: {
        message: "",
      },
    };
  },
  props: ["conversationDetails", "conversationMessages", "productData"],
  components: {
    EmojiPicker,
  },
  directives: {
    ClickOutside,
  },
  created() {
    // this.$watch(
    //   (e) => echo.listen,
    //   (listen) => {
    //     if (listen) {
    //       !this.whispering && this.listenForIsTyping();
    //       !this.listening && this.listenForNewMessage();
    //     }
    //   },
    //   { immediate: true, deep: true }
    // );
    // console.log(this.$router.currentRoute.value.fullPath);
  },

  // created() {
  //   this.$watch(
  //     (e) => echo.listen,
  //     (listen) => {
  //       if (listen) {
  //         this.listenForNewMessage();
  //       }
  //     },
  //     { immediate: true, deep: true }
  //   );
  // },

  mounted() {
    if (this.conversationMessages.length) {
      this.scrollToBottom();
      const myDiv = this.$refs.myDiv;
      myDiv.scrollTop = myDiv.scrollHeight;
      let lastChildDiv = myDiv.lastElementChild;
      console.log(lastChildDiv);
      lastChildDiv.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    // console.log(this.conversationDetails.id);

    const channel = window.Echo.join(`message.${this.conversationDetails}`);
    // console.log(channel);
    // console.log(channel.listen);
    channel.here((users) => {
      console.log("Users in the channel:", users);
    });

    window.Echo.connector.pusher.connection.bind("state_change", (states) => {
      console.log("Pusher connection state:", states.current);
    });

    channel.listen("message", (event) => {
      console.log(event);
      this.conversationMessages.push(event.message);
    });
  },

  methods: {
    // listenForNewMessage() {
    //   const channel = window.Echo.private(
    //     `messages.${this.conversationDetails.id}`
    //   );
    //   console.log(channel);

    //   channel.listen("message", (event) => {
    //     console.log(event);
    //     // const updatedConversation = event.conversation
    //     // const index = this.conversations.findIndex(c => c.id === updatedConversation.id)
    //     // if (index > -1) {
    //     //   this.conversations.splice(index, 1, updatedConversation)
    //     // }
    //   });
    // },
    scrollToBottom() {
      this.$nextTick(() => {
        // console.log("i scrolled");
        const myDiv = this.$refs.myDiv;
        myDiv.scrollTop = myDiv.scrollHeight;
      });
    },
    toggleEmoji() {
      this.emojiDialogToggle = !this.emojiDialogToggle;
      // console.log(this.emojiDialogToggle);
    },
    closeModal() {
      this.$emit("closeModal");
    },

    closeEmojiDrawer(e) {
      // console.log(e.target);
      this.listeningEmoji = true;
      // if (!this.listeningEmoji) return;
      // Check if the click is not on the emoji button
      // if (e.target.id !== "emoji-button") {
      //   this.listeningEmoji = false;
      // }

      // if (this.listeningEmoji === true) {
      //   this.listeningEmoji = false;
      // } else {
      //   this.listeningEmoji = true;
      // }

      // console.log(this.listeningEmoji);
    },
    onSelectEmoji: function (insert) {
      insert = insert.i;
      // var tArea = this.$refs.message_box.nativeEl;
      // var tArea = this.$refs.message_box.nativeEl;
      filter: if (0 == insert) {
        return;
      }
      if (0 == cursorPos) {
        return;
      }
      // get cursor's position:
      // console.log(insert);
      // var startPos = tArea.selectionStart,
      //   endPos = tArea.selectionEnd,
      //   cursorPos = startPos,
      //   tmpStr = tArea.value;

      // // insert:
      // this.message =
      //   tmpStr.substring(0, startPos) +
      //   insert +
      //   tmpStr.substring(endPos, tmpStr.length);

      // // move cursor:
      // this.$nextTick(() => {
      //   cursorPos += insert.length;
      //   tArea.selectionStart = tArea.selectionEnd = cursorPos;
      //   this.$refs.message_box.focus();
      // });
    },

    // getMessages() {
    //   // console.log(this.conversationDetails);
    //   // this.loadingChatBtn = true;
    //   this.$api
    //     .get(`${this.conversationDetails.id}/chat/send`, this.data)
    //     .then((response) => {
    //       this.loadingChatBtn = false;
    //       // console.log(response);
    //       this.$q.notify({
    //         message: "Message sent",
    //       });

    //       this.data.message = "";
    //     })
    //     .catch(({ response }) => {
    //       console.log(response);
    //       this.$q.notify({
    //         message: response.data.message,
    //       });
    //       this.loadingChatBtn = false;
    //       this.errors = error.errors || {};
    //     });
    // },
    sendMessage() {
      // console.log(this.conversationDetails);
      // this.loadingChatBtn = true;
      this.$api
        .post(`${this.conversationDetails}/chat/send`, this.data)
        .then((response) => {
          this.loadingChatBtn = false;
          // console.log(response);
          this.$q.notify({
            message: "Message sent",
          });
          this.data.message = "";
          this.$emit("convo", this.conversationDetails);
          // this.$emit("refresh-message", this.conversationDetails);
          if (this.conversationMessages.length) {
            this.scrollToBottom();
          }
        })
        .catch(({ response }) => {
          console.log(response);
          this.$q.notify({
            message: response.data.message,
          });
          this.loadingChatBtn = false;
          this.errors = error.errors || {};
        });
    },
  },
};
</script>

<style lang="scss" scoped>
// dialog

.card {
  min-width: 363px;
  background: #ffffff;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  min-width: 366px;
  // height: 522px;
}

.dialog_content .dialog_top:first-of-type {
  margin-top: 0;
}

.dialog_content {
  background: #ffffff;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  position: relative;
}
.dialog_content .dialog_top {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin: 0.5rem 0;
}

.message_wrap {
  height: 200px;
  overflow-y: scroll;
}

.message_wrap::-webkit-scrollbar {
  display: none;
}

.dialog_content .dialog_top.advert:nth-child(1) {
  border-bottom: 1px solid #c3c3c3b2;
  padding: 0.5rem 1rem 0.5rem;
}
.dialog_content .dialog_top.advert:nth-child(2) {
  border-bottom: 1px solid #c3c3c3b2;
  padding: 0rem 1rem 0.5rem;
  margin: 0.5rem 0 0;
}

.div {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.sendbtn {
  padding: 0;
}

.sendbtn img {
  width: 16.33px;
  height: 18.67px;
}

.dialog_content .dialog_top img {
  border: 3px solid #1f7bb5;
  border-radius: 26.5px;
  width: 53px;
  height: 53px;
}

.chatArea {
  background: rgba(31, 123, 181, 0.28);
  // border-radius: 0px 0px 9px 9px;
  padding: 1rem 0.5rem;
  // padding: 1.4rem 0.5rem;
}
p.today {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;

  color: #1f7bb5;
}

.dialog_content .boost .q-btn {
  width: 100%;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #ffffff;
  background: #1f7bb5;
  border-radius: 5px;
  text-transform: capitalize;
}

.dialog_content .boost {
  padding: 0.5rem 0;
}

.dialog_content .close {
  position: absolute;
  top: 1%;
  right: 2%;
  color: #979797;
  font-size: 1rem;
}
.dialog_content .close i {
  color: #979797;
  font-size: 1.3rem;
}
.dialog_content .close::before {
  box-shadow: none;
}

p.advert {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  color: #000000;
}

.input_area {
  position: relative;
}

.input_area .inp_wra {
  background: #f6f6f6;
  border: 1px solid #e8e8e8;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 100px;
  padding: 0.3rem 0.8rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  position: relative;
  height: 45px;
  margin: 2rem 0rem 0;
  justify-content: space-between;
}

.inp_wra .emojibtn {
  padding: 0;
}

.emojs {
  position: absolute;
  bottom: 0;
  z-index: 9;
}
.input_area .inp_wra input {
  border: none;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  background: transparent;
  width: 100%;
  color: #000000;
}

.input_area .inp_wra input::placeholder {
  color: #9a9a9a;
}
.input_area .inp_wra i.fa-face-smile {
  color: rgba(31, 123, 181, 0.73);
  font-size: 1.5rem;
}
.input_area .inp_wra i.fa-microphone {
  background: #1f7bb5;
  color: #fff;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.chat {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  margin: 1rem 0;
  // margin: 1.3rem 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 0.3rem;
  // width: 80%;
  width: fit-content;
  text-align: left;
}

.start {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.4rem;
}
.start img {
  width: 72px;
  height: 72px;
}
.start .text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;

  text-align: center;

  color: #357196;
}

.chat.vendor {
  color: #fff;
  background: #1f7bb5;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 1rem;
  margin-left: auto;
}
.chat.user {
  color: #1f7bb5;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: 4px;
  margin-right: auto;
}

.chat.user img {
  width: 13px;
  height: 13px;
  box-shadow: inset 0px -4px 4px rgba(0, 0, 0, 0.47);
  border-radius: 26.5px;
}

.chat span.time {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 7px;
  line-height: 8px;
}

.chat.user span.time {
  color: rgba(196, 196, 196, 0.7);
}

.chat.vendor span.time {
  color: rgba(255, 255, 255, 0.7);
}
</style>
