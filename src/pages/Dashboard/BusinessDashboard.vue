<template>
  <div v-if="showTour" class="tourrr">
    <TourVue
      title="Take a video tour"
      desc="We’ve added more features to your dashboard. Let’s show you around."
      :play="true"
    />
  </div>
  <div class="main">
    <div class="left_main">
      <div class="main_card">
        <div class="left">
          <div class="main_text">
            Hello
            {{
              this.$store.leegoluauth.userDetails
                ? this.$store.leegoluauth.userDetails.name.split(" ")[0]
                : "User"
            }},
          </div>
          <div class="sub">Welcome to your Leegolu dashboard.</div>
          <q-btn
            :to="{ name: 'manage-shop' }"
            color="primary"
            class="q-mt-lg tour"
          >
            Manage your shop
          </q-btn>
        </div>

        <div class="right">
          <img src="/images/dashsvg.svg" alt="" />
        </div>
      </div>

      <div class="small_cards">
        <div class="small_card">
          <img src="/images/list.png" alt="" />
          <div class="small_card_main_text">My Adverts</div>
          <div class="small_card_sub">Adverts you created yourself.</div>
          <div v-if="myAds === ''" class="count">0</div>
          <div class="count">{{ myAds }}</div>
        </div>
        <div class="small_card">
          <img src="/images/engagesvg.svg" alt="" />
          <div class="small_card_main_text">Engagement</div>
          <div class="small_card_sub">Adverts interacted with.</div>
          <div v-if="myEngagements === ''" class="count">0</div>
          <div v-else class="count">{{ myEngagements }}</div>
        </div>
        <div class="small_card">
          <img src="/images/layer.png" alt="" />
          <div class="small_card_main_text">Leads</div>
          <div class="small_card_sub">Customers that reached out.</div>
          <div v-if="myLeads === ''" class="count">0</div>
          <div v-else class="count">{{ myLeads }}</div>
        </div>
        <div class="small_card_bus">
          <div class="wallet_left">
            <img src="/images/gift.png" alt="" />

            <div class="di">
              <div class="icon"><i class="fa-solid fa-bolt"></i> Active</div>
              <div class="type">Leegolu Business</div>
            </div>
          </div>

          <div class="free">Free <img src="/images/arrwhite.svg" alt="" /></div>
          <!-- <div class="">
            <div class="icon"><i class="fa-solid fa-bolt"></i> Active</div>
            <div class="wallet_amt">Leegolu Business</div>
            <div class="wallet_small">Shop | ₦3000</div>

            <div class="progress_wrap q-mt-lg">
              <div class="progress">
                <div class="small">4/20 Listings</div>
                <q-linear-progress reverse :value="progress1" color="warning">
                </q-linear-progress>
              </div>
              <div class="progress q-mt-sm">
                <div class="small">30 days left</div>
                <q-linear-progress reverse :value="progress1" color="warning">
                </q-linear-progress>
              </div>
            </div>
          </div> -->
        </div>

        <!-- <div class="small_card_bus notFree">
          <div class="wallet_left">
            <img src="/images/gift.png" alt="" />
          </div>
          <div class="">
            <div class="icon"><i class="fa-solid fa-bolt"></i> Active</div>
            <div class="wallet_amt">Leegolu Business</div>
            <div class="wallet_small">Shop | ₦3000</div>

            <div class="progress_wrap q-mt-lg">
              <div class="progress">
                <div class="small">4/20 Listings</div>
                <q-linear-progress reverse :value="progress1" color="warning">
                </q-linear-progress>
              </div>
              <div class="progress q-mt-sm">
                <div class="small">30 days left</div>
                <q-linear-progress reverse :value="progress1" color="warning">
                </q-linear-progress>
              </div>
            </div>
          </div>
        </div> -->
      </div>

      <hr v-if="listings.length" />

      <div v-if="listings.length" class="recent_listing_head q-mb-lg">
        Recent Listings
        <q-btn flat style="padding: 0" :to="{ name: 'listings' }"
          >| View All</q-btn
        >
        <div class="responsive_autofit_grid">
          <DashboardHomeListing
            v-for="(listing, index) in listings"
            :key="index"
            :listing="listing"
            :plans="plans"
          />
        </div>
      </div>

      <hr v-if="!listings.length" />
      <div v-if="!listings.length" class="flag_section">
        <img src="/images/flag.png" alt="" />
        <div class="mainFlag_text">Post your first listing</div>
        <div class="flag_sub">Reach thousands of customers</div>
        <q-btn
          :to="{ name: 'createListing' }"
          color="primary"
          class="q-mt-lg post"
        >
          Post Listing</q-btn
        >
      </div>

      <hr />

      <div id="chart" class="bg-white q-pa-md">
        <div class="top_business">
          <div class="shoe_company">
            <img src="/images/buslogo.png" alt="" />
            <div class="detail_com">
              <div class="logo_main_text">
                {{ this.$store.leegoluauth.vendor.business_name }}
              </div>
              <div class="logo_main_desc">Business Metrics</div>
            </div>
          </div>
          <div style="gap: 0.5rem" class="row items-center">
            <div class="business_seive">
              <q-btn color="white" class="bg-primary" flat> Page Visits </q-btn>
            </div>
            <!-- <div class="business_seive">
            <q-btn flat> Callback Requests </q-btn>
          </div> -->
            <div class="business_seive">
              <q-btn flat> Message Requests </q-btn>
            </div>
            <div class="business_seive">
              <q-btn flat> Phone Views </q-btn>
            </div>
          </div>
        </div>
        <apexchart
          type="bar"
          height="380"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>

    <div class="right_card">
      <div class="right_card_top">
        <img src="/images/newsle.svg" alt="" />
        <div class="card_main_text">
          Expand your business without breaking the bank.
        </div>
        <div class="card_sub_text">
          Leegolu Business provides you with the right tools to scale your
          business and make more sales online.
        </div>

        <div class="started_btn">
          <q-btn label="Read Story">
            <img class="q-pl-sm" src="/images/arr.svg" alt="" />
          </q-btn>
        </div>
      </div>
      <div class="right_card_top down">
        <div class="card_main_text">Frequently Asked Questions</div>
        <div class="card_sub_text">
          How may products can a single user list on one account?
        </div>
        <div class="card_sub_text">
          How long does it take to approve my advert on Leegolu?
        </div>
        <div class="card_sub_text">
          Can I have more than two accounts on Leegolu?
        </div>
        <div class="card_sub_text">
          Why can’t I access my store front but can still se my listings?
        </div>

        <div class="started_btn">
          <q-btn label="Learn More">
            <img class="q-pl-sm" src="/images/arr.svg" alt="" />
          </q-btn>
        </div>
      </div>
    </div>
  </div>

  <q-dialog class="dash_modal" v-model="welcometoleegolubusinessmodal">
    <q-card style="width: 100%; max-width: 800px">
      <div class="modal">
        <div class="modal_wrap">
          <div class="left">
            <div class="modal_main">
              Hello
              {{
                this.$store.leegoluauth.userDetails
                  ? this.$store.leegoluauth.userDetails.name.split(" ")[0]
                  : "User"
              }},
            </div>
            <div class="modal_main_text">Welcome to Leegolu Business.</div>
            <div class="modal_sub_text">
              Your account gives you full access to all basic features available
              on the Leegolu marketplace for free.
            </div>
            <!-- <i class="fa-solid fa-check"></i> -->
            <ul>
              <li>
                <img src="/images/tick.svg" alt="" />
                Access to direct seller contact
              </li>
              <li>
                <img src="/images/tick.svg" alt="" /> Ability to sell as a
                private seller
              </li>
              <li>
                <img src="/images/tick.svg" alt="" />Access to insights &
                analytics
              </li>
              <li>
                <img src="/images/tick.svg" alt="" /> Access to Leegolu video
                ads
              </li>
              <li><img src="/images/tick.svg" alt="" /> A branded shop</li>
            </ul>
          </div>

          <div class="right">
            <img src="/images/welcometobusiness.svg" alt="" />
          </div>
        </div>

        <div class="row q-pb-lg items-center justify-between">
          <q-btn @click="toggleModals" color="primary" class="q-px-xl proceed">
            Proceed
          </q-btn>
          <q-btn @click="toggleModal" class="q-px-sm skip"> Skip </q-btn>
        </div>

        <!-- <div @click="welcometoleegolubusinessmodal = false" class="close">
          <i class="fa-solid fa-xmark"></i>
        </div> -->
      </div>
    </q-card>
  </q-dialog>

  <q-dialog class="dash_modal" v-model="addphotoforleegolubusinessmodal">
    <q-card style="width: 100%; max-width: 800px">
      <div class="modal two">
        <div class="modal_wrap">
          <div class="left">
            <div class="modal_main">Add your photo</div>
            <div class="modal_sub_text">
              Add a picture of yourself or select a
              <span class="text-primary">preferred emoji</span>. Other users
              will associate this with your account.
            </div>

            <div class="previewMain">
              <div class="form">
                <q-file
                  type="file"
                  v-model="avatar.avatar"
                  accept=".jpg,.png,.svg,.jpeg"
                  name="avatar"
                  @update:model-value="setAvatar"
                  class="previewinput"
                  id="my-file"
                />

                <div class="previewDiv">
                  <template v-if="preview">
                    <img :src="preview" class="previewimg" />
                    <img src="/images/click.png" class="click" alt="" />
                  </template>
                </div>
              </div>
            </div>
          </div>

          <div class="right">
            <img src="/images/businessimg.svg" alt="" />
          </div>
        </div>

        <div class="row q-pb-lg items-center justify-between">
          <q-btn
            @click="addAvatar"
            :loading="loadingAvatar"
            color="primary"
            class="q-px-xl proceed"
          >
            Proceed
          </q-btn>
          <q-btn @click="skipImg" class="q-px-sm skip"> Skip </q-btn>
        </div>

        <div @click="addphotoforleegolubusinessmodal = false" class="close">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
    </q-card>
  </q-dialog>
  <q-dialog class="dash_modal" v-model="businessreg">
    <q-card style="width: 100%; max-width: 800px">
      <div class="modal three">
        <div class="modal_wrap">
          <div class="left">
            <div class="modal_main">Leegolu Business</div>
            <div class="modal_sub_text">
              Please supply your business details below.
            </div>

            <form id="form">
              <div class="input-box active-grey">
                <label class="input-label">Business Name</label>
                <input
                  type="text"
                  name="name"
                  v-model="vendordetails.name"
                  class="input-1"
                  placeholder="Enter your business name"
                />
              </div>
              <div class="input-box active-grey">
                <label class="input-label">About Business</label>
                <!-- <input
                  type="text"
                  class="input-1"
                  v-model="vendordetails.business_type"
                  placeholder="Fashion Apparel"
                /> -->
                <select v-model="vendordetails.business_type" class="reg">
                  <option
                    v-for="businessType in businessTypes"
                    :key="businessType.id"
                    :value="businessType.id"
                  >
                    {{ businessType.name }}
                  </option>
                </select>
              </div>
              <div class="wraps">
                <div class="input-box active-grey">
                  <label class="input-label">State</label>
                  <select
                    v-model="vendordetails.state"
                    class="reg"
                    @change="getAreas(vendordetails.state)"
                  >
                    <option
                      v-for="state in states"
                      :key="state.id"
                      :value="state.id"
                    >
                      {{ state.name }}
                    </option>
                  </select>
                </div>
                <div class="input-box active-grey">
                  <label class="input-label">Area</label>
                  <select v-model="vendordetails.area" class="reg" name="">
                    <option
                      v-for="area in areas"
                      :key="area.id"
                      :value="area.id"
                    >
                      {{ area.name }}
                    </option>
                  </select>
                </div>
              </div>
              <!-- {{ vendordetails }} -->
              <div class="input-box active-grey">
                <label class="input-label">Full Address</label>
                <input
                  v-model="vendordetails.address"
                  type="text"
                  class="input-1"
                  placeholder="13 Pious Adolf Crescent, Trans-Elemo, Laffia"
                />
              </div>

              <q-btn @click="finish" flat type="button" class="btn"
                >Finish</q-btn
              >
              <div class="clear"></div>
            </form>
          </div>

          <div class="right">
            <img src="/images/businessreg.svg" alt="" />
          </div>
        </div>

        <!-- <div @click="reg" class="close">
          <i class="fa-solid fa-xmark"></i>
        </div> -->
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import { useMeta } from "quasar";
import DashboardHomeListing from "../../components/listings/RecentListings.vue";
// import Charts from "../../components/Charts.vue";
import { ref, computed } from "vue";
import TourVue from "src/components/Tour.vue";
export default {
  components: {
    apexchart: VueApexCharts,
    DashboardHomeListing,
    TourVue,
  },
  data() {
    return {
      welcometoleegolubusinessmodal: false,
      preview: "/images/preview.png",
      businessreg: false,
      loadingAvatar: false,
      avatar: {},
      plans: [],
      image: null,
      myAds: "",
      myEngagements: "",
      listings: [],
      myLeads: "",
      errors: {},
      countrycode: "+243",
      vendordetails: {
        name: "",
        address: "",
        area: "",
        state: "",
        business_type: "Fashion & Apparel",
      },
      roles: [],
      businessTypes: [],
      loading: false,
      states: [],
      areas: [],
      showTour: false,
      addphotoforleegolubusinessmodal: false,

      chartOptions: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
        colors: ["#1f7bb5", "#247BA0"],
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
    };
  },

  // watch: {
  //   welcometoleegolubusinessmodal: {
  //     handler: function (val, oldVal) {
  //       console.log(val);
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },
  created() {
    this.getRoles();
    this.getStates();
    this.getBusinessTypes();
    this.getMyads();
    this.getMyEngagements();
    this.getMyLeads();
    this.getMyPageViews();
    this.getListings();
    this.getPlans();
    this.welcometoleegolubusinessmodal = this.$store.leegoluauth.modal;
  },
  setup() {
    const progress1 = ref(0.3);
    const progress2 = ref(0.9);
    useMeta({
      title: "Dashboard",
    });
    return {
      progress1,
      progressLabel1: computed(() => (progress1.value * 100).toFixed(2) + "%"),

      progress2,
      progressLabel2: computed(() => (progress2.value * 100).toFixed(2) + "%"),
    };
  },
  mounted() {
    if (this.$router.currentRoute.value.query.videotour === "yes") {
      this.showTour = true;
    }
    // console.log(this.$router.currentRoute.value);
  },
  methods: {
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
    previewImage(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    setAvatar(props) {
      // console.log(props);
      var reader = new FileReader();
      reader.onload = (e) => {
        this.preview = e.target.result;
      };
      reader.readAsDataURL(props);
    },

    addAvatar() {
      const formData = new FormData();
      formData.append("avatar", this.avatar.avatar);

      this.loadingAvatar = true;
      this.$api
        .post(`upload-avatar`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // console.log("Success:", response);
          this.loadingAvatar = false;
          this.getVendor();
          this.addphotoforleegolubusinessmodal = false;
          this.businessreg = true;
          this.$q.notify({
            message: response.data.message,
            color: "green",
            position: "bottom",
          });
        })
        .catch(({ response }) => {
          // console.log(response);
          this.errors = response.data.message;
          this.loadingAvatar = false;
          this.$q.notify({
            message: response.data.message,
            color: "red",
            position: "bottom",
            actions: [{ icon: "close", color: "white" }],
          });
        });
    },

    toggleModals() {
      this.welcometoleegolubusinessmodal = false;
      this.addphotoforleegolubusinessmodal = true;
    },
    toggleBus() {
      this.addphotoforleegolubusinessmodal = false;
      this.businessreg = true;
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

    getMyads() {
      this.$api
        .get(`${this.$store.leegoluauth.vendorDetails.slug}/adverts`)
        .then((response) => {
          this.myAds = response.data.data;
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },
    getMyEngagements() {
      this.$api
        .get(`${this.$store.leegoluauth.vendorDetails.slug}/engagements`)
        .then((response) => {
          this.myEngagements = response.data.data;
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },
    getMyPageViews() {
      this.$api
        .get(`${this.$store.leegoluauth.vendorDetails.slug}/page-views`)
        .then((response) => {
          // console.log(response);
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },
    getMyLeads() {
      this.$api
        .get(`${this.$store.leegoluauth.vendorDetails.slug}/leads`)
        .then((response) => {
          // console.log(response);
          this.myLeads = response.data.data;
          // this.categories = response.data.data;
          // this.vendordetails.business_type = response.data.data[0].id;
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },

    toggleModal() {
      this.welcometoleegolubusinessmodal = false;
      this.addphotoforleegolubusinessmodal = true;
    },
    skipImg() {
      this.addphotoforleegolubusinessmodal = false;
      this.businessreg = true;
    },
    getVendor() {
      this.$api
        .get(`vendor/${this.$store.leegoluauth.vendorDetails.slug}`)
        .then((response) => {
          // console.log(response);
          this.$store.leegoluauth.userDetails = response.data.user;
        })
        .catch((e) => {
          // this.loading = false;
          this.errors = error.errors || {};
        });
    },

    reg() {
      this.$store.leegoluauth.modal = false;
      this.businessreg = false;
    },
    getRoles() {
      this.$api
        .get("roles")
        .then((response) => {
          // console.log(response);å
          let roles = response.data.data;
          // console.log(roles);
          this.roles = roles.filter((role) => {
            return role.name === "business" || role.name === "regular";
          });
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },
    getBusinessTypes() {
      this.$api
        .get("business-types")
        .then((response) => {
          // console.log(response);
          this.businessTypes = response.data.data;
          this.vendordetails.business_type = response.data.data[0].id;
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },
    getStates() {
      this.$api
        .get("states")
        .then((response) => {
          // console.log(response);
          this.states = response.data.data;
          // this.vendordetails.state = response.data.data[0].id;
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },
    getAreas(id) {
      this.$api
        .get(`${id}/areas`)
        .then((response) => {
          // console.log(response);
          this.areas = response.data.data;
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },

    finish() {
      if (this.vendordetails.name === "") {
        this.$q.notify({
          color: "red",
          message: "Business name field is required",
        });
        return;
      } else if (this.vendordetails.area === "") {
        this.$q.notify({
          color: "red",
          message: "Business area field is required",
        });
        return;
      } else if (this.vendordetails.state === "") {
        this.$q.notify({
          color: "red",
          message: "Business state field is required",
        });
        return;
      } else if (this.vendordetails.address === "") {
        this.$q.notify({
          color: "red",
          message: "Business address field is required",
        });

        return;
      } else if (this.vendordetails.business_type === "") {
        this.$q.notify({
          color: "red",
          message: "Business business type field is required",
        });
        return;
      } else {
        this.$store.leegoluauth.vendorDetails = this.vendordetails;
        this.$store.leegoluauth.modal = false;

        this.$router.replace({ name: "Plans" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// * {
//   border: 1px solid red;
// }
.main {
  display: grid;
  grid-template-columns: 5fr 2fr;
  gap: 1.7rem;
  margin: 2.1rem 1.7rem 2rem;
}

hr {
  // height: 1px;
  background: rgba(176, 176, 176, 0.5);
  margin: 2rem 0;
}
.main_card {
  display: grid;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  gap: 1rem;
  max-width: 844px;
  width: 100%;
  height: fit-content;
  height: 185px;
  padding: 0 1rem;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.main_text {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 44px;
  white-space: nowrap;
  color: #000000;
}

.q-btn {
  text-transform: capitalize;
}
.q-btn::before {
  box-shadow: none;
}
.sub {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
}

.tourrr {
  position: absolute;
  z-index: 1000;
  left: 10%;
}

// .left_main {
//   max-width: 70%;
// }
// .right_card {
//   width: 100%;
// }

.main_card .right {
  display: flex;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.tour {
  height: 31px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  text-transform: capitalize;
  color: #ffffff;
  margin-top: 2.5rem;
  padding: 0 1.4rem;
}

.tour::before {
  box-shadow: none;
}

.main_card .right img {
  width: 310px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: -20%;
}

.right_card_top,
.right_card_top.down {
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  padding: 1rem;
  margin-bottom: 2rem;
  // max-width: 281px;
  margin-left: auto;
}

.right_card .card_main_text {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  margin: 0.5rem 0;
}

.right_card_top.down {
  padding: 1.5rem;
}
.right_card_top.down .card_sub_text {
  border-bottom: 1px solid rgba(176, 176, 176, 0.5);
  padding: 0.5rem 0;
}
.right_card .card_sub_text {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
  color: #000000;
}

.started_btn {
  display: flex;
  justify-content: flex-end;
}
.dash_modal .q-card {
  border-radius: 14px;
  background: #fff;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.15);
}

.started_btn .q-btn {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: #000000;
  background: rgba(157, 157, 157, 0.4);
  border-radius: 5px;
  margin-top: 2rem;
  min-height: 0;
}

.responsive_autofit_grid {
  display: grid;
  // grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  // gap: 1rem;
  // padding-bottom: 3rem;
  margin-top: 1rem;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.started_btn img {
  width: 14px;
  height: 12px;
}

.started_btn .q-btn::before {
  box-shadow: none;
}

// small cards
.small_cards {
  // display: flex;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem 1rem;
  margin-top: 1.4rem;
  // margin-top: 2rem;
  // overflow: hidden;
  // padding-bottom: 2rem;
  // padding-left: 0.5rem;
  // overflow-x: scroll;
}
.small_card {
  background: #ffffff;
  // box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  padding: 1rem;
  width: 140px;
  max-width: 100%;
  height: 165px;
  position: relative;
}

@media (min-width: 1200px) {
  .small_card {
    max-width: 100%;
    height: 165px;
  }

  .small_cards {
    grid-template-columns: 1fr 1fr 1fr 2.5fr;
  }
}

@media (max-width: 1100px) {
  .small_cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}

.small_card img {
  width: 29px;
  height: 29px;
}
.small_card .small_card_main_text {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  color: #000000;
  margin-bottom: 0.3rem;
}

.small_card .small_card_sub {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
  margin-bottom: 0.8rem;
}

.small_card .count {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: #000000;
  position: absolute;
  bottom: 3%;
}

.small_card .wallet_amt {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  text-align: right;
  color: #000000;
}

.small_card_bus {
  background: linear-gradient(180deg, #0f476a 0%, #1f7bb5 100%);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  display: flex;
  justify-content: space-between;
  // width: 314px;
  flex-direction: column;
  // align-items: center;
  flex: 2;
  gap: 1rem;
  height: 165px;
  padding: 1.5rem 1rem 1rem;
}
.small_card_bus.notFree {
  background: linear-gradient(180deg, #0f476a 0%, #1f7bb5 100%);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  display: flex;
  justify-content: space-between;
  // width: 314px;
  flex-direction: row;
  align-items: flex-start;
  flex: 2;
  gap: 1rem;
  height: 100%;
  padding: 1.5rem 1rem 1rem;
}

.small_card_bus .di .type {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  white-space: nowrap;
  color: #ffffff;
}

.small_card_bus .free {
  background: #ee4e36;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 0.1rem;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 12px;
  text-align: center;
  width: 100px;
  justify-content: center;
  color: #ffffff;
  height: 32px;
}

@media (min-width: 600px) {
  .small_card_bus {
    flex-wrap: wrap;
  }
  .small_card_bus.notFree {
    flex-wrap: nowrap;
  }
}
.small_card_bus .free img {
  width: 15.5px;
  height: 7.76px;
}

.small_card_bus .wallet_left {
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.small_card_bus .wallet_amt {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  // text-align: right;
  color: #ffffff;
  display: flex;
  align-items: center;
}

.small_card_bus .wallet_small {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  text-align: right;
  color: #93e6ca;
}

.small_card_bus .icon i {
  color: goldenrod;
}

.small_card_bus .icon {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 7px;
  line-height: 10px;
  // text-align: right;
  color: #ffffff;
}

.small_card_bus.notFree .icon {
  text-align: right;
}

.small_card_bus .small {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  text-align: right;
  color: #93e6ca;
  margin-bottom: 0.3rem;
}

.small_card_bus img {
  width: 41.6px;
  height: 29.6px;
  object-fit: contain;
}

.small_card .det {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.small_card:last-child {
  background: url("/images/lebus.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 0;
  box-shadow: none;
  height: 100%;
  width: 100%;
  min-width: 334px;
}
// .small_card:last-child {
//   background: transparent;
//   padding: 0;
//   box-shadow: none;
// }
.small_card:last-child img {
  height: 100%;
  width: 100%;
}

.flag_section {
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  // transform: matrix(1, 0, 0, -1, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 1.5rem 0;
  padding: 5rem 0;
}

.flag_section img {
  width: 56px;
  height: 65px;
  margin-bottom: 1rem;
}

.flag_section .mainFlag_text,
.flag_section .flag_sub {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 15px;
  text-align: center;
  color: #000000;
}
.flag_section .flag_sub {
  font-weight: 400;
  margin-top: 0.2rem;
}

.flag_section .post {
  background: #1f7bb5;
  border-radius: 9px;
  width: 184px;
  height: 30px;
}

.top_business {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
}

.top_business .shoe_company {
  display: flex;
  gap: 0.6rem;
}

.top_business img {
  width: 36px;
  height: 36px;
}

.top_business .logo_main_text {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  white-space: nowrap;
  color: #000000;
}
.top_business .logo_main_desc {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
}

.top_business .business_seive .q-btn {
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(176, 176, 176, 0.62);
  border-radius: 14.5px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: #000000;
}

.btn {
  width: 199px;
  background: #1f7bb5;
  border-radius: 5px;
  height: 46px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
}

@media (min-width: 1200px) {
  .main_card {
    max-width: 100%;
  }

  .small_card {
    width: 130px;
  }

  .main {
    grid-template-columns: 7.8fr 3fr;
    max-width: 1300px;
  }
}

@media (min-width: 1300px) {
  .small_card {
    width: 100%;
  }

  .main_card .right img {
    width: 310px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: -13%;
  }
}
@media (max-width: 1200px) {
  .small_card {
    width: 100%;
  }

  .top_business {
    flex-wrap: wrap;
  }
  .small_card_bus {
    width: 321px;
  }
  .responsive_autofit_grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
@media (max-width: 1200px) {
  .main_text {
    font-size: 30px;
  }
  .sub {
    font-size: 14px;
    white-space: nowrap;
  }
  .tour {
    font-size: 13px;
    padding: 0 1rem;
  }
}
@media (max-width: 1100px) {
  .main_text {
    font-size: 25px;
  }
  .sub {
    font-size: 14px;
    white-space: nowrap;
  }
  .tour {
    font-size: 13px;
    padding: 0 1rem;
  }
}
@media (max-width: 1000px) {
  .main {
    grid-template-columns: 1fr;
  }
  .small_card {
    width: 100%;
  }

  .right_card {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .small_card_bus {
    width: auto;
    flex-direction: row;
    padding: 1rem;
  }

  .small_cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .right_card_top,
  .right_card_top.down {
    max-width: 100%;
  }
}
@media (max-width: 800px) {
  .small_cards {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  hr {
    margin: 2rem 0 1.5rem;
  }
}
@media (max-width: 700px) {
  .main_card .right img {
    top: -7%;
    right: -23%;
  }
}
@media (max-width: 660px) {
  .main_card .right img {
    right: -25%;
  }
}
@media (max-width: 620px) {
  .main_card .right img {
    right: -20%;
  }
}
@media (max-width: 600px) {
  .main_card {
    max-width: 100%;
  }
  .main_card .right {
    display: flex;
    justify-content: center;
  }
}

@media (max-width: 500px) {
  .main_card {
    padding: 1.5rem;
  }
  .tourrr {
    left: -9%;
    top: 1.2%;
    z-index: 10000;
  }
  .responsive_autofit_grid {
    margin-top: 0.6rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  hr {
    margin: 0.7rem 0;
  }

  .main_card .right {
    width: 100%;
    position: relative;
  }

  // .main_card .right img {
  //   padding-left: 2rem;
  // }

  .main {
    margin: 1.3rem 0rem 2rem;
  }
  .btn {
    width: 106px;
    height: 36px;
    font-size: 12px;
  }
  .small_cards {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  .small_card,
  .small_card_bus {
    width: 90%;
    flex-direction: row;
    margin: 0 auto;
    padding: 1rem;
  }

  .small_card_bus .progress_wrap {
    margin-top: 10px;
  }

  .sub {
    font-size: 10px !important;
    white-space: nowrap;
    line-height: 14px;
  }

  .main_text {
    font-size: 20px !important;
    line-height: 27px;
  }

  .main_card {
    padding-left: 0.6rem !important;
    padding-right: 0rem !important;
    height: 134px;
  }

  .small_card_bus {
    height: 66px !important;
    background: linear-gradient(180deg, #1f7bb5 0%, #0f476a 132.69%);
    box-shadow: 0px 0px 20px rgba(0, 83, 95, 0.4);
    border-radius: 5px;
  }
  .small_card_bus.notFree {
    height: 100% !important;
  }
  .small_card_bus .di .type {
    font-size: 13px;
  }

  .small_card_bus .free {
    font-size: 12px;
  }

  .small_card {
    height: 155px;
  }
}
// @media (max-width: 359px) {
//   .responsive_autofit_grid {
//     grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
//   }
// }
</style>
