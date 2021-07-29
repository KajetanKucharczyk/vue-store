<template>
  <div class="header background-base">
    <div
        class="name color-light"
        v-on:click="route('home')"
    >
      <slot name="siteName"></slot>
    </div>

    <HeaderCart />

  </div>
</template>

<script>

import HeaderCart from "@/components/HeaderCart";

import router from "@/mixins/router";

export default {
  name: "BaseHeader",
  mixins: [router],
  components: {
    HeaderCart
  },
  props: {
    siteName: {
      type: String
    },
  },
}
</script>

<style scoped lang="scss">
  .header {
    width: 100%;
    height: 75px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-evenly;

    .name {
      font-weight: bold;
      font-size: 30px;
      cursor: pointer;
    }
  }
</style>