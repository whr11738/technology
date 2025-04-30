<!-- antd 组件模板 -->
<!-- 适用环境 vue3 Antd2.x-->
<!-- <com v-model:visible="d.comVisible"></com> -->
<template>
  <div>
    <a-drawer :visible="visible" @update:visible="(e) => emits('update:visible', e)"> 1 </a-drawer>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, defineProps, defineEmits, defineExpose, watch, computed, nextTick, provide, inject } from 'vue';
const { __ } = document;
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps(['visible']);
const emits = defineEmits(['update:visible']);
// const d = reactive({});
// const init = () => {
//   d.form = {};
// };
// watch(
//   () => props.visible,
//   () => {
//     init();
//   }
// );
// onMounted(() => {
//   console.log("props", props);
// });
// defineExpose({ d });
</script>

<style lang="less" scoped></style>
