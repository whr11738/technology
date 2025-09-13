<template>
  <div class="w100w h100h f p20" style="">
    <el-card class="w400" style="">
      <div class="oy" style="height: calc(100vh - 80px)">
        <div class="">目前已选路由:</div>
        <div class="mb20">{{ d.inRoute }}</div>
        <el-tree ref="treeRef" style="" :data="d.route" :props="{ children: 'children', label: 'label' }" :node-key="'id'" :expand-on-click-node="false" @node-click="handleNodeClick" />
      </div>
    </el-card>
    <el-card class="fa ml20 oy" style="">
      <div class="pt100 fc" v-show="d.loading">
        <a-spin></a-spin>
      </div>
      <div class="oy" style="height: calc(100vh - 80px)" v-show="!d.loading" id="formDom">
        <div v-for="i of d.formData" :key="i" class="">
          <!-- 输入框 -->
          <el-card v-if="i.type == 'text'" class="mb20">
            <div class="fyc mb20">
              <div class="mr20 fa">输入框</div>
              <el-button class="" style="margin-left: 0px" type="danger" @click="delFormData(i.id)">删除</el-button>
            </div>
            <div class="fyc mb20">
              <div class="mr20">标题</div>
              <el-input v-model="i.fieldName" style="width: 200px" placeholder="" />
            </div>
            <div class="fyc">
              <div class="mr20">最小长度</div>
              <el-input class="mr20" v-model="i.minLength" style="width: 100px" placeholder="" />
              <div class="mr20">最大长度</div>
              <el-input class="mr20" v-model="i.maxLength" style="width: 100px" placeholder="" />
              <div class="mr20">必填</div>
              <el-switch class="mr20" v-model="i.required" active-value="1" inactive-value="0" />
            </div>
          </el-card>
          <!-- 文本域 -->
          <el-card v-if="i.type == 'multiLineText'" class="mb20">
            <div class="fyc mb20">
              <div class="mr20 fa">文本域</div>
              <el-button class="" style="margin-left: 0px" type="danger" @click="delFormData(i.id)">删除</el-button>
            </div>
            <div class="fyc mb20">
              <div class="mr20">标题</div>
              <el-input v-model="i.fieldName" style="width: 200px" placeholder="" />
            </div>
            <div class="fyc">
              <div class="mr20">最小长度</div>
              <el-input class="mr20" v-model="i.minLength" style="width: 100px" placeholder="" />
              <div class="mr20">最大长度</div>
              <el-input class="mr20" v-model="i.maxLength" style="width: 100px" placeholder="" />
              <div class="mr20">必填</div>
              <el-switch class="mr20" v-model="i.required" active-value="1" inactive-value="0" />
            </div>
          </el-card>
          <!-- 选择器 -->
          <el-card v-if="i.type == 'dropdown'" class="mb20">
            <div class="fyc mb20">
              <div class="mr20 fa">选择器</div>
              <el-button class="" style="margin-left: 0px" type="danger" @click="delFormData(i.id)">删除</el-button>
            </div>
            <div class="fyc mb20">
              <div class="mr20">标题</div>
              <el-input v-model="i.fieldName" style="width: 200px" placeholder="" />
            </div>
            <div class="fy mb20">
              <div v-for="_i of i.options" :key="_i">
                <div class="f mb20">
                  <el-input class="mr20" v-model="_i.value" style="width: 200px" placeholder="" />
                  <el-button type="danger" @click="i.options = i.options.filter((o) => o != _i)">删除</el-button>
                </div>
              </div>
              <div>
                <el-button class="mb20" type="primary" @click="i.options.push({ label: 'options' + (i.options.length + 1), value: '' })">添加选项</el-button>
              </div>
            </div>
            <div class="fyc mb20">
              <div class="mr20">默认选项</div>
              <el-input class="mr20" v-model="i.default" style="width: 200px" placeholder="" />
              <div class="mr20">必填</div>
              <el-switch class="mr20" v-model="i.required" active-value="1" inactive-value="0" />
            </div>
          </el-card>
          <!-- 单选框 -->
          <el-card v-if="i.type == 'radio'" class="mb20">
            <div class="fyc mb20">
              <div class="mr20 fa">单选框</div>
              <el-button class="" style="margin-left: 0px" type="danger" @click="delFormData(i.id)">删除</el-button>
            </div>
            <div class="fyc mb20">
              <div class="mr20">标题</div>
              <el-input v-model="i.fieldName" style="width: 200px" placeholder="" />
            </div>
            <div class="fy mb20">
              <div v-for="_i of i.options" :key="_i">
                <div class="f mb20">
                  <el-input class="mr20" v-model="_i.value" style="width: 200px" placeholder="" />
                  <el-button type="danger" @click="i.options = i.options.filter((o) => o != _i)">删除</el-button>
                </div>
              </div>
              <div>
                <el-button class="mb20" type="primary" @click="i.options.push({ label: 'options' + (i.options.length + 1), value: '' })">添加选项</el-button>
              </div>
            </div>
            <div class="fyc mb20">
              <div class="mr20">默认选项</div>
              <el-input class="mr20" v-model="i.default" style="width: 200px" placeholder="" />
              <div class="mr20">必填</div>
              <el-switch class="mr20" v-model="i.required" active-value="1" inactive-value="0" />
            </div>
          </el-card>
          <!-- 复选框 -->
          <el-card v-if="i.type == 'checkbox'" class="mb20">
            <div class="fyc mb20">
              <div class="mr20 fa">复选框</div>
              <el-button class="" style="margin-left: 0px" type="danger" @click="delFormData(i.id)">删除</el-button>
            </div>
            <div class="fyc mb20">
              <div class="mr20">标题</div>
              <el-input v-model="i.fieldName" style="width: 200px" placeholder="" />
            </div>
            <div class="fy mb20">
              <div v-for="_i of i.options" :key="_i">
                <div class="f mb20">
                  <el-input class="mr20" v-model="_i.value" style="width: 200px" placeholder="" />
                  <el-button type="danger" @click="i.options = i.options.filter((o) => o != _i)">删除</el-button>
                </div>
              </div>
              <div>
                <el-button class="mb20" type="primary" @click="i.options.push({ label: 'options' + (i.options.length + 1), value: '' })">添加选项</el-button>
              </div>
            </div>
            <div class="fyc mb20">
              <div class="mr20">默认选项</div>
              <el-input class="mr20" v-model="i.default" style="width: 200px" placeholder="" />
              <div class="mr20">必填</div>
              <el-switch class="mr20" v-model="i.required" active-value="1" inactive-value="0" />
            </div>
          </el-card>
          <!-- 日期选择 -->
          <el-card v-if="i.type == 'date'" class="mb20">
            <div class="fyc mb20">
              <div class="mr20 fa">日期选择</div>
              <el-button class="" style="margin-left: 0px" type="danger" @click="delFormData(i.id)">删除</el-button>
            </div>
            <div class="fyc mb20">
              <div class="mr20">标题</div>
              <el-input v-model="i.fieldName" style="width: 200px" placeholder="" />
            </div>
            <div class="fyc mb20">
              <div class="mr20">默认当前日期</div>
              <el-switch class="mr20" v-model="i.defaultCurrentData" active-value="1" inactive-value="0" />
              <div class="mr20">必填</div>
              <el-switch class="mr20" v-model="i.required" active-value="1" inactive-value="0" />
            </div>
          </el-card>
          <!-- 时间选择 -->
          <el-card v-if="i.type == 'time'" class="mb20">
            <div class="fyc mb20">
              <div class="mr20 fa">时间选择</div>
              <el-button class="" style="margin-left: 0px" type="danger" @click="delFormData(i.id)">删除</el-button>
            </div>
            <div class="fyc mb20">
              <div class="mr20">标题</div>
              <el-input v-model="i.fieldName" style="width: 200px" placeholder="" />
            </div>
            <div class="fyc mb20">
              <div class="mr20">默认当前时间</div>
              <el-switch class="mr20" v-model="i.defaultCurrentTime" active-value="1" inactive-value="0" />
              <div class="mr20">必填</div>
              <el-switch class="mr20" v-model="i.required" active-value="1" inactive-value="0" />
            </div>
          </el-card>
        </div>
      </div>
    </el-card>
    <el-card class="ml20 w280" style="">
      <div class="fy oy" style="height: calc(100vh - 80px)">
        <div class="gg20 gx2">
          <el-button class="" style="height: 40px; margin-left: 0px" type="primary" @click="addFormData('text')">输入框</el-button>
          <el-button class="" style="height: 40px; margin-left: 0px" type="primary" @click="addFormData('multiLineText')">文本域</el-button>
          <el-button class="" style="height: 40px; margin-left: 0px" type="primary" @click="addFormData('dropdown')">选择器</el-button>
          <el-button class="" style="height: 40px; margin-left: 0px" type="primary" @click="addFormData('radio')">单选框</el-button>
          <el-button class="" style="height: 40px; margin-left: 0px" type="primary" @click="addFormData('checkbox')">复选框</el-button>
          <el-button class="" style="height: 40px; margin-left: 0px" type="primary" @click="addFormData('date')">日期选择</el-button>
          <el-button class="" style="height: 40px; margin-left: 0px" type="primary" @click="addFormData('time')">时间选择</el-button>
        </div>
        <div class="fa"></div>
        <el-button class="mt20" style="margin-left: 0px" type="success" @click="save">保存</el-button>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, provide } from 'vue';
import { ElMessage } from 'element-plus';
import userStore from '@/store/user';
import axios from 'axios';

const { __ } = document;

const d = reactive({
  inRoute: '',
  formData: [],
  route: [
    {
      id: '/Management',
      label: 'Management',
      children: [
        {
          id: '/Management/Unit',
          label: 'Unit',
          children: [
            {
              id: '/Management/Unit/OffenderUnit',
              label: 'Offender Unit',
              children: [
                {
                  id: '/Management/Unit/OffenderUnit/General',
                  label: 'General',
                  children: [],
                },
                {
                  id: '/Management/Unit/OffenderUnit/Parameters',
                  label: 'Parameters',
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});

const scrollToBottom = (domElement) => (domElement.scrollTop = domElement.scrollHeight);

const save = () => {
  for (let i of d.formData) {
    console.log('i', i);
  }
  console.log('保存', d.formData);
  const p = { name: d.inRoute, value: JSON.stringify(d.formData) };

  const params = { params: JSON.stringify(p) };
  const headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
  axios.post('http://192.168.30.28:8081/iot/ajax.html?svc=customer/customer_menu_save', params, headers).then((res) => {
    console.log('res', res);
    if (res.data.code == 200) ElMessage.success('保存成功');
  });
};

const delFormData = (id) => {
  d.formData = d.formData.filter((i) => i.id != id);
};

const addFormData = (type) => {
  switch (type) {
    // 输入框
    case 'text':
      var newField = {
        id: Date.now().toString(),
        type: 'text',
        fieldName: '',
        minLength: null,
        maxLength: null,
        required: '0',
      };
      break;
    // 文本域
    case 'multiLineText':
      var newField = {
        id: Date.now().toString(),
        type: 'multiLineText',
        fieldName: '',
        minLength: null,
        maxLength: null,
        required: '0',
      };
      break;
    // 选择器
    case 'dropdown':
      var newField = {
        id: Date.now().toString(),
        type: 'dropdown',
        fieldName: '',
        default: '0',
        required: '0',
        options: [{ label: 'options', value: '选项1' }],
      };
      break;
    // 单选框
    case 'radio':
      var newField = {
        id: Date.now().toString(),
        type: 'radio',
        fieldName: '',
        default: '0',
        required: '0',
        options: [{ label: 'options', value: '选项1' }],
      };
      break;
    // 复选框
    case 'checkbox':
      var newField = {
        id: Date.now().toString(),
        type: 'checkbox',
        fieldName: '',
        default: '0',
        required: '0',
        options: [{ label: 'options', value: '选项1' }],
      };
      break;
    // 日期选择
    case 'date':
      var newField = {
        id: Date.now().toString(),
        type: 'date',
        fieldName: '',
        defaultCurrentData: '0',
        required: '0',
      };
      break;
    // 时间选择
    case 'time':
      var newField = {
        id: Date.now().toString(),
        type: 'time',
        fieldName: '',
        defaultCurrentTime: '0',
        required: '0',
      };
      break;
  }

  d.formData.push(newField);
  console.log('d.formData', d.formData);
  setTimeout(() => {
    scrollToBottom(__.getDom('formDom'));
  }, 10);
};

// 获取 el-tree 的 ref
const treeRef = ref(null);
// 判断是否为叶子节点
const isLeaf = (node) => {
  return !node.children || node.children.length === 0;
};
// 递归查找第一个叶子节点
const findFirstLeafNode = (nodes) => {
  for (const node of nodes) {
    if (isLeaf(node)) {
      return node; // 找到第一个叶子节点
    }
    if (node.children && node.children.length > 0) {
      const found = findFirstLeafNode(node.children);
      if (found) return found;
    }
  }
  return null;
};
// 处理节点点击
const handleNodeClick = (data, node) => {
  if (!isLeaf(data)) {
    // ElMessage.warning('只能选择最底层的子节点（叶子节点）');
    return;
  }
  console.log('选中的叶子节点:', data);
  d.inRoute = data.id; // 显示当前选中的路由
  init(data.id);
};

const init = (route) => {
  if (!route) return;
  const p = { name: route };
  const params = { params: JSON.stringify(p) };
  const headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
  d.loading = true;
  axios
    .post('http://192.168.30.28:8081/iot/ajax.html?svc=customer/get_menus', params, headers)
    .then((res) => {
      d.formData = [];
      const r = res?.data?.data;
      if (r) {
        d.formData = JSON.parse(r.value);
        console.log('d.formData', d.formData);
      }
    })
    .finally(() => {
      d.loading = false;
    });
};

provide('d', d);

onMounted(() => {
  const firstLeaf = findFirstLeafNode(d.route);
  if (firstLeaf && treeRef.value) {
    treeRef.value.setCurrentKey(firstLeaf.id);
    console.log('默认选中路由:', firstLeaf.id);
    d.inRoute = firstLeaf.id; //当前选中的路由
  } else ElMessage.warning('未找到可选择的叶子节点');
  if (firstLeaf.id) init(d.inRoute);
});
</script>

<style scoped></style>
