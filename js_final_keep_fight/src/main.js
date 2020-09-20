// vee-validate 所有規則都載入
import { ValidationObserver, ValidationProvider, configure } from 'vee-validate/dist/vee-validate.full.esm'

import CartDetailCompo from './components/CartDetailCompo.vue'
import 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import App from './App.vue'
import router from './router'

// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css'

// 元件，全域註冊
Vue.component('loading', Loading)
Vue.component('CartDetailCompo', CartDetailCompo)

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

// 套件加入到 vue 的藍圖內（原型內），就可以直接使用套件了喔耶
Vue.use(VueAxios, axios)

// 建立 bus 用於監聽事件
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
