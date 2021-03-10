/*
 * @Author: czy0729
 * @Date: 2021-02-26 20:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-27 21:33:04
 */
import MobileDetect from 'mobile-detect'
import { SERVER } from '@/constants'

export function getSystemInfoSync() {
  if (SERVER) {
    return {
      brand: '',
      model: '',
      system: '',
      pixelRatio: 2,
      screenWidth: 375,
      screenHeight: 667,
      windowWidth: 375,
      windowHeight: 667,
      version: '',
      statusBarHeight: '',
      platform: '',
      language: '',
      fontSizeSetting: '',
      SDKVersion: ''
    }
  }

  const md = new MobileDetect(navigator.userAgent)
  return {
    brand: md.mobile(), // 手机品牌
    model: md.mobile(), // 手机型号
    system: md.os(), // 操作系统版本
    pixelRatio: window.devicePixelRatio, // 设备像素比
    screenWidth: window.screen.width, // 屏幕宽度
    screenHeight: window.screen.height, // 屏幕高度
    windowWidth: document.documentElement.clientWidth, // 可使用窗口宽度
    windowHeight: document.documentElement.clientHeight, // 可使用窗口高度
    version: '', // 微信版本号
    statusBarHeight: '', // 状态栏的高度
    platform: navigator.platform, // 客户端平台
    language: navigator.language, // 微信设置的语言
    fontSizeSetting: '', // 用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位：px
    SDKVersion: '' // 客户端基础库版本
  }
}
