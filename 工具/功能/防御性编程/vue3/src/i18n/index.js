import { createI18n } from "vue-i18n";
import zh from "./zh";
import en from "./en";
import { storage } from "@/utils/tool";

const messages = {
  zh,
  en,
};
let i18nConfig = {
  locale: "zh",
  legacy: false, //用于指定是否使用旧版的i18n API
  messages,
};

const i18n = createI18n(i18nConfig);

// 更改语言
export const setLang = (val) => {
  storage.set("lang", val);
  i18n.global.locale.value = val;
};
// 获取语言状态
export const getLang = () => {
  return i18n.global.locale.value;
};
//js国际化
export const t = (val) => {
  return i18n.global.t(val);
};

export default i18n;
