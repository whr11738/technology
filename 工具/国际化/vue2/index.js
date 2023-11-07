import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './zh'
import en from './en'
import { storage } from '@/utils/baseTool'

const messages = {
  zh,
  en
}
let i18nConfig = {
  locale: 'zh',
  messages
}

Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)

// 更改语言
export const setLang = (val) => {
  storage.set('lang', val)
  i18n.locale = val
}
// 获取语言状态
export const getLang = (val) => {
  return i18n.locale
}
//js国际化
export const t = (val) => {
  return i18n.t(val)
}

export default i18n
