<template>
  <b-container>
    <Paginator
        v-bind="{component, sortDefault, sort}"
        v-bind:sourceItems="products"
        v-bind:fallback="_setCurrentProduct"
    />
  </b-container>
</template>

<script>
import Paginator from "@/components/Paginator";

export default {
  name: "ProductsList",
  props: ['products', 'setCurrentProduct'],
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