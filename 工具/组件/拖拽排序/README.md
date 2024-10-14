## 拖拽排序组件

**安装**

```
// npm 安装要指定版本
npm i vuedraggable@4.0.3
```

**组件本体**

```
// html
<draggable class="fy" v-model="d.list" tag="draggabledom" item-key="sortIndex" handle=".moveclass" :animation="100" @change="sortChange">
  <template #item="{ element }">
    <div class="br8 mt8 p8 fc hp moveclass" style="background: #ececec">{{ element.name }}</div>
  </template>
</draggable>
```

```
// js
import { reactive } from 'vue';
import draggable from 'vuedraggable';

const d = reactive({
  list: [
    { name: 'dom1', sortIndex: 1 },
    { name: 'dom2', sortIndex: 2 },
    { name: 'dom3', sortIndex: 3 },
  ],
});

const sortChange = () => {
  console.log(d.list);
};
```

**父组件使用**

```
// html
<draggable> </draggable>
```

```
// js
import draggable from '@/components/draggable.vue';
```
