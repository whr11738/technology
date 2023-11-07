<template>
  <!-- 多表单联动 -->
  <!-- <more-form
    v-if="data.showSettingCmp"
    :data="data"
    :close="
      () => {
        data.showSettingCmp = false;
      }
    "
  ></more-form> -->
  <el-dialog title="套餐" v-model="data.visible" width="30%" :before-close="props.close">
    <el-button type="primary" style="margin-bottom: 20px" @click="add()">{{ '添加' }}</el-button>
    <mini-form
      v-for="item of data.arr"
      :key="item.index"
      :index="item.index"
      :pramas="item.pramas"
      :close="close"
      :toupdata="toupdata"
    ></mini-form>
    <span slot="footer" class="dialog-footer">
      <div class="f" style="margin-top: 20px">
        <div class="fa"></div>
        <el-button @click="props.close">{{ '取消' }}</el-button>
        <el-button type="primary" @click="onSubmit">{{ '确定' }}</el-button>
      </div>
    </span>
  </el-dialog>
</template>
<script setup>
  import '@/assets/css/baseStyle.css';
  import { arrRemoveItem, arrFindIndex } from '@/utils/baseTool';
  import miniForm from './miniForm.vue';
  import { onMounted, reactive, ref, defineProps } from 'vue';

  const props = defineProps({
    close: {
      type: Function,
    },
    data: {
      type: Object,
    },
  });
  const data = reactive({
    visible: true,
    arr: [],
  });
  // 提交
  const onSubmit = async () => {
    console.log('onSubmit');
    for (const i of data.arr) {
      if (i.state === false) {
        console.log('验证不通过，请检查输入');
        return;
      }
    }
    console.log('通过', data.arr);
  };
  // 添加
  const add = () => {
    data.arr.push({
      state: false,
      pramas: null,
      index: new Date().getTime(),
    });
  };
  // 删除
  const close = (d) => {
    arrRemoveItem(data.arr, 'index', d.index);
  };
  // 同步
  const toupdata = (index, state, pramas) => {
    const _index = arrFindIndex(data.arr, 'index', index);
    data.arr[_index].pramas = pramas;
    data.arr[_index].state = state;
    console.log('同步', data.arr);
  };
  // 初始化
  const init = (arr) => {
    for (const i of arr) {
      data.arr.push({
        state: true,
        pramas: {
          name: i.name,
          recommend: i.recommend,
        },
        index: new Date().getTime(),
      });
    }
  };
  onMounted(() => {
    console.log(props.data);
    init([{ name: 'test', recommend: 1 }]);
  });
</script>
<style scoped></style>
