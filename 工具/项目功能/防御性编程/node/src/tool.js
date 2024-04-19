// 未加密代码

window.tool = {
  // 封装storage
  storage: {
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    get(key) {
      return JSON.parse(localStorage.getItem(key));
    },
    del(key) {
      localStorage.removeItem(key);
    },
  },
  // 封装cookie
  cookie: {
    set(name, value, days, path) {
      if (!name || value === undefined) return false;
      if (!days) days = 1;
      if (!path) path = "/";
      let d = new Date();
      d.setTime(d.getTime() + days * 24 * 3600 * 1000);
      document.cookie = name + "=" + JSON.stringify(value) + "; expires=" + d.toUTCString() + "; path=" + path;
    },
    get(name) {
      if (!name) return null;
      let arr = document.cookie.split("; ");
      for (let i = 0; i < arr.length; i++) {
        let temp = arr[i].split("=");
        if (temp[0] == name) {
          try {
            return JSON.parse(temp[1]);
          } catch (e) {
            return temp[1];
          }
        }
      }
      return null;
    },
    del(name, path) {
      if (!name) return false;
      if (!path) path = "/";
      let d = new Date();
      d.setTime(d.getTime() - 10000);
      let val = JSON.stringify(this.get(name));
      document.cookie = name + "=" + val + "; expires=" + d.toUTCString() + "; path=" + path;
    },
  },
  // 时间工具 参数(时间戳,时间格式替换)
  dateTool: (data, replace) => {
    let newDate = new Date();
    if (data) {
      newDate = new Date(parseInt(data));
    }
    let fullDate = newDate.toLocaleString(); // 日期(年/月/日 时:分:秒)
    if (replace) {
      fullDate = fullDate.replaceAll("/", replace);
    }
    const base0 = {
      fullDate,
      date: fullDate.split(" ")[0], // 日期(年/月/日)
      time: fullDate.split(" ")[1], // 日期(时/分/秒)
      getTime: newDate.getTime(), // 时间戳
    };
    const base1 = {
      year: newDate.getFullYear(), //年
      month: newDate.getMonth() + 1, //月
      week: newDate.getDay(), //周 0是周日
      day: newDate.getDate(), //日
      hours: newDate.getHours(), //时
      minutes: newDate.getMinutes(), //分
      seconds: newDate.getSeconds(), //秒
      milliseconds: newDate.getMilliseconds(), //毫秒
    };
    const getZero = (n) => (n < 10 ? "0" + n : n);
    const base2 = {
      year0: getZero(base1.year), //年 一位数时前面加0
      month0: getZero(base1.month), //月 一位数时前面加0
      day0: getZero(base1.day), //日 一位数时前面加0
      hours0: getZero(base1.hours), //时 一位数时前面加0
      minutes0: getZero(base1.minutes), //分 一位数时前面加0
      seconds0: getZero(base1.seconds), //秒 一位数时前面加0
    };
    // 时间戳长度
    const timeLength = {
      pastDayTime: new Date().getTime() - new Date(base0.date).getTime(), // 今天已经度过的时间长度
      dayLength: 1 * 24 * 60 * 60 * 1000, // 一天的时间长度
      weekLength: 7 * 24 * 60 * 60 * 1000, // 一周的时间长度
      monthLength: 30 * 24 * 60 * 60 * 1000, // 一月的时间长度
      yearLength: 365 * 24 * 60 * 60 * 1000, // 一年的时间长度
    };
    // 快捷时间戳
    const getTime = {
      this: {
        day: {
          start: new Date(base0.date).getTime(), // 今天0点0分0秒
          end: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1).getTime() - 1000, // 今天23点23分59秒
        },
        week: {
          start: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() - (base1.week === 0 ? 7 : base1.week) + 1).getTime(), // 这周一0点0分0秒
          end: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 7 - (base1.week === 0 ? 7 : base1.week) + 1).getTime() - 1000, // 这周最后一天23点23分59秒
        },
        month: {
          start: new Date(newDate.getFullYear(), newDate.getMonth(), 1).getTime(), // 这月1号0点0分0秒
          end: new Date(newDate.getFullYear(), newDate.getMonth() + 1, 1).getTime() - 1000, // 这月最后一天23点23分59秒
        },
      },
      last: {
        day: {
          start: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() - 1).getTime(), // 昨天0点0分0秒
          end: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()).getTime() - 1000, // 昨天23点23分59秒
        },
        week: {
          start: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() - (base1.week === 0 ? 7 : base1.week) - 6).getTime(), // 上周一0点0分0秒
          end: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() - (base1.week === 0 ? 7 : base1.week) + 1).getTime() - 1000, // 上周最后一天23点23分59秒
        },
        month: {
          start: new Date(newDate.getFullYear(), newDate.getMonth() - 1, 1).getTime(), // 上月1号0点0分0秒
          end: new Date(newDate.getFullYear(), newDate.getMonth(), 1).getTime() - 1000, // 上月最后一天23点23分59秒
        },
      },
    };
    const monthList = ["十二月", "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月"];
    const monthList2 = ["December", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November"];
    const monthList3 = ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "ept", "Oct", "Nov"];
    const weekList = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    const weekList2 = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekList3 = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    const base3 = {
      amOrPm: base1.hours < 12 ? "AM" : "PM",
      hourOf12: base1.hours < 12 ? base1.hours : base1.hours - 12,
      week: weekList[base1.week],
      week2: weekList2[base1.week],
      week3: weekList3[base1.week],
      month: monthList[base1.month],
      month2: monthList2[base1.month],
      month3: monthList3[base1.month],
    };
    return {
      0: data ? base0.fullDate : null,
      1: base0.getTime,
      base0,
      base1,
      base2,
      base3,
      timeLength,
      getTime,
      y: base2.year0,
      m: base2.month0,
      d: base2.day0,
      h: base2.hours0,
      mm: base2.minutes0,
      s: base2.seconds0,
    };
  },
};
