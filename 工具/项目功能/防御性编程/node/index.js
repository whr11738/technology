const http = require("http");
const fs = require("fs");
// 1 - 本地开发 2 - 模拟接口返回密钥 3 - 模拟接口出现问题
const mode = 1;

// 接口 - 返回未加密代码
const app1 = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/javascript");
  res.setHeader("Access-Control-Allow-Origin", "*");

  fs.readFile("./src/tool.js", "utf8", (err, data) => {
    res.write(data);
    res.end();
  });
});

// 接口 - 返回密钥
const app2 = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/javascript");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { key } = require("./key.js");
  res.write(key);
  res.end();
});

if (mode === 1) {
  app1.listen(1111, () => {
    console.log("未加密代码服务 启动在http://localhost:1111");
  });
} else if (mode === 2) {
  app2.listen(2222, () => {
    console.log("返回密钥服务 启动在http://localhost:2222");
  });
}
