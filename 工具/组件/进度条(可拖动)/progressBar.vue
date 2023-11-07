<template>
  <div class="progress-bar" v-bind="$attrs">
    <!-- 无色区域 -->
    <div class="progress-bar-dark">
      <!-- 有色区域 -->
      <div class="progress-bar-light"></div>
      <!-- 按钮 -->
      <div class="progress-bar-btn"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'progressBar'
}
</script>

<script setup>
import { reactive, onMounted, watch, defineEmits, defineProps } from 'vue'

// 状态
const status = reactive({
  value: 0
})
// 返回小数长度
const decimalLen = (num) => {
  const numInstr = num + ''
  let behindLen = 0
  numInstr.split('.')[1] && (behindLen = numInstr.split('.')[1].length)
  return behindLen
}
// 返回小数保留后几位后的数字
const initNum = (num, len) => {
  if (decimalLen(num) >= len) {
    return parseFloat(num.toFixed(len))
  } else {
    return num
  }
}
// 绑定滑动事件
const dragToMoveLimit = () => {
  const btn = document.getElementsByClassName('progress-bar-btn')[0]
  const parent = btn.parentElement
  const parentWidth = parent.offsetWidth
  const parentLeft = parent.offsetLeft
  const parentRight = parentLeft + parentWidth
  btn.onmousedown = (e) => {
    const disX = e.clientX - btn.offsetLeft
    document.onmousemove = (m) => {
      const left = m.clientX - disX
      left === parentLeft && (status.value = 0)
      left === parentRight && (status.value = 100)
      if (left > parentLeft && left < parentRight) {
        let percentage = (left - parentLeft) / parentWidth
        percentage = initNum(percentage * 100, 0)
        status.value = percentage
      }
    }
    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
    }
  }
}
// 绑定点击修改样式事件
const clickStyle = () => {
  const dark = document.getElementsByClassName('progress-bar-dark')[0]
  const darkWidth = dark.offsetWidth
  const parent = dark.parentElement
  const parentLeft = parent.offsetLeft
  dark.onmousedown = (e) => {
    let percentage = (e.clientX - parentLeft) / darkWidth
    percentage = initNum(percentage * 100, 0)
    status.value = percentage
  }
}
// 根据百分比初始化样式
const initStyle = (percentage) => {
  const btn = document.getElementsByClassName('progress-bar-btn')[0]
  const light = document.getElementsByClassName('progress-bar-light')[0]
  const dark = document.getElementsByClassName('progress-bar-dark')[0]
  const darkWidth = dark.offsetWidth
  const darkLeft = dark.offsetLeft
  let decimal = ''
  if (percentage > 9 && percentage < 100) {
    decimal = `0.${percentage}`
  } else {
    decimal = `0.0${percentage}`
  }
  percentage === 100 && (decimal = 1)
  const offset = darkWidth * parseFloat(decimal)
  btn.style.left = darkLeft + offset + 'px'
  light.style.width = `${percentage}%`
}

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['update:modelValue', 'change'])
watch(
  () => status.value,
  (val) => {
    status.value = parseInt(status.value)
    val < 0 && (status.value = 0)
    val > 100 && (status.value = 100)
    emit('update:modelValue', val)
    emit('change', val)
    initStyle(val)
  }
)
watch(
  () => props.modelValue,
  (val) => {
    status.value = val
  }
)
onMounted(() => {
  dragToMoveLimit()
  clickStyle()
  status.value = props.modelValue ? props.modelValue : 0
})
</script>

<style scoped>
.progress-bar {
  --color: rgb(21, 175, 159); /* 主色调 */
  position: relative;
  width: 100px;
  flex: none;
  user-select: none;
}
.progress-bar-dark {
  display: flex;
  align-items: center;
  width: 100%;
  height: 2px;
  background-color: rgb(229, 230, 235);
  border-radius: 1px;
  cursor: pointer;
}
.progress-bar-light {
  background-color: var(--color);
  height: 100%;
  cursor: pointer;
}
.progress-bar-btn {
  position: absolute;
  transition: height 0.1s, width 0.1s;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid var(--color);
  cursor: pointer;
  transform: translate(-50%, 0);
}
.progress-bar-btn:hover {
  width: 9px;
  height: 9px;
}
</style>
