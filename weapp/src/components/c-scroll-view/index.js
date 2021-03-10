/*
 * @Author: czy0729
 * @Date: 2021-02-26 11:22:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-26 11:23:48
 */
import React from 'react'
// import { ScrollView } from '@tarojs/components'
import ListView from '@/components/list-view'
import { sfc } from '@/utils'

function CScrollView({
  className,
  style,
  lowerThreshold,
  scrollTop,
  children,
  onScroll,
  onScrollToLower,
  onPullDownRefresh
}) {
  // if (onPullDownRefresh) {
  return (
    <ListView
      className={className}
      style={style}
      lowerThreshold={lowerThreshold}
      onScroll={onScroll}
      onScrollToLower={onScrollToLower}
      onPullDownRefresh={onPullDownRefresh}
    >
      {children}
    </ListView>
  )
  // }

  // return (
  //   <ScrollView
  //     className={className}
  //     style={style}
  //     scrollY
  //     lowerThreshold={lowerThreshold}
  //     scrollTop={scrollTop}
  //     scrollWithAnimation
  //     onScroll={onScroll}
  //     onScrollToLower={onScrollToLower}
  //   >
  //     {children}
  //   </ScrollView>
  // )
}

export default sfc(CScrollView, {
  className: '',
  style: null,
  lowerThreshold: 400,
  upperThreshold: 100,
  scrollTop: undefined,
  onScroll: Function.prototype,
  onScrollToLower: Function.prototype,
  onPullDownRefresh: null
})
