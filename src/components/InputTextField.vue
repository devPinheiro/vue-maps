<template>
  <div class="form-group">
    <label v-if="label" :for="id" class="label">
      {{ label }}
    </label>
    <input
      :class="`button ${customClass}`"
      :type="type"
      :value="modelValue"
      @input="updateInput"
      :placeholder="placeholder"
      :readonly="readonly"
      required
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    id: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    customClass: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  model: {
    prop: "value",
    event: "update",
  },

  setup(_, { emit }) {
    const updateInput = (event: Event) => {
      emit("update:modelValue", event?.target);
    };

    return {
      updateInput,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../sass/globals";

.form-group {
  @extend .f-split;
  margin: 10px 0;
  @media screen and (max-width: 480px) {
    align-items: flex-start;
    flex-direction: column;
  }
}
.label {
  color: $white;
  font-size: 14px;
}

input {
  box-sizing: border-box;
  height: 30px;
  border-radius: 3px;
  padding: 5px 10px;
  background: $theme-bg-color;
  color: $white;
  border: none;
}

input:focus {
  outline: none;
}
</style>
