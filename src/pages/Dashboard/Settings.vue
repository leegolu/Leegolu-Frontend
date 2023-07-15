<template>
  <q-layout class="page_">
    <div class="container q-pb-xl">
      <div class="settings_top q-my-xl">
        <div class="left_settings">
          <div class="img_side">
            <img
              :src="
                this.$store.leegoluauth.userDetails.avatar === null
                  ? '/images/listing1.png'
                  : this.$store.leegoluauth.userDetails.avatar.url
              "
              alt=""
            />
            <q-btn @click="dialogAvatar = true" flat>
              <img class="small" src="/images/settingscamera.svg" alt="" />
            </q-btn>
          </div>
          <div class="">
            <div class="set_name">
              {{
                this.$store.leegoluauth.userDetails
                  ? this.$store.leegoluauth.userDetails.name
                  : "User"
              }},
            </div>

            <div class="joined">
              Joined
              {{
                new Date(
                  this.$store.leegoluauth.userDetails.created_at
                ).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              }}
            </div>
            <!-- <div class="joined">Joined 12 June, 2023</div> -->
          </div>
        </div>

        <div class="right_settings">
          <q-btn @click="scroll"> Manage Profile </q-btn>
        </div>
      </div>
      <hr />
      <div class="plans_sub">
        <div class="topp row items-center justify-between">
          <div style="gap: 0.4rem" class="topp_left row items-center no-wrap">
            <img src="/images/freeplan.svg" alt="" />
            <span>Plans & Subscriptions</span>
          </div>

          <div class="arrow row">
            <img src="/images/down.svg" alt="" />
          </div>
        </div>

        <div class="grid_">
          <div class="grid__wrap">
            <div class="grid_item grid_left">
              <div class="grid_div">
                <img src="/images/rockets.svg" alt="" />

                <div class="main_textSet">Leegolu Regular</div>

                <div class="para">
                  Get to interact with thousands of people trading on the
                  Leegolu market place.
                </div>

                <div v-if="val" class="active">
                  <div class="icon">
                    <img src="/images/lighting.svg" alt="" /> Active
                  </div>
                </div>
                <div class="check">
                  <q-checkbox disable v-model="val" />
                </div>
              </div>
            </div>
            <div class="grid_item grid_right">
              <div class="grid_div2">
                <img src="/images/shop.svg" alt="" />

                <div class="main_textSet">Leegolu Business</div>

                <div class="para">
                  Leegolu Business provides you with the right tools to scale
                  your business & make more sales online.
                </div>

                <div v-if="val2 === false" class="">
                  <q-btn :to="{ name: 'Plans' }" class="upgrade"
                    >Upgrade from ₦1,000</q-btn
                  >
                </div>
                <!-- {{ val2 }} -->
                <div v-else class="active">
                  <div class="icon">
                    <img src="/images/lighting.svg" alt="" /> Active
                  </div>
                </div>

                <div class="check">
                  <q-checkbox disable v-model="val2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="plans_sub">
        <div class="topp row items-center justify-between">
          <div style="gap: 0.4rem" class="topp_left row items-center no-wrap">
            <img src="/images/userr.svg" alt="" />
            <span>Account Settings</span>
          </div>

          <div class="arrow row">
            <img src="/images/down.svg" alt="" />
          </div>
        </div>

        <div id="style" class="style">
          <q-table
            :rows="rows"
            :hide-header="mode === 'grid'"
            :columns="columns"
            row-key="id"
            :grid="mode == 'grid'"
            class="sub_table"
            :filter="filter"
            :loading="loading"
            @request="onRequest"
          >
            <template v-slot:body-cell-account="props">
              <q-td :props="props">
                <!-- {{ props.row }} -->
                <div class="name_row">
                  <div class="name">
                    <div class="name_top">{{ props.row.name }}</div>
                  </div>
                </div>
              </q-td>
            </template>
            <template v-slot:body-cell-password="props">
              <q-td :props="props">
                <div v-if="props.row.name === 'Name'" class="added">
                  {{
                    this.$store.leegoluauth.userDetails
                      ? this.$store.leegoluauth.userDetails.name
                      : "User"
                  }}
                </div>
                <div v-if="props.row.name === 'Phone Number'" class="added">
                  {{
                    this.$store.leegoluauth.userDetails
                      ? this.$store.leegoluauth.userDetails.phone
                      : "User"
                  }}
                </div>
                <div v-if="props.row.name === 'Password'" class="added">
                  **********
                </div>
                <div v-if="props.row.name === 'Email'" class="added">
                  {{
                    this.$store.leegoluauth.userDetails
                      ? this.$store.leegoluauth.userDetails.email
                      : "User"
                  }},
                </div>
              </q-td>
            </template>
            <template v-slot:body-cell-value="props">
              <q-td class="value" :props="props">
                <div class="added">
                  <q-btn @click="edit(props.row)" flat>
                    <img src="/images/editicon.svg" alt="" />
                  </q-btn>
                </div>
              </q-td>
            </template>

            <template v-slot:no-data="{ message }">
              <div class="full-width row flex-center text-negative q-gutter-sm">
                <span> {{ message }} </span>
              </div>
            </template>
          </q-table>
        </div>
      </div>
      <hr />
      <div class="plans_sub">
        <div class="topp row items-center justify-between">
          <div style="gap: 0.4rem" class="topp_left row items-center no-wrap">
            <img src="/images/userr.svg" alt="" />
            <span>Privacy Settings</span>
          </div>

          <div class="arrow row">
            <img src="/images/down.svg" alt="" />
          </div>
        </div>

        <div class="style">
          <q-table
            :rows="rowsPrivacy"
            :hide-header="mode === 'grid'"
            :columns="columnsPrivacy"
            row-key="id"
            :grid="mode == 'grid'"
            class="sub_table"
            :filter="filter"
            :loading="loading"
            @request="onRequestPrivacy"
          >
            <template v-slot:body-cell-privacy="props">
              <q-td :props="props">
                <!-- {{ props.row }} -->
                <div class="name_row">
                  <div class="name">
                    <div class="name_top">{{ props.row.name }}</div>
                  </div>
                </div>
              </q-td>
            </template>
            <template v-slot:body-cell-password="props">
              <q-td :props="props">
                <!-- <div class="added">
                  {{ props.row.number_account }}
                </div> -->
                <div v-if="props.row.name === 'Allow Chat'" class="added">
                  {{ privacyData.allow_chat_view ? "Yes" : "No" }}
                </div>
                <div v-if="props.row.name === 'Allow phone view'" class="added">
                  {{ privacyData.allow_phone_view ? "Yes" : "No" }}
                </div>
                <div v-if="props.row.name === 'Allow email view'" class="added">
                  {{ privacyData.allow_email_view ? "Yes" : "No" }}
                </div>
              </q-td>
            </template>
            <template v-slot:body-cell-value="props">
              <q-td class="value" :props="props">
                <div v-if="props.row.name === 'Allow Chat'" class="added">
                  <q-toggle v-model="privacyData.allow_chat_view" />
                  <q-spinner
                    v-if="load"
                    color="primary"
                    size="2em"
                    :thickness="2"
                  />
                </div>
                <div v-if="props.row.name === 'Allow phone view'" class="added">
                  <q-toggle v-model="privacyData.allow_phone_view" />
                  <q-spinner
                    v-if="load2"
                    color="primary"
                    size="2em"
                    :thickness="2"
                  />
                </div>
                <div v-if="props.row.name === 'Allow email view'" class="added">
                  <q-toggle v-model="privacyData.allow_email_view" />
                  <q-spinner
                    v-if="load1"
                    color="primary"
                    size="2em"
                    :thickness="2"
                  />
                </div>
              </q-td>
            </template>

            <template v-slot:no-data="{ message }">
              <div class="full-width row flex-center text-negative q-gutter-sm">
                <span> {{ message }} </span>
              </div>
            </template>
          </q-table>
        </div>
      </div>
    </div>
    <!-- <hr />
      <div class="plans_sub">
        <div class="topp row items-center justify-between">
          <div style="gap: 0.4rem" class="topp_left row items-center no-wrap">
            <img src="/images/userr.svg" alt="" />
            <span>Video Settings</span>
          </div>

          <div class="arrow row">
            <img src="/images/down.svg" alt="" />
          </div>
        </div>

        <div class="style">
          <q-card class="q-px-sm q-pb-lg sub_table">
            <div class="q-mt-sm q-gutter-sm">
              <q-radio v-model="upload" val="For Product" label="For Product" />
              <q-radio v-model="upload" val="For Vendor" label="For Vendor" />
            </div>

            <div class="">
              <q-file
                class="q-mt-md"
                label="Upload video file"
                @rejected="onRejected"
                outlined
                accept=".mp4"
                @update:model-value="setVideoFile"
                v-model="videoFile"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
            </div>

            <div class="q-my-lg">
              <video v-if="videoUrl" class="full-width" controls>
                <source :src="videoUrl" type="video/mp4" />
              </video>
            </div>
          </q-card>
        </div>
      </div>
    </div> -->
    <q-dialog v-model="dialogAvatar" persistent>
      <q-card class="card avatar">
        <div class="dialog_content">
          <p class="advert text-center">Add Avatar</p>
          <div class="dialog_top">
            <div class="previewMain">
              <div class="form">
                <q-file
                  type="file"
                  v-model="avatar.avatar"
                  accept=".jpg,.png,.svg,.jpeg"
                  name="avatar"
                  @update:model-value="setAvatar"
                  class="previewinput"
                  id="my-file"
                />

                <div class="previewDiv">
                  <template v-if="previewAvatar">
                    <img :src="previewAvatar" class="previewimg" />
                    <img src="/images/upload.png" class="click" alt="" />
                  </template>
                </div>
              </div>
            </div>
          </div>

          <div class="boost">
            <q-btn :loading="loadingAvatar" @click="addAvatar"
              >Add Avatar</q-btn
            >
          </div>

          <q-btn @click="dialogAvatar = false" class="close">
            <i class="fa-solid fa-xmark"></i>
          </q-btn>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="editNameModal" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Edit Name</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input label="New Name" dense v-model="editP.name" autofocus />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            :loading="edit1"
            flat
            @click="editUsersDetails"
            label="Finish"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="editPhonwModal" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Edit Phone</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input label="New Phone" dense v-model="editP.phone" autofocus />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            :loading="edit1"
            flat
            @click="editUsersDetails"
            label="Finish"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="editPasswordModal" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Edit Password</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            label="Current Password"
            dense
            v-model="password.current_password"
            autofocus
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            label="New Password"
            dense
            v-model="password.password"
            autofocus
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            label="Confirm Password"
            dense
            v-model="password.password_confirmation"
            autofocus
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            :loading="edit2"
            @click="editUsersPassword"
            flat
            label="Finish"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { Notify } from "quasar";
// import { ref } from "vue";
const columns = [
  {
    name: "account",
    required: true,
    label: "Account Detail",
    align: "left",
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: "password",
    required: true,
    label: "",
    align: "center",
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: "value",
    required: true,
    label: "Action",
    align: "right",
    field: (row) => row.name,
    sortable: true,
  },
];

const rows = [
  {
    name: "Name",
    number_account: "chris.gbesola",
    addedOn: "2 Days ago",
  },
  {
    name: "Phone Number",
    number_account: "08060970483",
    addedOn: "2 Days ago",
  },
  {
    name: "Password",
    number_account: "**********",
    addedOn: "2 Days ago",
  },
  // {
  //   name: "Email",
  //   number_account: "chris.gbesola@yahoo.com",
  //   actions: "2 Days ago",
  // },
];

const columnsPrivacy = [
  {
    name: "privacy",
    required: true,
    label: "Privacy",
    align: "left",
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: "password",
    required: true,
    label: "",
    align: "center",
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: "value",
    required: true,
    label: "Action",
    align: "right",
    field: (row) => row.name,
    sortable: true,
  },
];

const rowsPrivacy = [
  {
    name: "Allow Chat",
    number_account: "Yes",
    actions: "2 Days ago",
  },
  {
    name: "Allow phone view",
    number_account: "Yes",
    actions: "2 Days ago",
  },
  {
    name: "Allow email view",
    number_account: "No",
    actions: "2 Days ago",
  },
];
export default {
  data() {
    return {
      columns,
      rows,
      rowsPrivacy,
      columnsPrivacy,
      filter: "",
      curl: "",
      separator: "",
      mode: "list",
      privacyData: {},
      value: true,
      val: false,
      loading: false,
      val2: false,
      dialogAvatar: false,
      loadingAvatar: false,
      avatar: {},
      load: false,
      load1: false,
      load2: false,
      edit1: false,
      edit2: false,
      editPasswordModal: false,
      editNameModal: false,
      editPhonwModal: false,
      password: {},
      editP: {},
      videoFile: null,
      videoUrl: null,

      upload: "For Product",
      previewAvatar: "/images/sqrpreview.png",
    };
  },

  mounted() {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined,
    });
    this.onRequestPrivacy({
      pagination: this.pagination,
      filter: undefined,
    });

    // console.log(
    //   console.log(this.$store.leegoluauth.vendorDetails.hasActiveSubscription)
    // );
    if (this.$store.leegoluauth.userDetails.role[0].name === "business") {
      // console.log("business");
      // console.log(this.$store.leegoluauth.vendorDetails.hasActiveSubscription);
      this.val2 = true;
      this.val = false;
      // console.log(this.val);
    } else {
      // console.log("regular");
      this.val = true;
      this.val2 = false;

      // console.log(this.$store.leegoluauth.vendorDetails.hasActiveSubscription);
    }
  },

  watch: {
    "privacyData.allow_chat_view": function (newVal) {
      // Perform actions when 'allow_chat' property is changed
      // console.log(`'allow_chat' changed to ${newVal}`);
      newVal = newVal ? 1 : 0;
      if (newVal) {
        this.load = true;
        this.$api
          .post(
            `${this.$store.leegoluauth.vendorDetails.slug}/setting/privacy`,
            {
              chat: newVal,
            }
          )
          .then((response) => {
            this.load = false;
            // console.log(response);
            this.privacyData = response.data.data;
          })
          .catch(({ response }) => {
            this.load = false;
            this.errors = error.errors || {};
          });
      } else {
        this.$api
          .post(
            `${this.$store.leegoluauth.vendorDetails.slug}/setting/privacy`,
            {
              chat: newVal,
            }
          )
          .then((response) => {
            this.load = false;
            this.privacyData = response.data.data;
          })
          .catch(({ response }) => {
            this.load = false;
            this.errors = error.errors || {};
          });
      }
    },
    "privacyData.allow_email_view": function (newVal) {
      // Perform actions when 'allow_call' property is changed
      // console.log(`'allow_emal' changed to ${newVal}`);
      newVal = newVal ? 1 : 0;
      if (newVal) {
        this.load1 = true;
        this.$api
          .post(
            `${this.$store.leegoluauth.vendorDetails.slug}/setting/privacy`,
            {
              email: newVal,
            }
          )
          .then((response) => {
            this.load1 = false;
            this.privacyData = response.data.data;
          })
          .catch(({ response }) => {
            this.load1 = false;

            this.errors = error.errors || {};
          });
      } else {
        this.$api
          .post(
            `${this.$store.leegoluauth.vendorDetails.slug}/setting/privacy`,
            {
              email: newVal,
            }
          )
          .then((response) => {
            this.privacyData = response.data.data;
            this.load1 = false;
          })
          .catch(({ response }) => {
            this.load1 = false;

            this.errors = error.errors || {};
          });
      }
    },
    "privacyData.allow_phone_view": function (newVal) {
      // Perform actions when 'allow_call' property is changed
      // console.log(`'allow_call' changed to ${newVal}`);
      newVal = newVal ? 1 : 0;
      if (newVal) {
        this.load2 = true;
        // console.log(newVal);
        this.$api
          .post(
            `${this.$store.leegoluauth.vendorDetails.slug}/setting/privacy`,
            {
              phone: newVal,
            }
          )
          .then((response) => {
            this.privacyData = response.data.data;
            // console.log(response);
            this.load2 = false;
          })
          .catch(({ response }) => {
            this.load2 = false;

            this.errors = error.errors || {};
          });
      } else {
        // console.log(newVal);
        this.$api
          .post(
            `${this.$store.leegoluauth.vendorDetails.slug}/setting/privacy`,
            {
              phone: newVal,
            }
          )
          .then((response) => {
            this.privacyData = response.data.data;
            this.load2 = false;
            // console.log(response);
          })
          .catch(({ response }) => {
            this.load2 = false;

            this.errors = error.errors || {};
          });
      }
    },
  },

  methods: {
    onRequest(props) {
      this.$api
        .get(`${this.$store.leegoluauth.vendorDetails.slug}/setting/privacy`)
        .then((response) => {
          this.loading = false;
          this.privacyData = response.data.data;
          console.log(response);
          // this.rows = response.data.vendor.subscriptions;
        })
        .catch(({ response }) => {
          this.loading = false;
        });
    },
    setVideoFile(props) {
      this.videoUrl = URL.createObjectURL(props);
    },

    getVendor() {
      this.$api
        .get(`vendor/${this.$store.leegoluauth.vendorDetails.slug}`)
        .then((response) => {
          this.loading = false;
          this.vendor = response.data.vendor;
          console.log(response);
        })
        .catch(({ response }) => {
          this.loading = false;
        });
    },

    onRequestPrivacy(props) {},
    setAvatar(props) {
      // console.log(props);
      var reader = new FileReader();
      reader.onload = (e) => {
        this.previewAvatar = e.target.result;
      };
      reader.readAsDataURL(props);
    },

    scroll() {
      document.getElementById("style").scrollIntoView({ behavior: "smooth" });
    },

    edit(detail) {
      if (detail.name === "Name") {
        this.editP.name = this.$store.leegoluauth.userDetails.name;
        this.editNameModal = true;
      } else if (detail.name === "Phone Number") {
        this.editP.phone = this.$store.leegoluauth.userDetails.phone;

        this.editPhonwModal = true;
      } else if (detail.name === "Password") {
        this.editPasswordModal = true;
      }
    },

    editUsersDetails() {
      this.edit1 = true;
      if (this.editNameModal) {
        this.$api
          .patch(`user/setting`, {
            name: this.editP.name,
          })
          .then((response) => {
            this.edit1 = true;
            console.log(response);
            // this.privacyData = response.data.data;
            this.edit1 = false;
            this.$q.notify({
              message: response.data.message,
              color: "green",
              position: "bottom",
            });
            this.editNameModal = false;
            this.$store.leegoluauth.userDetails = response.data.data;
          })
          .catch(({ response }) => {
            this.edit1 = false;
            this.errors = error.errors || {};
            this.$q.notify({
              message: "An error occured",
              color: "red",
              position: "bottom",
            });
          });
      } else if (this.editPhonwModal) {
        this.$api
          .patch(`user/setting`, {
            phone: this.editP.phone,
          })
          .then((response) => {
            this.edit1 = true;
            console.log(response);
            // this.privacyData = response.data.data;
            this.edit1 = false;
            this.$q.notify({
              message: response.data.message,
              color: "green",
              position: "bottom",
            });
            this.editPhonwModal = false;
            this.$store.leegoluauth.userDetails = response.data.data;
          })
          .catch(({ response }) => {
            this.edit1 = false;
            this.errors = error.errors || {};
            this.$q.notify({
              message: "An error occured",
              color: "red",
              position: "bottom",
            });
          });
      }
    },
    editUsersPassword() {
      this.edit2 = true;
      this.$api
        .post(`password/setting`, this.password)
        .then((response) => {
          // this.privacyData = response.data.data;
          // this.load1 = false;
          console.log(response);
          this.edit2 = false;
          this.editPasswordModal = false;
          this.$q.notify({
            message: response.data.message,
            color: "green",
            position: "bottom",
          });
        })
        .catch(({ response }) => {
          // this.load1 = false;
          this.edit2 = false;

          this.errors = error.errors || {};
          this.$q.notify({
            message: "An error occured",
            color: "red",
            position: "bottom",
          });
        });
    },

    addAvatar() {
      const formData = new FormData();
      formData.append("avatar", this.avatar.avatar);

      this.loadingAvatar = true;
      this.$api
        .post(`upload-avatar`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Success:", response);
          this.loadingAvatar = false;
          this.dialogAvatar = false;
          this.avatar = {};
          this.getVendor();
          this.$q.notify({
            message: response.data.message,
            color: "green",
            position: "bottom",
          });
        })
        .catch(({ response }) => {
          // console.log(response);
          this.errors = response.data.message;
          this.loadingAvatar = false;
          this.$q.notify({
            message: response.data.message,
            color: "red",
            position: "bottom",
            actions: [{ icon: "close", color: "white" }],
          });
        });
    },
    getVendor() {
      this.$api
        .get(`vendor/${this.$store.leegoluauth.vendorDetails.slug}`)
        .then((response) => {
          // console.log(response);
          this.$store.leegoluauth.userDetails = response.data.user;
        })
        .catch((e) => {
          // this.loading = false;
          this.errors = error.errors || {};
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 70%;
  margin: 0 auto;
}

.style {
  margin-top: 1rem;
}
.settings_top {
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  padding: 1rem 2.4rem;
  height: 138px;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

.q-btn {
  text-transform: capitalize;
}

.settings_top .img_side {
  position: relative;
}

.settings_top .img_side img:first-of-type {
  mix-blend-mode: normal;
  border-radius: 50%;
  width: 77px;
  height: 77px;
  object-fit: cover;
}
hr {
  background: rgba(176, 176, 176, 0.5);
  // height: 1px;
  margin-top: 2rem;
}
.settings_top .img_side .q-btn {
  border-radius: 50%;
  min-height: auto;
  position: absolute;
  padding: 5px;
  right: -10%;
  bottom: 15%;

  background: #1f7bb5;
}
.settings_top .img_side .q-btn img {
  width: 13.94px;
  height: 13.94px;
}

.right_settings .q-btn {
  background: #1f7bb5;
  border-radius: 5px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: #ffffff;
}

.left_settings {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.set_name {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;

  color: #000000;
}

.joined {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 14px;
  color: #1f7bb5;
}

.topp {
  margin-top: 2rem;
  .topp_left {
    img {
      width: 35px;
      height: 35px;
    }
    span {
      font-family: "Open Sans";
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 27px;
      color: #1f7bb5;
    }
  }

  .arrow img {
    width: 24px;
    height: 24px;
  }
}

.para {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  max-width: 50%;
  // margin: 0.2rem auto 0.4rem;
  margin: 0rem auto 2rem;
}

.grid__wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  position: relative;
  margin-top: 1rem;

  .grid_item {
    padding: 1rem;
    background: #ffffff;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
    border-radius: 14px;
    height: 293px;

    img {
      width: 116px;
      height: 104px;
      // height: 154px;
    }
  }

  .check {
    position: absolute;
    top: 1%;
    right: 1%;
  }

  .grid_div {
    background: linear-gradient(180deg, #0f476a 0%, #1f7bb5 100%);
    border-radius: 12px;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    height: 100%;
    position: relative;
    padding: 1rem 0 1rem;

    .para {
      color: #ffffff;
    }

    .main_textSet {
      color: #fff;
    }
  }

  .active {
    font-family: "Open Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    color: #ffffff;
    background: #354e8d;
    border-radius: 17.5px;
    padding: 1rem;
    width: 106px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    img {
      width: 14px;
      height: 14px;
    }
  }

  .grid_div2 {
    background: #c2e6e9;
    border-radius: 12px;
    display: flex;
    justify-content: flex-start;

    align-items: center;
    flex-direction: column;
    height: 100%;
    padding: 1rem 0 1rem;
    position: relative;
    .para {
      color: #000;
    }

    .main_textSet {
      color: #000000;
    }

    .q-btn {
      font-family: "Open Sans";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      text-align: center;
      color: #ffffff;
      background: #1f7bb5;
      border-radius: 17.5px;
      padding: 1rem;
      width: 208px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 35px;
      position: absolute;
      bottom: 5%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}

// .upgrade{

// }

.main_textSet {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
  /* identical to box height */

  text-align: center;
}

.card {
  min-width: 363px;
  background: #ffffff;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  width: 466px;
  // height: 522px;
}

.dialog_content {
  background: #ffffff;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  padding: 1rem;
  position: relative;
}
.dialog_content .dialog_top {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.dialog_content .dialog_top .title {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  // text-align: center;
  color: #000000;
}
.dialog_content .dialog_top .price {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  // text-align: center;
  text-transform: capitalize;

  color: #000000;
}
.dialog_content .ad p:last-of-type {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  text-align: right;
  color: #000000;
  margin-bottom: 8px;
}

.dialog_content .ad p:first-of-type {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  margin-bottom: 8px;
}
.dialog_content .dialog_top.advert {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin: 1.5rem 0;
  background: #edf1f4;
  border-radius: 17px;
  padding: 1.5rem;
}
.dialog_content .dialog_top.advert .det {
  margin: 1.5rem 0;
}
.dialog_content .dialog_top img {
  width: 22px;
  height: 26px;
}

.card.avatar {
  position: relative;
  max-width: 366px;
}

.card.avatar .previewDiv img:first-of-type {
  width: 229px;
  height: 195px;
  border-radius: 0;
  border: none;
  margin-bottom: 1rem;
}

.card.avatar .previewDiv img.click {
  width: 120px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: contain;
}

.card.avatar .dialog_content .dialog_top {
  justify-content: center;
}

.card.avatar .boost .q-btn {
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

.card.avatar .close {
  position: absolute;
  top: 1%;
  right: 2%;
  color: #979797;
  font-size: 1rem;
}

p.advert {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  margin-bottom: 0;
  padding: 0rem 0;
  color: #000000;
}
@container (max-width: 700px) {
  .grid__wrap {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1025px) {
  .container {
    max-width: 85%;
  }
}
@media (max-width: 1000px) {
  .para {
    max-width: 80%;
  }
}
@media (max-width: 764px) {
  .grid__wrap {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 500px) {
  .settings_top {
    flex-wrap: wrap;
    justify-content: center;
    height: auto;
    padding: 1rem 1rem;
  }

  .topp .topp_left span {
    font-size: 16px;
  }

  .topp .arrow img {
    width: 18px;
    height: 18px;
  }

  .topp .topp_left img {
    width: 25px;
    height: 25px;
  }

  .main_textSet {
    font-size: 18px;
  }

  .right_settings .q-btn {
    font-size: 13px;
  }

  .settings_top .img_side img:first-of-type {
    width: 67px;
    height: 67px;
  }

  .set_name {
    font-size: 18px;
  }

  .settings_top {
    margin-top: 20px;
  }

  .settings_top .img_side .q-btn img {
    width: 12.94px;
    height: 12.94px;
  }

  .container {
    max-width: 90%;
    // margin: 0 auto;
  }
}
</style>
