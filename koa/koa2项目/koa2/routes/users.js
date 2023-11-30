// 用户相关接口
const router = require("koa-router")();
const userCtl = require("../controller/user"); // 引入User的Schema对象
router.prefix("/users");

/*
添加系统用户 POST
http://localhost:3333/users/add
{
    "username":"test",
    "pwd":"123456"
}
*/
router.post("/add", userCtl.userAdd);
/*
删除系统用户 POST
http://localhost:3333/users/del
{
    "username":"test"
}
*/
router.post("/del", userCtl.userDel);
/*
修改系统用户 POST
http://localhost:3333/users/update
{
    "username":"test",
    "pwd":"123456"
}
*/
router.post("/update", userCtl.userUpdata);
/*
查询所有系统用户 GET
http://localhost:3333/users/find
*/
router.get("/find", userCtl.userFind);
/*
查询某个系统用户 GET
http://localhost:3333/users/find/:username
http://localhost:3333/users/find/test
*/
router.get("/find/:username", userCtl.userFindOne);
/*
登录 POST
http://localhost:3333/users/login
{
    "username":"test",
    "pwd":"123456"
}
*/
router.post("/login", userCtl.login);
/*
注册
http://localhost:3333/users/sign
{
    "username":"test",
    "pwd":"123456"
}
*/
router.post("/sign", userCtl.sign);

module.exports = router;
/*
验证token
http://localhost:3333/users/verify
请求头带上 authorization
*/
router.post("/verify", userCtl.verify);
/*
修改密码
http://localhost:3333/users/changePwd
{
    "username":"test",
    "pwd":"123"
}
*/
router.post("/changePwd", userCtl.changePwd);

module.exports = router;
