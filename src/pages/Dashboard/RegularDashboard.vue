<template>
  <div class="main">
    <div class="left_main">
      <div class="main_card">
        <div class="left">
          <div class="main_text">Hello Chris,</div>
          <div class="sub">Welcome to your Leegolu dashboard.</div>
          <q-btn color="primary" class="q-mt-lg tour"> Take a tour </q-btn>
        </div>

        <div class="right">
          <img src="/images/rocket.png" alt="" />
        </div>
      </div>

      <div class="small_cards">
        <div class="small_card">
          <img src="/images/list.png" alt="" />
          <div class="small_card_main_text">My Adverts</div>
          <div class="small_card_sub">Adverts you created yourself.</div>
          <div class="count">0</div>
        </div>
        <div class="small_card">
          <img src="/images/engage.png" alt="" />
          <div class="small_card_main_text">Engagement</div>
          <div class="small_card_sub">Adverts interacted with.</div>
          <div class="count">0</div>
        </div>
        <div class="small_card">
          <img src="/images/layer.png" alt="" />
          <div class="small_card_main_text">Leads</div>
          <div class="small_card_sub">Customers that reached out.</div>
          <div class="count">0</div>
        </div>
        <div class="small_card_bus">
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
                <q-linear-progress :value="progress1" color="accent">
                  <div class="absolute-full flex flex-center">
                    <q-badge
                      color="white"
                      text-color="accent"
                      :label="progressLabel1"
                    />
                  </div>
                </q-linear-progress>
              </div>
              <div class="progress q-mt-sm">
                <div class="small">30 days left</div>
                <q-linear-progress :value="progress1" color="accent">
                  <div class="absolute-full flex flex-center">
                    <q-badge
                      color="white"
                      text-color="accent"
                      :label="progressLabel1"
                    />
                  </div>
                </q-linear-progress>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="small_card_bus">
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
              <q-linear-progress :value="progress1" color="accent">
                <div class="absolute-full flex flex-center">
                  <q-badge
                    color="white"
                    text-color="accent"
                    :label="progressLabel1"
                  />
                </div>
              </q-linear-progress>
            </div>
            <div class="progress q-mt-sm">
              <div class="small">30 days left</div>
              <q-linear-progress :value="progress1" color="accent">
                <div class="absolute-full flex flex-center">
                  <q-badge
                    color="white"
                    text-color="accent"
                    :label="progressLabel1"
                  />
                </div>
              </q-linear-progress>
            </div>
          </div>
        </div>
      </div> -->

      <!-- <div class="flag_section">
        <img src="/images/flag.png" alt="" />
        <div class="mainFlag_text">Post your first listing</div>
        <div class="flag_sub">Reach thousands of customers</div>
        <q-btn color="primary" class="q-mt-lg post"> Post Listing</q-btn>
      </div> -->

      <div class="recent_listing_head">
        Recent Listings
        <q-btn flat style="padding: 0" :to="{ name: 'listings' }"
          >| View All</q-btn
        >
        <div class="responsive_autofit_grid">
          <DashboardHomeListing
            v-for="(listing, index) in arr"
            :key="index"
            :listing="listing"
          />
        </div>
      </div>
    </div>

    <div class="right_card">
      <div class="right_card_top">
        <img src="/images/personel.png" alt="" />
        <div class="card_main_text">
          Expand your business without breaking the bank.
        </div>
        <div class="card_sub_text">
          Leegolu Business provides you with the right tools to scale your
          business and make more sales online.
        </div>

        <div class="started_btn">
          <q-btn icon-right="send" label="Get Started" />
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
          <q-btn icon-right="send" label="Learn More" />
        </div>
      </div>
    </div>
  </div>

  <q-dialog class="dash_modal" v-model="addphotoforleegoluregularmodal">
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
              <form>
                <div class="form">
                  <input
                    type="file"
                    accept="image/*"
                    @change="previewImage"
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
              </form>
            </div>
          </div>

          <div class="right">
            <img src="/images/businessimg.svg" alt="" />
          </div>
        </div>

        <div class="row q-pb-lg items-center justify-between">
          <q-btn
            :to="{
              name: `regular.dashboard`,
            }"
            color="primary"
            class="q-px-xl proceed"
          >
            Proceed
          </q-btn>
          <q-btn
            :to="{
              name: `regular.dashboard`,
            }"
            class="q-px-sm skip"
          >
            Skip
          </q-btn>
        </div>

        <div @click="addphotoforleegoluregularmodal = false" class="close">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
    </q-card>
  </q-dialog>

  <q-dialog class="dash_modal" v-model="welcometoleegoluregularmodal">
    <q-card style="width: 100%; max-width: 800px">
      <div class="modal">
        <div class="modal_wrap">
          <div class="left">
            <div class="modal_main">Hello Chris,</div>
            <div class="modal_main_text">Welcome to Leegolu.</div>
            <div class="modal_sub_text">
              Your account gives you full access to all basic features available
              on the Leegolu marketplace for free.
            </div>

            <ul>
              <li>
                <i class="fa-solid fa-check"></i> Access to direct seller
                contact
              </li>
              <li>
                <i class="fa-solid fa-check"></i> Ability to sell as a private
                seller
              </li>
              <li>
                <i class="fa-solid fa-check"></i> Access to insights & analytics
              </li>
              <li>
                <i class="fa-solid fa-check"></i> Access to Leegolu video ads
              </li>
            </ul>
          </div>

          <div class="right">
            <img src="/images/rocket.png" alt="" />
          </div>
        </div>

        <div class="row q-pb-lg items-center justify-between">
          <q-btn
            @click="addphotoforleegoluregularmodal = true"
            color="primary"
            class="q-px-xl proceed"
          >
            Proceed
          </q-btn>
          <q-btn class="q-px-sm skip"> Skip </q-btn>
        </div>

        <div @click="welcometoleegoluregularmodal = false" class="close">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, computed } from "vue";
import DashboardHomeListing from "../../components/listings/DashboardHomeListing.vue";

export default {
  components: {
    DashboardHomeListing,
  },
  data() {
    return {
      welcometoleegoluregularmodal: false,
      preview: "/images/preview.png",
      addphotoforleegoluregularmodal: false,
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
          impressions: 0,
          engagements: 97,
          leads: 2,
          boosted: true,
        },
      ],
    };
  },

  mounted() {
    this.welcometoleegoluregularmodal = true;
  },
  setup() {
    const progress1 = ref(0.3);
    const progress2 = ref(0.9);

    return {
      progress1,
      progressLabel1: computed(() => (progress1.value * 100).toFixed(2) + "%"),

      progress2,
      progressLabel2: computed(() => (progress2.value * 100).toFixed(2) + "%"),
    };
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: grid;
  grid-template-columns: 5fr 2fr;
  gap: 1rem;
  margin: 1.3rem 2rem 2rem;
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
  color: #000000;
}
.sub {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
}

.main_card .right {
  display: flex;
  justify-content: flex-end;
}

.tour {
  height: 31px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: #ffffff;
}

.main_card .right img {
  width: 200px;
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

.started_btn .q-btn::before {
  box-shadow: none;
}

// small cards
.small_cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
  padding-bottom: 1rem;
  // overflow-x: scroll;
}
.small_card {
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  padding: 1rem;
  width: 140px;
  max-width: 100%;
  height: 165px;
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
@media (max-width: 1200px) {
  .small_card {
    width: 100%;
  }
}
@media (max-width: 1170px) {
  .small_card_bus {
    width: 321px;
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
  height: 165px;
  padding: 1rem;
}

.small_card_bus .wallet_amt {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  text-align: right;

  color: #ffffff;
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
  text-align: right;
  color: #ffffff;
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
  // min-width: 334px;
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
  margin: 2rem 0;
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
// .right_card {
//   min-width: 300px;
// }
@media (min-width: 1300px) {
  .small_card {
    width: 100%;
  }
}
@media (min-width: 1100px) {
  .main_card {
    max-width: 100%;
  }

  .main {
    grid-template-columns: 7.8fr 3fr;
    max-width: 1300px;
  }
}
@media (max-width: 1100px) {
  .small_card {
    width: 100%;
  }
}
@media (max-width: 1000px) {
  .main {
    grid-template-columns: 1fr;
  }

  .right_card {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
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

  .main {
    margin: 1.3rem 1rem 2rem;
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
    margin: 0 auto;
  }
}
</style>
