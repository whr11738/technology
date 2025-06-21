<!-- 点击以跳转更多的文字组件 -->
<!-- html
  <to-more go="/gx/facility" :query="{ type: '军事基地' }"></to-more>
-->
<template>
  <div class="hp" style="display: flex; align-items: center" @click="togo(go, type, query)">
    <div style="font-size: 14px; margin-right: 4px; color: #1890ff">更多</div>
    <img src="./more.svg" />
  </div>
</template>
<script>
export default {
  props: {
    go: { type: String, default: '' }, //跳转路径
    type: { type: String, default: 'new' }, //新开页面还是原地跳转
    query: { type: Object, default: () => ({}) }, // 跳转附带的 query
  },
  methods: {
    togo(path, type, query) {
      if (!path) return;
      if (type == 'new') window.open(this.$router.resolve({ path, query }).href, '_blank');
      else this.$router.push(path);
    },
  },
};
</script>

<style scoped>
.hp:hover {
  cursor: pointer;
}
</style>
