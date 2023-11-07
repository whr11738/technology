const fsDemo = () => {
  const fs = require("fs");

  // 同步读取文件
  const fsApi1 = fs.readFileSync("./src/fsTest/test.txt");
  console.log("同步读取:", fsApi1.toString()); // 同步读取: hello fs

  // 异步读取文件
  const fsApi2 = fs.readFile("./src/fsTest/test.txt", (err, data) => {
    if (err) {
      return console.error(err);
    }
    return console.log("异步读取:", data.toString()); // 异步读取: hello fs
  });

  // 同步写入文件
  const fsApi3 = fs.writeFileSync("./src/fsTest/test.txt", "hello fs");

  // 异步写入文件
  const fsApi4 = fs.writeFile("./src/fsTest/test.txt", "hello fs", (err, data) => {
    if (err) {
      return console.error(err);
    }
    console.log("异步写入完毕");
  });
};

module.exports = fsDemo;
