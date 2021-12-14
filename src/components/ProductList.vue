<template>
  <b-container>
    <BasePaginator
        v-bind="{component, sortDefault, sort}"
        v-bind:sourceItems="allProductsAvailable"
    />
  </b-container>
</template>

<script>
import BasePaginator from "@/components/base/BasePaginator";

import products from "@/mixins/products";

export default {
  name: "ProductList",
  mixins: [products],
  data() {
    return {
      component: "Product",
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
        },
        {
          field: 'price',
          textAsc: 'Ceny rosnąco',
          textDesc: 'Ceny malejąco'
        }
      ]
    }
  },
  components: {
    BasePaginator,
  },
  methods: {}
}
</script>

<style scoped lang="scss">

</style>