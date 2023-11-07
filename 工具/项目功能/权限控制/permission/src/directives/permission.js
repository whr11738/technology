// 自定义指令 根据权限控制dom的显示

import { hasPermission } from '../utils/permission.js'
import { storage } from '../utils/baseTool.js'

export default {
  beforeMount(el) {
    el.style.display = 'none'
  },
  async mounted(el, binding) {
    const permission = storage.get('permission')
    const has = hasPermission(permission, binding.value || [])
    if (!has) {
      el.parentNode && el.parentNode.removeChild(el)
    } else {
      el.style.display = ''
    }
  }
}
