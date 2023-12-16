// 自定义指令(vue3) 根据权限控制dom的显示

/* vue3 引入
- main.js
import permission from "./directives/permissionVue3";
const app = createApp(App);
app.directive("acs", permission);
*/

import { hasPermission } from "../utils/permission.js";
import { storage } from "../utils/baseTool.js";

export default {
  beforeMount(el) {
    el.style.display = "none";
  },
  async mounted(el, binding) {
    const permission = storage.get("permission");
    const has = hasPermission(permission, binding.value || []);
    if (!has) {
      el.parentNode && el.parentNode.removeChild(el);
    } else {
      el.style.display = "";
    }
  },
};
