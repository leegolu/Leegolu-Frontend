<template>
  <q-layout class="page_">
    <div class="wrapper">
      <div class="main_title">Leegolu Business Plans</div>
      <div class="sub_title">Choose a plan that fits your need</div>

      <div class="load">
        <div v-if="loading" class="row justify-center">
          <q-card>
            <q-skeleton width="200px" height="100px" />
          </q-card>
        </div>
      </div>
      <div class="card_wrap">
        <div v-if="!loading" class="div">
          <PlanCardVue
            v-for="(plan, index) in businessPlans"
            :key="index"
            :plan="plan"
            :loadingsign="loading"
          />
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script>
import PlanCardVue from "src/components/PlanCard.vue";
export default {
  components: {
    PlanCardVue,
  },
  data() {
    return {
      businessPlans: [],
      loading: true,
      plans: [
        {
          name: "Seller",
          img: "sellerplan.png",
          amount: "1000",
          containing: [
            {
              title: "Make up to 10 Listings",
            },
          ],
        },
        // {
        //   name: "Shop",
        //   amount: "3000",
        //   img: "shopplan.png",
        //   containing: [
        //     {
        //       title: "Make up to 20 Listings",
        //     },
        //     {
        //       title: "Customizable shop page",
        //     },
        //     {
        //       title: "Branded listing",
        //     },
        //   ],
        // },
        // {
        //   name: "Dealer",
        //   amount: "5000",
        //   img: "dealerplan.png",
        //   containing: [
        //     {
        //       title: "Make up to 50 Listings",
        //     },
        //     {
        //       title: "Customizable shop page",
        //     },
        //     {
        //       title: "Branded listing",
        //     },
        //   ],
        // },
        // {
        //   name: "Warehouse",
        //   amount: "15000",
        //   img: "warehouseplan.png",
        //   containing: [
        //     {
        //       title: "Make unlimited listings",
        //     },
        //     {
        //       title: "Customizable shop page",
        //     },
        //     {
        //       title: "Branded listing",
        //     },
        //     {
        //       title: "Boosted shop page ",
        //     },
        //   ],
        // },
      ],
    };
  },

  created() {
    this.getPlans();
  },

  methods: {
    getPlans() {
      this.$api
        .get("shop/plans")
        .then((response) => {
          console.log(response);
          this.loading = false;
          this.businessPlans = response.data.data;
          // this.vendordetails.state = response.data.data[0].id;
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 5rem 3rem 0 3rem;
}
.main_title {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 49px;
  text-align: center;
  color: #1f7bb5;
}

.sub_title {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  color: #1f7bb5;
  margin-bottom: 2rem;
}

.card_wrap .div {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
}

.card {
  position: relative;
}

.card:nth-child(1) img:last-of-type {
  width: 35px;
  height: 35px;
}
.card:nth-child(2) img:last-of-type {
  width: 52px;
  height: 37px;
}
.card:nth-child(3) img:last-of-type {
  width: 58px;
  height: 32px;
}
.card:nth-child(4) img:last-of-type {
  width: 93px;
  height: 35px;
}
.img_wrap {
  position: relative;
  margin-top: 2rem;
}

.img_wrap img:first-of-type {
  position: absolute;
  width: 50px;
  height: 50px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.img_wrap img:last-of-type {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.card {
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  min-width: 100%;
  // min-width: 300px;
  min-height: 321px;
  // min-height: 351px;
  padding: 1rem;
}

.title {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #000000;
}

.amount {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 39px;
  text-align: center;
  color: #1f7bb5;
  margin-top: 1rem;
}

.amount .small {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 8px;
  line-height: 10px;
  text-align: center;
  letter-spacing: 0.365em;
  text-transform: uppercase;
  color: #1f7bb5;
}

.btn {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 10%;
  background: white;
  left: 50%;
  transform: translateX(-50%);
}

.btn .q-btn {
  text-transform: capitalize;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  background: #1f7bb5;
  border-radius: 8px;
}

.options {
  margin: 1.5rem 0;
}
.options ul li {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
  margin: 0.4rem 0;
}
</style>
