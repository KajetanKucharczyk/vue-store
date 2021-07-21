import ShopController from "@/components/ShopController";

const routes = [
    {
        path: '/',
        name: 'home',
        component: ShopController,
        props: {
            route: "index"
        },
    },
    {
        path: '/produkty',
        name: 'products',
        component: ShopController,
        props: {
            route: "products-index"
        },
    },
    {
        path: '/produkty/:id',
        name: 'product',
        component: ShopController,
        props: true
    },
    {
        path: '/koszyk',
        name: 'cart',
        component: ShopController,
        props: {
            route: "cart-index"
        },
    },
    {
        path: '/koszyk/formularz',
        name: 'form',
        component: ShopController,
        props: {
            route: "form-index"
        },
    },
    {
        path: "*",
        component: ShopController,
        name: '404',
        props: {
            route: "error-404"
        },
    }
]

export default routes