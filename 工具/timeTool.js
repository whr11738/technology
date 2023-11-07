import dayjs from 'dayjs'

// 格式化时间格式
export const dateFormate = (value, format = 'YYYY/MM/DD HH:MM:ss') => {
  return dayjs(value).format(format)
}
// 两个时间的时间差
export const dateDiff = (begin, due) => {
  const date1 = dayjs(begin)
  const date2 = dayjs(due)
  return date1.diff(date2)
}
// 返回时间戳
export const dateValue = (date) => {
  return dayjs(date).valueOf()
}
// 获取两段日期中所有的天
export const getDateList = (start, end) => {
  const getDate = (datestr) => {
    const temp = datestr.split('-')
    const date = new Date(temp[0], temp[1] - 1, temp[2])
    return date
  }
  const dateList = []
  const startTime = getDate(start)
  const endTime = getDate(end)
  while (endTime.getTime() - startTime.getTime() >= 0) {
    const year = startTime.getFullYear()
    const month = startTime.getMonth() + 1 < 10 ? '0' + (startTime.getMonth() + 1) : startTime.getMonth() + 1
    const day = startTime.getDate().toString().length === 1 ? '0' + startTime.getDate() : startTime.getDate()
    dateList.push(year + '-' + month + '-' + day)
    startTime.setDate(startTime.getDate() + 1)
  }
  return dateList
}
// 秒数转化为时分秒
export const formatSeconds = (value) => {
  let second = parseInt(value)
  let minute = 0
  let hour = 0
  if (second >= 60) {
    minute = parseInt(second / 60)
    second = parseInt(second % 60)
    if (minute >= 60) {
      hour = parseInt(minute / 60)
      minute = parseInt(minute % 60)
    }
  }
  const getZero = (v) => {
    return v < 10 ? '0' + v : v
  }
  const h = getZero(parseInt(hour))
  const m = getZero(parseInt(minute))
  const s = getZero(parseInt(second))
  const result = `${h}:${m}:${s}`
  return result
}
