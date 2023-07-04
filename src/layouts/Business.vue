<template>
  <q-layout view="hHh lpR fFf" class="">
    <q-header class="header q-py-xs" height-hint="58">
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          class="menu"
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
          v-if="$q.screen.gt.xs"
        /> -->

        <q-btn to="/" flat no-caps no-wrap class="q-ml-xs logo">
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

        <div
          style="width: 100%; gap: 1.5rem"
          class="header_icons justify-end row items-center no-wrap"
        >
          <div style="gap: 0.5rem" class="le flex no-wrap items-center">
            <q-btn
              :to="{ name: 'messages' }"
              style="padding: 4px 8px"
              size="10px"
              flat
              color="primary"
            >
              <img src="/images/headernotif.svg" alt="" />
              <!-- <q-badge floating color="red" rounded>0</q-badge> -->
            </q-btn>
            <q-btn
              :to="{ name: 'notifications' }"
              style="padding: 4px 8px"
              size="10px"
              color="primary"
              flat
            >
              <img src="/images/headericon.svg" alt="" />
              <q-badge
                v-if="notifications.length"
                floating
                color="red"
                rounded
                >{{ notifications.length }}</q-badge
              >
            </q-btn>
          </div>

          <div style="gap: 0.7rem" class="le flex no-wrap items-center">
            <q-btn
              :to="{ name: 'createListing' }"
              text-color="primary"
              class="mybtn"
            >
              Create Listing <i class="fa-solid q-ml-md fa-plus"></i
            ></q-btn>
            <q-btn class="" style="min-height: auto; padding: 3px" no-caps flat>
              <img
                class="ava"
                :src="
                  this.$store.leegoluauth.userDetails.avatar === null
                    ? '/images/usersvg.svg'
                    : this.$store.leegoluauth.userDetails.avatar.url
                "
              />
              <q-menu class="headermenu">
                <div class="q-pa-md">
                  <div class="column items-center">
                    <q-avatar size="72px">
                      <img
                        :src="
                          this.$store.leegoluauth.userDetails.avatar === null
                            ? '/images/usersvg.svg'
                            : this.$store.leegoluauth.userDetails.avatar.url
                        "
                      />
                    </q-avatar>
                    <div class="text-subtitle1 q-mt-md q-mb-xs">
                      {{ this.$store.leegoluauth.userDetails.name }}
                    </div>
                    <q-btn
                      style="white-space: nowrap"
                      no-caps
                      :to="{
                        name: `settings`,
                      }"
                      color="secondary"
                      class="q-px-md"
                    >
                      Go to settings
                    </q-btn>
                  </div>
                </div>
              </q-menu>
            </q-btn>
            <!-- <q-btn @click="dialogAvatar = true" class="avatar" round flat>
              <q-avatar size="55px">
                <img
                  class="ava"
                  src="https://cdn.quasar.dev/img/boy-avatar.png"
                />
              </q-avatar>
              <q-tooltip>Account</q-tooltip>
            </q-btn> -->
          </div>
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
              <OverviewVue v-if="link.text === 'Overview'" />
              <ManageIcon v-if="link.text === 'Manage Shop'" />
              <ListingsIcon v-if="link.text === 'My Listings'" />
              <Collicons v-if="link.text === 'My Collections'" />
              <CusIcons v-if="link.text === 'My Customers'" />
              <MessIcons v-if="link.text === 'Messages'" />
              <FavouriteIcon v-if="link.text === 'My Favorites'" />
              <BellIcons v-if="link.text === 'Notifications'" />
              <!-- <img v-else :src="link.icon" alt="" /> -->
              <!-- <q-icon size="18px" :name="link.icon" /> -->
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
              :label="notifications.length"
            />
          </q-item>

          <q-separator class="q-my-md" />
        </q-list>
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
          <div class="form">
            <q-file
              type="file"
              v-model="data2.uploads"
              accept=".jpg,.png,.svg,.jpeg"
              name="uploads"
              @update:model-value="setFile"
              class="previewinput"
            />

            <div class="previewDiv">
              <template v-if="preview">
                <img :src="preview" class="previewimg" />
                <img src="/images/click.png" class="click" alt="" />
              </template>
            </div>
          </div>
        </div>

        <div class="create q-pt-xl">Advert Details</div>

        <!-- <div class="form"></div> -->
        <form id="form">
          <div class="q-mt-sm" v-if="loading">Loading</div>
          <div class="wraps">
            <div v-if="!showsubCat" class="input-box active-grey">
              <label class="input-label">Category</label>
              <select
                v-model="data2.state"
                @change="getSubCategory(data2.state)"
                name=""
                id=""
              >
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.slug"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div v-if="showsubCat" class="input-box active-grey">
              <!-- <q-btn flat style="min-height: unset"> Reset </q-btn> -->
              <label class="input-label bg-grey bg-red q-pa-xs text-white"
                >Select Sub Category
              </label>
              <select
                @change="getUploadRequirements(data.subcategory)"
                v-model="data.subcategory"
                name=""
                id=""
              >
                <option
                  v-for="subcategory in subcategories"
                  :key="subcategory.id"
                  :value="subcategory.id"
                >
                  {{ subcategory.name }}
                </option>
              </select>
            </div>
            <div v-if="!showarea" class="input-box active-grey">
              <label class="input-label">Location</label>
              <select
                v-model="data2.location"
                @change="getAreas(data2.location)"
                name=""
                id=""
              >
                <option
                  v-for="state in states"
                  :key="state.id"
                  :value="state.id"
                >
                  {{ state.name }}
                </option>
              </select>
            </div>
            <div v-if="showarea" class="input-box active-grey">
              <label class="input-label bg-grey bg-red q-pa-xs text-white"
                >Select Exact Location</label
              >
              <select v-model="data.area" name="" id="">
                <option v-for="area in areas" :key="area.id" :value="area.id">
                  {{ area.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="wraps">
            <div class="input-box active-grey">
              <label class="input-label">Advert Title</label>
              <input v-model="data.name" type="text" class="input-1" />
            </div>
            <div class="input-box active-grey">
              <label class="input-label">Brand</label>
              <input v-model="data.brand" type="text" class="input-1" />
            </div>
          </div>

          <div class="input-box active-grey">
            <label class="input-label">Advert Description </label>
            <textarea
              v-model="data.description"
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
          </div>

          <div class="wraps">
            <div class="input-box active-grey">
              <label class="input-label">Condition</label>
              <select v-model="data.condition" name="" id="">
                <option value="Brand new">Brand new</option>
                <option value="Used">Used</option>
              </select>
            </div>

            <div class="price">
              <div class="input-box active-grey">
                <label class="input-label">Price</label>
                <input v-model="data.price" type="number" class="input-1" />
              </div>
              <div>
                <q-checkbox
                  color="negative"
                  v-model="data.negotiable"
                  label="Negotiable"
                />
              </div>
            </div>
          </div>

          <q-btn type="button" @click="create" color="primary" class="btn"
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
        <!-- {{ errors }} -->
        <div class="text">
          <p class="more">Add more details</p>
          Upload the shot that best sells your design. High quality images
          attract more customers. We recommend your images are taken by a
          professional and when possible get a model to wear them.
        </div>
        <!-- {{ data }} -->
        <div class="form"></div>
        <div class="wraps">
          <template v-for="(requirement, index) in requirements" :key="index">
            <div class="input-box active-grey">
              <label class="input-label">{{ requirement.name }}</label>
              <select v-model="data[requirement.name]" name="" id="">
                <option
                  v-for="(option, index) in requirement.fields"
                  :key="index"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
              <!-- {{ requirement }} -->
              <!-- {{ errors[requirement.name] }} -->
              <small
                v-if="errors[requirement.name]"
                class="text-red text-weight-bold"
              >
                {{ errors[requirement.name][0] }}
              </small>
            </div>
          </template>

          <!-- <div class="input-box active-grey">
              <label class="input-label">Make</label>
              <select name="" id="">
                <option value="+243">+243</option>
                <option value="+243">+243</option>
                <option value="+243">+243</option>
              </select>
            </div> -->
        </div>

        <div class="input-box active-grey">
          <label class="input-label">Model</label>
          <input v-model="data.model" type="text" class="input-1" />
        </div>

        <!-- <div class="price">
              <div class="input-box active-grey">
                <label class="input-label">Color</label>
                <input type="text" class="input-1" />
              </div>
            </div> -->

        <!-- <div class="q-py-lg advert q-gutter-sm">
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
          </div> -->

        <!-- <div class="Features q-mt-md">Features</div>
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
          </div> -->

        <div class="row no-wrap items-center justify-between">
          <q-btn
            @click="finish"
            :loading="loading"
            type="button"
            color="primary"
            class="btn"
            >Proceed</q-btn
          >
          <q-btn @click="prev" type="button" outline class="btn prev"
            >Prev</q-btn
          >
        </div>
        <div class="clear"></div>
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

    <q-dialog v-model="successModal">
      <q-card class="card">
        <q-card-section>
          <div class="text-h6">Success</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          You have successfully created a listing
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            :to="{ name: 'listings' }"
            flat
            class="bg-primary text-white"
            label="View Listings"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogAvatar" persistent>
      <q-card class="card avatar">
        <div class="dialog_content">
          <p class="advert text-center">Add Avatar</p>
          <div class="dialog_top">
            <div class="previewMain">
              <div class="form">
                <q-file
                  type="file"
                  v-model="avatar.avatar"
                  accept=".jpg,.png,.svg,.jpeg"
                  name="avatar"
                  @update:model-value="setAvatar"
                  class="previewinput"
                  id="my-file"
                />

                <div class="previewDiv">
                  <template v-if="previewAvatar">
                    <img :src="previewAvatar" class="previewimg" />
                    <img src="/images/upload.png" class="click" alt="" />
                  </template>
                </div>
              </div>
            </div>
          </div>

          <div class="boost">
            <q-btn :loading="loadingAvatar" @click="addAvatar"
              >Add Avatar</q-btn
            >
          </div>

          <q-btn @click="dialogAvatar = false" class="close">
            <i class="fa-solid fa-xmark"></i>
          </q-btn>
        </div>
      </q-card>
    </q-dialog>

    <q-footer class="layout_footer">
      <div class="footer_holder">
        <q-item :to="{ name: 'business.dashboard' }" flat>
          <div style="gap: 0.2rem" class="column justify-center items-center">
            <OverviewVue />
            <div class="footer_tag">Overview</div>
          </div>
        </q-item>
        <q-item :to="{ name: 'listings' }" flat>
          <div style="gap: 0.2rem" class="column justify-center items-center">
            <ListingsIcon />
            <div class="footer_tag">Listings</div>
          </div>
        </q-item>
        <q-item flat :to="{ name: 'createListing' }">
          <div style="gap: 0.2rem" class="column justify-center items-center">
            <PlusIcon />
            <div class="footer_tag">New Listing</div>
          </div>
        </q-item>
        <q-item :to="{ name: 'messages' }" flat>
          <div style="gap: 0.2rem" class="column justify-center items-center">
            <MessIcons />
            <div class="footer_tag">Messages</div>
          </div>
        </q-item>
        <q-btn flat>
          <div style="gap: 0.2rem" class="column justify-center items-center">
            <div class="more">
              <img src="/images/more.svg" alt="" />
            </div>

            <div class="footer_tag">More</div>
          </div>
          <q-menu class="menu_footer">
            <q-list style="min-width: 100px; padding: 0" class="q-pa-none">
              <q-item
                style="gap: 0.2rem"
                class="row items-center"
                :to="{ name: 'collections' }"
                clickable
                v-close-popup
              >
                <Collicons style="width: 20px; height: 20px" />
                <q-item-section>Collections</q-item-section>
              </q-item>
              <q-separator />
              <q-item
                style="gap: 0.2rem"
                class="row items-center"
                :to="{ name: 'favourites' }"
                clickable
                v-close-popup
              >
                <FavouriteIcon style="width: 20px; height: 20px" />
                <q-item-section>Favorites</q-item-section>
              </q-item>
              <q-separator />

              <q-item
                style="gap: 0.2rem"
                class="row items-center"
                :to="{ name: 'manage-shop' }"
                clickable
                v-close-popup
              >
                <ManageIcon style="width: 20px; height: 20px" />
                <q-item-section>Manage Shop</q-item-section>
              </q-item>
              <q-separator />

              <q-item
                style="gap: 0.2rem"
                class="row items-center"
                :to="{ name: 'notifications' }"
                clickable
                v-close-popup
              >
                <BellIcons style="width: 20px; height: 20px" />
                <q-item-section>Notifications</q-item-section>
              </q-item>
              <q-separator />

              <q-item
                style="gap: 0.2rem"
                class="row items-center"
                :to="{ name: 'customers' }"
                clickable
                v-close-popup
              >
                <CusIcons style="width: 20px; height: 20px" />
                <q-item-section>Customers</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import useQuasar from "quasar/src/composables/use-quasar.js";
import { fabYoutube } from "@quasar/extras/fontawesome-v6";
import OverviewVue from "src/components/icons/Overview.vue";
import Collicons from "src/components/icons/CollIcons.vue";
import CusIcons from "src/components/icons/Cusicons.vue";
import BellIcons from "src/components/icons/BellIcons.vue";
import ListingsIcon from "src/components/icons/MylistingsIcon.vue";
import MessIcons from "src/components/icons/MessIcons.vue";
import ManageIcon from "src/components/icons/ManageIcon.vue";
import FavouriteIcon from "src/components/icons/FavIcons.vue";
import PlusIcon from "src/components/icons/PlusIcon.vue";
export default {
  name: "MyLayout",
  data() {
    return {
      preview: "/images/sqrpreview.png",
      previewAvatar: "/images/sqrpreview.png",
      image: null,
      successModal: false,
      modal1: false,
      modal2: false,
      price: true,
      air: false,
      modal3: false,
      categories: [],
      subcategories: [],
      states: [],
      showarea: false,
      requirements: [],
      showsubCat: false,
      loadingAvatar: false,
      avatar: {},
      areas: [],
      errors: {},
      loading: false,
      dialogAvatar: false,
      data: { negotiable: true },
      data2: {},
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
      notifications: ref([]),
      toggleLeftDrawer,
      links1: [
        {
          icon: "/images/svgmanage.svg",
          text: "Overview",
          to: "business.dashboard",
        },
        {
          icon: "/images/svgoverview.svg",
          text: "Manage Shop",
          to: "manage-shop",
        },
        { icon: "/images/icon3.svg", text: "My Listings", to: "listings" },
        {
          icon: "/images/collections.svg",
          text: "My Collections",
          to: "collections",
        },
        {
          icon: "/images/customers.svg",
          text: "My Customers",
          to: "customers",
        },
        { icon: "/images/messages.svg", text: "Messages", to: "messages" },

        {
          icon: "/images/fav.svg",
          text: "My Favorites",
          to: "favourites",
        },
        {
          icon: "/images/notif.svg",
          text: "Notifications",
          to: "notifications",
        },
        // { icon: "fa-duotone fa-gear", text: "Settings", to: "settings" },
      ],
      // links1: [
      //   {
      //     icon: "fa-duotone fa-house",
      //     text: "Overview",
      //     to: "business.dashboard",
      //   },
      //   { icon: "fa-duotone fa-shop", text: "Manage Shop", to: "manage-shop" },
      //   { icon: "fa-duotone fa-list", text: "My Listings", to: "listings" },
      //   {
      //     icon: "fa-duotone fa-pen",
      //     text: "My Collections",
      //     to: "collections",
      //   },
      //   { icon: "fa-duotone fa-user", text: "My Customers", to: "customers" },
      //   { icon: "fa-duotone fa-message", text: "Messages", to: "messages" },

      //   {
      //     icon: "fa-duotone fa-heart",
      //     text: "My Favorites",
      //     to: "favourites",
      //   },
      //   {
      //     icon: "fa-duotone fa-bell",
      //     text: "Notifications",
      //     to: "notifications",
      //   },
      //   // { icon: "fa-duotone fa-gear", text: "Settings", to: "settings" },
      // ],
    };
  },
  components: {
    OverviewVue,
    Collicons,
    MessIcons,
    ListingsIcon,
    CusIcons,
    FavouriteIcon,
    ManageIcon,
    BellIcons,
    PlusIcon,
  },
  created() {
    this.getCategory();
    this.getStates();
    this.getNotifications();
    // this.getUploadRequirements();
  },

  methods: {
    setAvatar(props) {
      // console.log(props);
      var reader = new FileReader();
      reader.onload = (e) => {
        this.previewAvatar = e.target.result;
      };
      reader.readAsDataURL(props);
    },

    addAvatar() {
      const formData = new FormData();
      formData.append("avatar", this.avatar.avatar);

      this.loadingAvatar = true;
      this.$api
        .post(`upload-avatar`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // console.log("Success:", response);
          this.loadingAvatar = false;
          this.dialogAvatar = false;
          this.avatar = {};
          this.getVendor();
          this.$q.notify({
            message: response.data.message,
            color: "green",
            position: "bottom",
          });
        })
        .catch(({ response }) => {
          // console.log(response);
          this.errors = response.data.message;
          this.loadingAvatar = false;
          this.$q.notify({
            message: response.data.message,
            color: "red",
            position: "bottom",
            actions: [{ icon: "close", color: "white" }],
          });
        });
    },

    getVendor() {
      this.$api
        .get(`vendor/${this.$store.leegoluauth.vendorDetails.slug}`)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },

    setFile(props) {
      // console.log(props);
      var reader = new FileReader();
      reader.onload = (e) => {
        this.preview = e.target.result;
      };
      reader.readAsDataURL(props);
    },

    prev() {
      this.modal2 = false;
      this.modal1 = true;
    },

    getCategory() {
      this.$api
        .get("categories")
        .then((response) => {
          // console.log(response);
          this.categories = response.data.data;
          // this.vendordetails.business_type = response.data.data[0].id;
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },

    getSubCategory(category) {
      this.loading = true;
      this.showsubCat = true;
      this.$api
        .get(`${category}/sub`)
        .then((response) => {
          // console.log(response);
          this.subcategories = response.data.data;
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },

    getNotifications() {
      const url = `${this.$store.leegoluauth.vendorDetails.slug}/notifications`;
      this.curl = url;
      this.$api
        .get(url)
        .then(({ data }) => {
          console.log(data);
          this.loading = false;
          this.notifications = data.data;
        })
        .catch(({ response }) => {
          // console.log(response);
          this.loading = false;
          this.rows = [];
        });
    },

    getStates() {
      this.$api
        .get("states")
        .then((response) => {
          // console.log(response);
          this.states = response.data.data;
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },
    getAreas(id) {
      this.showarea = true;
      this.loading = true;
      this.$api
        .get(`${id}/areas`)
        .then((response) => {
          // console.log(response);
          this.loading = false;
          this.areas = response.data.data;
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },
    // getUploadRequirements(id) {
    //   this.$api
    //     .get(`${"61a8ee18-7277-46fc-81c0-41ee7147a1c5"}/requirement`)
    //     .then((response) => {
    //       console.log(response);
    //       this.requirements = response.data.data[0].dropdowns;
    //     })
    //     .catch((e) => {
    //       this.loading = false;
    //       this.errors = error.errors || {};
    //     });
    // },
    getUploadRequirements(id) {
      this.$api
        .get(`${id}/requirement`)
        .then((response) => {
          // console.log(response);
          this.requirements = response.data.data[0].dropdowns;
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },

    finish() {
      this.data.negotiable = this.data.negotiable ? 1 : 0;
      let data = {
        ...this.data,
      };
      let createproductObject = data;
      // console.log(this.postFormData);
      const formData = new FormData();
      formData.append("uploads[]", this.data2.uploads);
      formData.append("uploads[]", this.data2.uploads);
      formData.append("uploads[]", this.data2.uploads);
      // formData.append("uploads", this.data.uploads[0]);
      // formData.append("uploads[]", this.data.uploads);
      // formData.append("uploads[]", this.data.uploads);
      // formData.append("uploads[]", this.data.uploads);
      // formData.append("uploads", this.data.uploads);

      for (var key in createproductObject) {
        // console.log(key);

        // console.log(createproductObject[key]);
        formData.append(key, createproductObject[key]);
      }

      // console.log(formData);
      this.loading = true;
      this.$api
        .post(
          `${this.$store.leegoluauth.vendorDetails.slug}/product/upload`,
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
            timeout: 100000,
            position: "top",
            actions: [{ icon: "close", color: "white" }],
          });
          this.modal1 = false;
          this.modal2 = false;
          this.successModal = true;
          this.data = { negotiable: true, uploads: "" };
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
    },

    create() {
      if (!this.data2.uploads) {
        this.$q.notify({
          color: "red",
          message: "Image field field is required",
        });
      } else if (!this.data.subcategory) {
        this.$q.notify({
          color: "red",
          message: "Sub Category field is required",
        });
        return;
      } else if (!this.data.area) {
        this.$q.notify({
          color: "red",
          message: "Location field is required",
        });
        return;
      } else if (!this.data.name) {
        this.$q.notify({
          color: "red",
          message: "Name field is required",
        });
        return;
      } else if (!this.data.description) {
        this.$q.notify({
          color: "red",
          message: "Description field is required",
        });

        return;
      } else if (!this.data.condition) {
        this.$q.notify({
          color: "red",
          message: "Condition field is required",
        });
        return;
      } else if (!this.data.price) {
        this.$q.notify({
          color: "red",
          message: "Price field is required",
        });
        return;
      } else if (!this.data.negotiable) {
        this.$q.notify({
          color: "red",
          message: "The Negotiable field is required",
        });
        return;
      } else {
        this.modal1 = false;
        this.modal2 = true;
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

.mybtn .fa-plus {
  color: #ee4e36;
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  // grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
  background: #1f7bb5;
  border-radius: 5px;
  color: white;
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
  // border: 5px solid rgba(53, 113, 150, 0.26);
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

.card.avatar {
  position: relative;
  max-width: 366px;
}

.card.avatar .previewDiv img:first-of-type {
  width: 229px;
  height: 195px;
}

.card.avatar .previewDiv img.click {
  width: 120px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: contain;
}

.card.avatar .dialog_content .dialog_top {
  justify-content: center;
}

.card.avatar .boost .q-btn {
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

.card.avatar .close {
  position: absolute;
  top: 1%;
  right: 2%;
  color: #979797;
  font-size: 1rem;
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
}
@media (max-width: 500px) {
  .bar .input_wrap {
    display: none;
  }
  .mybtn {
    width: 160px;
  }

  .btn {
    font-size: 12px;
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
  }

  .q-btn.prev {
    height: 40px;
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
}
</style>
