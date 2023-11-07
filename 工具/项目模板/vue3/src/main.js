import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as vant from "vant";
import "vant/lib/index.css";
import i18n from "./i18n/index";

const app = createApp(App);

for (const i in vant) {
  if (vant[i].install) app.use(vant[i]);
}
app.use(i18n);
app.use(router);
app.use(ElementPlus);

// 注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
