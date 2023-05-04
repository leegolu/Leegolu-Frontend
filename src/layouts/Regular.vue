<template>
  <q-layout view="hHh lpR fFf" class="bg-accent">
    <q-header class="header q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          class="menu"
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <q-btn flat no-caps no-wrap class="q-ml-xs logo" v-if="$q.screen.gt.xs">
          <img src="/images/logored.png" alt="" />
        </q-btn>

        <q-space />

        <div class="bar">
          <div class="input_wrap">
            <input
              dense
              outlined
              square
              v-model="search"
              placeholder="Search your account..."
              class="search_inp"
            />
            <q-btn
              text-color="primary"
              class="search-btn"
              icon="search"
              unelevated
            />
          </div>
        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn size="10px" round color="primary" icon="fa-solid fa-message">
            <q-badge floating color="red" rounded>4</q-badge>
          </q-btn>
          <q-btn size="10px" color="primary" round icon="notifications">
            <q-badge floating color="red" rounded>4</q-badge>
          </q-btn>
          <q-btn @click="modal1 = true" class="mybtn">
            Create Listing <i class="fa-solid q-ml-md fa-plus"></i
          ></q-btn>
          <q-btn round flat>
            <q-avatar size="35px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-white"
      :width="236"
      :breakpoint="800"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item
            class="links"
            v-for="link in links1"
            :key="link.text"
            v-ripple
            clickable
            :to="{
              name: link.to,
            }"
          >
            <q-item-section class="avater_side" avatar>
              <q-icon size="18px" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
            <q-badge
              v-if="link.text === 'Notifications'"
              color="negative"
              class="q-ml-md"
              text-color="white"
              style="height: 20px"
              label="2"
            />
          </q-item>

          <q-separator class="q-my-md" />
        </q-list>
        <div class="sub">
          <img src="/images/money.png" alt="" />

          <div class="btext">
            <div class="small_tex">Make more money with a</div>

            <div class="main_text">Leegolu Business account</div>
          </div>

          <q-btn> Upgrade to Business </q-btn>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-dialog v-model="modal1">
      <q-card class="create_ad">
        <div class="dialog_top">
          <img src="/images/flag.png" alt="" />

          <div class="create">Create advert</div>
        </div>

        <div class="text">
          Upload the shot that best sells your design. High quality images
          attract more customers. We recommend your images are taken by a
          professional and when possible get a model to wear them.
        </div>

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
                  <img src="/images/click.png" class="click" alt="" />
                </template>
              </div>
            </div>
          </form>
        </div>

        <div class="create q-pt-xl">Advert Details</div>

        <div class="form"></div>
        <form id="form">
          <div class="wraps">
            <div class="input-box active-grey">
              <label class="input-label">Category</label>
              <select name="" id="">
                <option value="+243">+243</option>
                <option value="+243">+243</option>
                <option value="+243">+243</option>
              </select>
            </div>
            <div class="input-box active-grey">
              <label class="input-label">Location</label>
              <select name="" id="">
                <option value="+243">+243</option>
                <option value="+243">+243</option>
                <option value="+243">+243</option>
              </select>
            </div>
          </div>

          <div class="input-box active-grey">
            <label class="input-label">Advert Title</label>
            <input type="text" class="input-1" />
          </div>
          <div class="input-box active-grey">
            <label class="input-label">Advert Description </label>
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </div>

          <div class="wraps">
            <div class="input-box active-grey">
              <label class="input-label">Condition</label>
              <input type="text" class="input-1" />
            </div>

            <div class="price">
              <div class="input-box active-grey">
                <label class="input-label">Price</label>
                <input type="text" class="input-1" />
              </div>
              <div>
                <q-checkbox
                  color="negative"
                  v-model="price"
                  label="Negotiable"
                />
              </div>
            </div>
          </div>

          <q-btn
            type="button"
            @click="modal2 = true"
            color="primary"
            class="btn"
            >Proceed</q-btn
          >
          <div class="clear"></div>
        </form>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modal2">
      <q-card class="create_ad">
        <div class="dialog_top">
          <img src="/images/flag.png" alt="" />

          <div class="create">Create advert</div>
        </div>

        <div class="text">
          <p class="more">Add more details</p>
          Upload the shot that best sells your design. High quality images
          attract more customers. We recommend your images are taken by a
          professional and when possible get a model to wear them.
        </div>

        <div class="form"></div>
        <form id="form">
          <div class="wraps">
            <div class="input-box active-grey">
              <label class="input-label">Brand</label>
              <select name="" id="">
                <option value="+243">+243</option>
                <option value="+243">+243</option>
                <option value="+243">+243</option>
              </select>
            </div>
            <div class="input-box active-grey">
              <label class="input-label">Make</label>
              <select name="" id="">
                <option value="+243">+243</option>
                <option value="+243">+243</option>
                <option value="+243">+243</option>
              </select>
            </div>
          </div>

          <div class="wraps">
            <div class="input-box active-grey">
              <label class="input-label">Model</label>
              <input type="text" class="input-1" />
            </div>

            <div class="price">
              <div class="input-box active-grey">
                <label class="input-label">Color</label>
                <input type="text" class="input-1" />
              </div>
            </div>
          </div>

          <div class="q-py-lg advert q-gutter-sm">
            <label class="adDet">Advert Details</label>
            <q-editor
              v-model="editor"
              :definitions="{
                save: {
                  tip: 'Save your work',
                  icon: 'save',
                  label: 'Save',
                  handler: saveWork,
                },
                upload: {
                  tip: 'Upload to cloud',
                  icon: 'cloud_upload',
                  label: 'Upload',
                  handler: uploadIt,
                },
              }"
              :toolbar="[
                ['bold', 'italic', 'strike', 'underline'],
                ['upload', 'save'],
              ]"
            />
          </div>

          <div class="Features q-mt-md">Features</div>
          <div class="check_wraps">
            <div class="left">
              <div>
                <q-checkbox
                  color="negative"
                  v-model="price"
                  label="Negotiable"
                />
              </div>

              <div>
                <q-checkbox
                  color="negative"
                  v-model="price"
                  label="Negotiable"
                />
              </div>
              <div>
                <q-checkbox color="negative" v-model="air" label="Negotiable" />
              </div>
              <div>
                <q-checkbox
                  color="negative"
                  v-model="price"
                  label="Negotiable"
                />
              </div>
            </div>
            <div class="left">
              <div>
                <q-checkbox color="negative" v-model="air" label="Negotiable" />
              </div>

              <div>
                <q-checkbox
                  color="negative"
                  v-model="price"
                  label="Negotiable"
                />
              </div>
              <div>
                <q-checkbox color="negative" v-model="air" label="Negotiable" />
              </div>
              <div>
                <q-checkbox
                  color="negative"
                  v-model="price"
                  label="Negotiable"
                />
              </div>
            </div>
            <div class="left">
              <div>
                <q-checkbox color="negative" v-model="air" label="Negotiable" />
              </div>

              <div>
                <q-checkbox
                  color="negative"
                  v-model="price"
                  label="Negotiable"
                />
              </div>
              <div>
                <q-checkbox
                  color="negative"
                  v-model="price"
                  label="Negotiable"
                />
              </div>
              <div>
                <q-checkbox color="negative" v-model="air" label="Negotiable" />
              </div>
            </div>
            <div class="left">
              <div>
                <q-checkbox color="negative" v-model="air" label="Negotiable" />
              </div>

              <div>
                <q-checkbox
                  color="negative"
                  v-model="price"
                  label="Negotiable"
                />
              </div>
              <div>
                <q-checkbox
                  color="negative"
                  v-model="price"
                  label="Negotiable"
                />
              </div>
              <div>
                <q-checkbox color="negative" v-model="air" label="Negotiable" />
              </div>
            </div>
          </div>

          <div class="row items-center justify-between">
            <q-btn
              @click="modal3 = true"
              type="button"
              color="primary"
              class="btn"
              >Proceed</q-btn
            >
            <q-btn @click="modal1 = true" type="button" outline class="btn prev"
              >Prev</q-btn
            >
          </div>
          <div class="clear"></div>
        </form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modal3" persistent>
      <q-card class="card finshAd">
        <div class="dialog_content">
          <div class="dialog_top">
            <img src="/images/flag.png" alt="" />

            <div class="create">Create advert</div>
          </div>
          <div class="dialog_top advert">
            <div class="left_dialog">
              <img src="/images/listing1.png" alt="" />
            </div>

            <div class="det">
              <div class="title">Ankara Simple Style</div>
              <div class="price">₦50,000</div>
            </div>
          </div>
          <div class="row ad justify-between items-center">
            <p>Boost this advert for 3 Days</p>
            <p class="text-weight-bold">₦2,000</p>
          </div>

          <div class="middle advert">
            <div class="items">
              <q-btn> Free </q-btn>
            </div>
            <div class="items">
              <q-btn color="primary"> 3 Days </q-btn>
            </div>
            <div class="items">
              <q-btn> 7 Days </q-btn>
            </div>
            <div class="items">
              <q-btn> 30 Days </q-btn>
            </div>
          </div>

          <div class="row items-center justify-between">
            <q-btn
              @click="modal2 = true"
              type="button"
              color="info"
              class="prev btn"
              >Prev</q-btn
            >
            <q-btn
              @click="modal3 = false"
              type="button"
              outline
              color="primary"
              class="btn post"
              >Post Ad</q-btn
            >
          </div>
          <div class="clear"></div>
        </div>
      </q-card>
    </q-dialog>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import useQuasar from "quasar/src/composables/use-quasar.js";
import { fabYoutube } from "@quasar/extras/fontawesome-v6";
export default {
  name: "MyLayout",
  data() {
    return {
      preview: "/images/sqrpreview.png",
      image: null,
      modal1: false,
      modal2: false,
      price: true,
      air: false,
      modal3: false,
    };
  },
  setup() {
    const $q = useQuasar();

    const leftDrawerOpen = ref(false);
    const search = ref("");
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    return {
      editor: ref(
        "After you define a new button," +
          " you have to make sure to put it in the toolbar too!"
      ),

      saveWork() {
        $q.notify({
          message: "Saved your text to local storage",
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
        });
      },
      uploadIt() {
        $q.notify({
          message: "Server unavailable. Check connectivity.",
          color: "red-5",
          textColor: "white",
          icon: "warning",
        });
      },
      fabYoutube,
      leftDrawerOpen,
      search,
      toggleLeftDrawer,
      links1: [
        {
          icon: "fa-duotone fa-house",
          text: "Overview",
          to: "regular.dashboard",
        },
        {
          icon: "fa-duotone fa-list",
          text: "My Listings",
          to: "regular.listings",
        },

        {
          icon: "fa-duotone fa-heart",
          text: "My Favorites",
          to: "regular.favourites",
        },
        {
          icon: "fa-duotone fa-message",
          text: "Messages",
          to: "regular.messages",
        },
        {
          icon: "fa-duotone fa-bell",
          text: "Notifications",
          to: "regular.notifications",
        },
        // { icon: "fa-duotone fa-gear", text: "Settings", to: "settings" },
      ],
    };
  },

  methods: {
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
  },
};
</script>

<style scoped lang="scss">
.header {
  background: #ffffff;
  border-bottom: 1px solid #dddddd;
}
// @media (min-width: 1200px) {
//   .header {
//     max-width: 1380px;
//   }
// }
.sub {
  margin-top: 6rem;
  text-align: center;
}

.sub .btext {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: #000000;
}

.sub img {
  width: 84px;
  height: 59px;
  object-fit: contain;
}

.sub .main_text {
  font-weight: 700;
}

.sub .q-btn {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  background: #1f7bb5;
  border-radius: 9px;
  margin-top: 1rem;
  text-transform: capitalize;
}
.mybtn {
  width: 166px;
  height: 36px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  text-transform: capitalize;
  color: #000000;
}

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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  // align-items: center;
  gap: 1rem;
}

.logo img {
  width: 152px;
}

.bar {
  width: 100%;
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

.bar .input_wrap {
  display: flex;
  align-items: center;
  background: #f3f3f3;
  border: 0.5px solid #c7c7c7;
  border-radius: 50px;
  width: 432px;
  margin-left: 3rem;
  height: 41.84px;
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
  background: #e9e9e9;
  border-radius: 5px;
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
  max-width: 500px;
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
  border: 5px solid rgba(53, 113, 150, 0.26);
  border-radius: 21px;
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

.dialog_content .dialog_top.advert img {
  width: 172px;
  height: 172px;
  border: 3px solid rgba(176, 176, 176, 0.5);
  border-radius: 3px;
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
}
@media (max-width: 500px) {
  .bar .input_wrap {
    display: none;
  }
  .mybtn {
    width: 160px;
  }
}
</style>
