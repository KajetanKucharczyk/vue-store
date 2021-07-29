import {ref, computed} from "@vue/composition-api";

export default function () {

    const cart = ref([])

    function getCart() {
        if(window.localStorage.getItem('cart'))
            cart.value = JSON.parse(window.localStorage.getItem('cart'))
        else
            cart.value = []
        return cart.value
    }

    getCart()

    function setCart() {
        localStorage.setItem('cart', JSON.stringify(cart.value))
    }

    function addtoCart(productId) {
        cart.value.push(productId)
        setCart()
    }

    function removeFromCart(productId) {
        cart.value = cart.value.filter(el => el !== productId)
        setCart()
    }

    function canAddToCart(product) {
        return cart.value.filter(cartElement => cartElement === product.id).length < product.availableQuantity
    }

    function availableItems(product) {
        return product.availableQuantity - cart.value.filter(cartElement => cartElement === product.id).length
    }

    const cartQuantity = computed(() => cart.value.length)

    return {
        cartQuantity,
        getCart,
        setCart,
        addtoCart,
        removeFromCart,
        canAddToCart,
        availableItems
    }
}