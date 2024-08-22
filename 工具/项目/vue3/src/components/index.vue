<template>
  <!-- 子组件数据 data3 -->
  <!-- 子组件方法  fun4 -->
  <el-card class="" style="">
    <div class="tc mb12 fw6">子组件区域</div>
    <div class="flex-around mb12" style="displat: grid; grid-gap: 12px">
      <div class="fc">
        <!-- 方法 子用父 emits -->
        <el-button @click="emits('fun1', '触发父方法fun1，参数子数据')" type="primary">fun1</el-button>
      </div>
      <div class="fc">
        <!-- 方法 子用父 props -->
        <el-button @click="fun2('触发父方法fun2，参数子数据')" type="primary">fun2</el-button>
      </div>
      <div class="fc">
        <!-- 方法 子用父 provide -->
        <el-button @click="fun3('触发父方法fun3，参数子数据')" type="primary">fun3</el-button>
      </div>
    </div>
    <div class="fc">
      <!-- 数据 子用父 props -->
      <el-tag>{{ data1.name }}</el-tag>
    </div>
    <div class="fc">
      <!-- 数据 子用父 provide -->
      <el-tag>{{ data2.name }}</el-tag>
    </div>
    <div class="fc">
      <!-- 数据 父用子 emits -->
      <el-tag>{{ data3.name }}</el-tag>
    </div>
  </el-card>
</template>
<script setup>
import { reactive, onMounted, defineProps, inject, defineEmits, defineExpose } from "vue";
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
    props.data1.name = "data1 被子组件修改";
    data2.name = "data2 被子组件修改";
    data3.name = "data3 被子组件修改";
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
