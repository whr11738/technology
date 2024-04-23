const http = require("http");
const fs = require("fs");
const ngrok = require("@ngrok/ngrok");

process.env.NGROK_AUTHTOKEN = "token"; // ngrok token认证

// 1 - 本地开发 2 - 模拟接口返回密钥 3 - 模拟接口出现问题
const mode = 2;

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

  // 加密密钥 不能使用纯数字 这里使用 k+我今年生日时间的倒叙 作为密钥，这意味着每年密钥会更新
  const key = "k" + new String(new Date().getFullYear() + "09" + "11").split("").reverse().join("");
  console.log("临时密钥:", key); // 临时密钥:k11904202

  res.write(key);
  res.end();
});

if (mode === 1) app1.listen(1111, () => console.log("未加密代码服务:\nhttp://localhost:1111"));
else if (mode === 2) {
  app2.listen(2222, () => console.log("返回密钥服务:\nhttp://localhost:2222"));
  // 使用 ngrok 进行内网穿透
  ngrok
    .connect({ addr: 2222, authtoken_from_env: true })
    .then((listener) => console.log(`转发到公网的链接:\n${listener.url()}`))
    .catch((e) => console.log("ngrok 认证失败"));
}
