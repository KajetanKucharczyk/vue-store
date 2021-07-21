<template>
  <div>
    <button
        v-if="updateVisible"
        v-on:click="clickFunction"
        v-on:submit="submitFunction"
        class="button border-radius background-base color-light d-flex justify-content-center align-items-center shadow"
    >
      <slot></slot>
    </button>
    <button
        v-else
        class="button border-radius background-base color-light d-flex justify-content-center align-items-center disabled"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    updateVisible: {
      type: Function,
      default: () => false
    },
    clickFunction: {
      type: Function,
      default: () => false
    },
    submitFunction: {
      type: Function,
      default: () => false
    },
  }
}
</script>

<style scoped lang="scss">

  .button {
    position: sticky;
    bottom: 20px;
    width: 50%;
    margin-left: 25%;
    height: 50px;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 20px;
    cursor: pointer;
    border: 0px;

    &.disabled {
      cursor: not-allowed;
    }
  }

</style>