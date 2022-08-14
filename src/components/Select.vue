<template>
  <InputTextField
    type="text"
    :modelValue="selectValue"
    :placeholder="placeholder"
    :readonly="true"
    @click="open"
    :id="id"
    :label="label"
    :customClass="'select'"
  />

  <transition name="show-select">
    <ul class="options" v-if="openOptions">
      <li v-for="item in options" :key="item" @click="setValue(item)">
        {{ item.name || item }}
      </li>
    </ul>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import InputTextField from "./InputTextField.vue";

export default defineComponent({
  components: { InputTextField },
  name: "Select",
  props: {
    options: Array as PropType<any>,
    placeholder: String as PropType<string>,
    label: String as PropType<string>,
    id: String as PropType<string>,
  },
  emits: ["selected"],
  data() {
    return {
      selectValue: "",
      openOptions: false,
    };
  },
  methods: {
    setValue(option: { value: string; name: string }) {
      const selected = option;
      this.openOptions = false;
      this.selectValue = option.name;
      this.$emit("selected", selected);
    },
    open() {
      this.openOptions = true;
    },
    close() {
      this.openOptions = false;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../sass/partials/variables";
@import "../sass/globals";

.select {
  position: relative;
  display: flex;
  min-width: 148px;
  input,
  input {
    border: $border;
    border-radius: 3px;
    height: 30px;
    padding: 5px 10px;
    background: $theme-bg-color;
  }

  @media screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 10px 0;
  }
}

ul.options {
  position: relative;
  top: 100%;
  right: 0px;
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 400px;
  overflow: scroll;
  background: $theme-bg-color;
  padding: 16px;
  line-height: 2.5;
  transform-origin: top;
  box-shadow: $elevation;
  z-index: 10;
}

ul.options li {
  cursor: pointer;
  list-style: none;
  color: $white;
}
.show-select-enter-active,
.show-select-leave-active {
  transition: all 0.3s ease;
}
.show-select-enter-from,
.show-select-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>
