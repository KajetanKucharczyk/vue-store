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
        <component v-bind:is="routeComponent"></component>
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
      let component;
      switch(this.$route.name) {
        case 'home':
          component = Index
          break
        case 'products':
          component = ProductList
          break;
        case 'product':
          component = ProductDetails
          break;
        case 'cart':
          component = Cart
          break;
        case 'form':
          component = Form
          break;
        default:
          component = Error
          break;
      }

      return component
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
