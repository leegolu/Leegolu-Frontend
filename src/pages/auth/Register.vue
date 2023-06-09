<template>
  <div class="login q-pt-xl">
    <div class="login_hold">
      <div class="login_wrapper">
        <div class="left side">
          <div class="left_wrap">
            <div class="img">
              <img src="/images/leee.png" alt="" />
            </div>
            <div class="middle">
              <div
                v-if="data.role === 'c6f3cebc-2928-4d24-bdc9-41a383fee65c'"
                class="main"
              >
                Do more with <br />
                <span> Leegolu Business</span>
              </div>
              <div v-else class="main">
                Join the newest <br />
                online market
              </div>

              <div class="desc">
                Thousands of users within Africa are <br />
                experiencing the new to buy & <br />
                sell online.
              </div>
              <div class="side_img_wrap text-center">
                <img
                  :src="
                    data.role === 'c6f3cebc-2928-4d24-bdc9-41a383fee65c'
                      ? '/images/shop.svg'
                      : '/images/rockets.svg'
                  "
                  class="side_img"
                  alt=""
                />
              </div>
            </div>
            <!-- <div class="foot">HTML 5 ANIMATION</div> -->
            <div></div>
          </div>
        </div>

        <div class="right">
          <div class="sign">
            <div class="head q-mb-sm">Sign up</div>

            <div class="sub">
              Have an account?
              <router-link
                :to="{ name: 'login' }"
                class="text-black text-weight-bold"
                >Login
              </router-link>
            </div>
          </div>

          <form @submit.prevent="register">
            <!-- {{ data.role }} -->
            <div class="checks">
              <div
                v-for="role in roles"
                :key="role.id"
                :class="role.id === data.role ? 'check' : 'notactive'"
              >
                <q-radio
                  v-model="data.role"
                  :val="role.id"
                  :label="`Leegolu ${role.name}`"
                />
              </div>

              <!-- {{ roles }} -->
              <!-- <div
              :class="data.bus === 'Leegolu Business' ? 'check' : 'notactive'"
            >
              <q-radio
                v-model="data.bus"
                val="Leegolu Business"
                label="Leegolu Business"
              />
            </div> -->
            </div>
            <div class="input-box active-grey">
              <label class="input-label">Username</label>
              <input
                v-model="data.name"
                type="text"
                required
                name="name"
                class="input-1"
                placeholder="John Doe"
              />
              <small v-if="errors.name" class="text-red text-weight-bold">
                {{ errors.name[0] }}
              </small>
            </div>
            <div class="input-box active-grey">
              <label class="input-label">Email Address</label>
              <input
                type="email"
                required
                name="email"
                v-model="data.email"
                class="input-1"
                placeholder="johndoe@gmail.com"
              />
              <small v-if="errors.email" class="text-red text-weight-bold">
                {{ errors.email[0] }}
              </small>
            </div>
            <div class="input-box active-grey">
              <label class="input-label">Phone Number</label>

              <div class="div">
                <div class="row no-wrap phone items-center">
                  <select required v-model="countrycode" name="" id="">
                    <option value="+243">+243</option>
                    <option value="+243">+243</option>
                    <option value="+243">+243</option>
                  </select>
                  <input
                    type="text"
                    v-model="data.phone"
                    class="input-1"
                    name="phone"
                    placeholder="07060870483"
                  />
                </div>
                <small v-if="errors.phone" class="text-red text-weight-bold">
                  {{ errors.phone[0] }}
                </small>
              </div>
            </div>

            <div class="input-box active-grey">
              <label class="input-label">Password</label>
              <input
                v-model="data.password"
                type="password"
                required
                name="password"
                class="input-1"
                placeholder="*******"
              />
              <small v-if="errors.password" class="text-red text-weight-bold">
                {{ errors.password[0] }}
              </small>
            </div>

            <!-- {{ errors }} -->

            <q-btn
              :loading="loading"
              type="submit"
              color="secondary"
              class="btn"
              >Proceed</q-btn
            >
            <div class="clear"></div>

            <div class="goggle_auth">
              <q-btn>
                <img src="/images/googleauth.png" alt="" />
              </q-btn>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <q-dialog v-model="welcometoleegoluregularmodal">
    <q-card style="width: 100%; max-width: 800px">
      <div class="modal">
        <div class="modal_wrap">
          <div class="left">
            <div class="modal_main">Hello Chris,</div>
            <div class="modal_main_text">Welcome to Leegolu.</div>
            <div class="modal_sub_text">
              Your account gives you full access to all basic features available
              on the Leegolu marketplace for free.
            </div>

            <ul>
              <li>
                <i class="fa-solid fa-check"></i> Access to direct seller
                contact
              </li>
              <li>
                <i class="fa-solid fa-check"></i> Ability to sell as a private
                seller
              </li>
              <li>
                <i class="fa-solid fa-check"></i> Access to insights & analytics
              </li>
              <li>
                <i class="fa-solid fa-check"></i> Access to Leegolu video ads
              </li>
            </ul>
          </div>

          <div class="right">
            <img src="/images/rocket.png" alt="" />
          </div>
        </div>

        <div class="row q-pb-lg items-center justify-between">
          <q-btn
            @click="addphotoforleegoluregularmodal = true"
            color="primary"
            class="q-px-xl proceed"
          >
            Proceed
          </q-btn>
          <q-btn class="q-px-sm skip"> Skip </q-btn>
        </div>

        <div @click="welcometoleegoluregularmodal = false" class="close">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
    </q-card>
  </q-dialog>
  <q-dialog v-model="welcometoleegolubusinessmodal">
    <q-card style="width: 100%; max-width: 800px">
      <div class="modal">
        <div class="modal_wrap">
          <div class="left">
            <div class="modal_main">Hello Chris,</div>
            <div class="modal_main_text">Welcome to Leegolu Business.</div>
            <div class="modal_sub_text">
              Your account gives you full access to all basic features available
              on the Leegolu marketplace for free.
            </div>

            <ul>
              <li>
                <i class="fa-solid fa-check"></i> Access to direct seller
                contact
              </li>
              <li>
                <i class="fa-solid fa-check"></i> Ability to sell as a private
                seller
              </li>
              <li>
                <i class="fa-solid fa-check"></i> Access to insights & analytics
              </li>
              <li>
                <i class="fa-solid fa-check"></i> Access to Leegolu video ads
              </li>
              <li><i class="fa-solid fa-check"></i> A branded shop</li>
            </ul>
          </div>

          <div class="right">
            <img src="/images/welcometobusiness.svg" alt="" />
          </div>
        </div>

        <div class="row q-pb-lg items-center justify-between">
          <q-btn
            @click="addphotoforleegolubusinessmodal = true"
            color="primary"
            class="q-px-xl proceed"
          >
            Proceed
          </q-btn>
          <q-btn class="q-px-sm skip"> Skip </q-btn>
        </div>

        <div @click="welcometoleegolubusinessmodal = false" class="close">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
    </q-card>
  </q-dialog>
  <q-dialog v-model="addphotoforleegoluregularmodal">
    <q-card style="width: 100%; max-width: 800px">
      <div class="modal two">
        <div class="modal_wrap">
          <div class="left">
            <div class="modal_main">Add your photo</div>
            <div class="modal_sub_text">
              Add a picture of yourself or select a
              <span class="text-primary">preferred emoji</span>. Other users
              will associate this with your account.
            </div>

            <div class="previewMain">
              <form>
                <div class="form">
                  <input
                    type="file"
                    accept="image/*"
                    @change="previewImage"
                    class="previewinput"
                    id="my-file"
                  />

                  <div class="previewDiv">
                    <template v-if="preview">
                      <img :src="preview" class="previewimg" />
                      <img src="/images/click.png" class="click" alt="" />
                    </template>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="right">
            <img src="/images/businessimg.svg" alt="" />
          </div>
        </div>

        <div class="row q-pb-lg items-center justify-between">
          <q-btn
            :to="{
              name: `regular.dashboard`,
            }"
            color="primary"
            class="q-px-xl proceed"
          >
            Proceed
          </q-btn>
          <q-btn
            :to="{
              name: `regular.dashboard`,
            }"
            class="q-px-sm skip"
          >
            Skip
          </q-btn>
        </div>

        <div @click="addphotoforleegoluregularmodal = false" class="close">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
    </q-card>
  </q-dialog>
  <q-dialog v-model="addphotoforleegolubusinessmodal">
    <q-card style="width: 100%; max-width: 800px">
      <div class="modal two">
        <div class="modal_wrap">
          <div class="left">
            <div class="modal_main">Add your photo</div>
            <div class="modal_sub_text">
              Add a picture of yourself or select a
              <span class="text-primary">preferred emoji</span>. Other users
              will associate this with your account.
            </div>

            <div class="previewMain">
              <form>
                <div class="form">
                  <input
                    type="file"
                    accept="image/*"
                    @change="previewImage"
                    class="previewinput"
                    id="my-file"
                  />

                  <div class="previewDiv">
                    <template v-if="preview">
                      <img :src="preview" class="previewimg" />
                      <img src="/images/click.png" class="click" alt="" />
                    </template>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="right">
            <img src="/images/businessimg.svg" alt="" />
          </div>
        </div>

        <div class="row q-pb-lg items-center justify-between">
          <q-btn
            @click="businessreg = true"
            color="primary"
            class="q-px-xl proceed"
          >
            Proceed
          </q-btn>
          <q-btn
            :to="{
              name: `business.dashboard`,
            }"
            class="q-px-sm skip"
          >
            Skip
          </q-btn>
        </div>

        <div @click="addphotoforleegolubusinessmodal = false" class="close">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
    </q-card>
  </q-dialog>
  <q-dialog v-model="businessreg">
    <q-card style="width: 100%; max-width: 800px">
      <div class="modal two">
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
                  placeholder="Red Dress Co."
                />
              </div>
              <div class="input-box active-grey">
                <label class="input-label">About Business</label>
                <!-- <input
                  type="text"
                  class="input-1"
                  v-model="vendordetails.business_type"
                  placeholder="Fashion Apparel"
                /> -->
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

              <q-btn @click="finish" type="button" color="primary" class="btn"
                >Finish</q-btn
              >
              <div class="clear"></div>
            </form>
          </div>

          <div class="right">
            <img src="/images/businessreg.svg" alt="" />
          </div>
        </div>

        <div @click="businessreg = false" class="close">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      data: { role: "c6f3cebc-2928-4d24-bdc9-41a383fee65c" },
      welcometoleegoluregularmodal: false,
      welcometoleegolubusinessmodal: false,
      preview: "/images/preview.png",
      addphotoforleegoluregularmodal: false,
      addphotoforleegolubusinessmodal: false,
      businessreg: false,
      image: null,
      errors: {},
      countrycode: "+243",
      vendordetails: {
        name: "",
        address: "",
        area: "",
        state: "",
        business_type: "Fashion & Apparel",
      },
      roles: [],
      businessTypes: [],
      loading: false,
      states: [],
      areas: [],
    };
  },

  created() {
    this.getRoles();
    // this.getStates();
    // this.getBusinessTypes();
  },

  methods: {
    previewImage(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    // register() {
    //   if (this.data.bus === "Leegolu Regular") {
    //     this.welcometoleegoluregularmodal = true;
    //   } else {
    //     this.welcometoleegolubusinessmodal = true;
    //   }
    // },

    register() {
      this.loading = true;
      let data = {
        ...this.data,
        phone: this.countrycode + this.data.phone,
      };
      this.$api
        .post("register", data)
        .then((response) => {
          console.log(response);
          // console.log(response);
          this.$store.leegoluauth.userDetails = response.data.user;
          this.$store.leegoluauth.token = response.data.token;
          localStorage.setItem("token", response.data.token);
          this.$helper.notify(response.data.message, "success");
          this.loading = false;
          if (this.$store.leegoluauth.previousRoute === "") {
            if (response.data.user.role[0].name === "business") {
              this.$router.replace({ name: "business.dashboard" });
            } else {
              this.$router.replace({ name: "regular.dashboard" });
            }
          } else {
            this.$router.replace(this.$store.leegoluauth.previousRoute);
          }
          this.$store.leegoluauth.modal = true;
        })
        .catch(({ response }) => {
          // console.log(response);
          this.loading = false;
          // let error = this.$plugins.reader.error(e);
          this.errors = response.data.errors || {};
          // this.$helper.notify(error.message || error, error.status || "error");
        });
    },
    getRoles() {
      this.$api
        .get("roles")
        .then((response) => {
          // console.log(response);å
          let roles = response.data.data;
          console.log(roles);
          this.roles = roles.filter((role) => {
            return role.name === "business" || role.name === "regular";
          });
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },
    getBusinessTypes() {
      this.$api
        .get("business-types")
        .then((response) => {
          console.log(response);
          this.businessTypes = response.data.data;
          this.vendordetails.business_type = response.data.data[0].id;
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },
    getStates() {
      this.$api
        .get("states")
        .then((response) => {
          console.log(response);
          this.states = response.data.data;
          // this.vendordetails.state = response.data.data[0].id;
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },
    getAreas(id) {
      this.$api
        .get(`${id}/areas`)
        .then((response) => {
          console.log(response);
          this.areas = response.data.data;
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
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
        this.$router.replace({ name: "Plans" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,700");

$color: #80868b;
$active-color: #1a73e8;
$error-color: #f44336;
$input-value-color: #202124;
$border-color: 1px solid #dadce0;

$border-color-active: 2px solid $active-color;
$default-background: #fff;

/* Buttons */
$btn-default-bg-color: #fff;
$btn-default-bgh-color: #ddd;
$btn-default-text-color: #333;

$btn-primary-bg-color: #1a73e8;
$btn-primary-bgh-color: #287ae6;
$btn-primary-boxshadow-color: 0 1px 1px 0 rgba(66, 133, 244, 0.45),
  0 1px 3px 1px rgba(66, 133, 244, 0.3);
$btn-primary-text-color: #fff;
.login {
  background: aliceblue;
  padding: 2rem 2rem 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  // padding: 2rem 2rem 5rem;
}

@media (min-width: 1100px) {
  .login {
    height: 100vh;
  }
}
.login_hold {
  background: #ffffff;
  box-shadow: 0px 0px 100px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  max-width: 1000px;
  width: 909px;
  max-height: 631px;
  overflow: hidden;
  margin: 0 auto;
}

.img img {
  width: 100px;
}

.checks {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin: 1rem 0 1rem;
}

.checks .check {
  background: #ffffff;
  border: 1.5px solid #000000;
  border-radius: 6px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  padding: 0.4rem;
  line-height: 100%;
  letter-spacing: -0.01em;
  color: #000000;
}

.side_img {
  // max-width: 298px;
  max-height: 261px;
  margin-top: 1rem;
  object-fit: contain;
}

.checks .notactive {
  background: #ffffff;
  border: 1px solid #b0b0b0;
  border-radius: 6px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  padding: 0.4rem;
  line-height: 100%;
  letter-spacing: -0.01em;
  color: #000000;
}

.sign .head {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  letter-spacing: -0.01em;
  color: #000000;
}

.sign .sub {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 100%;
  letter-spacing: -0.01em;
  color: #000000;
}

.login_wrapper {
  display: flex;
  // grid-template-columns: 1fr 2fr;

  // grid-template-columns: repeat(2, 1fr);
  // gap: 1rem;
  width: 909px;
  padding: 1rem;
  height: 100%;
}
input,
select {
  background: $default-background;
}

input:focus,
select:focus {
  outline: none;
}

.goggle_auth {
  margin-top: 1rem;
}

.goggle_auth .q-btn::before {
  box-shadow: none;
}

.goggle_auth img {
  width: 50%;
}

.left_wrap {
  background: linear-gradient(180deg, #002b60 0%, #357196 100%);
  border-radius: 7px;
  // display: flex;
  // flex-direction: column;
  // justify-content: space-between;
  width: 376px;
  height: 100%;
  padding: 1rem 1.5rem;
}

.middle {
  padding-top: 6rem;
}

.main {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 100%;
  color: #ffffff;
  margin-bottom: 0.7rem;
}
.main span {
  white-space: nowrap;
}
.desc {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 129.5%;
  letter-spacing: -0.01em;
  color: #ffffff;
}

.foot {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
  color: #ffffff;
}

.right {
  padding: 2rem 2.25rem 1rem 3rem;
}

.input-box select {
  position: absolute;
  border: none;
  margin-left: 0.5rem;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: -0.01em;
  color: #000000;
}
.input-box select.reg {
  // all: unset;
  position: unset;
  margin: 0;
}

.phone input {
  padding-left: 4.4rem !important;
}

.wraps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
}
#form {
  margin: 0 auto;
}
.input-box.active-grey {
  .input-1,
  select.reg {
    border: 1.5px solid #9d9d9d;
  }
  select.reg {
    width: 100%;
  }
  .input-label {
    color: $color;
    top: -8px;
    background: $default-background;
    font-size: 11px;

    transition: 250ms;
  }
}

.wraps .input-box {
  margin: 0;
}
.input-box {
  position: relative;
  margin: 25px 0;
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
  select.reg {
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
.input-box.error {
  .input-label {
    color: $error-color;
    top: -8px;
    background: $default-background;
    font-size: 11px;
    transition: 250ms;
  }
  .input-1 {
    border: 2px solid $error-color;
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
.btn {
  background: $btn-default-bg-color;
  color: $btn-default-text-color;
  cursor: pointer;
  border: none;
  white-space: normal;
  letter-spacing: 0.25px;
  font-weight: 400;
  font-size: 14px;
  padding: 13px;
  border-radius: 4px;
  line-height: 20px;
  min-width: 88px;
  transition: 250ms;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    background: $btn-default-bgh-color;
    transition: 250ms;
  }
  &:focus {
    outline: none;
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

// modal

.modal {
  padding: 0rem 3rem 0;
  position: relative;
}
.modal_wrap {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  align-items: center;
  margin-bottom: 1rem;
}

.modal .right {
  padding-top: 0;
  width: 90%;
}

.modal_main {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 44px;
  color: #000000;
  padding-top: 1rem;
}

.modal_main_text {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
  white-space: nowrap;
  color: #000000;
}

.modal_sub_text {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  margin: 1.5rem 0;
  color: #000000;
}
.modal.two .modal_sub_text {
  margin: 0.1rem 0;
}

.modal ul li {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: #000000;
  margin: 0.6rem 0;
}
.modal ul li i {
  color: green;
  font-size: 1.2rem;
}

.modal .skip {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #1f7bb5;
  background: #ffffff;
  border: 2px solid #b0b0b0;
  border-radius: 5px;
  width: 103px;
  height: 46px;
}
.modal .proceed {
  background: #1f7bb5;
  border-radius: 5px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  width: 199px;
  height: 33.73px;
}

.modal .close i {
  color: #b1b1b1;
  font-size: 1.5rem;
  position: absolute;
  top: 2%;
  right: 2%;
}

//preview
.previewMain {
  width: fit-content;
}
.previewDiv {
  position: relative;
}

.previewDiv .click {
  position: absolute;
  left: 30%;
  top: 27%;
}

.form {
  margin-top: 1rem;
  position: relative;
}
.form img.previewimg {
  width: 184px;
  height: 184px;
  border: 5px solid rgba(53, 113, 150, 0.26);
  border-radius: 104.5px;
}
.form img.click {
  width: 70px;
}

.previewinput {
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 100%;
  background: transparent;
  opacity: 0;
}

@media (max-width: 1000px) {
  .login_wrapper,
  .login_hold {
    width: 100%;
  }

  .right {
    padding: 3rem 1rem 1rem 2rem;
  }
}
@media (max-width: 820px) {
  .login_wrapper {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }
  .login {
    padding: 1rem;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }
  .left.side {
    display: none;
  }

  .modal .right img {
    display: none;
  }

  .right {
    padding: 1.5rem 1rem 1rem 2rem;
  }

  .modal_main {
    font-size: 25px;
  }
  .modal {
    padding: 0rem 1rem 0;
  }

  .modal_sub_text {
    font-size: 14px;
  }

  .modal_sub_text .q-btn {
    font-size: 11px;
    margin-top: 0.5rem;
  }
  .modal .close i {
    right: 4%;
  }

  .modal_wrap {
    gap: 0rem;
    padding: 2rem 0;
    grid-template-columns: 1fr;
  }

  .btn {
    margin-top: 2rem;
  }
}
@media (max-width: 500px) {
  .modal .skip {
    width: auto;
  }
  .modal .proceed {
    width: auto;
  }

  .modal_main_text {
    font-size: 20px;
  }

  .right {
    padding: 2rem 1rem 1rem;
  }
}
</style>
