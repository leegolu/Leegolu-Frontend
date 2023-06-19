<template>
  <!-- @click="gotoProduct" -->
  <div class="listing_s_hold">
    <div class="listing_">
      <div class="left">
        <div class="img">
          <img :src="listing.uploads[0].url" alt="" />

          <p class="tag red">
            <span class="main_textt">{{ listing.views }}</span>
            <span>Views</span>
          </p>
        </div>

        <div class="left_right">
          <div class="title">{{ listing.name }}</div>

          <div class="price">{{ listing.price.toLocaleString() }}</div>
        </div>

        <div class="view">
          <q-btn @click="dialog = true">View Performance Stats</q-btn>
        </div>
      </div>
    </div>

    <q-dialog v-model="dialog" persistent>
      <q-card class="card">
        <div class="dialog_content">
          <div class="dialog_top">
            <div class="left_dialog">
              <img :src="listing.uploads[0].url" alt="" />
            </div>

            <div class="det">
              <div class="title">
                {{ listing.name }}
              </div>
              <div class="price">
                {{ listing.price.toLocaleString() }}
              </div>
            </div>
          </div>
          <div class="middle">
            <div class="items">
              <img src="/images/impressions.png" alt="" />
              <p>Impressions</p>
              <div class="count">{{ listing.views }}</div>
            </div>
            <div class="items">
              <img src="/images/engage.png" alt="" />
              <p>Engagement</p>
              <div class="count">{{ listing.views }}</div>
            </div>
            <div class="items">
              <img src="/images/layer.png" alt="" />
              <p>Leads</p>
              <div class="count">{{ listing.views }}</div>
            </div>
          </div>

          <div class="performance">
            <p>Performance Summary</p>

            <ul>
              <li>This ad appeared 236 times.</li>
              <li>97 People clicked on it.</li>
              <li>13 People saved it.</li>
              <li>2 People reached you via message.</li>
              <li>1 Customer viewed your phone number.</li>
            </ul>
          </div>

          <div class="boost">
            <q-btn @click="advertdialog = true"> Boost Advert </q-btn>
          </div>

          <q-btn @click="dialog = false" class="close">
            <i class="fa-solid fa-xmark"></i>
          </q-btn>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="advertdialog" persistent>
      <q-card class="card">
        <div class="dialog_content">
          <p class="advert text-center">Boost Advert</p>
          <div class="dialog_top advert">
            <div class="left_dialog">
              <img :src="listing.uploads[0].url" alt="" />
            </div>

            <div class="det">
              <div class="title">
                {{ listing.title }}
              </div>
              <div class="price">
                {{ listing.price }}
              </div>
            </div>
          </div>
          <div class="row ad justify-between items-center">
            <p>Boost this advert for 3 Days</p>
            <p class="text-weight-bold">₦2,000</p>
          </div>

          <div class="middle advert">
            <div class="items">
              <q-btn> 3 Days </q-btn>
            </div>
            <div class="items">
              <q-btn> 7 Days </q-btn>
            </div>
            <div class="items">
              <q-btn> 30 Days </q-btn>
            </div>
          </div>

          <div class="boost advert">
            <q-btn>
              Boost Advert for
              <span class="q-ml-sm text-weight-bold"> ₦2,000 </span>
            </q-btn>
          </div>

          <q-btn @click="advertdialog = false" class="close">
            <i class="fa-solid fa-xmark"></i>
          </q-btn>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      advertdialog: false,
    };
  },
  props: ["listing"],
  methods: {
    onItemClick() {
      // console.log("clicked");
    },
    gotoProduct() {
      this.$router.replace({
        name: "product.detail",
        params: { slug: this.listing.slug },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// .listing_s_hold {
//   background: rgba(233, 233, 233, 0.44);
// }

.listing_s_hold {
  margin: 0.1rem 0;
}
.listing_ {
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 0.5rem;
  // min-width: 250px;
  max-width: 268.28px;
  // min-height: 350px;
  position: relative;
}
.responsive_autofit_grid {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.tag {
  color: #ffffff;
  background: #1f7bb5;
  border-radius: 27px 0px 5px;
  padding: 0.4rem;
  position: absolute;
  bottom: 0;
  margin-bottom: 0;
  right: -2%;
  width: 53.85px;
  display: flex;
  flex-direction: column;
  height: 53.85px;
}

.tag.red {
  background: #ee4e36;
}

.tag .main_textt {
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  text-transform: capitalize;
}

.tag span {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 8px;
  line-height: 10px;
  text-align: center;
  letter-spacing: 0.13em;
  text-transform: capitalize;
  color: #ffffff;
}
// .responsive_autofit_grid {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//   gap: 1rem;
// }

.listing_ .left {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.img {
  position: relative;
  max-width: 261.17px;
  height: 206.58px;
}

.listing_s_hold {
  max-width: 280px;
}

.img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.left_right .title {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-transform: capitalize;
  color: #000000;
  margin: 0.5rem 0 0;
}

.left_right .price {
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 22px;
  text-transform: capitalize;
  color: #000000;
}

.view {
  margin-top: 0.5rem;
  height: 50px;
}

.view .q-btn {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  text-align: center;
  background: #c2e6e9;
  border-radius: 5px;
  color: #1f7bb5;
  position: absolute;
  bottom: 4%;
  left: 50%;
  width: 90%;
  transform: translateX(-50%);
}

//  middle area

.listing_ .middle img {
  width: 18.32px;
  height: 18.32px;
  object-fit: contain;
}

.listing_ .middle {
  display: flex;
  align-items: center;
  // justify-content: space-between;
  gap: 5rem;
}

.listing_ .middle .item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.listing_ .middle .count {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  margin-top: 1rem;
}

.listing_ .middle p {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 8px;
  line-height: 11px;
  color: #000000;
}

.listing_ .right {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.listing_ .right .modify {
  width: 106px;
  height: 31.5px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  background: #c2e6e9;
  text-transform: capitalize;
  border-radius: 5px;
  color: #1f7bb5;
}

.listing_ .right .manage_ad {
  background: #03ae1e;
  border-radius: 5px;
  width: 156px;
  height: 31.5px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  text-transform: capitalize;
  text-align: center;
  font-size: 15px;
  line-height: 20px;
  color: #ffffff;
}

// dialog

.card {
  min-width: 363px;
  background: #ffffff;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  width: 466px;
  // height: 522px;
}

.dialog_content {
  background: #ffffff;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  padding: 1rem;
  position: relative;
}
.dialog_content .dialog_top {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.dialog_content .dialog_top .title {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  // text-align: center;
  color: #000000;
}
.dialog_content .dialog_top .price {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  // text-align: center;
  text-transform: capitalize;

  color: #000000;
}
.dialog_content .ad p:last-of-type {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  text-align: right;
  color: #000000;
  margin-bottom: 8px;
}

.dialog_content .ad p:first-of-type {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  margin-bottom: 8px;
}
.dialog_content .dialog_top.advert {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  gap: 0rem;
  margin-bottom: 1.5rem;
}
.dialog_content .dialog_top img {
  border: 3px solid rgba(176, 176, 176, 0.5);
  border-radius: 3px;
  width: 65px;
  height: 65px;
}
.dialog_content .dialog_top.advert img {
  width: 172px;
  height: 172px;
  border: 3px solid rgba(176, 176, 176, 0.5);
  border-radius: 3px;
}

.dialog_content .middle {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #d1d1d1;
  border-bottom: 1px solid #d1d1d1;
  // grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  align-items: center;
  padding: 0.7rem;
  margin: 1rem 0;
}
.dialog_content .middle.advert {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #d1d1d1;
  border-bottom: none;
  align-items: center;
  padding: 1rem;
  margin: 0rem 0 0rem;
}
.dialog_content .middle.advert .q-btn {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #1f7bb5;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #c9c9c9;
  border-radius: 14.5px;
}
.dialog_content .middle.advert .q-btn::before {
  box-shadow: none;
}
.dialog_content .middle img {
  width: 19.96px;
  height: 19.96px;
}

.dialog_content .middle .count {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  margin-top: 0.1rem;
}

.dialog_content .middle p {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 0;
  color: #000000;
}

.dialog_content .performance {
  margin-top: 1rem;
}

.dialog_content .performance p {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  margin-bottom: 8px;
}

.dialog_content ul li {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #000000;
  list-style: disc;
  margin: 0.3rem 0 0 1rem;
}

.dialog_content .boost {
  margin-top: 1.5rem;
}

.dialog_content .boost .q-btn {
  width: 100%;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #ffffff;
  background: #1f7bb5;
  border-radius: 5px;
  text-transform: capitalize;
}
.dialog_content .boost.advert .q-btn {
  width: 100%;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #ffffff;
  background: #03ae1e;
  border-radius: 5px;
  text-transform: capitalize;
}

.dialog_content .close {
  position: absolute;
  top: 1%;
  right: 2%;
  color: #979797;
  font-size: 1rem;
}
.dialog_content .close i {
  color: #979797;
  font-size: 1.3rem;
}
.dialog_content .close::before {
  box-shadow: none;
}

p.advert {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  color: #000000;
}

@media (max-width: 1150px) {
  .listing_ {
    grid-template-columns: 1.5fr 1fr 1.5fr;
  }

  .left_right .date {
    padding-top: 0.7rem;
  }

  .listing_ .middle {
    gap: 3rem;
  }
}
@media (max-width: 1060px) {
  .listing_ .middle {
    gap: 2rem;
  }

  .listing_ .right .manage_ad {
    width: 126px;
  }
}

@media (max-width: 800px) {
  .listing_ {
    min-width: 100%;
  }
  .responsive_autofit_grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
@media (max-width: 500px) {
  .main_card {
    padding: 1.5rem;
  }

  .img img {
    object-fit: contain;
  }

  .listing_ {
    min-width: 100%;
  }

  .main_textt {
    padding-top: 0.3rem;
  }

  .btn {
    width: 106px;
    height: 36px;
    font-size: 12px;
  }

  .view .q-btn {
    position: relative;
  }
  .img {
    max-width: 100%;
  }
  .listing_s_hold {
    max-width: 100%;
    margin: 1rem 0;
  }

  .listing_ {
    margin: 0;
  }

  // .tag {
  //   height: 73px;
  //   width: 73px;
  // }
}
</style>
