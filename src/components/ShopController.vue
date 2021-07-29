<template>
  <div id="app">

    <main>
      <BaseHeader v-bind:cart="cart">
        <template v-slot:siteName>
          {{siteName}}
        </template>
      </BaseHeader>
    </main>

    <main v-if="getRoute('home')">
      <Index />
    </main>

    <main v-else-if="getRoute('products')">
      <ProductList
          v-bind:products="products"
      />
    </main>

    <main v-else-if="getRoute('product')">
      <ProductDetails
          v-bind:products="products"
          v-bind:canAddToCart="canAddToCart"
          v-bind:availableItems="availableItems"
      />
    </main>

    <main v-else-if="getRoute('cart')">
      <Cart
          v-bind:products="products"
          v-bind:cart="cart"
      />
    </main>

    <main v-else-if="getRoute('form')">
      <Form />
    </main>

    <main v-else>
      <Error />
    </main>

    <footer>
      <BaseFooter />
    </footer>

  </div>
</template>

<script>
import ProductDetails from '@/components/ProductDetails.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import Cart from '@/components/Cart.vue'
import Form from "@/components/Form"
import ProductList from "@/components/ProductList";
import BaseFooter from "@/components/BaseFooter"
import Index from "@/components/Index"
import Error from "@/components/Error"

import methodEmitter from '@/methodEmitter/methodEmitter';

export default {
  name: 'ShopController',
  components: {
    BaseHeader,
    BaseFooter,
    ProductList,
    ProductDetails,
    Cart,
    Form,
    Index,
    Error
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
  methods: {
    addtoCart: function(productId) {
      this.cart.push(productId)
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
    },

    getRoute: function(routeName) {
      return this.$route.name === routeName
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
