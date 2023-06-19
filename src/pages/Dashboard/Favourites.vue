<template>
  <div class="loader" v-if="loading">
    <div>
      <q-spinner-comment color="primary" size="5em" />
    </div>
  </div>
  <div v-if="!loading" class="wrapp">
    <div class="top">
      <span class="title">
        <!-- <i class="fa-solid q-mr-sm fa-message"></i> -->
        My Favorites | {{ favourites.length }}
      </span>

      <div class="sort_area">
        <div class="left">
          <q-btn flat class="active">Listings </q-btn>
          <q-btn flat class="regular"> Shop</q-btn>
        </div>
      </div>
    </div>

    <section v-if="favourites.length > 0" class="products q-pt-sm">
      <!-- <div class="head_text">Favorite Listings</div> -->
      <div class="product_cards">
        <div
          v-for="(product, index) in favourites"
          :key="index"
          class="product"
        >
          <div @click="goto(product)">
            <img :src="product.uploads[0].url" alt="" />
            <div class="location">
              <p>{{ product.area }}</p>
            </div>
            <div class="name">
              <p>{{ product.name }}</p>
            </div>
            <div class="price">
              <p>₦{{ product.price.toLocaleString() }}</p>
            </div>
            <div class="desc">
              <p>{{ product.description }}</p>
              <p v-if="product.details">
                <span
                  v-for="(entry, index) in Object.entries(product.details)"
                  :key="index"
                >
                  <span v-if="entry[1] !== null"
                    >{{ entry[0] }}: {{ entry[1] + ", " }}</span
                  >
                </span>
              </p>
              <!-- <p> {{ Object.entries(product.details).toString() }}
              {{ Object.entries(product.details)[0] }}</p> -->
            </div>
            <div class="kinds">
              <p class="kind">{{ product.condition }}</p>
              <!-- <p v-if="product.make !== ''" class="make">{{ product.make }}</p> -->
            </div>
            <div class="owners">
              <p class="owner">
                <i class="fa-solid q-mr-xs fa-gift"></i
                >{{ product.vendor_name }}
              </p>
              <p class="ratings row q-col-gutter-x-xs items-center no-wrap">
                <q-rating
                  v-model="ratingModel"
                  size="1.5em"
                  :max="4"
                  color="black"
                />
                <span>{{ product.ratings_count }}</span>
              </p>
            </div>
          </div>
          <div class="love">
            <q-btn flat @click="removeFav(product.slug)">
              <i
                :class="
                  product.like
                    ? 'fa-solid text-red fa-heart'
                    : 'fa-regular fa-heart'
                "
              ></i
            ></q-btn>
          </div>
        </div>
      </div>
    </section>
    <div v-else class="empty">
      <img src="/images/empty.svg" alt="" />

      <div class="empty_text">You currently have no favourites</div>
    </div>
  </div>
</template>

<script>
import { useMeta } from "quasar";
import { ref } from "vue";

export default {
  setup() {
    useMeta({
      title: "My Favorites",
    });

    return {
      ratingModel: ref(4),
    };
  },
  data() {
    return {
      loading: true,
      products: [
        {
          product_image: "/images/car.png",
          name: "Royal Star 45” TV fHD/HD Smart...",
          location: "KETU, LAGOS",
          amount: "₦112,500",
          desc: '32" inches hisence LED TV, tiny frame, A5 series, Design for 2022 FIFA World Cup.',
          owner: "Izuogu & Sons Limited",
          ratings: 5,
          ratings_count: 203,
          kind: "Brand New",
          make: "Hisense",
        },
        {
          product_image: "/images/sneakers.png",
          name: "Royal Star 45” TV fHD/HD Smart...",
          location: "KETU, LAGOS",
          amount: "₦112,500",
          desc: '32" inches hisence LED TV, tiny frame, A5 series, Design for 2022 FIFA World Cup.',
          owner: "Izuogu & Sons Limited",
          ratings: 5,
          ratings_count: 203,
          kind: "Brand New",
          make: "",
        },
        {
          product_image: "/images/tv.png",
          name: "Royal Star 45” TV fHD/HD Smart...",
          location: "KETU, LAGOS",
          amount: "₦112,500",
          desc: '32" inches hisence LED TV, tiny frame, A5 series, Design for 2022 FIFA World Cup.',
          owner: "Izuogu & Sons Limited",
          ratings: 5,
          ratings_count: 203,
          kind: "Used",
          make: "Hisense",
        },
        {
          product_image: "/images/computer.png",
          name: "Royal Star 45” TV fHD/HD Smart...",
          location: "KETU, LAGOS",
          amount: "₦112,500",
          desc: '32" inches hisence LED TV, tiny frame, A5 series, Design for 2022 FIFA World Cup.',
          owner: "Izuogu & Sons Limited",
          ratings: 5,
          ratings_count: 203,
          kind: "New",
          make: "",
        },
        {
          product_image: "/images/ac.png",
          name: "Royal Star 45” TV fHD/HD Smart...",
          location: "KETU, LAGOS",
          amount: "₦112,500",
          desc: '32" inches hisence LED TV, tiny frame, A5 series, Design for 2022 FIFA World Cup.',
          owner: "Izuogu & Sons Limited",
          ratings: 5,
          ratings_count: 203,
          kind: "Brand New",
          make: "Hisense",
        },
      ],
      errors: [],
      image: ref(null),
      favourites: [],
      rowData: {},
      data: {},
      files: null,
      filter: "",
      curl: "",
      separator: "",
    };
  },

  mounted() {},
  created() {
    this.getFavourites();
  },

  methods: {
    onItemClick() {},
    goto(product) {
      this.$router.replace({
        name: "product.detail",
        params: { slug: product.slug },
      });
    },

    removeFav(slug) {
      this.$api
        .delete(`${slug}/like`)
        .then((response) => {
          this.getFavourites();
          this.$q.notify({
            message: "Product removed to favourites",
            color: "green",
          });
          // console.log(response);
        })
        .catch((e) => {
          this.loading = false;
          this.$q.notify({
            message: "An error occured",
            color: "red",
          });
          this.errors = error.errors || {};
        });
    },

    toggleModal(props) {
      this.rowData = props;
      this.advertdialog = true;
      // console.log(props);
    },
    getFavourites() {
      this.loading = true;
      this.$api
        .get(`${this.$store.leegoluauth.vendorDetails.slug}/favorites`)
        .then((response) => {
          // console.log("Success:", response);
          this.favourites = response.data.data;
          this.loading = false;
        })
        .catch(({ response }) => {
          // console.log(response);
          this.errors = response.data.message;
          this.loading = false;
          this.$q.notify({
            message: response.data.message,
            color: "red",
            position: "top",
            actions: [{ icon: "close", color: "white" }],
          });
          // console.log("Error:", response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapp {
  margin: 2rem 1.5rem;
}

.title {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
}

.sort_area {
  // background: #f5f5f5;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  margin: 0.8rem 0;
}

.sort_area .left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.sort_area .right .sort_by_date {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
  background: #f3f3f3;
  border: 1px solid #c7c7c7;
  border-radius: 5px;
}

.sort_area .active {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  width: 107px;
  height: 34px;
  color: #ffffff;
  background: #1f7bb5;
  border-radius: 17px;
}
.sort_area .regular {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #666666;
}

.sort_area .regular::before {
  box-shadow: none;
}

.sort_area .regular.boosted {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  background: #03ae1e;
  border-radius: 17px;
}

.sort_area .right .q-btn {
  width: 215px;
  height: 34px;
}
.sort_area .right .q-btn::before {
  box-shadow: none;
}

/* prodcut card */
.product_cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding-top: 1rem;
}

.product_cards .product {
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  padding: 0.8rem;
  position: relative;
}

.product_cards .product .love {
  position: absolute;
  right: 5px;
  top: 5px;
  background: rgba(0, 0, 0, 0.29);
  border-radius: 30px;
  width: 27px;
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.product_cards .product .love i {
  color: #ffffff;
}
.product_cards .product .location p {
  font-weight: 400;
  font-size: 8px;
  line-height: 10px;
  text-transform: capitalize;
  color: #000000;
}
.product_cards .product .name p {
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  text-transform: capitalize;
  color: #000000;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.product_cards .product .price p {
  font-weight: 800;
  font-size: 20px;
  line-height: 24px;
  text-transform: capitalize;
  color: #000000;
}

.product img {
  height: 150px;
  /* height: 206px; */
  object-fit: contain;
}
.product_cards .product .desc {
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  text-transform: capitalize;
  color: #9d9d9d;
}

.product_cards .product .kinds {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0 1.5rem;
}
.product_cards .product .kinds p {
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  text-transform: capitalize;
  color: #357196;
  background: rgba(53, 113, 150, 0.26);
  border-radius: 5px;
  padding: 0.5rem;
}

.product_cards .product .owners {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.product_cards .product .owners p {
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  text-transform: capitalize;
  color: #000000;
}
.product_cards .product p.ratings {
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  text-transform: capitalize;
  color: #000000;
}
@media (min-width: 1300px) {
  .product_cards {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
</style>
