import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
import * as vant from 'vant'
import 'vant/lib/index.css'

Vue.config.productionTip = false
App.mpType = 'app'

for (const i in vant) {
  if (vant[i].install) Vue.use(vant[i])
}

const app = new Vue({
  ...App
})
app.$mount()
