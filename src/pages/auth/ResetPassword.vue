<template>
  <q-layout class="page_">
    <div class="login q-pt-xl">
      <div class="login_wrapper">
        <div class="right">
          <div class="sign">
            <div class="head q-mb-sm">Password Reset</div>

            <div class="sub">
              Please enter your registered email or phone number.
            </div>
          </div>

          <form id="form">
            <div class="input-box active-grey">
              <label class="input-label">Email Address</label>
              <input
                type="text"
                class="input-1"
                placeholder="johndoe@gmail.com"
              />
            </div>

            <div
              class="row q-mt-lg items-center justify-end no-wrap q-col-gutter-x-md"
            >
              <q-btn :to="{ name: 'login' }" type="button" color="" class="btn"
                >Cancel</q-btn
              >
              <q-btn
                :to="{ name: 'checkmail' }"
                type="button"
                color="secondary"
                class="btn"
                >Proceed</q-btn
              >
              <!-- <div class="clear"></div> -->
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
      data: { bus: "Leegolu Regular" },
    };
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

input {
  background: $default-background;
}

.login_wrapper {
  width: 100%;
  display: grid;
  place-items: center;
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
  // background: $btn-default-bg-color;
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
  margin: 0 0.5rem;
  width: 116px;
  height: 42px;
  background: #9a9a9a;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>
