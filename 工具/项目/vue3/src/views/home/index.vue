<template>
  <!-- 父组件数据 data1 data2-->
  <!-- 父组件方法 fun1 fun2 fun3-->
  <div class="w100w h100h fc" style="">
    <el-card class="" style="">
      <div class="fy fc">
        <div class="tc mb12 fw6">父组件区域</div>
        <div class="mb12">
          <span>store内容:</span>
          <span>{{ userStore.userInfo.token }},</span>
          <span>{{ userStore.userInfo.activate }},</span>
          <span>{{ userStore.noActivate }}</span>
        </div>
        <!--  方法 父用子 ref -->
        <el-button class="mb12" @click="toFun4" type="primary">fun4</el-button>
        <!--  数据 父用子 ref -->
        <com :data1="data1" :fun2="fun2" @fun1="fun1" ref="comRef"></com>
        <!--  数据 子改父 props -->
        <el-tag class="mt12">{{ data1.name }}</el-tag>
        <!--  数据 子改父 provide -->
        <el-tag>{{ data2.name }}</el-tag>
        <!--  数据 父改子 emits -->
        <el-tag>{{ comRef?.data3?.name }}</el-tag>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, provide } from 'vue';
// import * as __ from '@/utils/tool.js';
import * as i18n from '@/i18n/index';
import com from '@/components/index';
import { ElMessage } from 'element-plus';
import userStore from '@/store/user';

const { __ } = document;
const { setLang, getLang, t } = i18n;

const comRef = ref(null);
const data1 = reactive({ name: 'data1' });
const data2 = reactive({ name: 'data2' });
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
  const { fun4 } = comRef.value;
  fun4('触发子方法fun4，参数父数据');
};
provide('data2', data2);
provide('fun3', fun3);

onMounted(() => {
  setTimeout(() => {
    setInterval(() => {
      data1.name = 'data1 被父组件修改';
      data2.name = 'data2 被父组件修改';
      comRef.value.data3.name = 'data3 被父组件修改';
    }, 2000);
  }, 1000);
  setInterval(() => {
    userStore.setActivate(!userStore.userInfo.activate);
    userStore.setToken(new Date().getTime());
  }, 1000);
});
</script>

<style scoped></style>
