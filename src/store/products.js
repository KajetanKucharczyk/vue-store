const GET_PRODUCTS = 'GET_PRODUCTS'

export default {
    state: {
        products: []
    },
    getters: {

    },
    mutations: {
        [GET_PRODUCTS]: (state, products) => state.products = products,
    },
    actions: {
        getProducts: ({commit}, products) => commit(GET_PRODUCTS, products),
    }
}