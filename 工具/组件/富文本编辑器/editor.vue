<template>
  <div class="app-editor" style="min-height: 300px" @click="focus">
    <!-- 工具栏 -->
    <div id="toolbar-container"></div>
    <!-- 编辑区 -->
    <div id="editor-container"></div>
  </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css'
import { createEditor, createToolbar } from '@wangeditor/editor'

export default {
  toolbar: null, // 工具栏
  editor: null, // 编辑区
  emits: ['change', 'update:modelValue'],
  editorConfig: {}, // 配置
  methods: {
    // 初始化参数
    initEditor() {
      // 创建编辑器
      if (!this.editor) {
        this.editor = createEditor({
          selector: '#editor-container',
          mode: 'default', // default 默认模式 simple 简洁模式
          config: {
            placeholder: '请输入内容',
            onChange: (editor) => {
              this.$emit('change', editor)
              this.$emit('update:modelValue', editor.getHtml())
            }
          }
        })
      }
      // 创建工具栏
      if (!this.toolbar) {
        this.toolbar = createToolbar({
          selector: '#toolbar-container',
          mode: 'default', // default 默认模式 simple 简洁模式
          editor: this.editor
        })
      }
    },
    // 修改内容
    edit(data) {
      this.editor.dangerouslyInsertHtml(data)
    },
    // 清空内容
    clear() {
      this.editor.selectAll()
      this.editor.deleteFragment()
    },
    // 聚焦
    focus() {
      this.editor.focus()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initEditor()
    })
  }
}
</script>

<style>
.app-editor {
  width: 100%;
  border-top: 0;
  height: inherit;
  border: 1px var(--el-border-color-base) solid;
}
</style>
