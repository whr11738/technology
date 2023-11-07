<template>
  <div style="display:flex;height: 100%;overflow-y: scroll;" @scroll.passive="onScroll($event)">
    <!-- 主体 -->
    <div style="width:90%">
      <div v-for="(item, name) in index" :key="name">
        <div :id="name">
          <!-- 大标题 -->
          <p style="font-size:24px;left:0;text-align:left;position: relative;margin:5px 0 32px 10px">
            {{ name }}
          </p>
          <div v-for="items in item" :key="items.countryName">
            <!-- 每一行 -->
            <div style="display:flex;margin:4px 0 4px 10px">
              <p style="flex:none;font-size:16px;">
                {{ items.countryName }}
              </p>
              <div style="flex:auto;"></div>
              <p style="flex:none;">{{ '+' + items.phoneCode }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右边索引 -->
    <div style="position:fixed;top:50%;right:5%;transform: translateY(-40%);">
      <div v-for="(item, name) in index" :key="name" @click="onClick(name)">
        <p v-if="pinStatus.pin === name" style="color:red">{{ name }}</p>
        <p v-else>{{ name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['index'],
  data() {
    return {
      pinStatus: {
        clickPin: false, // 是否点击索引条
        pinHeight: [], // 每个索引条目的高度
        pin: '' // 目前索引位置
      }
    }
  },
  methods: {
    // 点击右边索引条
    onClick(pin) {
      this.pinStatus.clickPin = true
      document.querySelector(`#${pin}`).scrollIntoView(true)
      this.pinStatus.pin = pin
    },
    // 滑动时
    onScroll(event) {
      if (this.pinStatus.clickPin === false) {
        // 获取每个主题的高度
        if (this.pinStatus.pinHeight.length === 0) {
          for (const item in this.index) {
            this.pinStatus.pinHeight.push({
              title: item,
              height: document.querySelector(`#${item}`).offsetTop
            })
          }
        }
        // 显示的主题变化时改变目前的索引
        if (event.target.scrollTop === 0) {
          this.pinStatus.pin = this.pinStatus.pinHeight[0].title
        } else {
          this.pinStatus.pinHeight.map((item) => {
            event.target.scrollTop + event.target.clientHeight > item.height && (this.pinStatus.pin = item.title)
          })
        }
      }
      this.pinStatus.clickPin = false
    }
  }
}
</script>
