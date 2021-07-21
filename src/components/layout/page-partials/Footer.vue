<template>
  <section class="section footer">
    <b-container>
      <b-row>
        <b-col cols="12" md="4">
          PRZYKŁADOWY FOOTER
        </b-col>
        <b-col cols="12" md="8">
          JAKAŚ TREŚĆ
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped lang="scss">
  .footer {
    background-color: $dark-color;
    color: $light-color;
    padding: 50px 0px;
  }
</style>