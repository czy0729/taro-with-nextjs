/*
 * @Author: czy0729
 * @Date: 2021-02-25 15:38:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-27 02:49:18
 */
import Taro from '@tarojs/taro'

/* ==================== ENV ==================== */
export const WEAPP = process.env.TARO_ENV === 'weapp'
export const H5 = !WEAPP
export const SERVER = typeof window === 'undefined' && !WEAPP
export const IOS = getOSType() === 0

/* ==================== HOST ==================== */
// export const HOST_API = H5
//   ? window.HOST_API
//   : '' || 'http://m.elicht.yzess.cn/api'
export const HOST_API = 'https://m.elicht.com/api'

/* ==================== DEV ==================== */
export const DEV_CONFIG = {}

/* ==================== SCHEMA ==================== */
// 全局统一列表数据结构
export const LIST_EMPTY = {
  list: [],
  pagination: {
    page: 0,
    pageTotal: 100
  },
  _loaded: false
}
export const LIST_LIMIT = 16

/* ==================== OTHER ==================== */
function getOSType() {
  if (SERVER) {
    return -1
  }

  if (H5) {
    const u = navigator.userAgent
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (isIOS) return 0
    if (isAndroid) return 1
    return -1
  }

  const { platform } = Taro.getSystemInfoSync()
  if (platform === 'ios') return 0
  if (platform === 'android') return 1
  return -1
}
