<template>
  <q-layout class="page_">
    <div class="hold">
      <div class="wrapp">
        <img src="/images/success.png" alt="" />

        <div class="q-mt-md mailtext">Success</div>

        <div class="maildesc q-mt-sm">
          Your password has been changed successfully
        </div>

        <div class="change col">
          <!-- <q-btn> RETURN TO DASHBOARD</q-btn> -->
          <q-btn :to="{ name: 'login' }"> RETURN TO LOGIN</q-btn>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.hold {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
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
  min-width: 521px;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  width: 90%;
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

@media (max-width: 500px) {
  .wrapp {
    min-width: 90%;
  }
}

@media (max-width: 400px) {
  .hold {
    height: 80vh;
  }
}
</style>
