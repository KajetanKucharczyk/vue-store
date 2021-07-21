<template>
  <section class="section error-404">
    <b-container>
      <b-row>
        <h1 class="error-404__name">ERROR 404</h1>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  name: "Error"
}
</script>

<style scoped lang="scss">
  .error-404 {
    height: calc(100vh - 150px);

    &__name {
      margin: 250px 0px;
    }
  }
</style>