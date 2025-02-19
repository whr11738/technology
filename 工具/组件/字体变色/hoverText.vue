<!-- 鼠标移入变色的文字组件 -->
<!-- html
 <hoverText class="br4" fc="red" bc="#0000ff" :hold="false">
  <div class="fc fz16 lh22 fw6 hp">Hover over me!</div>
</hoverText>
 -->
<!-- js
import hoverText from '@/components/hoverText.vue';
 -->

<template>
  <div :style="styleObject" @mouseenter="enter" @mouseleave="leave">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    fc: { type: String, default: '#fff' }, // 字体颜色
    bc: { type: String, default: '#000' }, // 背景颜色
    hold: { type: Boolean, default: false }, // 是否保持hover状态
  },
  data() {
    return {
      hover: false,
    };
  },
  watch: {
    hold(newValue) {
      this.hover = newValue;
    },
  },
  computed: {
    styleObject() {
      return {
        transition: 'color 0.3s, background-color 0.3s',
        color: this.hover ? this.fc : 'initial',
        backgroundColor: this.hover ? this.bc : 'initial',
      };
    },
  },
  methods: {
    enter() {
      if (!this.hold) this.hover = true;
    },
    leave() {
      if (!this.hold) this.hover = false;
    },
  },
  mounted() {
    this.hover = this.hold;
  },
};
</script>

<style scoped></style>
