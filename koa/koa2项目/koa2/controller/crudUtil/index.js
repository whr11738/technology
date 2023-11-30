// 增删改查操作公共方法封装

const add = (model, params, ctx) =>
  model
    .create(params)
    .then((res) => {
      if (res) ctx.body = { code: 200, msg: "添加成功", data: res };
      else ctx.body = { code: 400, msg: "添加失败", data: res };
    })
    .catch((e) => {
      ctx.body = { code: 500, msg: "添加出现异常", data: e };
    });

const del = (model, params, ctx) =>
  model
    .findOneAndDelete(params)
    .then((res) => {
      if (res) ctx.body = { code: 200, msg: "删除成功", data: res };
      else ctx.body = { code: 400, msg: "删除失败", data: res };
    })
    .catch((e) => {
      ctx.body = { code: 500, msg: "删除出现异常", data: e };
    });

const edit = (model, params1, params2, ctx) =>
  model
    .updateOne(params1, params2)
    .then((res) => {
      if (res) ctx.body = { code: 200, msg: "修改成功", data: res };
      else ctx.body = { code: 400, msg: "修改失败", data: res };
    })
    .catch((e) => {
      ctx.body = { code: 500, msg: "修改出现异常", data: e };
    });

const find = (model, params, ctx) =>
  model
    .find(params)
    .then((res) => {
      if (res) ctx.body = { code: 200, msg: "查询成功", data: res };
      else ctx.body = { code: 400, msg: "查询失败", data: res };
    })
    .catch((e) => {
      ctx.body = { code: 500, msg: "查询出现异常", data: e };
    });

const findOne = (model, params, ctx) =>
  model
    .findOne(params)
    .then((res) => {
      if (res) ctx.body = { code: 200, msg: "查询成功", data: res };
      else ctx.body = { code: 400, msg: "查询失败", data: res };
    })
    .catch((e) => {
      ctx.body = { code: 500, msg: "查询出现异常", data: e };
    });
module.exports = {
  add,
  del,
  edit,
  find,
  findOne,
};
