### 安装 koa 脚手架

```
npm install koa-generator -g
koa -V 看版本
```

### 创建项目

```
koa2 项目名
```

### 启动项目

```
npm install
npm run dev
启动在http://localhost:3333/
```

### 文件结构

routes - 接口相关
db - 连接数据库相关
models - Schema 对象相关
controller - 数据库数据操控相关

### 相关依赖

koa
mongoose

#### 其他

热更新由 nodemon 实现

大部分请求接口需要验证 token
在请求头中加入 authorization，内容为 Bearer + jwt 生成的 token 例如
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJfaWQiOiI2NTViMzMzOTQyNjg3YjJjNDYwNjc0YWUiLCJpYXQiOjE3MDA0NzcwMTQsImV4cCI6MTcwMTA4MTgxNH0.lcbKzv3YeRUStjtRLiSQ5v5Y_aZ6w6P035ar7Eeeuv0
