/*
 * @Author: czy0729
 * @Date: 2019-07-19 16:50:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-26 17:18:47
 */
import React from 'react'
import { View, Text } from '@tarojs/components'
import CImage from '@/components/c-image'
import { sfc, c } from '@/utils'
import { imageEmpty } from '@/constants/images'
import styles from './index.module.scss'

function Empty({ className, text }) {
  return (
    <View
      className={c(
        styles.empty,
        'flex flex-justify-center flex-column',
        className
      )}
    >
      <CImage src={imageEmpty} mode='aspectFit' width={276} height={197} />
      {!!text && <Text className='t-26 l-40 t-sub mt-20'>{text}</Text>}
    </View>
  )
}

export default sfc(Empty, {
  className: '',
  text: ''
})
