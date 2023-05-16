<template>
  <div class="card">
    <div class="img_wrap">
      <img src="/images/plancircle.png" alt="" />
      <img :src="`/images/sellerplan.png`" alt="" />
      <!-- <img :src="`/images/${plan.img}`" alt="" /> -->
    </div>
    <div class="title">{{ plan.name }}</div>
    <div class="amount">
      {{ plan.price }}
      <br />
      <div class="small">Per month</div>
    </div>

    <div class="options">
      <ul>
        <li>
          <i class="fa-solid q-mr-sm text-green fa-check"></i>
          10 Listings
        </li>
        <li>
          <i class="fa-solid q-mr-sm text-green fa-check"></i>
          Custom Domain
        </li>
      </ul>
      <!-- <ul>
        <li v-for="(option, index) in plan.description" :key="index">
          <i class="fa-solid q-mr-sm text-green fa-check"></i>
          {{ option }}
        </li>
      </ul> -->
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
          <div class="amount">{{ plan.price }}</div>

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
          <div class="input-box active-grey">
            <label class="input-label">Duration</label>
            <select name="" id="">
              <option value="+243">1 Month</option>
              <!-- <option value="+243">1 Month</option>
              <option value="+243">1 Month</option> -->
            </select>
          </div>

          <div class="boost">
            <q-btn :loading="loading" @click="onboardVendor">Proceed</q-btn>
          </div>

          <q-btn @click="dialogCreate = false" class="close">
            <i class="fa-solid fa-xmark"></i>
          </q-btn>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: ["plan"],
  data() {
    return {
      dialogCreate: false,
      loading: false,
      errors: {},
      vendordetails: {},
    };
  },
  methods: {
    proceed() {
      this.dialogCreate = true;
    },

    onboardVendor() {
      this.loading = true;
      if (this.errors.name) {
        let data = {
          ...this.$store.leegoluauth.vendorDetails,
          plan: this.plan.id,
          name: this.vendordetails.name,
        };

        this.$api
          .post("onboarding", data)
          .then((response) => {
            console.log(response);
            this.$helper.notify(response.data.message, "success");
            this.$router.replace({ name: "business.dashboard" });
            this.loading = false;
          })
          .catch(({ response }) => {
            console.log(response);
            this.loading = false;
            this.errors = response.data.errors || {};
          });
      } else {
        let data = {
          ...this.$store.leegoluauth.vendorDetails,
          plan: this.plan.id,
        };
        this.$api
          .post("onboarding", data)
          .then((response) => {
            console.log(response);
            this.$helper.notify(response.data.message, "success");
            this.$router.replace({ name: "business.dashboard" });
            this.loading = false;
          })
          .catch(({ response }) => {
            console.log(response);
            this.loading = false;
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
  padding: 1rem;
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
</style>
