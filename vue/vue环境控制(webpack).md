# 环境控制

#### 项目下创建配置文件

.env 在所有的环境中被载入
.env.[mode] 只在指定的模式中被载入

**.env.dev**

```
// 开发环境
NODE_ENV=dev
GLOBAL_BASEURL=http://192.168.1.1
```

**.env.test**

```
// 测试环境
NODE_ENV=test
GLOBAL_BASEURL=http://192.168.1.2
```

**.env.uat**

```
// 预生产环境
NODE_ENV=uat
GLOBAL_BASEURL=http://192.168.1.3
```

**.env.prod**

```
// 生产环境
NODE_ENV=prod
GLOBAL_BASEURL=http://192.168.1.4
```

#### 配置命令

--mode 环境名

```
// package.json
"dev": "vue-cli-service serve --mode dev --open --port 8001",
"test": "vue-cli-service serve --mode test --open --port 8002",
"uat": "vue-cli-service serve --mode uat --open --port 8003",
"prod": "vue-cli-service serve --mode prod --open --port 8004",
```

#### 运行命令

```
dev环境: npm run dev
test环境: npm run test
uat环境: npm run uat
prod环境: npm run prod
```

#### 接口代理

```
// vue.config.js
console.log(process.env.NODE_ENV)
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: process.env.GLOBAL_BASEURL,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      },
    },
  },
};

```
