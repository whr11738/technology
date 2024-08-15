<template>
  <div class="w100w h100h fc" style="">
    <div class="fy fc">
      <com></com>
    </div>
  </div>
</template>
<script setup>
import { onMounted, defineAsyncComponent } from "vue";

/*
  直接引入组件
*/
// import com from "@/components/index1";

/*
  异步引入组件
*/
// const getComponent = (name) => defineAsyncComponent(() => import(`../../components/${name}`));
// const com = getComponent("index1");

/*
  通过函数异步引入组件
*/
// const getComponent = (name) =>
//   defineAsyncComponent(() => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(import(`../../components/${name}`));
//       }, 1000);
//     });
//   });
// const com = getComponent("index1");

/*
  通过接口异步引入组件
*/
let res = null;
const getComponent = () =>
  defineAsyncComponent(
    () =>
      new Promise((resolve, reject) => {
        const t = setInterval(() => {
          if (res) {
            clearTimeout(t);
            resolve(import(`../../components/${res}`));
          }
        }, 200);
      })
  );
const com = getComponent(res);
onMounted(() => {
  setTimeout(() => {
    res = "index1";
  }, 1000);
});
</script>

<style scoped></style>
