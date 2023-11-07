const pathDemo = () => {
  const path = require("path");

  // 规范路径
  const pathApi1 = path.normalize("a/b///c///d\\e"); // a\b\c\d\e
  const pathApi2 = path.join("a", "b", "/c", "//d"); // a\b\c\d

  // 绝对路径
  const pathApi3 = path.resolve("a/b/c"); // C:\Users\WHR\Desktop\node\a\b\c

  // 判断是不是绝对路径
  const pathApi4 = path.isAbsolute("C:\\Users\\WHR\\Desktop\\node\\a\\b\\c"); // true

  // 返回路径最后一部分
  const pathApi5 = path.basename("a/b/c"); // c

  // 返回路径文件后缀
  const pathApi6 = path.extname("a/b/c.txt"); // .txt

  // 返回目录名
  const pathApi7 = path.dirname("/a/b/c"); // /a/b

  // 解析路径
  const pathApi8 = path.parse("/a/b/c.txt"); // { root: '/', dir: '/a/b', base: 'c.txt', ext: '.txt', name: 'c' }

  // 解析对象成路径
  const pathApi9 = path.format({ root: "/", dir: "/a/b", base: "c.txt", ext: ".txt", name: "c" }); // /a/b\c.txt
};

module.exports = pathDemo;
