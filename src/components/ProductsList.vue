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
  },
  computed: {
    sortedProducts: function() {
      function compare(a, b) {
        if(a.name < b.name)
          return -1
        if(b.name < a.name)
          return 1
        return 0
      }
      if(this.products instanceof Array)
        return this.products.slice().sort(compare)
      else
        return []
    }
  }
}
</script>

<style scoped lang="scss">

</style>