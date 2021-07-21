import Vue from 'vue'
import App from '@/App.vue'

import {BootstrapVue} from 'bootstrap-vue'
import VueRouter from 'vue-router'

Vue.use(BootstrapVue)
Vue.use(VueRouter)

import routes from "@/assets/routes/routes"

const router = new VueRouter({
  routes
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
