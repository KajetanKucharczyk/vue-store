<template>
  <div>
    <div
        class="cart"
        v-if="!cartQuantity"
        v-on:click="routeCart.route(true)"
    >
      Koszyk pusty
    </div>
    <div
        class="cart"
        v-else
        v-on:click="routeCart.route(true)"
    >
      W koszyku: {{cartQuantity}}
    </div>
  </div>
</template>

<script>
import cart from "@/mixins/cart";
import useRoute from "@/compositions/useRoute";

export default {
  name: "HeaderCart",
  mixins:[cart],
  setup(props, context) {
    const routeCart = useRoute('cart', props, context)
    return {
      routeCart
    }
  },
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