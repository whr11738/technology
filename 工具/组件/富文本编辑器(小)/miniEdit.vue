<template>
  <el-popover placement="bottom" trigger="click" :width="270">
    <div class="fy">
      <!-- 富文本 -->
      <div class="app-editor w100">
        <div :id="'editorId-' + item.id"></div>
      </div>
      <div class="fxc mt5">
        <!-- 提交按钮 -->
        <el-button class="w50" v-if="editorAble" type="success" @click="confrim">
          <el-icon> <check /> </el-icon>
        </el-button>
        <!-- 编辑按钮 -->
        <el-button class="w50" v-else type="success" @click="editorAble = true">
          <el-icon> <edit /> </el-icon>
        </el-button>
      </div>
    </div>
    <template #reference>
      <!-- 标题 -->
      <p>{{ item.name }}</p>
    </template>
  </el-popover>
</template>

<script>
import '@/styles/baseStyle.css'
import '@wangeditor/editor/dist/css/style.css'
import { createEditor } from '@wangeditor/editor'
import { postWip } from '@/apis/storyWall'
export default {
  props: ['item'],
  editor: null,
  data() {
    return {
      editorAble: false, // 编辑状态为可编辑
      textChange: false // 判断内容是否改变以决定是否post
    }
  },
  methods: {
    // 初始化
    init() {
      if (!this.editor) {
        this.editor = createEditor({
          selector: `#editorId-${this.item.id}`,
          html: this.item.explain,
          mode: 'simple',
          config: {
            placeholder: '无内容...',
            onChange: () => {
              this.textChange = true
            }
          }
        })
      }
      this.editor.disable()
    },
    // 修改内容
    confrim() {
      const data = {
        id: this.item.id,
        explain: this.editor.getHtml()
      }
      if (this.textChange) {
        postWip(data).then((r) => {
          r.message === 'success' && this.$message.success('修改成功')
        })
      }
      this.editorAble = false
      this.textChange = false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  watch: {
    editorAble: {
      handler(val) {
        val === true ? this.editor.enable() : this.editor.disable()
      }
    }
  }
}
</script>

<style>
.app-editor {
  border-top: 0;
  border: 1px var(--el-border-color-base) solid;
}
</style>
