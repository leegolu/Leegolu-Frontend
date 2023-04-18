<template>
  <div class="wrapp">
    <div class="top">
      <span class="title">
        <i class="fa-solid q-mr-sm fa-bell"></i>
        Notifications | 6
      </span>

      <div class="sort_area">
        <div class="left">
          <q-btn class="active">All </q-btn>
          <q-btn class="regular">
            High Priority
            <q-badge
              color="negative"
              class="q-ml-md"
              text-color="wjite"
              label="2"
            />
          </q-btn>
        </div>
      </div>
    </div>
    <div class="style q-pa-md">
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
        <template v-slot:body-cell-Notifications="props">
          <q-td :props="props">
            <!-- {{ props.row }} -->
            <div @click="toggleModal" class="name_row">
              <q-avatar size="50px" class="shadow-10">
                <img :src="props.row.image_url" />
              </q-avatar>
              <div class="name">
                <div class="name_top">
                  {{ props.row.userName }}
                </div>
                <div class="name_down">
                  {{ props.row.kind }}
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

        <template v-slot:no-data="{ message }">
          <div class="full-width row flex-center text-negative q-gutter-sm">
            <span> {{ message }} </span>
          </div>
        </template>
      </q-table>
    </div>
    <q-dialog v-model="advertdialog" persistent>
      <q-card class="card">
        <div class="dialog_content">
          <p class="advert text-center">Chat Lead</p>
          <div class="dialog_top advert">
            <div class="left_dialog">
              <img :src="rowData.image_url" alt="" />
            </div>

            <div class="det">
              <div class="title name_top">{{ rowData.userName }}</div>
              <div class="name_down">{{ rowData.kind }}</div>
              <div class="name_copy">
                08099999694
                <span @click="copy"><i class="fa-solid fa-copy"></i></span>
              </div>
            </div>
          </div>
          <div class="topDetails">
            <div class="lead_details">
              <div class="leads">
                <img src="/images/listing3.png" alt="" />

                <div class="lead_detail">
                  <div class="interested">INTERESTED IN</div>
                  <div class="title">Ankara Head Wrap Gown</div>
                  <div class="price">₦15,000</div>
                  <div class="day">2 days ago</div>
                </div>
              </div>
            </div>
          </div>

          <div class="boost">
            <div class="minimize">
              Minimize <i class="fa-solid fa-arrow-up"></i>
            </div>
            <q-btn> Call Now </q-btn>
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
import { useMeta } from "quasar";
import { ref } from "vue";
const columns = [
  {
    name: "Notifications",
    required: true,
    label: "Notifications",
    align: "left",
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: "addedOn",
    required: true,
    // label: "Added On",
    align: "right",
    field: (row) => row.name,
    sortable: true,
  },
];

const rows = [
  {
    name: "customerList",
    image_url: "/images/tableimg.png",
    userName: "Michael Nnamani",
    kind: "Hisense 1.5HP Split Air Conditioner",
    chat: "You: Good Afternoon Michael.",
    addedOn: "2 Days ago",
  },
  {
    name: "customerList",
    image_url: "/images/tableimg1.png",
    userName: "Michael Nnamani",
    kind: "Hisense 1.5HP Split Air Conditioner",
    chat: "You: Good Afternoon Michael.",
    addedOn: "2 Days ago",
  },
  {
    name: "customerList",
    image_url: "/images/tableimg2.png",
    userName: "Michael Nnamani",
    kind: "Hisense 1.5HP Split Air Conditioner",
    chat: "You: Good Afternoon Michael.",
    addedOn: "2 Days ago",
  },
];

export default {
  setup() {
    useMeta({
      title: "Notifications",
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
      curl: "",
      separator: "",
      mode: "list",
      loading: false,
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
      let Url = document.querySelector(".name_copy").textContent;
      navigator.clipboard.writeText(Url);
      this.$q.notify({
        message: "Copied!",
        color: "green",
        position: "top",
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
.wrapp {
  margin: 2rem 1.5rem;
}

.title {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
}

.sort_area {
  background: #f5f5f5;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  margin: 0.8rem 0;
}

.sort_area .left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.sort_area .right .sort_by_date {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
  background: #f3f3f3;
  border: 1px solid #c7c7c7;
  border-radius: 5px;
}

.sort_area .active {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  width: 107px;
  height: 34px;
  color: #ffffff;
  background: #1f7bb5;
  border-radius: 17px;
}
.sort_area .regular {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #666666;
}

.sort_area .regular::before {
  box-shadow: none;
}

.sort_area .regular.boosted {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  background: #03ae1e;
  border-radius: 17px;
}

.sort_area .right .q-btn {
  width: 215px;
  height: 34px;
}
.sort_area .right .q-btn::before {
  box-shadow: none;
}

// table

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

// dialog

.card {
  min-width: 363px;
  background: #ffffff;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  width: 366px;
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
  border: 3px solid #1f7bb5;
  border-radius: 26.5px;
  width: 53px;
  height: 53px;
}

.topDetails {
  border-bottom: 2px solid #d9d9d9 !important;
  border-top: 2px solid #d9d9d9 !important;
  padding: 0.5rem;
  height: 200px;
  overflow-y: scroll;
}

.topDetails .lead_details {
  margin: 1rem 0;
}

.leads .interested {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 8px;
  line-height: 11px;
  color: #1f7bb5;
}

.leads .title {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
}

.leads .price {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-transform: capitalize;
  color: #000000;
}

.leads .day {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 8px;
  line-height: 10px;
  text-transform: lowercase;
  color: #9d9d9d;
}

.leads img {
  border: 3px solid rgba(176, 176, 176, 0.5);
  border-radius: 3px;
  width: 78px;
  height: 78px;
}

.lead_details .leads {
  display: flex;
  align-items: center;
  gap: 1rem;
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

.dialog_content .boost {
  padding: 0.5rem 0;
}

.dialog_content .boost .minimize {
  min-height: 0;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #000000;
  padding-bottom: 0.5rem;
}

.dialog_content .boost .minimize i {
  margin-left: 0.5rem;
}
.dialog_content .boost .minimize::before {
  box-shadow: none;
  width: fit-content;
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
</style>
