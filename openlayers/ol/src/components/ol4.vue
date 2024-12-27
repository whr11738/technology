<template>
  <!-- ol热力图 -->
  <div class="w100p h100p">
    <div id="mapDom" class="w100p h100p pr">
      <div class="pa w200 br20 h100 bc0 z100 fc o7 fy" style="left: 12px; bottom: 36px">图例提示</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import olMap from '@/utils/gis/ol';

const initMap1 = () => {
  const pos1 = [113.37310399318999, 23.12297649456611];
  const pos2 = [113.36309041374084, 23.121647418783482];
  const pos3 = [113.3734259821404, 23.133270941159424];
  const pos4 = [113.34658958709501, 23.133356676265155];
  const pos5 = [113.36527909629699, 23.12802057683809];
  const pos6 = [113.20608129145079, 23.145935626801837];
  const posList = [pos1, pos2, pos3, pos4, pos5, pos6];
  const data = [
    { position: pos1, weight: 0.2 },
    { position: pos2, weight: 0.4 },
    { position: pos3, weight: 0.6 },
    { position: pos4, weight: 0.8 },
    { position: pos5, weight: 1 },
    { position: pos6, weight: 1 },
  ];
  const options = {
    domId: 'mapDom',
    position: [0, 0],
    source: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
    zoom: 0,
  };
  const map = new olMap(options); // 初始化地图
  map.initHeatmap(data); // 添加热力图图层
  map.bestView(posList); // 设置最佳视图
};

onMounted(() => {
  initMap1();
});
</script>

<style lang="less"></style>
