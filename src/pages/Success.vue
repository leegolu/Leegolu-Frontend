<template>
  <q-layout class="page_">
    <div v-if="loading" class="spin">
      <q-spinner color="primary" size="3em" :thickness="10" />
    </div>
    <div v-else class="hold">
      <div class="wrapp">
        <img src="/images/success.png" alt="" />

        <div class="q-mt-md mailtext">Success</div>

        <div class="maildesc q-mt-sm">
          Your listing has been successfully boosted
        </div>

        <div class="change col">
          <!-- <q-btn> RETURN TO DASHBOARD</q-btn> -->
          <q-btn
            :to="{
              name: 'business.dashboard',
              query: { planPurchased: 'success' },
            }"
          >
            RETURN TO DASHBOARD</q-btn
          >
        </div>
      </div>
    </div>
    <div v-if="failed" class="hold">
      <div class="wrapp">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/017/178/563/small/cross-check-icon-symbol-on-transparent-background-free-png.png"
          alt=""
        />

        <div class="q-mt-md mailtext">Failed</div>

        <div class="maildesc q-mt-sm">
          Your payment was not successful, kindly initiate this process again
        </div>

        <div class="change col">
          <!-- <q-btn> RETURN TO DASHBOARD</q-btn> -->
          <q-btn :to="{ name: 'business.dashboard' }">
            RETURN TO DASHBOARD</q-btn
          >
          <q-btn :to="{ name: 'Plans' }"> RETURN TO PLANS</q-btn>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      failed: false,
    };
  },
  created() {
    this.getResponse();
  },
  methods: {
    getResponse() {
      let reference = this.$route.query.reference;
      let trxref = this.$route.query.reference;
      console.log(reference);
      this.$api
        .get(`payment/callback?trxref=${reference}&reference=${reference}`, {
          reference,
          trxref,
        })
        .then((data) => {
          console.log(data);
          this.loading = false;
        })
        .catch(({ response }) => {
          console.log(response);
          this.failed = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.hold {
  background: none;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
}
.wrapp {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 3rem 2rem;
  min-width: fit-content;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  width: fit-content;
  // width: 80%;
  margin: 0 auto;
}
.change {
  margin-top: 1rem;
}

.change .q-btn {
  background: #1f7bb5;
  border-radius: 8px;
  color: #ffffff;
  padding: 1rem 2rem;
}
img {
  width: 103px;
  height: 103px;
  object-fit: contain;
}
.maildesc {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  text-align: center;
  letter-spacing: -0.01em;
  color: #000000;
  // max-width: 260px;
}
.spin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
.mailtext {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 100%;
  text-align: center;
  letter-spacing: -0.01em;
  color: #000000;
}

.no_email {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  text-align: center;
  letter-spacing: -0.01em;
  color: #000000;
}

.q-btn {
  padding: 0;
  color: #1f7bb5;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  text-transform: capitalize;
}

@media (max-width: 600px) {
  .wrapp {
    min-width: 90%;
  }
}
</style>
