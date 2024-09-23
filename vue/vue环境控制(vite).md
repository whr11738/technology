# 环境控制

#### 项目下创建配置文件

.env 在所有的环境中被载入
.env.[mode] 只在指定的模式中被载入
只有以 VITE\_ 为前缀的变量才会暴露给经过 vite 处理的代码。

**.env.dev**

```
// 开发环境
NODE_ENV=dev
VITE_GLOBAL_BASEURL=http://192.168.1.1
```

**.env.test**

```
// 测试环境
NODE_ENV=test
VITE_GLOBAL_BASEURL=http://192.168.1.2
```

**.env.uat**

```
// 预生产环境
NODE_ENV=uat
VITE_GLOBAL_BASEURL=http://192.168.1.3
```

**.env.prod**

```
// 生产环境
NODE_ENV=prod
VITE_GLOBAL_BASEURL=http://192.168.1.4
```

#### 配置命令

--mode 环境名

```
// package.json
"dev": "vite --mode dev --open ",
"test": "vite --mode test --open ",
"uat": "vite --mode uat --open ",
"prod": "vite --mode prod --open ",
```

#### 运行命令

```
dev环境: npm run dev
test环境: npm run test
uat环境: npm run uat
prod环境: npm run prod
```

#### 使用环境变量

```
// main.js
console.log(import.meta.env.VITE_GLOBAL_BASEURL);
```
