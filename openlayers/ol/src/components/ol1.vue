<template>
  <!-- ol使用案例 引入的是_ol 点击弹出dom和可拖动图标 -->
  <div class="w100p h100p">
    <div id="map" class="w100p h100p"></div>
    <div class="pl20 pr20 pt16 pb16 br16 fc bc0" ref="olPop">{{ d.tip }}</div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import * as mapTool from '@/utils/gis/_ol';

const d = reactive({
  tip: 'tip',
  value: 1,
});
const olPop = ref();

onMounted(() => {
  const options = {
    pos: [113.37310399318999, 23.12297649456611],
    tipDom: olPop.value,
  };
  mapTool.initMap(options);
  mapTool.addOverlay2(options);
  mapTool.showTip(options);
  mapTool.pointermove();
  mapTool.singleclick();
});
</script>

<style lang="less"></style>
