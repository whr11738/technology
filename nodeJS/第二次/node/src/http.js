const http = require("http");
const url = require("url");
const fs = require("fs");
const querystring = require("querystring"); // 用于post中数据的解析

// html文件请求处理
// http://localhost:1111
const app1 = http.createServer((req, res) => {
  const html = fs.readFileSync("./src/index.html");
  res.write(html.toString()); // 输出
  res.end();
});
app1.listen(1111, () => {
  console.log("服务启动在http://localhost:1111");
});

// get请求处理
// http://localhost:2222/test?x=1
const app2 = http.createServer((req, res) => {
  const urlObj = url.parse(req.url, true);
  console.log(urlObj.query);
  res.write(`
    <h1>Hello HTTP</h1>
    <h2>pathname: ${urlObj.pathname} </h2>
    <h3>x: ${urlObj.query.x}</h3>
    `); // 输出
  res.end();
});

app2.listen(2222, () => {
  console.log("服务启动在http://localhost:2222");
});

// post请求处理
// http://localhost:3333
const app3 = http.createServer((req, res) => {
  if (req.url === "/") {
    const html = fs.readFileSync("./src/index.html");
    res.write(html.toString());
  }
  if (req.url === "/postReq") {
    let body = "";
    req.on("data", function (chunk) {
      body += chunk;
    });
    req.on("end", function () {
      body = querystring.parse(body);
      console.log(body.id); // 输出输入框中的内容
    });
  }
  res.end();
});

app3.listen(3333, () => {
  console.log("服务启动在http://localhost:3333");
});
