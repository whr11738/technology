<!-- 通知弹窗
使用
<MessageModal ref="messageModalRef"/>
import MessageModal from '@/components/messageModal.vue';
const messageModalRef = ref(null);
messageModalRef.value.open({ title: 'title', message: 'message' });
-->

<template>
  <div class="modal-mask" v-if="show" @click="close"></div>
  <div class="modal-content" style="background: #f3fce7" v-if="show" @click="close">
    <div class="mt16 mb16 ml20 mr20 f">
      <div class="mr24">
        <img src="./img/success.svg" alt="" />
      </div>
      <div class="fy fa">
        <div class="fyc mb8 fa">
          <div class="fa fw6 fz14 lh20" style="color: #69b918">{{ d.title }}</div>
          <img src="./img/close.svg" alt="" />
        </div>
        <div class="fz14 lh20" style="color: #4d4c4c">{{ d.message }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, defineProps, defineEmits, defineExpose, watch, computed, nextTick, provide, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';

const show = ref(false);
const d = reactive({
  title: '',
  message: '',
});

const open = (option) => {
  const { title, message } = option;
  d.title = title;
  d.message = message;
  show.value = true;
};
const close = () => (show.value = false);
defineExpose({ open, close });
</script>
<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.modal-content {
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translate(-50%, 0%);
  width: calc(100vw - 40px);
  background-color: #fff;
  border-radius: 8px;
  z-index: 1000;
  overflow: hidden;
}
</style>
