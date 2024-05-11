// 加密密钥 不能使用纯数字 这里使用 k+我今年生日时间的倒叙 作为密钥，这意味着每年密钥会更新
const key = "k" + new String(new Date().getFullYear() + "09" + "11").split("").reverse().join("");
module.exports = exports = { key }; // 临时密钥:k11904202
