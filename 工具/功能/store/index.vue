<template>
  <div class="" style="">
    {{ userStore.userInfo.token }}
    {{ userStore.userInfo.activate }}
    {{ userStore.noActivate }}
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import userStore from "@/store/user";

onMounted(() => {
  setTimeout(() => {
    userStore.setToken("token");
  }, 2000);
  setInterval(() => {
    userStore.setActivate(!userStore.userInfo.activate);
  }, 2000);
});
</script>

<style scoped></style>
