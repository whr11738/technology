<template>
  <div style="margin: 24px; position: relative">
    <!-- 表单 -->
    <el-card style="margin-bottom: 15px" :body-style="{ padding: '15px' }">
      <el-form :inline="true">
        <!-- 输入框 -->
        <el-form-item>
          <el-input v-model="x"> </el-input>
        </el-form-item>
        <!-- 选择器 -->
        <el-form-item>
          <el-select v-model="x">
            <el-option v-for="item in x" :key="item" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- 时间段 -->
        <el-form-item>
          <el-date-picker
            type="daterange"
            v-model="date"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <!-- 查询 -->
        <el-form-item>
          <el-button type="primary" @click="init">{{ '查询' }}</el-button>
        </el-form-item>
        <!-- 重置 -->
        <el-form-item>
          <el-button type="primary" @click="reset">{{ '重置' }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格主体 -->
    <el-card shadow="never" style="margin-bottom: 15px" :body-style="{ padding: '15px' }">
      <el-table row-key="id" :data="list" v-loading="loading">
        <!-- 标题 -->
        <el-table-column :label="'标题'" prop="userId"> </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" prop="userId" align="center" min-width="90">
          <template #default="{ row }">
            <!-- 详情 -->
            <el-button type="text" @click="clickDet(row)">{{ '详情' }}</el-button>
            <!-- 修改 -->
            <el-button type="text" @click="clickEdit(row)">{{ '修改' }}</el-button>
            <!-- 删除 -->
            <el-button type="text" @click="clickDel(row)">{{ '删除' }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="w100 f">
        <div class="fa"></div>
        <el-pagination
          style="margin-top: 20px"
          background
          layout="prev, pager, next"
          v-model="pagination.current"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          @current-change="nextPage"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import '@/assets/css/baseStyle.css'
import {} from '@/utils/baseTool'
// import {  } from '@/api/'

export default {
  props: {},
  data() {
    return {
      x: '',
      loading: false,
      list: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      date: null
    }
  },
  methods: {
    // 初始化
    init() {
      this.list.length = 0
      this.loading = true
      const params = {
        page: this.pagination.current,
        size: this.pagination.pageSize,
        timeZone: new Date().getTimezoneOffset() / -60
      }
      api(params)
        .then((res) => {
          console.log(res)
          // 如果这里报错，分页器会消失
          this.list = res.data
          this.pagination.total = res.total
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 重置
    reset() {
      this.pagination.current = 1
      this.date = [new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), new Date()]
      this.init()
    },
    // 下一页
    nextPage(p) {
      this.pagination.current = p
      this.init()
    }
  },
  mounted() {
    this.reset()
  }
}
</script>
<style scoped></style>
