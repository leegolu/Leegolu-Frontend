<template>
  <div class="hold">
    <div class="wrapp">
      <div class="row top items-center justify-between">
        <img src="/images/logored.png" alt="" />
        <q-btn class="reset" flat> Password Reset </q-btn>
      </div>
      <img src="/images/changepass.png" alt="" />

      <div class="q-mt-md mailtext">Hello Chris,</div>

      <div class="maildesc q-mt-sm">
        We got a request from you to change your <br />
        password. If this is you, please click the change <br />
        password button below.
      </div>

      <div class="change">
        <q-btn> CHANGE PASSWORD </q-btn>
      </div>

      <div class="q-mt-lg no_email">
        If you did not request this change, please contact us <br />
        immediately at <q-btn flat> support@leegolu.com </q-btn>.
      </div>

      <div class="socials q-mt-lg">
        <a href=""><i class="fa-brands fa-twitter"></i></a>
        <a href=""><i class="fa-brands fa-facebook"></i></a>
        <a href=""><i class="fa-brands fa-instagram"></i></a>
        <a href=""><i class="fa-brands fa-linkedin"></i></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
}
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
  padding: 0rem 2rem 3rem;
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
  font-weight: 500;
  font-size: 16px;
  line-height: 136.5%;
  /* or 22px */

  text-align: center;
  letter-spacing: -0.01em;

  color: #000000;
}

.mailtext {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 100%;
  /* identical to box height, or 24px */

  letter-spacing: -0.01em;

  color: #000000;
}

.no_email {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 136.5%;
  /* or 19px */

  text-align: center;
  letter-spacing: -0.01em;

  color: #000000;
}

.change {
  margin-top: 1rem;
}

.change .q-btn {
  background: #1f7bb5;
  border-radius: 8px;
  color: #ffffff;
}

.no_email .q-btn {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 136.5%;
  /* or 19px */
  padding: 0;

  text-align: center;
  letter-spacing: -0.01em;

  color: #000000;
  text-transform: capitalize;
}

.q-btn.reset {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 100%;
  letter-spacing: -0.01em;
  color: #000000;
  text-transform: capitalize;
}

.socials {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.socials a {
  color: #000000;
}

.socials i {
  font-size: 20px;
}
</style>
