import axios from 'axios'

// axios.defaults.baseURL = ''  //正式
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// 允许跨域携带cookie信息
axios.defaults.withCredentials = true
// 设置超时
axios.defaults.timeout = 5000

// 请求拦截
axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 响应拦截
axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状状态码错误处理
  (error) => {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        case 401:
          break

        // 其他错误，直接抛出错误提示
        default:
      }
    }
    return Promise.reject(error.response)
  }
)

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
const post = (url, data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      data
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * get方法，对应get请求，自动过滤列表数据
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
const get = (url, data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url,
      params: data
    })
      .then((res) => {
        // 过滤数据
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// 请求封装
export { post, get }
