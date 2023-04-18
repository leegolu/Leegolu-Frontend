<template>
  <div class="wrapp">
    <div class="top">
      <span class="title">
        <i class="fa-solid q-mr-sm fa-list"></i>
        Collections | 8
      </span>

      <div class="sort_area">
        <div class="left"></div>
        <div class="right">
          <q-btn @click="dialogCreate = true" class="regular">
            New Collection <i class="fa-solid q-ml-sm fa-plus"></i
          ></q-btn>
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
        <template v-slot:body-cell-customerList="props">
          <q-td :props="props">
            <!-- {{ props.row }} -->
            <div @click="dialog = true" class="name_row">
              <div class="img">
                <img :src="props.row.image_url" />
              </div>

              <div class="name">
                <div class="name_top">
                  {{ props.row.userName }}
                </div>
                <div class="name_down">
                  {{ props.row.kind }}
                </div>
                <div class="q-py-xs avatars q-gutter-sm" style="height: 80px">
                  <q-avatar
                    v-for="(n, index) in 5"
                    :key="n"
                    square
                    size="40px"
                    class="overlapping"
                    :style="`left: ${index === 0 ? 0 : n * 15}px`"
                  >
                    <img
                      :src="`https://cdn.quasar.dev/img/avatar${n + 1}.jpg`"
                    />
                  </q-avatar>
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
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <div
              class="row items-center justify-end no-wrap table_actn_area q-gutter-sm"
            >
              <q-btn-dropdown
                flat
                class="modify"
                color="primary"
                label="Modify"
              >
                <q-list>
                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Edit</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Archive</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Delete</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
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
    <q-dialog v-model="dialog" persistent>
      <q-card class="card">
        <div class="dialog_content">
          <p class="advert text-center">Collection</p>
          <div class="dialog_top advert">
            <div class="left_dialog collection">
              <img src="/images/collection1.png" alt="" />
              <div class="title">Ankara</div>
            </div>
          </div>
          <p class="count">8 Listings in this collection</p>
          <div class="topDetails">
            <div class="lead_details">
              <div class="leads_wrap">
                <div class="leads">
                  <img src="/images/listing2.png" alt="" />

                  <div class="lead_detail">
                    <div class="title">Ankara Head Wrap Gown</div>
                    <div class="price">₦15,000</div>
                    <q-btn @click="close" class="remove" flat>
                      <i class="fa-solid fa-xmark"></i> Remove
                    </q-btn>
                  </div>
                </div>
                <div class="q-pa-md">
                  <q-checkbox keep-color color="info" v-model="val" />
                </div>
              </div>
            </div>
            <div class="lead_details">
              <div class="leads_wrap">
                <div class="leads">
                  <img src="/images/listing2.png" alt="" />

                  <div class="lead_detail">
                    <div class="title">Ankara Head Wrap Gown</div>
                    <div class="price">₦15,000</div>
                    <q-btn class="remove" flat>
                      <i class="fa-solid fa-xmark"></i> Remove
                    </q-btn>
                  </div>
                </div>
                <div class="q-pa-md">
                  <q-checkbox keep-color color="info" v-model="val" />
                </div>
              </div>
            </div>
            <div class="lead_details">
              <div class="leads_wrap">
                <div class="leads">
                  <img src="/images/listing3.png" alt="" />

                  <div class="lead_detail">
                    <div class="title">Ankara Head Wrap Gown</div>
                    <div class="price">₦15,000</div>
                    <q-btn class="remove" flat>
                      <i class="fa-solid fa-xmark"></i> Remove
                    </q-btn>
                  </div>
                </div>

                <div class="q-pa-md">
                  <q-checkbox keep-color color="info" v-model="val" />
                </div>
              </div>
            </div>
            <div class="lead_details">
              <div class="leads_wrap">
                <div class="leads">
                  <img src="/images/listing2.png" alt="" />

                  <div class="lead_detail">
                    <div class="title">Ankara Head Wrap Gown</div>
                    <div class="price">₦15,000</div>
                    <q-btn class="remove" flat>
                      <i class="fa-solid fa-xmark"></i> Remove
                    </q-btn>
                  </div>
                </div>

                <div class="q-pa-md">
                  <q-checkbox keep-color color="info" v-model="val" />
                </div>
              </div>
            </div>
          </div>

          <div class="boost">
            <q-btn>Add Listing</q-btn>
          </div>

          <q-btn @click="dialog = false" class="close">
            <i class="fa-solid fa-xmark"></i>
          </q-btn>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogCreate" persistent>
      <q-card class="card">
        <div class="dialog_content">
          <p class="advert text-center">Add new collection</p>
          <div class="dialog_top">
            <div class="previewMain">
              <form>
                <div class="form">
                  <input
                    type="file"
                    accept="image/*"
                    @change="previewImage"
                    class="previewinput"
                    id="my-file"
                  />

                  <div class="previewDiv">
                    <template v-if="preview">
                      <img :src="preview" class="previewimg" />
                      <img src="/images/upload.png" class="click" alt="" />
                    </template>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="input-box active-grey">
            <label class="input-label">Collection Name</label>
            <input type="text" class="input-1" />
          </div>

          <div class="boost">
            <q-btn>Add Collection</q-btn>
          </div>

          <q-btn @click="dialogCreate = false" class="close">
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
    name: "customerList",
    required: true,
    label: "Collections List",
    align: "left",
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: "addedOn",
    required: true,
    label: "Created On",
    align: "center",
    field: (row) => row.name,
    sortable: true,
  },

  {
    name: "actions",
    required: true,
    label: "Actions",
    align: "right",
    field: (row) => row.id,
    sortable: false,
  },
];

const rows = [
  {
    name: "customerList",
    image_url: "/images/collection3.png",
    userName: "Gowns",
    kind: "11 Listings",
    addedOn: "October 7, 2022",
  },
  {
    name: "addedOn",
    image_url: "/images/collection2.png",
    userName: "Ankara Gear",
    kind: "11 Listings",
    addedOn: "October 7, 2022",
  },
  {
    name: "addedOn",
    image_url: "/images/collection1.png",
    userName: "Bridal",
    kind: "11 Listings",
    addedOn: "October 7, 2022",
  },
];

export default {
  setup() {
    useMeta({
      title: "Collections",
    });
  },
  data() {
    return {
      columns,
      preview: "/images/sqrpreview.png",
      dialog: false,
      dialogCreate: false,
      rows,
      val: false,
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

    close() {
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
          // console.log('>>>> OK')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
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

    previewImage(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    toggleModal(props) {
      this.rowData = props;
      this.dialog = true;
      // console.log(props);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapp {
  margin: 2rem 1.5rem;
}
.overlapping {
  border: 2px solid white;
  position: absolute;
  border-radius: 10px;
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
  justify-content: flex-end;
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
  width: 107px;
  height: 34px;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  background: #1f7bb5;
  border-radius: 17px;
}
.sort_area .regular {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  text-transform: capitalize;
  background: #1f7bb5;
  width: 166px;
  height: 36px;
  border-radius: 6px;
  color: #ffffff;
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
.modify {
  background: #c2e6e9 !important;
  border-radius: 5px !important;
  font-family: "Open Sans" !important;
  font-style: normal !important;
  font-weight: 600 !important;
  font-size: 14px !important;
  line-height: 19px !important;
  text-align: center;
  color: #1f7bb5 !important;
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

p.count {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #000000;
  padding: 0 1.5rem;
  margin-bottom: 0;
}

.name_row {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.name_row .img img {
  width: 99px;
  height: 99px;
}

.avatars {
  position: relative;
}

.added {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  text-align: center;

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
  right: -15%;
  top: -32%;
}

// dialog

.card {
  min-width: 363px;
  background: #ffffff;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  width: 427px;
  // height: 522px;
}

.dialog_content {
  background: #ffffff;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
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
  margin-bottom: 1rem;
}

.dialog_content .left_dialog {
  width: 100%;
  position: relative;
  height: 132px;
}
.dialog_content .left_dialog::before {
  content: "";
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
}
.dialog_content .left_dialog img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.dialog_content .left_dialog .title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  text-align: center;
  color: #ffffff;
}

.topDetails {
  padding: 0.5rem;
  height: 350px;
  padding: 0 1rem 1rem;
  overflow-y: scroll;
}

.topDetails .lead_details {
  margin: 1rem 0;
}

.leads_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(195, 195, 195, 0.4);
  border-bottom: 1px solid rgba(195, 195, 195, 0.4);
  padding: 0.3rem 0;
}

.leads .title {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  color: #000000;
}

.leads .price {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  text-transform: capitalize;
  color: #000000;
}

.leads img {
  border: 3px solid rgba(176, 176, 176, 0.5);
  border-radius: 3px;
  width: 48.93px;
  height: 48.93px;
}

.leads .remove {
  background: rgba(238, 78, 54, 0.12);
  border-radius: 5px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 8px;
  line-height: 11px;
  color: #ee4e36;
}
.leads .remove i {
  margin-right: 0.2rem;
  color: #ee4e36;
  font-size: 11px;
}

.lead_details .leads {
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  padding: 1rem;
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
  margin-bottom: 0;
  padding: 1rem 0;
  color: #000000;
}

//preview
.previewMain {
  width: 100%;
}
.previewDiv {
  position: relative;
}

.previewDiv .click {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.form {
  margin-top: 1rem;
  position: relative;
  display: flex;
  justify-content: center;
}
.form img.previewimg {
  width: 229px;
  height: 195px;
}
.form img.click {
  width: 120px;
}

.previewinput {
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 100%;
  background: transparent;
  opacity: 0;
}
$color: #80868b;
$input-value-color: #202124;
$border-color: 1px solid #dadce0;
$active-color: #1a73e8;
$default-background: #fff;
input {
  background: $default-background;
}

#form {
  margin: 0 auto;
}
.input-box.active-grey {
  .input-1 {
    border: 1.5px solid #c2bfbf;
  }
  .input-label {
    color: $color;
    top: -8px;
    background: $default-background;
    font-size: 11px;

    transition: 250ms;
  }
}
.input-box {
  position: relative;
  margin: 25px;
  .input-label {
    position: absolute;
    color: $color;
    font-size: 16px;
    font-weight: 400;
    max-width: calc(100% - (2 * 8px));
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    left: 8px;
    top: 13px;
    padding: 0 8px;
    transition: 250ms;
    user-select: none;
    pointer-events: none;
  }
  .input-1 {
    box-sizing: border-box;
    height: 50px;
    width: 100%;
    border-radius: 4px;
    color: $input-value-color;
    border: $border-color;
    padding: 13px 15px;

    transition: 250ms;
    &:focus {
      outline: none;
      border: 2px solid #1a73e8;
      transition: 250ms;
    }
  }
}

.input-box.focus,
.input-box.active {
  .input-label {
    color: $active-color;
    top: -8px;
    background: $default-background;
    font-size: 11px;
    transition: 250ms;
  }
}
.input-box.active {
  .input-1 {
    border: 2px solid #1a73e8;
  }
}

.clear {
  clear: both;
}

::placeholder {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: -0.01em;
  color: #000000;
}
</style>
