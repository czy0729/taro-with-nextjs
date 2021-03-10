/*
 * @Author: czy0729
 * @Date: 2021-02-25 16:11:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-25 19:20:56
 */
import React from 'react'
import { sfc, c, px, oss, titleCase } from '@/utils'
import { imageError } from '@/constants/images'
import styles from './index.module.scss'

function CImage({
  className,
  style,
  src,
  mode,
  width,
  height,
  round,
  radius,
  bg,
  onClick
}) {
  const _style = {
    ...style
  }
  if (width) _style.width = px(width)
  if (height || width) _style.height = px(height || width)
  return (
    <figure
      className={c(
        styles.figure,
        {
          [styles.figureBg]: bg,
          [styles.figureRadiusSm]: radius === 'sm',
          [styles.figureRadiusXs]: radius === 'xs'
        },
        className
      )}
      style={_style}
      onClick={onClick}
    >
      <img
        className={c(
          styles.image,
          {
            [styles.imageRound]: round
          },
          styles[`image${titleCase(mode)}`]
        )}
        src={src.includes('?x-oss-process=') ? src : oss(src)}
        alt=''
        onError={e => {
          e.target.alt = src
          e.target.src = imageError
        }}
      />
    </figure>
  )
}

export default sfc(CImage, {
  className: '',
  style: null,
  src: '', // 路径
  mode: 'aspectFill', // 占满模式 aspectFill | aspectFit
  width: 0, // 宽度
  height: null, // 高度, 不传时使用宽度
  round: false, // 是否圆形
  radius: null, // 圆角 xs | sm
  bg: false, // 是否显示底色
  onClick: Function.prototype // 点击事件
})
