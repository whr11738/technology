import moment from 'moment';

// 近24小时
export const get24h = () => [moment().subtract(24, 'hours').format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')];
// 近3天
export const get3d = () => [moment().subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')];
// 近7天
export const get7d = () => [moment().subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')];
// 近1月
export const get1m = () => [moment().subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')];
// 近半年
export const get6m = () => [moment().subtract(6, 'month').format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')];
// 近1年
export const get1y = () => [moment().subtract(1, 'year').format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')];
// 今年
export const get0y = () => [moment().startOf('year').format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')];
