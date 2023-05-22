<template>
  <OfflineVue />
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import OfflineVue from "./components/Offline.vue";
export default defineComponent({
  components: {
    OfflineVue,
  },
  name: "App",
  mounted() {
    let script = document.createElement("script");
    script.src = "/icons.js";
    document.head.append(script);
  },
});
</script>
