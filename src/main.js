import Vue from 'vue'
import App from '@/App.vue'

import {BootstrapVue} from 'bootstrap-vue'
import Router from 'vue-router'

Vue.use(BootstrapVue)
Vue.use(Router)

import routes from "@/routes/routes"

const router = new Router({
  mode: 'history',
  routes
})

import "@/filters/priceFormatFilter"

import store from "@/store/store"

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
