<template>
  <q-layout class="page_">
    <q-header class="bg-white non_header q-py-sm q-px-sm">
      <q-btn to="/" flat no-caps no-wrap class="q-ml-xs logo">
        <img src="/images/logored.png" alt="" />
      </q-btn>
    </q-header>
    <div class="login q-pt-xl">
      <div class="login_wrapper">
        <div class="right">
          <div class="sign">
            <div class="head q-mb-sm">Login</div>

            <div class="sub">
              Don’t have an account?
              <router-link
                :to="{ name: 'register' }"
                class="text-black text-weight-bold"
                >Sign Up</router-link
              >
            </div>
          </div>

          <!-- {{ errors }} -->

          <form @submit.prevent="login" id="form">
            <div class="input-box active-grey">
              <label class="input-label">Email Address</label>
              <input
                type="text"
                class="input-1"
                required
                name="email"
                v-model="data.email"
                placeholder="johndoe@gmail.com"
              />
              <small v-if="errors.email" class="text-red text-weight-bold">
                {{ errors.email[0] }}
              </small>
            </div>

            <div class="password">
              <div class="input-box active-grey">
                <label class="input-label">Password</label>
                <input
                  v-model="data.password"
                  type="password"
                  name="password"
                  required
                  class="input-1"
                  placeholder="*******"
                />
                <small v-if="errors.password" class="text-red text-weight-bold">
                  {{ errors.password[0] }}
                </small>
              </div>
              <q-btn
                flat
                :to="{ name: 'reset.password' }"
                class="text-weight-bold"
                >Forgot your password?</q-btn
              >
            </div>

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
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      errors: {},
      countrycode: "+243",
      loading: false,
    };
  },

  methods: {
    login() {
      this.loading = true;
      this.$api
        .post("login", this.data)
        .then((response) => {
          console.log(response);
          this.loading = false;
          this.$store.leegoluauth.setUserDetails(response.data);
          this.$store.leegoluauth.userDetails = response.data.user;
          this.$store.leegoluauth.vendorDetails = response.data.vendor;
          this.$store.leegoluauth.token = response.data.token;
          localStorage.setItem("token", response.data.token);
          this.$store.leegoluauth.modal = false;

          this.$helper.notify(response.data.message, "success");
          if (this.$store.leegoluauth.previousRoute === "") {
            if (response.data.user.role[0].name === "business") {
              this.$router.replace({ name: "business.dashboard" });
            } else {
              this.$router.replace({ name: "regular.dashboard" });
            }
          } else {
            this.$router.replace(this.$store.leegoluauth.previousRoute);
          }

          // this.$router.replace({ name: "business.dashboard" });
        })
        .catch(({ response }) => {
          this.loading = false;
          // let error = this.$plugins.reader.error(e);
          this.errors = response.data.errors || {};
          // this.errors = error.errors || {};
          this.$q.notify({
            message: response.data.message,
            color: "red",
            position: "top",
            actions: [{ icon: "close", color: "white" }],
          });
        });
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
  height: 100vh;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  place-items: center;
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

.password .q-btn {
  padding: 0;
  min-height: 0;
  text-transform: capitalize;
}

.login_wrapper {
  height: auto !important;
  width: auto !important;
}

input {
  background: $default-background;
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

.right {
  padding: 2rem;
  background: #ffffff;
  box-shadow: 0px 0px 100px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

#form {
  margin: 0 auto;
}
.input-box.active-grey {
  .input-1 {
    border: 1.5px solid #c2bfbf;
  }
  .input-label {
    color: $color;
    top: -8px;
    background: $default-background;
    font-size: 11px;

    transition: 250ms;

    svg {
      position: relative;
      width: 11px;
      height: 11px;
      top: 2px;
      transition: 250ms;
    }
  }
}

.input-box {
  position: relative;
  margin: 35px 0;
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
    svg {
      position: relative;
      width: 15px;
      height: 15px;
      top: 2px;
      transition: 250ms;
    }
  }
  .input-1 {
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
.password .input-box {
  margin: 35px 0 10px;
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

    svg {
      position: relative;
      width: 11px;
      height: 11px;
      top: 2px;
      transition: 250ms;
    }
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
  margin-top: 2rem;

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

@media (max-width: 500px) {
  .login {
    padding: 1rem;
  }
  .right {
    padding: 1rem;
  }
}
</style>
