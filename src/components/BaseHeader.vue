<template>
  <div class="header background-base">
    <div
        class="name color-light"
        v-on:click="routeHome.route('home')"
    >
      <slot name="siteName"></slot>
    </div>

    <HeaderCart />

  </div>
</template>

<script>

import HeaderCart from "@/components/HeaderCart";

import useRoute from "@/compositions/useRoute";

export default {
  name: "BaseHeader",
  components: {
    HeaderCart
  },
  setup(props, context) {
    const routeHome = useRoute('home', props, context)
    return {
      routeHome
    }
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