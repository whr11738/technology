# pay-blox-business

## 简介

由标准业务平台和饮水标准业务平台合并，在标准业务平台基础上修改

## 产品文档

> [[1.0.8]](https://www.pmdaniu.com/clouds/133834/745d69d32486828c6632c79cab5c8c49-18312/start.html?_d=Tue%20Jan%2003%202023%2014:23:03%20GMT+0800%20(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)#g=1&p=%E8%AE%BE%E8%AE%A1%E8%A6%81%E6%B1%82)  
> [[1.1.0]](https://www.pmdaniu.com/clouds/113380/c1982c99174d032a457b360e54bf940c-18312/start.html?_d=Fri%20Feb%2026%202021%2011:39:06%20GMT%200800%20(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)?_d=Tue%20Jan%2003%202023%2014:23:57%20GMT+0800%20(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)#g=1&p=%E7%B2%BE%E6%A0%BC1_1-%E5%B0%8F%E7%A8%8B%E5%BA%8F%E8%BF%90%E8%90%A5)

## UI 设计

> [[1]https://codesign.qq.com/s/7VXl9Obz1ej8WRA](https://codesign.qq.com/s/7VXl9Obz1ej8WRA)

## 接口文档

> [[1]http://192.168.3.147:9099/group/235](http://192.168.3.147:9099/group/235)

## git 仓库

> [http://gitlab.iot.com/business/universal_html.git](http://gitlab.iot.com/business/universal_html.git)

## 技术框架

vite、vue3、element ui plus、typescript

## UI 框架

UI 采用 element ui plus

## node 版本

18.4.0 / 12.22.3

## 技术栈

| 参考资料 | 说明                                                                     | 文档地址                         |
| -------- | ------------------------------------------------------------------------ | -------------------------------- |
| 组件库   | Element，一套为开发者、设计师和产品经理准备的基于 Vue 3.0 的桌面端组件库 | https://element-plus.org/#/zh-CN |

## 部署上线

只需将本地 gitlab 代码更新到线上，就会自动化部署

### Jenkins

> [http://54.152.50.21:8080/view/business/job/universal-html/](http://54.152.50.21:8080/view/business/job/universal-html/)

### 运行

```
[1] npm run dev 开发环境
[2] npm run dev:test  测试环境
[3] npm run dev:uat   UAT环境
[4] npm run dev:prod  生产环境
```

### 构建编译

```
[1] npm run build:dev  开发环境
[2] npm run build:test  测试环境
[3] npm run build:uat  UAT环境
[4] npm run build:prod  生产环境
```

## 环境账号

https://www.tapd.cn/40586803/documents/show/1140586803001000155?file_type=word

## 功能要点

1. root 账号只能创非运营商；非运营商只能创建运营商商
2. 权限模块配置注意事项
   > 运营商：没有账号管理板块
   > 非运营商权限：没有账户信息、资金结算、门店管理板块及订单列表里面退款操作的权限
   > root 权限：没有账户信息、资金结算、门店管理板块及订单列表里面退款操作的权限。 消息中心-消息推送 、文章管理、配置管理只有 root 才有
   > 一级菜单只有后端配置，具体权限规则生成方法(http://192.168.4.145/doc/develop/-/blob/master/business/standard/%E6%9D%83%E9%99%90%E7%94%9F%E6%88%90%E8%A7%84%E5%88%99%E8%AE%BE%E8%AE%A1.md)

## 项目结构

项目结构如下：

```javascript
.
|-- babel.config.js       // babel 配置文件
|-- public
|   |-- index.html
|   |-- table.json
|-- src                   // 源码目录
|   |-- api               // API
|   |-- assets            // 静态资源目录
|   |-- components        // 组件目录
|   |-- composables
|   |-- config            //某些文件配置
|   |-- directives
|   |-- layouts           // 菜单路由的配置
|   |-- locales           // 公共翻译文件
|       |-- en-US.ts      // 英文翻译
|       |-- zh-US.ts      // 中文文翻译
|   |-- store             // 状态管理目录
|   |-- utils             // 工具函数目录(公共方法)
|   |-- views             // 页面文件
|   |-- main.js           // 应用程序入口文件
|   |-- App.vue           // 应用程序
|-- shims-vue.d.ts
|-- .env.development      //开发环境配置
|-- .env.production       //pro环境配置
|-- .env.test             //测试环境配置
|-- .env.uat              //uat环境配置
|-- package.json          //依赖模块
|-- vite.config.ts        // vue 配置文件

```
