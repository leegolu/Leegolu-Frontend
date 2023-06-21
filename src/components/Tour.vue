<template>
  <div v-if="show" class="hold">
    <div style="gap: 1rem" class="head row items-center no-wrap">
      <div class="left">
        <img src="/images/shop.svg" alt="" />
        <img v-if="play" class="play" src="/images/play.svg" alt="" />
      </div>
      <div class="details">
        <div class="why_title">{{ title }}</div>
        <div class="why_desc">{{ desc }}</div>

        <div class="q-mt-lg">
          <q-btn class="visit" flat
            >{{ !play ? "View your dashboard" : "Take a tour" }}
            <img src="/images/bluearrow.svg" alt=""
          /></q-btn>
        </div>
      </div>

      <q-btn @click="show = false" flat class="menu_bar_btn"
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
};
</script>

<style lang="scss" scoped>
.hold {
  width: 95%;
  margin: 1rem auto 0;
}
.head {
  background: #ffffff;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  width: fit-content;
  padding: 0.5rem;
  position: relative;
  height: 147px;
}

.left {
  background: linear-gradient(180deg, #0f476a 0%, #1f7bb5 100%);
  border-radius: 12px;
  position: relative;
  height: 100%;
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
  max-width: 65%;
}

img {
  width: 162px;
  height: 100%;
}

.menu_bar_btn {
  position: absolute;
  right: -2%;
  top: -2%;
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
  width: 6.67px;
  height: 3.34px;
}

@media (max-width: 500px) {
  .why_title {
    font-size: 15px;
  }
  .why_desc {
    font-size: 11px;
    max-width: 85%;
  }

  img {
    width: 122px;
    height: 100%;
  }

  .left .play {
    width: 29.54px;
    height: 29.62px;
  }
}
</style>
