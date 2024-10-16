// dom生成base64图片
// 如果报错，使用原生js获取dom

// 使用 modern-screenshot
// https://github.com/qq15725/modern-screenshot/tree/main
// npm i modern-screenshot@4.4.39
import { domToPng } from 'modern-screenshot';
export const getDomBase64 = async (dom) => await domToPng(dom);

// 使用 html2canvas
// npm i html2canvas@1.4.1
import html2canvas from 'html2canvas';
const domToBase64 = (dom) => {
  return new Promise((resolve) => {
    html2canvas(dom).then((canvas) => {
      const img = canvas.toDataURL('image/png');
      resolve(img);
    });
  });
};
export const _getDomBase64 = async (dom) => await domToBase64(dom);

/* 使用
<template>
  <div ref="domRef" id="domRef">1</div>
</template>

<script setup>
import { ref } from 'vue';
import { getDomBase64, _getDomBase64 } from '@/utils/getDomBase64';

const domRef = ref();

setTimeout(async () => {
  const dom = document.getElementById('domRef');
  console.log('__domBase64__', await getDomBase64(domRef.value));
  console.log('__domBase64__', await getDomBase64(dom));
  console.log('__domBase64__', await _getDomBase64(domRef.value));
  console.log('__domBase64__', await _getDomBase64(dom));
}, 2000);
</script>
*/
