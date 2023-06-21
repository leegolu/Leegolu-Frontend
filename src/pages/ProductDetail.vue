<template>
  <div v-if="loading" class="q-pt-xl">
    <q-skeleton class="container" height="250px" />
  </div>
  <div v-if="!loading" class="detail q-pt-xl">
    <div class="product_detail_wrap container">
      <div class="left">
        <q-carousel
          swipeable
          animated
          v-model="slide"
          arrows
          thumbnails
          class="carou"
          infinite
        >
          <q-carousel-slide
            v-for="(image, index) in product.data.uploads"
            :key="index"
            :name="index"
            @click="popupImg(image)"
            :img-src="image.url"
          />
        </q-carousel>
      </div>

      <div class="right">
        <div class="location">
          {{ product.data.area.name }}, {{ product.data.state.name }}
        </div>
        <div class="title q-mb-xs">{{ product.data.name }}</div>
        <div class="price">₦{{ product.data.price.toLocaleString() }}</div>

        <div class="q-mt-md q-pb-xs row items-center justify-between posted">
          <small>Posted {{ hoursago }}hrs Ago</small>
          <small>{{ product.data.views }} Views</small>
        </div>
        <hr class="q-mb-md" />

        <p class="desc">
          {{ product.data.description }}
        </p>
        <!-- <p class="desc">
          This is a firstbody 2011 model Toyota Camry for cheaper rate! Car is
          in good condition, it buy and drive! Be sure inform the seller you get
          the contact on Olist
        </p> -->

        <div class="owner">
          <div class="owner_left">
            <img
              :src="
                product.vendor.avatar !== null
                  ? `/images/usersvg.svg`
                  : product.vendor.avatar
              "
              alt=""
            />
          </div>
          <div class="owner_right">
            <p class="owner_title">
              {{ product.vendor.business_name }}
              <!-- <span> | 7 Months</span> -->
            </p>
            <div @click="ratingsView = true" class="ratings_area">
              <span class="rating_main_text">4.0</span>
              <q-rating
                v-model="ratingModel"
                size="1em"
                :max="5"
                color="secondary"
              />
              <span class="ratings_subtext"> (2345) </span>
            </div>
          </div>
        </div>

        <div class="btns q-mt-lg">
          <q-btn
            flat
            class="bg-secondary"
            color="white"
            style="border-radius: 5px"
            @click="viewPhone"
            :loading="loadingBtn"
            ><img src="/images/cal.svg" class="q-mr-sm" alt="" />Show
            Contact</q-btn
          >
          <q-btn
            flat
            @click="viewChat"
            style="border-radius: 5px"
            color="white"
            class="bg-primary"
            :loading="loadingChatBtn"
            ><img src="/images/chat.svg" class="q-mr-sm" alt="" />Chat
            Seller</q-btn
          >
        </div>
        <hr class="q-mt-xl q-mb-md" />

        <div class="buyer">
          <p class="guide">
            <i class="fa-regular fa-file"></i>
            Buyer Guide
          </p>

          <ul>
            <li>Keep in mind not to send any prepayments.</li>
            <li>
              Arrange to meet with the seller to pay for & pickup your item.
            </li>
            <li>Meet the vendor in a well-lit area.</li>
            <li>Check the products to ensure they are what you require.</li>
            <li>Verify all the paperwork, and only pay if you're pleased.</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="product_information">
      <div class="info_main_text">Product Information</div>

      <hr class="q-mt-lg" />

      <div class="info_detail">
        <div
          v-for="(detail, index) in productDetails"
          :key="index"
          class="info_item"
        >
          <!-- {{ detail }} -->
          <p>{{ detail[1][0] }}</p>
          <small>{{ detail[1][1] }}</small>
        </div>
        <!-- <div class="info_item">
          <p>COROLLA</p>
          <small>MODEL</small>
        </div>
        <div class="info_item">
          <p>2019</p>
          <small>YEAR</small>
        </div>
        <div class="info_item">
          <p>FOREIGN USED</p>
          <small>CONDITION</small>
        </div>
        <div class="info_item">
          <p>AUTOMATIC</p>
          <small>TRANSMISSION</small>
        </div>
        <div class="info_item">
          <p>BLACK</p>
          <small>COLOR</small>
        </div>
        <div class="info_item">
          <p>NO FAULTS</p>
          <small>FAULTS</small>
        </div>
        <div class="info_item">
          <p>NO</p>
          <small>REGISTERED </small>
        </div>
        <div class="info_item">
          <p>34,000 KM</p>
          <small>MILEAGE</small>
        </div>
        <div class="info_item">
          <p>MALAMI00937747748</p>
          <small>VIN</small>
        </div> -->
      </div>

      <hr class="q-mb-lg" />

      <!-- <div class="product_info_hold">
        <div class="left">
          <div class="info_main_text">Product Details</div>

          <ul class="q-mt-md">
            <li>6 Cyliner Engine</li>

            <li>
              Buy with confidence, if you have any product or installation
              issue, please feel free to contact us, we will try to help you out
              within 24 hours
            </li>

            <li>
              Directly replacement, just plug and play, no other parts or
              modifications needed and no error message warning on dashboard for
              99% vehicle, no mercury, UV, IR or other deleterious radiation
            </li>

            <li>
              Bulbs will strobe at braking mode, so that people could notice
              your car easily and keep safe distance to avoid any automotive
              cars, trucks, SUVs getting rear-end collision
            </li>
            <li>Complete paperwork, and no fines or traffic violations</li>
          </ul>
        </div>
        <div class="right">
          <div class="info_main_text">Features</div>

          <div class="features_hold">
            <div class="feature">
              <p>Air Conditioning</p>
            </div>
            <div class="feature">
              <p>FM/AM Radio</p>
            </div>
            <div class="feature">
              <p>Cruise Control</p>
            </div>
            <div class="feature">
              <p>CD Player</p>
            </div>
            <div class="feature">
              <p>Sun Roof</p>
            </div>
            <div class="feature">
              <p>Air Conditioning</p>
            </div>
            <div class="feature">
              <p>Air Conditioning</p>
            </div>
            <div class="feature">
              <p>Air Conditioning</p>
            </div>
          </div>
        </div>
      </div> -->
    </div>

    <FooterVue />

    <q-dialog v-model="phoneDialog">
      <q-card class="contact_vendor">
        <div class="phone_dailog">
          <div class="contact_seller q-pb-lg">Contact Seller</div>

          <div class="seller_img q-mb-md">
            <img
              :src="
                product.vendor.avatar !== null
                  ? `/images/usersvg.svg`
                  : product.vendor.avatar
              "
              alt=""
            />
          </div>
          <div class="vendorname">{{ product.vendor.business_name }}</div>
          <div class="ratings_area">
            <span class="rating_main_text">4.0</span>
            <q-rating
              v-model="ratingModel"
              size="1em"
              :max="5"
              color="secondary"
            />
          </div>

          <div class="call_ven q-mt-lg">
            <a target="_blank" :href="`tel:${phone_number}`"
              >Call {{ phone_number }}</a
            >
          </div>

          <q-btn class="close" @click="phoneDialog = false" flat icon="close" />
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="chat">
      <ChatPageVue
        :conversationDetails="conversationDetails"
        :conversationMessages="conversationMessages"
        :productData="productData"
        @convo="getConversations"
        @refresh-message="getConversations"
        @closeModal="close"
      />
    </q-dialog>
    <q-dialog v-model="ratingsView">
      <RatingsComponentVue
        :productData="product"
        @closeModalRatings="closeRatings"
      />
    </q-dialog>

    <q-dialog v-model="popImageDialog">
      <q-card class="showModalImg">
        <!-- hello there -->
        <q-img spinner-color="primary" :src="popImg">
          <template v-slot:error>
            <div class="absolute-full flex flex-center bg-negative text-white">
              Cannot load image
            </div>
          </template>
        </q-img>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import FooterVue from "src/components/Footer.vue";
import ChatPageVue from "src/components/ChatPage.vue";
import RatingsComponentVue from "src/components/RatingsComponent.vue";
export default {
  setup() {
    return {
      ratingModel: ref(4),
      product: ref({}),
      slide: ref(1),
      productDetails: [],
      popImg: ref(""),
      hoursago: "",
      loading: ref(true),
      popImageDialog: ref(false),
      loadingBtn: ref(false),
      loadingChatBtn: ref(false),
      conversationDetails: {},
      conversationMessages: [],
      productData: ref({}),
      ratingsView: ref(false),
      chat: ref(false),
      phone_number: "",
      phoneDialog: ref(false),
    };
  },

  components: {
    FooterVue,
    ChatPageVue,
    RatingsComponentVue,
  },

  created() {
    this.getProduct();

    // this.$watch(
    //   (e) => echo.listen,
    //   (listen) => {
    //     if (listen) {
    //       !this.whispering && this.listenForIsTyping();
    //       !this.listening && this.listenForNewMessage();
    //     }
    //   },
    //   { immediate: true, deep: true }
    // );
    // console.log(this.$router.currentRoute.value.fullPath);
  },

  methods: {
    popupImg(img) {
      console.log(img);
      this.popImageDialog = true;
      this.popImg = img.url;
    },
    close() {
      this.chat = false;
      // console.log("first");
    },
    closeRatings() {
      // console.log("how fa");
      this.ratingsView = false;
    },
    getProduct() {
      let product = this.$router.currentRoute.value.params.slug;
      this.loading = true;
      this.$api
        .get(`product/${product}`)
        .then((response) => {
          this.product = response.data;
          // const newArray = Object.entries();
          const filteredEntries = Object.entries(
            response.data.data.details
          ).filter(([key, value]) => value !== null);

          const filteredObject = Object.entries(filteredEntries);
          // console.log(filteredObject);
          this.productDetails = filteredObject;

          const postDate = new Date(response.data.data.created_at);
          const now = new Date();
          const timeDifference = now - postDate;
          const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
          this.loading = false;
          this.hoursago = hoursAgo;
          // console.log(hoursAgo);
          console.log(response);
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },

    viewPhone() {
      this.loadingBtn = true;
      let product = this.$router.currentRoute.value.params.slug;

      this.$api
        .get(`${this.product.vendor.slug}/${product}/view-phone`)
        .then((response) => {
          this.loadingBtn = false;
          this.phoneDialog = true;
          this.phone_number = response.data.phone;
          // console.log(response);
        })
        .catch(({ response }) => {
          if (response.status === 401) {
            this.$store.leegoluauth.previousRoute =
              this.$router.currentRoute.value.fullPath;
            this.$router.replace({ name: "login" });
            this.$q.notify({
              message: "You need to login to view vendor contact",
              color: "green",
            });
          }
          this.loadingBtn = false;
          this.errors = error.errors || {};
        });
    },

    viewChat() {
      this.loadingChatBtn = true;
      let product = this.$router.currentRoute.value.params.slug;
      // .post(`${product}/${this.product.vendor.slug}/create/conversation`)
      // console.log("triggered");
      this.$api
        .post(`${product}/create/conversation`)
        .then((response) => {
          this.loadingChatBtn = false;
          // console.log(response);
          this.conversationDetails = response.data.conversation.id;
          this.productData = response.data.product;
          this.chat = true;
        })
        .catch(({ response }) => {
          // console.log(response);
          this.loadingChatBtn = false;
          this.errors = error.errors || {};
        });
      // this.chat = true;
    },

    getConversations(id) {
      this.$q.loading.show();
      this.$api
        .get(`${this.$store.leegoluauth.vendorDetails.slug}/${id}/messages`)
        .then((response) => {
          this.$q.loading.hide();
          console.log(response);
          this.conversationMessages = response.data.messages;
        })
        .catch(({ response }) => {
          this.loadingBtn = false;
          this.$q.loading.hide();

          this.errors = error.errors || {};
        });
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 0;
}
.product_detail_wrap {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  // align-items: center;
  width: 95%;
}

.right {
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 2.2rem 1rem 1rem;
  height: 100%;
}
.product_detail_wrap .location {
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-transform: uppercase;
  // text-transform: capitalize;
}
.product_detail_wrap .title {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  text-transform: capitalize;
}
.product_detail_wrap .price {
  font-weight: 800;
  font-size: 36px;
  line-height: 44px;
  text-transform: capitalize;
  color: #000000;
}

.posted small {
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-transform: capitalize;
  color: #9d9d9d;
}

.showModalImg {
  min-width: 100%;
  overflow: hidden;
  // height: 100%;
}

@media (min-width: 500px) {
  .showModalImg {
    min-width: 500px;
    // height: 100%;
  }
}

p.desc {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-transform: capitalize;
  color: #000000;
  margin-bottom: 2rem;
}

.owner {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.owner_left {
  padding-top: 0.5rem;
}

.owner_left img {
  width: 51.24px;
  height: 51.24px;
  border-radius: 50%;
}

p.owner_title {
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-transform: capitalize;
  color: #000000;
}
p.owner_title span {
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

.btns {
  display: grid;
  gap: 1.5rem;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
}
.btns .q-btn {
  padding: 0.75rem;
  font-weight: 700;
  font-size: 100%;
  line-height: 24px;
  text-align: center;
  text-transform: capitalize;
  color: #ffffff;
}
.btns .q-btn img {
  width: 16.67px;
  height: 16.67px;
}

p.guide {
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-transform: capitalize;
  color: #000000;
  padding-top: 1rem;
  margin-bottom: 0.7rem;
}
.right ul {
  margin-left: 1rem;
}
ul li {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
  margin: 0.3rem 0;
  list-style-type: disc;
}

// thumbnail

.splide__slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-height: 470px;
}

.splide__slide {
  opacity: 0.6;
}

.splide__slide.is-active {
  opacity: 1;
}

/* thunmnail */

.thumbnails {
  display: flex;
  margin: 0.3rem auto 0;
  padding: 0;
  gap: 0.5rem;
  justify-content: center;
}

.thumbnail {
  width: 143px;
  height: 180px;
  overflow: hidden;
  list-style: none;
  margin: 0.5rem 0 0;
  cursor: pointer;
  opacity: 0.3;
}

.thumbnail.is-active {
  opacity: 1;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}
.splide img {
  object-fit: contain;
}

// info

.product_information {
  width: 95%;
  margin: 6rem auto 0;
  background: #ffffff;
  /* Leegolu Segment Box Shadow */

  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  padding: 1.5rem;
}

.product_information .right {
  background: none;
  box-shadow: none;
  padding: 0;
}
.product_information .left ul {
  margin-left: 1rem;
}

.info_main_text {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  text-transform: capitalize;
}

.info_detail .info_item p {
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-transform: capitalize;
}
.info_detail .info_item small {
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  text-transform: capitalize;
}

.product_info_hold {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 4rem;
  align-items: flex-start;
}

.product_info_hold li {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  list-style-type: disc;
}

.features_hold {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  align-items: flex-start;
  margin-top: 1.5rem;
}

.info_item {
  padding: 1.5rem 0;
}

.info_detail {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  align-items: flex-start;
  margin-top: 1.5rem;
}

.features_hold .feature {
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 20px;
  text-align: center;
  padding: 0.5rem;
}

.features_hold .feature p {
  font-weight: 500;
  font-size: 10px;
  line-height: 20px;
  color: #000000;
}

@media (max-width: 1100px) {
  .category_items {
    overflow-x: scroll;
  }
}
@media (max-width: 1000px) {
  .product_detail_wrap {
    grid-template-columns: 1fr;
    gap: 14rem;
  }
  .right {
    padding: 1rem 1rem 1rem;
  }

  .posted {
    margin-top: 0px;
  }

  p.desc {
    margin-bottom: 0.8rem;
  }
}
@media (max-width: 500px) {
  .info_item {
    padding: 0rem 0;
  }
  .btns {
    grid-template-columns: 1fr;
  }

  .product_information {
    margin: 2rem auto 0;
  }

  .btns .q-btn {
    padding: 0.55rem;
  }

  .product_detail_wrap .location {
    font-size: 10px;
  }
  .product_detail_wrap .title {
    font-size: 20px;
    margin-bottom: 0.3rem;
    line-height: 25px;
  }
  .product_detail_wrap .price {
    font-size: 28px;
    line-height: 25px;
    margin-bottom: 0.4rem;
  }

  .posted small {
    font-size: 10px;
  }

  p.desc {
    font-size: 14px;
  }

  ul li {
    font-size: 12px;
  }

  .detail {
    padding-top: 20px;
  }

  .product_detail_wrap {
    gap: 11rem;
  }

  .btns {
    gap: 1rem;
  }
}

@media (max-width: 400px) {
  .product_detail_wrap {
    gap: 9rem;
  }
}
</style>
