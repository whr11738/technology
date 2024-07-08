<template>
  <!-- 拥有的数据与方法 data3 fun4 -->
  <el-card class="w20w" style="">
    <div class="fc">
      <!-- 方法-子用父1 emits -->
      <el-button @click="emits('fun1', 'fun1子数据')" type="primary">fun1</el-button>
    </div>
    <div class="fc">
      <!-- 方法-子用父2 props -->
      <el-button @click="fun2('fun2子数据')" type="primary">fun2</el-button>
    </div>
    <div class="fc">
      <!-- 方法-子用父3 provide -->
      <el-button @click="fun3('fun3子数据')" type="primary">fun3</el-button>
    </div>
    <div class="fc">
      <!-- 数据-子用父1 props -->
      <el-tag>{{ data1.name }}</el-tag>
    </div>
    <div class="fc">
      <!-- 数据-子用父2 provide -->
      <el-tag>{{ data2.name }}</el-tag>
    </div>
    <div class="fc">
      <el-tag>{{ data3.name }}</el-tag>
    </div>
    <div class="box 50p fc" style="height: 100px">box</div>
  </el-card>
</template>
<script setup>
import { reactive, onMounted, defineProps, inject, defineEmits, defineExpose } from "vue";
import {} from "@/utils/tool.js";
import {} from "@/utils/tool.js";
import { ElMessage } from "element-plus";

const data2 = inject("data2");
const fun3 = inject("fun3");
const props = defineProps(["data1", "fun2"]);
const emits = defineEmits(["fun1"]);

const data3 = reactive({ name: "data3" });
const fun4 = (data) => {
  ElMessage.success(data);
};

onMounted(() => {
  setInterval(() => {
    data3.name = "data3 " + new Date().getTime();
  }, 2000);
});
defineExpose({ data3, fun4 });
</script>

<style scoped>
.grap {
  background: #ccc;
}
.grap2 {
  background: #999;
}
.box {
  border: 1px solid #dcdcdc;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
