const ADD_TO_CART       = 'ADD_TO_CART'
const REMOVE_FROM_CART  = 'REMOVE_FROM_CART'

export default {
    state: {
        cart: []
    },
    getters: {
        getCart: state => state.cart,
    },
    mutations: {
        [ADD_TO_CART]:        (state, productId) => state.cart.push(productId),
        [REMOVE_FROM_CART]:   (state, productId) => state.cart = state.cart.filter(el => el !== productId)
    },
    actions: {
        addToCart:          ({commit}, productId) => commit(ADD_TO_CART, productId),
        removeFromCart:     ({commit}, productId) => commit(REMOVE_FROM_CART, productId),
    }
}