import {mapState} from "vuex";

export default {
    methods: {
        addtoCart: function(productId) {
            this.$store.commit('ADD_TO_CART', productId)
        },

        removeFromCart: function (productId) {
            this.$store.commit('REMOVE_FROM_CART', productId)
        },

        canAddToCart: function(product) {
            return this.cart.filter(cartElement => cartElement === product.id).length < product.availableQuantity
        },

        availableItems: function(product) {
            return product.availableQuantity - this.cart.filter(cartElement => cartElement === product.id).length
        }
    },
    computed: {
        ...mapState({
            cart: (state) => state.cart.cart,
            cartLength: (state) => state.cart.cart.length,
        })
    }
}