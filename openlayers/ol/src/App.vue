<template>
  <div class="w100w h100h">
    <div id="map" class="w100p h100p"></div>
    <div class="pl20 pr20 pt16 pb16 br16 fc bc0" ref="olPop">{{ d.tip }}</div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'; // vue相关方法
import * as mapTool from '@/utils/gis/ol';

const d = reactive({
  tip: 'tip',
});
const olPop = ref();

onMounted(() => {
  const options = {
    pos: [113.37310399318999, 23.12297649456611],
    tipDom: olPop.value,
  };
  mapTool.initMap(options);
  mapTool.addOverlay(options);
  mapTool.addOverlay2(options);
  mapTool.showTip(options);
  mapTool.pointermove();
  mapTool.singleclick();
});
</script>

<style lang="less">
@import url('./style/style_index.css');
@import url('./style/styles_less.less');
</style>
