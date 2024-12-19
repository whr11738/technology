<template>
  <!-- ol封装 -->
  <div class="w100p h100p">
    <div id="mapDom" class="w100p h100p"></div>
    <div id="overlayDom1" class="hp w40 h40 br50p fc c0 fz16 fw6" style="background: #8f1d22; box-shadow: 0px 2px 4px 0px rgb(0, 0, 0, 0.4); border: 1.5px solid; transform: translate(-50%, -50%)">
      {{ d.value1 }}
    </div>
    <div id="overlayDom2" class="hp w40 h40 br50p fc c0 fz16 fw6" style="background: #003460; box-shadow: 0px 2px 4px 0px rgb(0, 0, 0, 0.4); border: 1.5px solid; transform: translate(-50%, -50%)">
      {{ d.value2 }}
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
import * as mapTool from '@/utils/gis/ol';

const d = reactive({
  value1: 1,
  value2: 2,
});

const initMap1 = () => {
  const pos1 = [113.37310399318999, 23.12297649456611];
  const pos2 = [113.36309041374084, 23.121647418783482];
  const options = { dom: 'mapDom', position: pos1 };
  mapTool.initMap(options); // 初始化地图
  const overlayDom1 = mapTool.addOverlay('overlayDom1', pos1); // 添加标点1
  console.log('overlayDom1', overlayDom1);
  const overlayDom2 = mapTool.addOverlay('overlayDom2', pos2); // 添加标点2
  const overlaysList = mapTool.getOverlays();
  mapTool.delOverlays(overlaysList[1]); // 删除标点2
};

const initMap2 = () => {
  const pos1 = [113.37310399318999, 23.12297649456611];
  const pos2 = [113.36309041374084, 23.121647418783482];
  const options = { dom: 'mapDom', position: pos1 };
  mapTool.initMap(options); // 初始化地图
  mapTool.addLayer(pos1); // 添加标点1
  mapTool.addLayer(pos2); // 添加标点2
  mapTool.pointermove();
  const tipDom = mapTool.addOverlay('tipDom', null, 'bottom'); // 添加提示弹窗
  mapTool.singleclick(tipDom); // 添加点击标点：点击出现提示弹窗
};

const go = () => {
  console.log('点击标题');
};

onMounted(() => {
  // initMap1();
  initMap2();
});
</script>

<style lang="less"></style>
