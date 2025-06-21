<!-- 删除二次提示框 -->
<!-- 适用环境 vue3 Antd4.x-->
<!--
<toDel title="标题" @delFun="delFun(item)"></toDel>

import toDel from '@/components/toDel.vue';
const delFun = (item) => console.log('item', item);
> -->
<template>
  <div>
    <a-popover v-model:visible="d.visible" :title="title" trigger="click">
      <template #content>
        <div class="fy">
          <div>确认删除？</div>
          <div class="f mt12">
            <a-button @click="d.visible = false" :size="!title && 'small'">取消</a-button>
            <div class="fa" style="min-width: 20px"></div>
            <a-button type="primary" @click="del" danger :size="!title && 'small'">删除</a-button>
          </div>
        </div>
      </template>
      <a-button type="link" danger>删除</a-button>
    </a-popover>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, defineProps, defineEmits, defineExpose, watch, computed, nextTick, provide, inject } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps(['title']); // title可不传
const emits = defineEmits(['delFun']);

const d = reactive({
  visible: false,
});

const del = () => {
  emits('delFun');
  d.visible = false;
};
</script>

<style lang="less" scoped></style>
