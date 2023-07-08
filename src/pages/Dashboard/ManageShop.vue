<template>
  <div class="loader" v-if="loading">
    <div>
      <q-spinner-comment color="primary" size="5em" />
    </div>
  </div>
  <div v-if="!loading && !vendor.subscriptions.length" class="wrapper">
    <div class="top"><img src="/images/shopicon.svg" alt="" /> Manage Shop</div>

    <div class="main_area">
      <div class="main_area_top">
        <div class="main_area_left">
          <div class="imgs_wrap">
            <img src="/images/bluebg.png" alt="" />
            <img src="/images/giftbg.png" alt="" />
          </div>

          <div class="details">
            <div class="main_text">Leegolu Business is inactive</div>
            <div class="sub_text">
              Choose and activate a business plan. Enjoy <br />
              access to more features.
            </div>
          </div>
        </div>

        <div class="right">
          <q-btn flat :to="{ name: 'Plans' }">
            Activate a plan <i class="fa-solid fa-arrow-right"></i>
          </q-btn>
        </div>
      </div>
    </div>

    <div class="sub_img">
      <img src="/images/subimg.png" alt="" />Subscription History
    </div>

    <div class="style">
      <q-table
        :rows="rows"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="id"
        :grid="mode == 'grid'"
        :filter="filter"
        :loading="loading"
        @request="onRequest"
      >
        <template v-slot:body-cell-Subscription="props">
          <q-td :props="props">
            {{ props.row }}
            <div class="name_row">
              <div class="name">
                <div class="name_top">
                  {{ props.row.userName }}
                </div>
              </div>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-addedOn="props">
          <q-td :props="props">
            <div class="added">
              {{ props.row.addedOn }}
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-value="props">
          <q-td :props="props">
            <div class="added">
              {{ props.row.addedOn }}
            </div>
          </q-td>
        </template>

        <template v-slot:no-data="{ message }">
          <div class="full-width row flex-center text-negative q-gutter-sm">
            <span> {{ message }} </span>
          </div>
        </template>
      </q-table>
    </div>
  </div>

  <div v-if="!loading && vendor.subscriptions.length" class="wrapper">
    <div class="top">
      <div class="top_hold">
        <img src="/images/shopicon.svg" alt="" /> Manage Shop
      </div>
    </div>
    <!-- <hr /> -->
    <div class="main_area">
      <div class="main_area_top act">
        <div class="main_area_left act">
          <div class="imgs_wrap active">
            <img src="/images/shop.png" alt="" />
          </div>
          <!-- https://business.leegolu.com -->
          <div class="details">
            <div class="main_text">Leegolu - Shop</div>
            <div class="link">
              <i class="fa-solid fa-link"></i>
              <span>{{
                `leegolu.com/business/${this.$store.leegoluauth.vendorDetails.slug}`
              }}</span>
            </div>
            <div class="btns row items-center">
              <!-- <q-btn
                icon-right="fa-solid fa-eye"
                flat
                label="View"
                :to="{
                  name: 'vendor.page',
                  params: { slug: `${vendor.slug}` },
                }"
              /> -->
              <q-btn @click="copy" flat label="Copy">
                <img src="/images/copy.svg" alt=""
              /></q-btn>
              <q-btn flat label="Share"
                ><img src="/images/share1.svg" alt=""
              /></q-btn>
            </div>
          </div>
        </div>

        <div class="right">
          <q-btn flat :to="{ name: 'page.builder' }">
            Manage business page <i class="fa-solid fa-arrow-right"></i>
          </q-btn>
        </div>
      </div>

      <div class="stats">
        <!-- <div class="stat">
          <div class="row items-center">
            <div class="main"></div>
            <div class="sub">
              Free <br />
              Plan
            </div>
          </div>
        </div> -->
        <div class="stat">
          <div class="row items-center">
            <div class="main">20</div>
            <div class="sub">
              LISTING <br />
              SLOTS
            </div>
          </div>
        </div>
        <div class="stat">
          <div class="row items-center">
            <div v-if="vendor.products.length" class="main">
              {{ vendor.products.length }}
            </div>
            <div v-else class="main">0</div>
            <div class="sub">
              LISTINGS <br />
              CREATED
            </div>
          </div>
        </div>
        <div class="stat">
          <div class="row items-center">
            <div class="main">{{ vendor.views }}</div>
            <div class="sub">PAGE <br />VIEWS</div>
          </div>
        </div>
        <!-- <div class="stat">
          <div class="row items-center">
            <div class="main">29</div>
            <div class="sub">
              DAYS <br />
              LEFT
            </div>
          </div>
        </div> -->
      </div>
    </div>

    <div class="sub_img">
      <img src="/images/subimg.png" alt="" />Subscription History
    </div>

    <div class="style">
      <q-table
        :rows="rows"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="id"
        :grid="mode == 'grid'"
        class="sub_table"
        :filter="filter"
        :loading="loading"
        @request="onRequest"
      >
        <template v-slot:body-cell-Subscription="props">
          <q-td :props="props">
            <!-- {{ props.row }} -->
            <div class="name_row">
              <div class="name">
                <div class="name_top">Leegolu {{ props.row.plan }}</div>
              </div>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-Date="props">
          <q-td :props="props">
            <div class="added">
              {{
                new Date(props.row.start_date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              }}
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-value="props">
          <q-td class="value" :props="props">
            <div class="added">
              {{ props.row.price }}
            </div>
          </q-td>
        </template>

        <template v-slot:no-data="{ message }">
          <div class="full-width row flex-center text-negative q-gutter-sm">
            <span> {{ message }} </span>
          </div>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import { useMeta } from "quasar";
import { ref } from "vue";
const columns = [
  {
    name: "Subscription",
    required: true,
    label: "Subscription",
    align: "left",
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: "Date",
    required: true,
    label: "Date",
    align: "center",
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: "value",
    required: true,
    label: "Value",
    align: "right",
    field: (row) => row.name,
    sortable: true,
  },
];

const rows = [
  // {
  //   name: "Dec 2, 2023",
  //   userName: "Leegolu Business - Shop",
  //   addedOn: "2 Days ago",
  // },
  // {
  //   name: "Dec 2, 2023",
  //   userName: "Leegolu Business - Seller",
  //   addedOn: "2 Days ago",
  // },
  // {
  //   name: "Dec 2, 2023",
  //   userName: "Leegolu Business - Shop",
  //   addedOn: "2 Days ago",
  // },
];

export default {
  setup() {
    useMeta({
      title: "Manage Shop",
    });
  },
  data() {
    return {
      columns,
      advertdialog: false,
      rows,
      errors: [],
      image: ref(null),
      rowData: {},
      data: {},
      files: null,
      editstate: false,
      createstate: null,
      filter: "",
      vendor: { products: [] },
      curl: "",
      separator: "",
      mode: "list",
      loading: true,
      editLoad: false,
      create_title: false,
      loaders: {
        delete: false,
        category: false,
        deleteBtn: [],
        save: [],
      },
    };
  },

  created() {
    this.getVendor();
  },

  mounted() {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined,
    });
  },

  methods: {
    getEvents() {},
    onRequest(props) {},

    copy() {
      let Url = `https://leegolu.netlify.app/business/${this.$store.leegoluauth.vendor.business_name}`;
      navigator.clipboard.writeText(Url);
      this.$q.notify({
        message: "You have copied your business address!",
        color: "green",
        position: "top",
      });
    },
    getVendor() {
      this.$api
        .get(`vendor/${this.$store.leegoluauth.vendorDetails.slug}`)
        .then((response) => {
          this.loading = false;
          this.vendor = response.data.vendor;
          console.log(response);
          this.rows = response.data.vendor.subscriptions;
        })
        .catch(({ response }) => {
          this.loading = false;
        });
    },

    onItemClick() {},

    creatTicketBtn() {
      this.editstate = false;
      this.create_title = true;
    },
    createEventTicket(e) {
      e.preventDefault();
    },
    editTicketing(category) {
      this.editstate = true;
      this.create_title = true;
    },

    editedFunction(e) {
      e.preventDefault();
    },
    deleteTicketing(id) {},

    deletemultiple(id) {},

    refreshtitle() {
      if (this.curl !== "") {
        this.loading = true;
      }
    },

    toggleModal(props) {
      this.rowData = props;
      this.advertdialog = true;
      // console.log(props);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 900px;
  padding: 1.5rem 0;
}
.top {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  border-bottom: 1px solid #b0b0b0;
  padding: 0rem 2rem 1rem;
}

.top_hold {
  display: flex;
  gap: 0.3rem;
  align-items: center;
}

.btns {
  gap: 0.4rem;
  margin-top: 0.3rem;
  // justify-content: center;
}

.top img {
  width: 19.17px;
  height: 19.12px;
}

.main_area,
.sub_img,
.style {
  padding: 0 2rem;
}

.main_area_top {
  border-bottom: 1px solid rgba(176, 176, 176, 0.5);
}
.main_area_top.act {
  margin-bottom: 1rem;
}
.main_area_top.act {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3.5rem 0 1rem;
  flex-wrap: wrap;
  // max-width: 600px;
}
.main_area_top {
  display: flex;
  align-items: center;
  justify-content: unset;
  padding: 2rem 0 1rem;
  gap: 3rem;
  // max-width: 600px;
}

.loader {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.link {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: #1f7bb5;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.link i {
  margin-left: 0 !important;
  margin: 0.4rem 0;
}
.btns .q-btn {
  background: #ffffff;
  border-radius: 8.5px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 8px;
  line-height: 11px;
  text-transform: capitalize;
  padding: 6px;
  color: #1f7bb5;
  width: 47px;
  height: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btns .q-btn img {
  width: 7px;
  height: 7px;
  margin-left: 0.3rem;
}
.sub_img {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem 0 1.5rem;
  color: #1f7bb5;
}

.sub_img img {
  width: 28px;
  height: 28px;
}

.main_area_top .right .q-btn {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 15px;
  text-align: center;
  color: #ffffff;
  background: #1f7bb5;
  border-radius: 7px;
  height: 31px;
  text-transform: capitalize;
}
.main_area_top i {
  margin-left: 1rem;
}
.main_area_top .main_area_left {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.main_area_top .main_area_left.act {
  gap: 1.5rem;
}
.imgs_wrap {
  position: relative;
}
.imgs_wrap img:first-of-type {
  width: 58px;
  height: 58px;
}
.imgs_wrap img:last-of-type {
  width: 45px;
  height: 45px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.imgs_wrap.active img:last-of-type {
  width: 106px;
  height: 93px;
  position: relative;
}
.details .sub_text {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;

  color: #1f7bb5;
}
.details .main_text {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  color: #000000;
}

.actn_btn {
  width: 40px;
  height: 40px;
  border: 1px solid #b0b0b0 !important;
  border-radius: 22.5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.name_row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.added {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #b0b0b0;
}

.name_top {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
}
.name_down {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-transform: capitalize;
  color: #1f7bb5;
}
.name_last {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #64737c;
}

.name_copy {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 129.02%;
  text-align: center;
  letter-spacing: 0.125em;
  text-transform: capitalize;
  color: #8e8e8e;
  position: relative;
  margin-top: 1rem;
}

.name_copy span {
  position: absolute;
  right: -1%;
  top: -32%;
}

.stats {
  display: flex;
  gap: 3rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(176, 176, 176, 0.5);
}

.stats .stat {
  border-right: 0.5px solid #b0b0b0;
  padding-right: 2rem;
}
.stats .stat:last-child {
  border-right: none;
}
.stats .stat .main {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 44px;
  text-align: center;
  color: #000000;
  margin-bottom: 0;
}

.stats .stat .sub {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 10px !important;
  line-height: 10px;
  color: #000000;
}

.stat .row {
  gap: 0.4rem;
}
@media (max-width: 800px) {
  .main_area_top {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }
  .main_area_top.act,
  .btns {
    justify-content: center;
  }
  .stats {
    justify-content: center;
  }

  .wrapper {
    padding: 1rem 0;
  }

  // .details .sub_text {
  //   line-height: 12px;
  //   margin-top: 0.4rem;
  // }

  .details .main_text {
    line-height: 40px;
  }

  .stats .stat .sub {
    font-size: 10px !important;
    line-height: 11.5px;
  }

  .main_area_top .main_area_left {
    // flex-wrap: wrap;
    justify-content: center;
    text-align: center;
  }
  .style {
    padding: 0 1rem;
  }
  .imgs_wrap.active img:last-of-type {
    width: 86px;
    height: 73px;
    position: relative;
  }

  .main_area_top .main_area_left.act {
    gap: 1rem;
  }

  .link {
    font-size: 12px;
    margin-bottom: 0.5rem;
  }
}

@media (max-width: 500px) {
  .main_area_top .main_area_left.act {
    flex-direction: column;
  }
  .main_area_top.act {
    padding: 2.5rem 0 1rem;
  }
}
</style>
