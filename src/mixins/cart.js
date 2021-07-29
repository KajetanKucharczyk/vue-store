export default {
    data() {
        return {
            cart: []
        }
    },
    methods: {
        getCart: function() {
            if(window.localStorage.getItem('cart'))
                this.cart = JSON.parse(window.localStorage.getItem('cart'))
            else
                this.cart = []
        },

        setCart: function() {
            localStorage.setItem('cart', JSON.stringify(this.cart))
        },

        addtoCart: function(productId) {
            this.cart.push(productId)
            this.setCart()
        },

        removeFromCart: function (productId) {
            this.cart = this.cart.filter(el => el !== productId)
            this.setCart()
        },

        canAddToCart: function(product) {
            return this.cart.filter(cartElement => cartElement === product.id).length < product.availableQuantity
        },

        availableItems: function(product) {
            return product.availableQuantity - this.cart.filter(cartElement => cartElement === product.id).length
        }
    },
    computed: {
        cartQuantity: function() {
            return this.cart.length
        }
    },
    created() {
        this.getCart()
    }
}