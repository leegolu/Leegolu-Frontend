<template>
  <q-card>
    <div class="videoCard">
      <q-video
        :ratio="16 / 9"
        src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0"
      />
    </div>
  </q-card>
</template>

<script>
export default {
  // methods: {
  //   closeModal() {
  //     this.$emit("closeModal");
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.q-card {
  max-width: 300px;
  // height: 100%;
  width: 100%;
  // max-height: 400px;
}

.videoCard {
  width: 100%;
  height: 100%;
}
</style>
