# [参考资料](https://vue3js.cn/interview/)

## [VUE 是什么](https://vue3js.cn/interview/vue/vue.html#%E4%BA%8C%E3%80%81vue%E6%98%AF%E4%BB%80%E4%B9%88)

Vue 是一个用于创建用户界面的开源 JavaScript 框架，也是一个用于创建单页面应用的 Web 应用框架。
Vue 所关注的核心是 MVC 模式中的视图层，同时它也能方便地获取数据更新，并通过组件内部特定的方法实现视图与模型的交互。

## [VUE 的核心特性](https://vue3js.cn/interview/vue/vue.html#%E4%B8%89%E3%80%81vue%E6%A0%B8%E5%BF%83%E7%89%B9%E6%80%A7)

数据驱动(MVVM)，model 模型层，view 视图层，viewModel 视图模型层。
模型层负责处理业务逻辑以及和服务器端进行交互，
视图层负责将数据模型转换为 UI 进行页面展示，
视图模型层负责监听模型层的数据变化，将数据的变化映射到视图层，最终实现数据的双向绑定，是 Model 和 View 之间的通信桥梁。

## [组件化]()

降低整个系统的耦合度，可以替换不同的组件快速完成需求
调试方便，在出现问题的时候，可以用排除法快速定位问题
提高可维护性，由于每个组件的职责单一在系统中是被复用的，所以对代码进行优化可获得系统的整体升级

## [Vue 跟传统开发的区别](https://vue3js.cn/interview/vue/vue.html#%E5%9B%9B%E3%80%81vue%E8%B7%9F%E4%BC%A0%E7%BB%9F%E5%BC%80%E5%8F%91%E7%9A%84%E5%8C%BA%E5%88%AB)

Jquery 操作 DOM，Vue 所有的界面事件，都是只去操作数据的，Vue 所有界面的变动，都是根据数据自动绑定出来的

## [什么是 SPA](https://vue3js.cn/interview/vue/spa.html#%E4%B8%80%E3%80%81%E4%BB%80%E4%B9%88%E6%98%AFspa)

单页应用 SPA 是一种网络应用程序或网站的模型，它通过动态重写当前页面来与用户交互，这种方法避免了页面之间切换打断用户体验在单页应用中，所有必要的代码（HTML、JavaScript 和 CSS）都通过单个页面的加载而检索，或者根据需要（通常是为响应用户操作）动态装载适当的资源并添加到页面页面在任何时间点都不会重新加载，也不会将控制转移到其他页面举个例子来讲就是一个杯子，早上装的牛奶，中午装的是开水，晚上装的是茶，我们发现，变的始终是杯子里的内容，而杯子始终是那个杯子。
我们熟知的 JS 框架如 react,vue,angular,ember 都属于 SPA。

## [SPA 和 MPA 的区别](https://vue3js.cn/interview/vue/spa.html#%E4%BA%8C%E3%80%81spa%E5%92%8Cmpa%E7%9A%84%E5%8C%BA%E5%88%AB)

在 MPA 中，每个页面都是一个主页面，都是独立的，当我们在访问另一个页面的时候，都需要重新加载 html、css、js 文件

#### 单页应用优缺点

- ##### 优点
  具有桌面应用的即时性、网站的可移植性和可访问性
  用户体验好、快，内容的改变不需要重新加载整个页面
  良好的前后端分离，分工更明确
- ##### 缺点
  不利于搜索引擎的抓取
  首次渲染速度相对较慢

## [实现一个 SPA](https://vue3js.cn/interview/vue/spa.html#%E4%B8%89%E3%80%81%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AAspa)

监听地址栏中 hash 变化驱动界面变化
用 pushsate 记录浏览器的历史，驱动界面发送变化

## [v-show 与 v-if 的共同点](https://vue3js.cn/interview/vue/show_if.html#%E4%B8%80%E3%80%81v-show%E4%B8%8Ev-if%E7%9A%84%E5%85%B1%E5%90%8C%E7%82%B9)

vue 中 v-show 与 v-if 的作用效果是相同的(不含 v-else)，都能控制元素在页面是否显示

## [v-show 与 v-if 的区别](https://vue3js.cn/interview/vue/show_if.html#%E4%BA%8C%E3%80%81v-show%E4%B8%8Ev-if%E7%9A%84%E5%8C%BA%E5%88%AB)

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

## [v-show 与 v-if 的使用场景](https://vue3js.cn/interview/vue/show_if.html#%E5%9B%9B%E3%80%81v-show%E4%B8%8Ev-if%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF)

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

## [生命周期是什么](https://vue3js.cn/interview/vue/lifecycle.html#%E4%B8%80%E3%80%81%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E6%98%AF%E4%BB%80%E4%B9%88)

其基本涵义可以通俗地理解为“从摇篮到坟墓”的整个过程在 Vue 中实例从创建到销毁的过程就是生命周期

## [生命周期有哪些](https://vue3js.cn/interview/vue/lifecycle.html#%E4%BA%8C%E3%80%81%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E6%9C%89%E5%93%AA%E4%BA%9B)

beforeCreate 组件实例创建前
created 组件实例创建后
beforeMount 组件挂载到实例前
mounted 组件挂载到实例后
beforeUpdate 组件数据发生变化更新前
updated 组件数据更新后
beforeDestroy 组件实例销毁前
destroyed 组件实例销毁后

## [生命周期整体流程](https://vue3js.cn/interview/vue/lifecycle.html#%E4%B8%89%E3%80%81%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E6%95%B4%E4%BD%93%E6%B5%81%E7%A8%8B)

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

## [v-if 与 v-for 的优先级](https://vue3js.cn/interview/vue/if_for.html#%E4%BA%8C%E3%80%81%E4%BC%98%E5%85%88%E7%BA%A7)

在进行 if 判断的时候，v-for 是比 v-if 先进行判断，v-for 优先级比 v-if 高

## [为什么 v-if 和 v-for 不建议一起用](https://vue3js.cn/interview/vue/if_for.html#%E4%B8%89%E3%80%81%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)

每次渲染都会先循环再进行条件判断带来性能方面的浪费
可以在外层嵌套 template 并在这一层进行 v-if 判断，然后在内部进行 v-for 循环
如果条件出现在循环内部，可通过计算属性 computed 提前过滤掉那些不需要显示的项

## [SPA 加载慢的原因](https://vue3js.cn/interview/vue/first_page_time.html#%E4%BA%8C%E3%80%81%E5%8A%A0%E8%BD%BD%E6%85%A2%E7%9A%84%E5%8E%9F%E5%9B%A0)

网络延时问题
资源文件体积是否过大
资源是否重复发送请求去加载了
加载脚本的时候，渲染内容堵塞了

## [SPA 加载慢的解决方案](https://vue3js.cn/interview/vue/first_page_time.html#%E4%B8%89%E3%80%81%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88)

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

## [Vue 中给对象添加新属性界面不刷新](https://vue3js.cn/interview/vue/data_object_add_attrs.html#%E4%B8%89%E3%80%81%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88)

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

## [什么是双向绑定](https://vue3js.cn/interview/vue/bind.html#%E4%B8%80%E3%80%81%E4%BB%80%E4%B9%88%E6%98%AF%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A)

就是把 Model 绑定到 View
当我们用 JavaScript 代码更新 Model 时，View 就会自动更新
用户更新了 View，Model 的数据也自动被更新了

## [双向绑定的原理是什么](https://vue3js.cn/interview/vue/bind.html#%E4%BA%8C%E3%80%81%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88)

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

## [实现双向绑定]()

##### 以 Vue 为例

- new Vue()首先执行初始化，对 data 执行响应化处理，这个过程发生 Observe 中
- 同时对模板执行编译，找到其中动态绑定的数据，从 data 中获取并初始化视图，这个过程发生在 Compile 中
- 同时定义⼀个更新函数和 Watcher，将来对应数据变化时 Watcher 会调用更新函数
- 由于 data 的某个 key 在⼀个视图中可能出现多次，所以每个 key 都需要⼀个管家 Dep 来管理多个 Watcher
- 将来 data 中数据⼀旦发生变化，会首先找到对应的 Dep，通知所有 Watcher 执行更新函数

## [说说你对$nextTick 的理解](https://vue3js.cn/interview/vue/nexttick.html#%E4%B8%80%E3%80%81nexttick%E6%98%AF%E4%BB%80%E4%B9%88)

Vue 在更新 DOM 时是异步执行的。当数据发生变化，Vue 将开启一个异步更新队列，视图需要等队列中所有数据变化完成之后，再统一进行更新。
在修改数据之后立即使用这个方法，获取更新后的 DOM

## [说说你对 vue 的 mixin 的理解，有什么应用场景](https://vue3js.cn/interview/vue/mixin.html#%E4%B8%80%E3%80%81mixin%E6%98%AF%E4%BB%80%E4%B9%88)

Mixin 是面向对象程序设计语言中的类，提供了方法的实现。其他类可以访问 mixin 类的方法而不必成为其子类
Mixin 类通常作为功能模块使用，在需要该功能时“混入”，有利于代码复用又避免了多继承的复杂
Mixin 本质其实就是一个 js 对象，它可以包含我们组件中任意功能选项，如 data、components、methods、created、computed 等等

## [说说你对 slot 的理解？slot 使用场景有哪些](https://vue3js.cn/interview/vue/slot.html#%E4%B8%80%E3%80%81slot%E6%98%AF%E4%BB%80%E4%B9%88)

是 Web 组件内的一个占位符，该占位符可以在后期使用自己的标记语言填充
通过插槽可以让用户可以拓展组件，去更好地复用组件和对其做定制化处理

#### slot 可以分来以下三种：

- 默认插槽
- 具名插槽
- 作用域插槽

## [Vue.observable 你有了解过吗？说说看](https://vue3js.cn/interview/vue/observable.html#%E4%B8%80%E3%80%81observable-%E6%98%AF%E4%BB%80%E4%B9%88)

Vue.observable，让一个对象变成响应式数据。Vue 内部会用它来处理 data 函数返回的对象
返回的对象可以直接用于渲染函数和计算属性内，并且会在发生变更时触发相应的更新。也可以作为最小化的跨组件状态存储器

#### 使用场景

在非父子组件通信时，可以使用通常的 bus 或者使用 vuex，但是实现的功能不是太复杂，而使用上面两个又有点繁琐。这时，observable 就是一个很好的选择

- 创建一个 js 文件:创建 state 对象，使用 observable 让 state 对象可响应
- 在组件中，引入 state 对象来使用

## [你知道 vue 中 key 的原理吗？说说你对它的理解](https://vue3js.cn/interview/vue/key.html#%E4%B8%80%E3%80%81key%E6%98%AF%E4%BB%80%E4%B9%88)

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

## [Vue 常用的修饰符有哪些有什么应用场景](https://vue3js.cn/interview/vue/modifier.html#%E4%B8%80%E3%80%81%E4%BF%AE%E9%A5%B0%E7%AC%A6%E6%98%AF%E4%BB%80%E4%B9%88)

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

- stop：阻止事件冒泡
- native：绑定原生事件
- once：事件只执行一次
- self ：将事件绑定在自身身上，相当于阻止事件冒泡
- prevent：阻止默认事件
- caption：用于事件捕获
- once：只触发一次
- keyCode：监听特定键盘按下
- right：右键

## [你有写过自定义指令吗？自定义指令的应用场景有哪些？](https://vue3js.cn/interview/vue/directive.html#%E4%B8%80%E3%80%81%E4%BB%80%E4%B9%88%E6%98%AF%E6%8C%87%E4%BB%A4)

- 表单防止重复提交
- 图片懒加载
- 一键 Copy 的功能

## [Vue 中的过滤器了解吗？过滤器的应用场景有哪些？](https://vue3js.cn/interview/vue/filter.html#%E4%B8%80%E3%80%81%E6%98%AF%E4%BB%80%E4%B9%88)

过滤器实质不改变原始数据，只是对数据进行加工处理后返回过滤后的数据再进行调用处理，我们也可以理解其为一个纯函数

### 应用场景

平时开发中，需要用到过滤器的地方有很多，比如单位转换、数字打点、文本格式化、时间格式化之类的等

ps: Vue3 中已废弃 filter

## [什么是虚拟 DOM？如何实现一个虚拟 DOM？说说你的思路](https://vue3js.cn/interview/vue/vnode.html#%E4%B8%80%E3%80%81%E4%BB%80%E4%B9%88%E6%98%AF%E8%99%9A%E6%8B%9Fdom)

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

## []()

## []()

## []()

## []()

## []()

## []()

## []()

## []()
