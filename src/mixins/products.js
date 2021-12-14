import {mapState} from "vuex";

export default {
    methods: {
        getProducts() {
            if(window.localStorage.getItem('products'))
                this.saveProducts(JSON.parse(window.localStorage.getItem('products')))
            else
                fetch("./products.json")
                    .then(response => response.json())
                    .then(data => {
                        localStorage.setItem('products', JSON.stringify(data.products))
                        this.saveProducts(data.products)
                    })
        },
        saveProducts(products) {
            this.$store.commit('GET_PRODUCTS', products)
        }
    },
    computed: {
        ...mapState({
            allProducts: (state) => state.products.products,
            allProductsAvailable: (state) => state.products.products.filter(product => product.availableQuantity > 0),
            currentProduct(state) {
                return state.products.products.find(el => el.id === parseInt(this.$route.params.id))
            },
            highlightProducts(state) {
                return state.products.products.filter(el => el.highlight)
            }
        }),

    },
    created() {
        this.getProducts()
    }
}