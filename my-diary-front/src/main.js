import Vue from 'vue'
import App from './App.vue'
import './assets/style/style.css'
import router from './router'
import axios from 'axios';

axios.defaults.baseURL = '/api'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
