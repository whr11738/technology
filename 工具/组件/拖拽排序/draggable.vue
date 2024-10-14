<!-- 拖拽排序组件 -->
<template>
  <div>
    <draggable class="fy" v-model="d.list" tag="draggabledom" item-key="sortIndex" handle=".moveclass" :animation="100" @change="sortChange">
      <template #item="{ element }">
        <div class="br8 mt8 p8 fc hp moveclass" style="background: #ececec; cursor: move">{{ element.name }}</div>
      </template>
    </draggable>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, provide } from 'vue';
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
onMounted(() => {});
</script>

<style scoped></style>
