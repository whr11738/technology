<template>
  <div class="w100p h100p fc">1</div>
</template>
<script setup>
import { ref, reactive, onMounted, defineProps, defineEmits, defineExpose, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import router from '@/router';
import { useRouter, useRoute } from 'vue-router';
const { __ } = document;
const route = useRoute();
const { t } = useI18n();
const props = defineProps(['']);
const emits = defineEmits(['']);
const d = reactive({
  loading: false,
  form: {},
});
const fun = async () => {};
const init = () => {
  d.form = {};
};
// watch(
//   () => props.visible,
//   () => {
//     init();
//   }
// );
onMounted(() => {
  console.log('props', props);
});
defineExpose({ d });
</script>

<style lang="less" scoped></style>
