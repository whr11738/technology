// #region 对象
// 数组转对象
export const arrToObj = (arr) => {
  const res = {};
  for (const i in arr) {
    const num = `${parseInt(i) + 1}`;
    res[num] = arr[i];
  }
  return res;
};
// 复制对象
export const copyObj = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};
// 保留响应式给对象赋值
export const copyVueObj = (arr, target) => {
  for (const i in target) {
    arr[i] = target[i];
  }
};
// 验证对象是否有为空的属性(对象，属性)
export const objHasBlank = (obj, indexArray) => {
  let result = false;
  indexArray.forEach((i) => {
    !obj[i] && (result = true);
  });
  return result;
};
// 删除对象中空属性
export const delBlank = (obj) => {
  const result = obj;
  for (const i in result) {
    result[i].length === 0 && delete result[i];
  }
  return result;
};
// 过滤对象中的值(对象，属性，原值，目标值)
export const filterObj = (obj, indexArray, value, target) => {
  for (const i in obj) {
    if (arrHave(indexArray, i) && obj[i] === value) {
      obj[i] = target;
    }
  }
};
// 请求对象的所有属性进行序列化
export const stringifyAll = (obj) => {
  const result = obj;
  for (const i in result) {
    result[i] = JSON.stringify(result[i]);
  }
  return result;
};
// 请求对象的部分属性进行序列化
export const stringify = (obj, name) => {
  const result = obj;
  for (const i of name) {
    result[i] = JSON.stringify(result[i]);
  }
  return result;
};
// 将对象(obj)中属性(Arr中的)值赋为val
export const initObj = (obj, arr, val = "") => {
  arr.forEach((i) => {
    obj[i] = val;
  });
  return obj;
};
// 将数组(arr)中所有对象中属性(tag中的)值赋为val
export const initArrObj = (arr, tag, val = "") => {
  for (const i of arr) {
    i[tag] = val;
  }
  return arr;
};
// 对象转URL
export const ObjToUrl = (api, obj) => {
  let url = api + "?";
  for (const i in obj) {
    url += `${i}=${obj[i]}&`;
  }
  url = url.substring(0, url.length - 1);
  return url;
};
// #endregion

// #region 数组
// 保留响应式给数组赋值
export const copyArr = (arr, target) => {
  arr.length = 0;
  arr.push(...target);
  return arr;
};
// 查找数组中是否存在val
export const arrHave = (arr, val) => {
  return arr.indexOf(val) !== -1;
};
// 查找数组(arr)中属性(name)值为val的目标的索引
export const arrFindIndex = (arr, name, val) => {
  return arr.findIndex((item) => item[name] === val);
};
// 查找数组(arr)中属性(name)值为val的目标
export const arrFindItem = (arr, name, val) => {
  const i = arr.findIndex((item) => item[name] === val);
  return i === -1 ? null : arr[i];
};
// 删除数组(arr)中属性(name)值为val的目标
export const arrRemoveItem = (arr, name, val) => {
  if (!arr) return;
  const i = arr.findIndex((item) => item[name] === val);
  if (i === -1) return;
  arr.splice(i, 1);
};
// 查找数组(arr)中属性(name)值为val的目标的属性（goal）的值
export const arrFind = (arr, name, val, goal) => {
  const i = arr.findIndex((item) => item[name] === val);
  return i === -1 ? null : arr[i][goal];
};
// 根据索引删除数组中目标
export const arrDel = (arr, index) => {
  return arr.splice(index, 1);
};
// 将一个数字数组中所有数字相加
// addArr([1, 2, 3]) // 6
export const addArr = (arr) => arr.reduce((_, __) => _ + __, 0);
// 两数组的交集
export const arrSame = (arr1, arr2) => {
  return arr1.filter((item) => {
    return arr2.includes(item);
  });
};
// 合并两数组并去重
export const arrAdd = (arr1, arr2) => {
  return [...new Set([...arr1, ...arr2])];
};
// 多数组合并并去重(参数：对象数组,数组在对象中的属性名)
export const arrsAdd = (arrs, key) => {
  let res = [];
  for (const i of arrs) {
    if (!res.length) res = i[key];
    else {
      res = [...new Set([...i[key], ...res])];
    }
  }
  return res;
};
// 对象数组去重(参数：数组，唯一标识属性)
export const uniqueObjArr = (arr, uniId) => {
  const res = new Map();
  return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1));
};
// 数组转字符串
export const arrToStr = (val, tag = ";") => {
  return val.join(tag);
};
// 字符串转数组
export const strToArr = (str, tag = "") => {
  return str.split(tag);
};
// #endregion

// #region 字符串
// 字符串转数字
export const strToNum = (val) => {
  return parseInt(val, 10);
};
// 字符串转对象（兼容是否有花括号）
export const strToObj = (val) => {
  let res = {};
  try {
    let data = val.replace(/^\s*|\s*$/g, "");
    if (data[0] !== "{") data = `{${val}}`;
    res = eval("(" + data + ")");
  } catch (e) {
    console.log(e);
  }
  return res;
};
// 数字转字符串
export const numToStr = (val) => {
  return `${val}`;
};
// 首字母大写,其余小写
export const titleCase = (str) => {
  const newStr = str.toLowerCase();
  return newStr.charAt(0).toUpperCase() + newStr.slice(1);
};
// 返回子字符串在字符串中的位置(参数：字符串，子字符串)
export const findString = (str, target) => {
  if (!str || !target) return;
  let index = str.indexOf(target);
  const p = [];
  while (index !== -1) {
    p.push(index + 1);
    index = str.indexOf(target, index + 1);
  }
  return p;
};
// 根据位置删除字符串内容 （没有0，从1开始，start删除，end不删）
export const delString = (str, start, end) => {
  if (!str || !start || !end) return;
  const length = str.length;
  const left = str.slice(0, start - 1);
  const right = str.slice(end - 1, length);
  return left + right;
};
// 根据位置插入字符串内容(参数：字符串，子字符串，位置)
export const addString = (str, target, start) => {
  const length = str.length;
  const left = str.slice(0, start);
  const right = str.slice(start, length);
  return left + target + right;
};
// 利用正则匹配处理字符串(目标，正则表达式，处理函数)    getRegStr('a-bc', /\-[a-z]/g, (i) => i.slice(1).toUpperCase());      a-bc => aBc
export const getRegStr = (tag, reg, fun) => {
  if (!reg) return "";
  const arr = tag.match(reg);
  if (!arr) return tag;
  for (const i of arr) {
    tag = tag.replace(i, fun);
  }
  return tag;
};
// 获取字符串里的img标签
export const getMediaTag = (data) => {
  console.log(data);
  const tagReg = new RegExp("<(img|video|source).*?(?:>|/>)", "gi");
  const tagReg2 = /<\/(video|source)*?(?:>)/gi;
  const clearClass = 'data-w-e-type="video"';
  const srcReg = new RegExp("src=['\\\"]?([^'\"]*)['\"]?", "i");
  const match = data.match(tagReg);
  const list = [];
  console.log(match);
  if (match) {
    for (const m of match) {
      data = data.replace(m, "");
      data = data.replace(tagReg2, "");
      data = data.replace(clearClass, "");
      const src = m.match(srcReg);
      if (src && src.length) {
        const url = src[1];
        list.push({
          type: getFileTagByUrl(url),
          url,
        });
      }
    }
  }
  console.log(data);
  return { list, data };
};
// #endregion

// #region 数字
// 返回小数保留后几位后的数字(四舍五入)
export const initNum = (num, len) => {
  if (decimalLen(num) >= len) {
    return parseFloat(num.toFixed(len));
  } else {
    return num;
  }
};
// 返回小数长度
export const decimalLen = (num) => {
  const numInstr = num + "";
  let behindLen = 0;
  numInstr.split(".")[1] && (behindLen = numInstr.split(".")[1].length);
  return behindLen;
};
// 判断是否为纯数字
export const isIntNum = (val) => {
  const reg = /^\d{1,}$/;
  const pattern = new RegExp(reg);
  return pattern.test(val);
};
// #endregion

// #region 时间
// 时间工具 参数(时间戳,时间格式替换)
export const dateTool = (data, replace) => {
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
  const getZero = (n) => {
    return n < 10 ? "0" + n : n;
  };
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
};
// 获取两段日期中所有的天
export const getDateList = (start, end) => {
  const getDate = (datestr) => {
    const temp = datestr.split("-");
    const date = new Date(temp[0], temp[1] - 1, temp[2]);
    return date;
  };
  const dateList = [];
  const startTime = getDate(start);
  const endTime = getDate(end);
  while (endTime.getTime() - startTime.getTime() >= 0) {
    const year = startTime.getFullYear();
    const month = startTime.getMonth() + 1 < 10 ? "0" + (startTime.getMonth() + 1) : startTime.getMonth() + 1;
    const day = startTime.getDate().toString().length === 1 ? "0" + startTime.getDate() : startTime.getDate();
    dateList.push(year + "-" + month + "-" + day);
    startTime.setDate(startTime.getDate() + 1);
  }
  return dateList;
};
// 秒数转化为时分秒
export const formatSeconds = (value) => {
  let second = parseInt(value);
  let minute = 0;
  let hour = 0;
  if (second >= 60) {
    minute = parseInt(second / 60);
    second = parseInt(second % 60);
    if (minute >= 60) {
      hour = parseInt(minute / 60);
      minute = parseInt(minute % 60);
    }
  }
  const getZero = (v) => {
    return v < 10 ? "0" + v : v;
  };
  const h = getZero(parseInt(hour));
  const m = getZero(parseInt(minute));
  const s = getZero(parseInt(second));
  const result = `${h}:${m}:${s}`;
  return result;
};
// #endregion

// #region dom

/* clientX：当鼠标事件发生时，鼠标相对于浏览器（这里说的是浏览器的有效区域）x轴的位置；
clientY：当鼠标事件发生时，鼠标相对于浏览器（这里说的是浏览器的有效区域）y轴的位置；
screenX：当鼠标事件发生时，鼠标相对于显示器屏幕x轴的位置；
screenY：当鼠标事件发生时，鼠标相对于显示器屏幕y轴的位置；
offsetX：当鼠标事件发生时，鼠标相对于事件源(dom)x轴的位置;
offsetY：当鼠标事件发生时，鼠标相对于事件源(dom)y轴的位置; */

// 拖拽dom dom记得开启绝对定位
export const domMove = (element) => {
  const dom = element;
  dom.onmousedown = (e) => {
    const X = e.clientX - dom.offsetLeft;
    const Y = e.clientY - dom.offsetTop;
    document.onmousemove = (m) => {
      const left = m.clientX - X;
      const top = m.clientY - Y;
      dom.style.left = left + "px";
      dom.style.top = top + "px";
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
};
// 手机端触摸事件(点击，拖动，长按)
export const longTouch = (dom) => {
  let timeOutEvent = 0;
  dom.addEventListener("touchstart", (e) => {
    e.preventDefault();
    timeOutEvent = setTimeout(() => {
      timeOutEvent = 0;
      console.log("长按");
      console.log(e);
    }, 500);
  });
  dom.addEventListener("touchmove", (e) => {
    clearTimeout(timeOutEvent);
    timeOutEvent = 0;
    console.log("拖动");
    console.log(e);
  });
  dom.addEventListener("touchend", (e) => {
    clearTimeout(timeOutEvent);
    if (timeOutEvent !== 0) {
      console.log("点击");
      console.log(e);
    }
    return false;
  });
};
// 判断DOM是否在屏幕可见区内
export const domInViewport = (el) => {
  if (!el) return;
  let rect = el.getBoundingClientRect();
  return !(rect.top >= (window.innerHeight || document.documentElement.clientHeight) || rect.bottom <= 0);
};
// 滚动到锚点位置 <div id="home">  scrollView('home')
export const scrollView = (id) => {
  document.querySelector(`#${id}`).scrollIntoView({ behavior: "smooth" });
};
// 使溢出滚动的div滚动到指定位置
export const divScroll = (el, val = 0, topOrBottom = "top") => {
  if (!el) return;
  let { scrollHeight, offsetHeight } = el;
  scrollHeight = Math.round(scrollHeight);
  offsetHeight = Math.round(offsetHeight);
  if (topOrBottom === "top") {
    el.scrollTop = val;
  } else {
    el.scrollTop = scrollHeight - offsetHeight - val;
  }
};
// 获取溢出滚动的div滚动状态
export const getDivScrollStatus = (el) => {
  if (!el) return;
  const { scrollTop, scrollHeight, offsetHeight } = el;
  return {
    top: Math.round(el.scrollTop),
    bottom: Math.round(scrollHeight - offsetHeight - scrollTop),
    height: Math.round(offsetHeight),
    scrollHeight: Math.round(scrollHeight),
  };
};
// 设置文本域光标位置（参数：开始位置，结束位置，方向）
export const selection = (start, end = start, direction = "forward") => {
  const textarea = document.getElementsByClassName("textarea")[0];
  textarea.focus();
  textarea.setSelectionRange(start, end, direction);
};
// 计算光标坐标位置
export const getSelectionCoordinate = (textarea) => {
  const puppet = document.getElementsByClassName("puppet")[0];
  const miniselector = document.getElementsByClassName("miniselector")[0];
  const { scrollTop } = textarea;
  puppet.scrollTop = scrollTop;
  puppet.style.width = textarea.offsetWidth - 6 + "px";
  puppet.style.height = textarea.offsetHeight - 6 + "px";
  puppet.style.border = "1px solid transparent";
  puppet.style.padding = "2px";
  const top = miniselector.offsetTop - scrollTop;
  const left = miniselector.offsetLeft;
  return { left, top };
};
// 计算光标字符位置
export const getSelectionStatus = (textarea) => {
  if ("selectionStart" in textarea) {
    const length = textarea.selectionEnd - textarea.selectionStart;
    return {
      start: textarea.selectionStart,
      end: textarea.selectionEnd,
      length: length,
      text: textarea.value.substr(textarea.selectionStart, length),
    };
  } else if (document.selection) {
    textarea.focus();
    const result = document.selection.createRange();
    if (result === null) {
      return {
        start: 0,
        end: textarea.value.length,
        length: 0,
      };
    }
    const re = textarea.createTextRange();
    const rc = re.duplicate();
    re.moveToBookmark(result.getBookmark());
    rc.setEndPoint("EndToStart", re);
    return {
      start: rc.text.length,
      end: rc.text.length + result.text.length,
      length: result.text.length,
      text: result.text,
    };
  } else {
    return null;
  }
};
// 计算样式映射(参数:文本域中文字,光标字符位置)
export const getSelectionText = (text, start) => {
  let result = delString(text, start + 1, text.length + 1);
  if (result) {
    result = JSON.stringify(result);
    result && (result = result.replace(/\\n/g, "<br>"));
    result = JSON.parse(result);
  }
  return result;
};
// 返回光标状态
export const getSelection = (textarea) => {
  if (!textarea) return;
  const result = getSelectionStatus(textarea);
  const { left, top } = getSelectionCoordinate(textarea);
  result.left = left;
  result.top = top;
  const selectionText = getSelectionText(textarea.value, result.start);
  return { result, selectionText };
};
// #endregion

// #region 类型
// 根据URL返回文件类型
export const getFileTagByUrl = (url) => {
  const type = url.split(".").pop();
  const typeArr = ["jpg", "jpeg", "png", "gif", "jfif"];
  if (typeArr.findIndex((item) => type === item) !== -1) {
    return "img";
  }
  if (type === "mp4") {
    return "video";
  }
};
// 判断类型
export const getType = (value) => {
  if (Number.isNaN(value)) {
    return "NaN";
  }
  const type = toString.call(value);
  // eslint-disable-next-line no-useless-escape
  const reg = /\\|\/|\?|\？|\*|\"|\“|\”|\'|\‘|\’|\<|\>|\{|\}|\[|\]|\【|\】|\：|\:|\、|\^|\$|\!|\~|\`|\|/g;
  return type.replace(reg, "").split(" ")[1];
};
// 判断工具 如typeTool.isArray([])调用某一类型判断
export const typeTool = {
  typeMap: ["Array", "Object", "Number", "String", "Boolean", "Undefined", "Null", "NaN", "Bigint", "Symbol", "Blob"],
};
typeTool.typeMap.forEach((i) => {
  typeTool[`is${i}`] = (value) => {
    return getType(value) === i;
  };
});
// 判断所有类型
export const checkAllTypes = (value) => {
  console.log("isArray? ", typeTool.isArray(value));
  console.log("isObject? ", typeTool.isObject(value));
  console.log("isNumber? ", typeTool.isNumber(value));
  console.log("isString? ", typeTool.isString(value));
  console.log("isBoolean? ", typeTool.isBoolean(value));
  console.log("isUndefined? ", typeTool.isUndefined(value));
  console.log("isNull? ", typeTool.isNull(value));
  console.log("isNaN? ", typeTool.isNaN(value));
  console.log("isBigint? ", typeTool.isBigint(value));
  console.log("isSymbol? ", typeTool.isSymbol(value));
  console.log("isBlob? ", typeTool.isBlob(value));
};
// #endregion

// #region 数据
// 初始化选择器
export const initOptions = (arr, label, value) => {
  return arr.map((i) => ({
    label: i[label],
    value: i[value] || i[label],
  }));
};
// 初始化选择器 使用纯对象
export const initOptionsObj = (arr, label, value) => {
  const res = [];
  for (const i in arr) {
    res.push({
      label: arr[i][label],
      value: arr[i][value] || arr[i][label],
    });
  }
  return res;
};
// 初始化选择器 使用纯数组
export const initOptionsPure = (arr) => {
  return arr.map((i) => ({
    label: i,
    value: i,
  }));
};
// 初始化类型数据 (传入defaultKey数组以设置默认属性,避免undefined导致报错)
// export const couponType = { 0: { t: "i.couponType0" } };
// initType(couponType, ["t"]);
// console.log(couponType.get(0)); // i.couponType0
export const initType = (obj, defaultKey = []) => {
  Object.defineProperty(obj, "get", {
    get: () => {
      return (val) => {
        let item = {};
        for (const i of defaultKey) {
          item[i] = null;
        }
        for (let i in obj) {
          if (i == val) {
            item = obj[i];
          }
        }
        return item;
      };
    },
  });
};
// 初始化请求数据(请求体，字段数组，目标),空值不处理
export const initRequestData = (requestData, indexArray, formData) => {
  indexArray.forEach((i) => {
    formData[i] && (requestData[i] = formData[i]);
  });
  return requestData;
};
// 初始化请求数据(请求体，字段数组，目标),空值也处理
export const initRequestDataAll = (requestData, indexArray, formData) => {
  indexArray.forEach((i) => {
    requestData[i] = formData[i];
  });
  return requestData;
};
// 初始化请求数据(请求体，字段数组，目标),只构建变化的字段(优先使用请求体字段且不改变请求体)
export const initRequestDataLimit = (requestData, indexArray, formData) => {
  const result = {};
  indexArray.forEach((i) => {
    if (requestData[i] !== formData[i]) {
      result[i] = requestData[i];
    }
  });
  return result;
};
// 地址路径转对象
export const getRouteObj = (url) => {
  const routeObj = {
    path: url.split("#")[1],
    query: {},
  };
  const queryStr = routeObj.path.split("?")[1];
  if (queryStr) {
    const queryArr = queryStr.split("&");
    queryArr.forEach((i) => {
      routeObj.query[i.split("=")[0]] = i.split("=")[1];
    });
  }
  return routeObj;
};
// 对象转地址路径
export const setRouteObj = (data) => {
  let res = "?";
  for (const i in data) {
    res = res + i + "=" + data[i] + "&";
  }
  return res.slice(0, -1);
};
// 格式化流量数据
export const getll = (val) => {
  let size = null;
  let num = parseInt(val);
  if (num >= 1024 * 1024) {
    num = num / 1024 / 1024;
    size = "GB";
  } else if (num >= 1024) {
    num = num / 1024;
    size = "MB";
  } else {
    size = "KB";
  }
  return initNum(num, 2) + size;
};
// #endregion

// #region 工具
// 文件类型大小判断
export const fileValidate = (file) => {
  const mb = file.size / 1024 / 1024;
  const fileTypeList = ["audio/mp3", "audio/mp4", "audio/mpeg", "audio/mpga", "audio/x-m4a", "audio/wav", "audio/webm"];
  const validate = fileTypeList.indexOf(file.type) !== -1 && mb < 25;
  return validate;
};
// 加密 加密流程：转JSON -> 作为URI组件进行编码 -> 转base-64
export const encipher = (data) => {
  return window.btoa(encodeURIComponent(JSON.stringify(data)));
};
// 解密
export const decrypt = (data) => {
  return JSON.parse(decodeURIComponent(window.atob(data)));
};
// 节流 (参数:回调方法，时间) 在一定时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
export const throttle = (fun, delay) => {
  let flag = true;
  return () => {
    if (!flag) return;
    fun.apply(this, arguments);
    flag = false;
    setTimeout(() => {
      flag = true;
    }, delay);
  };
};
/*
// 节流Vue3的使用方法
const test = throttle(() => {
  console.log(1)
}, 1000)
// 节流Vue2的使用方法
methods: {
  test: throttle(() => {
    console.log(1)
  }, 1000)
}
*/
// 防抖 (参数:回调方法，时间) 当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次
export const debounce = (fun, delay) => {
  clearTimeout(window.timer);
  window.timer = setTimeout(() => {
    fun();
  }, delay);
};
// 计时器
export class timer {
  constructor(time = 0) {
    this.time = time;
  }
  get() {
    return this.time;
  }
  set(time) {
    this.time = time;
  }
  sta(time) {
    if (time) this.time = time;
    this.timer = setInterval(() => {
      if (this.time === 0) clearInterval(this.timer);
      else this.time--;
    }, 1000);
  }
  pau() {
    if (this.timer) clearInterval(this.timer);
  }
  del() {
    this.time = 0;
    if (this.timer) clearInterval(this.timer);
  }
}
// 封装storage
export const storage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  del(key) {
    localStorage.removeItem(key);
  },
};
// 封装cookie
export const cookie = {
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
};
// 代码中间插入延迟
export const wait = async (time = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
/*
// 插入延迟使用方法
const test = async () => {
  await wait(1000);
  console.log(1);
};
*/
// 数据结构判断
export const isStructure = (data, index = 0) => {
  console.log(index, getType(data), getLength(data));
  if (typeTool.isArray(data) || typeTool.isObject(data)) {
    isStructure(getFirstValue(data), index + 1);
  } else if (typeTool.isString(data) || typeTool.isNumber(data) || typeTool.isBoolean(data) || typeTool.isNull(data) || typeTool.isUndefined(data)) {
    console.log("end");
  }
};
// 返回第一个键值
export const getFirstValue = (value) => {
  if (typeTool.isArray(value) || typeTool.isString(value)) {
    return value[0];
  }
  if (typeTool.isNumber(value)) {
    return value.toString()[0];
  }
  if (typeTool.isObject(value)) {
    return value[Object.keys(value)[0]];
  }
};
// 长度判断
export const getLength = (value) => {
  if (typeTool.isArray(value) || typeTool.isString(value)) {
    return value.length;
  }
  if (typeTool.isObject(value)) {
    return Object.keys(value).length;
  }
  if (typeTool.isNumber(value)) {
    return value.toString().length;
  }
};
// console.log拦截再封装
export const rewritetConsole = () => {
  const consoleLog = console.log;
  console.log = (...args) => {
    consoleLog.apply(console, [`🔥🔥🔥---[${dateTool().base0.fullDate}]---[${window.location.hash}]---🔥🔥🔥\n`, ...args]);
  };
};
// 封装consolo.log方法
export const log = (msg, label = null) => {
  if (typeTool.isArray(msg)) {
    msg.forEach((item, index) => {
      if (label) {
        console.log(`${item[label]}:`, item);
      } else {
        console.log(`${index}:`, item);
      }
    });
  } else if (typeTool.isObject(msg)) {
    for (const i in msg) {
      console.log(`${i}:`, msg[i]);
    }
  } else {
    console.log(msg);
  }
};
// 冒泡排序
export const bubbleSort = (arr) => {
  const array = arr;
  let t = 0;
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        t = array[j];
        array[j] = array[j + 1];
        array[j + 1] = t;
      }
    }
  }
  return array;
};
// #endregion

// #region 客户端
// 判断微信/QQ浏览器
export const getBrowser = () => {
  const url = navigator.userAgent.toLowerCase();
  if (url.indexOf("15b202 qq") > -1) {
    console.log("QQ 内置浏览器");
  }
  if (url.indexOf("micromessenger") > -1) {
    console.log("微信 内置浏览器");
  }
  if (url.indexOf("15b202") > -1) {
    console.log("QQ和微信 内置浏览器");
  }
};
// 判断当前路径
export const getRoad = () => {
  return window.location.href;
};
// 判断当前是否含有某个字段
export const hasUrl = (s) => {
  return findString(window.location.href, s)[0] !== undefined;
};
// 判断安卓
export const isPC = () => {
  const userAgentInfo = navigator.userAgent;
  const Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  let flagPc = true;
  for (const i of Agents) {
    if (userAgentInfo.indexOf(i) > 0) {
      flagPc = false;
      break;
    }
  }
  return flagPc;
};
// 判断安卓
export const isAndroid = () => {
  var u = navigator.userAgent;
  if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
    return true;
  }
  return false;
};
// 判断ios
export const isIos = () => {
  var u = navigator.userAgent;
  if (u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1) {
    return true;
  }
  return false;
};
//根据URL下载图片(地址,图片名)
export const downloadIamge = (imgsrc, name) => {
  let image = new Image();
  // 解决跨域 Canvas 污染问题
  image.setAttribute("crossOrigin", "anonymous");
  image.onload = function () {
    let canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    let context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height);
    let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
    let a = document.createElement("a"); // 生成一个a元素
    let event = new MouseEvent("click"); // 创建一个单击事件
    a.download = name || "photo"; // 设置图片名称
    a.href = url; // 将生成的URL设置为a.href属性
    a.dispatchEvent(event); // 触发a的单击事件
  };
  image.src = imgsrc;
};
// #endregion

// #region 请求
// 请求图片 getImg(obj:{method:'get',url:'',async:true,params:null,header: { 'header-label': 'header-value' }}).then(r=>r)
export const getImg = (obj) => {
  if (!obj || !obj.url) return "";
  obj.method = obj.method || "get"; // 请求方法，默认get
  obj.async = obj.hasOwnProperty("async") ? obj.async : true; // 是否异步发送，默认true
  const response = new XMLHttpRequest();
  response.open(obj.method, obj.url, obj.async);
  response.withCredentials = true; // 跨域发送cookie
  response.responseType = "blob"; // 二进制数据
  // response.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded') // 跨域
  // response.setRequestHeader('Access-Control-Allow-Origin', '*'); // 跨域
  if (obj.header) {
    for (const i in obj.header) {
      response.setRequestHeader(i, obj.header[i]);
    }
  }
  response.send(obj.params ? obj.params : null);
  return new Promise((resolve, reject) => {
    response.onreadystatechange = () => {
      if (response.readyState === 4) {
        if (response.status >= 200 && response.status < 300) {
          resolve(window.URL.createObjectURL(response.response));
        } else {
          reject("");
        }
      }
    };
  });
};

// 下载二进制文件 （参数：响应体,文件名） 响应体有config,data,headers,request,status,statusTest 其中data是blob类型
// 使用 downLoadFile(await api(params));
export const downLoadFile = (response, name = "") => {
  let fileName = "";
  try {
    fileName = response.headers["content-disposition"].split("=")[1];
  } catch (e) {
    fileName = "download" + name;
  }
  const blob = new Blob([response.data]);
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); //下载完成移除元素
  window.URL.revokeObjectURL(url); //释放掉blob对象
};
// 获取本机IP地址方法2(ios报错) 与方法2返回的ip不一样，估计是外网ip
// const test = async () => {
//  const ip= await getIP();
//   console.log(ip);
// };
export const getIP = () => {
  let ip = "";
  var ip_dups = {};
  var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
  var useWebKit = !!window.webkitRTCPeerConnection;
  var mediaConstraints = {
    optional: [{ RtpDataChannels: true }],
  };
  var servers = {
    iceServers: [{ urls: "stun:stun.services.mozilla.com" }, { urls: "stun:stun.l.google.com:19302" }],
  };
  var pc = new RTCPeerConnection(servers, mediaConstraints);
  function handleCandidate(candidate) {
    var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
    var hasIp = ip_regex.exec(candidate);
    if (hasIp) {
      var ip_addr = ip_regex.exec(candidate)[1];
      if (ip_dups[ip_addr] === undefined) {
        ip = ip_addr;
      }
      ip_dups[ip_addr] = true;
    }
  }
  pc.onicecandidate = function (ice) {
    if (ice.candidate) {
      handleCandidate(ice.candidate.candidate);
    }
  };
  pc.createDataChannel("");
  pc.createOffer(
    function (result) {
      pc.setLocalDescription(
        result,
        function () {},
        function () {}
      );
    },
    function () {}
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      var lines = pc.localDescription.sdp.split("\n");
      lines.forEach(function (line) {
        if (line.indexOf("a=candidate:") === 0) handleCandidate(line);
      });
      resolve(ip);
    }, 500);
  });
};
// 获取本机IP地址方法2 返回内网ip
// const test = async () => {
//  const ip= await getIP2();
//   console.log(ip);
// };
export const getIP2 = () => {
  return new Promise((resolve) => {
    window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    const pc = new RTCPeerConnection({ iceServers: [] }),
      noop = function () {};
    pc.createDataChannel("");
    pc.createOffer(pc.setLocalDescription.bind(pc), noop);
    pc.onicecandidate = function (ice) {
      if (ice && ice.candidate && ice.candidate.candidate) {
        const ip = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
        resolve(ip);
        pc.onicecandidate = noop;
      }
    };
  });
};
// #endregion
