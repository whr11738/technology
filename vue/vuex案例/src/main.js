import Vue from 'vue'
import app from './app.vue'
//引入store
import store from './store/index.js'


Vue.config.productionTip = false


new Vue({
  el:'#app',
  render: h => h(app),
  store,
  beforeCreate(){
    //安装全局事件总线
    Vue.prototype.$bus=this
  }
})
