<template>
  <b-container>
    <Paginator v-bind:component="component" v-bind:sourceItems="products" v-bind:navigate="navigate" v-bind:fallback="_setCurrentProduct" />
  </b-container>
</template>

<script>
import Paginator from "@/components/Paginator";

export default {
  name: "ProductsList",
  props: ['products', 'navigate', 'setCurrentProduct'],
  data() {
    return {
      component: "ProductPreview"
    }
  },
  components: {
    Paginator,
  },
  methods: {
    routeProduct: function(product) {
      this._setCurrentProduct(product)
      this.navigate("product")
    },
    _setCurrentProduct: function(product) {
      this.setCurrentProduct(product)
    }
  }
}
</script>

<style scoped lang="scss">

</style>