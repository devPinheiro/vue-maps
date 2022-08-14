<template>
  <button class="button" :class="customClass" :disabled="disabled" :type="type">
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  props: {
    customClass: {
      type: String,
    },
    isLoading: {
      type: Boolean,
    },
    disabled: Boolean,
    type: {
      type: String,
      default: "button",
    },
  },
};
</script>

<style scoped lang="scss">
@import "../sass/partials/variables";
.disabled {
  width: 7.625rem;
  height: 2.5rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: not-allowed;
  opacity: 0.8;
}

.button {
  padding: 8px 20px;
  font-size: 1rem;
  font-weight: 600;
  line-height: 20px;
  justify-content: center;
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
  background: $theme-bg-color;
  border-radius: $radius;
  color: $white;
}
</style>
