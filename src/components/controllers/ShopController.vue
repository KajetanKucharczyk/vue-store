<template>
  <div id="app">
    <BaseLayout>
      <template v-slot:content>
        <main>
          <component v-bind:is="routeComponent.component" v-bind="routeComponent.params"></component>
        </main>
      </template>
    </BaseLayout>
  </div>
</template>

<script>

import BaseLayout from '@/components/base/BaseLayout.vue'

const ProductDetails  = () => import("@/components/ProductDetails")
const Cart            = () => import("@/components/Cart")
const Form            = () => import("@/components/Form")
const ProductList     = () => import("@/components/ProductList")
const Index           = () => import("@/components/Index")
const Error           = () => import("@/components/Error")

export default {
  name: 'ShopController',
  components: {
    BaseLayout,
  },
  props: {
    route: {
      type: String,
      default: () => "index"
    }
  },
  computed: {
    routeComponent: function() {
      let componentData;
      switch(this.$route.name) {
        case 'home':
          componentData = {
            component: Index,
            params: {}
          }
          break
        case 'products':
          componentData = {
            component: ProductList,
            params: {}
          }
          break;
        case 'product':
          componentData = {
            component: ProductDetails,
            params: {}
          }
          break;
        case 'cart':
          componentData = {
            component: Cart,
            params: {}
          }
          break;
        case 'form':
          componentData = {
            component: Form,
            params: {}
          }
          break;
        default:
          componentData = {
            component: Error,
            params: {}
          }
          break;
      }

      return componentData
    }
  }
}
</script>

<style lang="scss">
#app {
  position: relative;

  header {
    position: sticky;
    top:0px;
    z-index: 1;
  }
}
</style>
