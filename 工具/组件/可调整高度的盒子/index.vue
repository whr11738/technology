<template>
  <div class="resizable-div" :style="{ height: height + 'px' }">
    <div class="drag-handle" @mousedown="startDrag"></div>
    <div>可调整高度的内容区域</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const height = ref(200); // 初始高度
let isDragging = false;
let startY = 0;

const startDrag = (e) => {
  isDragging = true;
  startY = e.clientY;
  e.preventDefault();
};

const onMouseMove = (e) => {
  if (!isDragging) return;
  const deltaY = e.clientY - startY;
  height.value += deltaY;
  startY = e.clientY;
};

const stopDrag = () => (isDragging = false);

window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mouseup', stopDrag);
</script>

<style scoped>
.resizable-div {
  position: relative;
}
.drag-handle {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 10px;
  background: #ddd;
  cursor: ns-resize;
}
</style>
