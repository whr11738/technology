<template>
  <div>
    <div id="map" class="w100w h100h"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'; // vue相关方法
import * as mapTool from '@/utils/gis/ol';

onMounted(() => {
  mapTool.initMap();
  // mapTool.addOverlay();
  mapTool.addOverlay2();
});
</script>

<style lang="less">
@import url('./style/style_index.css');
@import url('./style/styles_less.less');
</style>
