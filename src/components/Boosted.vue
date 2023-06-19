<template>
  <div v-if="show">
    <div style="gap: 1rem" class="head row items-center no-wrap">
      <div class="left">
        <img class="main_img" src="/images/shop.svg" alt="" />
        <img class="play" src="/images/play.svg" alt="" />
      </div>
      <div class="details">
        <div class="why_title">You have an order in progress</div>
        <div class="why_desc">A delivery agent will contact you shortly</div>

        <div class="q-mt-lg">
          <q-btn class="visit" flat
            >View your dashboard <img src="/images/bluearrow.svg" alt=""
          /></q-btn>
        </div>
      </div>

      <q-btn @click="show = false" flat class="menu_bar_btn" color="primary">
        <img src="/images/close.svg" alt="" />
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.head {
  background: #e3fff0;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2),
    inset 0px -1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  width: fit-content;
  padding: 1rem 7rem 1rem 0.5rem;
  position: relative;
  height: 105px;
}

.left {
  // background: linear-gradient(180deg, #0F476A 0%, #1F7BB5 100%);
  border-radius: 12px;
  position: relative;
}

.left .main_img {
  border-radius: 12px;
}

.left .play {
  position: absolute;
  top: 50%;
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
}

img {
  width: 59px;
  height: 59px;
}

.menu_bar_btn {
  position: absolute;
  right: 2%;
  top: 2%;
}

.menu_bar_btn .q-btn img {
  width: 13px;
  height: 12px;
}

.visit {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;

  color: #1f7bb5;
}
.visit img {
  width: 6.67px;
  height: 3.34px;
}

@media (max-width: 500px) {
  .why_title {
    font-size: 14px;
  }
  .why_desc {
    font-size: 12px;
  }
}
</style>
