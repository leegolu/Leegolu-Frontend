<template>
  <div class="hold">
    <div class="wrapp">
      <img src="/images/emailimg.png" alt="" />

      <div class="q-mt-md mailtext">Check Mail</div>

      <div class="maildesc q-mt-sm">
        Please check the email address associated <br />
        with your Leegolu account for further instructions <br />
        on how to reset your password.
      </div>
      <q-btn
        :to="{ name: 'reset.template' }"
        type="button"
        color="secondary"
        class="btn q-ma-sm"
        >View mail template</q-btn
      >

      <div class="q-mt-xl no_email">
        Didn’t receive an email? <q-btn flat> Resend Email </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.hold {
  background: #f5f5f5;
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

.no_email .q-btn {
  padding: 0;
  color: #1f7bb5;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  text-transform: capitalize;
}

.q-btn {
  padding: 0 10px;
  color: #1f7bb5;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  text-transform: capitalize;
}
</style>
