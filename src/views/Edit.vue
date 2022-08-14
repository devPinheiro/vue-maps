<template>
  <Main>
    <p>Add/Edit Building</p>
    <form @submit.prevent="updateBuilding" class="form_container">
      <InputTextField
        :label="'Name'"
        :modelValue="building?.buildingName"
        @update:modelValue="({ value }) => (building.buildingName = value)"
        :placeholder="'e.g., Alpha 1'"
      />
      <Select
        :options="countries"
        :label="'Location'"
        @selected="(e: ICountry) => (building.country = e)"
        :placeholder="building?.country?.name"
      />

      <div class="button-group">
        <Button @click="goBack">Cancel</Button>
        <Button :type="'submit'">{{
          loading ? "Loading..." : "Update"
        }}</Button>
      </div>
    </form>
  </Main>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from "vue";
import InputTextField from "@/components/InputTextField.vue";
import Select from "@/components/Select.vue";
import Main from "@/components/Main.vue";
import Button from "@/components/Button.vue";
import { countries } from "@/utils/countries";
import router from "@/router";
import { ICountry, store } from "@/store";

export default defineComponent({
  name: "Edit",
  props: ["id"],
  setup(props: { id: number }) {
    const building = reactive({
      country: {
        id: "",
        position: [0],
        name: "",
      },
      buildingName: "",
      userId: 0,
    });

    const getBuilding = () => {
      // access a state in computed function
      const fetchedBuilding = computed(
        () => store.state.selectedUserBuilding.building
      );

      if (fetchedBuilding.value) {
        building.country.name = fetchedBuilding?.value?.countryName;
        building.buildingName = fetchedBuilding?.value?.name;
        building.country.id = fetchedBuilding?.value?.id;
        building.country.position = fetchedBuilding?.value?.position;
        building.userId = fetchedBuilding?.value?.userId;
      }
    };

    const goBack = () => {
      return router.back();
    };

    // update existing building
    const updateBuilding = async () => {
      try {
        await store.dispatch("updateBuilding", {
          name: building.buildingName,
          countryName: building?.country?.name,
          position: building?.country?.position,
          id: `${building?.country?.id}-${Date.now()}`,
          userId: building?.userId,
        });

        router.back();
      } catch (error) {
        window.alert(error);
      }
    };

    onMounted(() => {
      if (props.id) {
        store.dispatch("fetchBuilding", props.id);
        getBuilding();
      } else {
        window.alert("Something went wrong");
        router.back();
      }
    });
    return {
      countries,
      goBack,
      updateBuilding,
      building,
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
