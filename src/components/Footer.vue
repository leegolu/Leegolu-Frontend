<template>
  <footer class="footer">
    <div class="footer_wrap">
      <div class="left">
        <div class="footer_head">About Us</div>
        <ul>
          <li>
            <router-link to="/"> About Leegolu </router-link>
          </li>
          <li>
            <router-link to="/"> Contact Us </router-link>
          </li>
          <li>
            <router-link to="/"> FAQs </router-link>
          </li>
          <li>
            <router-link to="/"> Terms of Service </router-link>
          </li>
          <li>
            <router-link to="/"> Complaints </router-link>
          </li>
          <li>
            <router-link to="/"> Careers </router-link>
          </li>
        </ul>
      </div>
      <div class="middle">
        <div class="footer_head">Support</div>
        <ul>
          <li class="lead">
            Our support team is open from 9am - 9pm Mondays to Saturdays.
          </li>

          <li>
            <i class="fa-solid fa-mobile"></i>
            <a href=""> <span>Evelyn:</span> +(234)456 7890 123</a>
          </li>
          <li>
            <i class="fa-solid fa-mobile"></i>
            <a href=""> <span>Office:</span> +(234)456 7890 123</a>
          </li>
        </ul>
      </div>

      <div class="right">
        <div class="footer_head">Make Money</div>
        <ul>
          <li>
            <router-link to="/"> About Leegolu </router-link>
          </li>
          <li>
            <router-link to="/"> Contact Us </router-link>
          </li>
          <li>
            <router-link to="/"> FAQs </router-link>
          </li>
          <li>
            <router-link to="/"> Terms of Service </router-link>
          </li>
          <li>
            <router-link to="/"> Complaints </router-link>
          </li>
          <li>
            <router-link to="/"> Careers </router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer_wrap_hold">
      <div class="footer_input_area">
        <div class="footer_input_hold">
          <p>Newsletter Sign Up</p>
          <div class="input_wrap">
            <form>
              <input type="email" placeholder="Enter your email here..." />
              <q-btn color="secondary"> Submit </q-btn>
            </form>
          </div>
        </div>
      </div>

      <div class="footer_rights">
        <div class="left">
          <img src="/images/logowhite.png" alt="" />
        </div>

        <p>© 2023 Leegolu • All Rights Reserved</p>

        <div class="right">
          <img src="/images/arrow.png" alt="" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  background: #1a3c52;
  padding: 7rem 4rem 4rem;
}

.footer .footer_wrap {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  align-items: flex-start;
  justify-items: center;
}

.footer .footer_head {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #ffffff;
  margin-bottom: 2rem;
}

i {
  font-size: 1.5rem;
  color: #ffffff;
  margin-right: 1.5rem;
}
.footer ul li {
  margin: 0.5rem 0;
}
.footer ul li a span {
  margin-right: 0.6rem;
}
.footer ul li.lead {
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
  max-width: 230px;
  color: #ffffff;
  margin: 1rem 0 3rem;
}
.footer ul li a {
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
  color: #ffffff;
}

.footer .input_wrap {
  background: #ffffff;
  border-radius: 5px;
  flex: 2;
  padding: 0 0.5rem;
}
.footer_wrap_hold {
  width: 80%;
  margin: 4rem auto;
}
.footer_input_area {
  background: rgb(0, 0, 0, 0.2);
  mix-blend-mode: normal;
  // opacity: 0.2;
  border-radius: 10px;
  padding: 0.6rem;
  width: 100%;
  padding: 1rem;
  margin-top: 4rem;
}

.footer_input_hold {
  display: flex;
  gap: 3rem;
  align-items: center;
  justify-content: space-between;
}
.footer_input_hold form {
  display: flex;
  align-items: center;
}

.footer_input_hold p {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0.02em;
  color: #ffffff;
  margin-bottom: 0;
  padding-left: 1rem;
}

.footer .input_wrap input {
  border: none;
  background: transparent;
  width: 100%;
  padding: 0.8rem 1rem;
}
.footer .input_wrap input::placeholder {
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
  color: #0a142f;
}

.footer_rights {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
}

.footer_rights .left img {
  width: 224px;
}
.footer_rights .right img {
  width: 18px;
}

.footer_rights p {
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #ffffff;
  margin-bottom: 0;
}
</style>
