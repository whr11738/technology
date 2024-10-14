// dom生成base64图片 await domToBase64(dom)
import html2canvas from 'html2canvas';
export const domToBase64 = (dom) => {
  return new Promise((resolve) => {
    html2canvas(dom).then((canvas) => {
      const img = canvas.toDataURL('image/png');
      resolve(img);
    });
  });
};
/*
安装
npm i html2canvas@1.4.1

使用
<template>
  <div ref="domRef">1</div>
</template>
<script setup>
import { ref } from 'vue';
import { domToBase64 } from '@/utils/html2canvas';

const domRef = ref();
const getDomBase64 = async () => await domToBase64(domRef.value);

setTimeout(async () => {
  const domBase64 = await getDomBase64();
  console.log('domBase64', domBase64);
}, 2000);
</script>
*/
