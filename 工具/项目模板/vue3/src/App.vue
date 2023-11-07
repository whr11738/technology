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

<script setup>
import "@/style/styles.css";
import "@/style/styles.less";
</script>

<style></style>
