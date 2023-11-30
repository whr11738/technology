<!-- 表单页面模板 -->
<!-- 留意样式引入和国际化 -->
<!-- <com-edit
      v-if="showEdit"
      :close="
        () => {
          showEdit = false
        }
      "
      :data="{ x: 1 }"
    ></com-edit> -->
<template>
  <div>
    <el-dialog :title="form.id ? $t('编辑') : $t('创建')" visible="visible" width="30%" :before-close="close">
      <el-form :model="form" :rules="rulesRef" ref="formRef" label-width="80px">
        <el-form-item :label="$t('名称')" prop="name">
          <el-input v-model="form.name" :placeholder="$t('请输入名称')" />
        </el-form-item>

        <el-form-item :label="$t('备注')" prop="desc">
          <el-input v-model="form.desc" />
        </el-form-item>

        <el-form-item :label="$t('数量')" prop="number">
          <el-input-number :min="0" v-model="form.number" />
        </el-form-item>

        <el-form-item :label="$t('类型')" prop="type">
          <el-select v-model="form.type">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('是否')" prop="yes">
          <el-radio-group v-model="form.yes" size="small">
            <el-radio-button :label="1">{{ $t("是") }}</el-radio-button>
            <el-radio-button :label="0">{{ $t("否") }}</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item :label="$t('时间')" prop="time">
          <el-date-picker v-model="form.time" type="daterange" :range-separator="$t('至')" :start-placeholder="$t('开始日期')" :end-placeholder="$t('结束日期')"> </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <div class="f">
          <div class="fa"></div>
          <el-button @click="close">{{ $t("取消") }}</el-button>
          <el-button type="primary" @click="onSubmit">{{ $t("确定") }}</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import "@/assets/css/baseStyle.css";
// import {  } from "@/utils/baseTool";
// import api from '@/api/'

export default {
  props: {
    close: { type: Function },
    data: { type: Object },
  },
  data() {
    return {
      visible: true,
      rulesRef: {
        name: this.defaultRulesRef(),
        desc: [],
      },
      options: [
        { label: "类型1", value: 1 },
        { label: "类型2", value: 2 },
      ],
      form: {
        name: "",
        desc: "",
        number: 0,
        type: 1,
        yes: 0,
        time: [],
      },
    };
  },
  computed: {
    com1() {
      return "";
    },
  },
  // watch: {
  //   form: {
  //     handler: function (n, o) {
  //       // console.log(n);
  //     },
  //     immediate: true,
  //     deep: true,
  //   },
  // },
  methods: {
    defaultRulesRef() {
      return [
        {
          required: true,
          validator: async (_rule, value) => {
            if (value === "" || !value) throw new Error(this.$t("此项必填"));
          },
        },
      ];
    },
    async onSubmit() {
      console.log("onSubmit");
      console.log(this.form);
      this.$refs["formRef"].validate((valid) => {
        console.log(valid);
        if (!valid) return;
        // const methods = this.form.id ? api.edit : api.add;
        // methods(this.form).then(() => {
        //   this.$message.success(this.$t("i.success"));
        //   this.close();
        // });
      });
    },
  },
  mounted() {
    console.log(this.data);
    if (this.data) this.form = this.data;
  },
};
</script>
<style scoped></style>
