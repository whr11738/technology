<!-- 表单页面模板 -->
<!-- 适用环境 vue3 element-plus -->
<!-- 留意样式引入和国际化 -->
<!-- <com-form v-if="d.showEdit" :close="() => (d.showEdit = false)" :data="{ x: 1 }"></com-form> -->
<!-- <el-button type="primary" @click="d.showEdit = true">打开表格</el-button> -->
<template>
  <el-dialog v-model="d.visible" width="60%" :before-close="close">
    <!-- 表单 -->
    <el-card style="margin-bottom: 15px" :body-style="{ padding: '15px' }">
      <el-form :inline="true">
        <!-- 输入框 -->
        <el-form-item>
          <el-input v-model="d.form.input"> </el-input>
        </el-form-item>
        <!-- 选择器 -->
        <el-form-item>
          <el-select v-model="d.form.select">
            <el-option v-for="item in d.form.options" :key="item" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- 时间段 -->
        <el-form-item>
          <el-date-picker type="daterange" v-model="d.form.date" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间"> </el-date-picker>
        </el-form-item>
        <!-- 查询 -->
        <el-form-item>
          <el-button type="primary" @click="init">{{ "查询" }}</el-button>
        </el-form-item>
        <!-- 重置 -->
        <el-form-item>
          <el-button type="primary" @click="reset">{{ "重置" }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格主体 -->
    <el-card shadow="never" style="margin-bottom: 15px" :body-style="{ padding: '15px' }">
      <el-table row-key="id" :data="d.list" v-loading="d.loading">
        <!-- 标题 -->
        <el-table-column :label="'标题'" prop="userId"> </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" prop="userId" align="center" min-width="90">
          <template #default="{ row }">
            <!-- 详情 -->
            <el-button type="text" @click="clickDet(row)">{{ "详情" }}</el-button>
            <!-- 修改 -->
            <el-button type="text" @click="clickEdit(row)">{{ "修改" }}</el-button>
            <!-- 删除 -->
            <el-button type="text" @click="clickDel(row)">{{ "删除" }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="w100 f" style="margin-top: 20px">
        <div class="fa"></div>
        <span class="" style="">{{ 总数 + ": " + d.pagination.total }}</span>
        <el-pagination
          style="margin-top: 20px"
          background
          layout="prev, pager, next"
          v-model="d.pagination.current"
          :page-size="d.pagination.pageSize"
          :total="d.pagination.total"
          @current-change="nextPage"
        >
        </el-pagination>
      </div>
    </el-card>
  </el-dialog>
</template>
<script setup>
import "@/assets/css/baseStyle.css";
import { onMounted, reactive } from "vue";
// import * as api from "@/api/";
// import * as tool from "@/utils/baseTool";

const props = defineProps({
  close: { type: Function },
  data: { type: Object },
});
const d = reactive({
  visible: true,
  loading: false,
  list: [],
  pagination: {
    total: 0,
    current: 1,
    pageSize: 10,
  },
  form: null,
});
// 初始化
const init = () => {
  d.list.length = 0;
  d.loading = true;
  const params = {
    page: d.pagination.current,
    size: d.pagination.pageSize,
    timeZone: new Date().getTimezoneOffset() / -60,
  };
  api(params)
    .then((res) => {
      console.log(res);
      // 如果这里报错，分页器会消失
      d.list = res.data;
      d.pagination.total = res.total;
    })
    .finally(() => {
      d.loading = false;
    });
};
// 重置
const reset = () => {
  d.pagination.current = 1;
  d.form = {
    input: null,
    select: null,
    options: [],
    date: [new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), new Date()],
  };
  init();
};
// 下一页
const nextPage = (p) => {
  d.pagination.current = p;
  init();
};
reset();
onMounted(() => {
  console.log(props.data);
});
</script>
<style scoped></style>
