// 自定义指令(vue2) 根据权限控制dom的显示

/* vue2 引入
- main.js
import Vue from 'vue';
import permission from './directive/permission';
Vue.directive('acs', permission);
*/

import { hasPermission } from "../utils/permission.js";
import { storage } from "../utils/storage.js";

export default {
  bind: (el) => {
    el.style.display = "none";
  },
  inserted: (el, binding) => {
    const permission = storage.get("permission");
    const has = hasPermission(permission, binding.value || []);
    if (!has) {
      el.parentNode && el.parentNode.removeChild(el);
    } else {
      el.style.display = "";
    }
  },
};
