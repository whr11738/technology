// 为组件提供 install 安装方法，供按需引入
import progressBar from './progressBar.vue'
progressBar.install = (Vue) => Vue.component(progressBar.name, progressBar)
export default progressBar
