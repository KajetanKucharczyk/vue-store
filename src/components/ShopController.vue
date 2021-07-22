<template>
  <div id="app">

    <main>
      <BaseHeader
          v-bind:siteName="siteName"
          v-bind:cart="cart"
      />
    </main>

    <main v-if="getRoute === 'index'">
      <Index />
    </main>

    <main v-else-if="getRoute === 'products-index'">
      <ProductList
          v-bind:products="products"
          v-bind:setCurrentProduct="setCurrentProduct"
      />
    </main>

    <main v-else-if="getRoute === 'products-details'">
      <ProductDetails
          v-bind:products="products"
          v-bind:addToCart="addtoCart"
          v-bind:canAddToCart="canAddToCart"
          v-bind:availableItems="availableItems"
      />
    </main>

    <main v-else-if="getRoute === 'cart-index'">
      <Cart
          v-bind:removeFromCart="removeFromCart"
          v-bind:products="products"
          v-bind:cart="cart"
      />
    </main>

    <main v-else-if="getRoute === 'form'">
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
      currentProduct: null,
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
    canAddToCart: function(product) {
      return this.cart.filter(cartElement => cartElement === product.id).length < product.availableQuantity
    },
    availableItems: function(product) {
      return product.availableQuantity - this.cart.filter(cartElement => cartElement === product.id).length
    },
    setCurrentProduct: function(product) {
      this.currentProduct = product.id
    },
    removeFromCart: function (productId) {
      this.cart = this.cart.filter(el => el !== productId)
    },
  },
  computed: {
    getRoute: function() {
      return this.route
    }
  },
  created() {
    // pobranie zawartości z pliku JSON lub z obiektu localStorage
    if(window.localStorage.getItem('products'))
      this.products = JSON.parse(window.localStorage.getItem('products'))
    else
      fetch("./products.json")
          .then(response => response.json())
          .then(data => {
            localStorage.setItem('products', JSON.stringify(data.products))
            this.products = data.products
          });
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
