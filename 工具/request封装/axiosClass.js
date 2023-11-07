import axios from 'axios' // 导入axios

let requestMethod = null //请求载体
const pending = new Map() // 声明一个 Map 用于存储每个请求的标识 和 取消函数

export class Request {
  /**
   * 构造方法
   * @param {String} baseURL [默认接口地址]
   * @param {Number} timeout [超时时间 15000]
   * @param {boolean} clear [是否取消重复请求 false]
   */
  constructor(baseURL, timeout, clear) {
    axios.defaults.baseURL = baseURL
    axios.defaults.timeout = timeout ? timeout : 15000

    // 请求拦截
    axios.interceptors.request.use(
      (config) => {
        if (clear) {
          removePending(config) // 在请求开始前，对之前的请求做检查取消操作
          addPending(config) // 将当前请求添加到 pending 中
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // 响应拦截
    axios.interceptors.response.use(
      (response) => {
        if (clear) removePending(response) // 在请求结束后，移除本次请求
        if (response.status === 200 && response.data) {
          if (response.data.code === 200) {
            console.log(response.data)
            // 过滤数据
            return Promise.resolve(response.data)
          } else {
            return Promise.reject(response.data)
          }
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

    requestMethod = function (url, data, config, method) {
      return new Promise((resolve, reject) => {
        axios[method](url, data, config)
          .then((res) => {
            resolve(res.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }

  /**
   * get方法，对应get请求，自动过滤列表数据
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   * @param {Object} config [配置]
   */
  get(url, params, config) {
    return requestMethod(url, { params }, config, 'get')
  }

  /**
   * post方法，对应post请求
   * @param {String} url [请求的url地址]
   * @param {Object} data [请求时携带的参数]
   * @param {Object} config [配置]
   */
  post(url, data, config) {
    return requestMethod(url, data, config, 'post')
  }
}

/**
 * 添加请求
 * @param {Object} config
 */
const addPending = (config) => {
  const url = [config.method, config.url, JSON.stringify(config.params), JSON.stringify(config.data)].join('&')
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pending.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        pending.set(url, cancel)
      }
    })
}

/**
 * 移除请求
 * @param {Object} config
 */
const removePending = (config) => {
  const url = [config.method, config.url, JSON.stringify(config.params), JSON.stringify(config.data)].join('&')
  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}

/**
 * 清空 pending 中的请求（在路由跳转时调用）优化请求带宽
 */
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url)
  }
  pending.clear()
}
