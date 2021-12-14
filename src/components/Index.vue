<template>
  <b-container>
    <b-row>
      <h1>
        Wyróżnione produkty
      </h1>
    </b-row>
    <b-row>
      <BasePaginator
          v-bind="{component, sortDefault, disablePerPage}"
          v-bind:sourceItems="highlightProducts"
      />
    </b-row>
    <b-row>
      <router-link v-bind:to="{name: 'products'}">
        <BaseButton>Zobacz wszystkie produkty</BaseButton>
      </router-link>
    </b-row>
  </b-container>
</template>

<script>

import BaseButton from "@/components/base/BaseButton"
import BasePaginator from "@/components/base/BasePaginator";
import products from "@/mixins/products";

export default {
  name: "Index",
  mixins: [products],
  data() {
    return {
      component: "Product",
      sortDefault: 'name-asc',
      disablePerPage: true
    }
  },
  components: {
    BaseButton,
    BasePaginator
  }
}
</script>

<style scoped lang="scss">

</style>