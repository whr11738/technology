<template>
  <!-- 拥有的数据与方法 fun1 fun2 fun3 data1 data2-->
  <div class="w100w h100h fc" style="">
    <!--  方法，数据 父用子 ref -->
    <el-button @click="toFun4" type="primary">fun4</el-button>
    <com :data1="data1" :fun2="fun2" @fun1="fun1" ref="comRef"></com>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, provide } from "vue";
import userStore from "@/store/user";
import { storage } from "@/utils/tool.js";
import * as i18n from "@/i18n/index";
import com from "@/components/index";
import { ElMessage } from "element-plus";

const { setLang, getLang, t } = i18n;

const comRef = ref(null);
const data1 = reactive({ name: "data1" });
const data2 = reactive({ name: "data2" });
const fun1 = (data) => {
  ElMessage.success(data);
};
const fun2 = (data) => {
  ElMessage.success(data);
};
const fun3 = (data) => {
  ElMessage.success(data);
};
const toFun4 = () => {
  const { data3, fun4 } = comRef.value;
  console.log("data3", data3);
  ElMessage.success(data3.name.toString());
  fun4();
};
provide("data2", data2);
provide("fun3", fun3);

const { userInfo } = userStore;
console.log(userInfo);

onMounted(() => {
  setInterval(() => {
    data1.name = "data1 " + new Date().getTime();
    data2.name = "data2 " + new Date().getTime();
  }, 2000);
});
</script>

<style scoped></style>
