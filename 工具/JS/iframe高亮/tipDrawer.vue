<template>
  <!-- 信息核查 参考采集源 抽屉 组件  -->
  <div>
    <!-- <div class="" style="">1</div> -->
    <!-- :mask="false"
      :maskClosable="false" 
    :title="d.item?.label || d.titleShow"
    -->
    <a-drawer
      :body-style="{ padding: '12px 24px', background: '#fff', height: 'calc(100% - 55px)' }"
      height="80%"
      placement="bottom"
      :visible="visible"
      title="采集信息溯源"
      @update:visible="updateVisible"
      @close="emits('upDataSelectIndex', null)">
      <div class="fy h100p">
        <div class="infoTopRow">
          <div class="infoRow-label">
            <span v-if="d.item?.personResumeDetail || d.item?.topic">{{ d.item.personResumeDetail || d.item.topic }}</span>
            <span v-else-if="d.item?.dataType">{{ d.item.title }}</span>
            <div v-else-if="d.titleShow" class="relationType">
              关系：{{ showDrawerData[route.query.type + 'Code'] }}
              <!-- 关系： {{ d.item.orgCode || d.item.personCode }} -->
              <!-- <span class="tagbox">
                <a-tag color="blue" style="width: "> {{ d.item.relationType }} </a-tag>
              </span> -->
              <div class="arrowDiv">
                <div class="arrowDiv_relationType">{{ d.item.relationType }}</div>
                <div class="f arrowDiv_arrow">
                  <div class="arrowDiv_arrow_left"></div>
                  <CaretRightOutlined style="margin-left: -6px; min-width: 16px"></CaretRightOutlined>
                </div>
              </div>
              {{ d.titleShow }}
              <span class="tagbox" v-if="d.item.isTranCloum">
                <a-tag color="blue" style="width: "> 中译 </a-tag>
              </span>
            </div>
            <span v-else>字段： {{ d.item?.label }}</span>

            <a-button type="primary" class="ml12" size="small" @click="changeUp">上一条</a-button>
            <a-button type="primary" class="ml12" size="small" @click="changeDown">下一条</a-button>
          </div>
          <div class="fyc">
            <a-radio-group v-model:value="d.item.dealType" size="small" v-if="showType == 'info' && route.query.form != 'result'" @change="changeDealType">
              <a-radio-button value="replace">替换</a-radio-button>
              <a-radio-button value="merge">合并</a-radio-button>
              <a-radio-button value="ignore">忽略</a-radio-button>
            </a-radio-group>
            <a-radio-group v-model:value="d.item.sureFalg" size="small" v-else-if="showType == 'table' && route.query.form != 'result'" @change="changeDealTable">
              <a-radio-button :value="true">确认</a-radio-button>
              <a-radio-button :value="false">忽略</a-radio-button>
            </a-radio-group>
          </div>
        </div>

        <div class="infoRow" v-if="d.item?.name && route.query.form != 'result'">
          <!-- tmpRecord.originJson[d.item.name] == d.recordTmp 没有翻译 -->
          <!-- <template v-if="!tmpRecord?.originJson || tmpRecord?.originJson[d.item?.name] == d.originRecordTmp"> -->
          <template
            v-if="!tmpRecord?.originJson || ['cnname', 'enname', 'nameForeign', 'othername', 'enaliasname', 'email', 'wikilinkEn', 'wikilinkCn', 'fbAccount', 'twAccount'].includes(d.item.name)">
            <div class="infoRow-item">
              <div class="infoRow-item-label">采集内容：</div>
              <a-input v-model:value="d.recordTmp" @change="changeDealType"></a-input>
            </div>
          </template>
          <template v-else>
            <div class="infoRow-item">
              <div class="infoRow-item-label">采集内容(中译)：</div>
              <a-input v-model:value="d.recordTmp" @change="changeDealType"></a-input>
            </div>
            <div class="infoRow-item" v-if="tmpRecord?.originJson">
              <div class="infoRow-item-label">采集内容(原文)：</div>
              <a-input v-model:value="tmpRecord.originJson[d.item.name]" @change="changeDealType" disabled></a-input>
            </div>
          </template>
          <div class="infoRow-item">
            <div class="infoRow-item-label">档案库：</div>
            <a-input v-model:value="archivesEntityRecoredConst[d.item.name]" :disabled="true"></a-input>
          </div>
          <div class="infoRow-item">
            <div class="infoRow-item-label">效果预览：</div>
            <a-input v-model:value="archivesEntityRecored[d.item.name]" :disabled="true"></a-input>
            <!-- <span>{{ archivesEntityRecored[d.item.name] || '-'}}</span> -->
          </div>
        </div>

        <div class="infoRow" v-if="d.item?.origin && d.item?.relationCnname">
          <div class="infoRow-item" style="flex: 0">
            <div class="infoRow-item-label" style="width: 70px">中文名：</div>
            <a-input v-model:value="d.item.relationCnname" style="width: 300px"></a-input>
          </div>
          <div class="infoRow-item" style="flex: 0">
            <div class="infoRow-item-label" style="width: 70px">名称：</div>
            <a-input v-model:value="d.item.origin" disabled style="width: 300px"></a-input>
          </div>
          <div class="infoRow-item" style="flex: 0">
            <div class="infoRow-item-label" style="width: 70px">备注：</div>
            <!-- <a-input v-model:value="d.item.remark" :disabled="route.query.form == 'result'" style="width: 300px"></a-input> -->
            <a-input-search v-model:value.trim="d.item.remark" @search="iframeSearch('remark')" style="width: 300px"></a-input-search>
            <a-button class="mr16 ml16" @click="searchUp">
              <template #icon><upOutlined /></template>
            </a-button>
            <a-button @click="searchDown">
              <template #icon><downOutlined /></template>
            </a-button>
          </div>
        </div>

        <!-- 标题 -->
        <div class="mb12 fyc content-top" style="">
          <div class="fyc">
            <div class="fz14" style="">参考采集源</div>
            <div class="fz14 fw7 ml8" style="color: #0055ff">共{{ d.list.length }}个</div>
            <a-input-search v-model:value.trim="d.searchData" @search="iframeSearch('searchData')" style="width: 280px; margin-left: 10px"></a-input-search>
            <a-button class="mr16 ml16" @click="searchUp('searchData')">
              <template #icon><upOutlined /></template>
            </a-button>
            <a-button @click="searchDown('searchData')">
              <template #icon><downOutlined /></template>
            </a-button>
          </div>

          <div class="fyc ml36" v-if="d.list?.length > 0">
            <div class="fz14" style="">备注</div>
            <!-- <div class="fz14 fw7 ml8" style="color: #0055ff">共{{ d.list.length }}个</div> -->
            <a-input-search v-model:value.trim="d.remark" @search="iframeSearch('remark')" style="width: 420px; margin-left: 10px"></a-input-search>
            <a-button class="mr16 ml16" @click="searchUp('remark')">
              <template #icon><upOutlined /></template>
            </a-button>
            <a-button @click="searchDown('remark')">
              <template #icon><downOutlined /></template>
            </a-button>
          </div>

          <!-- <div class="fyc">
            <a-radio-group v-model:value="d.item.dealType" v-if="showType=='info'&&route.query.form!='result'" @change="changeDealType">
              <a-radio-button value="replace">替换</a-radio-button>
              <a-radio-button value="merge">合并</a-radio-button>
              <a-radio-button value="ignore">忽略</a-radio-button>
            </a-radio-group>
            <a-radio-group v-model:value="d.item.sureFalg" v-else-if="showType=='table'&&route.query.form!='result'">
              <a-radio-button :value="true">确认</a-radio-button>
              <a-radio-button :value="false">忽略</a-radio-button>
            </a-radio-group>
            <a-button type="primary" class="ml12" @click="changeUp">上一条</a-button>
            <a-button type="primary" class="ml12" @click="changeDown">下一条</a-button>
          </div> -->
        </div>

        <div class="tipContent">
          <!-- 菜单 -->
          <div class="tipMenu">
            <!-- <a-menu v-model:selectedKeys="d.selHrefKey" v-model:openKeys="d.openKeys" @click="transformIP" mode="inline"> -->
            <a-menu v-model:selectedKeys="d.selHrefIndex" @click="transformIP" v-if="showType == 'table'">
              <!-- <a-menu v-model:selectedKeys="d.selHrefIndex" @click="transformIP"> -->
              <a-menu-item v-for="(item, index) in d.list" :key="index">
                <a-popover placement="rightTop">
                  <template #content>
                    <div style="max-width: 50vw">
                      <div v-if="item?.fieldList?.length" style="font-weight: 700">
                        找到 <span style="color: red">{{ item.fieldList.length }}</span> 条属性
                      </div>
                      <div v-if="item?.fieldList?.length" class="fieldListShow">
                        <span v-for="(item1, index) in item.fieldList" :key="item1.field"> {{ item1.fieldName }} <span v-if="index != item.fieldList.length - 1">、</span> </span>
                      </div>
                      <div style="margin-top: 6px; font-weight: 700; font-size: 16px">{{ item.name }}</div>
                    </div>
                  </template>
                  <div class="tipItem">
                    <span v-if="item?.fieldList?.length">({{ item.fieldList.length }})</span>{{ item.name }}
                  </div>
                </a-popover>
              </a-menu-item>
            </a-menu>
            <a-menu v-model:selectedKeys="d.selHrefKey" v-model:openKeys="d.openKeys" @click="transformIPInfo" mode="inline" v-else-if="showType == 'info'">
              <a-sub-menu v-for="(item, index) in d.list" :key="index">
                <template #title>
                  <a-popover placement="rightTop">
                    <template #content>
                      <div style="max-width: 50vw">
                        <div v-if="item?.fieldList?.length" style="font-weight: 700">
                          找到 <span style="color: red">{{ item.fieldList.length }}</span> 条属性
                        </div>
                        <div v-if="item?.fieldList?.length" class="fieldListShow">
                          <span v-for="(item1, index) in item.fieldList" :key="item1.field"> {{ item1.fieldName }} <span v-if="index != item.fieldList.length - 1">、</span> </span>
                        </div>
                        <div style="margin-top: 6px; font-weight: 700; font-size: 16px">{{ item.name }}</div>
                      </div>
                    </template>
                    <div class="tipItem">
                      <span v-if="item?.fieldList?.length && item.total">({{ item.read }}/{{ item.total }})</span>{{ item.name }}
                    </div>
                  </a-popover>
                </template>

                <a-menu-item v-for="item1 in item.fieldList" :key="index + item1.field"> {{ item1.fieldName }}<span v-show="item1.isRead">(已读)</span> </a-menu-item>
              </a-sub-menu>
            </a-menu>
          </div>
          <!-- 卡片 -->
          <div class="fa oy h100p" style="width: 0" v-if="d.list?.length > 0">
            <div class="p8 br8 bc2 sd m4 h100p" style="height: calc(100% - 8px)">
              <div class="f w100p fyc">
                <!-- 头像 -->
                <!-- <img v-if="d.list[d.selHrefIndex[0]].img" class="" style="" :src="d.list[d.selHrefIndex[0]].img" alt="" />
                <div v-else class="fz12 fc w40 h40 mr8 br50p bc1 oh fw" style="color: #fff">无头像</div> -->
                <div class="fy fa" style="width: 0px">
                  <div class="fw8 e fz16" style="">{{ d.list[d.selHrefIndex[0]].name }}</div>
                  <div class="fz14 e sourceUrl" style="">
                    <a :href="d.urlShow" target="_blank">{{ d.urlShow }}</a>
                  </div>
                </div>
                <div class="fyc mr14" v-if="d.showType == 'txt'">翻译：<a-switch v-model:checked="d.isTranslate" @change="changeTranaslate"></a-switch></div>
                <a-radio-group v-model:value="d.showType" button-style="solid" @change="transformIP">
                  <a-radio-button value="txt">纯文本</a-radio-button>
                  <a-radio-button value="source">原文</a-radio-button>
                </a-radio-group>
                <!-- <div>
                  <a-radio-group v-model:value="d.showType" button-style="solid" class="mr16">
                    <a-radio-button value="txt">纯文本</a-radio-button>
                    <a-radio-button value="source">原文</a-radio-button>
                  </a-radio-group>
                  <a-button type="link" @click="open(d.list[d.selHrefIndex[0]])">打开</a-button>
                </div> -->
              </div>

              <div class="p8 br8" style="background: #eff; height: calc(100% - 48px)">
                <div v-if="d.showType == 'txt'" class="h100p w100w ox oy iframeHeight">
                  <a-spin :spinning="d.translateLoading" tip="翻译中">
                    <div class="txtContent" id="txtContentDom" v-html="d.txtContent"></div>
                  </a-spin>
                </div>
                <!-- 正文 -->
                <div class="ox oy w100p h100p" v-else>
                  <iframe id="tipIframe" charset="utf-8" :src="d.urlShow" class="w100w iframeHeight"></iframe>
                  <!-- <iframe id="tipIframe" src="http://localhost:8002/entityExtraction/addCollectionTask?id=1826927507561107457&name=%E4%BA%BA%E7%89%A9_20240823182035&description=null&type=1&source=7&createTime=2024-08-23+18:20:35" class="iframeHeight"></iframe> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <a-empty v-if="d.list?.length ==0"></a-empty> -->
        <!-- <div class="f pt8 mt8" style="border-top: 1px solid #ececec" v-if="route.query.form != 'result'">
          <div v-show="d.showTool" class="f">
            <a-radio-group v-model:value="d.item.dealType" v-if="d.item">
              <a-radio-button value="replace">替换</a-radio-button>
              <a-radio-button value="merge">合并</a-radio-button>
              <a-radio-button value="ignore">忽略</a-radio-button>
            </a-radio-group>
          </div>
        </div> -->
      </div>
    </a-drawer>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, computed, defineProps, defineEmits, defineExpose, watch, nextTick } from 'vue';
const { __ } = document;
import entityExtractionApi from '@/api/entityExtractionApi';
import { useRouter, useRoute } from 'vue-router';
import Fuse from '@/utils/fuse.js';
import GlobalSearchApi from '@/api/GlobalSearchApi';

const route = useRoute();
const props = defineProps(['visible', 'showDrawerData', 'targetAllLabelData', 'selectIndex', 'local', 'tmpRecord', 'archivesEntityRecored', 'archivesEntityRecoredConst', 'showType']);
const emits = defineEmits(['update:visible', 'inReplaceData', 'inMergeData', 'upDataSelectIndex', 'nextTable', 'changeDealType', 'changeDealTable']);
const d = reactive({
  loading: false,
  list: [],
  item: null,
  replaceFlag: false,
  mergeFlag: false,
  showTool: false,
  selHrefIndex: [0],
  searchData: '',
  searchDataConst: '',
  searchDataTransalte: '',
  titleShow: '',
  recordTmp: '',
  originRecordTmp: '',
  showType: 'txt',
  urlShow: '',
  txtContent: '',
  txtContentConst: '',
  txtContentTransalte: '',
  selTxtIndex: 0,
  isTranslate: false,
  searchType: '',
  selHrefKey: [],
  openKeys: ['0'],
  selIframeIndex: 0,
  translateLoading: false,
  remark: '',
  originRemark: '',
  oldIframeUrl: '',
  newIframeUrl: '',
});
// 改变显示状态
const updateVisible = (v) => {
  emits('update:visible', v);
};
// 打开网页
const open = (item) => {
  window.open(item.source);
};
// 替换 撤销替换
const inReplaceData = () => {
  emits('inReplaceData', d.item);
  d.replaceFlag = props.targetAllLabelData[props.selectIndex].replaceFlag;
};
// 改变保存类型
const changeDealType = () => {
  props.tmpRecord[d.item.name] = d.recordTmp;
  emits('changeDealType', d.item);
};

// table改变保存类型
const changeDealTable = () => {
  props.tmpRecord[d.item.name] = d.recordTmp;
  emits('changeDealTable', d.item);
};

// 合并 撤销合并
const inMergeData = () => {
  emits('inMergeData', d.item);
  d.mergeFlag = props.targetAllLabelData[props.selectIndex].mergeFlag;
};
// 上一条
const changeUp = () => {
  if (props.showType == 'info') {
    if (props.selectIndex == 0) return;
    const index = props.selectIndex - 1;
    emits('upDataSelectIndex', index, 'up');
  } else if (props.showType == 'table') {
    emits('upTable');
  }
};
// 下一条
const changeDown = () => {
  if (props.showType == 'info') {
    if (props.selectIndex == props.targetAllLabelData.length - 1) return;
    const index = props.selectIndex + 1;
    emits('upDataSelectIndex', index, 'next');
  } else if (props.showType == 'table') {
    emits('nextTable');
  }
};
// 初始化item
const init_item = (selectIndex) => {
  const item = props.targetAllLabelData[selectIndex];
  if (!item) return;
  d.item = item;
  d.replaceFlag = item.replaceFlag;
  d.mergeFlag = item.mergeFlag;
};
const init = async () => {
  console.log('🚀 ~ init ~ props.showDrawerData.dataType:', props.showDrawerData.dataType);
  if (props.showType == 'info') {
    // left-采集内容 right=档案内容
    const fn = props.local === 'left' ? entityExtractionApi.gatherLog : entityExtractionApi.archivesLog;
    let params = null;
    if (props.local === 'left') {
      params = {
        dataType: route.query.type,
        field: d.item.name,
        gatherId: route.query.personId,
        taskId: route.query.taskId,
      };
    } else {
      params = {
        dataType: route.query.type,
        field: d.item.name,
        ztkId: route.query.archivesId,
      };
    }
    let res = await fn(params);
    d.list = res.data || [];

    // for (let index = 0; index < d.list.length; index++) {
    //   const element = d.list[index];
    //   element.total = element.fieldList.length;
    //   element.read = 0;
    //   for (let index1 = 0; index1 < element.fieldList.length; index1++) {
    //     const element1 = element.fieldList[index1];
    //     element1.isRead = false;
    //   }
    // }
    // console.log('🚀 ~ init ~ d.list:', d.list);
  } else if (props.showType == 'table') {
    if (props.showDrawerData.dataType == 'sponsor') {
      console.log('props.showDrawerData', props.showDrawerData);
      let params = {
        taskId: props.showDrawerData.taskId,
        gatherId: route.query.personId,
        dataType: 'sponsor',
        content: props.showDrawerData.origin,
      };
      await entityExtractionApi.gatherSourceLog(params).then((res) => {
        if (res?.data) {
          d.list = res.data || [];
        }
      });
    } else if (props.showDrawerData.dataType == 'speech') {
      console.log('props.showDrawerData', props.showDrawerData);
      let params = {
        taskId: props.showDrawerData.taskId,
        gatherId: route.query.personId,
        dataType: 'speech',
        content: props.showDrawerData.origin,
      };
      await entityExtractionApi.gatherSourceLog(params).then((res) => {
        if (res?.data) {
          d.list = res.data || [];
        }
      });
    } else if (props.showDrawerData.dataType == 'scandal') {
      console.log('props.showDrawerData', props.showDrawerData);
      let params = {
        taskId: props.showDrawerData.taskId,
        gatherId: route.query.personId,
        dataType: 'scandal',
        content: props.showDrawerData.origin,
      };
      await entityExtractionApi.gatherSourceLog(params).then((res) => {
        if (res?.data) {
          d.list = res.data || [];
        }
      });
    } else if (props.showDrawerData.personResumeType) {
      let params = {
        taskId: props.showDrawerData.taskId,
        gatherId: props.showDrawerData.personId,
        dataType: 'resume',
        logType: props.showDrawerData.personResumeType,
        content: props.showDrawerData.origin,
      };
      await entityExtractionApi.gatherSourceLog(params).then((res) => {
        if (res?.data) {
          d.list = res.data || [];
        }
      });
    } else {
      let logList = props.showDrawerData.relationType.split(';').map((e) => {
        return new Promise((reolve) => {
          const p = {
            taskId: props.showDrawerData.taskId,
            gatherId: route.query.personId,
            relationId: props.showDrawerData.rowKey.split('_')[0],
            // relationType: e,
          };
          entityExtractionApi.relationSourceLog(p).then((res) => {
            reolve(res);
          });
        });
      });

      await Promise.all(logList).then((res) => {
        d.list = res.reduce((newList, item) => {
          newList.push(...item.data);
          return newList;
        }, []);
      });
    }
  }
  setReadAttribute();
  // if (props.showType == 'info') transformIPInfo();
  // else transformIP();
  // if (props.showType != 'info') {
  if (d.list?.length > 0 && d.list[d.selHrefIndex]?.remark) {
    d.remark = d.list[d.selHrefIndex].remark;
    d.originRemark = d.list[d.selHrefIndex].remark;
    if (props.showType == 'info') {
      const searchName = d.selHrefKey[0].slice(1);
      const recordIndex = d.list[d.selHrefKey[0][0]].fieldList.findIndex((item) => item.field == searchName);
      // d.list[d.selHrefKey[0][0]].fieldList[recordIndex].isRead = true;
      if (!d.list[d.selHrefKey[0][0]].fieldList[recordIndex].isRead) {
        d.list[d.selHrefKey[0][0]].read = d.list[d.selHrefKey[0][0]].read ? d.list[d.selHrefKey[0][0]].read + 1 : 1;
      }
      d.list[d.selHrefKey[0][0]].total = d.list[d.selHrefKey[0][0]].fieldList.length;
      d.list[d.selHrefKey[0][0]].fieldList[recordIndex].isRead = true;
      setIsRead(d.list[d.selHrefKey[0][0]].fieldList[recordIndex].field);
    }
  } else {
    if (props.showType != 'info') {
      d.remark = d.item?.remark || '';
      d.originRemark = d.item?.remark || '';
    } else {
      d.remark = '';
      d.originRemark = '';
    }
  }
  // }
  transformIP();
  setTimeout(() => {
    injectFun();
    const tipIframe = document.getElementById('tipIframe');
    console.log('tipIframe', tipIframe);
    if (tipIframe) {
      // 监听 tipIframe 是否加载完成，加载完成插入脚本
      tipIframe.onload = () => {
        injectFun();
      };
    }
  }, 100);
};
// 给iframe插入方法
const injectFun = () => {
  if (d.showType == 'txt') {
    // iframeSearch('remark');
    changeTranaslate();
    return;
  }
  const tipIframe = document.getElementById('tipIframe');
  console.log('🚀 ~ injectFun ~ tipIframe:', tipIframe);
  // const tipIframeWindow = tipIframe.contentWindow;
  // const tipIframeDoc = tipIframe.contentWindow.document;
  // if(tipIframe?.contentWindow){
  setTimeout(() => {
    let contentJS = `
      let selIndex = -1;
      function setHighLight(textToHighlight) {
          const context = document.querySelector('body');
          const instance = new Mark(context);
          instance.unmark();
          const words = textToHighlight.split(/[,;、]\s*/);
          words.forEach(item=>{
              instance.mark(item,{acrossElements:true});
          })
          const highlightDoc = document.getElementsByTagName('mark');
          if(highlightDoc&&highlightDoc[0]){
              selIndex = 0;
              scrollWindow();
          }
      }

      function selTargetDom(type) {
          const highlightDoc = document.getElementsByTagName('mark');
          if(type == 'up'){
              selIndex--;
              if(highlightDoc[selIndex]===undefined) selIndex = highlightDoc.length-1;
              scrollWindow();
          }else if(type == 'down'){
              selIndex++;
              if(highlightDoc[selIndex]===undefined) selIndex = 0;
              scrollWindow();
          }
      }

      function scrollWindow(){
          const highlightDoc = document.getElementsByTagName('mark');
          if(highlightDoc[selIndex]){
              // 计算目标元素的位置
              const elementRect = highlightDoc[selIndex].getBoundingClientRect();
              const elementTop = elementRect.top + window.pageYOffset;
              // 计算目标位置，考虑偏移量
              const targetPosition = elementTop - 100;
              // 平滑滚动到目标位置
              window.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth'
              });
          }
      }

      setHighLight('${d.searchData}');
    `;
    tipIframe.contentWindow.postMessage(
      {
        type: 'injectScript',
        script: contentJS,
      },
      '*',
    );

    setTimeout(() => {
      if (d.isTranslate) changeTranaslate();
      else iframeSearch('remark');
      // changeTranaslate();
    }, 200);
  }, 200);
  // }
};

// 是否要翻译判断
const isMajorityChinese = (str1) => {
  const str = str1.replace(/\s+/g, '');
  const chineseRegex = /[\u4e00-\u9fa5]/; // 匹配中文字符的正则表达式
  let chineseCount = 0;
  let totalCount = 0;

  for (let i = 0; i < str.length; i++) {
    if (chineseRegex.test(str[i])) {
      chineseCount++;
    }
    totalCount++;
  }

  return chineseCount / totalCount > 0.5; // 如果中文字符占比超过一半，返回true
};

// txt翻译
const changeTranaslate = async () => {
  if (d.isTranslate) {
    if (!isMajorityChinese(d.txtContentConst)) {
      d.translateLoading = true;
      let titleTran = '';
      const idEnd = d.item.name || props.showDrawerData.rowKey;
      const searchName = d.selHrefKey[0].slice(1);
      if (!d.searchData) titleTran = `${d.searchData ? d.searchData : '无内容'};;;${d.remark ? d.remark : '无备注'}`;
      const contentTranslate = d.oldIframeUrl == d.newIframeUrl ? '' : d.txtContentConst;

      const urlIndex = props.showType == 'table' ? d.selHrefIndex : d.selHrefKey[0];
      await GlobalSearchApi.translateGoogle({
        title: d.searchData + ';;;' + d.remark,
        content: contentTranslate,
        // articleType: record.articleType,
        id: route.query.archivesId + '_' + urlIndex + '_' + searchName,
      }).then((res) => {
        d.translateLoading = false;
        if (res.success && res.data) {
          let searchDataArr = [];
          if (res.data.title?.includes('；；；')) searchDataArr = res.data.title.split('；；；');
          else if (res.data.title?.includes(';;;')) searchDataArr = res.data.title.split(';;;');
          else if (res.data.title) searchDataArr = [res.data.title];
          else searchDataArr = [d.searchData, d.remark];
          d.searchDataTransalte = searchDataArr[0];
          d.remark = searchDataArr[1] || searchDataArr[0];
          if (d.oldIframeUrl != d.newIframeUrl) d.txtContentTransalte = res.data.content.replace(/<br>/g, '\n');
          d.searchData = d.searchDataTransalte;
        } else {
          d.searchData = d.searchDataConst;
          d.remark = d.originRemark;
          d.txtContentTransalte = d.txtContentConst;
        }
      });
      d.oldIframeUrl = d.newIframeUrl;
    } else {
      d.searchData = d.searchDataConst;
      d.remark = d.originRemark;
      d.txtContentTransalte = d.txtContentConst;
    }
  } else {
    d.searchData = d.searchDataConst;
    d.remark = d.originRemark;
    d.txtContent = d.txtContentConst;
  }
  setTimeout(() => {
    iframeSearch('remark');
  });
};

// txt选择下一个上一个
const selTargetDomTxt = (type) => {
  const highlightDoc = document.getElementsByClassName('highlightFont');
  console.log('🚀 ~ selTargetDomTxt ~ highlightDoc:', highlightDoc);
  if (type == 'up') {
    d.selTxtIndex--;
    if (highlightDoc[d.selTxtIndex] === undefined) d.selTxtIndex = highlightDoc.length - 1;
    scrollWindowTxt();
  } else if (type == 'down') {
    d.selTxtIndex++;
    if (highlightDoc[d.selTxtIndex] === undefined) d.selTxtIndex = 0;
    scrollWindowTxt();
  }
};

// txt滚动
const scrollWindowTxt = () => {
  const highlightDoc = document.getElementsByClassName('highlightFont');
  const txtContentDom = document.getElementById('txtContentDom');
  if (highlightDoc[d.selTxtIndex] && txtContentDom) {
    highlightDoc[d.selTxtIndex].scrollIntoView({ behavior: 'smooth' });
    // const rect = highlightDoc[d.selTxtIndex].getBoundingClientRect();
    // const scrollableRect = txtContentDom.getBoundingClientRect();
    // console.log('🚀 ~ scrollWindowTxt ~ highlightDoc[d.selTxtIndex]:', highlightDoc[d.selTxtIndex]);
    // console.log('🚀 ~ scrollWindowTxt ~ rect.top:', rect.top);
    // // 计算要滚动的垂直距离，让目标元素滚动到可见区域顶部（这里简单以顶部对齐为例）
    // const scrollTop = rect.top - scrollableRect.top + highlightDoc[d.selTxtIndex].scrollTop;
    // // 执行滚动操作，设置可滚动div的scrollTop属性来滚动到指定位置
    // txtContentDom.scrollTop = scrollTop;
  }
};

// 调用iframe的方法
const iframeSearch = (type = 'searchData') => {
  let dataStr = type == 'searchData' ? d.searchData.trim() : d.remark.trim();
  d.searchType = type;
  if (d.showType == 'txt') {
    const context = d.isTranslate ? d.txtContentTransalte : d.txtContentConst;
    // console.log('🚀 ~ iframeSearch ~ context:', context);
    console.log('🚀 ~ iframeSearch ~ dataStr:', dataStr);
    const lines = context
      .split('\n')
      .map((p) => p.trim())
      .filter((p) => p);
    const textList = [];
    for (var i = 0; i < lines.length; i++) {
      textList.push({ id: i, text: lines[i] });
    }
    // console.log('🚀 ~ iframeSearch ~ textList:', textList);
    // 2. Fuse.js 配置选项
    const options = {
      includeScore: true,
      keys: ['text'], // 通过标题进行搜索
      threshold: 0.4, // 设置匹配的阈值（0-1，越低越精确）
    };

    // 3. 初始化 Fuse 实例
    const fuse = new Fuse(textList, options);
    const results = fuse.search(dataStr); // 执行搜索
    console.log('🚀 ~ iframeSearch ~ results:', results);
    results.forEach((element) => {
      textList[element.refIndex].text = `<span class="highlightFont">${textList[element.refIndex].text}</span>`;
    });
    // const resItem = results[0];
    // if (resItem) textList[resItem.refIndex].text = `<span class="highlightFont">${textList[resItem.refIndex].text}</span>`;
    // else {
    //   d.txtContent = d.txtContentConst;
    //   return;
    // }
    d.txtContent = '';
    textList.forEach((item) => {
      let str = item.text.trim();
      const regex = new RegExp(`(${dataStr})`, 'gi');
      str = str.replace(regex, `<span class="highlightFont">$1</span>`);
      if (str.length == 0) str = '\n';
      d.txtContent += str + '\n';
    });
    nextTick(() => {
      scrollWindowTxt();
    });
  } else {
    const tipIframe = document.getElementById('tipIframe');
    // console.log(tipIframe, 'iframeSearch-tipIframe');

    let contentJS = `
    setHighLight('${dataStr}');
  `;
    tipIframe.contentWindow.postMessage(
      {
        type: 'injectScript',
        script: contentJS,
      },
      '*',
    );
  }
};

// 切换网页
const iframeSearchChange = () => {
  setTimeout(() => {
    injectFun();
  }, 200);
};

// 网页端口修改
// const transformIP = (ip) => {
//   return ip.replace(/:9000/g, ':9002');
// };

// 其他的修改iframe
const transformIP = async () => {
  if (d.selHrefIndex && d.selHrefIndex[0]) d.newIframeUrl = d.list[d.selHrefIndex[0]].source;
  else d.newIframeUrl = d.list[0].source;
  let sourceStr = d.list[d.selHrefIndex[0]].source.replace(/:9000/g, ':9002');
  sourceStr = sourceStr.replace(/192.168.12.68:9002/, 'minio.tmapi.trsdsj.cn');
  sourceStr = sourceStr.replace(/http:/, 'https:');
  if (d.showType == 'txt') {
    sourceStr = sourceStr.replace(/.html/g, '.txt');
    await fetch(sourceStr)
      .then((response) => {
        return response.text();
      })
      .then((res) => {
        d.txtContent = res.trim();
        d.txtContentConst = res.trim();
        iframeSearch('remark');
      });
  } else {
    iframeSearchChange();
  }
  d.urlShow = sourceStr;
  // return sourceStr;
};

// 基础属性的修改iframe
const transformIPInfo = async (key) => {
  setTimeout(async () => {
    console.log('🚀 ~ transformIPInfo ~ key:', key);
    console.log(d.selHrefKey);
    const searchName = d.selHrefKey[0].slice(1);
    console.log('🚀 ~ transformIPInfo ~ searchName:', searchName);
    d.searchData = props.tmpRecord[searchName];
    // console.log('🚀 ~ transformIPInfo ~ props.tmpRecord[searchName]:', props.tmpRecord[searchName]);
    // console.log('🚀 ~ transformIPInfo ~  props.tmpRecord:', props.tmpRecord);
    d.searchDataConst = props.tmpRecord[searchName];
    d.recordTmp = props.tmpRecord[searchName];
    console.log('🚀 ~ setTimeout ~ d.recordTmp:', d.recordTmp);
    console.log('🚀 ~ setTimeout ~ d.list[d.selHrefKey[0][0]]:', d.list[d.selHrefKey[0][0]]);
    const recordIndex = d.list[d.selHrefKey[0][0]].fieldList.findIndex((item) => item.field == searchName);
    console.log('🚀 ~ setTimeout ~ recordIndex:', recordIndex);

    d.item.label = d.list[d.selHrefKey[0][0]].fieldList.find(item => item.field === searchName).fieldName

    if (!d.list[d.selHrefKey[0][0]].fieldList[recordIndex].isRead) {
      d.list[d.selHrefKey[0][0]].fieldList[recordIndex].isRead = true;
      d.list[d.selHrefKey[0][0]].read++;
    }

    d.list[d.selHrefKey[0][0]].total = d.list[d.selHrefKey[0][0]].fieldList.length;

    d.newIframeUrl = d.list[d.selHrefKey[0][0]].source;
    setIsRead(searchName);
    d.remark = d.list[d.selHrefKey[0][0]].fieldList[recordIndex].remark || d.recordTmp;
    console.log('🚀 ~ setTimeout ~ d.list[d.selHrefKey[0][0]].fieldList[recordIndex].remark:', d.list[d.selHrefKey[0][0]].fieldList[recordIndex].remark);
    if (!props.tmpRecord[searchName]) return;
    if (d.selIframeIndex != d.selHrefKey[0][0] || d.txtContent == '') {
      let sourceStr = d.list[d.selHrefKey[0][0]].source.replace(/:9000/g, ':9002');
      sourceStr = sourceStr.replace(/192.168.12.68:9002/, 'minio.tmapi.trsdsj.cn');
      sourceStr = sourceStr.replace(/http:/, 'https:');
      if (d.showType == 'txt') {
        sourceStr = sourceStr.replace(/.html/g, '.txt');
        await fetch(sourceStr)
          .then((response) => {
            return response.text();
          })
          .then((res) => {
            d.txtContent = res.trim();
            d.txtContentConst = res.trim();
            if (d.isTranslate) {
              changeTranaslate();
            } else {
              iframeSearch('remark');
            }
          });
      } else {
        iframeSearchChange();
      }
      d.urlShow = sourceStr;
    } else {
      if (d.isTranslate) {
        changeTranaslate();
      } else {
        iframeSearch('remark');
      }
    }
  }, 250);
};

// 搜索词，选择上一个
const searchUp = (type) => {
  if (type != d.searchType) {
    iframeSearch(type);
    return;
  }
  if (d.showType == 'txt') {
    selTargetDomTxt('up');
  } else {
    const iframe = document.getElementById('tipIframe');
    let scriptContent = `
        selTargetDom('up');
    `;
    iframe.contentWindow.postMessage(
      {
        type: 'injectScript',
        script: scriptContent,
      },
      '*',
    );
  }
};

// 搜索词，选择下一个
const searchDown = (type) => {
  if (type != d.searchType) {
    iframeSearch(type);
    return;
  }
  if (d.showType == 'txt') {
    selTargetDomTxt('down');
  } else {
    const iframe = document.getElementById('tipIframe');
    let scriptContent = `
      selTargetDom('down');
  `;
    iframe.contentWindow.postMessage(
      {
        type: 'injectScript',
        script: scriptContent,
      },
      '*',
    );
  }
};

// 更新缓存是否已读
const setIsRead = (key) => {
  let verificationReadObj = JSON.parse(localStorage.getItem('verificationReadObj'));
  console.log('🚀 ~ setIsRead ~ verificationReadObj:', verificationReadObj);
  if (verificationReadObj) {
    const tarObj = verificationReadObj.find((i) => i.archivesId == route.query.archivesId);
    if (tarObj) {
      if (!tarObj.readAttribute.includes(key)) tarObj.readAttribute.push(key);
    } else {
      verificationReadObj.push({
        archivesId: route.query.archivesId,
        readAttribute: [key],
      });
    }
  } else {
    verificationReadObj = [
      {
        archivesId: route.query.archivesId,
        readAttribute: [key],
      },
    ];
  }
  localStorage.setItem('verificationReadObj', JSON.stringify(verificationReadObj));
};

// 初始化缓存是否已读
const setReadAttribute = () => {
  let verificationReadObj = JSON.parse(localStorage.getItem('verificationReadObj'));
  if (verificationReadObj) {
    const tarObj = verificationReadObj.find((i) => i.archivesId == route.query.archivesId);
    if (tarObj) {
      d.list.forEach((item) => {
        item.read = 0;
        item.fieldList.forEach((item1) => {
          if (tarObj.readAttribute.includes(item1.field)) {
            item1.isRead = true;
            item.read++;
          }
        });
      });
      // console.log('🚀 ~ d.list.forEach ~ d.list:', d.list);
    }
  }
};

watch(
  () => props.showDrawerData,
  () => {
    console.log(props.showType, props.showDrawerData.rowKey, 'watch!!!!');
    if (props.showType == 'table' && props.showDrawerData?.rowKey) {
      console.log('props.showDrawerData', props.showDrawerData);
      d.selHrefIndex[0] = 0;
      // d.selHrefKey[0] = '0' + ;

      console.log(props.showDrawerData, 'showDrawerData');
      let showName1 = route.query.type == 'person' ? 'orgCode' : 'personCode';
      let showName2 = route.query.type == 'person' ? 'personCode' : 'orgCode';

      if (props.showDrawerData.personResumeDetail || props.showDrawerData.topic) {
        d.searchData = props.showDrawerData.origin || props.showDrawerData.personResumeDetail || props.showDrawerData.topic;
      } else if (props.showDrawerData.dataType) {
        d.searchData = props.showDrawerData.title;
      } else {
        d.searchData =
          props.showDrawerData.origin ||
          props.showDrawerData.eventCode ||
          props.showDrawerData.identityName ||
          props.showDrawerData.personCodeRelation ||
          props.showDrawerData.orgCodeRelation ||
          props.showDrawerData[showName1] ||
          props.showDrawerData[showName2];
        let titleShow =
          props.showDrawerData.relationCnname ||
          props.showDrawerData.eventCode ||
          props.showDrawerData.identityName ||
          props.showDrawerData.personCodeRelation ||
          props.showDrawerData.orgCodeRelation ||
          props.showDrawerData[showName1] ||
          props.showDrawerData[showName2];
        // d.titleShow = titleShow + ' - ' + props.showDrawerData.relationType
        d.titleShow = titleShow;
      }
      d.searchDataConst = d.searchData;
      d.item = props.showDrawerData;
      console.log(d.item, 'itemtable');

      if (d.list?.length > 0 && d.list[d.selHrefIndex]?.remark) {
        d.remark = d.list[d.selHrefIndex].remark;
        d.originRemark = d.list[d.selHrefIndex].remark;
      } else {
        // d.originRemark = '';
        d.remark = d.item?.remark || '';
        d.originRemark = d.item?.remark || '';
      }
      init();
    }
  },
  {
    deep: true,
  },
);

watch(
  () => props.selectIndex,
  () => {
    console.log('🚀 ~ props.selectIndex:', props.selectIndex);
    if (props.selectIndex == null) return;

    console.log(props.showType, 'watch!!!!');
    d.titleShow = '';

    console.log(d);
    console.log('props.tmpRecord', props.tmpRecord);
    d.selHrefIndex[0] = 0;
    d.selTxtIndex = 0;
    // console.log(props.tmpRecord,'tmpRecord');
    // console.log(props.showDrawerData,'showDrawerData');
    // console.log(props.tmpRecord[props.showDrawerData.name],'d.searchData');
    init_item(props.selectIndex);
    init();
    d.recordTmp = props.tmpRecord[d.item.name];
    d.originRecordTmp = props.tmpRecord[d.item.name];
    d.selHrefKey[0] = '0' + d.item.name;
    d.openKeys[0] = 0;
    d.selIframeIndex = 0;
    d.searchData = props.tmpRecord?.originJson ? props.tmpRecord?.originJson[d.item.name] : props.tmpRecord[d.item.name];
    d.searchDataConst = d.searchData;
    console.log(d.searchData, 'd.searchData');
    d.showTool = !((props.tmpRecord[d.item.name] == '' || props.tmpRecord[d.item.name] == null) && !props.archivesEntityRecored[d.item.name]);
  },
);
onMounted(() => {
  console.log('props', props);
});
defineExpose({ d });
</script>

<style lang="less" scoped>
.sd {
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.3);
}
.tipContent {
  display: flex;
  // height: calc(100% - 76px);
  // height: calc(100% - 82px);
  height: calc(100% - 132px);
}
.tipMenu {
  width: 299px;
  height: 100%;
  overflow: auto;
  :deep(.ant-menu-title-content) {
    font-size: 16px;
  }
  :deep(.ant-menu-item) {
    padding: 0 4px;
    height: 40px !important;
    min-height: 40px !important;
    line-height: 40px !important;
  }
}
.iframeHeight {
  height: calc(100% - 8px);
  width: 100%;
  // :deep(.ant-spin-nested-loading) {
  //   margin-top: 200px;
  // }
  // height: 100%;
}
.content-top {
  // justify-content: space-between;
}
.infoRow {
  display: flex;
  .infoRow-item {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 4px 0 12px;
  }
  .infoRow-item-label {
    width: 160px;
    text-align: right;
  }
  :deep(.ant-input-disabled) {
    color: #333 !important;
  }
}
.infoTopRow {
  display: flex;
  align-items: center;
  // justify-content: space-between;
  padding: 0 0 4px;
  margin-bottom: 4px;
}
.infoRow-label {
  display: flex;
  align-items: center;
  font-weight: bold;
  text-align: center;
  font-size: 16px;
  margin-right: 16px;
  span {
    min-width: 380px;
    text-align: left;
  }
  .tagbox {
    position: relative;
    margin: 0 10px;
    min-width: auto;
    span {
      min-width: auto;
    }
    &::after {
      //   content: "";
      //   width: 100%;
      //   height: 2px;
      //   position: absolute;
      //   bottom: -10px;
      //   left: 0px;
      //   background: #333;
    }
  }
}
.tipItem {
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 283.33px;
}
.relationType {
  display: flex;
  align-items: center;
}
.arrowDiv {
  display: inline-flex;
  flex-direction: column;
  margin: 0 6px;
  .arrowDiv_relationType {
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
  }
  .arrowDiv_arrow {
    font-size: 16px;
    color: #555;
    align-items: center;
  }
  .arrowDiv_arrow_left {
    height: 6px;
    width: 76px;
    background: #555;
  }
}
.fieldListShow {
  flex-wrap: wrap;
}
.sourceUrl {
  flex: 1;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 16px;
}
:deep(.txtContent) {
  white-space: pre-line;
  overflow-wrap: break-word;
}
:deep(.highlightFont) {
  background: #ffff00;
}
</style>
