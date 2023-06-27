<template>
  <div v-if="showSuccess" class="holde">
    <SuccessVue
      :title="`${message}`"
      :desc="`Your ${message} was successful.`"
    />
  </div>
  <q-card class="ratings_vendor">
    <div class="ratings_section">
      <div class="owner">
        <div class="owner_left">
          <img src="/images/usersvg.svg" alt="" />
        </div>
        <div class="owner_right">
          <p class="owner_title">
            <!-- {{ productData }} -->
            {{ productData.vendor.business_name }}
            <!-- <span> | 7 Months</span> -->
          </p>

          <div class="ratings_area">
            <span class="rating_main_text">4.0</span>
            <q-rating
              v-model="ratingModel"
              size="1em"
              :max="5"
              color="secondary"
            />
            <span class="ratings_subtext">
              (2345)
              <q-btn push flat class="addRating" icon="add">
                <q-popup-proxy v-model="popup">
                  <q-banner class="ratingBanner">
                    <div class="ratings_secs">
                      <div class="ratings_btns">
                        <q-btn
                          @click="selectRatingorReview('add ratings')"
                          :class="selectedOne === 'add ratings' ? 'active' : ''"
                        >
                          Add Ratings
                        </q-btn>
                        <q-btn
                          :class="selectedOne !== 'add ratings' ? 'active' : ''"
                          @click="selectRatingorReview('review')"
                        >
                          Add Reviews
                        </q-btn>
                      </div>
                    </div>
                    <!-- <div class="q-mb-xs">Add Rating</div> -->
                    <div class="q-mt-md" v-if="selectedOne === 'add ratings'">
                      <q-rating
                        v-model="rating"
                        size="2.3em"
                        :max="5"
                        color="primary"
                      />
                    </div>
                    <div v-else>
                      <q-input
                        style="font-size: 10px"
                        v-model="text"
                        label="Add review"
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
                      Submit
                    </q-btn>
                  </q-banner>
                </q-popup-proxy>
              </q-btn>
            </span>
          </div>
        </div>
      </div>

      <div class="ratings_secs">
        <div class="ratings_btns">
          <div class="ratings_btnn">
            <q-btn class="active"> Most Relevant </q-btn>
            <q-btn> Highest </q-btn>
            <q-btn> Lowest </q-btn>
            <q-btn> Recent </q-btn>
          </div>
          <q-btn push flat class="addBtn">
            <span>Add<i class="fa-solid q-ml-xs fa-add"></i></span>
            <q-popup-proxy v-model="popup">
              <q-banner class="ratingBanner">
                <div class="ratings_secs">
                  <div class="ratings_btns">
                    <q-btn
                      @click="selectRatingorReview('add ratings')"
                      :class="selectedOne === 'add ratings' ? 'active' : ''"
                    >
                      Add Ratings
                    </q-btn>
                    <q-btn
                      :class="selectedOne !== 'add ratings' ? 'active' : ''"
                      @click="selectRatingorReview('review')"
                    >
                      Add Reviews
                    </q-btn>
                  </div>
                </div>
                <!-- <div class="q-mb-xs">Add Rating</div> -->
                <div class="q-mt-md" v-if="selectedOne === 'add ratings'">
                  <q-rating
                    v-model="rating"
                    size="2.3em"
                    :max="5"
                    color="primary"
                  />
                </div>
                <div v-else>
                  <q-input
                    style="font-size: 10px"
                    v-model="text"
                    label="Add review"
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
                  Submit
                </q-btn>
              </q-banner>
            </q-popup-proxy>
          </q-btn>
        </div>
      </div>

      <div class="ratings_main">
        <div class="ratings_card">
          <div class="ratings_card_left">
            <img src="/images/usersvg.svg" alt="" />
          </div>

          <div class="ratings_card_right">
            <div class="ratings_persons_name">Michael Nnamani</div>
            <div
              style="gap: 0.5rem"
              class="ratings_stars row items-end no-wrap"
            >
              <q-rating
                v-model="ratingModel"
                size="1em"
                :max="4"
                color="secondary"
              />
              <span>1 Week ago</span>
            </div>

            <div class="ratings_desc">
              I ordered two shirts and I love the fact that they were made with
              quality materials and fit me perfectly. Definitely ordering more
              soon.
            </div>
          </div>
        </div>
        <div class="ratings_card">
          <div class="ratings_card_left">
            <img src="/images/usersvg.svg" alt="" />
          </div>

          <div class="ratings_card_right">
            <div class="ratings_persons_name">Michael Nnamani</div>
            <div
              style="gap: 0.5rem"
              class="ratings_stars row items-end no-wrap"
            >
              <q-rating
                v-model="ratingModel"
                size="1em"
                :max="4"
                color="secondary"
              />
              <span>1 Week ago</span>
            </div>

            <div class="ratings_desc">
              I ordered two shirts and I love the fact that they were made with
              quality materials and fit me perfectly. Definitely ordering more
              soon.
            </div>
          </div>
        </div>

        <q-btn class="close" @click="closeModal" flat icon="close" />
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
  data() {
    return {
      // product: {},
      loading: false,
      popup: false,
      text: "",
      showSuccess: false,
      message: "",
    };
  },

  components: {
    SuccessVue,
  },

  props: ["productData"],

  methods: {
    selectRatingorReview(arg) {
      this.selectedOne = arg;
    },
    closeModal() {
      // console.log("first clicked");
      this.$emit("closeModalRatings");
    },

    rate() {
      // console.log(this.productData);

      this.loading = true;

      if (this.selectedOne === "add ratings") {
        this.$api
          .post(`${this.productData.data.id}/rating`, {
            rating: this.rating,
          })
          .then((response) => {
            this.loading = false;
            this.$q.notify({
              message: response.data.message,
              color: "green",
            });
            console.log(response);
            this.message = "Your ratings was successful";
            this.showSuccess = true;
            this.popup = false;
            this.rating = 0;
          })
          .catch(({ response }) => {
            this.loading = false;
            this.$q.notify({
              message: response.data.message,
              color: "green",
            });
            this.errors = error.errors || {};
          });
      } else {
        this.$api
          .post(`${this.productData.data.slug}/review/create`, {
            review: this.text,
          })
          .then((response) => {
            this.loading = false;
            this.$q.notify({
              message: response.data.message,
              color: "green",
            });
            console.log(response);
            this.message = "Your review was successful";
            this.showSuccess = true;
            this.popup = false;

            // this.rating = 0;
            this.text = "";
          })
          .catch(({ response }) => {
            this.loading = false;
            this.$q.notify({
              message: response.data.message,
              color: "green",
            });
            this.errors = error.errors || {};
          });
      }
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
}

.ratings_vendor {
  position: relative;
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
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.2rem;
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

hr {
  background: #b0b0b0;
}

.ratings_btns {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 0.5rem;
  /* margin: 0rem 0 1rem; */
  padding: 0.5rem 1.2rem 0.5rem;
  justify-content: space-between;
  border: 1px solid #dfdfdf;
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
  margin: 1rem auto 0.5rem;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  width: 90%;
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
  gap: 0.5rem;
  padding: 1rem 1rem 0.5rem;
  border-bottom: 1px solid #dfdfdf;
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
}
</style>
