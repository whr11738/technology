<template>
  <!-- ol热力图 -->
  <div class="w100p h100p">
    <div id="mapDom" class="w100p h100p pr">
      <div class="pa w200 br20 h100 bc0 z100 fc o7 fy" style="left: 12px; bottom: 36px">图例提示</div>
    </div>
    <div id="tipDom" class="br4 pt12 pb12 pl20 pr20 fy bc0" style="min-width: 200px">
      <div class="lh24 fw6 mb4" @click="go">标题</div>
      <div class="lh24 mb4 fz14">内容</div>
      <div class="lh24 fz14" style="color: #999">底部</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import * as olMap from '@/utils/gis/ol';

let map = null;
const initMap = () => {
  const data1 = [
    { position: [113.37310399318999, 23.12297649456611], weight: 0.2 },
    { position: [113.36309041374084, 23.121647418783482], weight: 0.4 },
    { position: [113.3734259821404, 23.133270941159424], weight: 0.6 },
    { position: [113.34658958709501, 23.133356676265155], weight: 0.8 },
    { position: [113.36527909629699, 23.12802057683809], weight: 1 },
    { position: [113.20608129145079, 23.145935626801837], weight: 1 },
  ];
  const data2 = [
    [113.37310399318999, 23.12297649456611],
    [113.36309041374084, 23.121647418783482],
  ];
  const pos1 = [113.28082725567143, 23.135220619803032];
  const pos2 = [113.22679325348787, 23.12499828961806];
  const options = {
    // target: 'mapDom',
    source: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
  };
  map = olMap.initMap(options); // 初始化地图
  olMap.initHeatmap(map, data1); // 添加热力图图层
  olMap.initCluster(map, data2); // 添加聚类图图层
  olMap.addDefaultLayer(map); // 添加默认图层
  console.log(olMap.getLayerList(map)); // 获取所有图层
  console.log(olMap.getLayer(map, 'default')); // 获取默认图层
  const feature1 = olMap.addFeature(map, { id: 1, position: pos1, data: { v: 123 } }); // 添加feature
  const feature2 = olMap.addFeature(map, { id: 2, position: pos2, data: { v: 321 } }); // 添加feature
  console.log(olMap.getFeature(map, 1)); // 获取feature
  console.log(olMap.getFeatureData(feature1)); // 获取feature1数据
  console.log(olMap.getFeatureList(map)); // 获取所有feature
  // olMap.removeFeature(map, 1); // 移除feature
  const tipDom = olMap.addOverlay(map, 'tipDom', null, 'bottom', [0, 0]); // 添加overlay提示弹窗
  // 悬浮feature1显示overlay
  olMap.featureShowOverlay(map, {
    feature: feature1,
    overlay: tipDom,
    callback: () => {
      console.log('featureShowOverlay');
    },
    method: 'pointermove',
  });
  // 点击任意点显示Overlay提示弹窗
  // olMap.showOverlay(map, {
  //   overlay: tipDom,
  //   callback: () => {
  //     console.log('showOverlay');
  //   },
  // });
  // olMap.delOverlay(map, tipDom); // 删除overlay
  console.log(olMap.getOverlayList(map)); // 获取所有overlay
  olMap.featurePointer(map); // 悬浮feature时候鼠标变手
  // 设置最佳视图
  olMap.bestView(
    map,
    data1.map((i) => i.position),
  );
  // setTimeout(() => {
  //   olMap.delAllLayer(map); // 移除所有图层
  // }, 3000);
  // setTimeout(() => {
  //   olMap.delMap(map); // 移除地图
  // }, 3000);
};

onMounted(() => {
  initMap();
});
</script>

<style lang="less"></style>
