<script>
export default {
  created() {
    // 检查版本更新 不一致就刷新
    this.intervalTime = setInterval(() => {
      uni.request({ url: `${window.location.origin}/version.json`, method: "get" }).then((r) => {
        if (!r || !r[1]) return;
        // console.log(this.$version, r[1].data.version);
        if (r[1].statusCode && r[1].statusCode === 200 && this.$version != r[1].data.version) window.location.reload();
      });
    }, 5000);
    this.$on("hook:beforeDestroy", () => {
      clearInterval(this.intervalTime);
      this.intervalTime = null;
    });
  },
};
</script>
