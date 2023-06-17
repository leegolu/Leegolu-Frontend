<template>
  <q-card class="ratings_vendor">
    <div class="ratings_section">
      <div class="owner">
        <div class="owner_left">
          <img
            src="
             https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTglXGZjjb4pIhLFesgiwB416bLsr2WPuguUNFkaPUSei78Og-iIiINQFvBdopWxNY2yhk&usqp=CAU"
            alt=""
          />
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
              size="1.5em"
              :max="4"
              color="secondary"
            />
            <span class="ratings_subtext"> (2345) </span>
          </div>
        </div>
      </div>

      <div class="ratings_secs">
        <div class="ratings_btns">
          <q-btn class="active"> Most Relevant </q-btn>
          <q-btn> Highest </q-btn>
          <q-btn> Lowest </q-btn>
          <q-btn> Recent </q-btn>
        </div>
      </div>

      <div class="ratings_main">
        <div class="ratings_card">
          <div class="ratings_card_left">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTglXGZjjb4pIhLFesgiwB416bLsr2WPuguUNFkaPUSei78Og-iIiINQFvBdopWxNY2yhk&usqp=CAU"
              alt=""
            />
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
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTglXGZjjb4pIhLFesgiwB416bLsr2WPuguUNFkaPUSei78Og-iIiINQFvBdopWxNY2yhk&usqp=CAU"
              alt=""
            />
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

export default {
  setup() {
    return {
      ratingModel: ref(4),
    };
  },
  data() {
    return {
      product: {},
    };
  },

  props: ["productData"],

  methods: {
    closeModal() {
      // console.log("first clicked");
      this.$emit("closeModalRatings");
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
  border: 1px solid #dfdfdf;
}
.ratings_btns::-webkit-scrollbar {
  display: none;
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
