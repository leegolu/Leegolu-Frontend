<template>
  <section class="products q-pt-xl container">
    <div class="category_wrapper">
      <div class="left">
        <div class="section">
          <div class="each_category_wrap">
            <div
              v-for="(each, index) in thiscategory.subcategories"
              :key="index"
              class="each_category"
            >
              <q-item
                :to="{
                  name: 'category-page',
                  params: { slug: each.slug, sub: '' },
                }"
              >
                {{ each.name }}
              </q-item>
              <!-- <span class="count"> | {{ each.count }} </span> -->
            </div>
          </div>
        </div>

        <!-- <div class="section q-pt-lg">
          <div class="section_main_text">Location</div>
          <q-select v-model="model" :options="options" />
        </div>
        <div class="section q-pt-lg">
          <div class="section_main_text">Condition</div>
          <q-option-group :options="optionsG" type="checkbox" v-model="group" />
        </div>
        <div class="section q-pt-lg">
          <div class="section_main_text">Rating</div>
          <div class="sort_rating">
            <div class="row items-center">
              <q-checkbox v-model="val" />
              <q-rating
                v-model="ratingModel"
                size="1.5em"
                :max="5"
                color="secondary"
              />
            </div>
            <div class="row items-center">
              <q-checkbox v-model="val" />
              <q-rating
                v-model="ratingModel"
                size="1.5em"
                :max="4"
                color="secondary"
              />
            </div>
            <div class="row items-center">
              <q-checkbox v-model="val" />
              <q-rating
                v-model="ratingModel"
                size="1.5em"
                :max="3"
                color="secondary"
              />
            </div>
            <div class="row items-center">
              <q-checkbox v-model="val" />
              <q-rating
                v-model="ratingModel"
                size="1.5em"
                :max="2"
                color="secondary"
              />
            </div>
            <div class="row items-center">
              <q-checkbox v-model="val" />
              <q-rating
                v-model="ratingModel"
                size="1.5em"
                :max="1"
                color="secondary"
              />
            </div>
          </div>
        </div>
        <div class="section q-pt-lg">
          <div class="section_main_text">Pricing</div>
          <div class="sort_rating">
            <div class="row items-center">
              <q-checkbox v-model="val" label="₦2,000 to 5000" />
            </div>
            <div class="row items-center">
              <q-checkbox v-model="val" label="₦5,000 to 10000" />
            </div>
            <div class="row items-center">
              <q-checkbox v-model="val" label="₦10,000 to 20,000" />
            </div>
            <div class="row items-center">
              <q-checkbox v-model="val" label="₦20,000 to 50,000" />
            </div>
            <div class="row items-center">
              <q-checkbox v-model="val" label="₦50,000 to 100,000" />
            </div>
          </div>
        </div> -->
      </div>

      <div class="righ">
        <div class="search_text_wrap q-pb-lg row justify-end items-start">
          <!-- <div class="search_left">
            <div class="search_small">200 results for</div>
            <div class="main_result_text">
              Peugeot 301
              <span class="main_result_text_span"> | View All </span>
            </div>
          </div> -->

          <div class="sort row items-center">
            <span class="sort_by q-mr-sm">Sort By:</span
            ><q-select
              class="text-secondary"
              v-model="modelSort"
              :options="optionsSort"
            />
          </div>
        </div>
        <div class="product_cards">
          <div
            v-for="(product, index) in products"
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
              <q-btn
                flat
                @click="
                  product.like === false
                    ? addtoFav(product.slug)
                    : removeFav(product.slug)
                "
              >
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
      </div>
    </div>
  </section>
  <section class="products q-mb-lg q-pt-xl container">
    <div class="head_text">Top Rated Shops</div>
    <div class="product_cards">
      <div v-for="(product, index) in topProducts" :key="index" class="product">
        <img :src="product.product_image" alt="" />
        <div class="location">
          <p>{{ product.location }}</p>
        </div>
        <div class="name">
          <p>{{ product.name }}</p>
        </div>
        <div class="price">
          <p>{{ product.amount }}</p>
        </div>
        <div class="desc">
          <p>{{ product.desc }}</p>
        </div>
        <div class="kinds">
          <p class="kind">{{ product.kind }}</p>
          <p v-if="product.make !== ''" class="make">{{ product.make }}</p>
        </div>
        <div class="owners">
          <p class="owner">
            <i class="fa-solid q-mr-xs fa-gift"></i>{{ product.owner }}
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
        <div class="love">
          <i class="fa-regular fa-heart"></i>
        </div>
      </div>
    </div>
  </section>

  <FooterVue class="q-mt-xl" />
</template>

<script>
import FooterVue from "src/components/Footer.vue";
import { defineComponent, ref } from "vue";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
// Default theme
import "@splidejs/vue-splide/css";
// or only core styles
import "@splidejs/vue-splide/css/core";
export default defineComponent({
  name: "IndexPage",
  setup() {
    return {
      ratingModel: ref(4),
    };
  },
  components: {
    FooterVue,
    Splide,
    SplideSlide,
  },
  data() {
    return {
      products: [],
      thiscategory: [],
      error: {},
      options: [
        "Lagos, Nigeria",
        "Enugu, Nigeria",
        "Ebonyi, Nigeria",
        "Abuja, Nigeria",
        "Akwa Ibom, Nigeria",
        "Delta, Nigeria",
      ],
      optionsSort: ["Lowest Price", "Highest Price"],
      group: ref([]),
      optionsG: [
        { label: "Brand New", value: "Brand New" },
        { label: "Used", value: "Used", color: "green" },
      ],

      model: "Lagos, Nigeria",
      modelSort: "Lowest Price",
      val: false,
      ratingModel: ref(3),
      category: {
        name: "Electronics",
        count: "2000",
        subCategory: [
          {
            name: "Laptops and Computers",
            count: "11291",
          },
          {
            name: "Home Appliances",
            count: "2390",
          },
          {
            name: "Gaming and Entertainment",
            count: "11291",
          },
          {
            name: "Head Phones",
            count: "89",
          },
          {
            name: "Speakers & Sound",
            count: "704",
          },
          {
            name: "Musical Instruments",
            count: "203",
          },
          {
            name: "Cameras",
            count: "803",
          },
          {
            name: "Interior Lighting",
            count: "1002",
          },
        ],
      },
      topProducts: [
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
      ],
      productss: [
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
        {
          product_image: "/images/keyboard.png",
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
          product_image: "/images/sneak.png",
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
          product_image: "/images/mytv.png",
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
    };
  },

  watch: {
    "$route.params.slug": {
      handler() {
        this.getsubCategoryProducts();
      },
      immediate: true,
    },
  },

  created() {
    this.getsubCategoryProducts();
  },

  methods: {
    goto(product) {
      this.$router.replace({
        name: "product.detail",
        params: { slug: product.slug },
      });
    },
    addtoFav(slug) {
      this.$api
        .post(`${slug}/like`)
        .then((response) => {
          // console.log(response);
          this.getsubCategoryProducts();
          this.$q.notify({
            message: "Product added to favourites",
            color: "green",
          });
        })
        .catch(({ response }) => {
          if (response.status === 401) {
            this.$store.leegoluauth.previousRoute =
              this.$router.currentRoute.value.fullPath;
            this.$router.replace({ name: "login" });
            this.$q.notify({
              message: "You need to login to like product",
              color: "green",
            });
          }
          this.$q.notify({
            message: "An error occured",
            color: "green",
          });
          this.loading = false;
          this.errors = error.errors || {};
        });
    },

    removeFav(slug) {
      this.$api
        .delete(`${slug}/like`)
        .then((response) => {
          this.getsubCategoryProducts();
          this.$q.notify({
            message: "Product removed to favourites",
            color: "green",
          });
          // console.log(response);
        })
        .catch(({ response }) => {
          if (response.status === 401) {
            this.$store.leegoluauth.previousRoute =
              this.$router.currentRoute.value.fullPath;
            this.$router.replace({ name: "login" });
            this.$q.notify({
              message: "You need to login to like product",
              color: "green",
            });
          }
          this.loading = false;
          this.$q.notify({
            message: "An error occured",
            color: "red",
          });
          this.errors = error.errors || {};
        });
    },

    getsubCategoryProducts() {
      let category = this.$router.currentRoute.value.params.slug;
      this.loading = true;
      this.$api
        .get(`${category}/products`)
        .then((response) => {
          this.products = response.data.data;
          console.log(response);
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },
  },
});
</script>

<style scoped>
p {
  margin-bottom: 5px;
}

.wrapper {
  text-align: center;
  width: 55%;
}

.wrapper .main_text {
  font-weight: 700;
  font-size: 48px;
  line-height: 58px;
  color: #ffffff;
}

.wrapper p {
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  margin-bottom: 0.8rem;
  color: #ffffff;
}

.wrapper input {
  padding: 0 1rem;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #9a9a9a;
  background: white;
  border-radius: 10px 0 0 10px;
  height: 59.63px;
  width: 799px;
  border: none;
}

.wrapper input::placeholder {
  font-family: "Montserrat", sans-serif;
}
.wrapper button {
  height: 59.63px;
  background: #ee4e36;
  border-radius: 0px 10px 10px 0px;
  border: none;
  width: 68.57px;
  color: #ffffff;
}
.wrapper button i {
  font-size: 1.5rem;
}

/* process */

.process {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding-top: 1rem;
}

.process img {
  width: 90%;
}

.category_wrapper {
  display: grid;
  grid-template-columns: 1.5fr 4fr;
  gap: 2rem;
}
.category_wrapper .left {
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  padding: 2rem;
  position: sticky;
  top: 20%;
  height: fit-content;
}

.left .section_main_text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-transform: capitalize;
}

.left span.count {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-transform: capitalize;
  color: #b0b0b0;
}

.left .each_category {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 17px;
  text-transform: capitalize;
  color: #000000;
  margin: 1rem 0;
}

.search_text_wrap .search_small {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #000000;
}
.search_text_wrap .main_result_text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  text-transform: capitalize;
  color: #000000;
  margin-bottom: 2rem;
}
.search_text_wrap span.main_result_text_span {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-transform: capitalize;
  color: rgba(100, 115, 124, 0.6);
}
.search_text_wrap .sort_by {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #000000;
}
/* prodcut card */
.product_cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.product img {
  height: 150px;
  /* height: 206px; */
  object-fit: contain;
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

@media (max-width: 1100px) {
  .product_cards {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  .product_cards .product .owners {
    gap: 0rem;
    flex-wrap: wrap;
  }
}
@media (max-width: 500px) {
  .category_wrapper {
    grid-template-columns: 1fr;
  }

  .category_wrapper .left {
    display: none;
  }

  .search_text_wrap {
    margin-bottom: 2rem;
  }
}
</style>
