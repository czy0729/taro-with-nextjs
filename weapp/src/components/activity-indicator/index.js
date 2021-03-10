/*
 * @Author: czy0729
 * @Date: 2019-06-13 11:30:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-26 11:02:08
 */
import React from 'react'
import { View } from '@tarojs/components'
import CImage from '@/components/c-image'
import { sfc, c } from '@/utils'
import { imageLoading } from '@/constants/images'
import styles from './index.module.scss'

function ActivityIndicator({ className, style, show, size }) {
  return (
    show && (
      <View className={c(styles.activityIndicator, className)} style={style}>
        <CImage
          src={imageLoading}
          width={size}
          height={size}
          mode='aspectFit'
        />
      </View>
    )
  )
}

export default sfc(ActivityIndicator, {
  className: '',
  style: null,
  show: false,
  size: 60
})
