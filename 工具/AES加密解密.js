// AES
// 在nodeJS中使用
// npm i crypto-js

// 引入crypto-js库
const CryptoJS = require("crypto-js");
// 加密(加密数据,密钥)
const encrypt = (data, key = "key") => CryptoJS.AES.encrypt(data, key).toString();
// 解密(解密数据,密钥)
const decrypt = (data, key = "key") => CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);

// console.log(decrypt(encrypt("123")));
