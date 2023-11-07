const week = {
  1: { t: "i.Monday", val: 1 },
  2: { t: "i.Tuesday", val: 2 },
  4: { t: "i.Wednesday", val: 4 },
  8: { t: "i.Thursday", val: 8 },
  16: { t: "i.Friday", val: 16 },
  32: { t: "i.Saturday", val: 32 },
  64: { t: "i.Sunday", val: 64 },
};
// 星期数，如果多选，就是值相加（星期一=1，星期二=2，星期三=4，星期四=8，星期五=16，星期六=32，星期日=64）
const arr = [1, 2, 4, 8, 16, 32, 64];
console.log((1 & 5)===1); // true
console.log((4 & 5)===4); // true
console.log((2 & 5)===2); // false