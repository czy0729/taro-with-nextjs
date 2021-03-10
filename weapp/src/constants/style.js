/*
 * @Author: czy0729
 * @Date: 2021-02-25 17:10:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-26 10:57:15
 */
import Taro from '@tarojs/taro'

// 环境
export const { screenWidth, screenHeight } = Taro.getSystemInfoSync()

// 样式
export const colorDanger = '#e6211b'
export const colorBgPlaceholder = 'rgba(243, 243, 243, 1)' // 占位背景色
export const radiusXs = 6 // 圆角最小
export const radiusSm = 12 // 圆角小
