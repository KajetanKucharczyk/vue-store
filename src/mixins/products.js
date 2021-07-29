export default {
    methods: {
        getProducts() {
            if(window.localStorage.getItem('products'))
                this.products = JSON.parse(window.localStorage.getItem('products'))
            else
                fetch("./products.json")
                    .then(response => response.json())
                    .then(data => {
                        localStorage.setItem('products', JSON.stringify(data.products))
                        this.products = data.products
                    })
        }
    },
    computed: {
        product: function() {
            return this.products.find(el => el.id === parseInt(this.$route.params.id))
        },
    },
    created() {
        this.getProducts()
    }
}