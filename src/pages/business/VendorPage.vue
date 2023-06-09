<template>
  <div class="loader" v-if="loading">
    <div>
      <q-spinner-comment color="primary" size="5em" />
    </div>
  </div>
  <div v-if="!loading" :style="colorSchemeStyles" class="bg-white">
    <div
      :style="`background: url(${coverpreview}); background-repeat: no-repeat; background-size:cover`"
      class="editor_hero"
    ></div>

    <div class="upload_logo_area">
      <div class="upload_wrap container row justify-between items-center">
        <div class="left">
          <div class="left_wrap mobile row items-center q-col-gutter-x-md">
            <div class="left_logo_area">
              <img :src="preview" alt="" />
            </div>
            <!-- {{ vendor }} -->
            <div class="left_details">
              <div class="left_details_title">
                {{ this.$store.leegoluauth.pageBuilderData.business_name }}
              </div>
              <div v-if="vendor.about" class="left_details_desc q-mt-sm">
                {{ vendor.about.name }}
              </div>
              <div class="rating row items-center">
                <q-rating
                  v-model="ratingModel"
                  size="1em"
                  :max="5"
                  color="secondary"
                  class="q-my-sm"
                />
                <span>240</span>
              </div>
              <!-- <div class="rating row items-center"></div> -->

              <div class="location">
                <i class="fa-solid fa-location"></i> {{ vendor.address }}
              </div>

              <div v-if="vendor.about" class="left_paragraph none_">
                We are all about {{ vendor.about.name }}
              </div>
            </div>
          </div>
        </div>

        <div class="right">
          <div class="vendor_btns">
            <q-btn
              class="none_ vendor_btn"
              icon="fa-solid fa-heart"
              label="Like"
              flat
            />
            <q-btn
              class="none_ vendor_btn"
              icon="fa-solid fa-phone-volume"
              label="Contact Business"
              flat
              @click="phoneDialog = true"
            />
          </div>

          <div class="row none_desktop q-gutter-md no-wrap items-center">
            <q-btn class="none_desktop" icon="fa-solid fa-heart" label="" />
            <q-btn
              class="none_desktop"
              icon="fa-solid fa-phone-volume"
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
          <q-btn-dropdown flat class="drop" color="white" label="All Products">
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>All Products</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <div class="input_search">
            <input
              v-model="sorted"
              placeholder="Search products..."
              type="text"
            />
            <i class="fa-solid text-primary fa-magnifying-glass"></i>
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

      <div class="">
        <div class="desc_text q-pt-lg container">
          It’s how we’ve always described our bars. What’s inside. <br />
          What isn’t. We think it’s everything you need...
          <q-btn
            style="min-height: 0; padding: 0; text-transform: capitalize"
            flat
            class="text-weight-bold"
          >
            Read more
          </q-btn>
        </div>
        <!-- <div class="segmentA q-pt-lg container">My Collections</div> -->
        <div
          v-if="!loading && vendor && products.length"
          class="responsive_autofit_grid container"
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
          <div class="input_search">
            <input
              v-model="sortingCriteria"
              placeholder="Search products..."
              type="text"
            />
            <i class="fa-solid text-primary fa-magnifying-glass"></i>
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
                collections.name === 'All products' ? 'active' : 'regular'
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
      <div class="">
        <div class="desc_text q-pt-lg container">
          It’s how we’ve always described our bars. What’s inside. <br />
          What isn’t. We think it’s everything you need...
          <q-btn
            style="min-height: 0; padding: 0; text-transform: capitalize"
            flat
            class="text-weight-bold"
          >
            Read more
          </q-btn>
        </div>
        <div
          v-if="grandselectedCollectionProducts.length"
          class="responsive_autofit_grid container"
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
            <i class="fa-solid text-primary fa-magnifying-glass"></i>
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
      <div class="">
        <div class="desc_text q-pt-lg container">
          It’s how we’ve always described our bars. What’s inside. <br />
          What isn’t. We think it’s everything you need...
          <q-btn
            style="min-height: 0; padding: 0; text-transform: capitalize"
            flat
            class="text-weight-bold"
          >
            Read more
          </q-btn>
        </div>

        <!-- {{ collections.length }} -->
        <div v-if="showCollections">
          <div
            v-if="collections.length"
            class="responsive_autofit_grid q-pt-lg q-pb-xl container"
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

  <q-dialog v-model="phoneDialog">
    <q-card v-if="!loading" class="contact_vendor">
      <div class="phone_dailog">
        <div class="contact_seller q-pb-lg">Contact Seller</div>

        <div class="seller_img q-mb-md">
          <img
            :src="
              vendor.avatar !== null
                ? `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTglXGZjjb4pIhLFesgiwB416bLsr2WPuguUNFkaPUSei78Og-iIiINQFvBdopWxNY2yhk&usqp=CAU`
                : vendor.avatar
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
          <a target="_blank" :href="`tel:${vendorPhone}`"
            >Call {{ vendorPhone }}</a
          >
          <q-btn flat>Chat Seller </q-btn>
        </div>

        <q-btn class="close" @click="phoneDialog = false" flat icon="close" />
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import DashboardHomeListingVue from "src/components/listings/DashboardHomeListing.vue";
export default {
  data() {
    return {
      preview: "/images/sqrpreview.png",
      ratingModel: ref(4),
      businessDetailsModal: false,
      coverpreview: "/images/coverbg.svg",
      value: false,
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
      showCollections: true,
      products: [],
      collectionsArr: [],
      allProductsArr: [],
      grandAllProductsArr: [],
      selectedCollectionId: null,
      grandselectedCollectionId: null,
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
  },
  mounted() {
    console.log(this.$store.leegoluauth.pageBuilderData);
    this.colorSchemeStyles =
      this.$store.leegoluauth.pageBuilderData.selectedcoScheme.variables;
    this.segments = this.$store.leegoluauth.pageBuilderData.segments;
    if (this.$store.leegoluauth.pageBuilderData.business_name) {
      this.coverpreview =
        "data:image/png;base64," +
        this.$store.leegoluauth.pageBuilderData.coveruploads;
      this.preview =
        "data:image/png;base64," +
        this.$store.leegoluauth.pageBuilderData.uploads;
    } else {
    }
  },

  created() {
    this.getVendor();
    this.getCollections();
    this.getVendorPhone();
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
        console.log(selectedCollection);
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
      return this.$api
        .get(`collection/${this.$store.leegoluauth.vendorDetails.slug}/all`)
        .then((response) => response.data.data);
    },
    loadAllProducts() {
      return this.$api
        .get(`vendor/${this.$store.leegoluauth.vendor.slug}`)
        .then((response) => response.data.vendor.products);
    },
    combineProducts() {
      let allPData = {
        name: "All products",
        products: [...this.allProductsArr],
      };
      this.grandAllProductsArr = [allPData, ...this.collectionsArr];
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
          this.vendor = response.data.vendor;
          this.products = response.data.vendor.products;
          this.loading = false;
          // console.log(response);
        })
        .catch(({ response }) => {
          this.loading = false;
        });
    },

    getCollections() {
      this.$api
        .get(`collection/${this.$store.leegoluauth.vendorDetails.slug}/all`)
        .then(({ data }) => {
          console.log(data);
          this.collections = data.data;
          this.loading = false;
        })
        .catch(({ response }) => {
          // console.log(response);
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.segment_wrap {
  // margin-top: 11rem;
  // background: rgba(217, 217, 217, 0.31);
  // border: 1px dashed var(--primary-color);
  margin: 8rem auto 0rem;
  // width: 90%;
}

.segment_wrap .left_paragraph .outline.q-btn {
  margin-top: -4rem;
}

.logo {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: var(--primary-color);
}
.right_nav img {
  width: 25px;
  height: 21px;
}
.editor_hero {
  height: 40vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  background: #83b8db;
}

.segmentA {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: #010101;
}

.showcollections {
  background: var(--color-one);
  color: #fff;
  text-transform: capitalize;
  margin-bottom: 2rem;
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
.vendor_btns {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.collection_name {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
}

.vendor_btns .q-btn.vendor_btn {
  // width: 94px;
  height: 41px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  color: var(--color-one);
  text-transform: capitalize;
  text-align: center;
  background: #ffffff;
  border: 0.5px solid rgba(31, 123, 181, 0.4);
  border-radius: 5px;
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

.none_desktop.q-btn {
  color: var(--color-one) !important;
  text-transform: capitalize;
  text-align: center;
  background: #ffffff;
}

.color_text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.drop {
  background: var(--color-one);
  border: 0.5px solid var(--color-one);
  // border: 0.5px solid #1f7bb5;
  border-radius: 20px;
  color: #fff;
  text-transform: capitalize;
}

.left_details_desc {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: var(--primary-color);
}

.desc_text {
  display: none;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: var(--primary-color);
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
  color: var(--color-two);
}

.left_details_title {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: var(--primary-color);
}

.left_paragraph {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  margin-top: 1rem;
  color: var(--primary-color);
}

.layout {
  margin: 1rem 0;
}

.none_desktop {
  display: none;
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
  color: #ffffff;
}

.upload_logo_area {
  background: var(--color-two);
  height: 132px;
}
.upload_wrap {
  padding-top: 1.2rem;
}

.left_logo_area img {
  width: 147.72px;
  height: 147.72px;
  border: 6px solid var(--color-two);
  border-radius: 10px;
}

.left_logo_area {
  position: relative;
  // width: 100%;
}

.left_logo_area .outline.q-btn {
  position: absolute;
  bottom: 20%;
  background: #ffffff;
  left: -10%;
  z-index: 5;
}

.outline.q-btn {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: var(--primary-color);
  background: #ffffff;
}

.outline.q-btn::before {
  background: #ffffff;
  border: 1px solid var(--primary-color);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.44);
  border-radius: 5px 5px 0px 0px;
}
.outline.q-btn span {
  font-weight: 500;
}

.sort_area {
  // background: #f5f5f5;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0 0;
  margin: 0.1rem 0 0;
}

.sort_area .left {
  display: flex;
  align-items: center;
  gap: 1rem;
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
  color: #ffffff;
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

.submit {
  margin: 1rem 0;
}
.submit .q-btn {
  width: 100%;
  height: 55px;
  background: #1f7bb5;
  border-radius: 5px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #ffffff;
}

.submit .q-btn .q-btn__content {
  justify-content: center;
}
.close {
  font-size: 2rem;
  min-height: 0;
}
.close i {
  color: #979797;
}

.left_wrap {
  background: unset;
  width: unset;
  padding: unset;
}

//preview
.previewMain {
  width: 100%;
}
.previewDiv {
  position: relative;
}
.previewDiv::before {
  position: absolute;
  content: "";
  background: rgba(0, 0, 0, 0.5);
  border: 6px solid var(--color-two);
  border-radius: 10px;
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
  height: 296px;
}
.form img.previewimg.cover {
  width: 411px;
  height: 200px;
}
.form img.click {
  width: 120px;
}

.responsive_autofit_grid {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
@media (max-width: 800px) {
  .responsive_autofit_grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

.previewinput {
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 100%;
  background: transparent;
  opacity: 0;
}

@media (max-width: 950px) {
  .form img.previewimg.cover {
    width: 100%;
  }

  .lay {
    display: none;
  }

  .mobile_categories {
    display: flex;
    justify-content: space-between;
    background: rgba(31, 123, 181, 0.24);
    padding: 0.5rem;
    background: var(--color-two);
    // background: rgba(31, 123, 181, 0.74);
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

  .segment_wrap {
    margin-top: 0rem;
    // margin-top: 1.5rem;
    background: transparent;
    border: none;
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
    padding-bottom: 2rem;
  }

  .manage_seg {
    margin-top: -48px;
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

  .menu {
    display: block;
    padding: 0;
    min-height: 0;
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

  .desc_text {
    display: block;
  }

  .responsive_autofit_grid {
    background: #fff;
  }
}

@media (min-width: 500px) {
  .hide_desktop {
    display: none;
  }
}
@media (max-width: 500px) {
  .responsive_autofit_grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 2rem auto 0;
    padding-bottom: 1rem;
  }
  .left_logo_area {
    width: 100%;
  }

  .left_wrap .left_details {
    width: 100%;
    padding-left: 0.5rem;
  }
}

@media (max-width: 500px) {
  .submit .q-btn {
    height: 45px;
    font-size: 15px;
  }
  .logo {
    white-space: nowrap;
  }

  .segment_wrap {
    margin-top: 2rem;
  }
  .desc_text {
    display: block;
    margin-bottom: 3rem;
  }

  .left_details_title {
    font-size: 15px;
    line-height: 4px;
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
  }
  .outline.q-btn {
    font-size: 10px;
  }
  .editor_hero {
    height: 30vh;
  }
  .segment_wrap {
    width: 100%;
  }
  // .left_logo_area img {
  //   width: 63px;
  //   height: 63px;
  // }
}
</style>
