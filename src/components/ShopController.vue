<template>
  <div id="app">

    <main>
      <BaseHeader v-bind:cart="cart">
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

import methodEmitter from '@/methodEmitter/methodEmitter';

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
      products: [],
      siteName: "SKLEPik",
      cart: [],
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
            params: {
              products: this.products
            }
          }
          break;
        case 'product':
          componentData = {
            component: ProductDetails,
            params: {
              products: this.products,
              canAddToCart: this.canAddToCart,
              availableItems: this.availableItems
            }
          }
          break;
        case 'cart':
          componentData = {
            component: Cart,
            params: {
              products: this.products,
              cart: this.cart
            }
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
  },
  methods: {
    addtoCart: function(productId) {
      this.cart.push(productId)
      this.setCart()
    },

    getCart: function() {
      if(window.localStorage.getItem('cart'))
        this.cart = JSON.parse(window.localStorage.getItem('cart'))
      else
        this.cart = []
    },

    setCart: function() {
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },

    removeFromCart: function (productId) {
      this.cart = this.cart.filter(el => el !== productId)
    },

    canAddToCart: function(product) {
      return this.cart.filter(cartElement => cartElement === product.id).length < product.availableQuantity
    },

    availableItems: function(product) {
      return product.availableQuantity - this.cart.filter(cartElement => cartElement === product.id).length
    },

    getProducts: function() {
      if(window.localStorage.getItem('products'))
        this.products = JSON.parse(window.localStorage.getItem('products'))
      else
        fetch("./products.json")
            .then(response => response.json())
            .then(data => {
              localStorage.setItem('products', JSON.stringify(data.products))
              this.products = data.products
            })
    }
  },
  created() {
    // obsługa zdarzeń pomiędzy komponentami
    methodEmitter.$on('addtoCart', productId => {
      this.addtoCart(productId)
    });
    methodEmitter.$on('removeFromCart', productId => {
      this.removeFromCart(productId)
    });
    // pobranie produktów
    this.getProducts()
    // pobranie koszyka
    this.getCart()
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
