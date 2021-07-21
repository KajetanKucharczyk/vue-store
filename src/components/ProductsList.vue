<template>
  <b-container>
    <Paginator
        v-bind:component="component"
        v-bind:sourceItems="products"
        v-bind:navigate="navigate"
        v-bind:fallback="_setCurrentProduct"
        v-bind:sortDefault="sortDefault"
        v-bind:sort="sort"
    />
  </b-container>
</template>

<script>
import Paginator from "@/components/Paginator";

export default {
  name: "ProductsList",
  props: ['products', 'navigate', 'setCurrentProduct'],
  data() {
    return {
      component: "ProductPreview",
      sortDefault: 'name-asc',
      sort: [
        {
          field: 'id',
          textAsc: 'Indeks rosnąco',
          textDesc: 'Indeks malejąco'
        },
        {
          field: 'name',
          textAsc: 'Alfabetycznie rosnąco',
          textDesc: 'Alfabetycznie malejąco'
        }
      ]
    }
  },
  components: {
    Paginator,
  },
  methods: {
    _setCurrentProduct: function(product) {
      this.setCurrentProduct(product)
    }
  }
}
</script>

<style scoped lang="scss">

</style>