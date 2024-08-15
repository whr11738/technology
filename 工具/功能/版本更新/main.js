const { version } = process.env;
Vue.prototype.$version = version; // 将版本号写入vue原型
