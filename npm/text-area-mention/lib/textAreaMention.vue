<template>
  <div style="position: relative">
    <!-- 样式映射 -->
    <div class="puppet">
      <span v-html="status.puppetText"></span>
      <div class="miniselector"></div>
    </div>
    <!-- 文本域 -->
    <textarea
      class="textarea"
      v-bind="$attrs"
      v-model="status.text"
      @blur="mentionBlur"
      @input="mentionChange"
      @click="status.showMention = false"
      @keydown.delete="status.showMention = false"
    ></textarea>
    <!-- 提及选择 -->
    <div class="selector" v-show="status.showMention">
      <div class="options" v-for="item in status.peopleList" :key="item" @mouseenter="status.mentionHover = item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'textAreaMention'
}
</script>

<script setup>
import { reactive, defineProps, defineEmits, onMounted, watch } from 'vue'

const status = reactive({
  text: '', // 主要内容
  puppetText: '', // 模拟内容
  selection: {
    start: 0, // 光标开始位置
    end: 0 // 光标结束位置
  },
  mentionList: [], // 提及状态
  peopleList: [], // 可选人员列表
  click: {
    left: 0, // 点击位置X轴
    top: 0 // 点击位置Y轴
  },
  showMention: false, // 显示提及选项
  mentionHover: false // 指针位置的提及
})
const props = defineProps({
  peopleList: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: String,
    default: () => ''
  }
})
const emit = defineEmits(['update:modelValue', 'change'])
// 实时监听modelValue与peopleList的变化并同步
watch(
  () => props,
  (val) => {
    status.text = val.modelValue
    status.peopleList = val.peopleList
  },
  { deep: true }
)
// 实时监听主要内容变化并对内容进行处理
watch(
  () => status.text,
  () => {
    emit('update:modelValue', status.text)
    emit('change', status)
  }
)
// 光标状态改变时候
watch(
  () => status.selection.start,
  () => {
    status.showMention = false
  }
)

// 对象数组去重(参数：数组，唯一标识属性)
const uniqueObjArr = (arr, uniId) => {
  const res = new Map()
  return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1))
}
// 返回子字符串在字符串中的位置(参数：字符串，子字符串)
const findString = (str, target) => {
  if (!str || !target) return
  let index = str.indexOf(target)
  const p = []
  while (index !== -1) {
    p.push(index - 1) // 减去空格位置
    index = str.indexOf(target, index + 1)
  }
  return p
}
// 根据位置删除字符串内容 （没有0，从1开始，start删除，end不删）
const delString = (str, start, end) => {
  if (!str || !start || !end) return
  const length = str.length
  const left = str.slice(0, start - 1)
  const right = str.slice(end - 1, length)
  return left + right
}
// 根据位置插入字符串内容(参数：字符串，子字符串，位置)
const addString = (str, target, start) => {
  const length = str.length
  const left = str.slice(0, start)
  const right = str.slice(start, length)
  return left + target + right
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
// 设置文本域光标位置（参数：开始位置，结束位置，方向）
const selection = (start, end = start, direction = 'forward') => {
  const textarea = document.getElementsByClassName('textarea')[0]
  textarea.focus()
  textarea.setSelectionRange(start, end, direction)
}

// 点击提及选项
const clickOptions = (val) => {
  if (!val) return
  status.showMention = false
  status.text = addString(status.text, ` @${val} `, status.selection.start)
  status.text = delString(status.text, status.selection.start, status.selection.start + 1)
  // 等待光标移动结束后移动
  setTimeout(() => {
    selection(status.selection.start + val.length + 2) // 两个空格+2
  }, 10)
  status.mentionList = getMentionStatus(status.text)
}
// 文本域失焦时
const mentionBlur = () => {
  const textarea = document.getElementsByClassName('textarea')[0]
  textarea.onkeydown = null
  status.showMention = false
}
// 文本域内容改变时
const mentionChange = async (input) => {
  const selector = document.getElementsByClassName('selector')[0]
  const textarea = document.getElementsByClassName('textarea')[0]
  const newStatus = await updata(textarea)
  // 更新提及选择的偏移位置并控制是否展示
  const { data, inputType } = input
  if (data === '@') {
    // 往右下各偏移22px以优化样式
    selector.style.left = newStatus.selection.left + 22 + 'px'
    selector.style.top = newStatus.selection.top + 22 + 'px'
    // 等待光标移动结束后展示(光标移动时会不展示)
    setTimeout(() => {
      status.showMention = true
    }, 10)
    if (selector) {
      selector.onmousedown = (e) => {
        e.preventDefault()
        clickOptions(status.mentionHover)
      }
    }
  } else {
    status.showMention = false
  }
  // 按了删除
  if (inputType === 'deleteContentBackward') {
    const oldMentionList = status.mentionList
    const delSpace = status.selection.start + 1
    // 精确删除
    for (const i of oldMentionList) {
      if (i.end === delSpace) {
        status.text = delString(status.text, i.start, i.end)
        setTimeout(() => {
          selection(i.start - 1)
        }, 10)
      }
    }
    // 模糊删除
    status.mentionList = getMentionStatus(status.text)
    status.text = initText(status.text, status.peopleList, status.mentionList)
  }
}
// 初始化提及详情
const getMentionStatus = (text) => {
  if (!text) return
  const result = []
  const reg = /\s@\w+\s/g
  let mentionList = text.match(reg)
  if (mentionList) {
    mentionList = mentionList.map((i) => i.replace(/@/g, ''))
    mentionList = mentionList.map((i) => i.replace(/ /g, ''))
    for (const i in mentionList) {
      const position = findString(text, mentionList[i])
      const length = mentionList[i].length + 3 // 两个空格和@
      for (const v in position) {
        const name = mentionList[i]
        const start = position[v]
        const end = position[v] + length - 1
        const space = []
        for (let i = start; i <= end; i++) {
          space.push(i)
        }
        result.push({ name, length, position, space, start, end })
      }
    }
  }
  return uniqueObjArr(result, 'start')
}
// 移除不完整提及（参数：字符串，提及列表，提及状态）
const initText = (text, list, mentionStatus) => {
  if (!text || !list) return
  let result = text
  for (const i in mentionStatus) {
    if (list.indexOf(mentionStatus[i].name) === -1) {
      const { start, end } = mentionStatus[i]
      result = delString(text, start, end + 1)
    }
  }
  return result
}

onMounted(() => {
  const { modelValue, peopleList } = props
  status.peopleList = peopleList
  status.text = modelValue
})
</script>

<style scoped>
.selector {
  flex: none;
  position: absolute;
  max-height: 200px;
  max-width: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1000;
  border-radius: 4px;
  box-shadow: 0 4px 10px #0000001a;
}
.options {
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 12px;
  background-color: rgb(255, 255, 255);
}
.options:hover {
  background-color: rgb(242, 243, 245);
  cursor: pointer;
}

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
  /* transform: translate(-250px, 0); */
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
