<template>
  <el-image-viewer v-if="imgShow" :url-list="[imgUrl]" />
  <div class="description-html" v-html="data"></div>
</template>

<script>
import ElImageViewer from 'element-plus/es/components/image-viewer'
export default {
  data() {
    return {
      data: '', // 主数据
      imgUrl: '', // 放大图片的url
      imgShow: false // 显示放大图片界面
    }
  },
  components: {
    ElImageViewer
  },
  methods: {
    // 给图片绑定点击事件
    initPreview() {
      const imgList = document.getElementsByClassName('description-html')[0].getElementsByTagName('img')
      // const imgList = document.getElementsByTagName('img') // 整个网页的图片都会绑定
      for (const i of imgList) {
        i.addEventListener('click', () => {
          this.showPreview(i.currentSrc)
        })
      }
    },
    // 进入图片预览模式
    showPreview(url) {
      this.imgUrl = url
      this.imgShow = true
      this.$nextTick(() => {
        document.getElementsByClassName('el-image-viewer__mask')[0].addEventListener('click', () => {
          this.imgShow = false
        })
      })
    }
  },
  create() {
    // 拿到数据后序列化并初始化
    getData(id).then((r) => {
      this.data = r
      try {
        this.data = JSON.parse(this.data)
      } catch () {
        this.data = r
      }
      this.$nextTick(() => {
        this.initPreview()
      })
    })
  }
}
</script>
