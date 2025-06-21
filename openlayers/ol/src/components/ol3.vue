<template>
  <!-- ol聚类图 -->
  <div class="w100p h100p">
    <div id="mapDom" class="w100p h100p"></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import olMap from '@/utils/gis/__ol';

const initMap1 = () => {
  const pos1 = [113.37310399318999, 23.12297649456611];
  const pos2 = [113.37310399318999, 23.12297649456611];
  const pos3 = [113.36309041374084, 23.121647418783482];
  const options = {
    domId: 'mapDom',
    position: pos1,
    source: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
    zoom: 15,
  };
  const map = new olMap(options); // 初始化地图
  map.initCluster([pos2, pos3]); // 添加聚类图图层
};

onMounted(() => {
  initMap1();
});
</script>

<style lang="less"></style>
