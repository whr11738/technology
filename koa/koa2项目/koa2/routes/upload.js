// 文件上传模块
const multer = require("koa-multer");
const fs = require("fs");
const path = require("path");
const router = require("koa-router")();
router.prefix("/upload");

const storage = multer.diskStorage({
  // 设置文件的存储位置
  destination: (req, file, cb) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dir = "./public/uploads" + year + month + day;

    // 如果目录不存在就创建目录
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // 设置文件的名称 (文件名+时间戳+文件类型后缀)
    const fileName = file.fieldname + "-" + Date.now() + path.extname(file.originalname);

    cb(null, fileName);
  },
});
const upload = multer({ storage });

// 上传图片的接口
// http://localhost:3333/upload/img 使用 form-data 格式上传文件 上传图片的字段为 myfile
router.post("/img", upload.single("myfile"), async (ctx) => {
  let { path } = ctx.req.file;
  path = ctx.origin + "" + path.replace("public", "");
  ctx.body = {
    data: path, // 可直接访问图片的地址
  };
});

module.exports = router;
