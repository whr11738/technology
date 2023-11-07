const bufferDemo = () => {
  // 创建Buffer对象
  const buf1 = Buffer.alloc(5); // <Buffer 00 00 00 00 00>
  const buf2 = Buffer.alloc(5, 1); // <Buffer 01 01 01 01 01>
  const buf3 = Buffer.from([1, 2, 3]); // <Buffer 01 02 03>
  const buf4 = Buffer.from("123"); // <Buffer 31 32 33> (默认utf-8格式)
  const buf5 = Buffer.from("123", "base64"); // <Buffer d7 6d> (base64格式)
  console.log(buf5.toString("base64")); // 120=

  // 获取Buffer对象长度
  const buf6 = Buffer.byteLength("123"); // 3

  // 判断是Buffer对象
  const buf7 = Buffer.isBuffer(buf5); // true

  // 拼接Buffer对象
  const buf8 = Buffer.concat([buf4, buf5]); // <Buffer 31 32 33 d7 6d>
};

module.exports = bufferDemo;
