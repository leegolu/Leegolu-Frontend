<template>
  <div class="card">
    <div class="img_wrap">
      <img src="/images/plancircle.png" alt="" />
      <img :src="`/images/sellerplan.png`" alt="" />
      <!-- <img :src="`/images/${plan.img}`" alt="" /> -->
    </div>
    <div class="title">{{ plan.name }}</div>
    <div class="amount">
      ₦{{ plan.price }}
      <br />
      <div class="small">Per month</div>
    </div>

    <div class="options">
      <!-- <ul>
        <li>
          <i class="fa-solid q-mr-sm text-green fa-check"></i>
          10 Listings
        </li>
        <li>
          <i class="fa-solid q-mr-sm text-green fa-check"></i>
          Custom Domain
        </li>
      </ul> -->
      <ul>
        <li v-for="(option, index) in plan.description" :key="index">
          <i class="fa-solid q-mr-sm text-green fa-check"></i>
          {{ option }}
        </li>
      </ul>
    </div>

    <div class="btn">
      <q-btn @click="proceed"> Start Plan </q-btn>
    </div>

    <q-dialog v-model="dialogCreate" persistent>
      <q-card class="dialog_card">
        <div class="dialog_content">
          <div class="dialog_top">
            <div class="img_wrap">
              <img src="/images/plancircle.png" alt="" />
              <img :src="`/images/sellerplan.png`" alt="" />
            </div>
          </div>
          <div class="title">{{ plan.name }}</div>
          <div class="amount">₦{{ plan.price }}</div>

          <div v-if="errors.name" class="input-box active-grey">
            <label class="input-label">Business Name</label>
            <input
              type="text"
              name="name"
              v-model="vendordetails.name"
              class="input-1"
              placeholder="Red Dress Co."
            />
            <small v-if="errors.name" class="text-red text-weight-bold">
              {{ errors.name[0] }}
            </small>
          </div>
          <div class="input-box q-mx-md active-grey">
            <label class="input-label">Duration</label>
            <select name="" id="">
              <option value="+243">1 Month</option>
              <!-- <option value="+243">1 Month</option>
              <option value="+243">1 Month</option> -->
            </select>
          </div>

          <div class="boost">
            <q-btn :loading="loading" @click="purchasePlan">Proceed</q-btn>
          </div>

          <q-btn @click="dialogCreate = false" class="close">
            <i class="fa-solid fa-xmark"></i>
          </q-btn>
        </div>
      </q-card>
    </q-dialog>

    <q-dialog class="dash_modal" v-model="businessreg">
      <q-card style="width: 100%; max-width: 800px">
        <div class="modal three">
          <div class="modal_wrap">
            <div class="left">
              <div class="modal_main">Leegolu Business</div>
              <div class="modal_sub_text">
                Please supply your business details below.
              </div>

              <form id="form">
                <div class="input-box active-grey">
                  <label class="input-label">Business Name</label>
                  <input
                    type="text"
                    name="name"
                    v-model="vendordetails.name"
                    class="input-1"
                    placeholder="Enter your business name"
                  />
                </div>
                <div class="input-box active-grey">
                  <label class="input-label">About Business</label>

                  <select v-model="vendordetails.business_type" class="reg">
                    <option
                      v-for="businessType in businessTypes"
                      :key="businessType.id"
                      :value="businessType.id"
                    >
                      {{ businessType.name }}
                    </option>
                  </select>
                </div>
                <div class="wraps">
                  <div class="input-box active-grey">
                    <label class="input-label">State</label>
                    <select
                      v-model="vendordetails.state"
                      class="reg"
                      @change="getAreas(vendordetails.state)"
                    >
                      <option
                        v-for="state in states"
                        :key="state.id"
                        :value="state.id"
                      >
                        {{ state.name }}
                      </option>
                    </select>
                  </div>
                  <div class="input-box active-grey">
                    <label class="input-label">Area</label>
                    <select v-model="vendordetails.area" class="reg" name="">
                      <option
                        v-for="area in areas"
                        :key="area.id"
                        :value="area.id"
                      >
                        {{ area.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <!-- {{ vendordetails }} -->
                <div class="input-box active-grey">
                  <label class="input-label">Full Address</label>
                  <input
                    v-model="vendordetails.address"
                    type="text"
                    class="input-1"
                    placeholder="13 Pious Adolf Crescent, Trans-Elemo, Laffia"
                  />
                </div>

                <q-btn
                  :loading="loadingFinish"
                  @click="finish"
                  flat
                  type="button"
                  class="btn"
                  >Finish</q-btn
                >
                <div class="clear"></div>
              </form>
            </div>

            <div class="right">
              <img src="/images/businessreg.svg" alt="" />
            </div>
          </div>

          <!-- <div @click="reg" class="close">
          <i class="fa-solid fa-xmark"></i>
        </div> -->
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { useAuthStore } from "stores/auth";
import { Dialog } from "quasar";
let store = useAuthStore();
export default {
  props: ["plan", "loadingsign", "businessTypes", "states", "areas"],
  setup() {
    let role = store.userDetails.role[0].name;
    return {
      role,
    };
  },
  data() {
    return {
      dialogCreate: false,
      loading: false,
      errors: {},
      businessreg: false,
      vendordetails: {},
      loadingFinish: false,
    };
  },
  emits: ["getArea"],
  methods: {
    proceed() {
      if (this.role === "regular" && this.plan.name !== "Seller") {
        Dialog.create({
          title: " Alert!",
          message:
            "You are a regular user and would need to become a business to buy this plan...",
          ok: {
            push: true,
            label: "Become a business",
            color: "green",
          },
          persistent: true,
        })
          .onOk(() => {
            this.businessreg = true;
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      } else {
        this.dialogCreate = true;
      }
    },

    purchasePlan() {
      this.loading = true;
      this.$api
        .post(`${this.$store.leegoluauth.vendorDetails.slug}/purchase/plan`, {
          plan: this.plan.id,
        })
        .then((response) => {
          console.log(response);
          this.$helper.notify(response.data.message, "success");
          if (this.$router.currentRoute.value.query.getplan === "yes") {
            this.$store.leegoluauth.videotour = "yes";
          }
          // this.$router.replace({
          //   name: "business.dashboard",
          //   query: { videotour: "yes" },
          // });
          window.location.href = response.data.url;
          // this.loading = false;
        })
        .catch(({ response }) => {
          // console.log(response);
          this.loading = false;
          this.errors = response.data.errors || {};
        });

      // if (this.errors.name) {
      //   let data = {
      //     ...this.$store.leegoluauth.vendorDetails,
      //     plan: this.plan.id,
      //     name: this.vendordetails.name,
      //   };

      //   this.$api
      //     .post("onboarding", data)
      //     .then((response) => {
      //       // console.log(response);
      //       // console.log(response.data);
      //       // console.log(response.data.vendor);
      //       this.$store.leegoluauth.vendorDetails = response.data.vendor;
      //       this.$store.leegoluauth.vendor = response.data.vendor;
      //       this.$helper.notify(response.data.message, "success");
      //       this.$router.replace({
      //         name: "business.dashboard",
      //         query: { videotour: "yes" },
      //       });
      //       this.loading = false;
      //     })
      //     .catch(({ response }) => {
      //       // console.log(response);
      //       this.loading = false;
      //       this.errors = response.data.errors || {};
      //     });
      // } else {
      //   let data = {
      //     ...this.$store.leegoluauth.vendorDetails,
      //     plan: this.plan.id,
      //   };
      //   this.$api
      //     .post("onboarding", data)
      //     .then((response) => {
      //       // console.log(response);
      //       this.$store.leegoluauth.vendorDetails = response.data.vendor;
      //       this.$store.leegoluauth.vendor = response.data.vendor;
      //       this.$helper.notify(response.data.message, "success");
      //       this.$router.replace({
      //         name: "business.dashboard",
      //         query: { videotour: "yes" },
      //       });
      //       this.loading = false;
      //     })
      //     .catch(({ response }) => {
      //       // console.log(response);
      //       this.loading = false;
      //       this.errors = response.data.errors || {};
      //     });
      // }
    },
    getAreas(id) {
      this.$emit("getArea", id);
    },

    finish() {
      if (this.vendordetails.name === "") {
        this.$q.notify({
          color: "red",
          message: "Business name field is required",
        });
        return;
      } else if (this.vendordetails.area === "") {
        this.$q.notify({
          color: "red",
          message: "Business area field is required",
        });
        return;
      } else if (this.vendordetails.state === "") {
        this.$q.notify({
          color: "red",
          message: "Business state field is required",
        });
        return;
      } else if (this.vendordetails.address === "") {
        this.$q.notify({
          color: "red",
          message: "Business address field is required",
        });

        return;
      } else if (this.vendordetails.business_type === "") {
        this.$q.notify({
          color: "red",
          message: "Business business type field is required",
        });
        return;
      } else {
        this.$store.leegoluauth.vendorDetails = this.vendordetails;
        // this.$store.leegoluauth.modal = false;

        // this.$router.replace({ name: "Plans" });
        this.loadingFinish = true;

        this.$api
          .post("onboarding", this.vendordetails)
          .then((response) => {
            this.$store.leegoluauth.vendorDetails = response.data.vendor;
            this.$store.leegoluauth.vendor = response.data.vendor;
            this.$helper.notify(response.data.message, "success");
            this.$store.leegoluauth.modal = false;
            this.$router.replace({ name: "Plans", query: { getplan: "yes" } });

            this.loadingFinish = false;
          })
          .catch(({ response }) => {
            // console.log(response);
            this.loadingFinish = false;
            this.errors = response.data.errors || {};
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 5rem 3rem 0 3rem;
}
.main_title {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 49px;
  text-align: center;
  color: #1f7bb5;
}

.sub_title {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  color: #1f7bb5;
  margin-bottom: 2rem;
}

.card_wrap {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  align-items: center;
}

.card {
  position: relative;
  padding: 1rem;
}

.card:nth-child(1) img:last-of-type {
  width: 35px;
  height: 35px;
}
.card:nth-child(2) img:last-of-type {
  width: 52px;
  height: 37px;
}
.card:nth-child(3) img:last-of-type {
  width: 58px;
  height: 32px;
}
.card:nth-child(4) img:last-of-type {
  width: 93px;
  height: 35px;
}
.img_wrap {
  position: relative;
  margin-top: 2rem;
}

.img_wrap img:first-of-type {
  position: absolute;
  width: 50px;
  height: 50px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.img_wrap img:last-of-type {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.card {
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  min-width: 230px;
  min-height: 351px;
  padding: 2rem;
  max-width: 400px;
  margin: 0 auto;
}

.title {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #000000;
  margin-top: 4rem;
}

.amount {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 39px;
  text-align: center;
  color: #1f7bb5;
}

.amount .small {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 8px;
  line-height: 10px;
  text-align: center;
  letter-spacing: 0.365em;
  text-transform: uppercase;
  color: #1f7bb5;
}

.btn {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 7%;
  left: 50%;
  transform: translateX(-50%);
}

.btn .q-btn {
  text-transform: capitalize;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  background: #1f7bb5;
  border-radius: 8px;
}

.options {
  margin: 1rem 0;
}
.options ul li {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
  margin: 0.4rem 0;
}

// dialog

.dialog_card {
  min-width: 363px;
  background: #ffffff;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  width: 427px;
}

.dialog_content {
  background: #ffffff;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  padding: 1rem;
  position: relative;
}

.dialog_top .img_wrap {
  margin-top: 0;
  padding-top: 5rem;
}

.dialog_card .amount,
.dialog_card .title {
  margin-top: 0rem;
}

.dialog_top img {
  width: auto;
  height: 32px;
}
.dialog_top .title {
  padding-top: 2rem;
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
  // padding: 1rem 0;
  margin: 25px;
  // margin: 0 25px;
}

.dialog_content .close {
  position: absolute;
  top: 1%;
  right: 1%;
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

$color: #80868b;
$input-value-color: #202124;
$border-color: 1px solid #dadce0;
$active-color: #1a73e8;
$default-background: #fff;
input,
select,
textarea {
  background: $default-background;
}

#form {
  margin: 0 auto;
}
.input-box.active-grey {
  .input-1,
  select,
  textarea {
    border: 1.5px solid #9d9d9d;
  }
  select,
  textarea {
    width: 100%;
    // margin: 0 auto !important;
  }
  .input-label {
    color: $color;
    top: -8px;
    background: $default-background;
    font-size: 11px;

    transition: 250ms;
  }
}
.input-box {
  position: relative;
  // display: grid;
  // place-items: center;
  margin: 25px;
  .input-label {
    position: absolute;
    color: $color;
    font-size: 16px;
    font-weight: 400;
    max-width: calc(100% - (2 * 8px));
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    left: 8px;
    top: 13px;
    padding: 0 8px;
    transition: 250ms;
    user-select: none;
    pointer-events: none;
  }
  .input-1,
  select,
  textarea {
    box-sizing: border-box;
    height: 50px;
    width: 100%;
    border-radius: 4px;
    color: $input-value-color;
    border: $border-color;
    padding: 13px 15px;

    transition: 250ms;
    &:focus {
      outline: none;
      border: 2px solid #1a73e8;
      transition: 250ms;
    }
  }
}

.input-box.focus,
.input-box.active {
  .input-label {
    color: $active-color;
    top: -8px;
    background: $default-background;
    font-size: 11px;
    transition: 250ms;
  }
}
.input-box.active {
  .input-1 {
    border: 2px solid #1a73e8;
  }
}

.clear {
  clear: both;
}

::placeholder {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: -0.01em;
  color: #000000;
}
.dash_modal .q-card {
  border-radius: 14px;
  background: #fff;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.15);
}

.dash_modal .input-box {
  margin: 25px 0;
}

.dash_modal .wraps .input-box {
  margin: 0;
}
.dash_modal .btn {
  width: 199px;
  background: #1f7bb5;
  border-radius: 5px;
  height: 46px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #ffffff;
  left: unset;
  position: relative;
  transform: unset;
  bottom: unset;
  margin-top: 1.5rem;
}
@media (max-width: 500px) {
  .dialog_card {
    min-width: 100%;
    width: 100%;
  }
  .dash_modal .modal.three .modal_sub_text {
    margin: 0;
  }
}
</style>
