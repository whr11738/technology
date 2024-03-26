<!-- 图片显示 封装了加载动画 基于uniapp vue2 vant封装-->
<!-- 外部需要一个 default 默认样式 -->
<!-- <show-image :src="url" class="default" :size="36"></show-image> -->
<template>
  <view class="wh100">
    <view v-if="src" class="wh100 fc">
      <van-loading :size="size || 36" v-if="loading" />
      <image @load="loading = !loading" v-show="src && !loading" mode="aspectFill" :src="src" class="wh100 o0"></image>
    </view>
    <view v-else class="wh100 fc"> </view>
  </view>
</template>

<script>
import { domInViewport, findString } from "@/utils/baseTool.js";
export default {
  props: ["src", "size"],
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    // 渐入动画效果
    // domName：dom有的class，要有透明度为0  animationName：动画名称
    setInterval((domName = "o0", animationName = "fade-move") => {
      const domList = document.getElementsByClassName(domName);
      if (domList.length === 0) return;
      for (const dom of domList) {
        if (domInViewport(dom) && findString(dom.className, animationName).length <= 1) dom.className = dom.className + " " + animationName;
      }
    }, 100);
  },
};
</script>

<style scoped>
.default {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
}
.fc {
  display: flex;
  align-items: center;
  justify-content: center;
}
.wh100 {
  width: 100%;
  height: 100%;
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.fade-move {
  /* 动画名称 */
  animation-name: fade;
  /* 动画时间 */
  animation-duration: 0.5s;
  /* 动画开始前等待时间 */
  animation-delay: 0s;
  /* 循环次数 infinite 无限循环*/
  animation-iteration-count: 1;
  /* 反向播放  reverse 反向*/
  animation-direction: normal;
  /* 不播放时状态  */
  animation-fill-mode: both;
}
</style>
