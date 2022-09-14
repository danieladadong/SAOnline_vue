// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from '@/api/axios.js'
import qs from 'qs'
import VueCookie from 'js-cookie'
import dayjs from 'dayjs'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$qs = qs;
Vue.prototype.$http = axios;
Vue.prototype.$cookie = VueCookie
Vue.config.productionTip = false
Vue.prototype.dayjs = dayjs;
/* eslint-disable no-new */
import gobal_variable from '@/api/goble_variable.js'
Vue.prototype.GOBAL = gobal_variable
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
