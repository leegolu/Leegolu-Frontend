<template>
  <div v-if="showSuccess" class="holde">
    <SuccessVue :title="`${message}`" :desc="`Your ${message}.`" />
  </div>
  <q-card class="ratings_vendor">
    <div class="ratings_section">
      <div class="owner">
        <div class="owner_left">
          <img src="/images/usersvg.svg" alt="" />
        </div>
        <div class="owner_right full-width">
          <p class="owner_title">
            <!-- {{ vendor }} -->
            {{ shopData.business_name }}
          </p>

          <div class="ratings_area">
            <div class="">
              <q-rating
                v-model="rating"
                size="1.5em"
                :max="5"
                color="primary"
              />
            </div>
            <q-btn
              color="white"
              @click="rate"
              no-caps
              :loading="loading"
              class="bg-primary q-mt-md"
              flat
            >
              Add rating
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
import { ref } from "vue";
import SuccessVue from "./Success.vue";
export default {
  setup() {
    return {
      ratingModel: ref(4),
      rating: ref(0),
      selectedOne: ref("add ratings"),
    };
  },
  emits: ["closeModalRatings"],
  data() {
    return {
      // product: {},
      loading: false,
      popup: false,
      text: "",
      showSuccess: false,
      message: "",
      deleteloading: false,
    };
  },

  components: {
    SuccessVue,
  },

  props: ["shopData"],

  methods: {
    selectRatingorReview(arg) {
      this.selectedOne = arg;
    },
    closeModal() {
      // console.log("first clicked");
      this.$emit("closeModalRatings");
    },

    rate() {
      this.loading = true;
      this.$api
        .post(`${this.shopData.id}/shop/rate`, {
          rating: this.rating,
        })
        .then((response) => {
          this.loading = false;
          this.$q.notify({
            message: response.data.message,
            color: "green",
          });
          console.log(response);

          this.rating = 0;
          this.$emit("closeModalRatings");
          // this.$emit("getP");

          this.message = "Your ratings was successful";
          this.showSuccess = true;
          this.popup = false;
        })
        .catch(({ response }) => {
          this.loading = false;
          this.$q.notify({
            message: response.data.message,
            color: "green",
          });
          this.errors = error.errors || {};
        });
    },
  },
};
</script>

<style scoped>
p {
  margin-bottom: 0;
}
.owner {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem 0.5rem;
}

.holde {
  position: absolute;
  top: 2%;
  left: 0;
  z-index: 3;
}

.ratings_vendor {
  position: relative;
}

@media (min-width: 500px) {
  .ratings_vendor {
    min-width: 350px;
  }
}

.ratings_vendor .close {
  position: absolute;
  top: 1%;
  right: 1%;
  opacity: 0.5;
}

.owner_left {
  padding-top: 0.5rem;
}

.rating_main_text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-transform: capitalize;

  color: #000000;
}

.owner_left img {
  width: 51.24px;
  height: 51.24px;
  border-radius: 50%;
}

p.owner_title {
  font-family: "Inter";
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-transform: capitalize;
  color: #000000;
}
p.owner_title span {
  font-family: "Inter";
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  text-transform: capitalize;
  color: #9d9d9d;
  margin-left: 0.5rem;
}

.owner .ratings_area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.owner .ratings_area .ratings_main_text {
  font-weight: 700;
  font-size: 11px;
  line-height: 13px;
  text-transform: capitalize;
  color: #000000;
}
.owner .ratings_area .ratings_subtext {
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  text-transform: capitalize;
  color: #9d9d9d;
  position: relative;
}
.owner .ratings_area .ratings_subtext .addRating {
  position: absolute;
  min-height: auto;
  padding: 0;
  top: -75%;
  font-size: 8px;
  background: #1f7bb5;
  color: #fff;
}

.addRatingbiger {
  position: absolute;
  bottom: 1%;
  right: 1%;
  background: #1f7bb5;
  color: #fff;
  padding: 5px;
}

.ratings_main {
  max-height: 160px;
  overflow-y: scroll;
}

hr {
  background: #b0b0b0;
}

.ratings_btns {
  display: flex;
  gap: 1rem;
  align-items: center;
  /* padding: 0.5rem; */
  /* margin: 0rem 0 1rem; */
  /* padding: 0.5rem 1.2rem 0.5rem; */
  justify-content: space-between;
  /* border: 1px solid #dfdfdf; */
}
.ratings_btns::-webkit-scrollbar {
  display: none;
}

.ratings_btns .addBtn {
  white-space: nowrap;
  flex-wrap: nowrap;
  padding: 5px;
  border: 1px solid #1f7bb5;
}

.ratings_btns .addBtn span.row {
  white-space: nowrap;
  flex-wrap: nowrap;
}

.ratings_btnn {
  display: flex;
  align-items: center;
  overflow-x: scroll;
}
.ratings_btnn::-webkit-scrollbar {
  display: none;
}

.ratingBanner .ratings_btns {
  padding: 0.5rem 0.3rem 0.5rem;
  border: none;
  padding-bottom: 0.8rem;
  /* border-bottom: 1px solid #dfdfdf; */
}

.ratings_btns .q-btn {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  white-space: nowrap;
  text-align: center;
  color: #666666;
  text-transform: capitalize;
}

.ratings_btns .q-btn.active {
  background: #1f7bb5;
  border-radius: 12px;
  color: #fff;
  white-space: nowrap;
}

.ratings_desc {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #000000;
  padding: 0.7rem 0rem 0.2rem;
}

.bg-primary {
  margin: 0rem 0 0.5rem;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;

  color: #ffffff;
  width: fit-content;
  height: 30px;
  text-transform: capitalize;
  border-radius: 5px;
  background: #1f7bb5;
}

.ratings_persons_name {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: #000000;
}

.ratings_card {
  display: flex;
  align-items: flex-start;
  position: relative;
  gap: 0.5rem;
  padding: 1rem 1rem 0.5rem;
  border-bottom: 1px solid #dfdfdf;
}
.detele {
  position: absolute;
  top: 12%;
  right: 0;
  color: #ee4e36;
}
.ratings_card span {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  text-transform: lowercase;
  color: #9d9d9d;
}

.ratings_card img {
  width: 37px;
  height: 37px;
  border-radius: 26.5px;
}

@media (max-width: 500px) {
  .ratings_btns {
    /* width: 90%; */
    overflow-x: scroll;
  }

  .detele {
    font-size: 9px !important;
  }

  .holde {
    top: 10%;
    left: -9%;
  }
}
</style>
