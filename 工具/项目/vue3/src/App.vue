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
import "@/style/style.css";
</script>

<style></style>
