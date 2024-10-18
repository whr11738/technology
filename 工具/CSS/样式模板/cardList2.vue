<template>
  <!-- 卡片列表 -->
  <!-- 解决css难题 -->
  <!-- 1.fa自适应高度，溢出滚动oy -->
  <!-- 2.gird布局，间隔自适应，卡片宽高固定，左边卡片靠左，右边卡片靠右 -->
  <div class="w100p h100p bc3 fc">
    <div class="br8 bc0 fy m24 fxc w100p cardshadow" style="height: 80vh">
      <div class="h56 fn f fyc pl20 pr20" style="border-bottom: 1px solid rgba(238, 238, 238, 1)">
        <div class="fa fw6 fz18 lh28">List</div>
      </div>
      <div class="p10 fa fn oy gx5 gg">
        <div v-for="i of 20" :key="i" class="p10" style="">
          <div class="br8 fy cardhover hp" style="border: 1px solid rgba(238, 238, 238, 1); width: 200px; max-height: 240px">
            <div class="fz16 lh24 fw5 ellipsis2 h48 mt12 pl16 pr16">
              文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文
            </div>
            <div class="fz14 lh20 fw4 ellipsis5 h100 mt8 pl16 pr16">
              文字文字文字文字文字文字文字文字文字文字文字义字义字文字义字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字义字文字义字文字文字文字文字文字文
            </div>
            <div class="mt24 h44 fyc pl16 pr16" style="border-top: 1px solid rgba(238, 238, 238, 1)">
              <div class="fz14 lh20 fw4 fa">文字</div>
              <div class="fz14 lh20 fw4" style="color: #999999">文字</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.cardshadow {
  box-shadow: 0px 0px 8px -2px rgba(51, 51, 51, 0.08);
  box-shadow: 0px 0px 4px -1px rgba(41, 99, 255, 0.08);
  box-shadow: 0px 0px 1px 0px rgba(51, 51, 51, 0.12);
}
.cardhover:hover {
  box-shadow: 0px 0px 64px -16px rgba(51, 51, 51, 0.16);
  box-shadow: 0px 0px 32px -8px rgba(41, 99, 255, 0.08);
  box-shadow: 0px 0px 8px -2px rgba(75, 61, 61, 0.24);
}

.ellipsis2 {
  /* 字数溢出省略(多行) */
  /* 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 */
  display: -webkit-box;
  /* 可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本  */
  text-overflow: ellipsis;
  overflow: hidden;
  /* 第几行显示缩略符号 */
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.ellipsis5 {
  /* 字数溢出省略(多行) */
  /* 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 */
  display: -webkit-box;
  /* 可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本  */
  text-overflow: ellipsis;
  overflow: hidden;
  /* 第几行显示缩略符号 */
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
.gg {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  justify-content: space-between;
}
</style>
