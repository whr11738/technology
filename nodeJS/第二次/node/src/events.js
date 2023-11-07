const EventEmitter = require("events");

class CustomEvent extends EventEmitter {}

const ce = new CustomEvent();

// 事件监听
const fn1 = (info) => {
  console.log("test", info);
};
ce.on("test", fn1);
setInterval(() => {
  ce.emit("test", new Date().getTime());
}, 1000);

// 只运行一次的事件
ce.once("once", (info) => {
  console.log("once", info);
});
setInterval(() => {
  ce.emit("once", new Date().getTime());
}, 1000);

// 移除事件函数
setTimeout(() => {
  ce.removeListener("test", fn1);
}, 2500);

// 移除事件所有函数
setTimeout(() => {
  ce.removeAllListeners("test");
}, 3000);
