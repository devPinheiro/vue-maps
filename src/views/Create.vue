<template>
  <Main>
    <p>Add/Edit Building</p>
    <form @submit.prevent="addBuilding" class="form_container">
      <InputTextField
        :label="'Name'"
        @update:modelValue="({ value }) => (buildingName = value)"
        :placeholder="'e.g., Alpha 1'"
      />
      <Select
        :options="countries"
        :label="'Location'"
        @selected="(value) => (selected = value)"
        :placeholder="'e.g., Nigeria'"
      />

      <div class="button-group">
        <Button @click="goBack">Cancel</Button>
        <Button :type="'submit'">{{
          loading ? "Loading..." : "Create"
        }}</Button>
      </div>
    </form>
  </Main>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import InputTextField from "@/components/InputTextField.vue";
import Select from "@/components/Select.vue";
import Main from "@/components/Main.vue";
import Button from "@/components/Button.vue";
import { countries } from "@/utils/countries";
import router from "@/router";
import { store } from "@/store";

export default defineComponent({
  name: "Create",
  setup() {
    const selected = ref(null);
    const buildingName = ref("");

    const goBack = () => {
      return router.back();
    };
    // access a state in computed function
    const userId = computed(() => store.state.selectedUserId);
    // create a new building
    const addBuilding = async () => {
      const building: any = Object.assign({}, selected.value);
      const location = Object.assign({}, building?.position);
      try {
        await store.dispatch("createBuilding", {
          name: buildingName.value,
          countryName: building && building.name,
          position: location,
          id: `${building.id}-${Date.now()}`,
          userId: userId.value,
        });

        router.back();
      } catch (error) {
        window.alert(error);
      }
    };

    return {
      countries,
      goBack,
      addBuilding,
      buildingName,
      selected,
      loading: computed(() => store.state.loading),
    };
  },
  components: { InputTextField, Select, Main, Button },
});
</script>

<style scoped lang="scss">
@import "../sass/globals.scss";
.form_container {
  @extend .f-column;
  width: 50%;
  margin: 30px 0 0 0;

  @media screen and (max-width: 480px) {
    width: 100%;
  }
}

.button-group {
  // @extend .flex;
  // @extend .align-self-end;
  position: absolute;
  bottom: 20px;
  right: 20px;
}
</style>
