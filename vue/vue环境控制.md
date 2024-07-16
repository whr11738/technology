# 环境控制

### 安装 cross-env

```
// nodejs
npm i --save-dev cross-env
```

### 项目下创建配置文件

```
// .env.dev
GLOBAL_BASEURL=http://192.168.1.1
```

```
// .env.test
GLOBAL_BASEURL=http://192.168.1.2
```

```
// .env.uat
GLOBAL_BASEURL=http://192.168.1.3
```

```
// .env.prod
GLOBAL_BASEURL=http://192.168.1.4
```

### 配置命令

cross-env NODE_ENV=环境名
--mode 环境名

```
// package.json
"dev": "cross-env NODE_ENV=dev vue-cli-service serve --mode dev",
"test": "cross-env NODE_ENV=test vue-cli-service serve --mode test",
"uat": "cross-env NODE_ENV=uat vue-cli-service serve --mode uat",
"prod": "cross-env NODE_ENV=prod vue-cli-service serve --mode prod",
```

### 运行命令

```
dev环境: npm run dev
test环境: npm run test
uat环境: npm run uat
prod环境: npm run prod
```
