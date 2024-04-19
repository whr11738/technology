// 引入crypto-js库
const CryptoJS = require("crypto-js");

const fs = require("fs");
fs.readFile("./src/tool.js", "utf8", (err, res) => {
  // 加密(加密数据,密钥)
  const encrypt = (data, key) => CryptoJS.AES.encrypt(data, key).toString();
  // 同步写入文件
  const { key } = require("./key.js");
  fs.writeFileSync("./dist/tool.js", `export const res = '${encrypt(res, key)}'`);
});
