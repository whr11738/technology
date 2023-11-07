export default {
  mounted(el, binding) {
    if (isPC()) {
      oncontextmenu(el, binding.value)
    } else {
      longTouch(el, binding.value)
    }
  }
}

// 鼠标右键事件
function oncontextmenu(dom, link) {
  dom.oncontextmenu = function (pointer) {
    if (pointer.button === 2) {
      removeElement()
      pointer.preventDefault()
      initMenu(pointer, link)
    }
  }
}

// 屏幕长按事件
function longTouch(dom, link) {
  let timeOutEvent = 0
  dom.addEventListener('touchstart', (pointer) => {
    timeOutEvent = setTimeout(() => {
      timeOutEvent = 0
      removeElement()
      pointer.preventDefault()
      initMenu(pointer.targetTouches[0], link)
    }, 500)
  })
  dom.addEventListener('touchmove', () => {
    clearTimeout(timeOutEvent)
    timeOutEvent = 0
  })
  dom.addEventListener('touchend', () => {
    clearTimeout(timeOutEvent)
    return false
  })
}

// 创建菜单
function initMenu(pointer, link) {
  if (pointer) {
    const has = document.getElementsByClassName('menu')
    if (has && has.length) return
    // 创建节点
    const div = document.createElement('div')
    const body = document.getElementsByTagName('body')[0]
    const ul = document.createElement('ul')
    const li = document.createElement('li')
    // 建立关系
    ul.appendChild(li)
    div.appendChild(ul)
    body.appendChild(div)
    // 添加样式
    div.setAttribute('class', 'menu')
    li.setAttribute('style', liStyle)
    div.setAttribute('style', divStyle)
    li.innerText = '查看原需求'
    const { clientY, clientX } = pointer
    div.style.top = `${clientY}px`
    div.style.left = `${clientX}px`
    // 点击事件
    li.addEventListener(
      'click',
      (e) => {
        e.stopPropagation()
        window.open(link)
        div.remove()
      },
      true
    )
    // 移入事件
    li.addEventListener(
      'mouseenter',
      () => {
        li.style.color = '#409eff'
      },
      true
    )
    // 移出事件
    li.addEventListener(
      'mouseleave',
      () => {
        li.style.color = 'black'
      },
      true
    )
    // 点击其他位置以销毁
    document.addEventListener('click', removeElement, true)
  }
}

// 移除菜单
function removeElement() {
  const list = document.getElementsByClassName('menu')
  for (const item of list) {
    item.remove()
  }
  document.removeEventListener('click', removeElement)
}

// 判断是否pc端
function isPC() {
  const userAgentInfo = navigator.userAgent
  const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
  let flagPc = true
  for (const i of Agents) {
    if (userAgentInfo.indexOf(i) > 0) {
      flagPc = false
      break
    }
  }
  return flagPc
}

// 样式
const divStyle = `
  position: fixed;
  box-sizing: border-box;
  padding: 10px;
  width: 200px;
  background: #fff;
  z-index: 999;
  box-shadow: 0 0 10px rgba(0,0,0,.2);
  border-radius: 4px;`
const liStyle = `
  cursor: pointer;
  z-index: 999;
  posiretion: relative;`
