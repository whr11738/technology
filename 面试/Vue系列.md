# [参考资料](https://vue3js.cn/interview/)

**该文档包含 Vue2 系列 和 Vue3 系列**

## [有使用过 vue 吗？说说你对 vue 的理解？](https://vue3js.cn/interview/vue/vue.html#%E4%B8%80%E3%80%81%E4%BB%8E%E5%8E%86%E5%8F%B2%E8%AF%B4%E8%B5%B7)

### VUE 是什么

Vue 是一个用于创建用户界面的开源 JavaScript 框架，也是一个用于创建单页面应用的 Web 应用框架。
Vue 所关注的核心是 MVC 模式中的视图层，同时它也能方便地获取数据更新，并通过组件内部特定的方法实现视图与模型的交互。

### VUE 的核心特性

数据驱动(MVVM)，model 模型层，view 视图层，viewModel 视图模型层。
模型层负责处理业务逻辑以及和服务器端进行交互，
视图层负责将数据模型转换为 UI 进行页面展示，
视图模型层负责监听模型层的数据变化，将数据的变化映射到视图层，最终实现数据的双向绑定，是 Model 和 View 之间的通信桥梁。

### 组件化

降低整个系统的耦合度，可以替换不同的组件快速完成需求
调试方便，在出现问题的时候，可以用排除法快速定位问题
提高可维护性，由于每个组件的职责单一在系统中是被复用的，所以对代码进行优化可获得系统的整体升级

### Vue 跟传统开发的区别

Jquery 操作 DOM，Vue 所有的界面事件，都是只去操作数据的，Vue 所有界面的变动，都是根据数据自动绑定出来的

## [你对 SPA 单页面的理解，它的优缺点分别是什么？如何实现 SPA 应用呢？](https://vue3js.cn/interview/vue/spa.html#%E4%B8%80%E3%80%81%E4%BB%80%E4%B9%88%E6%98%AFspa)

### 什么是 SPA

单页应用 SPA 是一种网络应用程序或网站的模型，它通过动态重写当前页面来与用户交互，这种方法避免了页面之间切换打断用户体验在单页应用中，所有必要的代码（HTML、JavaScript 和 CSS）都通过单个页面的加载而检索，或者根据需要（通常是为响应用户操作）动态装载适当的资源并添加到页面页面在任何时间点都不会重新加载，也不会将控制转移到其他页面举个例子来讲就是一个杯子，早上装的牛奶，中午装的是开水，晚上装的是茶，我们发现，变的始终是杯子里的内容，而杯子始终是那个杯子。
我们熟知的 JS 框架如 react,vue,angular,ember 都属于 SPA。

### SPA 和 MPA 的区别

在 MPA 中，每个页面都是一个主页面，都是独立的，当我们在访问另一个页面的时候，都需要重新加载 html、css、js 文件

#### 单页应用优缺点

- ##### 优点
  具有桌面应用的即时性、网站的可移植性和可访问性
  用户体验好、快，内容的改变不需要重新加载整个页面
  良好的前后端分离，分工更明确
- ##### 缺点
  不利于搜索引擎的抓取
  首次渲染速度相对较慢

### 实现一个 SPA

监听地址栏中 hash 变化驱动界面变化
用 pushsate 记录浏览器的历史，驱动界面发送变化

## [v-show 和 v-if 有什么区别？使用场景分别是什么？](https://vue3js.cn/interview/vue/show_if.html#%E4%B8%80%E3%80%81v-show%E4%B8%8Ev-if%E7%9A%84%E5%85%B1%E5%90%8C%E7%82%B9)

### v-show 与 v-if 的共同点

vue 中 v-show 与 v-if 的作用效果是相同的(不含 v-else)，都能控制元素在页面是否显示

### v-show 与 v-if 的区别

- ##### 控制手段
  v-show 隐藏则是为该元素添加 css：display:none，dom 元素依旧还在。
  v-if 显示隐藏是将 dom 元素整个添加或删除。
- ##### 编译过程
  v-show 只是简单的基于 css 切换。
  v-if 切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件。
- ##### 编译条件
  v-show 由 false 变为 true 的时候不会触发组件的生命周期
  v-if 由 false 变为 true 的时候，触发组件的 beforeCreate、create、beforeMount、mounted 钩子，由 true 变为 false 的时候触发组件的 beforeDestory、destoryed 方法
- ##### 性能消耗
  v-show 有更高的初始渲染消耗
  v-if 有更高的切换消耗

### v-show 与 v-if 的使用场景

v-if 相比 v-show 开销更大的（直接操作 dom 节点增加与删除）
如果需要非常频繁地切换，则使用 v-show 较好
如果在运行时条件很少改变，则使用 v-if 较好

## [Vue 实例挂载的过程](https://vue3js.cn/interview/vue/new_vue.html#%E4%B8%89%E3%80%81%E7%BB%93%E8%AE%BA)

new Vue 的时候调用会调用 init 方法
定义 set、get 、delete、watch 等方法
定义 on、off、emit、off 等事件
定义 update、forceUpdate、destroy 生命周期
调用 mount 进行页面的挂载
定义 updateComponent 更新函数
执行 render 生成虚拟 DOM
update 将虚拟 DOM 生成真实 DOM 结构，并且渲染到页面中

## [请描述下你对 vue 生命周期的理解？](https://vue3js.cn/interview/vue/lifecycle.html#%E4%B8%80%E3%80%81%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E6%98%AF%E4%BB%80%E4%B9%88)

### 生命周期是什么

其基本涵义可以通俗地理解为“从摇篮到坟墓”的整个过程在 Vue 中实例从创建到销毁的过程就是生命周期

### 生命周期有哪些

beforeCreate 组件实例创建前
created 组件实例创建后
beforeMount 组件挂载到实例前
mounted 组件挂载到实例后
beforeUpdate 组件数据发生变化更新前
updated 组件数据更新后
beforeDestroy 组件实例销毁前
destroyed 组件实例销毁后

### 生命周期整体流程

- ##### beforeCreate

  初始化 vue 实例，进行数据观测

- ##### created

  此时 vm.el 并没有被创建
  可调用 methods 中的方法，访问和修改 data 数据触发响应式渲染 dom，可通过 computed 和 watch 完成数据计算

- ##### beforeMount

  在此阶段可获取到 vm.el
  此阶段 vm.el 虽已完成 DOM 初始化，但并未挂载在 el 选项上

- ##### mounted

  vm.el 已完成 DOM 的挂载与渲染，此刻打印 vm.el，发现之前的挂载点及内容已被替换成新的 DOM

- ##### beforeUpdate

  此时 view 层还未更新
  若在 beforeUpdate 中再次修改数据，不会再次触发更新方法

- ##### updated

  完成 view 层的更新
  若在 updated 中再次修改数据，会再次触发更新方法（beforeUpdate、updated）

- ##### beforeDestroy

  实例被销毁前调用，此时实例属性与方法仍可访问

- ##### destroyed
  完全销毁一个实例。可清理它与其它实例的连接，解绑它的全部指令及事件监听器
  并不能清除 DOM，仅仅销毁实例

## [v-if 和 v-for 的优先级是什么？](https://vue3js.cn/interview/vue/if_for.html#%E4%BA%8C%E3%80%81%E4%BC%98%E5%85%88%E7%BA%A7)

在进行 if 判断的时候，v-for 是比 v-if 先进行判断，v-for 优先级比 v-if 高

### 为什么 v-if 和 v-for 不建议一起用

每次渲染都会先循环再进行条件判断带来性能方面的浪费
可以在外层嵌套 template 并在这一层进行 v-if 判断，然后在内部进行 v-for 循环
如果条件出现在循环内部，可通过计算属性 computed 提前过滤掉那些不需要显示的项

## [SPA 首屏加载速度慢的怎么解决？](https://vue3js.cn/interview/vue/first_page_time.html#%E4%B8%80%E3%80%81%E4%BB%80%E4%B9%88%E6%98%AF%E9%A6%96%E5%B1%8F%E5%8A%A0%E8%BD%BD)

### SPA 加载慢的原因

网络延时问题
资源文件体积是否过大
资源是否重复发送请求去加载了
加载脚本的时候，渲染内容堵塞了

### SPA 加载慢的解决方案

- ##### 图片资源的压缩
  对页面上使用到的 icon，可以使用在线字体图标，或者雪碧图，将众多小图标合并到同一张图上，用以减轻 http 请求压力
- ##### UI 框架按需加载
  用到的组件按需加载
- ##### 减小入口文件体积
  常用的手段是路由懒加载，把不同路由对应的组件分割成不同的代码块，待路由被请求的时候会单独打包路由，使得入口文件变小，加载速度大大增加，
  在 vue-router 配置路由的时候，采用动态加载路由的形式，以函数的形式加载路由，这样就可以把各自的路由文件分别打包，只有在解析给定的路由时，才会加载路由组件
- ##### 组件重复打包
  在 webpack 的 config 文件中，修改 CommonsChunkPlugin 的配置，使用多次的包抽离出来，放进公共依赖文件，避免了重复加载组件
- ##### 静态资源本地缓存
  后端采用 HTTP 缓存
  前端合理利用 localStorage
- ##### 开启 GZip 压缩
  安装 compression-webpack-plugin
  在 vue.congig.js 中引入并修改 webpack 配置
- ##### 使用 SSR
  也就是服务端渲染，组件或页面通过服务器生成 html 字符串，再发送到浏览器，
  vue 应用建议使用 Nuxt.js 实现服务端渲染

## [为什么 data 属性是一个函数而不是一个对象？](https://vue3js.cn/interview/vue/data.html#%E4%B8%89%E3%80%81%E5%8E%9F%E7%90%86%E5%88%86%E6%9E%90)

vue 组件可能会有很多个实例，采用函数返回一个全新 data 形式，使每个实例对象的数据不会受到其他实例对象数据的污染
根实例对象 data 可以是对象也可以是函数（根实例是单例），不会产生数据污染情况
组件实例对象 data 必须为函数，目的是为了防止多个组件实例对象之间共用一个 data，产生数据污染。采用函数的形式，initData 时会将其作为工厂函数都会返回全新 data 对象

## [Vue 中给对象添加新属性界面不刷新？](https://vue3js.cn/interview/vue/data_object_add_attrs.html#%E4%B8%89%E3%80%81%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88)

原因：
vue2 是用过 Object.defineProperty 实现数据响应式
当我们访问属性或者设置属性值的时候都能够触发 setter 与 getter
但是我们添加新属性的时候，却无法触发事件属性的拦截
原因是新增的属性，并没有通过 Object.defineProperty 设置成响应式数据

解决方案：
如果为对象添加少量的新属性，可以直接采用 Vue.set()
如果需要为新对象添加大量的新属性，则通过 Object.assign()创建新对象
如果你实在不知道怎么操作时，可采取$forceUpdate()进行强制刷新 (不建议)

## [Vue 中组件和插件有什么区别？](https://vue3js.cn/interview/vue/components_plugin.html#%E4%B8%89%E3%80%81%E4%B8%A4%E8%80%85%E7%9A%84%E5%8C%BA%E5%88%AB)

组件 (Component) 是用来构成你的 App 的业务模块，它的目标是 App.vue
插件 (Plugin) 是用来增强你的技术栈的功能模块，它的目标是 Vue 本身，比如指令，vue-router
简单来说，插件就是指对 Vue 的功能的增强或补充

## [组件间通信的方案](https://vue3js.cn/interview/vue/communication.html#%E4%B8%89%E3%80%81%E7%BB%84%E4%BB%B6%E9%97%B4%E9%80%9A%E4%BF%A1%E7%9A%84%E6%96%B9%E6%A1%88)

- 通过 props 传递(父传子)
- 通过 $emit 触发自定义事件(子传父)
- 使用 ref(父使用子)
- EventBus(兄弟间)
- \$parent 或$root(兄弟间)
- attrs 与 listeners(祖传后)
- Provide 与 Inject(祖传后)
- Vuex(复杂关系)

## [说说你对双向绑定的理解？](https://vue3js.cn/interview/vue/bind.html#%E4%B8%80%E3%80%81%E4%BB%80%E4%B9%88%E6%98%AF%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A)

### 什么是双向绑定

就是把 Model 绑定到 View
当我们用 JavaScript 代码更新 Model 时，View 就会自动更新
用户更新了 View，Model 的数据也自动被更新了

### 双向绑定的原理是什么

##### MVVM 模型的核心功能就是数据双向绑定

- 数据层（Model）：应用的数据及业务逻辑
- 视图层（View）：应用的展示效果，各类 UI 组件
- 业务逻辑层（ViewModel）：框架封装的核心，它负责将数据与视图关联起来

##### ViewModel 的主要职责是

- 数据变化后更新视图
- 视图变化后更新数据

##### ViewModel 由监听器和解析器组成

- 监听器（Observer）：对所有数据的属性进行监听
- 解析器（Compiler）：对每个元素节点的指令进行扫描跟解析,根据指令模板替换数据,以及绑定相应的更新函数

### 实现双向绑定

##### 以 Vue 为例

- new Vue()首先执行初始化，对 data 执行响应化处理，这个过程发生 Observe 中
- 同时对模板执行编译，找到其中动态绑定的数据，从 data 中获取并初始化视图，这个过程发生在 Compile 中
- 同时定义⼀个更新函数和 Watcher，将来对应数据变化时 Watcher 会调用更新函数
- 由于 data 的某个 key 在⼀个视图中可能出现多次，所以每个 key 都需要⼀个管家 Dep 来管理多个 Watcher
- 将来 data 中数据⼀旦发生变化，会首先找到对应的 Dep，通知所有 Watcher 执行更新函数

## [Vue 中的$nextTick 有什么作用？](https://vue3js.cn/interview/vue/nexttick.html#%E4%B8%80%E3%80%81nexttick%E6%98%AF%E4%BB%80%E4%B9%88)

Vue 在更新 DOM 时是异步执行的。当数据发生变化，Vue 将开启一个异步更新队列，视图需要等队列中所有数据变化完成之后，再统一进行更新。
在修改数据之后立即使用这个方法，获取更新后的 DOM

## [说说你对 vue 的 mixin 的理解，有什么应用场景？](https://vue3js.cn/interview/vue/mixin.html#%E4%B8%80%E3%80%81mixin%E6%98%AF%E4%BB%80%E4%B9%88)

Mixin 是面向对象程序设计语言中的类，提供了方法的实现。其他类可以访问 mixin 类的方法而不必成为其子类
Mixin 类通常作为功能模块使用，在需要该功能时“混入”，有利于代码复用又避免了多继承的复杂
Mixin 本质其实就是一个 js 对象，它可以包含我们组件中任意功能选项，如 data、components、methods、created、computed 等等

## [说说你对 slot 的理解？slot 使用场景有哪些？](https://vue3js.cn/interview/vue/slot.html#%E4%B8%80%E3%80%81slot%E6%98%AF%E4%BB%80%E4%B9%88)

是 Web 组件内的一个占位符，该占位符可以在后期使用自己的标记语言填充
通过插槽可以让用户可以拓展组件，去更好地复用组件和对其做定制化处理

#### slot 可以分来以下三种：

- 默认插槽
- 具名插槽
- 作用域插槽

## [Vue.observable 你有了解过吗？说说看？](https://vue3js.cn/interview/vue/observable.html#%E4%B8%80%E3%80%81observable-%E6%98%AF%E4%BB%80%E4%B9%88)

Vue.observable，让一个对象变成响应式数据。Vue 内部会用它来处理 data 函数返回的对象
返回的对象可以直接用于渲染函数和计算属性内，并且会在发生变更时触发相应的更新。也可以作为最小化的跨组件状态存储器

#### 使用场景

在非父子组件通信时，可以使用通常的 bus 或者使用 vuex，但是实现的功能不是太复杂，而使用上面两个又有点繁琐。这时，observable 就是一个很好的选择

- 创建一个 js 文件:创建 state 对象，使用 observable 让 state 对象可响应
- 在组件中，引入 state 对象来使用

## [你知道 vue 中 key 的原理吗？说说你对它的理解？](https://vue3js.cn/interview/vue/key.html#%E4%B8%80%E3%80%81key%E6%98%AF%E4%BB%80%E4%B9%88)

key 是给每一个 vnode 的唯一 id，也是 diff（差分算法） 的一种优化策略，可以根据 key，更准确， 更快的找到对应的 vnode 节点。

插入数据时,因为 diff 的原因，
如果没有 key 将会影响引起多个 dom 进行更新并进行插入操作，
而如果有 key，就不会引起其他 item 的 dom 更新只会进行插入操作。

## [说说你对 keep-alive 的理解是什么？](https://vue3js.cn/interview/vue/keepalive.html#%E4%B8%80%E3%80%81keep-alive-%E6%98%AF%E4%BB%80%E4%B9%88)

- keep-alive 是 vue 中的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染 DOM
- keep-alive 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们
- 会多出两个生命钩子 activated 与 deactivated

  - beforeRouteEnter > beforeCreate > created> mounted > **activated** > ... ... > beforeRouteLeave > **deactivated**

#### 使用原则

当我们在某些场景下不需要让页面重新加载时我们可以使用 keepalive

## [Vue 常用的修饰符有哪些有什么应用场景？](https://vue3js.cn/interview/vue/modifier.html#%E4%B8%80%E3%80%81%E4%BF%AE%E9%A5%B0%E7%AC%A6%E6%98%AF%E4%BB%80%E4%B9%88)

### vue 中修饰符分为以下五种

- 表单修饰符
- 事件修饰符
- 鼠标按键修饰符
- 键值修饰符
- v-bind 修饰符

#### 表单修饰符

**lazy**
在我们填完信息，光标离开标签的时候，才会将值赋予给 value，也就是在
**change**
事件之后再进行信息同步
**trim**
自动过滤用户输入的首空格字符，而中间的空格不会过滤
**number**
自动将用户的输入值转为数值类型，但如果这个值无法被 parseFloat 解析，则会返回原来的值

#### 事件修饰符

事件修饰符是对事件捕获以及目标进行了处理，有如下修饰符：

**stop**
阻止了事件冒泡，相当于调用了 event.stopPropagation 方法
**prevent**
阻止了事件的默认行为，相当于调用了 event.preventDefault 方法
**self**
只当在 event.target 是当前元素自身时触发处理函数
**once**
绑定了事件以后只能触发一次，第二次就不会触发
**capture**
使事件触发从包含这个元素的顶层开始往下触发
**passive**
在移动端，当我们在监听元素滚动事件的时候，会一直触发 onscroll 事件会让我们的网页变卡，因此我们使用这个修饰符的时候，相当于给 onscroll 事件整了一个.lazy 修饰符
**native**
让组件变成像 html 内置标签那样监听根元素的原生事件，否则组件上使用 v-on 只会监听自定义事件

#### 鼠标按钮修饰符

鼠标按钮修饰符针对的就是左键、右键、中键点击，有如下：

**left**
左键点击
**right**
右键点击
**middle**
中键点击

#### 键盘修饰符

键盘修饰符是用来修饰键盘事件（onkeyup，onkeydown）的，keyCode 存在很多，但 vue 为我们提供了别名，分为以下两种：

**普通键**
enter、tab、delete、space、esc、up...
**系统修饰键**
ctrl、alt、meta、shift...

#### v-bind 修饰符

v-bind 修饰符主要是为属性进行操作，用来分别有如下：

**async**
能对 props 进行一个双向绑定
**prop**
设置自定义标签属性，避免暴露数据，防止污染 HTML 结构
**camel**
将命名变为驼峰命名法，如将 view-Box 属性名转换为 viewBox

### 应用场景

根据每一个修饰符的功能，我们可以得到以下修饰符的应用场景：

- **stop**：阻止事件冒泡
- **native**：绑定原生事件
- **once**：事件只执行一次
- **self**：将事件绑定在自身身上，相当于阻止事件冒泡
- **prevent**：阻止默认事件
- **caption**：用于事件捕获
- **once**：只触发一次
- **keyCode**：监听特定键盘按下
- **right**：右键

## [你有写过自定义指令吗？自定义指令的应用场景有哪些？](https://vue3js.cn/interview/vue/directive.html#%E4%B8%80%E3%80%81%E4%BB%80%E4%B9%88%E6%98%AF%E6%8C%87%E4%BB%A4)

- 表单防止重复提交
- 图片懒加载
- 一键 Copy 的功能

## [Vue 中的过滤器了解吗？过滤器的应用场景有哪些？](https://vue3js.cn/interview/vue/filter.html#%E4%B8%80%E3%80%81%E6%98%AF%E4%BB%80%E4%B9%88)

过滤器实质不改变原始数据，只是对数据进行加工处理后返回过滤后的数据再进行调用处理，我们也可以理解其为一个纯函数

### 应用场景

平时开发中，需要用到过滤器的地方有很多，比如单位转换、数字打点、文本格式化、时间格式化之类的等

ps: Vue3 中已废弃 filter

## [什么是虚拟 DOM？如何实现一个虚拟 DOM？说说你的思路？](https://vue3js.cn/interview/vue/vnode.html#%E4%B8%80%E3%80%81%E4%BB%80%E4%B9%88%E6%98%AF%E8%99%9A%E6%8B%9Fdom)

从 React 到 Vue ，虚拟 DOM 为这两个框架都带来了跨平台的能力

实际上它只是一层对真实 DOM 的抽象，以 JavaScript 对象 (VNode 节点) 作为基础的树，用对象的属性来描述节点，最终可以通过一系列操作使这棵树映射到真实环境上

在 Javascript 对象中，虚拟 DOM 表现为一个 Object 对象。并且最少包含标签名 、属性 和 子元素对象三个属性，不同框架对这三个属性的名命可能会有差别。

创建虚拟 DOM 就是为了更好将虚拟的节点渲染到页面视图中，所以虚拟 DOM 对象的节点与真实 DOM 的属性一一照应

在 vue 中同样使用到了虚拟 DOM 技术

### 如何得到虚拟 DOM

定义真实 DOM，实例化 vue，观察 render 的 render，我们能得到虚拟 DOM

## [你了解 vue 的 diff 算法吗？说说看](https://vue3js.cn/interview/vue/diff.html#%E4%B8%80%E3%80%81%E6%98%AF%E4%BB%80%E4%B9%88)

diff 算法是一种通过同层的树节点进行比较的高效算法
其有两个特点：

- 比较只会在同层级进行, 不会跨层级比较
- 在 diff 比较的过程中，循环从两边向中间比较

diff 算法在很多场景下都有应用，在 vue 中，作用于虚拟 dom 渲染成真实 dom 的新旧 VNode 节点比较

## [Vue 项目中有封装过 axios 吗？主要是封装哪方面的？](https://vue3js.cn/interview/vue/axios.html#%E4%B8%80%E3%80%81axios%E6%98%AF%E4%BB%80%E4%B9%88)

### axios 是什么

axios 是一个轻量的 HTTP 客户端，基于 XMLHttpRequest 服务来执行 HTTP 请求，支持丰富的配置，支持 Promise，支持浏览器端和 Node.js 端。

### 为什么要封装

axios 的 API 很友好，完全可以很轻松地在项目中直接使用。
不过随着项目规模增大，如果每发起一次 HTTP 请求，就要把这些比如设置超时时间、设置请求头、根据项目环境判断使用哪个请求地址、错误处理等等操作，都需要写一遍
这种重复劳动不仅浪费时间，而且让代码变得冗余不堪，难以维护。为了提高我们的代码质量，我们应该在项目中二次封装一下 axios 再使用

### 如何封装

封装的同时，你需要和 后端协商好一些约定，请求头，状态码，请求超时时间.......

- **设置接口请求前缀**:根据开发、测试、生产环境的不同，前缀需要加以区分
- **请求头** : 来实现一些具体的业务，必须携带一些参数才可以请求(例如：会员业务)
- **状态码**: 根据接口返回的不同 status ， 来执行不同的业务，这块需要和后端约定好
- **请求方法**:根据 get、post 等方法进行一个再次封装，使用起来更为方便
- **请求拦截器**: 根据请求的请求头设定，来决定哪些请求可以访问
- **响应拦截器**: 这块就是根据 后端`返回来的状态码判定执行不同业务

## [你了解 axios 的原理吗？有看过它的源码吗？](https://vue3js.cn/interview/vue/axiosCode.html#%E4%B8%80%E3%80%81axios%E7%9A%84%E4%BD%BF%E7%94%A8)

## [SSR 解决了什么问题？有做过 SSR 吗？你是怎么做的？](https://vue3js.cn/interview/vue/ssr.html#%E4%B8%80%E3%80%81%E6%98%AF%E4%BB%80%E4%B9%88)

### 是什么

服务端渲染，指由服务侧完成页面的 HTML 结构拼接的页面处理技术，发送到浏览器，然后为其绑定状态与事件，成为完全可交互页面的过程

### 解决了什么

- seo：搜索引擎优先爬取页面 HTML 结构，使用 ssr 时，服务端已经生成了和业务想关联的 HTML，有利于 seo
- 首屏呈现渲染：用户无需等待页面所有 js 加载完成就可以看到页面视图（压力来到了服务器，所以需要权衡哪些用服务端渲染，哪些交给客户端）

但是使用 SSR 同样存在以下的缺点：整个项目的复杂度，库的支持性，代码兼容，性能问题，服务器负载变大

## [说下你的 vue 项目的目录结构，如果是大型项目你该怎么划分结构和划分组件呢？](https://vue3js.cn/interview/vue/structure.html#%E4%B8%80%E3%80%81%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E5%88%92%E5%88%86)

使用 vue 构建项目，项目结构清晰会提高开发效率，熟悉项目的各种配置同样会让开发效率更高
在划分项目结构的时候，需要遵循一些基本的原则：

- 文件夹和文件夹内部文件的语义一致性
- 单一入口/出口
- 就近原则，紧耦合的文件应该放到一起，且应以相对路径引用
- 公共的文件应该以绝对路径的方式从根目录引用
- /src 外的文件不应该被引入

## [vue 要做权限管理该怎么做？如果控制到按钮级别的权限怎么做？](https://vue3js.cn/interview/vue/permission.html#%E4%B8%80%E3%80%81%E6%98%AF%E4%BB%80%E4%B9%88)

权限是对特定资源的访问许可，所谓权限控制，也就是确保用户只能访问到被分配的资源

### 如何做

前端权限控制可以分为四个方面：

- **接口权限：**
  - 接口权限目前一般采用 jwt 的形式来验证
- **按钮权限：**
  - 可以用 v-if 判断
  - 通过自定义指令进行按钮权限的判断
- **菜单权限**
  - 菜单与路由分离，菜单由后端返回
  - 菜单和路由都由后端返回
- **路由权限**
  - 初始化即挂载全部路由，并且在路由上标记相应的权限信息，每次路由跳转前做校验
  - 登录后，获取用户的权限信息，然后筛选有权限访问的路由，在全局路由守卫里进行调用 addRoutes 添加路由

## [Vue 项目中你是如何解决跨域的呢？](https://vue3js.cn/interview/vue/cors.html#%E4%B8%80%E3%80%81%E8%B7%A8%E5%9F%9F%E6%98%AF%E4%BB%80%E4%B9%88)

### 跨域是什么

跨域本质是浏览器基于同源策略的一种安全手段，同源具有以下三个相同点，协议相同，主机相同，端口相同
反之非同源请求，也就是协议、端口、主机其中一项不相同的时候，这时候就会产生跨域

一定要注意跨域是浏览器的限制，你用抓包工具抓取接口数据，是可以看到接口已经把数据返回回来了，只是浏览器的限制，你获取不到数据。用 postman 请求接口能够请求到数据。这些再次印证了跨域是浏览器的限制

### 如何解决

而在 vue 项目中，我们主要针对 CORS 或 Proxy 这两种方案进行展开

#### CORS

CORS 是一个系统，它由一系列传输的 HTTP 头组成，这些 HTTP 头决定浏览器是否阻止前端 JavaScript 代码获取跨域请求的响应
CORS 实现起来非常方便，只需要增加一些 HTTP 头，让服务器能声明允许的访问来源
只要后端实现了 CORS，就实现了跨域

以 koa 框架举例,添加中间件，直接设置 Access-Control-Allow-Origin 响应头

### Proxy

- 如果是通过 vue-cli 脚手架工具搭建项目，我们可以通过 webpack 为我们起一个本地服务器作为请求的代理对象
- 此外，还可通过服务端实现代理请求转发，例如 express 框架
- 通过配置 nginx 实现代理

## [vue 项目本地开发完成后部署到服务器后报 404 是什么原因呢？](https://vue3js.cn/interview/vue/404.html#%E4%B8%80%E3%80%81%E5%A6%82%E4%BD%95%E9%83%A8%E7%BD%B2)

### 为什么 history 模式下有问题

Vue 是属于单页应用，而 SPA 是一种网络应用程序或网站的模型，所有用户交互是通过动态重写当前页面，不管我们应用有多少页面，构建物都只会产出一个 index.html
当我们在地址栏输入 www.xxx.com 时，这时会打开我们 dist 目录下的 index.html 文件，然后我们在跳转路由进入到 www.xxx.com/login
关键在这里，当我们在 website.com/login 页执行刷新操作，nginx location 是没有相关配置的，所以就会出现 404 的情况

### 为什么 hash 模式下没有问题

router hash 模式我们都知道是用符号#表示的，如 website.com/#/login, hash 的值为 #/login
它的特点在于：hash 虽然出现在 URL 中，但不会被包括在 HTTP 请求中，对服务端完全没有影响，因此改变 hash 不会重新加载页面
hash 模式下，仅 hash 符号之前的内容会被包含在请求中，如 website.com/#/login 只有 website.com 会被包含在请求中 ，因此对于服务端来说，即使没有配置 location，也不会返回 404 错误

### 解决方案

产生问题的本质是因为我们的路由是通过 JS 来执行视图切换的，
当我们进入到子路由时刷新页面，web 容器没有相对应的页面此时会出现 404
所以我们只需要配置将任意页面都重定向到 index.html，把路由交由前端处理

## [你是怎么处理 vue 项目中的错误的？](https://vue3js.cn/interview/vue/error.html#%E4%B8%80%E3%80%81%E9%94%99%E8%AF%AF%E7%B1%BB%E5%9E%8B)

## [vue3 有了解过吗？能说说跟 vue2 的区别吗？](https://vue3js.cn/interview/vue/vue3_vue2.html#%E4%B8%80%E3%80%81vue3%E4%BB%8B%E7%BB%8D)

### 速度更快

- 重写了虚拟 Dom 实现
- 编译模板的优化
- 更高效的组件初始化
- undate 性能提高 1.3~2 倍
- SSR 速度提高了 2~3 倍

### 体积更小

- 通过 webpack 的 tree-shaking 功能，可以将无用模块“剪辑”，仅打包需要的。
  对开发人员，能够对 vue 实现更多其他的功能，而不必担忧整体体积过大。
  对使用者，打包出来的包体积变小了。

### 更易维护

- **compositon Api**
  - 可与现有的 Options API 一起使用
  - 灵活的逻辑组合与复用
  - Vue3 模块可以和其他框架搭配使用
- **更好的 Typescript 支持**
- **编译器重写**

### 更接近原生

- 可以自定义渲染 API

### 更易使用

- 响应式 Api 暴露出来

### Vue3 新增特性

- framents
- Teleport
- composition Api
- createRenderer

.....

## [Vue3.0 的设计目标是什么？做了哪些优化？](https://vue3js.cn/interview/vue3/goal.html#%E4%B8%80%E3%80%81%E8%AE%BE%E8%AE%A1%E7%9B%AE%E6%A0%87)

列举一下 Vue3 之前我们或许会面临的问题

- 随着功能的增长，复杂组件的代码变得越来越难以维护
- 缺少一种比较「干净」的在多个组件之间提取和复用逻辑的机制
- 类型推断不够友好
- bundle 的时间太久了

而 Vue3 经过长达两三年时间的筹备

- 更小
- 更快
- TypeScript 支持
- API 设计一致性
- 提高自身可维护性
- 开放更多底层功能

一句话概述，就是更小更快更友好了

......

## [Vue3.0 性能提升主要是通过哪几方面体现的？](https://vue3js.cn/interview/vue3/performance.html#%E4%B8%80%E3%80%81%E7%BC%96%E8%AF%91%E9%98%B6%E6%AE%B5)

### 编译阶段

- **diff 算法优化**
  vue3 在 diff 算法中相比 vue2 增加了静态标记,关于这个静态标记，其作用是为了会发生变化的地方添加一个 flag 标记，下次发生变化的时候直接找该地方进行比较
- **静态提升**
  Vue3 中对不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用
- **事件监听缓存**
  默认情况下绑定事件行为会被视为动态绑定，所以每次都会去追踪它的变化
- **SSR 优化**
  当静态内容大到一定量级时候，会用 createStaticVNode 方法在客户端去生成一个 static node，这些静态 node，会被直接 innerHtml，就不需要创建对象，然后根据对象渲染

### 源码体积

相比 Vue2，Vue3 整体体积变小了，除了移出一些不常用的 API，再重要的是 Tree shanking
任何一个函数，如 ref、reavtived、computed 等，仅仅在用到的时候才打包，没用到的模块都被摇掉，打包的整体体积变小

### 响应式系统

vue2 中采用 defineProperty 来劫持整个对象，然后进行深度遍历所有属性，给每个属性添加 getter 和 setter，实现响应式
vue3 采用 proxy 重写了响应式系统，因为 proxy 可以对整个对象进行监听，所以不需要深度遍历

- 可以监听动态属性的添加
- 可以监听到数组的索引和数组 length 属性
- 可以监听删除属性

关于这两个 API 具体的不同，我们下篇文章会进行一个更加详细的介绍

## [Vue3.0 里为什么要用 Proxy API 替代 defineProperty API ？](https://vue3js.cn/interview/vue3/proxy.html#%E4%B8%80%E3%80%81object-defineproperty)

Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象,通过 defineProperty 两个属性，get 及 set 实现响应式

有以下问题

- 检测不到对象属性的添加和删除
- 数组 API 方法无法监听到
- 需要对每个属性进行遍历监听，如果嵌套对象，需要深层监听，造成性能问题

Proxy 的监听是针对一个对象的，那么对这个对象的所有操作会进入监听操作，这就完全可以代理所有属性了

## [Vue3.0 所采用的 Composition Api 与 Vue2.x 使用的 Options Api 有什么不同？](https://vue3js.cn/interview/vue3/composition.html#%E5%BC%80%E5%A7%8B%E4%B9%8B%E5%89%8D)

### Options Api

通常使用 Vue2 开发的项目，普遍会存在以下问题：

- 代码的可读性随着组件变大而变差
- 每一种代码复用的方式，都存在缺点
- TypeScript 支持有限

以上通过使用 Composition Api 都能迎刃而解

### Composition Api

在 Vue3 Composition API 中，组件根据逻辑功能来组织的，一个功能所定义的所有 API 会放在一起（更加的高内聚，低耦合）
即使项目很大，功能很多，我们都能快速的定位到这个功能所用到的所有 API

### 总结

- 在逻辑组织和逻辑复用方面，Composition API 是优于 Options API
- 因为 Composition API 几乎是函数，会有更好的类型推断。
- Composition API 对 tree-shaking 友好，代码也更容易压缩
- Composition API 中见不到 this 的使用，减少了 this 指向不明的情况
- 如果是小型组件，可以继续使用 Options API，也是十分友好的

## [说说 Vue 3.0 中 Treeshaking 特性？举例说明一下？](https://vue3js.cn/interview/vue3/treeshaking.html#%E4%B8%80%E3%80%81%E6%98%AF%E4%BB%80%E4%B9%88)

Tree shaking 是一种通过清除多余代码方式来优化项目打包体积的技术
单来讲，就是在保持代码运行结果不变的前提下，去除无用的代码

如果把代码打包比作制作蛋糕，传统的方式是把鸡蛋（带壳）全部丢进去搅拌，然后放入烤箱，最后把（没有用的）蛋壳全部挑选并剔除出去
而 treeshaking 则是一开始就把有用的蛋白蛋黄（import）放入搅拌，最后直接作出蛋糕

也就是说，tree shaking 其实是找出使用的代码

通过 Tree shaking，Vue3 给我们带来的好处是：

- 减少程序体积（更小）
- 减少程序执行时间（更快）
- 便于将来对程序架构进行优化（更友好）

## [用 Vue3.0 写过组件吗？如果想实现一个 Modal 你会怎么设计？](https://vue3js.cn/interview/vue3/modal_component.html#%E4%B8%80%E3%80%81%E7%BB%84%E4%BB%B6%E8%AE%BE%E8%AE%A1)

实现一个 Modal 组件，首先确定需要完成的内容：

- 遮罩层
- 标题内容
- 主体内容
- 确定和取消按钮

主体内容需要灵活，所以可以是字符串，也可以是一段 html 代码
特点是它们在当前 vue 实例之外独立存在，通常挂载于 body 之上
除了通过引入 import 的形式，我们还可通过 API 的形式进行组件的调用
还可以包括配置全局样式、国际化、与 typeScript 结合

## []()
