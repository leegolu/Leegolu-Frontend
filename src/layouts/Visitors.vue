<template>
  <q-layout view="hHh lpR fFf" class="bg-accent">
    <q-header class="header q-py-sm" height-hint="58">
      <q-toolbar class="q-pb-sm">
        <q-btn
          flat
          dense
          round
          class="menu"
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <q-btn
          to="/"
          flat
          no-caps
          no-wrap
          class="q-ml-xs logo"
          v-if="$q.screen.gt.xs"
        >
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
          <div class="right">
            <router-link to="/login"> Sign In </router-link>
            <router-link to="/register"> Join Now </router-link>
            <q-btn color="secondary"> Start Selling </q-btn>
          </div>
        </div>
      </q-toolbar>
      <div class="sub_header q-pa-xs">
        <div class="sub_header_wrap">
          <div class="">
            <q-btn-dropdown
              class="all"
              flat
              color="primary"
              label="All Categories"
            >
              <q-list>
                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-section>
                    <q-item-label>Cars</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-section>
                    <q-item-label>Foods</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-section>
                    <q-item-label>Construction</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>

          <div class="category_items">
            <q-item
              v-for="(item, index) in categories"
              :key="index"
              class="item"
            >
              {{ item.name }}
            </q-item>
          </div>
        </div>
      </div>
    </q-header>

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
      categories: [
        {
          id: 1,
          name: "Cars",
        },
        {
          id: 2,
          name: "Mobile Phones",
        },
        {
          id: 3,
          name: "Housing & Apartments",
        },
        {
          id: 4,
          name: "Skin Care",
        },
        {
          id: 5,
          name: "Fashion",
        },
        {
          id: 6,
          name: "Jobs and Vacancies",
        },
        {
          id: 7,
          name: "Food and Agriculture",
        },
        {
          id: 8,
          name: "Repairs and Construction",
        },
      ],
      links1: [
        { icon: "home", text: "Overview", to: "dashboard" },
        { icon: "fa-solid fa-file", text: "My Adverts", to: "adverts" },
        { icon: "fa-solid fa-list", text: "My Listings", to: "listings" },
        { icon: "fa-solid fa-user", text: "My Customers", to: "customers" },
        {
          icon: "fa-solid fa-pen",
          text: "My Collections",
          to: "collections",
        },
        {
          icon: "fa-solid fa-heart",
          text: "My Favorites",
          to: "favourites",
        },
        { icon: "fa-solid fa-message", text: "Messages", to: "messages" },
        {
          icon: "fa-solid fa-bell",
          text: "Notifications",
          to: "notifications",
        },
        { icon: "fa-solid fa-gear", text: "Settings", to: "settings" },
      ],
    };
  },

  methods: {
    onItemClick() {
      // console.log('Clicked on an Item')
    },
  },
};
</script>

<style scoped lang="scss">
a {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #000;
}

.right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.right .q-btn {
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-transform: uppercase;
  border-radius: 6px;
  color: #ffffff;
}
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
  width: 50%;
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
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  // color: #000000;
}

.avater_side {
  min-width: 0;
}

.q-item.q-router-link--active,
.q-item--active {
  background: #e9e9e9;
  border-radius: 5px;
}

// sub header
.sub_header_wrap .all {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  color: #000000 !important;
}

.category_items {
  display: flex;
  align-items: center;
}
.category_items .item {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #000000;
  min-height: 0;
}

.sub_header {
  border-top: 1px solid #dddddd;
}

.sub_header_wrap {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
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
  .bar {
    width: 100%;
  }
  .bar .input_wrap {
    display: none;
  }
  .mybtn {
    width: 160px;
  }

  .category_items {
    display: none;
  }

  a {
    font-size: 12px;
    white-space: nowrap;
  }

  .right .q-btn {
    font-size: 10px;
    padding: 4px 5px;
    white-space: nowrap;
  }
  .right {
    gap: 0.5rem;
    margin-bottom: 0.3rem;
  }
  .nav {
    padding: 0.7rem 0.6rem;
  }
}
</style>
