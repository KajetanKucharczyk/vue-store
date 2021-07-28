<template>
  <b-container>
    <BasePaginator
        v-bind="{component, sortDefault, sort}"
        v-bind:sourceItems="products"
    />
  </b-container>
</template>

<script>
import BasePaginator from "@/components/BasePaginator";

export default {
  name: "ProductList",
  props: {
    products: {
      type: Array,
      required: true
    },
    setCurrentProduct: {
      type: Function,
      required: true
    }
  },
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