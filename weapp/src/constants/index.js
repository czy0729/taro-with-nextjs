/*
 * @Author: czy0729
 * @Date: 2021-02-25 15:38:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-16 16:21:45
 */
import Taro from '@tarojs/taro'

/* ==================== ENV ==================== */
export const WEAPP = process.env.TARO_ENV === 'weapp'
export const H5 = !WEAPP
export const SERVER = typeof window === 'undefined' && !WEAPP
export const BROWSER = H5 && !SERVER
export const WX =
  !SERVER && navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
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

export const ASSETS_PATH =
  typeof window === 'undefined' ? '' : `${window.location.origin}/static/h5`
export const MANIFEST = {
  dplayer: '//cdn.jsdelivr.net/npm/dplayer@1.25.1/dist/DPlayer.min.js',
  nativeShare: `${ASSETS_PATH}/js/nativeShare.js`,
  exif: `${ASSETS_PATH}/js/exif.min.js`,
  zxEditor: `${ASSETS_PATH}/js/zx-editor.min.js`,
  zxEditorCSS: `${ASSETS_PATH}/css/zx-editor.min.css`,
  html2canvas:
    '//cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.4/dist/html2canvas.min.js',
  lazyload: '//cdn.jsdelivr.net/npm/lazyload@2.0.0-rc.2/lazyload.js',
  jquery: '//cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js',
  scrollToFixed:
    '//cdn.jsdelivr.net/npm/scrolltofixed@1.0.6/jquery-scrolltofixed-min.js'
}
