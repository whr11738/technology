<!-- 表格弹出框模板 -->
<!-- 适用环境 vue3 Antd -->
<!-- 留意样式引入和国际化 -->

<!-- 父组件html -->
<!-- <a-button @click="d.showModal = true" type="primary">modal</a-button> -->
<!-- <com v-model:visible="d.showModal" :modalConfirm="modalConfirm" ref="comRef"></com> -->
<!-- 父组件js
import com from "./components/com";
const d = reactive({
  showModal: false
})
const comRef = ref()
const modalConfirm = (params) => {
  console.log("comRef.d", comRef.value.d);
  console.log("params", params);
};
-->
<template>
  <div>
    <a-modal :visible="visible" title="标题" @ok="confirm" @update:visible="updateVisible" :confirm-loading="d.loading" okText="确认" cancelText="取消">
      <a-form ref="formRef" :model="d.form" :rules="rules" :label-col="{ sm: { span: 4 } }" :wrapper-col="{ sm: { span: 20 } }">
        <a-form-item label="名称" name="name">
          <a-input v-model:value.trim="d.form.name" placeholder="请输入"></a-input>
        </a-form-item>
        <a-form-item label="年龄" name="age">
          <a-input-number v-model:value="d.form.age"></a-input-number>
        </a-form-item>
        <a-form-item label="时间" name="time">
          <a-date-picker v-model:value="d.form.time" placeholder="选择日期" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD"></a-date-picker>
        </a-form-item>
        <a-form-item label="星期" name="week">
          <a-checkbox-group v-model:value="d.form.week" :options="d.weekList" :row="4"></a-checkbox-group>
        </a-form-item>
        <a-form-item label="备注" name="desc">
          <a-textarea v-model:value.trim="d.form.desc"></a-textarea>
        </a-form-item>
        <a-form-item label="状态" name="state">
          <a-select v-model:value="d.form.state">
            <a-select-option v-for="item of d.weekList" :key="item" :value="item.value">{{ item.label }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="启用" name="open">
          <a-switch v-model:checked="d.form.open"></a-switch>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, defineProps, defineEmits, defineExpose, watch } from "vue";
import {} from "@/utils/tool.js";

const props = defineProps(["modalConfirm", "visible"]);
const emits = defineEmits(["update:visible"]);
const formRef = ref();
const d = reactive({
  weekList: [
    { label: "星期一", value: 1 },
    { label: "星期二", value: 2 },
    { label: "星期三", value: 3 },
    { label: "星期四", value: 4 },
    { label: "星期五", value: 5 },
    { label: "星期六", value: 6 },
    { label: "星期日", value: 7, disabled: true },
  ],
  loading: false,
  form: {},
});
const checkFun = async (rule, value) => {
  if (d.form.age > 0) return Promise.resolve();
  else if (!d.form.age <= 0) return Promise.reject("年龄必须大于0");
  else return Promise.reject("此项必填");
};
const rules = {
  name: [{ required: true, message: "此项必填", trigger: "blur" }],
  age: [{ required: true, trigger: "blur", validator: checkFun }],
};
// 改变显示状态
const updateVisible = (v) => {
  emits("update:visible", v);
};
// 表单确认
const confirm = () => {
  d.loading = true; // 防止多次点击提交
  formRef.value
    .validate()
    .then(() => {
      props.modalConfirm(d.form);
    })
    .catch((e) => console.warn(e))
    .finally(() => {
      d.loading = false; // 关闭loading状态
    });
};
const init = () => {
  d.form = {
    name: "",
    age: null,
    week: [6, 7],
    desc: "",
    open: false,
    state: "",
    time: null,
  };
};
watch(
  () => props.visible,
  () => {
    init(); // 显示或关闭时初始化表单
  }
);
onMounted(() => {
  console.log("props", props);
});
defineExpose({ d });
</script>

<style scoped></style>
