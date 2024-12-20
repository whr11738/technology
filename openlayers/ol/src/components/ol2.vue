<template>
  <!-- ol封装 -->
  <div class="w100p h100p">
    <div id="mapDom" class="w100p h100p"></div>
    <div id="tipDom" class="br4 pt12 pb12 pl20 pr20 fy bc0" style="min-width: 200px">
      <div class="lh24 fw6 mb4" @click="go">标题</div>
      <div class="lh24 mb4 fz14">{{ d.value }}</div>
      <div class="lh24 fz14" style="color: #999">底部</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import olMap from '@/utils/gis/ol';

const d = reactive({
  value: 1,
});

const initMap1 = () => {
  const pos1 = [113.37310399318999, 23.12297649456611];
  const pos2 = [113.36309041374084, 23.121647418783482];
  const options = { dom: 'mapDom', position: pos1 };
  const map = new olMap(options); // 初始化地图
  map.addLayer(pos1); // 添加标点1
  map.addLayer(pos2); // 添加标点2
  map.pointermove(); // 鼠标变手
  const tipDom = map.addOverlay('tipDom', null, 'bottom'); // 添加提示弹窗
  map.singleclick(tipDom); // 添加点击标点：点击出现提示弹窗
};

const go = () => {
  console.log('点击标题');
};

onMounted(() => {
  initMap1();
});
</script>

<style lang="less"></style>
