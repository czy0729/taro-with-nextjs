/*
 * @Author: czy0729
 * @Date: 2021-03-16 12:09:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-16 14:01:02
 */
import React from 'react'
import { Button, Text } from '@tarojs/components'
import Iconfont from '@/components/iconfont'
import { sfc, c, titleCase } from '@/utils'
import styles from './index.module.scss'

let isCalled = false
let timer
function callOnceInInterval(functionTobeCalled, interval = 400) {
  if (!isCalled) {
    isCalled = true
    clearTimeout(timer)
    timer = setTimeout(() => {
      isCalled = false
    }, interval)
    return functionTobeCalled()
  }
  return false
}

function CButton({
  className,
  style = null,
  type = 'plain', // 颜色类型
  ghost = false, // 是否透明反白, 通常无边框
  plain = false, // 是否白底, plain优先级大于ghost
  size = 'sm', // 大小 sm 高64px | md 高72px | lg 高80px
  shadow = false, // 是否显示阴影
  loading = false, // 是否loading
  disabled = false, // 是否禁用
  round = false, // 是否圆角
  text = '', // 文字
  textClassName,
  icon = '', // 图标
  iconClassName = 't-32 t-plain', // 图标class名
  delay = true,
  openType = '',
  onGetPhoneNumber,
  onGetUserInfo,
  // onOpendSetting = Function.prototype,
  onClick = Function.prototype,
  children
}) {
  let _type = titleCase(type)
  if (ghost) _type = `Ghost${_type}`
  if (plain) _type = `Plain${_type}`
  return (
    <Button
      className={c(
        styles.btn,
        {
          [styles[`btn${_type}`]]: _type,
          [styles[`btn${size}`]]: size,
          [styles.btnShadow]: shadow,
          [styles.btnRound]: round
        },
        className
      )}
      style={style}
      loading={loading}
      disabled={disabled}
      openType={openType}
      onGetPhoneNumber={onGetPhoneNumber}
      onGetUserInfo={onGetUserInfo}
      onClick={delay ? () => callOnceInInterval(onClick) : onClick}
      lang='zh_CN'
    >
      {!!icon && <Iconfont className={c('mr-8', iconClassName)} name={icon} />}
      <Text
        className={c(
          styles.btnText,
          {
            [styles[`btnText${_type}`]]: _type,
            [styles[`btnText${size}`]]: size,
            [styles.btnTextDisabled]: disabled
          },
          textClassName
        )}
      >
        {text || children}
      </Text>
    </Button>
  )
}

export default sfc(CButton)
