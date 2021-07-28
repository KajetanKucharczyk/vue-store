<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta && to.meta.title || 'Some Default Title'
      }
    },
  }
}
</script>

<style lang="scss">

</style>
