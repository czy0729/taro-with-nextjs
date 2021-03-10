/*
 * @Author: czy0729
 * @Date: 2020-02-28 17:57:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-01 09:50:06
 */
import React from 'react'
import { View, Text } from '@tarojs/components'
import { sfc, c } from '@/utils'
import styles from './index.module.scss'

function TagDark({ className, type, text }) {
  return (
    <View className={c(styles.tagDark, 'flex flex-justify-center', className)}>
      <Text className={`t-24 l-24 t-${type}`}>{text}</Text>
    </View>
  )
}

export default sfc(TagDark, {
  className: '',
  type: 'plain',
  text: ''
})
