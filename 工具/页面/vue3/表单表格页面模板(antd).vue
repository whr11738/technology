<template>
  <div class="w100p h100p fy">
    <a-card class="fy">
      <div class="fw6 fz16 mb16">报告</div>
      <div class="gx4 gg20 w100p">
        <div class="fyc">
          <div class="fa fz14" style="white-space: nowrap">关键字:</div>
          <a-input class="w80p" allow-clear placeholder="" style="min-width: 100px" v-model:value="d.form.nickname" />
        </div>
        <div class="fyc">
          <div class="fa fz14" style="white-space: nowrap">编报类型:</div>
          <a-select class="w80p" v-model:value="d.form.tagBusinessdirection" allow-clear placeholder="" style="min-width: 100px">
            <a-select-option v-for="i of d.tagList_fx" :key="i" :value="i.label">{{ i.value }}</a-select-option>
          </a-select>
        </div>
        <div class="fyc">
          <div class="fa fz14" style="white-space: nowrap">任务分组:</div>
          <a-select class="w80p" v-model:value="d.form.tagBusinessdirection" allow-clear placeholder="" style="min-width: 100px">
            <a-select-option v-for="i of d.tagList_fx" :key="i" :value="i.label">{{ i.value }}</a-select-option>
          </a-select>
        </div>
        <div class="fyc">
          <div class="fa fz14" style="white-space: nowrap">创建人:</div>
          <a-select class="w80p" v-model:value="d.form.tagBusinessdirection" allow-clear placeholder="" style="min-width: 100px">
            <a-select-option v-for="i of d.tagList_fx" :key="i" :value="i.label">{{ i.value }}</a-select-option>
          </a-select>
        </div>
        <div class="fyc">
          <div class="fa fz14" style="white-space: nowrap">创建时间:</div>
          <a-select class="w80p" v-model:value="d.form.tagBusinessdirection" allow-clear placeholder="" style="min-width: 100px">
            <a-select-option v-for="i of d.tagList_fx" :key="i" :value="i.label">{{ i.value }}</a-select-option>
          </a-select>
        </div>
        <div></div>
        <div></div>
        <div class="fyc">
          <div class="fa"></div>
          <a-button type="primary" @click="getList()">查询</a-button>
          <a-button class="ml8" @click="init">重置</a-button>
        </div>
      </div>
    </a-card>
    <a-card class="mt20 fa oy">
      <a-table class="" :dataSource="d.tableData" :columns="d.columns" :row-key="(record) => record.id || record.accountId" :scroll="{ x: 'max-content' }" :pagination="false">
        <!-- 名称 -->
        <template #name="{ record }">
          <div class="">{{ record.name || '-' }}</div>
        </template>
        <!-- 编报类型 -->
        <template #name1="{ record }">
          <div class="">{{ record.name || '-' }}</div>
        </template>
        <!-- 任务分组 -->
        <template #name2="{ record }">
          <div class="">{{ record.name || '-' }}</div>
        </template>
        <!-- 创建者 -->
        <template #name3="{ record }">
          <div class="">{{ record.name || '-' }}</div>
        </template>
        <!-- 协作人 -->
        <template #name4="{ record }">
          <div class="">{{ record.name || '-' }}</div>
        </template>
        <!-- 通报客户 -->
        <template #name5="{ record }">
          <div class="">{{ record.name || '-' }}</div>
        </template>
        <!-- 创建时间 -->
        <template #name6="{ record }">
          <div class="">{{ record.name || '-' }}</div>
        </template>
        <!-- 最近编辑时间 -->
        <template #name7="{ record }">
          <div class="">{{ record.name || '-' }}</div>
        </template>

        <!-- 操作 -->
        <template #action="{ record }">
          <div class="f">
            <a-button type="link" @click.stop="goDetail(record)"> 编辑 </a-button>
            <a-button type="link" @click.stop="goDetail(record)"> 查看 </a-button>
            <a-button type="link" @click.stop="goDetail(record)"> 更多 </a-button>
          </div>
        </template>
      </a-table>
      <div class="w100p f mt12 mb12">
        <div class="fa"></div>
        <a-pagination show-quick-jumper :current="d.pageNo" :pageSize="d.pageSize" :total="d.total" :show-total="(total) => `共${total}条`" @change="getList" />
      </div>
    </a-card>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, defineProps, defineEmits, defineExpose, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import router from '@/router';
import { useRouter, useRoute } from 'vue-router';
const { __ } = document;
const route = useRoute();
const { t } = useI18n();
const props = defineProps(['']);
const emits = defineEmits(['']);
const d = reactive({
  loading: false,
  tagList_fx: [],
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
    { align: 'center', title: '编报类型', slots: { customRender: 'name1' } },
    { align: 'center', title: '任务分组', slots: { customRender: 'name2' } },
    { align: 'center', title: '创建者', slots: { customRender: 'name3' } },
    { align: 'center', title: '协作人', slots: { customRender: 'name4' } },
    { align: 'center', title: '通报客户', slots: { customRender: 'name5' } },
    { align: 'center', title: '创建时间', slots: { customRender: 'name6' } },
    { align: 'center', title: '最近编辑时间', slots: { customRender: 'name7' } },
    { title: '操作', key: 'action', width: 80, align: 'center', slots: { customRender: 'action' } },
  ],
});
const init = () => {
  d.pageNo = 1;
  d.form = {};
  getList();
};
// 获取下一页
const getList = async (pageNo = 1) => {
  if (d.listLoading) return;
  d.listLoading = true;
  d.pageNo = pageNo;
  const res = await __.fakeApi(d.pageNo, 10, 11);
  d.total = res.total;
  d.tableData = res.data;
  d.listLoading = false;
};
const goDetail = (i) => {};
// watch(
//   () => props.visible,
//   () => {
//     init();
//   }
// );
onMounted(() => {
  console.log('props', props);
  init();
});
defineExpose({ d });
</script>

<style lang="less" scoped></style>
