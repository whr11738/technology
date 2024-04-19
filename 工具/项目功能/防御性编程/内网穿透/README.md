# 使用 ngrok 搭建服务器

以内网穿透的形式实现服务器，只用来部署一个接口且只传一小段字符串密钥，免费版应该够用

## 官网

https://dashboard.ngrok.com/

## 使用方式(官网有文档教程)

- 进入官网注册账号
- 进入官网登录账号
- 下载 ngrok 客户端
- 打开 ngrok 客户端出现终端
- 在终端中输入命令 ngrok config add-authtoken 账号 token
- 在终端中输入命令 ngrok http http://localhost:1111
- 此时本地的 http://localhost:1111 接口就被 ngrok 转发出去了
- 终端显示的 Forwarding 字段就是公网域名
