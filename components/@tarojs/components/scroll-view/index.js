/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/*
 * https://github1s.com/NervJS/taro/blob/HEAD/packages/taro-components/src/components/scroll-view/scroll-view.tsx
 *
 * @Author: czy0729
 * @Date: 2021-02-24 16:37:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-27 21:30:14
 */
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { c } from '@/utils'

function debounce(fn, delay) {
  let timer

  return function (...arrs) {
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn(...arrs)
    }, delay)
  }
}

export default class ScrollView extends Component {
  static defaultProps = {
    scrollX: false,
    scrollY: false,
    upperThreshold: 50,
    lowerThreshold: 50,
    // scrollTop: false,
    // scrollLeft: false,
    // scrollIntoView: false,
    // scrollWithAnimation: false,
    onScroll: Function.prototype,
    onScrollToLower: Function.prototype,
    onScrollToUpper: Function.prototype
  }

  _scrollLeft
  _scrollTop

  handleScroll = e => {
    if (e instanceof window.CustomEvent) return

    const { scrollLeft, scrollTop } = e.target
    this._scrollLeft = scrollLeft
    this._scrollTop = scrollTop

    this.uperAndLower(e)

    const { onScroll } = this.props
    onScroll({
      detail: e.target
    })
  }

  uperAndLower = debounce(e => {
    const {
      offsetWidth,
      offsetHeight,
      scrollLeft,
      scrollTop,
      scrollHeight,
      scrollWidth
    } = e.target
    const {
      scrollY,
      scrollX,
      lowerThreshold: l,
      upperThreshold: u,
      onScrollToLower,
      onScrollToUpper
    } = this.props
    const lowerThreshold = Number(l)
    const upperThreshold = Number(u)

    if (
      !isNaN(lowerThreshold) &&
      ((scrollY && offsetHeight + scrollTop + lowerThreshold >= scrollHeight) ||
        (scrollX && offsetWidth + scrollLeft + lowerThreshold >= scrollWidth))
    ) {
      onScrollToLower(e)
    }

    if (
      !isNaN(upperThreshold) &&
      ((scrollY && scrollTop <= upperThreshold) ||
        (scrollX && scrollLeft <= upperThreshold))
    ) {
      onScrollToUpper(e)
    }
  }, 200)

  render() {
    const { className, style, children, scrollX, scrollY } = this.props
    return (
      <View
        className={c(
          {
            'taro-scroll-view__scroll-x': scrollX,
            'taro-scroll-view__scroll-y': scrollY
          },
          className
        )}
        style={style}
        onScroll={this.handleScroll}
      >
        {children}
      </View>
    )
  }
}
