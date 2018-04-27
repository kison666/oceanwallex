// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.use(require('vue-wechat-title'))
/* eslint-disable no-new */
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'  
import 'bootstrap/dist/js/bootstrap.min'
import 'font-awesome/css/font-awesome.min.css'  

import ElementUI from 'element-ui'
Vue.use(ElementUI)
import 'element-ui/lib/theme-chalk/index.css' 

import './style/common.css'
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
