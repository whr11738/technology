<template>
  <div class="step-container">
    <div class="steps" style="width: 1700px">
      <!-- 步骤点 -->
      <div v-for="i in 10" :key="i" class="step-point">
        <img :src="getStepImage(i)" class="step-icon" />
      </div>
      <!-- 进度条 -->
      <div class="progress-bar">
        <div class="progress" style="max-width: 1684px" :style="{ width: `${(d.s * (1700 - 8 - 8)) / (10 - 1)}px` }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, defineProps, defineEmits, defineExpose, watch, computed, nextTick, provide, inject } from 'vue';
import s1 from './img/s1.png';
import s2 from './img/s2.png';
import s3 from './img/s3.png';

const props = defineProps([]);

const d = reactive({
  s: 0, // 范围：0-10
});

// 获取步骤点图片
const getStepImage = (step) => {
  if (step < d.s + 1) return s3; // 已完成
  if (step === d.s + 1) return s2; // 进行中
  return s1; // 未完成
};

onMounted(() => {
  setInterval(() => {
    if (d.s != 10) d.s++;
  }, 2000);
});
</script>

<style scoped>
.step-container {
  width: 100%;
  height: 100%;
}
.steps {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0 auto;
}
.step-point {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
}
.step-icon {
  width: 18px;
  height: 18px;
}
.progress-bar {
  position: absolute;
  top: 4px;
  left: 8px;
  right: 8px;
  height: 11px;
  background-image: url('./img/jdt1.png');
  background-size: cover;
  background-size: 16% 11px;
  z-index: 1;
}
.progress {
  height: 100%;
  background-image: url('./img/jdt2.png');
  background-size: 187px 11px;
  transition: width 0.3s ease;
}
</style>
