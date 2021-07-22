<template>
  <div>
    <button
        v-if="updateVisible"
        v-on:click="clickFunction"
        v-on:submit="submitFunction"
        class="button border-radius color-light d-flex justify-content-center align-items-center custom-shadow"
        v-bind:class="{
          default: buttonType === 'default',
          success: buttonType === 'success',
          danger: buttonType === 'danger',
          warning: buttonType === 'warning',
        }"
    >
      <slot></slot>
    </button>
    <button
        v-else
        class="button border-radius color-light d-flex justify-content-center align-items-center disabled"
        v-bind:class="{ buttonType: buttonType }"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'BaseButton',
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

    buttonType: {
      type: String,
      default: () => 'default',
      validator: function (value) {
        return ['default', 'success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
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
    text-decoration: none;
    transition: 0.2s transform ease-in-out, 0.2s box-shadow ease-in-out;

    &.default {
      background-color: $base-color;
    }

    &.success {
      background-color: $success-color;
    }

    &.danger {
      background-color: $danger-color;
    }

    &.warning {
      background-color: $warning-color;
    }

    &.disabled {
      cursor: not-allowed;
    }

    &:hover {
      transform: translate(-2px, -2px);
      box-shadow: $hover-shadow;
    }
  }

</style>