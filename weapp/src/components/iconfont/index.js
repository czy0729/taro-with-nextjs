/*
 * @Author: czy0729
 * @Date: 2019-06-14 11:57:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-25 16:02:02
 */
import React from 'react'
import { Text } from '@tarojs/components'
import { sfc, c, px } from '@/utils'

function Iconfont({ className, style, name, onClick }) {
  let minWidth = 0
  try {
    const temp = className.match(/t-\d+/g)
    if (temp[0]) {
      minWidth = px(parseInt(temp[0].replace('t-', '')))
    }
  } catch (error) {
    // do nothing
  }

  return (
    <Text
      className={c('iconfont', `icon-${name}`, className)}
      style={{
        minWidth,
        ...style
      }}
      onClick={onClick}
    />
  )
}

export default sfc(Iconfont, {
  className: '',
  style: {},
  name: '',
  onClick: Function.prototype
})
