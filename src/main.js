import Vue from 'vue'
import App from '@/App.vue'

import {BootstrapVue} from 'bootstrap-vue'
import Router from 'vue-router'
import VueCompositionAPI from '@vue/composition-api'


Vue.use(BootstrapVue)
Vue.use(Router)
Vue.use(VueCompositionAPI)

import routes from "@/routes/routes"

const router = new Router({
  mode: 'history',
  routes
})

import "@/filters/priceFormatFilter"

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
