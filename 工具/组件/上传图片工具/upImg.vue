<!-- 图片上传工具 基于vue3 element-plus封装  -->
<!-- 注意引入样式 -->
<!-- <up-img
  :default-img="row.img"
  @success="
    (res) => {
      
      // row.img = res.url // 更新row并回显
      row.img = 'http://pfs-dev.pay-blox.com:40027/fileservice/get/UNIVERSAL_0/group2/M00/20/9F/wKgDTmX1S1GAeYBNAAAYQYZYGEQ716.jpg';
    }
  ">
</up-img> -->
<template>
  <el-upload :action="data.upUrl" :data="data.upImgApiData" :headers="data.headers" :show-file-list="false" :before-upload="upImgBefore" :on-success="upImgSuccess">
    <img v-if="data.img" :src="data.img" class="w100 h100" />
    <div v-else class="up-img fc">
      <em class="up-img-icon">+</em>
    </div>
  </el-upload>
</template>
<script setup>
import "@/assets/css/style.css";
import { onMounted, reactive, defineProps, defineEmits, watch } from "vue";
import { ElMessage } from "element-plus";

const emit = defineEmits(["success"]);
const props = defineProps(["defaultImg"]);
watch(
  () => props.defaultImg,
  (newUrl) => {
    if (newUrl) data.img = newUrl;
  }
);
const data = reactive({
  img: "",
  upUrl: "http://pfs-test.pay-blox.com:40027/file/v1/object/upload", //上传的地址
  //上传时附带的额外参数
  upImgApiData: {
    belong: "UNIVERSAL",
    level: 0,
    type: 1,
    auth: "904cf7cd700a09322bd55fbbd88192047440a84b60a1de4ff77a7024cf3c3a48453cd81a28a3fd665aaeee9edc61db24326ef482cb88b35cb28f5d9de18127622a2344a3a100dd471c99b449e16fb7f4",
  },
  //  设置上传的请求头部
  headers: {
    hOpenUid: 10000,
    param: "jlG5GplTYqDYXh/FtBaBbexEv7T4wInTNHMdfDPjb4DN97kQsl/IxepS7MreO0Kb",
    sign: "23f2c8db8568f52d82ae11a8e3d144c4",
  },
});
// 上传图片前
const upImgBefore = (file) => {
  console.log("upImgBefore");
  // 格式大小判断
  if (file.type !== "image/jpeg" && file.type !== "image/png") {
    ElMessage.error("Picture must be JPG/PNG format!");
    return false;
  }
  if (file.size / 1024 / 1024 > 20) {
    ElMessage.error("Picture must be less than 20M!");
    return false;
  }
  return true;
};
// 上传图片后
const upImgSuccess = (res, file) => {
  console.log("upImgSuccess");
  console.log("res", res);
  console.log("file", file);
  // data.img = URL.createObjectURL(file.raw);// 图片直接回显示
  emit("success", res); // 将接口结果回调，用于图片回显，以及更新row数据等更多操作
};

onMounted(async () => {
  if (props.defaultImg && props.defaultImg.length) data.img = props.defaultImg;
});
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
