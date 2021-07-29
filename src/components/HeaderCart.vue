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
import useRoute from "@/compositions/useRoute";
import useCart from "@/compositions/useCart";

export default {
  name: "HeaderCart",
  setup(props, context) {
    const routeCart = useRoute('cart', props, context)
    const {cartQuantity } = useCart()
    return {
      routeCart,
      cartQuantity
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