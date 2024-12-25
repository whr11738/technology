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
  const data = [
    { position: [113.37310399318999, 23.12297649456611], weight: 0.8 },
    { position: [113.36309041374084, 23.121647418783482], weight: 0.4 },
  ];
  const options = {
    domId: 'mapDom',
    position: pos1,
    source: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
    zoom: 15,
  };
  const map = new olMap(options); // 初始化地图
  map.initHeatmap(data); // 添加热力图图层

  // setTimeout(() => {
  //   map.setCenter([113.36309041374084, 23.121647418783482]); // 设置地图中心点
  //   map.setZoom(14); // 设置地图缩放等级
  //   map.setRotation(45); // 设置地图旋转角度
  // }, 2000);
};

onMounted(() => {
  initMap1();
});
</script>

<style lang="less"></style>
