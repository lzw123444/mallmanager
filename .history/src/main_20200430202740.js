// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import '@/assets/css/reset.css'
import myHttpServe from '@/plugins/http.js'
import moment from 'moment'

// 使用vue插件
Vue.use(ElementUI)
Vue.use(myHttpServe)
Vue.config.productionTip = false
/* eslint-disable no-new */
// 设置全局过滤器
Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
