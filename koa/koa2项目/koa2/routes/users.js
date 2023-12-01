// 用户相关模块
const router = require("koa-router")();
const userCtl = require("../controller/user"); // 引入User的Schema对象
router.prefix("/users");

router.post("/add", userCtl.userAdd); // 添加系统用户 POST
router.post("/del", userCtl.userDel); // 删除系统用户 POST
router.post("/update", userCtl.userUpdata); // 修改系统用户
router.get("/find", userCtl.userFind); // 查询所有系统用户
router.get("/find/:username", userCtl.userFindOne); // 查询某个系统用户
router.post("/login", userCtl.login); // 登录
router.post("/sign", userCtl.sign); // 注册
router.post("/verify", userCtl.verify); // 验证token
router.post("/changePwd", userCtl.changePwd); // 修改密码

module.exports = router;
