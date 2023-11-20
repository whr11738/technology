## 对于一份 uniapp 代码要同时编译出 H5 和微信小程序版本中使用 vant 组件库的问题

同时安装 **vant** 和 **vant-weapp** 来解决

---

### 如何在 uni-app 编译出的 H5 中使用 vant 组件库

[组件库](https://vant-ui.github.io/vant/v2/#/zh-CN/quickstart)

#### 安装 vant

- 因为 uniapp 一般是 **vue2** 语法，所以 vant 需要用 **2** 版本

```
npm i vant@latest-v2 -S
```

#### 在 main.js 中添加以下代码注册组件

- 如果是用 vsc 创建的 uniapp 项目，需要在 src 中找到 main.js 文件

```
import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);
```

<u>_至此就能正常使用 vant 组件库了_</u>

---

### 如何在 uni-app 编译出的微信小程序中使用 vant-weapp 组件库

[参考资料](https://blog.csdn.net/Wzmlzrr/article/details/129649924)
[组件库](https://youzan.github.io/vant-weapp/#/quickstart)

#### 安装 vant-weapp

- 如果是 vsc 创建的 uniapp 项目就先用 npm init -y 将项目**初始化**

```
npm i @vant/weapp -S --production
```

#### 安装完成后

- 项目依赖中会多出一个依赖项，也代表安装成功，
- 在项目的根路径下，**创建** wxcomponents 目录，
- 并将依赖项（node_modules）中@vant 文件夹下的 dist **复制**到 wxcomponents 文件夹中，
  如果是 vsc 搭建的 uniapp 项目就复制到 src 下的 wxcomponents 中，
- 并将 dist 文件夹**修改文件夹名**为 vant。
  (此时通过 npm uni @vant/weapp -S --production 卸载 vant-weapp 应该不影响项目正常运行)

#### 在 pages.json 中注册并引入组件

- **添加配置项** usingComponents，以下是完整代码

```
{
  "pages": [pages
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "uni-app"
      }
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "uni-app",
    "navigationBarBackgroundColor": "#F8F8F8",
    "backgroundColor": "#F8F8F8",
    "usingComponents": {
      "van-action-sheet": "/wxcomponents/vant/action-sheet/index",
      "van-area": "/wxcomponents/vant/area/index",
      "van-button": "/wxcomponents/vant/button/index",
      "van-card": "/wxcomponents/vant/card/index",
      "van-cell": "/wxcomponents/vant/cell/index",
      "van-cell-group": "/wxcomponents/vant/cell-group/index",
      "van-checkbox": "/wxcomponents/vant/checkbox/index",
      "van-checkbox-group": "/wxcomponents/vant/checkbox-group/index",
      "van-col": "/wxcomponents/vant/col/index",
      "van-dialog": "/wxcomponents/vant/dialog/index",
      "van-field": "/wxcomponents/vant/field/index",
      "van-goods-action": "/wxcomponents/vant/goods-action/index",
      "van-goods-action-icon": "/wxcomponents/vant/goods-action-icon/index",
      "van-goods-action-button": "/wxcomponents/vant/goods-action-button/index",
      "van-icon": "/wxcomponents/vant/icon/index",
      "van-loading": "/wxcomponents/vant/loading/index",
      "van-nav-bar": "/wxcomponents/vant/nav-bar/index",
      "van-notice-bar": "/wxcomponents/vant/notice-bar/index",
      "van-notify": "/wxcomponents/vant/notify/index",
      "van-panel": "/wxcomponents/vant/panel/index",
      "van-popup": "/wxcomponents/vant/popup/index",
      "van-progress": "/wxcomponents/vant/progress/index",
      "van-radio": "/wxcomponents/vant/radio/index",
      "van-radio-group": "/wxcomponents/vant/radio-group/index",
      "van-row": "/wxcomponents/vant/row/index",
      "van-search": "/wxcomponents/vant/search/index",
      "van-slider": "/wxcomponents/vant/slider/index",
      "van-stepper": "/wxcomponents/vant/stepper/index",
      "van-steps": "/wxcomponents/vant/steps/index",
      "van-submit-bar": "/wxcomponents/vant/submit-bar/index",
      "van-swipe-cell": "/wxcomponents/vant/swipe-cell/index",
      "van-switch": "/wxcomponents/vant/switch/index",
      "van-tab": "/wxcomponents/vant/tab/index",
      "van-tabs": "/wxcomponents/vant/tabs/index",
      "van-tabbar": "/wxcomponents/vant/tabbar/index",
      "van-tabbar-item": "/wxcomponents/vant/tabbar-item/index",
      "van-tag": "/wxcomponents/vant/tag/index",
      "van-toast": "/wxcomponents/vant/toast/index",
      "van-transition": "/wxcomponents/vant/transition/index",
      "van-tree-select": "/wxcomponents/vant/tree-select/index",
      "van-datetime-picker": "/wxcomponents/vant/datetime-picker/index",
      "van-rate": "/wxcomponents/vant/rate/index",
      "van-collapse": "/wxcomponents/vant/collapse/index",
      "van-collapse-item": "/wxcomponents/vant/collapse-item/index",
      "van-picker": "/wxcomponents/vant/picker/index"
    }
  }
}

```

#### 如果编译报错

- 曾在此时遇到 cross-env 不是内部或外部命令 的报错用以下方式解决了(vsc 创建的 uniapp 项目)

```
npm i
```

#### 使用条件编译来控制引入的语句，否则微信小程序会因为运行引入 vant 代码而报错

[参考资料](https://zh.uniapp.dcloud.io/tutorial/platform.html#)

```
#ifdef H5
引入vant
#endif


#ifdef MP-WEIXIN
引入vant-weapp
#endif
```

<u>_至此就能正常使用 vant-weapp 组件库了_</u>
