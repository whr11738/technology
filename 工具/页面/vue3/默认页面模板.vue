<!-- 默认页面模板 -->
<!-- 适用环境 vue3 -->
<!-- 留意样式引入和国际化 -->
<template>
  <div class="w100p h100p fc">{{ now }}</div>
</template>
<script setup>
import { ref, reactive, onMounted, defineProps, defineEmits, defineExpose, watch, computed, nextTick, provide, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';

const { __ } = document;
const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const props = defineProps(['']);
const emits = defineEmits(['']);

const d = reactive({
  loading: false,
  form: {},
});
const fun = async () => {};
// 跳转封装
const go = (data) => {
  const { newPage = true, path, query = null } = data;
  if (!router || !path) return;
  if (newPage) window.open(router.resolve({ path, query }).href, '_blank');
  else router.push({ path, query });
};
const now = computed(() => {
  return new Date().getTime().toString();
});
// watch(
//   () => props.visible,
//   () => {
//     init();
//   }
// );
// 初始化
const init = () => {
  d.form = {};
};
onMounted(() => {
  console.log('props', props);
  console.log('query', route.query);
  init();
});
provide('father_d', d); // 向子组件传递d，子组件获取:const father_d = inject('father_d');
defineExpose({ d }); // 向父组件传递d
/* 父组件获取
<com ref="comRef" ></com>
const comRef = ref(null);
const getd = () => {
  const { d } = comRef.value;
  console.log('d', d);
};
*/
</script>

<style lang="less" scoped></style>
