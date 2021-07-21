<template>
  <div id="app">

    <header>
      <Header
          v-bind:siteName="siteName"
          v-bind:cart="cart"
      />
    </header>

    <main v-if="getRoute === 'index'">
      <Index />
    </main>

    <main v-else-if="getRoute === 'products-index'">
      <ProductsList
          v-bind:products="products"
          v-bind:setCurrentProduct="setCurrentProduct"
      />
    </main>

    <main v-else-if="getRoute === 'products-details'">
      <Product
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
      <PageNotFound />
    </main>

    <footer>
      <Footer />
    </footer>

  </div>
</template>

<script>
import Product from '@/components/layout/pages/Product.vue'
import Header from '@/components/layout/page-partials/Header.vue'
import Cart from '@/components/layout/pages/Cart.vue'
import Form from "@/components/layout/pages/Form"
import ProductsList from "@/components/layout/pages/ProductsList";
import Footer from "@/components/layout/page-partials/Footer"
import Index from "@/components/layout/pages/Index"
import PageNotFound from "@/components/layout/pages/PageNotFound"

export default {
  name: 'ShopController',
  components: {
    Header,
    Footer,
    ProductsList,
    Product,
    Cart,
    Form,
    Index,
    PageNotFound
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
