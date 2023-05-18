<template>
  <div class="wrapp">
    <div class="top">
      <span class="title">
        <i class="fa-solid q-mr-sm fa-list"></i>
        My Listings | 98
      </span>

      <div class="sort_area">
        <div class="left">
          <q-btn class="active"> All Listings </q-btn>
          <q-btn class="regular"> Active </q-btn>
          <q-btn class="regular"> Declined </q-btn>
          <q-btn class="regular"> Drafts </q-btn>
          <q-btn class="regular boosted"> Boosted </q-btn>
        </div>

        <div class="right">
          <q-btn-dropdown
            v-model="value"
            class="sort_by_date"
            label="Sort by date"
          >
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Latest - Oldest</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Oldest - Latest</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </div>
    </div>
    <div v-if="listings.length > 0" class="listings">
      <div v-for="(listing, index) in listings" :key="index">
        <Listings :listing="listing" />
      </div>
    </div>

    <div v-else class="empty">
      <img src="/images/empty.svg" alt="" />

      <div class="empty_text">You currently have no listings</div>
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
      arr: [
        {
          img: "/images/listing1.png",
          title: "Ankara 3 Piece Gown",
          price: "₦50,000",
          status: "Active",
          date: "Created 17 Oct, 2023",
          impressions: 236,
          engagements: 97,
          leads: 2,
          boosted: true,
        },
        {
          img: "/images/listing2.png",
          title: "Princess Cut Peplum Sleeve...",
          price: "₦50,000",
          status: "Active",
          date: "Created 17 Oct, 2023",
          impressions: 236,
          engagements: 97,
          leads: 2,
          boosted: false,
        },
        {
          img: "/images/listing3.png",
          title: "Off Shoulder Peperdem Gown",
          price: "₦50,000",
          status: "Active",
          date: "Created 17 Oct, 2023",
          impressions: 236,
          engagements: 97,
          leads: 2,
          boosted: true,
        },
        {
          img: "/images/listing1.png",
          title: "Peplum Collar Ankara wrap g...",
          price: "₦50,000",
          status: "Active",
          date: "Created 17 Oct, 2023",
          impressions: 236,
          engagements: 97,
          leads: 2,
          boosted: false,
        },
        {
          img: "/images/listing3.png",
          title: "Amber Rizzy Ear Rings",
          price: "₦50,000",
          status: "Active",
          date: "Created 17 Oct, 2023",
          impressions: 236,
          engagements: 97,
          leads: 2,
          boosted: false,
        },
      ],
    };
  },
  components: {
    Listings,
  },

  created() {
    this.getListings();
  },

  methods: {
    onItemClick() {
      console.log("first");
    },

    getListings() {
      this.$api
        .get(`${this.$store.leegoluauth.vendorDetails.slug}/listing`)
        .then((response) => {
          console.log("Success:", response);
          this.listings = response.data.data;
        })
        .catch(({ response }) => {
          console.log(response);
          this.errors = response.data[0];
          this.loading = false;
          this.$q.notify({
            message: `An error occured, please recheck credentials or check your internet settings.`,
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
  // width: 107px;
  height: 34px;
  text-align: center;
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
