export default {
    methods: {
        getCart: function() {
            return this.$store.getters.getCart
        },

        addtoCart: function(productId) {
            this.$store.commit('ADD_TO_CART', productId)
        },

        removeFromCart: function (productId) {
            this.$store.commit('REMOVE_FROM_CART', productId)
        },

        canAddToCart: function(product) {
            return this.$store.getters.getCart.filter(cartElement => cartElement === product.id).length < product.availableQuantity
        },

        availableItems: function(product) {
            return product.availableQuantity - this.$store.getters.getCart.filter(cartElement => cartElement === product.id).length
        }
    },
    computed: {
        cartQuantity: function() {
            return this.$store.getters.getCart.length
        }
    }
}