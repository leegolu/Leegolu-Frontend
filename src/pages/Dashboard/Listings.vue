<template>
  <!-- <Tour
    title="Hello Chris,"
    desc="Your business account is set and ready for use. "
    :play="false"
  />
  <Tour
    title="Take a video tour"
    desc="We’ve added more features to your dashboard. Let’s show you around."
    :play="true"
  />

  <boosted-vue /> -->

  <div class="loader" v-if="loading">
    <div>
      <q-spinner-comment color="primary" size="5em" />
    </div>
  </div>
  <div v-if="!loading" class="wrapp">
    <div class="top">
      <span class="title">
        <i class="fa-solid q-mr-sm fa-list"></i>
        My Listings | {{ listings.length }}
      </span>

      <div class="sort_area">
        <div class="left">
          <q-btn
            flat
            @click="setCategory('all')"
            :class="selectedCategory === 'all' ? 'active' : 'regular'"
          >
            All Listings
          </q-btn>
          <q-btn
            flat
            @click="setCategory('active')"
            :class="selectedCategory === 'active' ? 'active' : 'regular'"
          >
            Active
          </q-btn>
          <q-btn
            flat
            @click="setCategory('declined')"
            :class="selectedCategory === 'declined' ? 'active' : 'regular'"
          >
            Declined
          </q-btn>
          <q-btn
            flat
            @click="setCategory('pending')"
            :class="selectedCategory === 'pending' ? 'active' : 'regular'"
          >
            Pending
          </q-btn>
          <!-- <q-btn flat class="regular"> Drafts </q-btn> -->
          <q-btn @click="setCategory('boosted')" flat class="regular boosted">
            Boosted
          </q-btn>
        </div>

        <div class="right">
          <q-btn-dropdown
            v-model="value"
            class="sort_by_date"
            :label="sortDirectionSelected"
          >
            <q-list>
              <q-item
                clickable
                v-close-popup
                @click="onItemClick('Latest - Oldest')"
              >
                <q-item-section>
                  <q-item-label>Latest - Oldest</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-close-popup
                @click="onItemClick('Oldest - Latest')"
              >
                <q-item-section>
                  <q-item-label>Oldest - Latest</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </div>
    </div>
    <div v-if="sortedArray.length" class="listings">
      <div class="row justify-end">
        <q-btn @click="toggleView" class="toggle_btn" flat>
          <i
            :class="view !== 'grid' ? 'fa-solid fa-grid-2' : 'fa-solid fa-list'"
          ></i>
        </q-btn>
      </div>
      <div v-for="(listing, index) in sortedArray" :key="index">
        <Listings
          @refreshevent="getListings"
          :plans="plans"
          :listing="listing"
        />
      </div>
    </div>

    <div v-else class="empty">
      <img src="/images/empty.svg" alt="" />

      <div v-if="selectedCategory === 'all'" class="empty_text">
        You currently have no listings
      </div>
      <div v-else class="empty_text">
        You currently have no {{ selectedCategory }} listings
      </div>
    </div>
    <!-- <div class="empty" v-else>
      <img src="/images/empty.svg" alt="" />

      <div class="empty_text">You currently have no listings</div>
    </div> -->
  </div>
</template>

<script>
import { useMeta } from "quasar";

import Listings from "src/components/listings/Listings.vue";
import Tour from "src/components/Tour.vue";
import BoostedVue from "src/components/Boosted.vue";
export default {
  setup() {
    useMeta({
      title: "Listings",
    });
  },
  data() {
    return {
      value: false,
      listings: [],
      plans: [],
      loading: true,
      sortDirection: "",
      sortDirectionSelected: "Sort by Date",
      selectedCategory: "all",
      view: "grid",
    };
  },
  components: {
    Listings,
    BoostedVue,
    Tour,
  },

  created() {
    this.getListings();
    this.getPlans();
  },
  watch: {
    sortDirection: {
      handler: function () {
        if (this.sortDirection !== "") {
          this.sortDirectionSelected = this.sortDirection;
        }
      },
      deep: true,
    },
  },
  computed: {
    sortedListings() {
      if (this.selectedCategory === "all") {
        return this.listings;
      } else if (this.selectedCategory === "boosted") {
        return this.listings.filter((listing) => listing.boosted === true);
      } else {
        return this.listings.filter(
          (listing) => listing.status === this.selectedCategory
        );
      }
    },
    sortedArray() {
      // let sorted = [...this.filteredProducts];
      return this.sortedListings.slice().sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);

        if (this.sortDirection === "Oldest - Latest") {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      });
    },
  },
  methods: {
    toggleView() {
      if (this.view === "grid") {
        this.view = "list";
      } else if (this.view === "list") {
        this.view = "grid";
      }
      document
        .querySelectorAll(".listings_hold .listing")
        .forEach((listing) => {
          listing.classList.toggle("grid");
        });
    },
    setCategory(category) {
      this.selectedCategory = category;
    },
    onItemClick(clickDir) {
      this.sortDirection = clickDir;
      // console.log("first");
    },

    getPlans() {
      this.$api
        .get(`boost/plans`)
        .then((response) => {
          console.log(response);
          this.plans = response.data.data;
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },

    getListings() {
      this.loading = true;
      this.$api
        .get(`${this.$store.leegoluauth.vendorDetails.slug}/listing`)
        .then((response) => {
          console.log("Success:", response);
          this.listings = response.data.data;
          this.loading = false;
        })
        .catch(({ response }) => {
          // console.log(response);
          this.errors = response.data.message;
          this.loading = false;
          this.$q.notify({
            message: response.data.message,
            color: "red",
            position: "bottom",
            actions: [{ icon: "close", color: "white" }],
          });
          // console.log("Error:", response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
// .wrapp {
//   margin: 2rem 1.5rem;
// }

.title {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  margin: 1.5rem 1.5rem;
}

.sort_area {
  // background: #f5f5f5;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.7rem;
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
  // width: 107px;
  height: 34px;
  text-align: center;
  color: #ffffff;
  background: #1f7bb5;
  border-radius: 17px;
  white-space: nowrap;
}
.sort_area .regular {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #666666;
  white-space: nowrap;
}

.sort_area .regular::before {
  box-shadow: none;
}

.listings {
  margin: 0.5rem 1.5rem 2rem;
}

.toggle_btn {
  font-size: 1.5rem;
  min-height: auto;
  margin-top: 0.5rem;
}
@media (min-width: 500px) {
  .toggle_btn {
    display: none;
  }
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

@media (max-width: 1060px) {
  .sort_area .left {
    flex-wrap: wrap;
    gap: 1rem 0.5rem;
  }

  .sort_area .right .q-btn {
    width: auto;
  }
}
</style>
