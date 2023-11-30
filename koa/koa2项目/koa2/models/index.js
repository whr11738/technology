// mongoose 用于控制MongoDB的依赖
const mongoose = require("mongoose");

// Schema对象对应表

// 系统用户Schema对象(下面填的是规则)
const userSchema = new mongoose.Schema({
  username: String,
  pwd: { type: String, default: "" },
});
// 创建Schema对象
const User = mongoose.model("users", userSchema);

module.exports = { User };
