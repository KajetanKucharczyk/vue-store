<template>
  <b-container>
    <b-row>
      INDEX
    </b-row>
    <b-row>
      <router-link v-bind:to="{name: 'products'}">
        <BaseButton>Zobacz wszystkie produkty</BaseButton>
      </router-link>
    </b-row>
  </b-container>
</template>

<script>

import BaseButton from "@/components/BaseButton"

export default {
  name: "Index",
  components: {
    BaseButton
  }
}
</script>

<style scoped lang="scss">

</style>