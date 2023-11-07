<template>
  <div style="position: relative">
    <!-- 样式映射 -->
    <div class="puppet">
      <span v-html="status.puppetText"></span>
      <div class="miniselector"></div>
    </div>
    <!-- 文本域 -->
    <textarea class="textarea" v-bind="$attrs" v-model="status.text" @input="textAreaChange"></textarea>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const status = reactive({
  text: '', // 文本域内容
  puppetText: '', // 模拟内容
  selection: {} // 光标状态
})
// 根据位置删除字符串内容 （没有0，从1开始，start删除，end不删）
const delString = (str, start, end) => {
  if (!str || !start || !end) return
  const length = str.length
  const left = str.slice(0, start - 1)
  const right = str.slice(end - 1, length)
  return left + right
}
// 设置文本域光标位置（参数：开始位置，结束位置，方向）
const selection = (start, end = start, direction = 'forward') => {
  const textarea = document.getElementsByClassName('textarea')[0]
  textarea.focus()
  textarea.setSelectionRange(start, end, direction)
}
// 计算光标坐标位置
const getSelectionCoordinate = (textarea) => {
  const puppet = document.getElementsByClassName('puppet')[0]
  const miniselector = document.getElementsByClassName('miniselector')[0]
  const { scrollTop } = textarea
  puppet.scrollTop = scrollTop
  puppet.style.width = textarea.offsetWidth - 3 + 'px'
  puppet.style.height = textarea.offsetHeight - 6 + 'px'
  puppet.style.border = '1px solid transparent'
  puppet.style.padding = '2px'
  const top = miniselector.offsetTop - scrollTop
  const left = miniselector.offsetLeft
  return { left, top }
}
// 计算光标字符位置
const getSelectionStatus = (textarea) => {
  if ('selectionStart' in textarea) {
    const length = textarea.selectionEnd - textarea.selectionStart
    return {
      start: textarea.selectionStart,
      end: textarea.selectionEnd,
      length: length,
      text: textarea.value.substr(textarea.selectionStart, length)
    }
  } else if (document.selection) {
    textarea.focus()
    const result = document.selection.createRange()
    if (result === null) {
      return {
        start: 0,
        end: textarea.value.length,
        length: 0
      }
    }
    const re = textarea.createTextRange()
    const rc = re.duplicate()
    re.moveToBookmark(result.getBookmark())
    rc.setEndPoint('EndToStart', re)
    return {
      start: rc.text.length,
      end: rc.text.length + result.text.length,
      length: result.text.length,
      text: result.text
    }
  } else {
    return null
  }
}
// 计算样式映射(参数:文本域中文字,光标字符位置)
const getSelectionText = (text, start) => {
  let result = delString(text, start + 1, text.length + 1)
  if (result) {
    result = JSON.stringify(result)
    result && (result = result.replace(/\\n/g, '<br\>'))
    result && (result = result.replace(/ /g, '.'))
    result = JSON.parse(result)
  }
  return result
}
// 返回光标状态
const getSelection = (textarea) => {
  if (!textarea) return
  const result = getSelectionStatus(textarea)
  const { left, top } = getSelectionCoordinate(textarea)
  result.left = left
  result.top = top
  const selectionText = getSelectionText(textarea.value, result.start)
  return { result, selectionText }
}
// 更新状态
const updata = async (textarea) => {
  const up = () => {
    status.selection = getSelection(textarea).result
    status.puppetText = getSelection(textarea).selectionText
  }
  up()
  // dom更新比数据慢所以等dom更新完再更新一遍准确坐标
  return new Promise((resolve) =>
    setTimeout(() => {
      up()
      resolve(status)
    }, 10)
  )
}
// 文本域内容改变时
const textAreaChange = async () => {
  const textarea = document.getElementsByClassName('textarea')[0]
  updata(textarea).then((r) => {
    console.log('光标偏移坐标', r.selection.left, r.selection.top)
    console.log('光标所有状态', r)
  })
}
console.log(selection)
</script>

<style scoped>
.textarea {
  flex: none;
  resize: none; /* 关闭右下角图标 */
  background-color: rgb(242, 243, 245);
  border: 1px solid transparent;
}
.textarea:hover {
  background-color: rgb(229, 230, 235);
  border: 1px solid transparent;
}
.textarea:focus {
  background-color: white;
  border: 1px solid rgb(22, 93, 255);
  outline: none;
}
.puppet {
  opacity: 0;
  z-index: -100;
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  text-align: left;
  word-break: break-word;
  line-height: 18.4px;
}
.miniselector {
  position: relative;
  display: inline;
}

/* 滚动条 */
::-webkit-scrollbar {
  width: 5px;
  height: 10px;
}
::-webkit-scrollbar-track-piece {
  background-color: transparent;
  border-radius: 6px;
}
::-webkit-scrollbar-thumb:vertical {
  height: 5px;
  background-color: rgba(125, 125, 125, 0.7);
  border-radius: 6px;
}
::-webkit-scrollbar-thumb:horizontal {
  width: 5px;
  background-color: rgba(125, 125, 125, 0.7);
  border-radius: 6px;
}
</style>
