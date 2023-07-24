<template>
  <q-layout view="hHh lpR fFf" class="bg-accent">
    <q-header class="header q-pt-xs" height-hint="58">
      <q-toolbar class="q-py-sm">
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
          <form @submit.prevent="search">
            <div class="input_wrap">
              <input
                dense
                outlined
                square
                v-model="searchinp"
                placeholder="Search for anything..."
                class="search_inp"
              />
              <q-btn
                text-color="black"
                class="search-btn"
                icon="search"
                type="submit"
                unelevated
              />
            </div>
          </form>
        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <div class="right">
            <div v-if="this.$store.leegoluauth.token === ''" class="div">
              <router-link to="/login"> Sign In </router-link>
              <router-link :to="{ name: 'register' }"> Join Now </router-link>
              <q-btn :to="{ name: 'register' }" color="secondary"> Sell </q-btn>
            </div>

            <div v-else class="div avaicons">
              <!-- <q-btn-dropdown flat color="secondary" icon="fa-solid fa-user">
                <div class="q-pa-md">
                  <div class="column items-center">
                    <q-avatar size="72px">
                      <img src="/images/usersvg.svg" />
                    </q-avatar>
                    <div class="text-subtitle1 q-mt-md q-mb-xs">
                      {{ this.$store.leegoluauth.userDetails.name }}
                    </div>
                    <q-btn
                      style="white-space: nowrap"
                      no-caps
                      :to="{
                        name: `${
                          this.$store.leegoluauth.userDetails.role[0].name ===
                          'business'
                            ? 'business.dashboard'
                            : 'regular.dashboard'
                        }`,
                      }"
                      color="secondary"
                      class="q-px-md"
                    >
                      Go to dashboard
                    </q-btn>
                  </div>
                </div>
              </q-btn-dropdown> -->
              <q-btn
                class=""
                style="min-height: auto; padding: 3px"
                no-caps
                flat
              >
                <div class="row no-wrap">
                  <img class="ava" src="/images/userblack.svg" />
                  <!-- <img class="ava" src="/images/userblack.svg" /> -->
                  <q-icon name="expand_more" class="text-black" />
                </div>
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
                          name: 'business.dashboard',
                        }"
                        color="secondary"
                        class="q-px-md"
                      >
                        Go to dashboard
                      </q-btn>
                    </div>
                  </div>
                </q-menu>
              </q-btn>
            </div>
            <!-- <div v-else class="div">
              <q-btn
                :to="{
                  name: `${
                    this.$store.leegoluauth.userDetails.role[0].name ===
                    'business'
                      ? 'business.dashboard'
                      : 'regular.dashboard'
                  }`,
                }"
                color="secondary"
                class="q-px-md"
              >
                Go to dashboard
              </q-btn>
            </div> -->
          </div>
        </div>
      </q-toolbar>
      <div class="sub_header">
        <div class="sub_header_wrap">
          <div class="subb">
            <q-btn-dropdown
              class="all"
              flat
              color="primary"
              label="All Categories"
            >
              <q-list>
                <q-item
                  v-for="(item, index) in categorys"
                  :key="index"
                  clickable
                  active-class="active"
                  :to="{ name: 'category-page', params: { slug: item.slug } }"
                  v-close-popup
                >
                  <q-item-section>
                    <q-item-label>{{ item.name }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-select
              use-input
              input-debounce=""
              v-model="model"
              label="All Categories"
              class="allCat"
              @filter="filterFn"
              :options="options"
              behavior="dialog"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <!-- <q-select
              v-model="model"
              class="allCat"
              :options="options"
              label="All Categories"
              behavior="dialog"
            /> -->
          </div>

          <div class="category_items">
            <q-item
              v-for="(item, index) in categorys"
              :key="index"
              :to="{ name: 'category-page', params: { slug: item.slug } }"
              class="item"
              active-class="active"
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
import { fabYoutube } from "@quasar/extras/fontawesome-v6";
// const stringOptions = [];
export default {
  name: "MyLayout",
  data() {
    return {
      preview: "/images/sqrpreview.png",
      image: null,
      categorys: [],
      modal1: false,
      modal2: false,
      price: true,
      air: false,
      searchinp: "",
      model: "",
      modal3: false,
    };
  },
  watch: {
    model: function (newVal) {
      console.log(newVal);
      if (this.model !== "") {
        this.$router.replace({
          name: "category-page",
          params: { slug: newVal.slug },
        });
      }
    },
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const search = ref("");
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    const options = ref([]);
    const stringOptions = ref([]);
    return {
      fabYoutube,
      leftDrawerOpen,
      search,
      options,
      stringOptions,
      toggleLeftDrawer,
      filterFn(val, update) {
        console.log(val);
        if (val === "") {
          update(() => {
            // console.log(options);
            // console.log(stringOptions);
            options.value = stringOptions.value;
            // here you have access to "ref" which
            // is the Vue reference of the QSelect
          });
          return;
        }

        update(() => {
          const needle = val.toLowerCase();
          options.value = stringOptions.value.filter(
            (v) => v.name.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },

  created() {
    this.getCategorys();
  },

  methods: {
    search() {
      this.$router.replace({
        name: "search-page",
        params: { slug: this.searchinp },
      });
    },
    getCategorys() {
      this.$api
        .get(`categories`)
        .then((response) => {
          this.categorys = response.data.data;
          this.stringOptions = response.data.data.map((obj) => ({
            ...obj,
            label: obj.name,
            value: obj.slug,
          }));
          console.log(response);
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
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
  white-space: nowrap;
}

.right > div {
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
  white-space: nowrap;
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
  margin-right: 1rem;
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
  padding: 0 0.5rem;
  margin-right: 0.5rem;
}

.bar .q-btn {
  color: #000;
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

// sub header
.sub_header_wrap .all,
.allCat {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  text-transform: capitalize;
  color: #000000 !important;
}

.category_items {
  display: flex;
  align-items: center;
  overflow-x: scroll;
  height: 50px;
  cursor: pointer;
  scrollbar-width: none;
}

.category_items::-webkit-scrollbar {
  display: none;
}
.category_items .item {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  white-space: nowrap;
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
  padding: 0 1.5rem;
  justify-content: center;
}

.active {
  color: #ee4e36 !important;
  font-weight: 700 !important;
}

@media (min-width: 500px) {
  .allCat {
    display: none;
  }
}
@media (max-width: 500px) {
  .sub_header_wrap .all {
    display: none;
  }
}
@media (max-width: 1000px) {
  .bar {
    width: 50% !important;
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
  .bar {
    width: 100%;
  }

  .bar .input_wrap {
    display: none;
  }
  .mybtn {
    width: 160px;
  }

  // .category_items {
  //   display: none;
  // }
  .sub_header_wrap {
    padding: 0 1rem;
    gap: 0;
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
    // margin-bottom: 0.3rem;
  }
  .nav {
    padding: 0.7rem 0.6rem;
  }

  .right .q-btn span.q-btn__content {
    flex-wrap: nowrap;
  }
}
</style>
