<template>
  <div class="main">
    <div class="left_main">
      <div class="main_card">
        <div class="left">
          <div class="main_text">Hello Chris,</div>
          <div class="sub">Welcome to your Leegolu dashboard.</div>
          <q-btn color="primary" class="q-mt-lg tour">
            Take a video tour
          </q-btn>
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
          <div class="small_card_sub">
            Adverts that customers interacted with.
          </div>
          <div class="count">0</div>
        </div>
        <div class="small_card">
          <img src="/images/layer.png" alt="" />
          <div class="small_card_main_text">Leads</div>
          <div class="small_card_sub">Customers that reached out.</div>
          <div class="count">0</div>
        </div>
        <div class="small_card">
          <div class="wallet_left">
            <img src="/images/wallet.png" alt="" />
            <div class="small_card_main_text">Wallet</div>
          </div>
          <div class="det">
            <div class="wallet_amt">₦500</div>
            <q-btn color="primary" class="q-mt-lg"> Top up </q-btn>
          </div>
        </div>
      </div>

      <div class="flag_section">
        <img src="/images/flag.png" alt="" />
        <div class="mainFlag_text">Post your first advert</div>
        <div class="flag_sub">Reach thousands of customers</div>
        <q-btn color="primary" class="q-mt-lg post"> Post Advert</q-btn>
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
</template>

<script>
export default {};
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
  max-width: 281px;
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
  display: flex;
  // display: grid;
  // grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 1.2rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}
.small_card {
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  padding: 1rem;
  width: 180px;
}

.small_card:last-child {
  // background: red;
  width: 334px;
  // width: 100%;
  display: flex;
  justify-content: space-between;
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

.small_card .det {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
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

@media (min-width: 1100px) {
  .main_card {
    max-width: 100%;
  }

  .main {
    grid-template-columns: 6.2fr 2fr;
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
</style>
