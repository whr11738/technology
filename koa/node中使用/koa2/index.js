// require("./src/koa");
// Koa 是 Node.js Web Server 框架
// 官网 https://koa.bootcss.com/
const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const parameter = require("koa-parameter");
const bodyParser = require("koa-bodyparser");
const jsonError = require("koa-json-error");
const router = new Router({
  prefix: "/user", //前缀 下面的路径前面都会加上这个
});

const userList = [
  { id: 1, name: "张三" },
  { id: 2, name: "李四" },
];

// get 响应
// http://localhost:8888/user/get
router.get("/get", async (ctx, next) => {
  ctx.body = "get 方法";
});

// post 响应
// http://localhost:8888/user/post
router.post("/post", async (ctx, next) => {
  ctx.body = "post 方法";
});

// 获取query
// http://localhost:8888/user/find?x=1
router.get("/find", async (ctx, next) => {
  ctx.body = ctx.request.query;
});

// 设置状态
// http://localhost:8888/user/get1
router.get("/get1", async (ctx, next) => {
  ctx.set("Allow", "GET,POST"); // 设置响应头
  ctx.status = 301; // 设置状态码 (301代表重定向)
  ctx.body = "设置状态";
});

// 添加
// http://localhost:8888/user/add {"id":"3","name":"王五"}
router.post("/add", async (ctx, next) => {
  // 校验请求的body是否合法
  ctx.verifyParams({
    id: { type: "string", required: true },
    name: { type: "string", required: true },
  });
  const { id, name } = ctx.request.body;
  userList.push({ id, name });
  ctx.body = {
    code: 200,
    msg: "添加成功",
    data: null,
  };
});

// 删除
// http://localhost:8888/user/del {"id":"2"}
router.delete("/del", async (ctx, next) => {
  const { id } = ctx.request.body;
  userList.forEach((item, index) => {
    if (item.id === Number(id)) userList.splice(index, 1);
  });
  ctx.body = {
    code: 200,
    msg: "删除成功",
    data: null,
  };
});

// 修改
// http://localhost:8888/user/updata {"id":"2","name":"王五"}
router.put("/updata", async (ctx, next) => {
  const { id, name } = ctx.request.body;
  userList.forEach((item, index) => {
    if (item.id === Number(id)) userList.splice(index, 1, { id, name });
  });
  ctx.body = {
    code: 200,
    msg: "修改成功",
    data: null,
  };
});

// 查询
// http://localhost:8888/user
router.get("/", async (ctx, next) => {
  const { id } = ctx.request.query;
  const body = {
    code: 200,
    msg: "",
    data: null,
  };
  if (!id) {
    body.data = userList;
  } else {
    userList.forEach((item, index) => {
      if (item.id === Number(id)) body.data = userList[index];
    });
    if (body.data === null) {
      // 错误机制处理
      ctx.throw(412, "先决条件失败"); // 412代表请求目标不存在
    }
  }
  ctx.body = body;
});

// 自己封装的错误处理中间件
// app.use(async (ctx, next) => {
//   try {
//     await next();
//   } catch (e) {
//     const status = e.status || e.statusCode || 500;
//     ctx.status = status;
//     ctx.body = {
//       code: status,
//       msg: e.message,
//     };
//   }
// });
// 错误处理中间件(更规范地返回错误信息)
app.use(jsonError());
// 用于能拿到post请求的ctx.request.body，否则是undefined
app.use(bodyParser());
// 校验请求的body是否合法(需要在bodyParser后引入)
app.use(parameter(app));
app.use(router.routes());

app.listen(8888, () => {
  console.log("服务启动在http://localhost:8888");
});
