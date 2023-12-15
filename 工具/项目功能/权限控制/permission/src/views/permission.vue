<template>
  <div>
    <el-card shadow="never" style="margin-bottom: 20px">
      <el-row :gutter="16">
        <el-col v-for="(item, index) in modelRef.tree" :key="index" :lg="12" :md="12" :sm="24">
          <el-col label-width="0px" label="">
            <el-checkbox
              v-model="item.checked"
              :label="item.acs"
              @change="
                (val) => {
                  updataPermissionTree(item, val);
                }
              "
              >{{ item.i18n }}
            </el-checkbox>
            <div v-for="(second, sIndex) in item.child" :key="sIndex">
              <div class="permission-box">
                <div class="permission-box__category">
                  <el-checkbox
                    v-model="second.checked"
                    :label="second.acs"
                    @change="
                      (val) => {
                        updataPermissionTree(second, val);
                      }
                    "
                    >{{ second.i18n }}</el-checkbox
                  >
                </div>
                <div class="permission-box__items">
                  <el-checkbox
                    v-for="(three, tIndex) in second.child"
                    :key="tIndex"
                    @change="
                      (val) => {
                        updataPermissionTree(three, val);
                      }
                    "
                    v-model="three.checked"
                    :label="three.acs"
                    >{{ three.i18n }}</el-checkbox
                  >
                </div>
              </div>
            </div>
          </el-col>
        </el-col>
      </el-row>
      <div style="display: flex">
        <div style="flex: auto"></div>
        <el-button type="primary" @click="updataPermission">
          {{ "更新权限" }}
        </el-button>
      </div>
    </el-card>

    <el-card>
      <div style="display: flex; justify-content: space-around">
        <div v-acs="[config.firstMenu.account]">{{ "账号管理" }}</div>
        <div v-acs="[config.firstMenu.equipment]">{{ "设备管理" }}</div>
      </div>
    </el-card>
    <el-card style="margin-top: 20px">
      <div style="display: flex; justify-content: space-around">
        <div v-acs="[config.firstMenu.account, config.secondMenu.account_list]">{{ "账号列表" }}</div>
        <div v-acs="[config.firstMenu.account, config.secondMenu.account_permission]">{{ "账号权限" }}</div>
        <div v-acs="[config.firstMenu.equipment, config.secondMenu.equipment_list]">{{ "设备列表" }}</div>
      </div>
    </el-card>
    <el-card style="margin-top: 20px">
      <div style="display: flex; justify-content: space-around">
        <div v-acs="[config.firstMenu.account, config.secondMenu.account_permission, config.module.search]">{{ "账号权限-查询" }}</div>
        <div v-acs="[config.firstMenu.equipment, config.secondMenu.equipment_list, config.module.search]">{{ "设备列表-查询" }}</div>
        <div v-acs="[config.firstMenu.equipment, config.secondMenu.equipment_list, config.module.crate]">{{ "设备列表-新建" }}</div>
        <div v-acs="[config.firstMenu.equipment, config.secondMenu.equipment_list, config.module.edit]">{{ "设备列表-编辑" }}</div>
        <div v-acs="[config.firstMenu.equipment, config.secondMenu.equipment_list, config.module.delete]">{{ "设备列表-删除" }}</div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive } from "vue";
import { getTree, encryption, decryption } from "../utils/permission";
import { storage } from "../utils/baseTool.js";
import { config } from "../utils/permission";

export default defineComponent({
  setup(_props) {
    const modelRef = reactive({
      tree: getTree(),
      accesses: [],
    });
    // 初始化选项
    const setChecked = (model, permisson) => {
      const Res = decryption(permisson);
      const traverse = () => {
        for (let i = 0; i < model.length; i++) {
          const val = model[i].val;
          const secondPm = Res[val];
          const secondNode = model[i].child;
          if (secondPm !== undefined) {
            model[i].checked = true;
            for (let j = 0; j < secondNode.length; j++) {
              const pm = secondPm[secondNode[j].val];
              if (pm !== undefined) {
                secondNode[j].checked = true;
                const thirdNode = secondNode[j].child;
                if (!thirdNode) return;
                for (let k = 0; k < thirdNode.length; k++) {
                  thirdNode[k].checked = (pm & thirdNode[k].val) > 0;
                }
              }
            }
          }
        }
      };
      traverse();
      return model;
    };
    // 修改权限树，节点联动
    const updataPermissionTree = (model, val) => {
      const level = model.id.split("-").length;
      const ids = makeIds(model.id);
      ids.pop();
      if (model.child && model.child.length) subMenusOp(model.child, val);
      if (level > 1) supMenusOp(modelRef.tree, ids);
    };
    //  若存在下级，下级CheckBox全部选中
    const subMenusOp = (model, flag) => {
      for (let i = 0; i < model.length; i++) {
        const current = model[i];
        if (flag) current.checked = true;
        else current.checked = false;
        if (current.child && current.child.length) {
          subMenusOp(current.child, flag);
        }
      }
    };
    // 若存在上级,确认是否需要选中上级CheckBox
    const supMenusOp = (mode, ids) => {
      ids = ids.reverse();
      ids.forEach((id) => {
        traverseTree(mode, id);
      });
    };
    // 节点联动相关
    const makeIds = (id) => {
      const ids = id.split("-");
      const res = [];
      for (let i = 0; i < ids.length; i++) {
        res.push(ids.slice(0, i + 1).join("-"));
      }
      return res;
    };
    // 节点联动相关
    const traverseTree = (model, id) => {
      if (!model || !model.length) return;
      for (let i = 0; i < model.length; i++) {
        if (model[i].id == id) {
          if (model[i].child && model[i].child.length) {
            let checked = false;
            model[i].child.forEach((item) => {
              checked = checked || item.checked;
            });
            model[i].checked = checked;
          }
          break;
        } else {
          traverseTree(model[i].child, id);
        }
      }
    };
    // 更新权限
    const updataPermission = () => {
      modelRef.accesses = encryption(modelRef.tree);
      console.log(modelRef.accesses);
      storage.set("permission", modelRef.accesses);
      history.go(0);
    };
    // 初始化
    const init = () => {
      const accesses = storage.get("permission");
      modelRef.accesses = accesses;
      setChecked(modelRef.tree, accesses);
    };
    onMounted(() => {
      init();
    });

    return { config, modelRef, updataPermission, updataPermissionTree, makeIds, subMenusOp, supMenusOp };
  },
});
</script>
<style scoped>
.permission-box {
  display: flex;
  width: 100%;
}
.permission-box__category {
  padding: 0 10px 0 0;
  position: relative;
}
.permission-box__category::after {
  content: "";
  position: absolute;
  top: 8px;
  right: 0;
  bottom: 8px;
  border-right: 1px solid rgb(234, 238, 251);
}
.permission-box__items {
  padding-left: 10px;
  flex: 1;
}
</style>
