const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");

// 连接数据库
const MongoConnect = require("./db");
MongoConnect();

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
const cors = require("koa2-cors");
app.use(cors());

// authorization验证
const koajwt = require("koa-jwt");
app.use(
  koajwt({
    secret: "whr", // jwt密钥
  }).unless({
    path: [/^\/users\/sign/, /^\/users\/login/], // 不需要jwt认证的接口
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes 路由相关
const index = require("./routes/index");
app.use(index.routes(), index.allowedMethods());
const users = require("./routes/users");
app.use(users.routes(), users.allowedMethods());
const upload = require("./routes/upload");
app.use(upload.routes(), upload.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
