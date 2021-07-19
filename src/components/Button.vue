<template>
  <div>
    <button v-if="_updateVisible" v-on:click="_clickFunction" v-on:submit="_submitFunction" class="button border-radius background-base color-light d-flex justify-content-center align-items-center shadow">
      <slot></slot>
    </button>
    <button v-else class="button border-radius background-base color-light d-flex justify-content-center align-items-center disabled">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: ['updateVisible', 'clickFunction', 'submitFunction'],
  methods: {
    _submitFunction: function() {
      this._validateFunction(this.submitFunction, false)
    },
    _clickFunction: function() {
      this._validateFunction(this.clickFunction, false)
    },
    _validateFunction: function(fn, _return = true) {
      if(_return) {
        if(typeof fn === 'function')
          return fn()
        else
          return true
      } else {
        if(typeof fn === 'function')
          fn()
      }
    }
  },
  computed: {
    _updateVisible: function() {
      return this._validateFunction(this.updateVisible)
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

    &.disabled {
      cursor: not-allowed;
    }
  }

</style>