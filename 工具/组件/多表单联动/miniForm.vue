<template>
  <!-- 小表单组件 -->
  <el-card style="margin-bottom: 20px">
    <div slot="header">
      <div style="float: right; font-size: 24px" class="hp" type="text" @click="props.close(data)">
        x
      </div>
    </div>
    <el-form :model="data.form" :rules="data.rulesRef" ref="formRef" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="data.form.name"
          style="width: 50%"
          @change="onSubmit()"
          @keydown="onSubmit()"
        />
      </el-form-item>
      <el-form-item label="是否推荐" prop="recommend">
        <el-radio-group v-model="data.form.recommend" size="small" @change="onSubmit()">
          <el-radio-button :label="1">{{ '是' }}</el-radio-button>
          <el-radio-button :label="0">{{ '否' }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script setup>
  import '@/assets/css/baseStyle.css';
  import { onMounted, reactive, ref, defineProps } from 'vue';

  const props = defineProps({
    close: {
      // 删除
      type: Function,
    },
    toupdata: {
      // 同步
      type: Function,
    },
    pramas: {
      // 初始化参数
      type: Object,
    },
    index: {
      // 索引
      type: Number,
    },
  });
  const data = reactive({
    visible: true,
    rulesRef: {
      name: [
        {
          required: true,
          validator: async (_rule, value) => {
            if (value === '' || !value) {
              data.state = false;
              props.toupdata(data.index, false, data.form);
              throw new Error('此项必填');
            }
          },
        },
      ],
      desc: [],
    },
    state: false, // 校验通过
    index: null, // 索引
    // 表格参数
    form: {
      name: null,
      recommend: 0,
    },
  });
  const formRef = ref();
  const onSubmit = async () => {
    console.log('onSubmit');
    const valid = await formRef.value.validate();
    data.state = valid;
    props.toupdata(data.index, data.state, data.form);
  };
  onMounted(() => {
    data.index = props.index;
    if (!props.pramas) return;
    // 初始化当前表格参数
    console.log(props.pramas);
    const { name, recommend } = props.pramas;
    data.form.name = name;
    data.form.recommend = recommend;
  });
</script>
<style scoped></style>
