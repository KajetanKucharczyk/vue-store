<template>
  <div id="app">

    <main>
      <BaseHeader>
        <template v-slot:siteName>
          {{siteName}}
        </template>
      </BaseHeader>
    </main>

    <main>
        <component v-bind:is="routeComponent.component" v-bind="routeComponent.params"></component>
    </main>

    <footer>
      <BaseFooter />
    </footer>

  </div>
</template>

<script>

import BaseHeader from '@/components/BaseHeader.vue'
import BaseFooter from "@/components/BaseFooter"

const ProductDetails  = () => import("@/components/ProductDetails")
const Cart            = () => import("@/components/Cart")
const Form            = () => import("@/components/Form")
const ProductList     = () => import("@/components/ProductList")
const Index           = () => import("@/components/Index")
const Error           = () => import("@/components/Error")

export default {
  name: 'ShopController',
  components: {
    BaseHeader,
    BaseFooter,
  },
  data () {
    return {
      siteName: "SKLEPik",
      cart: [],
      products: {}
    }
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
