<template>
  <div class="login q-pt-xl">
    <div class="login_wrapper">
      <div class="left">
        <div class="left_wrap">
          <div class="img">
            <img src="/images/leee.png" alt="" />
          </div>
          <div class="middle">
            <div class="main">Join the newest online market</div>

            <div class="desc">
              Thousands of users within Africa are experiencing the new to buy &
              sell online.
            </div>
          </div>
          <div class="foot">HTML 5 ANIMATION</div>
        </div>
      </div>

      <div class="right">
        <div class="sign">
          <div class="head q-mb-sm">Sign up</div>

          <div class="sub">
            Have an account?
            <router-link to="/login" class="text-black text-weight-bold"
              >Login
            </router-link>
          </div>
        </div>

        <div class="checks">
          <div :class="data.bus === 'Leegolu Regular' ? 'check' : 'notactive'">
            <q-radio
              v-model="data.bus"
              val="Leegolu Regular"
              label="Leegolu Regular"
            />
          </div>
          <div :class="data.bus === 'Leegolu Business' ? 'check' : 'notactive'">
            <q-radio
              v-model="data.bus"
              val="Leegolu Business"
              label="Leegolu Business"
            />
          </div>
        </div>
        <form id="form">
          <div class="input-box active-grey">
            <label class="input-label">Username</label>
            <input type="text" class="input-1" placeholder="John Doe" />
          </div>
          <div class="input-box active-grey">
            <label class="input-label">Email Address</label>
            <input
              type="text"
              class="input-1"
              placeholder="johndoe@gmail.com"
            />
          </div>
          <div class="input-box active-grey">
            <label class="input-label">Phone Number</label>
            <div class="row no-wrap phone items-center">
              <select name="" id="">
                <option value="+243">+243</option>
                <option value="+243">+243</option>
                <option value="+243">+243</option>
              </select>
              <input type="text" class="input-1" placeholder="07060870483" />
            </div>
          </div>

          <div class="input-box active-grey">
            <label class="input-label">Password</label>
            <input type="text" class="input-1" placeholder="*******" />
          </div>

          <q-btn
            @click="modal = true"
            type="button"
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

  <q-dialog v-model="modal">
    <q-card style="width: 100%; max-width: 80vw">
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
          <q-btn @click="toggleModals" color="primary" class="q-px-xl proceed">
            Proceed
          </q-btn>
          <q-btn class="q-px-sm skip"> Skip </q-btn>
        </div>

        <div @click="modal = false" class="close">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
    </q-card>
  </q-dialog>
  <q-dialog v-model="modaltwo">
    <q-card style="width: 100%; max-width: 85vw">
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
            <img src="/images/rocket.png" alt="" />
          </div>
        </div>

        <div class="row q-pb-lg items-center justify-between">
          <q-btn
            :to="{
              name: `${
                data.bus === 'Leegolu Regular'
                  ? 'regular.dashboard'
                  : 'business.dashboard'
              }`,
            }"
            color="primary"
            class="q-px-xl proceed"
          >
            Proceed
          </q-btn>
          <q-btn
            :to="{
              name: `${
                data.bus === 'Leegolu Regular'
                  ? 'regular.dashboard'
                  : 'business.dashboard'
              }`,
            }"
            class="q-px-sm skip"
          >
            Skip
          </q-btn>
        </div>

        <div @click="modaltwo = false" class="close">
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
      data: { bus: "Leegolu Regular" },
      modal: false,
      modaltwo: false,
      preview: "/images/preview.png",
      image: null,
    };
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

    toggleModals() {
      this.modal = false;
      this.modaltwo = true;
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
  background: #fff;
  height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.img img {
  width: 100px;
}

.checks {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin: 2rem 0 1rem;
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  height: 100%;
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

.left_wrap {
  background: linear-gradient(180deg, #002b60 0%, #357196 100%);
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  padding: 1rem;
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
  padding-top: 2rem;
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

.phone input {
  padding-left: 4.4rem !important;
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
}

.modal_main_text {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
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
</style>
