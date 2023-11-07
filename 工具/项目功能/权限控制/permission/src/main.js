import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import permission from './directives/permission'

const app = createApp(App)
app.directive('acs', permission)
app.use(ElementPlus)
app.mount('#app')
