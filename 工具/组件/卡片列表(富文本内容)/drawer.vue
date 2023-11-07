<template>
  <div>
    <el-dialog v-model="showDrawer" title="目标">
      <div class="mb5 oy" style="height: 45vh">
        <!-- 卡片 -->
        <el-card v-for="item in inf" :key="item.id" class="mb5">
          <div class="f">
            <!-- 内容 -->
            <div v-html="item.content" style="word-wrap: break-word; width: 95%; line-height: 30px"></div>
            <div class="fa"></div>
            <!-- 功能区 -->
            <div class="fy pr">
              <el-popconfirm @confirm="del(item.id)" title="确认删除此目标？">
                <template #reference>
                  <!-- 删除按钮 -->
                  <el-button type="text" class="pa" style="top: -15px">x</el-button>
                </template>
              </el-popconfirm>
              <div class="fc fa pr" style="top: 10px">
                <!-- 编辑按钮 -->
                <el-icon class="hp" @click="edit(item)"> <edit /> </el-icon>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <!-- 添加按钮 -->
      <el-button type="primary" class="w100" @click="add">添加</el-button>
    </el-dialog>
    <!-- 添加对话框 -->
    <el-dialog v-model="showDialogForm" :title="isEdit ? '编辑' : '添加'">
      <!-- 富文本 -->
      <editor v-if="showDialogForm" v-model="description" ref="childEditor" />
      <template #footer>
        <el-button type="primary" @click="confirm">{{ isEdit ? '修改' : '添加' }}</el-button>
        <el-button @click="showDialogForm = false">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import '@/styles/baseStyle.css'
import editor from '@/components/editor/index.vue'
import { getBoard, addBoard, delBoard, editBoard } from '@/apis/storyWall'
export default {
  created() {
    this.get()
  },
  components: {
    editor
  },
  data() {
    return {
      showDrawer: false, // 是否弹出该留言板
      showDialogForm: false, // 是否弹出编辑框
      isEdit: false, // 编辑还是添加
      inf: [], // 看板展示内容
      id: '', // 目前目标id
      description: '', // 富文本编辑器内容
      empty: false // 内容是否为空
    }
  },
  methods: {
    // 展示
    show() {
      this.showDrawer = true
    },
    // 新建按钮
    add() {
      this.isEdit = false
      this.showDialogForm = true
    },
    // 删除按钮
    del(id) {
      this.toDelBoard(id)
    },
    // 编辑按钮
    edit(item) {
      this.id = item.id
      this.isEdit = true
      this.showDialogForm = true
      setTimeout(() => {
        this.$refs.childEditor.edit(item.content)
      }, 100)
    },
    // 查询
    get() {
      this.toGetBoard()
    },
    // 编辑区提交按钮
    confirm() {
      if (!this.empty) {
        this.isEdit ? this.toEditBoard() : this.toAddBoard()
      } else {
        this.$message.warning('请不要创建空目标')
      }
      this.showDialogForm = false
      this.$refs.childEditor.clear()
    },
    // 新建api
    toAddBoard() {
      const data = {
        content: this.description
      }
      return addBoard(data).then(
        () => {
          this.$message.success('添加成功')
          this.get()
        },
        () => {
          this.$message.success('添加失败')
        }
      )
    },
    // 删除api
    toDelBoard(id) {
      return delBoard(id).then(() => {
        this.$message.success('删除成功')
        this.get()
      })
    },
    // 修改api
    toEditBoard() {
      const data = {
        id: this.id,
        content: this.description
      }
      return editBoard(data).then(
        () => {
          this.$message.success('修改成功')
          this.get()
        },
        () => {
          this.$message.success('修改失败')
        }
      )
    },
    // 查询api
    toGetBoard() {
      return getBoard().then((r) => {
        this.inf = r.map((item) => {
          item.content = JSON.parse(item.content)
          return item
        })
      })
    }
  },
  watch: {
    description: {
      handler(val) {
        this.empty = val === '<p><br></p>'
      }
    }
  }
}
</script>
