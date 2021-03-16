/*
 * @Doc https://nextjs.org/docs/api-reference/next/link
 * @Author: czy0729
 * @Date: 2021-02-25 10:12:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-16 15:28:11
 */
import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { info } from '@/utils'

function Link({ href, replace: replaceParam, children, onClick, ...other }) {
  const _onClick = e => {
    if (typeof onClick === 'function') {
      onClick(e)
    }

    const navigate = replaceParam ? replace : push
    if (typeof href === 'object') {
      const { pathname, query } = href
      return navigate(pathname, query)
    }

    if (typeof href === 'string') {
      return navigate(href)
    }

    return false
  }

  return (
    <View onClick={_onClick} {...other}>
      {children}
    </View>
  )
}

export default Link

/**
 * 生成url参数
 * @param {*} payload
 * @param {*} encode
 */
export function urlStringify(payload = {}, encode = true) {
  return Object.keys(payload)
    .map(
      key =>
        `${key}=${encode ? encodeURIComponent(payload[key]) : payload[key]}`
    )
    .join('&')
}

/**
 * 小程序路径缩写还原
 *  - product               => /pages/product/index
 *  - product/detail        => /pages/product/detail
 *  - /pages/product/detail => /pages/product/detail
 *
 * @param {*} path
 */
export function getPath(path) {
  if (path.includes('/pages')) return path
  if (path.split('/').length > 1) return `/pages/${path}`
  return `/pages/${path}/index`
}

/**
 * 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。
 * 使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层。
 * @param {*} url
 * @param {*} options
 */
export function push(url, options = {}) {
  if (!url) {
    info('缺少页面')
    return false
  }

  return Taro.navigateTo({
    url: `${getPath(url)}?${urlStringify(options)}`
  })
}

/**
 * @param {*} url
 * @param {*} options
 */
export function replace(url, options = {}) {
  if (!url) {
    info('缺少页面')
    return false
  }

  return Taro.redirectTo({
    url: `${getPath(url)}?${urlStringify(options)}`
  })
}

export function back() {
  return Taro.navigateBack({
    delta: 1
  })
}

/**
 * 获取页面参数
 */
export function getQuery(target) {
  return target.$router.params
}
