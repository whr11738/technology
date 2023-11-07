<template>
  <!-- <up-img :default="data.form.icon" @success="upImgSuccess"> </up-img> -->
  <el-upload
    :action="data.upUrl"
    :data="data.upImgApiData"
    :headers="data.headers"
    :show-file-list="false"
    :before-upload="upImgBefore"
    :on-success="upImgSuccess"
  >
    <img v-if="data.img" :img-url="data.img" />
    <div v-else class="up-img fc">
      <em class="up-img-icon">+</em>
    </div>
  </el-upload>
</template>
<script setup>
import '@/assets/css/baseStyle.css'
import { onMounted, reactive, ref, defineProps, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['success'])
const props = defineProps({
  default: {
    type: String
  }
})
const data = reactive({
  img: '',
  upUrl: 'https://jsonplaceholder.typicode.com/posts/', //上传的地址
  upImgApiData: {}, //上传时附带的额外参数
  headers: {} //  设置上传的请求头部
})
// 上传图片前
const upImgBefore = (file) => {
  console.log('upImgBefore')
  // 格式大小判断
  if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
    ElMessage.error('Picture must be JPG/PNG format!')
    return false
  }
  if (file.size / 1024 / 1024 > 5) {
    ElMessage.error('Picture must be less than 5M!')
    return false
  }
  return true
}
// 上传图片后
const upImgSuccess = (res, file) => {
  console.log('upImgSuccess')
  console.log(res)
  data.img = URL.createObjectURL(file.raw)
  emit('success', res)
}

onMounted(() => {
  if (props.default && props.default.length) {
    data.img = props.default
  }
})
</script>
<style scoped>
.up-img {
  width: 100px;
  height: 100px;
  border-radius: 10%;
  border: 1px dashed rgb(192, 204, 218);
}
.up-img:hover {
  border-color: #409eff;
}
.up-img-icon {
  display: inline-block;
  font-style: normal;
  font-size: 48px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 92px;
  text-align: center;
}
</style>
