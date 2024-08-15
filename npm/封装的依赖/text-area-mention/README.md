## 提示

这一个用原生 js 实现的开箱即用的有提及功能的文本域
输入'@'时会弹出提及选择框
解决了文本域光标位置追踪的难点，提及选择框会根据光标位置展现
该依赖是在 Vue3 中开发的，所以只能在 Vue3 项目中正常安装并使用

## 使用

#### 引入 npm 包

```
npm i @sasaiweb/text-area-mention
```

#### 全局使用

```js
// main.js
import textAreaMention from '@sasaiweb/text-area-mention'
const app = createApp(App)
app.use(textAreaMention)
```

#### 局部使用

```js
import textAreaMention from '@sasaiweb/text-area-mention'
export default {
  component: {
    textAreaMention
  }
}
```

#### api

| 参数       | 说明                           | 类型     | 可选值 | 默认值 |
| ---------- | ------------------------------ | -------- | ------ | ------ |
| v-model    | 绑定值                         | string   | -      | -      |
| change     | 内容改变时返回组件内的所有状态 | function | -      | -      |
| peopleList | 存放提及人员的数组             | Array    | -      | -      |
