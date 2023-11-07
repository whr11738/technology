## 提示

这一个用原生 js 实现的开箱即用的滑动输入器
该依赖是在 Vue3 中开发的，所以只能在 Vue3 项目中正常安装并使用

## 使用

#### 引入 npm 包

```
npm i @sasaiweb/progress-bar
```

#### 全局使用

```js
// main.js
import progressBar from '@sasaiweb/progress-bar'
const app = createApp(App)
app.use(progressBar)
```

#### 局部使用

```js
import progressBar from '@sasaiweb/progress-bar'
export default {
  component: {
    progressBar
  }
}
```

#### api

| 参数    | 说明   | 类型   | 可选值 | 默认值 |
| ------- | ------ | ------ | ------ | ------ |
| v-model | 绑定值 | number | -      | -      |
