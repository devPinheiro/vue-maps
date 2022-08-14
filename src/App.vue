<template>
  <div class="app">
    <Header />
    <div class="wrapper">
      <Aside />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import Header from "@/components/Header.vue";
import { useStore } from "./store";
import Aside from "./components/Aside.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    Header,
    Aside,
  },
  setup() {
    const store = useStore();
    onBeforeMount(() => store.commit("initialiseStore"));
  },
});
</script>

<style lang="scss">
@import "./sass/globals.scss";

.wrapper {
  width: 100%;
  @extend .flex;
  @extend .h-100;
}
.app {
  background-color: $theme-bg-color;
  max-width: 1250px;
  max-height: 860px;
  margin: 30px auto;
  height: 90vh;
  overflow: auto;
  position: relative;
  border-radius: 14px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  font-size: 15px;
  font-weight: $medium;
  @extend .f-page;
  @media screen and (max-width: 480px) {
    width: 480px;
  }

  .map-info {
    color: $black;
  }
}
</style>
