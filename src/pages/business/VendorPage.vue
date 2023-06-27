<template>
  <div class="loader" v-if="loading">
    <div>
      <q-spinner-comment color="primary" size="5em" />
    </div>
  </div>
  <div v-if="!loading" class="main_content" :style="colorSchemeStyles">
    <!-- <div
      :style="`background: url(${coverpreview}); background-repeat: no-repeat; background-size:cover`"
      class="editor_hero"
    ></div> -->
    <div
      v-if="builderData.cover_img"
      :style="`background: url(${coverpreview}); background-repeat: no-repeat; background-size:cover`"
      class="editor_hero"
    ></div>
    <div
      v-else
      :style="`background-repeat: no-repeat; background-size:cover`"
      class="editor_hero"
    ></div>

    <div class="upload_logo_area">
      <div class="upload_wrap container row justify-between items-center">
        <div class="left">
          <div class="left_wrap mobile row q-col-gutter-x-md">
            <div class="left_logo_area">
              <!-- {{ preview }} -->
              <img v-if="builderData.logo" :src="builderData.logo.url" alt="" />
              <template v-else>
                <div class="initials logoside">{{ builderData.initials }}</div>
              </template>
            </div>
            <!-- {{ vendor }} -->
            <div class="left_details">
              <div class="left_details_title">
                {{ builderData.business_name }}
              </div>
              <div v-if="vendor.about" class="left_details_desc q-mt-sm">
                {{ builderData.business_tagline }}
              </div>
              <div class="rating row q-mb-sm items-center">
                <q-rating
                  v-model="ratingModel"
                  size="1em"
                  :max="5"
                  color="black"
                />
                <span class="rate">240</span>
              </div>
              <!-- <div class="rating row items-center"></div> -->

              <div class="location">
                <i class="fa-solid fa-location"></i> {{ vendor.address }}
              </div>

              <div v-if="vendor.about" class="left_paragraph none_">
                We are all about {{ builderData.description }}
              </div>
            </div>
          </div>
        </div>

        <div class="right">
          <div class="vendor_btns">
            <q-btn
              :class="
                vendor.like ? 'none_ like vendor_btn' : 'none_ vendor_btn'
              "
              icon="fa-solid fa-heart"
              :label="vendor.like ? 'Liked' : 'Like'"
              flat
              @click="vendor.like === false ? addtoFav() : removeFav()"
            />
            <q-btn
              class="none_ vendor_btn"
              icon="fa-solid fa-phone"
              flat
              @click="phoneDialog = true"
            >
              <span class="q-ml-sm">Contact Business</span></q-btn
            >
          </div>

          <div
            style="gap: 0.5rem"
            class="row none_desktop no-wrap items-center"
          >
            <q-btn
              class="none_desktop"
              :class="vendor.like ? 'none_desktop like' : 'none_desktop'"
              @click="vendor.like === false ? addtoFav() : removeFav()"
              icon="fa-solid fa-heart"
              label=""
            />
            <q-btn
              class="none_desktop"
              icon="fa-solid fa-phone"
              label=""
              @click="phoneDialog = true"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="segments === 'Segment A'" class="segment_wrap">
      <div class="mobile_categories">
        <div class="row items-center no-wrap justify-center">
          <q-btn flat class="drop" color="white" label="All Products" />

          <!-- <q-btn-dropdown flat class="drop" color="white" label="All Products">
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>All Products</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown> -->
          <div @click="toggleModalSearch = true" class="input_search">
            <input
              v-model="sorted"
              placeholder="Search products..."
              type="text"
            />
            <i
              @click="toggleModalSearch = true"
              class="fa-solid text-primary fa-magnifying-glass"
            ></i>

            <!-- <i @click="toggleModalSearch = true"  class="fa-solid text-primary  fa-magnifying-glass mobile"></i> -->
          </div>
        </div>
      </div>
      <div class="top container">
        <div class="sort_area">
          <div class="left">
            <!-- <q-btn class="">  </q-btn> -->
            <div class="segmentA">All Products</div>
          </div>

          <div class="right">
            <div class="input_search">
              <input
                v-model="sorted"
                placeholder="Search products..."
                type="text"
              />
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="holder">
        <div class="">
          <div class="desc_text q-pt-lg container">
            {{ builderData.description }}
            <!-- <q-btn
              style="min-height: 0; padding: 0; text-transform: capitalize"
              flat
              class="text-weight-bold"
            >
              Read more
            </q-btn> -->
          </div>
          <!-- <div class="segmentA q-pt-lg container">My Collections</div> -->
          <div
            v-if="!loading && vendor && products.length"
            class="responsive_autofit_grid"
          >
            <DashboardHomeListingVue
              v-for="(listing, index) in sortproducts"
              :key="index"
              :listing="listing"
            />
          </div>
          <div v-else class="empty">
            <img src="/images/empty.svg" alt="" />

            <div class="empty_text">
              You currently have not listed any products
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="segments === 'Segment B'" class="segment_wrap">
      <div class="mobile_categories">
        <div class="row items-center no-wrap justify-center">
          <q-btn-dropdown
            flat
            class="drop"
            color="white"
            label="Categorized Collections"
          >
            <q-list>
              <q-item
                v-for="(collections, index) in grandAllProductsArr"
                :key="index"
                clickable
                v-close-popup
                @click="grandselectCollection(collections)"
              >
                <q-item-section>
                  <q-item-label>{{ collections.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <div @click="toggleModalSearch = true" class="input_search">
            <input
              v-model="sortingCriteria"
              placeholder="Search products..."
              type="text"
            />
            <i
              @click="toggleModalSearch = true"
              class="fa-solid text-primary fa-magnifying-glass"
            ></i>
          </div>
        </div>
      </div>
      <div class="top container">
        <div class="sort_area">
          <div class="left">
            <q-btn
              v-for="(collections, index) in grandAllProductsArr"
              :key="index"
              @click="grandselectCollection(collections)"
              :class="
                collections.id === grandselectedCollectionId
                  ? 'active'
                  : 'regular'
              "
            >
              {{ collections.name }}
            </q-btn>
            <!-- <q-btn class="regular"> Sneakers </q-btn>
            <q-btn class="regular"> Corporate </q-btn>
            <q-btn class="regular"> Casuals </q-btn>
            <q-btn class="regular"> Loafers </q-btn>
            <q-btn class="regular"> Boots </q-btn> -->
          </div>

          <div class="right">
            <div class="input_search">
              <input
                v-model="sortingCriteria"
                placeholder="Search products..."
                type="text"
              />
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="holder">
        <div class="">
          <div class="desc_text q-pt-lg container">
            {{ builderData.description }}
            <!-- <q-btn
              style="min-height: 0; padding: 0; text-transform: capitalize"
              flat
              class="text-weight-bold"
            >
              Read more
            </q-btn> -->
          </div>
          <div
            v-if="grandselectedCollectionProducts.length"
            class="responsive_autofit_grid"
          >
            <DashboardHomeListingVue
              v-for="(listing, index) in sortedProducts"
              :key="index"
              :listing="listing"
            />
          </div>
          <div v-else class="empty">
            <img src="/images/empty.svg" alt="" />

            <div class="empty_text">
              You currently have not listed any products under this collection
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="segments === 'Segment C'" class="segment_wrap">
      <div class="mobile_categories">
        <div class="row items-center no-wrap justify-center">
          <q-btn-dropdown
            flat
            class="drop"
            color="white"
            label="All Collections"
          >
            <q-list>
              <q-item clickable v-close-popup @click="showCollectionsFnc">
                <q-item-section>
                  <q-item-label>All Collections</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <div @click="toggleModalSearch = true" class="input_search">
            <input
              v-if="showCollections"
              v-model="sortedCollections"
              placeholder="Search collections..."
              type="text"
            />
            <input
              v-if="!showCollections"
              v-model="sortingcolCriteria"
              placeholder="Search products..."
              type="text"
            />
            <i
              @click="toggleModalSearch = true"
              class="fa-solid text-primary fa-magnifying-glass"
            ></i>
          </div>
        </div>
      </div>
      <div class="top container">
        <div class="sort_area">
          <div class="left">
            <div class="segmentA">All Collections</div>
          </div>

          <div class="right">
            <div class="input_search">
              <input
                v-if="showCollections"
                v-model="sortedCollections"
                placeholder="Search collections..."
                type="text"
              />
              <input
                v-if="!showCollections"
                v-model="sortingcolCriteria"
                placeholder="Search products..."
                type="text"
              />
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="holder">
        <div class="">
          <div class="desc_text q-pt-lg container">
            {{ builderData.description }}
            <!-- <q-btn
              style="min-height: 0; padding: 0; text-transform: capitalize"
              flat
              class="text-weight-bold"
            >
              Read more
            </q-btn> -->
          </div>

          <!-- {{ collections.length }} -->
          <div v-if="showCollections">
            <div
              v-if="collections.length"
              class="responsive_autofit_grid q-pt-lg q-pb-xl"
            >
              <div
                @click="selectCollection(collection)"
                v-for="(collection, index) in sortCollections"
                :key="index"
              >
                <img :src="collection.avatar.url" alt="" />
                <div class="collection_name">
                  {{ collection.name }}
                </div>
              </div>
            </div>
            <div v-else class="empty">
              <img src="/images/empty.svg" alt="" />

              <div class="empty_text">
                You currently have not created any collections
              </div>
            </div>
          </div>

          <div v-if="!showCollections">
            <div
              v-if="selectedCollectionProducts.length"
              class="responsive_autofit_grid container"
            >
              <DashboardHomeListingVue
                v-for="(listing, index) in sortedColProducts"
                :key="index"
                :listing="listing"
              />
            </div>
            <div v-else class="empty">
              <img src="/images/empty.svg" alt="" />

              <div class="empty_text">
                You currently have not listed any products on this collection
              </div>
            </div>

            <div class="flex justify-center">
              <q-btn
                @click="showCollectionsFnc"
                v-if="!showCollections"
                flat
                class="showcollections"
              >
                Show Collections
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <q-dialog v-model="phoneDialog">
    <q-card v-if="!loading" class="contact_vendor">
      <div class="phone_dailog">
        <div class="contact_seller q-pb-lg">Contact Seller</div>

        <div class="seller_img q-mb-md">
          <img
            :src="
              vendor.avatar !== null ? `/images/usersvg.svg` : vendor.avatar
            "
            alt=""
          />
        </div>
        <div class="vendorname">{{ vendor.business_name }}</div>
        <!-- <div class="ratings_area">
            <span class="rating_main_text">4.0</span>
            <q-rating
              v-model="ratingModel"
              size="1.5em"
              :max="4"
              color="secondary"
            />
          </div> -->

        <div class="call_ven q-mt-lg">
          <a target="_blank" :href="`tel:${vendor.phone}`"
            >Call {{ vendor.phone }}</a
          >
          <q-btn @click="viewChat" :loading="loadingChatBtn" flat
            >Chat Seller
          </q-btn>
        </div>

        <q-btn class="close" @click="phoneDialog = false" flat icon="close" />
      </div>
    </q-card>
  </q-dialog>
  <q-dialog v-model="toggleModalSearch" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Search</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-if="segments === 'Segment A'"
          v-model="sorted"
          autofocus
          @keyup.enter="toggleModalSearch = false"
        />
        <q-input
          dense
          v-if="segments === 'Segment B'"
          v-model="sortingCriteria"
          autofocus
          @keyup.enter="toggleModalSearch = false"
        />

        <div v-if="segments === 'Segment C'">
          <q-input
            dense
            v-if="showCollections"
            v-model="sortedCollections"
            autofocus
            @keyup.enter="toggleModalSearch = false"
          />
          <q-input
            dense
            v-if="!showCollections"
            v-model="sortingcolCriteria"
            autofocus
            @keyup.enter="toggleModalSearch = false"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Close" v-close-popup />
        <!-- <q-btn flat label="Add address" v-close-popup /> -->
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="chat">
    <ChatPageVue
      :conversationDetails="conversationDetails"
      :conversationMessages="conversationMessages"
      @closeModal="close"
    />
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import DashboardHomeListingVue from "src/components/listings/DashboardHomeListing.vue";
import ChatPageVue from "src/components/ChatPage.vue";
export default {
  data() {
    return {
      preview: "/images/sqrpreview.png",
      ratingModel: ref(4),
      businessDetailsModal: false,
      coverpreview: "/images/coverbg.svg",
      value: false,
      chat: false,
      loadingChatBtn: false,
      phoneDialog: false,
      preview: "/images/sqrpreview.png",
      segmentsModal: false,
      radio: false,
      vendorPhone: "",
      vendor: [],
      loading: true,
      colorSchemeStyles: "",
      segments: "",
      collections: [],
      toggleModalSearch: false,
      showCollections: true,
      products: [],
      conversationDetails: {},
      conversationMessages: [],
      collectionsArr: [],
      builderData: {},
      allProductsArr: [],
      grandAllProductsArr: [],
      selectedCollectionId: null,
      grandselectedCollectionId: "allpro",
      selectedCollectionProducts: [],
      grandselectedCollectionProducts: [],
      sortingCriteria: "",
      sortingcolCriteria: "",
      sorted: "",
      sortedCollections: "",
    };
  },

  components: {
    DashboardHomeListingVue,
    ChatPageVue,
  },
  mounted() {
    // console.log(this.$router.currentRoute.value.params.slug);
    // console.log(this.$store.leegoluauth.pageBuilderData);
    // this.colorSchemeStyles =
    //   this.$store.leegoluauth.pageBuilderData.selectedcoScheme.variables;
    // this.segments = this.$store.leegoluauth.pageBuilderData.segments;
    // if (this.$store.leegoluauth.pageBuilderData.business_name) {
    //   this.coverpreview =
    //     "data:image/png;base64," +
    //     this.$store.leegoluauth.pageBuilderData.coveruploads;
    //   this.preview =
    //     "data:image/png;base64," +
    //     this.$store.leegoluauth.pageBuilderData.uploads;
    // } else {
    // }
  },

  created() {
    this.getVendor();
    this.getCollections();
    // this.getVendorPhone();
    this.loadData();
  },
  computed: {
    sortedProducts() {
      let products = this.grandselectedCollectionProducts;

      if (this.sortingCriteria) {
        // products = products.sort((a, b) => a.name.localeCompare(b.name));
        products = products.filter((product) =>
          product.name
            .toLowerCase()
            .includes(this.sortingCriteria.toLowerCase())
        );
      }

      return products;
    },
    sortedColProducts() {
      let products = this.selectedCollectionProducts;

      if (this.sortingcolCriteria) {
        products = products.filter((product) =>
          product.name
            .toLowerCase()
            .includes(this.sortingcolCriteria.toLowerCase())
        );
      }

      return products;
    },
    sortproducts() {
      let products = this.products;

      if (this.sorted) {
        products = products.filter((product) =>
          product.name.toLowerCase().includes(this.sorted.toLowerCase())
        );
      }

      return products;
    },
    sortCollections() {
      let products = this.collections;

      if (this.sortedCollections) {
        products = products.filter((product) =>
          product.name
            .toLowerCase()
            .includes(this.sortedCollections.toLowerCase())
        );
      }

      return products;
    },
  },
  methods: {
    addtoFav() {
      let vendor = this.$router.currentRoute.value.params.slug;
      // console.log(slug);
      this.$api
        .post(`vendor/${vendor}/like`)
        .then((response) => {
          this.getVendor();
          this.$q.notify({
            message: "Vendor added to favourites",
            color: "green",
          });
          // console.log(response);
        })
        .catch(({ response }) => {
          this.loading = false;

          this.errors = error.errors || {};
        });
    },
    removeFav() {
      let vendor = this.$router.currentRoute.value.params.slug;
      // console.log(slug);
      this.$api
        .delete(`vendor/${vendor}/like`)
        .then((response) => {
          this.getVendor();
          this.$q.notify({
            message: "Vendor removed from favourites",
            color: "green",
          });
          // console.log(response);
        })
        .catch(({ response }) => {
          this.loading = false;

          this.errors = error.errors || {};
        });
    },
    close() {
      this.chat = false;
      // console.log("first");
    },

    selectCollection(collection) {
      // console.log(collection);
      this.selectedCollectionId = collection.id;
      this.selectedCollectionProducts = collection.products;
      this.showCollections = false;
    },
    grandselectCollection(collection) {
      // console.log(collection);
      if (collection.name === "All products") {
        this.grandselectedCollectionProducts = this.allProductsArr;
      } else {
        const selectedCollection = this.collectionsArr.find(
          (c) => c.id === collection.id
        );
        // console.log(selectedCollection);
        this.grandselectedCollectionProducts = selectedCollection.products;
        // this.grandselectedCollectionProducts = this.allProductsArr.filter(
        //   (product) => selectedCollection.products.includes(product)
        // );
      }
      this.grandselectedCollectionId = collection.id;
    },

    showCollectionsFnc() {
      this.selectedCollectionId = null;
      this.selectedCollectionProducts = [];
      this.showCollections = true;
    },
    async loadData() {
      try {
        const [collections, allProducts] = await Promise.all([
          this.loadCollections(),
          this.loadAllProducts(),
        ]);
        this.collectionsArr = collections;
        this.allProductsArr = allProducts;
        this.grandselectedCollectionProducts = allProducts;

        // console.log(collections, allProducts);
        this.combineProducts();
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },
    loadCollections() {
      let vendor = this.$router.currentRoute.value.params.slug;
      return this.$api
        .get(
          `collection/${
            this.$store.leegoluauth.vendorDetails.slug || vendor
          }/all`
        )
        .then((response) => response.data.data);
    },
    loadAllProducts() {
      let vendor = this.$router.currentRoute.value.params.slug;
      return this.$api
        .get(`vendor/${this.$store.leegoluauth.vendorDetails.slug || vendor}`)
        .then((response) => response.data.vendor.products);
    },
    combineProducts() {
      let allPData = {
        name: "All products",
        id: "allpro",
        products: [...this.allProductsArr],
      };
      this.grandAllProductsArr = [allPData, ...this.collectionsArr];
      // console.log(this.grandAllProductsArr);
    },

    getVendorPhone() {
      this.loading = true;
      let vendor = this.$router.currentRoute.value.params.slug;
      this.$api
        .get(`${vendor}/view-phone`)
        .then((response) => {
          // console.log(response);
          this.vendorPhone = response.data.phone;
          this.loading = false;
        })
        .catch(({ response }) => {
          this.loading = false;
        });
    },
    getVendor() {
      this.loading = true;
      let vendor = this.$router.currentRoute.value.params.slug;
      this.$api
        .get(`vendor/${vendor}`)
        .then((response) => {
          console.log(response);

          this.vendor = response.data.vendor;
          this.products = response.data.vendor.products;
          //       this.colorSchemeStyles =
          //   this.$store.leegoluauth.pageBuilderData.selectedcoScheme.variables;
          // this.segments = this.$store.leegoluauth.pageBuilderData.segments;
          // if (this.$store.leegoluauth.pageBuilderData.business_name) {
          //   this.coverpreview =
          //     "data:image/png;base64," +
          //     this.$store.leegoluauth.pageBuilderData.coveruploads;
          //   this.preview =
          //     "data:image/png;base64," +
          //     this.$store.leegoluauth.pageBuilderData.uploads;
          // } else {
          // }
          this.builderData = response.data.pagebuilder;
          this.colorSchemeStyles =
            response.data.pagebuilder.selectedcoScheme.variables;
          this.segments = response.data.pagebuilder.segments;
          this.coverpreview = response.data.pagebuilder.cover_img.url;
          this.preview = response.data.pagebuilder.logo.url;
          this.loading = false;
        })
        .catch(({ response }) => {
          this.loading = false;
        });
    },

    getCollections() {
      let vendor = this.$router.currentRoute.value.params.slug;
      this.$api
        .get(
          `collection/${
            this.$store.leegoluauth.vendorDetails.slug || vendor
          }/all`
        )
        .then(({ data }) => {
          // console.log(data);
          this.collections = data.data;
          this.loading = false;
        })
        .catch(({ response }) => {
          // console.log(response);
          this.loading = false;
        });
    },

    viewChat() {
      this.loadingChatBtn = true;
      let vendor = this.$router.currentRoute.value.params.slug;

      this.$api
        .post(`${vendor}/create/conversation`)
        .then((response) => {
          this.loadingChatBtn = false;
          console.log(response);
          this.conversationDetails = response.data.conversation;
          this.chat = true;
        })
        .catch(({ response }) => {
          console.log(response);
          this.loadingChatBtn = false;
          this.errors = error.errors || {};
        });
      // this.chat = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.segment_wrap {
  // margin-top: 11rem;
  // background: rgba(217, 217, 217, 0.31);
  // border: 1px dashed var(--primary-color);
  margin: 6rem auto 0rem;
  background: white;
  // margin: 8rem auto 0rem;
  // width: 95%;
}

.upload_logo_area {
  // width: 95%;
  margin: 0 auto;
}

.segment_wrap .left_paragraph .outline.q-btn {
  margin-top: -4rem;
}

.nav_area {
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  margin: 0.5rem auto;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  width: 95%;
  height: 59px;
}

.main_content {
  background: #f5f5f5;
}

.logo {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  color: var(--primary-color);
}
.right_nav img {
  width: 25px;
  height: 21px;
}
.editor_hero {
  height: 40vh;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  position: relative;
  // width: 95%;
  margin: 0 auto;
  background: var(--color-one);
}

.editor_hero .q-btn {
  position: absolute;
  top: 5%;
  right: 2%;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  background: #ffffff;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: var(--primary-color);
}

.desktop_icon {
  background: rgba(160, 160, 160, 0.51);
  border-radius: 19px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.q-btn.none_ img {
  width: 17px;
  height: 17px;
}
.nav_btn_icon {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  color: #000000;
}

.nav_btn_icon span {
  white-space: nowrap;
}

.editor_hero .q-btn span {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: var(--primary-color);
}

.initials {
  width: 296px;
  height: 257.55px;
  // border-radius: 50%;
  background-color: #0000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  font-family: "PT Serif";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
}

.color_text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 12px;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.preview {
  margin: 0 1.5rem;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
}

.preview,
.right .none_ {
  background: var(--color-one);
  color: #fff;
  width: 115px;
  height: 39px;
  text-transform: capitalize;
  border-radius: 5px;
}

@media (min-width: 980px) {
  .preview,
  .right .none_ {
    width: auto;
  }
}

.collection_name {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
}

.q-btn.none_,
.showcollections {
  background: white;
  // background: var(--color-four);
  color: var(--color-one) !important;
}

.search {
  margin-top: 1rem;
}

.drop {
  background: var(--color-one);
  color: white;
  border: 0.5px solid var(--color-one);
  border-radius: 20px;
  text-transform: capitalize;
}

.left_details {
  position: relative;
  padding-top: 0.7rem;
  width: 100%;
}

.left_details_desc {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  margin-top: 4px;
  color: var(--primary-color);
}

@media (min-width: 700px) {
  .left_details_desc {
    margin-top: 0;
  }
}

.rating .rate {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 10px;
  color: #000000;
}

.segmentA {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: #010101;
}

.desc_text {
  padding: 0 1.5rem;
}

.desc_text,
.desc_text .q-btn {
  display: none;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: var(--primary-color);
}
// .desc_text > .q-btn {
//   margin-top: 0.5rem;
// }

.desc_text .q-btn span,
.desc_text .q-btn img {
  position: relative;
}

.det {
  width: 100%;
}

.menu {
  display: none;
}
.location {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: var(--color-one);
  margin-top: 0.3rem;
  padding-bottom: 2rem;
  // color: #1f7bb5;
}

.left_details_title {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: var(--primary-color);
}

.upload_wrap .left {
  flex: 2;
}

.upload_wrap .right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.rating {
  margin-bottom: 1.5rem;
}

.left_paragraph {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  position: absolute;
  width: 100%;
  bottom: 14%;
  color: var(--primary-color);
}

.left_wrap .left_paragraph {
  // padding-bottom: 1rem;
}

.layout {
  margin: 1rem 0;
}

.none_desktop {
  display: none;
}

.q-btn.none_.like,
.q-btn.none_desktop.like {
  color: #ee4e36 !important;
}

.none_desktop.q-btn {
  text-transform: capitalize;
  text-align: center;
  background: #ffffff;
  border: 0.2px solid rgba(31, 123, 181, 0.4);
  border-radius: 2px;
  color: var(--color-one);
}

.layout_text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: var(--primary-color);
}

.right .q-btn {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
}

.right .q-btn.none_ {
  white-space: nowrap;
  width: auto;
}

.upload_logo_area {
  background: var(--color-two);
  // background: var(--primary-color);
  // background: #cedfeb;
  height: 132px;
}
.upload_wrap {
  padding-top: 1.2rem;
}

.left_logo_area img {
  width: 147.72px;
  height: 147.72px;
  border: 6px solid var(--color-two);
  // border: 6px solid #cedfeb;
  border-radius: 10px;
}

.left_logo_area {
  position: relative;
}

.left_logo_area .outline.q-btn {
  position: absolute;
  bottom: 20%;
  background: #ffffff;
  left: -5%;
  z-index: 5;
}

.left_logo_area .logoside {
  width: 147.72px;
  height: 147.72px;
  // border: 6px solid var(--color-two);
  // border: 1px solid white;
  border: 6px solid var(--color-two);
  border-radius: 10px;
  margin-bottom: 0.8rem;
  background: #000000;
  border-radius: 10px;
}

.outline.q-btn {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  text-transform: capitalize;
  color: var(--primary-color);
  padding: 4px 8px;
  background: #ffffff;
}

.outline.q-btn img {
  width: 25px;
  height: 25px;
  border: none;
  margin: 0 0.3rem 0 0;
}

.outline.q-btn::before {
  background: #ffffff;
  border: 1px solid var(--primary-color);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.44);
  border-radius: 5px 5px 0px 0px;
}
.outline.q-btn span {
  font-weight: 500;
  margin-left: 0.3rem;
}

.sort_area {
  // background: #f5f5f5;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0 0;
  margin: 0.1rem 0 1rem;
  flex-wrap: nowrap;
  padding-bottom: 0.6rem;
  // overflow-x: scroll;
}

.sort_area .left {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  overflow-x: scroll;
  gap: 1rem;
}

.sort_area .left::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

.sort_area .left::-webkit-scrollbar-track {
  background: #f4f4f4;
}

.sort_area .left::-webkit-scrollbar-thumb {
  background-color: #ee4e36;
}

.sort_area .active {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: #ffffff;
  height: 34px;
  text-align: center;
  white-space: nowrap;
  background: var(--color-one);
  border-radius: 17px;
  text-transform: capitalize;
}
.sort_area .regular {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  text-transform: capitalize;
  white-space: nowrap;
  color: var(--primary-color);
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

.mobile_categories {
  display: none;
  // width: 95%;
  margin: 0 auto;
}

.holder {
  background: #ffffff;
  // width: 95%;
  // padding: 0 1rem;
  margin: 0 auto;
}

@media (min-width: 980px) {
  .holder {
    background: none;
  }
}

.holder .responsive_autofit_grid {
  width: 90%;
  margin: 0 auto;
  max-width: 1440px;
  padding-bottom: 3rem;
  gap: 1rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.input_search {
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 2px solid #cccccc;
  border-radius: 50px;
}
.input_search.schemes {
  display: flex;
  align-items: center;
  background: #f0f0f0;
  border: 1px solid #bebcbc;
  border-radius: 8px;
}
.input_search.layout {
  border: 1px solid #bebcbc;
  border-radius: 8px;
}

.input_search input {
  border: none;
  background: transparent;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #9a9a9a;
  padding: 1rem;
  height: 42px;
  width: 100%;
}

.input_search i {
  padding: 1rem;
  font-size: 1rem;
  color: var(--color-one) !important;
}
.input_search i.mobile {
  display: none;
}

.vendor_btns {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.vendor_btns .q-btn {
  color: white;
}

.card {
  padding: 1rem;
  min-width: 363px;
  background: #ffffff;
  width: 466px;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  border-radius: 9px;
  // height: 522px;
}

.modal label {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  display: block;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.modal .title {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: var(--primary-color);
}

.modal .business_name {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: var(--primary-color);
}

.modal .company {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  width: 100%;
  color: var(--primary-color);
  border: none;
  background: transparent;
}

.modal .category {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #64737c;
}

.submit {
  margin: 1rem 0;
}
.submit .submitBTN {
  width: 100%;
  height: 55px;
  background: var(--color-one);
  border-radius: 5px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  text-transform: capitalize;
  text-align: center;
  color: white;
}

.submit .submitBTN .q-btn__content {
  justify-content: center;
}
.close {
  font-size: 2rem;
  min-height: 0;
}
.close i {
  color: var(--color-two);
}

.left_wrap {
  background: unset;
  width: unset;
  padding: unset;
  flex-wrap: nowrap;
}

// .left_wrap .left_details {
//   padding-left: 0;
// }
//preview
.previewMain {
  width: 100%;
}
.previewDiv {
  position: relative;
  background: url("/images/sqrpreview.png") no-repeat center;
  background-position: center;
  background-size: cover;
}
.previewDiv::before {
  position: absolute;
  content: "";
  background: rgba(0, 0, 0, 0.3);
  // border: 6px solid var(--color-one);
  // border-radius: 10px;
  width: 100%;
  height: 100%;
}

.previewDiv .click {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.form {
  margin-top: 1rem;
  position: relative;
  display: flex;
  justify-content: center;
}
.form img.previewimg {
  width: 296px;
  height: 100%;
  // height: 296px;
  border-radius: 0;
  border: none;
}
.form img.previewimg.cover {
  // width: 411px;
  height: 250px;
  border-radius: 0;
  border: none;
  position: relative;
  z-index: -1;
}
.form img.click {
  width: 120px;
}

.previewinput {
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 100%;
  background: transparent;
  opacity: 0;
}
.sort_area .right {
  padding-top: 0rem;
}

.active_ {
  background: linear-gradient(0deg, #d9d9d9 -10%, rgba(217, 217, 217, 0) 80%);
  border-bottom: 1px solid #1f7bb5;
}

@media (max-width: 1200px) {
  .holder .responsive_autofit_grid {
    margin-top: 0;
    padding-top: 0;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (max-width: 1050px) {
  .left_logo_area .outline.q-btn {
    left: -2%;
  }

  .upload_wrap .left {
    flex: 1.5;
  }

  .segment_wrap {
    margin: 5rem auto 0rem;
  }
}
@media (max-width: 950px) {
  // .form img.previewimg.cover {
  //   width: 100%;
  // }
  .holder .responsive_autofit_grid {
    width: 95%;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  .left_logo_area .outline.q-btn {
    right: -30%;
  }
  .lay {
    // display: none;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0 1rem;
  }

  .editor_hero {
    height: 25vh;
  }

  .right_nav .q-ml-xl {
    margin-left: 0.3rem !important;
  }
  .preview {
    margin: 0 0.5rem;
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    text-align: center;
    width: 85px;
  }

  .segment_wrap {
    margin: 0rem auto 0rem;
  }

  .left_paragraph .outline.q-btn img {
    width: 12px;
    height: 13px;
    margin-right: 0.3rem;
  }

  .mobile_categories {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    background: var(--color-four);
  }

  .mobile_categories > .row {
    width: 100%;
    justify-content: space-between;
    gap: 3rem;
  }
  .mobile_categories > .row .input_search {
    border-radius: 40px;
    height: 40px;
  }

  .sort_area {
    display: none;
  }

  .left_logo_area .outline.q-btn {
    top: 5%;
    right: -60%;
    bottom: unset;
    left: unset;
  }

  .left_paragraph .q-btn {
    margin-top: 0.8rem;
  }

  .segment_wrap {
    // margin-top: 7.5rem;
    background: white;
    border: none;
    width: 100%;
    padding-bottom: 2rem;
  }
  .segment_wrap .left_paragraph .outline.q-btn {
    margin-top: -1rem;
  }
  .listings_hold {
    background: #fff;
  }

  .card {
    min-width: 100%;
  }

  .upload_logo_area {
    height: auto;
    padding-bottom: 0.5rem;
    margin-top: -13%;
  }

  .location {
    padding-bottom: 0;
  }

  .left_details {
    padding: 0;
  }

  .desc_text {
    padding: 1.5rem;
  }

  .manage_seg {
    margin-top: -48px;
  }
  .left_wrap .left_paragraph .q-btn {
    display: none;
  }
  .upload_wrap {
    align-items: flex-end;
  }

  .upload_wrap .right > div {
    margin-bottom: 2rem;
  }

  .span {
    padding-left: 0;
  }

  .none_ {
    display: none !important;
  }

  .logo {
    font-size: 16px;
  }

  .none_desktop {
    display: flex;
  }

  .left_wrap.mobile {
    flex-direction: column;
  }

  .left_logo_area img {
    width: auto;
    border: unset;
  }

  .left_logo_area {
    padding-left: 0;
  }

  .desc_text,
  .desc_text .q-btn {
    display: inline-block;
  }

  // .desc_text > .q-btn {
  //   display: flex;
  // }
  .desc_text .q-btn {
    font-weight: 700;
  }

  // .responsive_autofit_grid {
  //   background: #fff;
  // }
}

@media (max-width: 700px) {
  .lay {
    display: none;
  }
  .menu {
    display: block;
    padding: 0;
    min-height: 0;
  }

  .outline.q-btn img {
    width: 15px;
    height: 12.75px;
  }

  .upload_logo_area {
    height: auto;
    padding-bottom: 0.5rem;
    margin-top: -22%;
  }

  .fit .span {
    margin: 0.5rem 0;
  }
}
@media (min-width: 500px) {
  .hide_desktop {
    display: none;
  }
}
@media (max-width: 500px) {
  .submit .submitBTN {
    height: 45px;
    font-size: 15px;
  }
  .holder .responsive_autofit_grid {
    margin-top: 0rem;
    padding-top: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  .rating .rate {
    font-size: 8px;
  }
  .left_logo_area {
    margin-bottom: 0.3rem;
  }
  .location {
    padding-bottom: 0rem;
  }

  .desc_text .outline.q-btn span {
    color: #000;
  }
  .logo {
    white-space: nowrap;
  }

  .desc_text .outline.q-btn img {
    width: 15px;
    height: 15px;
    margin: 0;
  }

  .lay {
    display: none;
  }

  .segment_wrap {
    margin-top: 0rem;
  }
  .desc_text {
    display: block;
    margin-bottom: 0rem;
    padding: 1.5rem 1rem 0.6rem;
  }

  // .holder {
  //   background-color: #ffffff;
  //   width: 95%;
  //   margin: 0 auto;
  // }

  // .holder .responsive_autofit_grid {
  //   width: 95%;
  //   margin: 0 auto;
  // }

  .left_logo_area {
    width: 100%;
  }

  .outline.q-btn {
    background: #ffffff;
    border: 1px solid #000000;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.44);
    border-radius: 5px;
  }

  .left_logo_area .outline.q-btn {
    // right: -1%;
    width: 100%;
    right: -32%;
  }

  .left_details_title {
    font-size: 15px;
    line-height: 4px;
    margin-top: 0.1rem;
  }

  .right .q-btn {
    font-size: 10px;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .left_details_desc {
    font-size: 10px;
    line-height: 13px;
    margin-top: 8px;
    margin-bottom: 2px;
  }
  .outline.q-btn,
  .outline.q-btn span {
    font-size: 10px;
    // height: 23px;
  }
  .editor_hero {
    height: 20vh;
  }

  .drop {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
    color: #ffffff;
  }

  .nav_area {
    height: 45px;
  }

  .preview {
    height: 38.07px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .input_search {
    background: transparent;
    border: none;
  }

  .input_search input,
  input_search i.mobile_ {
    display: none;
  }
  .input_search i.mobile {
    display: flex;
  }

  .input_search i {
    font-size: 1.5rem;
  }

  .segment_wrap {
    width: 100%;
  }

  .span img {
    width: 30px !important;
    height: 30px !important;
    width: 22.69px !important;
    height: 22.69px !important;
  }
  .right_nav .q-ml-xl {
    margin: 0;
    gap: 0.3rem !important;
  }
  .preview {
    margin: 0 0.1rem;
    width: 74.67px;
    height: 28.07px;
  }

  .span .q-btn {
    padding: 5px;
    min-height: auto;
    text-transform: capitalize;
  }

  // .location {
  //   margin-bottom: 0.5rem;
  // }

  .span span {
    font-size: 12px;
  }

  .modal .business_name {
    font-size: 10px;
  }

  .modal .company {
    font-size: 13px;
  }

  .textarea .texta {
    font-size: 10px;
    color: #000;
  }
  .upload_logo_area {
    margin-top: -16%;
  }
  .left_logo_area img,
  .left_logo_area .logoside {
    width: 83px;
    height: 83px;
    // margin-left: 1.4rem;
    margin-bottom: 0.3rem;
  }

  .left_wrap.mobile {
    padding-left: 1rem;
  }

  .left_details {
    padding: 0;
  }

  .desktop_icon img {
    width: 22.69px;
    height: 22.69px;
  }
}

@media (max-width: 420px) {
  .upload_logo_area {
    margin-top: -20%;
  }
}
@media (max-width: 360px) {
  .span img {
    width: 15.69px !important;
    height: 15.69px !important;
  }
  .desktop_icon {
    width: 25px;
    height: 25px;
  }
  // .holder .responsive_autofit_grid {
  //   grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  //   grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  // }
  .right_nav .q-ml-xl {
    gap: 0rem !important;
  }

  .desc_text {
    padding: 1rem 1rem 0;
  }
}
@media (max-width: 340px) {
  .logo {
    font-size: 14px;
  }

  .logo .q-btn {
    font-size: 12px;
  }

  .preview {
    margin: 0 0.1rem;
    width: 49.67px;
    height: 22.07px;
  }
}
</style>
