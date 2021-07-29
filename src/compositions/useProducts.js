import {ref, computed} from "@vue/composition-api";

export default function (props, {root}) {

    const products = ref([]);
    async function getProducts() {
        if(window.localStorage.getItem('products'))
            products.value = JSON.parse(window.localStorage.getItem('products'))
        else
            await fetch("./products.json")
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('products', JSON.stringify(data.products))
                    products.value = data.products
                })
    }
    getProducts();

    const product = computed(() => products.value.find(el => el.id === parseInt(root.$route.params.id)))

    return {
        products,
        product
    }
}