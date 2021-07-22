import ShopController from "@/components/ShopController";

const routes = [
    {
        path: '/',
        name: 'home',
        component: ShopController,
        props: {
            route: "index"
        },
        meta: {
            title: "Strona główna"
        }
    },
    {
        path: '/produkty',
        name: 'products',
        component: ShopController,
        props: {
            route: "products-index"
        },
        meta: {
            title: "Produkty"
        }
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
        meta: {
            title: "Koszyk"
        }
    },
    {
        path: '/koszyk/formularz',
        name: 'form',
        component: ShopController,
        props: {
            route: "form-index"
        },
        meta: {
            title: "Formularz zamówienia"
        }
    },
    {
        path: "*",
        component: ShopController,
        name: '404',
        props: {
            route: "error-404"
        },
        meta: {
            title: "Error 404"
        }
    }
]

export default routes