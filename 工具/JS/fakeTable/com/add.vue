<template>
  <div>
    <a-modal :visible="visible" :title="props.in?.id ? '编辑' : '增加'" @ok="confirm" @update:visible="updateVisible" :confirm-loading="d.loading" okText="确认" cancelText="取消">
      <a-form ref="formRef" :model="d.form" :rules="rules" :label-col="{ sm: { span: 4 } }" :wrapper-col="{ sm: { span: 20 } }">
        <a-form-item label="名称" name="name">
          <a-input v-model:value.trim="d.form.name" placeholder="请输入"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, defineProps, defineEmits, defineExpose, watch, computed, nextTick, provide, inject } from 'vue';

const { __ } = document;
const props = defineProps(['changeData', 'visible', 'in']);
const emits = defineEmits(['update:visible']);
const formRef = ref();
const d = reactive({
  loading: false,
  form: {},
});
const rules = {
  name: [{ required: true, message: '此项必填', trigger: 'blur' }],
};
// 改变显示状态
const updateVisible = (v) => {
  emits('update:visible', v);
};
// 表单确认
const confirm = () => {
  d.loading = true; // 防止多次点击提交
  formRef.value
    .validate()
    .then(() => {
      if (props.in && props.in.id) props.changeData({ id: props.in.id, name: d.form.name }, 'edit');
      else props.changeData({ id: __.getRandom(8), name: d.form.name }, 'add');
      updateVisible(false);
    })
    .catch((e) => console.warn(e))
    .finally(() => {
      d.loading = false; // 关闭loading状态
    });
};
const init = () => {
  d.form = { name: '' };
  if (props.in) d.form.name = props.in.name;
};
watch(
  () => props.visible,
  () => {
    init(); // 显示或关闭时初始化表单
  },
);
onMounted(() => {
  console.log('props', props);
});
defineExpose({ d });
</script>

<style scoped></style>
