// 为组件提供 install 安装方法，供按需引入
import textAreaMention from './textAreaMention.vue'
textAreaMention.install = (Vue) => Vue.component(textAreaMention.name, textAreaMention)
export default textAreaMention
