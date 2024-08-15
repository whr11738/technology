<!-- uniapp模板页面  使用vant组件库(v2)-->
<!-- 记得引入样式-->
<template>
  <view class="w100p fy">
    <view class="pl16 pr16" style="">
      <!-- 下拉刷新 -->
      <van-pull-refresh v-model="loading" @refresh="reset" :pulling-text="' '" :loosing-text="' '" :loading-text="' '">
        <van-list v-model="loading" :finished="pagination.finished" finished-text="No more" @load="nextPage" :loading-text="' '">
          <!-- 卡片 -->
          <view v-for="(item, index) in list" :key="index" class="fxc fy w100p p24 pb14 card bb mt12 mb12" style="border-radius: 12px">
            <view class="f w100p mb24 fyc" style="">
              <view class="fa" style="">
                <p class="text1 mb4" style="">{{ item.name }}</p>
                <p class="text2" style="">{{ item.id }}</p>
              </view>
              <view class="fc" style="width: 82px; height: 36px; background: #15af9f; border-radius: 18px">
                <p class="text3" style="" @click="toCon(item)">{{ "Button" }}</p>
              </view>
            </view>
            <!-- 虚线 -->
            <view class="dotted h1 o2"></view>
            <view class="f mt10 fyc" style="">
              <p class="fa text4" style="">{{ item.createTime }}</p>
              <p class="text5" style="" @click="toDet(item)">{{ "Details" }}{{ " >" }}</p>
            </view>
          </view>
        </van-list>
      </van-pull-refresh>
    </view>
  </view>
</template>

<script>
import { Dialog } from "vant";
import "@/static/style/style.css";
import * as tool from "@/utils/baseTool.js";

export default {
  mixins: [],
  components: {},
  computed: {},
  props: {},
  watch: {},
  mounted() {},
  onLoad() {},
  onUnload() {
    uni.setNavigationBarTitle({ title: "" });
  },
  data() {
    return {
      o: null,
      loading: false,
      list: [],
      form: {},
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        finished: false,
      },
    };
  },
  async onLoad(o) {
    uni.showLoading({ mask: true });
    // document.querySelector(".uni-page-head-btn").style.display = "none";
    uni.setNavigationBarTitle({ title: "title" });
    this.o = o;
    await this.reset();
    uni.hideLoading();
  },
  methods: {
    // 初始化
    async init() {
      console.log("init");
      this.list.length = 0;
      this.pagination.finished = false;
      await this.getList();
    },
    // 下一页
    async nextPage() {
      console.log("nextPage");
      this.pagination.current++;
      await this.getList();
    },
    // 获取列表
    async getList() {
      const params = {
        page: this.pagination.current,
        size: this.pagination.pageSize,
        ...this.form,
      };
      console.log("params", params);
      this.loading = true;
      const res = await tool.fakeApi(params.page, params.siez);
      console.log("res", res);
      this.list.push(...res.data);
      this.pagination.total = res.total;
      this.pagination.finished = !res.nextPage;
      this.loading = false;
    },
    // 重新加载
    reset() {
      console.log("reset");
      this.form = {};
      this.pagination.current = 1;
      this.init();
    },
    // 确认
    toCon(row) {
      console.log("toCon", row);
    },
    // 详情
    toDet(row) {
      console.log("toDet", row);
    },
    // 弹出提示
    showTip() {
      Dialog.alert({ title: "title", message: "message", confirmButtonText: "confirmButtonText", confirmButtonColor: "#14af9f" });
    },
  },
  onNavigationBarButtonTap() {
    // pages.json的返回按钮
    // {
    //   "path": "pages/home/index",
    //   "style": {
    //     "navigationBarTitleText": "",
    //     "app-plus": {
    //       "titleNView": {
    //         "buttons": [
    //           {
    //             "type": "back",
    //             "fontSize": "50rpx",
    //             "float": "left"
    //           }
    //         ]
    //       }
    //     }
    //   }
    // }
    console.log("onNavigationBarButtonTap");
  },
};
</script>

<style lang="scss" scoped>
.text1 {
  font-family: Poppins-SNaNpxiBold;
  font-weight: 600;
  font-size: 32px;
  color: #181c31;
  line-height: 32px;
}
.text2 {
  font-family: Inter-Regular;
  font-weight: 400;
  font-size: 14px;
  color: #7e8299;
  line-height: 20px;
}
.text3 {
  font-family: Inter-Medium;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
  text-align: right;
  line-height: 20px;
}
.text4 {
  font-family: Inter-Regular;
  font-weight: 400;
  font-size: 14px;
  color: #181c31;
  line-height: 20px;
}
.text5 {
  font-family: Inter-Regular;
  font-weight: 400;
  font-size: 14px;
  color: #15af9f;
  text-align: right;
  line-height: 20px;
}
.card {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
}
/* 虚线 */
.dotted {
  background-image: linear-gradient(to right, #000 50%, rgba(255, 255, 255, 0) 0%); /* 35%设置虚线点x轴上的长度 */
  background-position: bottom; /* top配置上边框位置的虚线 */
  background-size: 10px 1px; /* 第一个参数设置虚线点的间距；第二个参数设置虚线点y轴上的长度 */
  background-repeat: repeat-x;
}
</style>
