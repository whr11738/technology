<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <!-- <transition> -->
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup></script>

<style lang="less">
@import url('./style/style_index.css');
@import url('./style/styles_less.less');
</style>
