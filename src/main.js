// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import EllmentUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import MyHttpServer from '@/plugins/http.js'
import moment from 'moment'

Vue.config.productionTip = false


//适用vue插件
Vue.use(EllmentUI)
Vue.use(MyHttpServer)

Vue.filter('fmtdate',(v)=>{
  v=v * 1000
  return moment(v).format('YYYY-MM-DD   HH:mm:ss')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
