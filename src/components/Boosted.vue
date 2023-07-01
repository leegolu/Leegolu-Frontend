<template>
  <div v-if="show" class="hold">
    <div style="gap: 1rem" class="head row no-wrap">
      <div class="left">
        <img class="main_img" :src="product.uploads[0].url" alt="" />
        <!-- <img class="play" src="/images/play.svg" alt="" /> -->
      </div>
      <div class="details">
        <div class="why_title">Boosted</div>
        <div class="why_desc">This listing is currently being promoted.</div>

        <div class="q-mt-lg">
          <div class="visit">{{ product.name }}....</div>
        </div>
      </div>

      <q-btn @click="show = false" flat class="menu_bar_btn">
        <img src="/images/closeblack.svg" alt="" />
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

  props: ["product"],
};
</script>

<style lang="scss" scoped>
.hold {
  width: 95%;
  margin: 1rem auto 0;
}
.head {
  padding: 0.5rem;
  position: relative;
  height: 147px;
  background: #ffffff;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
}

.left {
  // background: linear-gradient(180deg, #0F476A 0%, #1F7BB5 100%);
  border-radius: 12px;
  position: relative;
}

.left .main_img {
  border-radius: 12px;
  height: 100%;
}

.details {
  padding-top: 0.5rem;
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
  max-width: 90%;
  // margin: 0 auto;
}

img {
  width: 83.19px;
  height: 100%;
  object-fit: cover;
}

.menu_bar_btn {
  position: absolute;
  right: -3%;
  top: -3%;
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

  color: #1f7bb5;
}
.visit img {
  width: 6.67px;
  height: 3.34px;
}

@media (max-width: 900px) {
  .boosted {
    top: -60%;
    left: -5%;
  }
}
@media (max-width: 500px) {
  .boosted {
    top: -20%;
    left: -6%;
  }
}
</style>
