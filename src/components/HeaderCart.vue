<template>
  <div>
    <div
        class="cart"
        v-if="!cartQuantity"
        v-on:click="route('cart', true)"
    >
      Koszyk pusty
    </div>
    <div
        class="cart"
        v-else
        v-on:click="route('cart', true)"
    >
      W koszyku: {{cartQuantity}}
    </div>
  </div>
</template>

<script>

import router from "@/mixins/router";

export default {
  name: "HeaderCart",
  mixins:[router],
  props: {
    cartQuantity: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped lang="scss">

  .cart {
    border-radius: 5px;
    background-color: white;
    width: 200px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

</style>