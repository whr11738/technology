<!-- 条形比例图 -->
<!-- <myChart :p="{ arr: [{ val: 1 }, { val: 2 }, { val: 3 }] }" /> -->
<template>
  <div class="h90p w90p">
    <div class="w100p bc1 h20 f oh" style="background-color: #73c0de; border-radius: 4px">
      <div v-for="i of d.data" :key="i" :style="`width:${i.percent}%;background-color:${i.color};`"></div>
    </div>
  </div>
</template>
<script setup>
import "@/assets/css/style.scss";
import { reactive, onMounted, defineProps } from "vue";

const color = ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc", "#5470c6"];
const props = defineProps({
  p: {
    type: Object,
    default: () => ({}),
  },
});
const d = reactive({
  // data: [{ val: 1 }, { val: 2 }, { val: 3 }],
  data: [],
});
const init = () => {
  let max = 0;
  for (const i in d.data) {
    // 总数
    max += parseInt(d.data[i].val);
  }
  for (const i in d.data) {
    if (parseInt(i) === d.data.length - 1) {
      // 最后一个自动填充
      d.data[i].percent = 0;
    } else {
      // 计算比例
      d.data[i].percent = (d.data[i].val / max) * 100;
      // 添加颜色
      d.data[i].color = color[i % 10];
    }
  }
  console.log(d.data);
};
onMounted(() => {
  console.log(props.p);
  d.data = props.p.arr;
  init();
});
</script>
<style lang="scss" scoped></style>
