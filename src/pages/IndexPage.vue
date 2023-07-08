<template>
  <div class="head">
    <div class="nav">
      <div>
        <img class="logo" src="/images/logowhite.png" alt="" />
      </div>

      <div class="right">
        <div v-if="this.$store.leegoluauth.token === ''" class="div">
          <router-link to="/login"> Sign In </router-link>
          <router-link class="" :to="{ name: 'register' }">
            Join Now
          </router-link>
          <q-btn :to="{ name: 'register' }" color="secondary"> Sell </q-btn>
        </div>

        <div v-else class="div avaicons">
          <q-btn class="" style="min-height: auto; padding: 3px" no-caps flat>
            <img class="ava" src="/images/usericon.svg" /><q-icon
              name="expand_more"
            />
            <q-menu class="headermenu">
              <div class="q-pa-md">
                <div class="column items-center">
                  <q-avatar size="72px">
                    <img
                      :src="
                        this.$store.leegoluauth.userDetails.avatar === null
                          ? '/images/userblack.svg'
                          : this.$store.leegoluauth.userDetails.avatar.url
                      "
                    />
                  </q-avatar>
                  <div class="text-subtitle1 q-mt-md q-mb-xs">
                    {{ this.$store.leegoluauth.userDetails.name }}
                  </div>
                  <q-btn
                    style="white-space: nowrap"
                    no-caps
                    :to="{
                      name: `${
                        this.$store.leegoluauth.userDetails.role[0].name ===
                        'business'
                          ? 'business.dashboard'
                          : 'regular.dashboard'
                      }`,
                    }"
                    color="secondary"
                    class="q-px-md"
                  >
                    Go to dashboard
                  </q-btn>
                </div>
              </div>
            </q-menu>
          </q-btn>
          <!-- <q-btn flat icon="fa-solid fa-user" color="secondary">
            <q-menu>
              <q-list>
                <q-btn
                  style="white-space: nowrap"
                  :to="{
                    name: `${
                      this.$store.leegoluauth.userDetails.role[0].name ===
                      'business'
                        ? 'business.dashboard'
                        : 'regular.dashboard'
                    }`,
                  }"
                  color="secondary"
                  class="q-px-md"
                >
                  Go to dashboard
                </q-btn>
              </q-list>
            </q-menu>
          </q-btn> -->
        </div>
        <!-- <div v-else class="div">
          <q-btn
            :to="{
              name: `${
                this.$store.leegoluauth.userDetails.role[0].name === 'business'
                  ? 'business.dashboard'
                  : 'regular.dashboard'
              }`,
            }"
            class="q-px-md"
            color="secondary"
          >
            Go to dashboard
          </q-btn>
        </div> -->
        <!-- <router-link to="/login"> Sign In </router-link>
        <router-link to="/register"> Join Now </router-link>
        <q-btn color="secondary"> Start Selling </q-btn> -->
      </div>
    </div>
  </div>
  <main class="home">
    <div class="wrapper">
      <div class="main_text">Find it. Buy it.</div>
      <p>Unlock Possibilities, Connect Locally</p>
      <div class="input_area">
        <form @submit.prevent="search">
          <input
            v-model="searchInp"
            type="text"
            placeholder="Search for anything"
          />
          <q-btn type="submit" flat
            ><i class="fa-solid fa-magnifying-glass"></i
          ></q-btn>
        </form>
      </div>
    </div>

    <div class="sub_header">
      <div class="sub_header_wrap">
        <div class="">
          <q-btn-dropdown
            class="all"
            flat
            color="primary"
            label="All Categories"
          >
            <q-list>
              <q-item
                v-for="(item, index) in categorys"
                :key="index"
                clickable
                active-class="active"
                :to="{ name: 'category-page', params: { slug: item.slug } }"
                v-close-popup
              >
                <q-item-section>
                  <q-item-label class="text-black">{{
                    item.name
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>

        <div class="category_items">
          <q-item
            v-for="(item, index) in categorys"
            :key="index"
            :to="{ name: 'category-page', params: { slug: item.slug } }"
            class="item"
            active-class="active"
          >
            {{ item.name }}
          </q-item>
          <q-item class="item"> Cars </q-item>
          <q-item class="item"> Mobile Phones </q-item>
          <q-item class="item"> Skin Care </q-item>
          <q-item class="item"> Skin Care </q-item>
          <q-item class="item"> Skin Care </q-item>
          <q-item class="item"> Skin Care </q-item>
          <q-item class="item"> Skin Care </q-item>
          <q-item class="item"> Skin Care </q-item>
          <q-item class="item"> Skin Care </q-item>
          <q-item class="item"> Skin Care </q-item>
        </div>
      </div>
    </div>
  </main>

  <section class="container q-pt-md">
    <div class="process">
      <div style="gap: 1rem" class="img row items-center no-wrap">
        <img src="/images/search1.svg" alt="" />
        <div class="process_details">
          <div>Search an item</div>
          <div>
            Look up anything that interests you, such as phones, laptops, or
            clothing.
          </div>
        </div>
      </div>
      <div style="gap: 1rem" class="img row items-center no-wrap">
        <img src="/images/conta.svg" alt="" />
        <div class="process_details">
          <div>Contact Seller</div>
          <div>
            Speak with the seller to discuss prices. Do not pay until you meet
            in-person.
          </div>
        </div>
      </div>
      <div style="gap: 1rem" class="img row items-center no-wrap">
        <img src="/images/arrange.svg" alt="" />
        <div class="process_details">
          <div>Arrange pick-up</div>
          <div>
            Arrange to meet with the seller to pay for & pickup your item.
          </div>
        </div>
      </div>
    </div>
    <div class="process_splide">
      <Splide
        :options="{
          perPage: 1,
          rewind: true,
          autoplay: true,
          gap: 10,
          arrows: false,
          navigations: false,
        }"
        aria-label="My Favorite Images"
      >
        <SplideSlide>
          <div style="gap: 1rem" class="img row items-center no-wrap">
            <img src="/images/search1.svg" alt="" />
            <div class="process_details">
              <div>Search an item</div>
              <div>
                Look up anything that interests you, such as phones, laptops, or
                clothing.
              </div>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div style="gap: 1rem" class="img row items-center no-wrap">
            <img src="/images/conta.svg" alt="" />
            <div class="process_details">
              <div>Contact Seller</div>
              <div>
                Speak with the seller to discuss prices. Do not pay until you
                meet in-person.
              </div>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div style="gap: 1rem" class="img row items-center no-wrap">
            <img src="/images/arrange.svg" alt="" />
            <div class="process_details">
              <div>Arrange pick-up</div>
              <div>
                Arrange to meet with the seller to pay for & pickup your item.
              </div>
            </div>
          </div>
        </SplideSlide>
      </Splide>
    </div>
  </section>

  <section class="popular container">
    <div class="head_text">
      Popular Categories
      <router-link :to="{ name: 'category-page', params: { slug: 'fashion' } }"
        ><span class="line"> | View All </span></router-link
      >
    </div>

    <Splide
      :options="{
        perPage: 6,
        rewind: true,
        autoplay: true,
        gap: 10,
        arrows: false,
        navigations: false,
        breakpoints: {
          640: {
            perPage: 2,
          },
          767: {
            perPage: 2,
          },
          1024: {
            perPage: 3,
          },
          2000: {
            perPage: 4,
          },
        },
      }"
      aria-label="My Favorite Images"
    >
      <SplideSlide v-for="(category, index) in categorys" :key="index">
        <div @click="gotoCategory(category)">
          <div v-if="category.name === 'Fashion'" class="category">
            <img src="/images/shirt.png" alt="Sample 1" />
            <div class="name_">
              {{ category.name }}
            </div>
          </div>
          <div v-if="category.name === 'Electronics'" class="category">
            <img src="/images/washingmachine.png" alt="Sample 1" />
            <div class="name_">
              {{ category.name }}
            </div>
          </div>
        </div>
      </SplideSlide>
      <SplideSlide>
        <div>
          <div class="category">
            <img src="/images/utensils.png" alt="Sample 1" />
            <div class="name_">Utensils</div>
          </div>
        </div>
      </SplideSlide>
      <!-- <SplideSlide>
        <div class="category">
          <img src="/images/phone.png" alt="Sample 1" />
        </div>
      </SplideSlide> -->
      <!-- <SplideSlide>
        <div class="category">
          <img src="/images/sneakers.png" alt="Sample 1" />
        </div>
      </SplideSlide>
      <SplideSlide>
        <div class="category">
          <img src="/images/tv.png" alt="Sample 1" />
        </div>
      </SplideSlide> -->
    </Splide>
  </section>

  <section class="products container">
    <div class="head_text">Featured Listings</div>
    <div v-if="listings.length > 0" class="product_cards">
      <div v-for="(product, index) in listings" :key="index" class="product">
        <div @click="goto(product)">
          <img :src="product.uploads[0].url" alt="" />
          <div class="location">
            <p>{{ product.area.name }}, {{ product.state.name }}</p>
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
              <img src="/images/shopp.svg" alt="" />
              {{ product.vendor_name }}
            </p>
            <p class="ratings row q-col-gutter-x-xs items-center no-wrap">
              <q-rating
                v-model="product.rating"
                size="1.5em"
                :max="5"
                disable
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
              product.like === false ? addtoFav(product) : removeFav(product)
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

    <div v-else class="else">
      <div style="font-size: 15px" class="text-grey text-center">
        No products
      </div>
    </div>
  </section>
  <section class="products q-pt-xl container">
    <div class="head_text">Top Rated Shops</div>
    <div class="product_cards">
      <div
        v-for="(product, index) in topProducts"
        :key="index"
        class="product shops"
      >
        <Splide
          :options="{
            perPage: 1,
            rewind: true,
            autoplay: true,
            gap: 10,
            arrows: false,
            navigations: false,
          }"
          aria-label="My Favorite Images"
        >
          <SplideSlide>
            <div>
              <img :src="product.product_image" alt="" />
            </div>
          </SplideSlide>
          <SplideSlide>
            <div>
              <img :src="product.product_image" alt="" />
            </div>
          </SplideSlide>
          <SplideSlide>
            <div>
              <img :src="product.product_image" alt="" />
            </div>
          </SplideSlide>
          <SplideSlide>
            <div>
              <img :src="product.product_image" alt="" />
            </div>
          </SplideSlide>
          <SplideSlide>
            <div>
              <img :src="product.product_image" alt="" />
            </div>
          </SplideSlide>
        </Splide>
        <div class="body_">
          <div class="location">
            <p>{{ product.location }}</p>
          </div>
          <div class="name">
            <p>Emmanuel</p>
          </div>
          <div class="price">
            <p>Electronics</p>
          </div>
          <div class="desc q-pb-sm">
            <p>{{ product.desc }}</p>
          </div>
          <!-- <div class="kinds">
          <p class="kind">{{ product.kind }}</p>
          <p v-if="product.make !== ''" class="make">{{ product.make }}</p>
        </div> -->
          <div class="owners q-mt-md">
            <!-- <p class="owner">
            <i class="fa-solid q-mr-xs fa-gift"></i>{{ product.owner }}
          </p> -->
            <p class="ratings row q-col-gutter-x-xs items-center no-wrap">
              <q-rating
                v-model="ratingModel"
                size="1em"
                :max="4"
                color="black"
              />
              <span>{{ product.ratings_count }}</span>
            </p>
          </div>
        </div>
        <div class="love">
          <i class="fa-regular fa-heart"></i>
        </div>
      </div>
    </div>
  </section>

  <section class="join_area">
    <div class="join container">
      <div class="left">
        <div class="join_title">Join Thousands of Happy Sellers.</div>
        <div class="join_desc">Start Selling on Leegolu today.</div>

        <div class="btn">
          <q-btn :to="{ name: 'register' }" color="secondary">
            Start Selling
          </q-btn>
        </div>
      </div>

      <div class="right">
        <img src="/images/join.png" alt="" />
      </div>
    </div>
  </section>

  <FooterVue />
</template>

<script>
import FooterVue from "src/components/Footer.vue";
import { defineComponent, ref } from "vue";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
// ManageIconVue
// Default theme
import "@splidejs/vue-splide/css";
// or only core styles
import "@splidejs/vue-splide/css/core";
import { colors } from "quasar";
import ManageIconVue from "src/components/icons/ManageIcon.vue";
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
    ManageIconVue,
  },
  data() {
    return {
      listings: [],
      categorys: [],
      searchInp: "",
      popular: [
        {
          img: "/images/sneakPop.png",
        },
        {
          img: "/images/shirt.png",
        },
        {
          img: "/images/auto.png",
        },
        {
          img: "/images/washingmachine.png",
        },
        {
          img: "/images/utensils.png",
        },
        {
          img: "/images/phone.png",
        },
        {
          img: "/images/sneakPop.png",
        },
      ],
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

  created() {
    this.getFeaturedlistngs();
    this.getCategorys();
  },

  methods: {
    goto(product) {
      this.$router.replace({
        name: "product.detail",
        params: { slug: product.slug },
      });
    },

    gotoCategory(category) {
      this.$router.replace({
        name: "category-page",
        params: { slug: category.slug },
      });
    },

    search() {
      this.$router.replace({
        name: "search-page",
        params: { slug: this.searchInp },
      });
    },

    addtoFav(item) {
      // console.log(slug);
      item.like = !item.like;
      console.log(item);
      this.$api
        .post(`${item.slug}/like`)
        .then((response) => {
          // this.getFeaturedlistngs();
          const updatedItemIndex = this.listings.findIndex(
            (i) => i.id === item.id
          );
          if (updatedItemIndex !== -1) {
            this.listings[updatedItemIndex].like = item.like;
          }
          this.$q.notify({
            message: "Product added to favourites",
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
          // this.$q.notify({
          //   message: "An error occured",
          //   color: "red",
          // });
          this.errors = error.errors || {};
        });
    },

    removeFav(item) {
      item.like = !item.like;
      this.$api
        .delete(`${item.slug}/like`)
        .then((response) => {
          // this.getFeaturedlistngs();
          const updatedItemIndex = this.listings.findIndex(
            (i) => i.id === item.id
          );
          if (updatedItemIndex !== -1) {
            this.listings[updatedItemIndex].like = item.like;
          }
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
    getFeaturedlistngs() {
      this.$api
        .get(`listings/all`)
        .then((response) => {
          this.listings = response.data.data;
          console.log(response);
        })
        .catch((e) => {
          this.loading = false;
          // this.errors = error.errors || {};
        });
    },
    getCategorys() {
      this.$api
        .get(`categories`)
        .then((response) => {
          this.categorys = response.data.data;
          console.log(response);
        })
        .catch((e) => {
          this.loading = false;
          // this.errors = error.errors || {};
        });
    },
  },
});
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 5px;
}
.head {
  background: transparent;
  position: absolute;
  z-index: 10;
  width: 100%;
}
.nav {
  padding: 0.7rem 3rem;
  align-items: center;
  display: flex;
  width: 100%;
  justify-content: space-between;
}
a {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #ffffff;
}

.right > div {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.right .q-btn {
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-transform: uppercase;
  border-radius: 6px;
  color: #ffffff;
}

.logo {
  width: 157px;
  height: 39px;
}
.home {
  height: 60vh;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(180deg, #1a3f55 0%, #357196 84.27%);
}

.img img {
  width: 105px;
  height: 111px;
}

.process_details div:nth-child(1) {
  color: #357196;
  font-size: 26px;
  line-height: 1.1;
  white-space: nowrap;
  font-family: Inter;
}
.process_details div:nth-child(2) {
  color: #357196;
  font-size: 13px;
  font-family: Inter;
}

.btn {
  background: transparent;
}

.input_area form {
  display: flex;
  align-items: center;
}
.input_area form input {
  width: 100%;
  padding: 0 2rem;
}

.popular {
  margin: 3rem auto 2rem;
}
.popular img {
  width: 130px;
  cursor: pointer;
}

.popular .head_text {
  margin-bottom: 2rem;
}

.popular span.line {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  text-transform: capitalize;
  color: rgba(100, 115, 124, 0.61);
  margin-left: 0.7rem;
}

.category {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.name_ {
  color: #64737c;
  text-align: center;
  font-size: 14px;
  font-family: Inter;
  font-weight: 500;
  text-transform: capitalize;
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
  font-size: 20px;
  line-height: 18px;
  margin-bottom: 0.8rem;
  color: #ffffff;
}

.input_area {
  margin-top: 1.5rem;
}

.wrapper input {
  padding: 0 1rem;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #000;
  background: white;
  border-radius: 10px 0 0 10px;
  height: 59.63px;
  width: 799px;
  border: none;
}

.wrapper input::placeholder {
  font-family: "Montserrat", sans-serif;
  color: #9a9a9a;
  font-size: 20px;
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

/* subheader */

.sub_header {
  position: absolute;
  bottom: 1%;
  z-index: 100;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
}
.sub_header_wrap {
  display: flex;
  gap: 1rem;
  // overflow-x: scroll;
  // width: 90%;
  align-items: center;
  justify-content: center;
}

.sub_header_wrap > div .q-btn {
  padding: 0;
}
.sub_header_wrap .all {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  text-transform: capitalize;
  color: #fff !important;
}

.category_items {
  display: flex;
  align-items: center;
  overflow-x: scroll;
  height: 50px;
  width: 70%;
  cursor: pointer;
  scrollbar-width: none;
}

.category_items::-webkit-scrollbar {
  display: none;
}
// .category_items::-webkit-scrollbar {
//   display: none;
// }
.category_items .item {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  white-space: nowrap;
  font-size: 15px;
  color: #ffffff;
  line-height: 18px;
  min-height: 0;
}
/* process */

.process {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding-top: 1rem;
  padding-bottom: 2rem;
}

/* prodcut card */
.product_cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 2rem 1rem;
  padding-top: 1rem;
}

.product_cards .product {
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  padding: 0.8rem;
  position: relative;
  cursor: pointer;
}
.product_cards .product.shops {
  padding: 0rem;
}
.product_cards .product.shops .body_ {
  padding: 0.8rem;
  margin-top: 0.4rem;
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
  text-transform: uppercase;
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

.product .owner {
  display: flex;
  align-items: center;
}
.product .owner img {
  width: 17px;
  height: 16px;
}

.product img {
  height: 150px;
  /* height: 206px; */
  object-fit: contain;
  // padding-top: 0.3rem;
}

.product_cards .product.shops img {
  object-fit: cover;
}
.product_cards .product.shops .name p {
  margin-bottom: 0;
}

/* join */

.join_area {
  margin: 5rem 0;
}

.join_area .join {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  align-items: center;
  place-items: center;
}

.join_area .left {
  text-align: center;
}

.join_area .join_title {
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
  text-transform: capitalize;
  color: #1a3c52;
}
.join_area .join_desc {
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  text-transform: capitalize;
  color: #64737c;
  margin: 0.3rem 0 0.9rem;
}

.join img {
  width: 200px;
  object-fit: contain;
}

@media (min-width: 1348px) {
  .product_cards {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (min-width: 1100px) {
  .category_items {
    width: 95%;
  }
}
@media (min-width: 500px) {
  .process_splide {
    display: none;
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
@media (max-width: 800px) {
  .wrapper {
    width: 80%;
  }
  .wrapper .main_text {
    font-size: 40px !important;
    line-height: 38px;
    margin-bottom: 1rem;
  }
  .nav {
    padding: 0.7rem 1rem;
  }
}
@media (max-width: 500px) {
  .process {
    display: none;
  }

  .process_splide {
    padding-bottom: 2rem;
  }
  .img img {
    width: 80px;
    height: 87px;
  }
  .process_details div:nth-child(1) {
    font-size: 20px;
  }
  .process_details div:nth-child(2) {
    font-size: 11px;
    width: 90%;
  }
  .wrapper input {
    font-size: 15px;
    height: 45.63px;
    width: 799px;
    border: none;
  }

  .popular {
    margin: 3rem auto 5rem;
  }
  .popular img {
    width: 110px;
  }

  .wrapper button {
    height: 45.63px;
  }

  .logo {
    width: 130px;
    height: 39px;
    object-fit: contain;
  }

  a {
    font-size: 11px;
  }

  .right .q-btn {
    font-size: 13px;
    padding: 4px 5px;
  }
  .right {
    gap: 0.5rem;
    margin-bottom: 0.7rem;
  }
  .nav {
    padding: 0.7rem 0.6rem;
  }

  // .right .q-btn {
  //   display: none;
  // }

  .join_area .join {
    grid-template-columns: 1fr;
  }

  .footer_rights {
    flex-wrap: wrap;
  }

  .wrapper {
    width: 90%;
  }

  .right > div {
    gap: 0.5rem;
  }

  .join_area .join_title {
    font-size: 30px;
    line-height: 35px;
  }

  .join_area .join_desc {
    font-size: 18px;
  }

  .wrapper p {
    width: 90%;
    margin: 0 auto 1rem;
    font-size: 18px;
    line-height: 23px;
  }

  .sub_header_wrap .all {
    font-size: 13px;
  }
  .category_items .item {
    font-size: 13px;
  }

  .sub_header_wrap {
    gap: 0rem;
    margin-left: 0.5rem;
  }
  .input_area form input {
    font-size: 15px;
    padding: 0 1.3rem;
  }
  .wrapper input::placeholder {
    font-size: 14px;
  }
}
</style>
