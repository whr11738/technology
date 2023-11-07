<template>
  <div class="w100w h100h fc">{{ t("i.yes") }}</div>
</template>
<script setup>
import { reactive, onMounted } from "vue";
import userStore from "@/store/user";
import { storage } from "@/utils/tool.js";
import * as i18n from "@/i18n/index";

const { setLang, getLang, t } = i18n;

const { userInfo } = userStore;
console.log(userInfo);

onMounted(() => {});
</script>

<style scoped></style>
