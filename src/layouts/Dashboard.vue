<template>
  <q-layout view="hHh lpR fFf" class="bg-accent">
    <q-header class="header q-py-xs" height-hint="58">
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        /> -->

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
          <q-btn class="btn">
            Create Advert <i class="fa-solid q-ml-md fa-plus"></i
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
      :width="206"
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
          </q-item>

          <q-separator class="q-my-md" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { fabYoutube } from "@quasar/extras/fontawesome-v6";
export default {
  name: "MyLayout",
  setup() {
    const leftDrawerOpen = ref(false);
    const search = ref("");
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    return {
      fabYoutube,
      leftDrawerOpen,
      search,
      toggleLeftDrawer,
      links1: [
        { icon: "home", text: "Overview", to: "dashboard" },
        { icon: "fa-solid fa-file", text: "My Adverts", to: "adverts" },
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
};
</script>

<style scoped lang="scss">
.header {
  background: #ffffff;
  border-bottom: 1px solid #dddddd;
}
.btn {
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

.btn::before {
  box-shadow: none;
}

.logo img {
  width: 152px;
}

.bar {
  width: 100%;
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
</style>
