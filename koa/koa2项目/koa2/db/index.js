// 1.在MongoDB Compass(可视化界面)中连接本地后(默认端口27017)，创建数据库，创建表(也叫集合)
// 2.安装mongoose依赖 npm i mongoose -s

const mongoose = require("mongoose");

module.exports = () => {
  //  连接数据库
  mongoose
    // mongodb://localhost:27017/demo 不行就用 127.0.0.1（node版本大于16会导致 localhost 不是指向 127.0.0.1 而是指向 :::1）
    .connect("mongodb://127.0.0.1:27017/demo", {
      useUnifiedTopology: true,
      useNewUrlParser: true, // useNewUrlParser 表示如果没有表就自动创建表
    })
    .then(() => {
      console.log("数据库连接成功");
    })
    .catch((e) => {
      console.log("数据库连接失败", e);
    });
};

// 创建表过程在 ./models.index.js中
