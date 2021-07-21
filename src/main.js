import Vue from 'vue'
import App from '@/App.vue'

import {BootstrapVue} from 'bootstrap-vue'
import Router from 'vue-router'

Vue.use(BootstrapVue)
Vue.use(Router)

import routes from "@/assets/routes/routes";

const router = new Router({
  mode: 'history',
  routes
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
