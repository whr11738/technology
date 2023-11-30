// Koa 是 Node.js Web Server 框架
// 官网 https://koa.bootcss.com/
const koaDemo = () => {
  const Koa = require("koa");
  const app = new Koa();
  const Router = require("koa-router");
  const router = new Router();

  // http://localhost:8888/
  router.get("/", async (ctx, next) => {
    ctx.body = "hello koa";
  });

  // http://localhost:8888/test?x=1
  router.get("/test", async (ctx, next) => {
    ctx.body = ctx.request.query;
  });

  // http://localhost:8888/data?user=wuyanzu&id=123456
  router.get("/data/:id", async (ctx, next) => {
    ctx.body = {
      url: ctx.url,
      data: ctx.request.params,
      dataQueryString: ctx.request.querystring,
    };
  });

  app.use(router.routes());

  app.listen(8888, () => {
    console.log("服务启动在http://localhost:8888");
  });
};

module.exports = koaDemo;
