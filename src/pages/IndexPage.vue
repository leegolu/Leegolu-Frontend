<template>
  <div class="head">
    <div class="nav">
      <div>
        <img class="logo" src="/images/logowhite.png" alt="" />
      </div>

      <div class="right">
        <router-link to=""> Sign In </router-link>
        <router-link to=""> Join Now </router-link>
        <q-btn color="secondary"> Start Selling </q-btn>
      </div>
    </div>
  </div>
  <main class="home">
    <div class="wrapper">
      <div class="main_text">Find it. Buy it.</div>
      <p>Seek and ye shall find, Buy it and it shall be delivered unto you</p>
      <div class="input_area">
        <form>
          <input type="text" placeholder="Search for anything" />
          <button><i class="fa-solid fa-magnifying-glass"></i></button>
        </form>
      </div>
    </div>
  </main>

  <section class="container q-pt-md">
    <div class="process">
      <div class="img">
        <img src="/images/search.png" alt="" />
      </div>
      <div class="img">
        <img src="/images/contact.png" alt="" />
      </div>
      <div class="img">
        <img src="/images/arrange.png" alt="" />
      </div>
    </div>
  </section>

  <section class="popular container">
    <div class="head_text">
      Popular Categories
      <router-link to="/"><span class="line"> | Veiw All </span></router-link>
    </div>

    <Splide
      :options="{ perPage: 6, rewind: true, autoplay: true }"
      aria-label="My Favorite Images"
    >
      <SplideSlide v-for="(products, index) in popular" :key="index">
        <img :src="products.img" alt="Sample 1" />
      </SplideSlide>
    </Splide>
  </section>

  <section class="products q-pt-xl container">
    <div class="head_text">Featured Listings</div>
    <div class="product_cards">
      <div v-for="(product, index) in products" :key="index" class="product">
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
  <section class="products q-pt-xl container">
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

  <section class="join_area">
    <div class="join container">
      <div class="left">
        <div class="join_title">Join Thousands of Happy Sellers.</div>
        <div class="join_desc">Start Selling on Leegolu today.</div>

        <div class="btn">
          <q-btn color="secondary"> Start Selling </q-btn>
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
});
</script>

<style scoped>
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
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
}

.right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.right .q-btn {
  font-weight: 600;
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
  align-items: center;
  background: linear-gradient(180deg, #1a3f55 0%, #357196 84.27%);
}

.input_area form {
  display: flex;
  align-items: center;
}
.input_area form input {
  width: 100%;
}

.popular {
  margin: 3rem auto;
}
.popular img {
  width: 150px;
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding-top: 1rem;
}

.process img {
  width: 90%;
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
}

@media (min-width: 1300px) {
  .product_cards {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
</style>
