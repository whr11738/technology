import Vue from 'vue'
import app from './app.vue'

Vue.config.productionTip = false



new Vue({
  el:'#app',
  render: h => h(app),
  beforeCreate(){
    //安装全局事件总线
    Vue.prototype.$bus=this
  }
})
