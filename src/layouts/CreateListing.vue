<template>
  <q-layout view="hHh lpR fFf" class="">
    <q-header class="header q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn to="/" flat no-caps no-wrap class="q-ml-xs logo">
          <img src="/images/logored.png" alt="" />
        </q-btn>

        <q-space />

        <div
          style="width: 100%; gap: 1.5rem"
          class="header_icons justify-end row items-center no-wrap"
        >
          <q-btn
            :to="{ name: 'business.dashboard' }"
            flat
            no-caps
            text-color="primary"
            no-wrap
            style="padding: 5px"
            icon="fa-solid fa-house"
          />
          <div style="gap: 0.7rem" class="le flex no-wrap items-center">
            <q-btn class="" style="min-height: auto; padding: 3px" no-caps flat>
              <img class="ava" src="/images/usersvg.svg" />
              <q-menu class="headermenu">
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
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
export default {
  name: "MyLayout",
  data() {
    return {};
  },

  methods: {},
};
</script>

<style scoped lang="scss">
.header {
  background: #ffffff;
  border-bottom: 1px solid #dddddd;
}

.mybtn::before {
  box-shadow: none;
}

.logo img {
  width: 152px;
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

.avater_side {
  min-width: 0;
}
</style>
