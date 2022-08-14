<template>
  <aside class="aside-container">
    <div class="aside-wrapper">
      <p>Buildings</p>
      <LoadingIndicator v-if="loading" />
      <span v-else-if="buildings && !buildings.length" class="error"
        >No buildings available. Add a building</span
      >
      <nav class="side-nav" v-else>
        <ul>
          <ListItem
            v-for="{ name, id, userId } in buildings"
            :key="id"
            :id="id"
            :userId="userId"
            :name="name"
          />
        </ul>
      </nav>
    </div>
    <Button @click="addBuilding" :customClass="'mb-20'">Add Building</Button>
  </aside>
</template>

<script lang="ts">
import router from "@/router";
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";
import Button from "./Button.vue";
import ListItem from "./ListItem.vue";
import LoadingIndicator from "./Loader.vue";

export default defineComponent({
  components: { Button, ListItem, LoadingIndicator },
  name: "Aside",
  setup() {
    const store = useStore();

    // onMounted(() => {
    //   // fetch all building
    //   store.dispatch("fetchDefaultBuilding");
    // });
    const addBuilding = () => {
      return router.push("/create");
    };
    return {
      addBuilding,
      // access a state in computed function
      buildings: computed(() => store.state.selectedUserBuildings.buildings),
      loading: computed(() => store.state.selectedUserBuildings.loading),
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../sass/globals.scss";
.aside-container {
  height: 100%;
  padding: 10px 26px;
  overflow: auto;
  flex-shrink: 0;
  width: 20%;
  & .side-nav {
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    ul {
      list-style: none;
      padding: 0;
    }
  }
  @extend .f-v-split;
  border-right: 1px solid $border-color;
  @media screen and (max-width: 480px) {
    width: 35%;
    padding: 4px 10px;
    font-size: 0.8rem;
    li {
      font-size: 0.8rem;
    }
  }

  @media (min-width: 480px) and (max-width: 768px) {
    width: 25%;
    padding: 4px 10px;
  }
}

.mb-20 {
  margin-bottom: 10px;
}

.error {
  @extend .f-l-main;
}
</style>
