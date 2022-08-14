<template>
  <main class="container">
    <div class="main-wrapper">
      <slot></slot>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Main",
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../sass/globals.scss";
@import "../sass/partials/variables.scss";
.container {
  // @extend .container;
  width: 70%;
  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0px 15px;
  }
}

.main-wrapper {
  @extend .f-column;
  padding-top: 5px;
  p {
    font-weight: $semiBold;
  }
}
</style>
