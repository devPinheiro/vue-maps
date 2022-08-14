<template>
  <Main>
    <p>Selected Building ({{ building?.name }}) MapView</p>
    <LoadingIndicator v-if="loading" />
    <span v-else-if="!building" class="error"
      >No buildings available. Add a building</span
    >
    <GoogleMapLoader
      :api-key="''"
      :lat="building?.position['0']"
      :lng="building?.position['1']"
      :building="building?.name"
      :country="building?.countryName"
      v-else
    />
  </Main>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import Main from "@/components/Main.vue";
import GoogleMapLoader from "@/components/GoogleMapLoader.vue";
import LoadingIndicator from "@/components/Loader.vue";

export default defineComponent({
  name: "Home",
  components: { Main, GoogleMapLoader, LoadingIndicator },
  setup() {
    const store = useStore();
    return {
      building: computed(() => store.state.selectedUserBuilding.building),
      loading: computed(() => store.state.selectedUserBuilding.loading),
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../sass/globals.scss";

.home {
  width: 100%;
  @extend .flex;
  @extend .h-100;
}
.error {
  @extend .f-l-main;
}
</style>
