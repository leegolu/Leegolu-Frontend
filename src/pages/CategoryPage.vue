<template>
  <section class="products q-pt-xl container">
    <div class="category_wrapper">
      <div class="left">
        <div class="section">
          <div class="section_main_text">
            {{ thiscategory.category }}
            <span class="count">| {{ products.length }}</span>
          </div>

          <div class="each_category_wrap">
            <div
              v-for="(each, index) in thiscategory.subcategories"
              :key="index"
              class="each_category"
            >
              <q-item
                :to="{ name: 'subcategory-page', params: { slug: each.slug } }"
              >
                {{ each.name }}
              </q-item>
              <!-- <span class="count"> | {{ each.count }} </span> -->
            </div>
          </div>
        </div>

        <div v-if="showState" class="section q-pt-lg">
          <div class="section_main_text">Location (state)</div>

          <q-select v-model="model" :options="options" />
        </div>
        <div v-else class="section q-pt-lg">
          <div class="section_main_text">
            Location(<small class="text-secondary">area</small>)
          </div>
          <q-select v-model="modelAreas" :options="options">
            <template v-slot:append>
              <q-icon
                name="close"
                @click.stop.prevent="closeLocationFilter"
              /> </template
          ></q-select>
        </div>
        <div class="section q-pt-lg">
          <div class="section_main_text">Condition</div>
          <q-option-group :options="optionsG" type="radio" v-model="group" />
        </div>
        <!--<div class="section q-pt-lg">
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
        </div>-->
        <div class="section q-pt-lg">
          <div class="section_main_text">Pricing</div>
          <div class="sort_rating">
            <q-option-group
              :options="priceOptions"
              type="radio"
              v-model="pricegroup"
            />
          </div>
        </div>
      </div>

      <div class="righ">
        <div class="search_text_wrap q-pb-lg row justify-between items-center">
          <!-- <div class="search_left">
            <div class="search_small">200 results for</div>
            <div class="main_result_text">
              Peugeot 301
              <span class="main_result_text_span"> | View All </span>
            </div>
          </div> -->
          <q-btn
            dense
            v-if="!$q.screen.gt.xs"
            unelevated
            label="Filter"
            color="secondary"
            icon="chevron_left"
            @click="drawer = !drawer"
          />

          <div class="sort row items-center">
            <span class="sort_by q-mr-sm">Sort By:</span
            ><q-select
              class="text-secondary"
              v-model="modelSort"
              :options="optionsSort"
            />
          </div>
        </div>
        <div v-if="sortedProducts.length" class="product_cards">
          <div
            v-for="(product, index) in sortedProducts"
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

        <div v-else>No products fall under this category</div>
      </div>
    </div>

    <q-drawer
      v-model="drawer"
      :width="280"
      :breakpoint="500"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'white'"
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list class="q-px-md q-py-xl" padding>
          <div class="left">
            <div class="section">
              <div class="section_main_text">
                {{ thiscategory.category }}
                <span class="count">| {{ products.length }}</span>
              </div>

              <div class="each_category_wrap">
                <div
                  v-for="(each, index) in thiscategory.subcategories"
                  :key="index"
                  class="each_category"
                >
                  <q-item
                    :to="{
                      name: 'subcategory-page',
                      params: { slug: each.slug },
                    }"
                  >
                    {{ each.name }}
                  </q-item>
                </div>
              </div>
            </div>

            <div v-if="showState" class="section q-pt-lg">
              <div class="section_main_text">Location (state)</div>

              <q-select v-model="model" :options="options" />
            </div>
            <div v-else class="section q-pt-lg">
              <div class="section_main_text">
                Location(<small class="text-secondary">area</small>)
              </div>
              <q-select v-model="modelAreas" :options="options">
                <template v-slot:append>
                  <q-icon
                    name="close"
                    @click.stop.prevent="closeLocationFilter"
                    class="cursor-pointer"
                  /> </template
              ></q-select>
            </div>
            <div class="section q-pt-lg">
              <div class="section_main_text">Condition</div>
              <q-option-group
                :options="optionsG"
                type="radio"
                v-model="group"
              />
            </div>

            <div class="section q-pt-lg">
              <div class="section_main_text">Pricing</div>
              <div class="sort_rating">
                <q-option-group
                  :options="priceOptions"
                  type="radio"
                  v-model="pricegroup"
                />
              </div>
            </div>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>
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
    const miniState = ref(false);
    return {
      ratingModel: ref(4),
      miniState,
      drawer: ref(false),

      drawerClick(e) {
        if (miniState.value) {
          miniState.value = false;

          e.stopPropagation();
        }
      },
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
      optionsSort: [
        "none",
        "Lowest Price - Highest Price",
        "Highest Price - Lowest Price",
      ],
      group: ref("All"),
      pricegroup: ref("All"),
      optionsG: [
        { label: "All", value: "All" },
        { label: "Brand New", value: "Brand New" },
        { label: "Used", value: "Used" },
      ],
      priceOptions: [
        { label: "All", value: "All" },
        { label: "₦2,000 - ₦5,000", value: "2000 - 5000" },
        { label: "₦5,000 - ₦10,000", value: "5000 - 10000" },
        { label: "₦10,000 - ₦20,000", value: "10000 - 20000" },
        { label: "₦20,000 - ₦50,000", value: "20000 - 50000" },
        {
          label: "₦50,000 - ₦100,000",
          value: "59000 - 100000",
        },
      ],

      model: "",
      modelAreas: "",
      modelSort: "none",
      selectedLocation: "",
      showState: true,
      val: false,
      ratingModel: ref(3),
    };
  },

  computed: {
    filteredProducts() {
      let filtered = this.products;
      if (this.group === "Brand New") {
        filtered = filtered.filter(
          (product) => product.condition === "Brand new"
        );
      } else if (this.group === "Used") {
        filtered = filtered.filter((product) => product.condition === "Used");
      } else {
        filtered = this.products;
      }

      if (this.pricegroup !== "All") {
        const [min, max] = this.pricegroup.split("-");
        filtered = filtered.filter(
          (product) =>
            product.price >= parseInt(min) &&
            (max ? product.price <= parseInt(max) : true)
        );
      }

      // console.log(this.selectedLocation);

      if (this.selectedLocation.trim() !== "") {
        const location = this.selectedLocation.trim().toLowerCase();
        filtered = filtered.filter((product) =>
          product.area.toLowerCase().includes(location)
        );
      }
      this.drawer = false;
      return filtered;
    },

    // sortedProducts() {
    //   let sorted = this.filteredProducts;

    //   if (this.modelSort === "Lowest Price - Highest Price") {
    //     sorted = sorted.sort((a, b) => a.price - b.price);
    //   } else if (this.modelSort === "Highest Price - Lowest Price") {
    //     sorted = sorted.sort((a, b) => b.price - a.price);
    //   }
    //   this.drawer = false;

    //   return sorted;
    // },
    sortedProducts() {
      let sorted = [...this.filteredProducts];

      if (this.modelSort === "Lowest Price - Highest Price") {
        sorted = sorted.sort((a, b) => a.price - b.price);
      } else if (this.modelSort === "Highest Price - Lowest Price") {
        sorted = sorted.sort((a, b) => b.price - a.price);
      }

      return sorted;
    },
  },

  watch: {
    "$route.params.slug": {
      handler(to, from) {
        // console.log(to, from);
        this.getCategoryProducts();
        this.getcategory();
        this.pricegroup = "All";
        this.modelSort = "none";
        this.group = "All";
      },
      immediate: true,
    },

    model: {
      handler() {
        if (this.model !== "") {
          this.getAreas(this.model);
          this.showState = false;
        }
      },
      immediate: true,
    },
    modelAreas: {
      handler() {
        // console.log(this.selectedLocation);
        // console.log(this.modelAreas);
        // console.log(this.modelAreas.name);
        if (this.modelAreas) {
          this.selectedLocation = this.modelAreas.name;
        }
      },
      immediate: true,
    },
  },

  created() {
    this.getCategoryProducts();
    this.getcategory();
    this.getStates();
    // this.getsubCategoryProducts();
  },

  // beforeRouteUpdate(to, from, next) {
  //   // Check if the route parameter has changed
  //   if (to.params.slug === from.params.slug) {
  //     // Call your function here
  //     this.getCategoryProducts();
  //     this.getcategory();
  //     this.pricegroup = "All";
  //     this.modelSort = "none";
  //     this.group = "All";
  //   }

  //   // Continue with the route update
  //   next();
  // },

  methods: {
    goto(product) {
      this.$router.replace({
        name: "product.detail",
        params: { slug: product.slug },
      });
    },
    closeLocationFilter() {
      // console.log("close");
      this.selectedLocation = "";
      this.modelAreas = "";
      this.getStates();
      this.model = "";
    },
    getStates() {
      this.showState = true;
      this.$api
        .get("states")
        .then((response) => {
          // console.log(response);

          const modifiedArray = response.data.data.map((obj) => ({
            label: obj.name,
            value: obj.id,
            ...obj,
          }));
          this.options = modifiedArray;
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },

    getAreas(id) {
      this.showarea = true;
      this.loading = true;
      this.$api
        .get(`${id.value}/areas`)
        .then((response) => {
          // console.log(response);
          this.loading = false;
          const modifiedArray = response.data.data.map((obj) => ({
            label: obj.name,
            value: obj.id,
            ...obj,
          }));
          this.options = modifiedArray;
          this.showState = false;
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },
    addtoFav(slug) {
      this.$api
        .post(`${slug}/like`)
        .then((response) => {
          this.getCategoryProducts();
          this.$q.notify({
            message: "Product added to favourites",
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
          // this.$q.notify({
          //   message: "An error occured",
          //   color: "green",
          // });
          this.loading = false;
          this.errors = error.errors || {};
        });
    },
    removeFav(slug) {
      this.$api
        .delete(`${slug}/like`)
        .then((response) => {
          this.getCategoryProducts();
          this.$q.notify({
            message: "Product removed to favourites",
            color: "green",
          });
          // console.log(response);
        })
        .catch(({ response }) => {
          this.loading = false;
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
            color: "red",
          });
          this.errors = error.errors || {};
        });
    },
    getCategoryProducts() {
      let category = this.$router.currentRoute.value.params.slug;
      this.loading = true;
      this.$api
        .get(`${category}/products/all`)
        .then((response) => {
          this.products = response.data.data;
          // console.log(response);
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },

    getcategory() {
      let category = this.$router.currentRoute.value.params.slug;
      this.loading = true;
      this.$api
        .get(`${category}`)
        .then((response) => {
          this.thiscategory = response.data;
          // console.log(response);
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
  min-width: 250px;
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
  gap: 2rem 1rem;
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
@media (max-width: 600px) {
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
