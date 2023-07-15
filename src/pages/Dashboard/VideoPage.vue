<template>
  <q-layout class="page_">
    <div class="q-mt-lg">
      <q-card class="create_ad container">
        <div class="dialog_top">
          <img src="/images/flag.png" alt="" />
          <div class="create">Create Video</div>
        </div>

        <div class="text">
          Upload the shot that best sells your design. High quality images
          attract more customers. We recommend your images are taken by a
          professional and when possible get a model to wear them.
        </div>

        <div class="previewMain">
          <div class="form">
            <div class="style">
              <div class="q-mt-sm q-gutter-sm">
                <q-radio v-model="upload" val="For User" label="For User" />
                <q-radio
                  v-model="upload"
                  val="For Product"
                  label="For Product"
                />
                <q-radio v-model="upload" val="For Vendor" label="For Vendor" />
              </div>
            </div>
            <div class="">
              <div v-if="showProdList === 'show product'">
                <q-select
                  v-model="model"
                  :options="options"
                  label="Select product"
                />
              </div>
              <div v-if="showProdList === 'show categories'">
                <q-select
                  v-model="cat"
                  :options="catOptions"
                  label="Select category"
                />
              </div>
              <q-file
                class="q-mt-md"
                label="Upload video file"
                @rejected="onRejected"
                outlined
                accept=".mp4"
                @update:model-value="setVideoFile"
                v-model="videoFile"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
              <div class="q-my-lg">
                <video v-if="videoUrl" class="full-width" controls>
                  <source :src="videoUrl" type="video/mp4" />
                </video>
              </div>

              <div class="q-mt-lg">
                <q-btn
                  @click="finish"
                  :loading="loading"
                  no-caps
                  color="primary"
                >
                  Upload Video
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </div>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { fabYoutube } from "@quasar/extras/fontawesome-v6";
import { Dialog, Notify } from "quasar";
export default {
  name: "MyLayout",
  data() {
    return {
      image: null,
      successModal: false,
      showProdList: "show product",
      videoUrl: null,
      videoFile: null,
      upload: "For Product",
      categories: [],
      options: [],
      catOptions: [],
      loading: false,
      model: "",
      cat: "",
    };
  },
  watch: {
    upload: {
      handler() {
        if (this.upload === "For Product") {
          this.showProdList = "show product";
        } else if (this.upload === "For User") {
          this.showProdList = "show categories";
        } else {
          this.showProdList = false;
        }
      },
      immediate: true,
    },
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const search = ref("");
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    return {
      editor: ref(""),

      fabYoutube,
      leftDrawerOpen,
      search,
      filesImages: ref(null),
      EditfilesImages: ref(null),
      notifications: ref([]),
      toggleLeftDrawer,
    };
  },

  created() {
    this.getCategory();
    this.getVendor();
    // this.getUploadRequirements();
  },

  methods: {
    setVideoFile(props) {
      this.videoUrl = URL.createObjectURL(props);
    },
    onRejected() {
      Notify.create({
        message: `Invalid file type`,
        color: "red",
        position: "top",
      });
    },
    getCategory() {
      this.$api
        .get("categories")
        .then((response) => {
          console.log(response);
          this.catOptions = response.data.data.map((cat) => ({
            label: cat.name,
            value: cat.id,
          }));
          // this.vendordetails.business_type = response.data.data[0].id;
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },

    getVendor() {
      this.$api
        .get(`vendor/${this.$store.leegoluauth.vendorDetails.slug}`)
        .then((response) => {
          console.log(response);
          this.options = response.data.vendor.products.map((product) => ({
            label: product.name,
            value: product.id,
          }));
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },

    finish() {
      if (this.upload === "For Vendor") {
        const formData = new FormData();
        formData.append("media", this.videoFile);
        this.loading = true;
        this.$api
          .post(
            `upload-video${this.$store.leegoluauth.vendorDetails.slug}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((response) => {
            console.log("Success:", response);
            this.loading = false;
            this.$q.notify({
              message: response.data.message,
              color: "green",
              position: "top",
              actions: [{ icon: "close", color: "white" }],
            });
            Dialog.create({
              title: "Successful",
              message: "You have successfully uploaded your video file...",
              ok: {
                push: true,
                label: "Okay",
                color: "green",
              },
              persistent: true,
            })
              .onOk(() => {
                this.videoFile = null;
                this.model = "";
                this.videoUrl = "";
              })
              .onCancel(() => {
                // console.log('>>>> Cancel')
              })
              .onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
              });
          })
          .catch((e) => {
            // console.log(e.response);
            this.errors = e.response.data.errors;
            this.loading = false;
            this.$q.notify({
              message: e.response.data.message,
              color: "red",
              position: "top",
              actions: [{ icon: "close", color: "white" }],
            });
            // console.log("Error:", response);
          });
      } else if (this.upload === "For Product") {
        if (this.model === "") {
          Notify.create({
            message: `You need to select a product`,
            color: "red",
            position: "top",
          });
        } else {
          this.loading = true;
          const formData = new FormData();
          formData.append("media", this.videoFile);
          this.$api
            .post(`upload-video/${this.model.value}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              console.log("Success:", response);
              this.loading = false;
              this.$q.notify({
                message: response.data.message,
                color: "green",
                position: "top",
                actions: [{ icon: "close", color: "white" }],
              });
              Dialog.create({
                title: "Successful",
                message: "You have successfully uploaded your video file...",
                ok: {
                  push: true,
                  label: "Okay",
                  color: "green",
                },
                persistent: true,
              })
                .onOk(() => {
                  this.videoFile = null;
                  this.model = "";
                  this.videoUrl = "";
                })
                .onCancel(() => {
                  // console.log('>>>> Cancel')
                })
                .onDismiss(() => {
                  // console.log('I am triggered on both OK and Cancel')
                });
            })
            .catch((e) => {
              // console.log(e.response);
              this.errors = e.response.data.errors;
              this.loading = false;
              this.$q.notify({
                message: e.response.data.message,
                color: "red",
                position: "top",
                actions: [{ icon: "close", color: "white" }],
              });
              // console.log("Error:", response);
            });
        }
      } else {
        return;
      }
    },

    create() {
      if (!this.uploadedImages.length && !this.edit) {
        this.$q.notify({
          color: "red",
          message: "Image field field is required",
        });
      } else {
        this.modal1 = false;
        this.modal2 = true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.Features {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  text-transform: capitalize;
  color: #000000;
}

.menu {
  display: none;
  color: #000000;
  min-height: 0;
}

.mybtn::before {
  box-shadow: none;
}
.wraps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.adDet {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  text-transform: capitalize;
  color: #000000;
}

.bar input {
  width: 100%;
  border: none;
  background: transparent;
  padding: 0 1rem;
}

input:focus {
  outline: none;
}

.uploaded_thumbs {
  position: relative;
}
.uploaded_thumbs .q-btn {
  position: absolute;
  top: 1%;
  right: 1%;
  background: #ee4e36;
  color: white;
  padding: 3px 5px;
  font-size: 10px;
  min-height: auto;
}

.search-btn {
  min-height: 0;
}

::placeholder {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #9a9a9a;
}

.links {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  // color: #000000;
}

.q-list {
  padding: 2rem 1rem;
}

.avater_side {
  min-width: 0;
}

.q-item.q-router-link--active,
.q-item--active {
  background: #1f7bb5;
  border-radius: 5px;
  color: white;
}

.successful {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.successful img {
  width: 149px;
  height: 149px;
  object-fit: contain;
}
.successful .return {
  background: #1f7bb5;
  border-radius: 9px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  color: #ffffff;
  margin-top: 0.7rem;
}
.items.btr {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.successful .congrats {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  margin-bottom: 0;
  margin-top: 1rem;
  color: #000000;
}

.successful .more {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #000000;
  margin: 0.3rem 0.8rem;
}

.images {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 1rem 0 0;
}

.images img {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  object-fit: contain;
  border: 1px solid rgba(53, 113, 150, 0.26);
}
// modals

@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,700");

$color: #80868b;
$active-color: #1a73e8;
$error-color: #f44336;
$input-value-color: #202124;
$border-color: 1px solid #dadce0;

$border-color-active: 2px solid $active-color;
$default-background: #fff;

/* Buttons */
$btn-default-bg-color: #fff;
$btn-default-bgh-color: #ddd;
$btn-default-text-color: #333;

.img img {
  width: 100px;
}
input,
select,
textarea {
  background: $default-background;
}

#form {
  margin: 0 auto;
}
.input-box.active-grey {
  .input-1,
  select,
  textarea {
    border: 1.5px solid #9d9d9d;
  }
  select,
  textarea {
    width: 100%;
  }
  .input-label {
    // color: $color;
    top: -8px;
    background: $default-background;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-transform: capitalize;
    color: #000000;
    transition: 250ms;
  }
}
.input-box {
  position: relative;
  margin: 35px 0 0;
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
  .input-1,
  select,
  textarea {
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
.input-box.error {
  .input-label {
    color: $error-color;
    top: -8px;
    background: $default-background;
    font-size: 11px;
    transition: 250ms;
  }
  .input-1 {
    border: 2px solid $error-color;
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
.btn {
  color: $btn-default-text-color;
  cursor: pointer;
  border: none;
  white-space: normal;
  letter-spacing: 0.25px;
  font-weight: 400;
  font-size: 14px;
  padding: 13px;
  border-radius: 4px;
  line-height: 20px;
  min-width: 88px;
  transition: 250ms;
  width: 207px;
  height: 47px;
  border-radius: 9px;
  margin-top: 2rem;

  &:hover {
    background: $btn-default-bgh-color;
    transition: 250ms;
  }
  &:focus {
    outline: none;
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

// modal
.create_ad {
  padding: 2rem;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
}
.dialog_top {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dialog_top img {
  width: 22px;
  height: 26px;
}

.create_ad .create {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: #000000;
}

.check_wraps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  // align-items: center;
  gap: 1rem;
}

.create_ad .text {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  margin: 2.5rem 0;
  color: #000000;
  // max-width: 500px;
}
p.more {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 0;
  color: #000000;
}
//preview
.previewMain {
  width: fit-content;
}
.previewDiv {
  position: relative;
}

.previewDiv .click {
  position: absolute;
  left: 30%;
  top: 27%;
}

.form {
  margin-top: 1rem;
  position: relative;
}
.form img.previewimg {
  width: 158px;
  height: 158px;
  // border: 5px solid rgba(53, 113, 150, 0.26);
  border-radius: 21px;
  border: none;
}
.form img.click {
  width: 70px;
}

.previewinput {
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 100%;
  background: transparent;
  opacity: 0;
}

// modal 3

// dialog

.card {
  min-width: 363px;
  background: #ffffff;
  // box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  // border-radius: 4px;
  width: 466px;
  border-radius: 14px !important;

  // height: 522px;
}

.dialog_content {
  background: #ffffff;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.4);
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
  gap: 1rem;
  align-items: flex-start;
  margin: 1.5rem 0;
  background: #edf1f4;
  border-radius: 17px;
  padding: 1.5rem;
}
.dialog_content .dialog_top.advert .det {
  margin: 1.5rem 0;
}
.dialog_content .dialog_top img {
  width: 22px;
  height: 26px;
}

.create_ad .create,
.dialog_top .create {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: #000000;
}

p.advert {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  margin-bottom: 0;
  padding: 0rem 0;
  color: #000000;
}

.dialog_content .dialog_top.advert img {
  width: 172px;
  height: 172px;
  border: 3px solid rgba(176, 176, 176, 0.5);
  border-radius: 3px;
  object-fit: cover;
}

.dialog_content .middle.advert {
  display: flex;
  gap: 2rem;
  border-top: 1px solid #d1d1d1;
  border-bottom: 1px solid #d1d1d1;
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

.dialog_content .middle.advert .q-btn.active {
  background: #1f7bb5;
  color: #fff;
}
.dialog_content .middle.advert .q-btn::before {
  box-shadow: none;
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

.dialog_content .boost {
  margin-top: 1.5rem;
}

.dialog_content .q-btn.post {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  display: flex;
  align-items: center;
  text-align: center;
  width: 207px;
  height: 47px;
  color: #ffffff;
  color: #ffffff !important;
  background: #1f7bb5 !important;
  border-radius: 9px;
  text-transform: capitalize;
}
.q-btn.prev {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #1f7bb5 !important;
  background: rgba(255, 255, 255, 0.5) !important;
  border: 2px solid #b0b0b0;
  border-radius: 5px;
  width: auto;
  width: 103px;
  height: 46px;
  text-transform: capitalize;
}

@media (max-width: 950px) {
  .bar .input_wrap {
    width: 70%;
    margin-left: 0;
  }
}
@media (max-width: 900px) {
  .mybtn {
    font-size: 12px;
    width: 150px;
  }

  .bar .input_wrap {
    width: 70%;
    margin-left: 0;
  }
  .menu {
    display: block;
  }
  .card {
    width: 95% !important;
    margin: 2rem auto;
    min-width: 95% !important;
  }
  // .create_ad {
  //   margin: 2rem auto;
  // }
}
@media (max-width: 500px) {
  .dialog_content .middle.advert {
    // flex-wrap: wrap;
    gap: 0.5rem 1rem;
    padding: 1rem 0;
  }

  .successful img {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }
  .successful .return {
    font-size: 14px;
  }

  .successful .congrats {
    font-size: 16px;
    line-height: 17px;
  }
  .images img {
    width: 80px;
    height: 80px;
  }

  .successful .more {
    font-size: 12px;
    line-height: 12px;
  }

  .dialog_content .dialog_top.advert img {
    width: 122px;
    height: 122px;
  }
  .dialog_content .dialog_top .title {
    font-size: 16px;
    line-height: 18px;
    margin-bottom: 0.4rem;
  }

  .dialog_content .dialog_top .price {
    font-size: 14px;
  }

  .dialog_content .middle.advert .q-btn {
    font-size: 10px;
    white-space: nowrap;
  }
  .dialog_content .ad p:first-of-type {
    font-size: 12px;
  }
  .dialog_content .ad p:last-of-type {
    font-size: 16px;
  }
  .dialog_content .dialog_top.advert {
    padding: 1rem;
  }
  .dialog_content .q-btn.post {
    font-size: 14px;
    width: auto;
    height: 37px;
  }

  .mybtn {
    width: 160px;
  }

  .btn {
    font-size: 12px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    margin-top: 1rem;
  }

  .q-btn.prev {
    height: 40px;
    font-size: 12px;
    // width: auto;
  }

  .btnns {
    flex-wrap: wrap;
    flex-direction: column;
  }
  .btnns .q-btn {
    width: 100%;
  }
  .btnns .q-btn:first-of-type {
    margin-top: 2rem;
  }
  .btnns .q-btn:last-of-type {
    margin-top: 0.5rem;
  }

  .create_ad .text {
    font-size: 12px;
    line-height: 16px;
    margin: 1.5rem 0;
  }

  .form img.previewimg {
    width: 128px;
    height: 138px;
    // border: 3px solid rgba(53, 113, 150, 0.26);
  }
  .form img.click {
    width: 50px;
  }

  // .row {
  //   gap: 1rem;
  // }
}
</style>
