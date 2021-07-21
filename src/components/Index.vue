<template>
  <b-container>
    <b-row>
      INDEX
    </b-row>
    <b-row>
      <router-link v-bind:to="{name: 'products'}">
        <Button>Zobacz wszystkie produkty</Button>
      </router-link>
    </b-row>
  </b-container>
</template>

<script>

import Button from "@/components/BaseButton"

export default {
  name: "Index",
  components: {
    Button
  }
}
</script>

<style scoped lang="scss">

</style>