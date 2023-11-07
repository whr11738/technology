<!-- 在uni-app中使用 -->
<template>
  <view>
    <web-view v-if="url" ref="webView" :webview-styles="webviewStyles" :src="url"></web-view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      url: null,
      webviewStyles: {
        progress: {
          // color: '#FF3333'
        }
      }
    }
  },
  onLoad(o) {
    console.log(o)
    if (o.url) this.url = o.url
  },
  mounted() {},
  methods: {}
  // onNavigationBarButtonTap() {
  //   uni.navigateBack({ delta: 1 })
  // }
}
</script>
<style lang="scss" scoped></style>
