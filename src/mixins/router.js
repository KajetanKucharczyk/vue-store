export default {
    methods: {
        route(route, navigateBack = false) {
            this.$router.push({name: route}).catch(() => {
                if(navigateBack) {
                    this.$router.back()
                    return null
                } else {
                    return null
                }
            })
        },
        routeBack() {
            this.$router.back()
        }
    }
}