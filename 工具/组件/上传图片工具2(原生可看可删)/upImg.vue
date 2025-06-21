<template>
  <div class="box hp fc" style="width: 548px; height: 286px; background: #fafafa" @click="toUpload">
    <div v-if="!d.showImgUrl" class="fy fyc">
      <div class="fz14">点击上传</div>
      <div class="fz12 mt8" style="color: #999">最大不超过10M 支持jpg、png、bmp格式 建议上传16:9的图片</div>
    </div>
    <div v-if="d.showImgUrl" class="tool f" style="">
      <!-- <div class="btn mr8" style="background: #1677ff" @click.stop="">全屏</div> -->
      <div class="btn" style="background: #ff4d4f" @click.stop="d.showImgUrl = ''">删除</div>
    </div>
    <img v-if="d.showImgUrl" class="w100p h100p" :src="d.showImgUrl" alt="" />
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, provide } from 'vue';

const d = reactive({ showImgUrl: '' });

const toUpload = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.style.display = 'none';
  fileInput.accept = 'image/jpeg, image/png, image/bmp';
  document.body.appendChild(fileInput);
  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const src = URL.createObjectURL(file);
    let errTip = '';
    const allowedTypes = ['image/jpeg', 'image/png', 'image/bmp'];
    if (!allowedTypes.includes(file.type)) errTip = '只支持JPG/PNG/BMP格式文件';
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) errTip = '文件大小不能超过10MB';
    if (errTip) {
      message.error(errTip);
      fileInput.value = '';
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    d.showImgUrl = src;
    console.log('formData', formData);
    // upload([formData, src]);
  });
  fileInput.click();
};
onMounted(() => {});
</script>

<style scoped>
.box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.box:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  /* transform: translateY(-5px); */
}

.box:hover .tool {
  opacity: 1;
  transform: scale(1);
}

.tool {
  position: absolute;
  /* top: 10px;
  right: 10px; */
  opacity: 0;
  transition: all 0.3s ease;
  transform: scale(0.8);
}

.btn {
  padding: 4px 15px;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  line-height: 22px;
}
</style>
