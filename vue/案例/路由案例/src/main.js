import Vue from 'vue'
import app from './app.vue'
//引入VueRouter
import VueRouter from 'vue-router'
//引入路由器
import router from './router'
//应用路由器插件
Vue.use(VueRouter)

Vue.config.productionTip = false


new Vue({
  el:'#app',
  render: h => h(app),
  router:router
})
