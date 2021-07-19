<template>
  <div id="app">
    <header>
      <Header v-bind:siteName="siteName" v-bind:cart="cart" v-bind:navigate="navigate" />
    </header>
    <main v-if="this.route.currentRoute === 'products-index'">
      <ProductsList v-bind:products="products" v-bind:navigate="navigate" v-bind:setCurrentProduct="setCurrentProduct" />
    </main>
    <main v-else-if="this.route.currentRoute === 'products-details'">
      <Product v-bind:productData="getProduct" v-bind:addToCart="addtoCart" v-bind:canAddToCart="canAddToCart" v-bind:availableItems="availableItems" v-bind:navigate="navigate" />
    </main>
    <main v-else-if="this.route.currentRoute === 'cart-index'">
      <Cart v-bind:removeFromCart="removeFromCart" v-bind:products="products" v-bind:cart="cart" v-bind:navigate="navigate" />
    </main>
    <main v-else-if="this.route.currentRoute === 'form'">
      <Form v-bind:navigate="navigate" />
    </main>
    <main v-else>
      404
    </main>
    <footer>

    </footer>
  </div>

</template>

<script>
import Product from './components/Product.vue'
import Header from './components/Header.vue'
import Cart from './components/Cart.vue'
import Form from "@/components/Form"
import ProductsList from "@/components/ProductsList";

export default {
  name: 'App',
  components: {
    ProductsList,
    Product,
    Header,
    Cart,
    Form,
  },
  data () {
    return {
      products: [],
      currentProduct: null,
      siteName: "SKLEPik",
      cart: [],
      routes: ['products-index', 'products-details', 'cart-index'],
      route: {
        currentRoute: 'products-index',
        history: ['products-details']
      }
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
    navigate: function(type) {
      if(type === 'header') this.route.currentRoute = this.route.currentRoute === 'cart-index' ? this.route.history[this.route.history.length - 2] : 'cart-index';
      if(type === "back-to-product-list") this.route.currentRoute = 'products-index'
      if(type === "form") this.route.currentRoute = 'form'
      if(type === "home") this.route.currentRoute = 'products-index'
      if(type === "product") this.route.currentRoute = 'products-details'
      this.route.history.push(this.route.currentRoute)
    },
    setCurrentProduct: function(product) {
      this.currentProduct = product.id
    },
    removeFromCart: function (productId) {
      this.cart = this.cart.filter(el => el !== productId)
    },
  },
  computed: {
    getProduct: function() {
      return this.products.find(arrayElement => arrayElement.id === this.currentProduct)
    }
  },
  created() {
    fetch("./products.json")
        .then(response => response.json())
        .then(data => this.products = data.products);
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
