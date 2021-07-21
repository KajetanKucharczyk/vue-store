<template>
  <div class="header background-base">
    <div class="name color-light" v-on:click="routeHome">
      {{siteName}}
    </div>

    <div class="cart" v-if="!cartQuantity" v-on:click="route">
      Koszyk pusty
    </div>
    <div class="cart" v-else v-on:click="route">
      W koszyku: {{cartQuantity}}
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseHeader",
  props: {
    siteName: {
      type: String
    },
    cart: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    cartQuantity: function() {
      return this.cart.length
    }
  },
  methods: {
    route: function() {
      this.$router.push({
        name: 'cart'
      });
    },
    routeHome: function() {
      this.$router.push({
        name: 'home'
      });
    }
  }
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
    .cart {
      border-radius: 5px;
      background-color: white;
      width: 200px;
      height: 75%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
</style>