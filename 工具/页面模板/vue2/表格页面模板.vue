<!-- 表格页面模板 -->
<!-- 适用环境 vue2 element-ui -->
<!-- 留意样式引入和国际化 -->
<template>
  <div style="margin: 24px; position: relative">
    <!-- 表单 -->
    <el-card style="margin-bottom: 15px" :body-style="{ padding: '15px' }">
      <el-form :inline="true">
        <!-- 输入框 -->
        <el-form-item>
          <el-input v-model="form.x" :placeholder="$t('请输入')"> </el-input>
        </el-form-item>
        <!-- 选择器 -->
        <el-form-item>
          <el-select v-model="form.y">
            <!-- <el-option v-for="item in x" :key="item" :label="item.label" :value="item.value"></el-option> -->
          </el-select>
        </el-form-item>
        <!-- 时间段 -->
        <el-form-item>
          <el-date-picker type="daterange" v-model="date" range-separator="-" :start-placeholder="$t('开始时间')" :end-placeholder="$t('结束时间')"> </el-date-picker>
        </el-form-item>
        <!-- 新建 -->
        <el-form-item>
          <el-button type="primary" @click="create">{{ $t("新建") }}</el-button>
        </el-form-item>
        <!-- 查询 -->
        <el-form-item>
          <el-button type="primary" @click="init">{{ $t("查询") }}</el-button>
        </el-form-item>
        <!-- 重置 -->
        <el-form-item>
          <el-button type="primary" @click="reset">{{ $t("重置") }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格主体 -->
    <el-card shadow="never" style="margin-bottom: 15px" :body-style="{ padding: '15px' }">
      <el-table row-key="id" :data="list" v-loading="loading">
        <!-- 标题 -->
        <el-table-column :label="$t('标题')" prop="userId"> </el-table-column>
        <!-- 内容 -->
        <el-table-column :label="$t('内容')">
          <template #default="{ row }">
            {{ row }}
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column :label="$t('操作')" prop="userId" align="center" min-width="90">
          <template #default="{ row }">
            <!-- 详情 -->
            <el-button type="text" @click="toDet(row)">{{ $t("详情") }}</el-button>
            <!-- 修改 -->
            <el-button type="text" @click="toEdit(row)">{{ $t("修改") }}</el-button>
            <!-- 删除 -->
            <el-button type="text" @click="toDel(row)">{{ $t("删除") }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="w100 f">
        <div class="fa"></div>
        <!-- element-ui 用这个避免页数不变 -->
        <!-- :current-page="pagination.current" -->
        <el-pagination
          style="margin-top: 20px"
          background
          layout="total, sizes, prev, pager, next"
          :page-sizes="[10, 20, 30, 40]"
          @size-change="sizeChange"
          v-model="pagination.current"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          @current-change="nextPage"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 表单 -->
    <!-- <com-edit
      v-if="showEdit"
      :close="
        () => {
          showEdit = false;
          init();
        }
      "
      :data="editData"
    ></com-edit> -->
  </div>
</template>
<script>
import "@/assets/css/baseStyle.css";
// import {  } from "@/utils/baseTool";
// import comEdit from "./components/edit.vue";
// import * as api from '@/api/';

export default {
  props: {},
  // components: { comEdit },
  data() {
    return {
      // showEdit: false,
      // editData: null,
      loading: false,
      list: [],
      form: {},
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
      },
      date: null,
    };
  },
  computed: {
    com1() {
      return "";
    },
  },
  watch: {
    form: {
      handler: function (n, o) {
        // console.log(n);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    // 初始化
    init() {
      this.list.length = 0;
      this.loading = true;
      const params = {
        page: this.pagination.current,
        size: this.pagination.pageSize,
        timeZone: new Date().getTimezoneOffset() / -60,
        ...this.form,
      };
      console.log(params);
      // api.list(params)
      //   .then((res) => {
      //     console.log(res);
      //     // 如果这里报错，分页器会消失
      //     this.list = res.data;
      //     this.pagination.total = res.total;
      //   })
      //   .finally(() => {
      //     this.loading = false;
      //   });
    },
    // 新建
    create() {
      // this.editData = null;
      // this.showEdit = true;
    },
    // 详情
    toDet(row) {},
    // 编辑
    toEdit(row) {
      // this.editData = row;
      // this.showEdit = true;
    },
    // 删除
    toDel(row) {
      // api.del({ id: row.id }).then(() => {
      //   this.$message.success(this.$t("i.success"));
      //   this.init();
      // });
    },
    // 修改显示行数
    sizeChange(v) {
      this.pagination.pageSize = v;
      this.reset();
    },
    // 重置
    reset() {
      this.form = {};
      this.pagination.current = 1;
      this.date = [new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), new Date()];
      this.init();
    },
    // 下一页
    nextPage(p) {
      this.pagination.current = p;
      this.init();
    },
  },
  mounted() {
    this.reset();
  },
};
</script>
<style scoped></style>
