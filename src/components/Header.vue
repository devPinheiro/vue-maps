<template>
  <header id="nav">
    <label for="select">Choose Builder</label>
    <select name="Select" v-model="selected" @change="setUser">
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ user.username }}
      </option>
    </select>
  </header>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent, computed, ref, onMounted, watch } from "vue";

export default defineComponent({
  name: "Header",
  setup() {
    const store = useStore();
    const selected = ref(0);
    onMounted(() => {
      store.commit("setSelectedUserId", selected.value);
      // fetch default building
      store.dispatch("fetchDefaultBuilding");
      store.dispatch("fetchAllBuilding", selected.value);
    });
    watch(selected, () => {
      store.dispatch("fetchAllBuilding", selected.value);
      store.dispatch("fetchDefaultBuilding");
    });
    const setUser = () => {
      // store.dispatch("fetchAllBuilding", selected.value);
      store.commit("setSelectedUserId", selected.value);
      // fetch default building
      // setTimeout(() => {
      //   store.dispatch("fetchDefaultBuilding");
      // }, 1000);
    };
    return {
      // access a state in computed function
      users: computed(() => store.state.users),
      setUser,
      selected,
    };
  },
});
</script>

<style lang="scss">
@import "../sass/globals.scss";

#nav {
  width: 100%;
  @extend .f-center;
  flex-shrink: 0;
  height: 58px;
  border-bottom: 1px solid $border-color;
  padding: 0 30px;
  white-space: nowrap;
  @media screen and (max-width: 480px) {
    padding: 0 16px;
  }
  & select {
    border: 1px solid $border-color;
    background: $theme-bg-color;
    color: $white;
    padding: 3px 4px;
    border-radius: $radius;
    margin-left: 5px;
  }
}
</style>
