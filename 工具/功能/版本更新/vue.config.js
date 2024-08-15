const VersionPlugin = require("./version.js");
const version = new Date().getTime(); // 版本号:生成唯一，可以改用其他hash值代替，这里用时间戳

module.exports = {
  // 部署应用包时的基本 URL
  publicPath: "./",
  // 是否需要生产环境的 source map（源映射文件，帮助开发者在浏览器的开发者工具中，将错误和日志定位到原始代码的具体位置）
  productionSourceMap: false,
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: true,
  // 是否在开发下通过eslint-loader在每次保存时lint代码， 需要安装@vue/cli-plugin-eslint
  lintOnSave: true,
  // webpack额外配置
  configureWebpack: { plugins: [new VersionPlugin(version)] }, // 传入hash版本号
  chainWebpack: (config) => {
    config.plugin("define").tap((args) => {
      args[0]["process.env"] = { ...args[0]["process.env"], version }; // 将版本号添加至全局环境变量
      return args;
    });
  },
};
