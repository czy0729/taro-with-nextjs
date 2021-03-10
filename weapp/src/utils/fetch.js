/*
 * @Author: czy0729
 * @Date: 2021-02-26 22:43:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-27 02:30:32
 */
import Taro from '@tarojs/taro'
import { info } from '@/utils'
import { DEV_CONFIG, WEAPP } from '@/constants'
import { toLogin } from './app'

// eslint-disable-next-line prefer-const
let hasPushLogin = false
let extConfig // 服务商参数

/**
 * 统一请求方法
 * @param {*} param
 */
export default function fetch({
  method = 'GET',
  url,
  data = {},
  header = {},
  onCatch = Function.prototype
}) {
  // const UserStore = require('../stores/user').default
  if (WEAPP && !extConfig) {
    extConfig = Taro.getExtConfigSync ? Taro.getExtConfigSync() : {}
  }

  // data
  const _data = {
    ...extConfig,
    ...data
  }
  Object.keys(DEV_CONFIG).forEach(item => (_data[item] = DEV_CONFIG[item]))

  // header
  const _header = {
    ...header
  }
  // if (!url.includes('!') && UserStore.token) {
  //   _header['X-Token'] = UserStore.token
  // }
  if (method === 'POST') {
    _header['content-type'] = 'application/x-www-form-urlencoded'
  }

  return Taro.request({
    method,
    header: _header,
    url: url.replace('!', ''),
    data: _data
  })
    .then(response => {
      const { message } = response.data
      if (
        typeof message === 'string' &&
        message.toLowerCase().includes('authentication')
      ) {
        // UserStore.updateToken('')
        if (!hasPushLogin) {
          toLogin({
            from: 'fetch'
          })
        }

        setTimeout(() => {
          info('登录过期')
        }, 80)

        return Promise.reject(message)
      }
      return Promise.resolve(safe(response.data))
    })
    .catch(ex => {
      onCatch(ex)

      // eslint-disable-next-line no-console
      console.log(url.replace('!', ''), ex)
      info('接口异常')

      return Promise.reject(ex)
    })
}

/**
 * 接口某些字段为空返回null, 影响到es6函数初始值的正常使用, 统一处理成空字符串
 * @param {*} data
 */
function safe(data) {
  return JSON.parse(JSON.stringify(data).replace(/:null/g, ':""'))
}
