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
  const options = {
    domId: 'mapDom',
    position: pos1,
    source: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
  };
  const map = new olMap(options); // 初始化地图
  map.addLayer(); // 添加图层

  map.addFeature({
    position: pos1,
    id: 1,
    data: { value: 'feature1' },
  }); // 添加标点1
  map.addFeature({
    position: pos2,
    id: 2,
    data: { value: 'feature2' },
  }); // 添加标点2
  console.log('feature1', map.getFeatureData(1)); // 获取标点1
  map.addFeature({ position: pos2, name: 'name', id: 3 }, 'img'); // 添加标点3
  map.removeFeature(3); // 移除标点3

  map.pointermove(); // 鼠标变手
  const tipDom = map.addOverlay('tipDom', null, 'bottom', [0, 0]); // 添加提示弹窗
  // 添加点击标点：点击出现提示弹窗
  map.singleclick(tipDom, (feature) => {
    if (!feature) return;
    console.log('feature', feature);
    const data = map.getFeatureData(feature.id_);
    d.value = data.value;
  });
};

const go = () => {
  console.log('点击标题');
};

onMounted(() => {
  initMap1();
});
</script>

<style lang="less"></style>
