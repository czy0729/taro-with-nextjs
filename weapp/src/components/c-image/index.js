/*
 * @Author: czy0729
 * @Date: 2021-02-25 16:25:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-25 17:17:30
 */
import React from 'react'
import { View, Image } from '@tarojs/components'
import { c, sfc, px, oss } from '@/utils'
import { imageError } from '@/constants/images'
import {
  screenWidth,
  colorBgPlaceholder,
  radiusXs,
  radiusSm
} from '@/constants/style'
import './index.scss'

const cls = 'c-image'

function CImage({
  className,
  style,
  src,
  mode,
  width,
  height,
  round,
  radius,
  onClick
}) {
  const isAspectFit = mode === 'aspectFit'
  const _style = {
    width: px(width),
    height: px(height || width)
  }
  if (round) _style.borderRadius = px(width)
  if (radius) _style.borderRadius = px(radius === 'sm' ? radiusSm : radiusXs)
  const _src = src.includes('?x-oss-process=') ? src : oss(src)
  return (
    <View
      className={c(cls, className)}
      style={{
        backgroundColor: isAspectFit ? 'transparent' : colorBgPlaceholder,
        ..._style,
        ...style
      }}
      onClick={onClick}
    >
      <Image
        style={_style}
        mode={mode}
        src={_src}
        lazyLoad
        onError={e => {
          e.target.alt = src
          e.target.src = imageError
        }}
      />
    </View>
  )
}

export default sfc(CImage, {
  className: '',
  style: null,
  src: '', // 路径
  mode: 'aspectFill', // 占满模式 aspectFill | aspectFit
  width: screenWidth, // 宽度
  height: null, // 高度, 不传时使用宽度
  round: false, // 是否圆形
  radius: null, // 圆角 xs | sm
  onClick: Function.prototype // 点击事件
})
