<template>
  <div class="listings_hold">
    <div class="listing">
      <div class="left">
        <div class="img">
          <img :src="listing.uploads[0].url" alt="" />
          <!-- <p v-if="listing.boosted" class="tag">Boosted</p> -->
        </div>

        <div class="left_right">
          <div class="title">{{ listing.name }}</div>

          <div class="price">₦{{ listing.price.toLocaleString() }}</div>
          <div class="div">
            <div class="status">{{ listing.condition }}</div>

            <div class="q-pt-lg date">
              Created
              {{
                new Date(listing.created_at).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              }}
            </div>
          </div>
        </div>
      </div>

      <div class="middle">
        <div class="items">
          <img src="/images/impressions.png" alt="" />
          <p>Impressions</p>
          <div class="count">10</div>
        </div>
        <div class="items">
          <img src="/images/engagesvg.svg" alt="" />
          <p>Engagement</p>
          <div class="count">{{ listing.views }}</div>
        </div>
        <div class="items">
          <img src="/images/layer.png" alt="" />
          <p>Leads</p>
          <div class="count">10</div>
        </div>
      </div>

      <div class="right">
        <q-btn-dropdown class="modify" color="primary" label="Modify">
          <q-list>
            <q-item
              clickable
              v-close-popup
              @click="onItemClick('edit', listing)"
            >
              <q-item-section>
                <q-item-label>Edit</q-item-label>
              </q-item-section>
            </q-item>

            <!-- <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Archive</q-item-label>
              </q-item-section>
            </q-item> -->

            <q-item
              clickable
              v-close-popup
              @click="onItemClick('delete', listing)"
            >
              <q-item-section>
                <q-item-label>Delete</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn @click="dialog = true" class="manage_ad"> Manage Ad </q-btn>
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
              <div class="count">10</div>
              <!-- <div class="count">{{ listing.impressions }}</div> -->
            </div>
            <div class="items">
              <img src="/images/engage.png" alt="" />
              <p>Engagement</p>
              <div class="count">10</div>
              <!-- <div class="count">{{ listing.engagements }}</div> -->
            </div>
            <div class="items">
              <img src="/images/layer.png" alt="" />
              <p>Leads</p>
              <div class="count">10</div>
              <!-- <div class="count">{{ listing.leads }}</div> -->
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
              <img :src="listing.img" alt="" />
            </div>

            <div class="det">
              <div class="title">
                {{ listing.name }}
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
    onItemClick(action, selectedlisting) {
      // console.log(action);
      // console.log(selectedlisting);
      if (action === "edit") {
        // console.log("edit");
      } else {
        // console.log("delete");
        this.$q
          .dialog({
            title: "Remove Listing",
            message:
              "Please confirm you want to remove this listing from this collection. You can always re-include a removed listing.",
            ok: {
              push: true,
              label: "Delete",
              color: "negative",
            },
            cancel: {
              push: true,
              color: "grey",
            },
            persistent: true,
          })
          .onOk(() => {
            this.loading = true;
            this.$api
              .delete(`${this.listing.slug}/delete`)
              .then(({ data }) => {
                this.loading = false;
                this.$emit("refresh-event");
              })
              .catch(({ response }) => {
                // console.log(response);
                this.loading = false;
              });
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.listings_hold {
  background: rgba(233, 233, 233, 0.44);
  // border-top: 1px solid rgba(176, 176, 176, 0.5);
  // padding: 1rem;
}
.listing {
  display: grid;
  grid-template-columns: 1.5fr 2fr 1fr;
  // grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 0.5rem;
  margin: 2rem 0;
}

.listing .left {
  display: grid;
  grid-template-columns: 1fr 2fr;
  // grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  align-items: center;
}
.img {
  position: relative;
}

.img img {
  width: 116px;
  height: 116px;
}
.tag {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 8px;
  line-height: 11px;
  color: #ffffff;
  background: #03ae1e;
  border-radius: 3px 0px;
  padding: 0.4rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 44px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.left_right .title {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
}

.left_right .price {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-transform: capitalize;
  color: #000000;
  margin: 0.5rem 0;
}

.left_right .status {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 9px;
  line-height: 12px;
  white-space: nowrap;
  text-align: center;
  color: #ffffff;
  background: #00a01a;
  border-radius: 3px;
  width: fit-content;
  padding: 0.5rem;
  height: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.left_right .date {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  color: #000000;
}

//  middle area

.listing .middle img {
  width: 20.32px;
  height: 20.32px;
  object-fit: contain;
  background: rgba(31, 123, 181, 0.4);
  border-radius: 4px;
  padding: 0.2rem;
}

.listing .middle {
  display: flex;
  align-items: center;
  // justify-content: space-between;
  gap: 5rem;
  padding-top: 0rem;
}

.listing .middle .item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.listing .middle .count {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  margin-top: 1rem;
}

.listing .middle p {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 8px;
  line-height: 11px;
  color: #000000;
}

.listing .right {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.listing .right .modify {
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

.listing .right .manage_ad {
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
  object-fit: contain;
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
  .listing {
    grid-template-columns: 1.5fr 1fr 1.5fr;
  }

  .left_right .date {
    padding-top: 0.7rem;
  }

  .listing .middle {
    gap: 3rem;
  }
}

@media (max-width: 900px) {
  .listing {
    display: flex;
    overflow-x: scroll;
    gap: 2rem;
    padding-bottom: 0.6rem;
  }
}

@media (max-width: 500px) {
  .dialog_content ul li {
    font-size: 12px;
  }
  .listing {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.7rem;
    max-width: 80%;
    margin: 2rem auto;
  }

  .listing .right {
    justify-content: center;
    flex-direction: column;
    gap: 0.3rem;
  }
  .listing .middle {
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .img img {
    width: 100%;
    height: 195px;
    object-fit: cover;
  }

  .listing .left {
    grid-template-columns: 1fr;
    gap: 0.3rem;
  }
  .left_right .price {
    margin: 0rem 0 0.4rem;
  }

  .left_right .title {
    font-size: 14px;
  }
  .left_right .price {
    font-weight: 600;
  }

  .listing .right .modify {
    width: 100% !important;
    background: #c2e6e9;
  }

  .listing .right .manage_ad {
    width: 100% !important;
  }
  .left_right .date {
    padding-top: 0rem;
    font-size: 8px;
  }

  .div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row-reverse;
    margin: 0.2rem 0;
  }
}
</style>
