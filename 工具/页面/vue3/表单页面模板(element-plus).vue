<!-- 表单页面模板 -->
<!-- 适用环境 vue3 element-plus -->
<!-- 记得引入样式 -->
<!-- <com-form v-if="data.editVisible" :close="data.editVisible=false" :data="data.editData"></com-form> -->
<!-- <com-form v-if="data.editVisible" :close="()=>{data.editVisible=false}" :data="{x:1}"></com-form> -->
<template>
  <el-dialog title="表单" v-model="data.visible" width="30%" :before-close="props.close">
    <el-form :model="data.form" :rules="data.rulesRef" ref="formRef" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="data.form.name" placeholder="请输入名称" />
      </el-form-item>

      <el-form-item label="备注" prop="desc">
        <el-input v-model="data.form.desc" />
      </el-form-item>

      <el-form-item label="数量" prop="number">
        <el-input-number :min="0" v-model="data.form.number" />
      </el-form-item>

      <el-form-item label="类型" prop="type">
        <el-select v-model="data.form.type">
          <el-option v-for="item in data.options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否" prop="yes">
        <el-radio-group v-model="data.form.yes" size="small">
          <el-radio-button :label="1">是</el-radio-button>
          <el-radio-button :label="0">否</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="时间" prop="time">
        <el-date-picker v-model="data.form.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <div class="f">
        <div class="fa"></div>
        <el-button @click="props.close">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </span>
  </el-dialog>
</template>
<script setup>
import "@/assets/css/baseStyle.css";
import { onMounted, reactive, ref, defineProps } from "vue";

const defaultRulesRef = {
  required: true,
  validator: async (_rule, value) => {
    if (value === "" || !value) {
      throw new Error("此项必填");
    }
  },
};
const props = defineProps({
  close: {
    type: Function,
  },
  data: {
    type: Object,
  },
});
const data = reactive({
  visible: true,
  rulesRef: {
    name: [defaultRulesRef],
    desc: [],
  },
  options: [
    {
      label: "类型1",
      value: 1,
    },
    {
      label: "类型2",
      value: 2,
    },
  ],
  form: {
    name: "",
    desc: "",
    number: 0,
    type: 1,
    yes: 0,
    time: [],
  },
});
const formRef = ref();
const onSubmit = async () => {
  console.log("onSubmit");
  console.log(data.form);
  const valid = await formRef.value.validate();
  console.log(valid);
};

onMounted(() => {
  console.log(props.data);
});
</script>
<style scoped></style>
