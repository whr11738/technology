<!-- vue2 组件 -->
<!-- <permission /> -->
<template>
  <div>
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
      <el-button type="primary" @click="updataPermission">{{ "更新权限" }} </el-button>
    </div>
  </div>
</template>
<script>
import { getTree, encryption, decryption } from "@/utils/permission";
import { storage } from "@/utils/storage.js";
import { config } from "@/utils/permission";

export default {
  props: {},
  data() {
    return {
      modelRef: {
        tree: getTree(),
        accesses: [],
      },
    };
  },
  methods: {
    // 初始化选项
    setChecked(model, permisson) {
      if (!permisson) return;
      const Res = decryption(permisson);
      const traverse = () => {
        // 遍历权限树
        for (const i in model) {
          const val = model[i].val;
          const secondPm = Res[val];
          const secondNode = model[i].child;
          if (secondPm !== undefined) {
            // 选上一级权限
            model[i].checked = true;
            for (const j in secondNode) {
              const pm = secondPm[secondNode[j].val];
              if (pm !== undefined) {
                // 选上二级权限
                secondNode[j].checked = true;
                const thirdNode = secondNode[j].child;
                if (thirdNode) {
                  for (const k in thirdNode) {
                    // 选上三级权限
                    thirdNode[k].checked = (pm & thirdNode[k].val) > 0;
                  }
                }
              }
            }
          } else {
            // 去掉一级权限
            model[i].checked = false;
            for (let j = 0; j < secondNode.length; j++) {
              // 去掉二级权限
              secondNode[j].checked = false;
              const thirdNode = secondNode[j].child;
              if (thirdNode) {
                // 去掉三级权限
                for (let k = 0; k < thirdNode.length; k++) {
                  thirdNode[k].checked = false;
                }
              }
            }
          }
        }
      };
      traverse();
      return model;
    },
    // 修改权限树，节点联动
    updataPermissionTree(model, val) {
      const level = model.id.split("-").length;
      const ids = this.makeIds(model.id);
      ids.pop();
      if (model.child && model.child.length) this.subMenusOp(model.child, val);
      if (level > 1) this.supMenusOp(this.modelRef.tree, ids);
    },
    //  若存在下级，下级CheckBox全部选中
    subMenusOp(model, flag) {
      for (let i = 0; i < model.length; i++) {
        const current = model[i];
        if (flag) current.checked = true;
        else current.checked = false;
        if (current.child && current.child.length) {
          this.subMenusOp(current.child, flag);
        }
      }
    },
    // 若存在上级,确认是否需要选中上级CheckBox
    supMenusOp(mode, ids) {
      ids = ids.reverse();
      ids.forEach((id) => {
        this.traverseTree(mode, id);
      });
    },
    // 节点联动相关
    makeIds(id) {
      const ids = id.split("-");
      const res = [];
      for (let i = 0; i < ids.length; i++) {
        res.push(ids.slice(0, i + 1).join("-"));
      }
      return res;
    },
    // 节点联动相关
    traverseTree(model, id) {
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
          this.traverseTree(model[i].child, id);
        }
      }
    },
    // 更新权限
    updataPermission() {
      this.modelRef.accesses = encryption(this.modelRef.tree);
      console.log(this.modelRef.accesses);
      storage.set("permission", this.modelRef.accesses);
      history.go(0);
    },
    // 初始化
    init() {
      const accesses = storage.get("permission");
      this.modelRef.accesses = accesses;
      this.setChecked(this.modelRef.tree, accesses);
    },
  },
  mounted() {
    this.init();
  },
};
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
