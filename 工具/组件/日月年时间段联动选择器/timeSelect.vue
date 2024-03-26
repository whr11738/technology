<!-- 日月年时间段联动选择器 -->
<!-- 基于 Vue3 element-plus 实现 -->
<!-- 需要引入 baseTool 工具库 -->
<!--  <timeSelect :initData="[初始化开始时间戳,初始化结束时间戳]" @change="回调函数" /> -->
<template>
  <div style="margin: 18px">
    <!-- 时间类型选择 -->
    <el-select v-model="d.type" :placeholder="'时间'" style="margin-right: 18px" @change="changeType">
      <el-option v-for="item in d.typeList" :key="item.type" :label="item.i18n" :value="item.type"></el-option>
    </el-select>
    <!-- 日-->
    <el-date-picker
      @change="changeTime"
      v-if="d.type === 'day'"
      v-model="d.dateArr"
      type="datetimerange"
      range-separator="-"
      :start-placeholder="'开始时间'"
      :end-placeholder="'结束时间'"
      :default-time="d.defaultTime"
      style="transform: translate(0, 2px)"
    />
    <!-- 月 -->
    <el-date-picker
      @change="changeTime"
      v-if="d.type === 'month'"
      v-model="d.dateArr"
      type="monthrange"
      range-separator="-"
      :start-placeholder="'开始月份'"
      :end-placeholder="'结束月份'"
      style="transform: translate(0, 2px)"
    />
    <!-- 年 -->
    <el-date-picker @change="changeTime" v-if="d.type === 'year'" v-model="d.dateArr0" type="year" :placeholder="'开始年份'" />
    <span v-if="d.type === 'year'" style="margin: 18px">{{ "-" }}</span>
    <el-date-picker @change="changeTime" v-if="d.type === 'year'" v-model="d.dateArr1" type="year" :placeholder="'结束年份'" />
  </div>
</template>

<script setup>
import { reactive, defineEmits, defineProps, onMounted } from "vue";
import { dateTool } from "@/utils/baseTool";

const emit = defineEmits(["change"]);
const props = defineProps(["initData"]);
const d = reactive({
  typeList: [
    { type: "day", i18n: "日" },
    { type: "month", i18n: "月" },
    { type: "year", i18n: "年" },
  ],
  dateArr: [],
  dateArr0: null,
  dateArr1: null,
  type: null,
  start: null,
  end: null,
  defaultTime: [new Date(2000, 1, 1, 0, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59, 999)], // 选择时间默认 '00:00:00:000'开始 '23:59:59:999'结束
});
// 改变时间类型
const changeType = (time) => {
  d.dateArr = [];
  d.dateArr0 = null;
  d.dateArr1 = null;
  d.start = null;
  d.end = null;
  console.log("date-start", null, "date-end", null);
  // 两个空时间
  emit("change", null, null);
};
// 改变时间
const changeTime = (time) => {
  if (!time) {
    d.dateArr0 = null;
    d.dateArr1 = null;
    d.start = null;
    d.end = null;
    console.log("date-start", null, "date-end", null);
    // 两个空时间
    emit("change", null, null);
    return;
  }
  let time0 = new Date(time[0]).getTime();
  let time1 = new Date(time[1]).getTime();
  if (d.type === "day") {
    d.start = time0;
    d.end = time1;
  }
  if (d.type === "month") {
    // 如果选的 6-7 月，time0是6月1号，time1是7月1号，处理end为7月1号(8月1号-1)
    d.start = time0;
    d.end = new Date(dateTool(time1).base1.year, dateTool(time1).base1.month, dateTool(time1).base1.day).getTime() - 1;
  }
  if (d.type === "year") {
    // 如果选的 2000-2001 年，time0是2000年1月1日，time1是2001年1月1日，处理end为是2000年12月31日(2001年1月1号-1)
    time0 = new Date(d.dateArr0).getTime() < new Date(d.dateArr1).getTime() ? new Date(d.dateArr0).getTime() : new Date(d.dateArr1).getTime(); // time0 取 两选择器中最小时间
    time1 = new Date(d.dateArr0).getTime() > new Date(d.dateArr1).getTime() ? new Date(d.dateArr0).getTime() : new Date(d.dateArr1).getTime(); // time1 取 两选择器中最大时间
    d.start = time0;
    d.end = new Date(dateTool(time1).base1.year + 1, dateTool(time1).base1.month - 1, dateTool(time1).base1.day).getTime() - 1;
  }
  if (Boolean(d.start && d.end)) {
    console.log(Boolean(d.start && d.end), "date-start", d.start, "date-end", d.end);
    emit("change", d.start, d.end);
  } else {
    console.log("date-start", null, "date-end", null);
    // 两个空时间
    emit("change", null, null);
  }
};

onMounted(() => {
  console.log("props.initData", props.initData);
  if (props.initData && props.initData.length) {
    d.type = "day";
    d.dateArr = [...props.initData];
  }
});

// 时间工具 参数(时间戳,时间格式替换)
// const dateTool = (data, replace) => {
//   let newDate = new Date();
//   if (data) {
//     newDate = new Date(parseInt(data));
//   }
//   let fullDate = newDate.toLocaleString(); // 日期(年/月/日 时:分:秒)
//   if (replace) {
//     fullDate = fullDate.replaceAll('/', replace);
//   }
//   const base0 = {
//     fullDate,
//     date: fullDate.split(' ')[0], // 日期(年/月/日)
//     time: fullDate.split(' ')[1], // 日期(时/分/秒)
//     getTime: newDate.getTime(), // 时间戳
//   };
//   const base1 = {
//     year: newDate.getFullYear(), //年
//     month: newDate.getMonth() + 1, //月
//     week: newDate.getDay(), //周 0是周日
//     day: newDate.getDate(), //日
//     hours: newDate.getHours(), //时
//     minutes: newDate.getMinutes(), //分
//     seconds: newDate.getSeconds(), //秒
//     milliseconds: newDate.getMilliseconds(), //毫秒
//   };
//   const getZero = (n) => (n < 10 ? '0' + n : n);
//   const base2 = {
//     year0: getZero(base1.year), //年 一位数时前面加0
//     month0: getZero(base1.month), //月 一位数时前面加0
//     day0: getZero(base1.day), //日 一位数时前面加0
//     hours0: getZero(base1.hours), //时 一位数时前面加0
//     minutes0: getZero(base1.minutes), //分 一位数时前面加0
//     seconds0: getZero(base1.seconds), //秒 一位数时前面加0
//   };
//   // 时间戳长度
//   const timeLength = {
//     pastDayTime: new Date().getTime() - new Date(base0.date).getTime(), // 今天已经度过的时间长度
//     dayLength: 1 * 24 * 60 * 60 * 1000, // 一天的时间长度
//     weekLength: 7 * 24 * 60 * 60 * 1000, // 一周的时间长度
//     monthLength: 30 * 24 * 60 * 60 * 1000, // 一月的时间长度
//     yearLength: 365 * 24 * 60 * 60 * 1000, // 一年的时间长度
//   };
//   // 快捷时间戳
//   const getTime = {
//     this: {
//       day: {
//         start: new Date(base0.date).getTime(), // 今天0点0分0秒
//         end: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1).getTime() - 1000, // 今天23点23分59秒
//       },
//       week: {
//         start: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() - (base1.week === 0 ? 7 : base1.week) + 1).getTime(), // 这周一0点0分0秒
//         end: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 7 - (base1.week === 0 ? 7 : base1.week) + 1).getTime() - 1000, // 这周最后一天23点23分59秒
//       },
//       month: {
//         start: new Date(newDate.getFullYear(), newDate.getMonth(), 1).getTime(), // 这月1号0点0分0秒
//         end: new Date(newDate.getFullYear(), newDate.getMonth() + 1, 1).getTime() - 1000, // 这月最后一天23点23分59秒
//       },
//     },
//     last: {
//       day: {
//         start: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() - 1).getTime(), // 昨天0点0分0秒
//         end: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()).getTime() - 1000, // 昨天23点23分59秒
//       },
//       week: {
//         start: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() - (base1.week === 0 ? 7 : base1.week) - 6).getTime(), // 上周一0点0分0秒
//         end: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() - (base1.week === 0 ? 7 : base1.week) + 1).getTime() - 1000, // 上周最后一天23点23分59秒
//       },
//       month: {
//         start: new Date(newDate.getFullYear(), newDate.getMonth() - 1, 1).getTime(), // 上月1号0点0分0秒
//         end: new Date(newDate.getFullYear(), newDate.getMonth(), 1).getTime() - 1000, // 上月最后一天23点23分59秒
//       },
//     },
//   };
//   const monthList = ['十二月', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月'];
//   const monthList2 = ['December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'];
//   const monthList3 = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'ept', 'Oct', 'Nov'];
//   const weekList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
//   const weekList2 = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   const weekList3 = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
//   const base3 = {
//     amOrPm: base1.hours < 12 ? 'AM' : 'PM',
//     hourOf12: base1.hours < 12 ? base1.hours : base1.hours - 12,
//     week: weekList[base1.week],
//     week2: weekList2[base1.week],
//     week3: weekList3[base1.week],
//     month: monthList[base1.month],
//     month2: monthList2[base1.month],
//     month3: monthList3[base1.month],
//   };
//   return {
//     0: data ? base0.fullDate : null,
//     1: base0.getTime,
//     base0,
//     base1,
//     base2,
//     base3,
//     timeLength,
//     getTime,
//     y: base2.year0,
//     m: base2.month0,
//     d: base2.day0,
//     h: base2.hours0,
//     mm: base2.minutes0,
//     s: base2.seconds0,
//   };
// };
</script>

<style scoped></style>
