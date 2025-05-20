<!-- 适用环境 vue3 Antd2.x-->
<!-- 留意样式引入和国际化 -->
<template>
  <div class="w100p h100p fy">
    <a-card class="fy">
      <div class="fw6 fz16 mb16">术语库</div>
      <div class="fe">
        <div class="fyc">
          <div class="fa"></div>
          <a-button type="primary" @click="toAdd">添加</a-button>
        </div>
      </div>
    </a-card>
    <a-card class="mt20 fa oy">
      <a-table class="" :dataSource="d.tableData" :columns="d.columns" :row-key="(record) => record.id || record.accountId" :scroll="{ x: 'max-content' }" :pagination="false">
        <!-- 名称 -->
        <template #name="{ record }">
          <div class="">{{ record.name || '-' }}</div>
        </template>

        <!-- 操作 -->
        <template #action="{ record }">
          <div class="f">
            <a-button type="link" @click.stop="toEdit(record)"> 编辑 </a-button>
            <a-button type="link" @click.stop="changeData(record, 'del')"> 删除 </a-button>
          </div>
        </template>
      </a-table>
      <div class="w100p f mt12 mb12">
        <div class="fa"></div>
        <a-pagination show-quick-jumper :current="d.pageNo" :pageSize="d.pageSize" :total="d.total" :show-total="(total) => `共${total}条`" @change="getList" />
      </div>
    </a-card>
    <addCom v-model:visible="d.showModal" :changeData="changeData" :in="d.in"></addCom>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, defineProps, defineEmits, defineExpose, watch, computed, nextTick, provide, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import router from '@/router';
import { useRouter, useRoute } from 'vue-router';
import addCom from './com/add';

const { __ } = document;
const route = useRoute();
const { t } = useI18n();
const props = defineProps(['']);
const emits = defineEmits(['']);
const d = reactive({
  showModal: false,
  loading: false,
  form: {},
  pageNo: 1,
  pageSize: 10,
  total: 0,
  tableData: [],
  columns: [
    {
      title: '序号',
      width: 80,
      align: 'center',
      customRender: ({ index }) => index + 1 + (d.pageNo - 1) * d.pageSize,
    },
    { align: 'center', title: '名称', slots: { customRender: 'name' } },
    { title: '操作', key: 'action', width: 80, align: 'center', slots: { customRender: 'action' } },
  ],
});
const init = () => {
  d.pageNo = 1;
  d.form = {};
  getList();
};

// 取 获取本地数组
export const getdata = () => {
  const data = [
    { id: __.getRandom(8), name: '术语1' },
    { id: __.getRandom(8), name: '术语2' },
    { id: __.getRandom(8), name: '术语3' },
    { id: __.getRandom(8), name: '术语4' },
    { id: __.getRandom(8), name: '术语5' },
    { id: __.getRandom(8), name: '术语6' },
    { id: __.getRandom(8), name: '术语7' },
    { id: __.getRandom(8), name: '术语8' },
    { id: __.getRandom(8), name: '术语9' },
    { id: __.getRandom(8), name: '术语10' },
    { id: __.getRandom(8), name: '术语11' },
  ];
  const fakeData = __.storage.get('fakeData');
  if (!fakeData) setData(data);
  return __.storage.get('fakeData');
};
// 存 更新本地数组
export const setData = (arr) => __.storage.set('fakeData', arr);
/*
  增 item插入到数组前面，示例 changeData({ id: __.getRandom(8), name: 'name' }, 'add');
  删 依据item中id删除，示例 changeData({ id: 12345678 }, 'del')
  改 依据item中id更新数组中对应条目，示例 changeData({ id: 12345678, name: 'name' }, 'edit');
*/
export const changeData = (item, type) => {
  const fakeData = getdata();
  if (type == 'add') fakeData.unshift(item);
  if (type == 'del') __.arrDelItem(fakeData, 'id', item.id);
  if (type == 'edit') fakeData[__.arrFindIndex(fakeData, 'id', item.id)] = { ...fakeData[__.arrFindIndex(fakeData, 'id', item.id)], ...item };
  setData(fakeData);
  getList(); // 刷新页面表格
};
// 查 从本地数组分页查询
export const searchData = (pageNo = 1, pageSize = 10) => {
  const fakeData = getdata();
  const res = {};
  const start = (pageNo - 1) * pageSize;
  const end = (pageNo - 1) * pageSize + 9;
  res.data = __.arrSlice(fakeData, start, end);
  res.total = fakeData.length;
  return res;
};

const toAdd = () => {
  d.showModal = true;
  d.in = {};
};
const toEdit = (item) => {
  d.showModal = true;
  d.in = item;
  console.log(`d.in:`, d.in);
};

// 获取下一页
const getList = async (pageNo = 1) => {
  if (d.listLoading) return;
  d.listLoading = true;
  d.pageNo = pageNo;

  const res = await searchData(d.pageNo, d.pageSize);
  d.total = res.total;
  d.tableData = res.data;
  d.listLoading = false;
};
onMounted(() => {
  console.log('props', props);
  init();
});
defineExpose({ d });
</script>

<style lang="less" scoped></style>
