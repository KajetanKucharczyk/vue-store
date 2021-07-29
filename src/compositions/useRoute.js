export default function (routeName, props, {root}) {

    function route(navigateBack = false) {
        root.$router.push({name: routeName}).catch(() => {
            if(navigateBack) {
                root.$router.back()
                return null
            } else {
                return null
            }
        })
    }
    function routeBack() {
        root.$router.back()
    }

    return {
        route,
        routeBack
    }
}
