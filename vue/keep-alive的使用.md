### Vue 的 `keep-alive` 详解

`keep-alive` 是 Vue 内置的一个抽象组件，用于 **缓存不活动的组件实例**，避免重复渲染，从而优化性能。

---

#### **核心功能**

1. **组件缓存**  
   被包裹的组件切换时不会被销毁，而是保存在内存中。
2. **状态保留**  
   组件的状态（如数据、DOM 滚动位置等）会被保留。
3. **生命周期钩子**  
   触发专属的 `activated` 和 `deactivated` 钩子。

---

#### **基本用法**

```vue
<template>
  <keep-alive>
    <component :is="currentComponent"></component>
  </keep-alive>
</template>
```

---

#### **常用 Props**

| Prop      | 说明                       | 示例                              |
| --------- | -------------------------- | --------------------------------- |
| `include` | 匹配的组件名会被缓存       | `include="ComponentA,ComponentB"` |
| `exclude` | 匹配的组件名不会被缓存     | `exclude="ComponentC"`            |
| `max`     | 最大缓存实例数（LRU 策略） | `max="5"`                         |

```vue
<keep-alive :include="['Home', 'About']" :max="3">
  <router-view></router-view>
</keep-alive>
```

---

#### **生命周期钩子**

- **`activated`**  
  组件被激活时调用（从缓存重新插入 DOM）。
- **`deactivated`**  
  组件被停用时调用（移出 DOM 但未销毁）。

```javascript
export default {
  activated() {
    console.log('组件被激活');
  },
  deactivated() {
    console.log('组件被停用');
  },
};
```

---

#### **与 Vue Router 结合**

缓存路由组件：

```vue
<template>
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive"></router-view>
</template>
```

路由配置：

```javascript
{
  path: '/home',
  component: Home,
  meta: { keepAlive: true } // 需要缓存
}
```

---

#### **注意事项**

1. **组件命名要求**  
   被缓存的组件必须设置 `name` 选项（用于 `include/exclude` 匹配）。
   setup 语法糖中使用 defineOptions({ name: 'componentName' });
   defineOptions 不需要引入，自带的
2. **动态组件**  
   与 `<component :is="...">` 结合时，切换组件类型会触发缓存。
3. **内存管理**  
   大量缓存可能导致内存占用过高，建议用 `max` 限制。

---

#### **示例场景**

- 缓存表单页面（避免用户输入丢失）
- Tab 切换内容保持状态
- 列表页记住滚动位置

如果需要手动清除缓存，可以通过 `this.$refs.keepAliveRef.cache` 操作（非推荐做法）。
