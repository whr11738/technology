<template>
  <div class="w100w h100h">
    <ol1 v-if="d.showol == 1" />
    <ol2 v-if="d.showol == 2" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import ol1 from '@/components/ol1';
import ol2 from '@/components/ol2';

const d = reactive({
  showol: 2,
});
</script>

<style lang="less">
@import url('./style/style_index.css');
@import url('./style/styles_less.less');
</style>
