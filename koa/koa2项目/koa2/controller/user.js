const { User } = require("../models"); // 引入User的Schema对象
const { add, del, edit, find, findOne } = require("./crudUtil/index");
const jwt = require("jsonwebtoken");

// 添加系统用户
const userAdd = async (ctx) => {
  const { username, pwd } = ctx.request.body;
  await add(User, { username, pwd }, ctx);
};
// 删除系统用户
const userDel = async (ctx) => {
  const { username } = ctx.request.body;
  await del(User, { username }, ctx);
};
// 修改系统用户
const userUpdata = async (ctx) => {
  const { username, pwd } = ctx.request.body;
  await edit(User, { username }, { username, pwd }, ctx);
};
// 查询所有系统用户
const userFind = async (ctx) => {
  await find(User, null, ctx);
};
// 查询某个系统用户
const userFindOne = async (ctx) => {
  const { username } = ctx.params;
  await findOne(User, { username }, ctx);
};

// 登录
const login = async (ctx) => {
  const { username, pwd } = ctx.request.body;
  await User.findOne({ username, pwd })
    .then((r) => {
      if (r) {
        // jwt的使用 jwt.sign(生成的内容，密钥，配置)
        const token = jwt.sign({ username: r.username, _id: r._id }, "whr", { expiresIn: 3600 * 24 * 7 }); // expiresIn token有效时间
        ctx.body = { code: 200, msg: "登录成功", data: { token } };
      } else ctx.body = { code: 400, msg: "用户名或密码错误" };
    })
    .catch((e) => {
      ctx.body = { code: 500, msg: "登录异常", data: e };
    });
};
// 注册
const sign = async (ctx) => {
  const { username, pwd } = ctx.request.body;
  let exist = false;
  await User.findOne({ username }).then((r) => {
    if (r) exist = true;
  });
  if (exist) {
    ctx.body = { code: 400, msg: "用户已存在" };
    return;
  }
  await User.create({ username, pwd })
    .then((r) => {
      if (r) ctx.body = { code: 200, msg: "注册成功" };
      else ctx.body = { code: 400, msg: "注册失败" };
    })
    .catch((e) => {
      ctx.body = { code: 500, msg: "注册异常", data: e };
    });
};
// 验证token
const verify = async (ctx) => {
  let token = ctx.header.authorization;
  token = token.replace("Bearer ", "");
  try {
    const res = jwt.verify(token, "whr"); // token校验 第二个参数传密钥
    await User.findOne({ _id: res._id }).then((r) => {
      if (r) ctx.body = { code: 200, msg: "验证通过", data: r };
      else ctx.body = { code: 400, msg: "验证不通过" };
    });
  } catch (e) {
    ctx.body = { code: 500, msg: "验证不通过", data: e };
  }
};
// 修改密码
const changePwd = async (ctx) => {
  const { username, pwd } = ctx.request.body;
  await User.updateOne({ username }, { pwd })
    .then((r) => {
      console.log(r);
      if (r.n > 0 || r.matchedCount > 0) ctx.body = { code: 200, msg: "修改成功" };
      else ctx.body = { code: 400, msg: "修改失败" };
    })
    .catch((e) => {
      ctx.body = { code: 500, msg: "修改出现异常", data: e };
    });
};

module.exports = {
  userAdd,
  userDel,
  userUpdata,
  userFind,
  userFindOne,
  login,
  sign,
  verify,
  changePwd,
};
