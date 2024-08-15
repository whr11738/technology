class VersionPlugin {
  constructor(version) {
    this.version = version; // 存储当前版本号
  }
  apply(compiler) {
    // Webpack编译过程 compiler.hooks.emit异步钩子
    compiler.hooks.emit.tapAsync("versionPlugin", (compilation, callback) => {
      let fileContent = JSON.stringify({ version: this.version });
      // 将此列表作为新的文件资产插入到webpack生成中：
      compilation.assets["version.json"] = {
        source: function () {
          return fileContent;
        },
        size: function () {
          return fileContent.length;
        },
      };
      callback();
    });
  }
}
module.exports = VersionPlugin;
