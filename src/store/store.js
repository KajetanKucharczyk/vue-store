import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex)

import cart from "@/store/cart"
import products from "@/store/products"

export default new Vuex.Store({
    modules: {
        cart,
        products
    }
})