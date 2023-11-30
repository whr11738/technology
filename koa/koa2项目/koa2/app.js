const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const MongoConnect = require("./db"); // MongoDB相关
const koajwt = require("koa-jwt"); // jwt密钥相关

// 连接数据库
MongoConnect();

const index = require("./routes/index");
const users = require("./routes/users");
const upload = require("./routes/upload");

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);

// 解决跨域问题
// app.use(async (ctx, next) => {
//   ctx.set("Access-Control-Allow-Origin", "*");
//   if (ctx.method == "OPTIONS") ctx.body = { code: 200 };
//   else await next();
// });

// authorization验证
// app.use(
//   koajwt({
//     secret: "whr", // jwt密钥
//   }).unless({
//     path: [/^\/users\/login/, /^\/users\/sign/, /^\/users\/verify/], // 不需要jwt认证的接口
//   })
// );

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes 路由相关
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(upload.routes(), upload.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
