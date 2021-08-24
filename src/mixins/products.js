import {mapState} from "vuex";

export default {
    methods: {
        getProducts() {
            if(window.localStorage.getItem('products'))
                this.$store.commit('GET_PRODUCTS', JSON.parse(window.localStorage.getItem('products')))
            else
                fetch("./products.json")
                    .then(response => response.json())
                    .then(data => {
                        localStorage.setItem('products', JSON.stringify(data.products))
                        this.$store.commit('GET_PRODUCTS', data.products)
                    })
        },
    },
    computed: {
        ...mapState({
            allProducts: (state) => state.products.products,
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