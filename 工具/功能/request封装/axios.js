import axios from 'axios';
import { storage } from './baseTool';

const env = process.env.NODE_ENV; //环境 development test production
// 域名列表
export const areaList = {
  general: {
    development: 'http://general-notice-dev.pay-blox.com:40027',
    test: 'http://general-notice-test.pay-blox.com:40027',
    production: 'http://general-notice.pay-blox.com:40027',
  },
  wifi: {
    development: 'http://wifi-api-h5-dev.pay-blox.com:40027',
    test: 'http://wifi-api-h5-test.pay-blox.com:40027',
    production: 'http://wifi-api-h5.pay-blox.com:40027',
  },
};

// axios.defaults.baseURL = ''  //正式
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
const user = storage.get('user');
if (user && user.token) {
  axios.defaults.headers.authorization = user.token; //token
}

// 允许跨域携带cookie信息
axios.defaults.withCredentials = true;
// 设置超时
axios.defaults.timeout = 5000;

// 请求拦截
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
// 响应拦截
axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状状态码错误处理
  (error) => {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        case 401:
          storage.del('user');
          break;

        // 其他错误，直接抛出错误提示
        default:
      }
    }
    return Promise.reject(error);
  },
);

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
const post = (url, data, area) => {
  return new Promise((resolve, reject) => {
    let urlArea = '';
    if (area) urlArea = areaList[area][env];
    axios({
      method: 'post',
      url: urlArea + url,
      data,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        resolve(err);
      });
  });
};

/**
 * get方法，对应get请求，自动过滤列表数据
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
const get = (url, data, area) => {
  return new Promise((resolve, reject) => {
    let urlArea = '';
    if (area) urlArea = areaList[area][env];
    axios({
      method: 'get',
      url: urlArea + url,
      params: data,
    })
      .then((res) => {
        // 过滤数据
        resolve(res.data);
      })
      .catch((err) => {
        resolve(err);
      });
  });
};

// 请求封装
export { post, get };
