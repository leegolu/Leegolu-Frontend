<template>
  <div v-if="show" class="hold">
    <div style="gap: 1rem" class="head row items-center no-wrap">
      <div class="left">
        <img src="/images/success.png" alt="" />
      </div>
      <div class="details">
        <div class="why_title">{{ title }}</div>
        <div class="why_desc">{{ desc }}</div>

        <div class="q-mt-lg">
          <q-btn @click="handleShow" class="visit" flat
            >{{ "Return" }} <img src="/images/bluearrow.svg" alt=""
          /></q-btn>
        </div>
      </div>

      <q-btn @click="handleShow" flat class="menu_bar_btn"
        ><img src="/images/close.svg" alt=""
      /></q-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ["play", "title", "desc"],
  data() {
    return {
      show: true,
    };
  },

  // mounted() {
  //   console.log(this.$router.currentRoute.value.query);
  // },

  methods: {
    handleShow() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.hold {
  width: 95%;
  margin: 1rem auto 0;
  max-width: 445px;
  border-radius: 8px;
  background: #fff;
  // box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
}
.head {
  background: #ffffff;
  // box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  width: 100%;
  padding: 0.5rem;
  position: relative;
  height: 147px;
}

.left {
  // background: linear-gradient(180deg, #0f476a 0%, #1f7bb5 100%);
  border-radius: 12px;
  position: relative;
  // height: 100%;
}

.left .play {
  position: absolute;
  top: 50%;
  width: 39.54px;
  height: 39.62px;
  left: 50%;
  transform: translate(-50%, -50%);
}
.why_title {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  color: #000000;
}
.why_desc {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
  // max-width: 65%;
}

img {
  width: 72px;
  height: 72px;
}

.menu_bar_btn {
  position: absolute;
  right: -1%;
  top: -1%;
}

.menu_bar_btn img {
  width: 13px;
  height: 12px;
}

.visit {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  text-transform: capitalize;
  color: #1f7bb5;
  padding: 0;
  min-height: auto;
}
.visit img {
  // width: 6.67px;
  // height: 3.34px;
  width: 10.67px;
  height: 7.34px;
}

@media (max-width: 500px) {
  .why_title {
    font-size: 14px;
  }
  .why_desc {
    font-size: 10px;
    max-width: 80%;
    line-height: 1.3;
  }
  .head {
    height: 117px;
    gap: 0.5rem !important;
  }

  .hold {
    width: 80%;
  }

  .visit {
    font-family: "Open Sans";
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 16px;
    text-transform: capitalize;
    color: #1f7bb5;
    padding: 0;
    min-height: auto;
  }

  .q-mt-lg {
    margin-top: 10px;
  }

  img {
    width: 42px;
    height: 40px;
    object-fit: contain;
  }

  .left {
    border-radius: 12px;
    position: relative;
    // height: 100%;
  }
}
</style>
