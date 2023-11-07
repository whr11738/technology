<template>
  <permission-com />
</template>

<script setup>
import permissionCom from './views/permission.vue'
import { storage } from './utils/baseTool.js'

// 初始化权限
const permission = storage.get('permission')
if (!permission) storage.set('permission', ['010100000000', '010200000100', '020100000f00'])
</script>

<style></style>
