/*
 * @Author: czy0729
 * @Date: 2021-02-24 18:24:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-01 10:38:43
 */
import Taro from '@tarojs/taro'
import {
  observer
  // inject
} from '@tarojs/mobx'
import { observable, computed } from 'mobx'
import classNames from 'classnames'
import { push, replace } from '@/components/link'
import { WEAPP, H5, IOS } from '@/constants'

export { observer, computed, observable, push, replace }

/**
 * classNames引用 (缩短引用)
 * @param  {...any} arg
 */
export function c(...arg) {
  return classNames(...arg)
}

/**
 * Taro 转单位 (缩短引用)
 * @param  {...any} arg
 */
export function px(size, designWidth = 750) {
  if (H5) {
    return `${
      Math.ceil((((parseInt(size, 10) / 40) * 640) / designWidth) * 10000) /
      10000
    }rem`
  }

  return Taro.pxTransform(size, designWidth)
}

/**
 * 自动补全环境样式单位
 * @param {*} target
 */
export function transform(target) {
  if (H5 || String(target).includes('px')) {
    return target
  }

  return `${target}px`
}

/**
 * 选择OSS图片质量
 * @param {*} url
 * @param {*} w
 */
export function oss(url = '', w = 480) {
  try {
    if (!url) {
      return ''
    }

    if (
      /^((https?:)?\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i.test(
        url
      ) &&
      !url.includes('elicht.com') &&
      !url.includes('eltmall.com') &&
      !url.includes('litku.com')
    ) {
      return url
    }

    if (
      url.includes(`?x-oss-process=style/w${w}`) ||
      (url.indexOf('http') !== 0 && url.indexOf('//') !== 0)
    ) {
      return url
    }

    // 强制复写w
    if (url.includes('?x-oss-process=style/w')) {
      return `${url.split('?')[0]}?x-oss-process=style/w${w}`
    }

    return `${url}?x-oss-process=style/w${w}`
  } catch (error) {
    return url
  }
}

// /**
//  * observer and inject
//  * @param {Component} Component
//  * @param {string} grabStoresFn
//  */
// export function connect(Component, grabStoresFn) {
//   if (grabStoresFn) {
//     return inject(grabStoresFn)(observer(Component))
//   }

//   return observer(Component)
// }

/**
 * stateless function component
 * 无状态组件公用逻辑HOC
 * @param {*} Component
 * @param {*} defaultProps
 */
export function sfc(Component, defaultProps) {
  // eslint-disable-next-line no-param-reassign
  Component.defaultProps = defaultProps

  // 小程序用
  if (WEAPP && Component.isMobxInjector === true) {
    return Component
  }

  return observer(Component)
}

/**
 * 首字母大写
 * @param {*} str
 */
export function titleCase(str = '') {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
}

/**
 * 是否已登录
 * @todo
 */
export function checkLogin() {
  return true
}

/**
 * 返回timestamp
 * @param  {String} date  指定时间，例2018/11/11 00:00:00
 * @return {Int}    时间戳
 */
// eslint-disable-next-line no-shadow
export function getTimestamp(date) {
  if (date) {
    return Math.floor(new Date(date.replace(/-/g, '/')).valueOf() / 1000)
  }
  return Math.floor(new Date().valueOf() / 1000)
}

/**
 * @param {*} key
 */
export function getStorage(key) {
  return Taro.getStorage({ key })
    .then(res => res.data)
    .catch(() => '')
}

/**
 * @param {*} key
 * @param {*} data
 */
export function setStorage(key, data = '') {
  return Taro.setStorage({ key, data })
}

/**
 * 构造query参数key
 * @param {*} query
 */
export function getQueryKeyString(query) {
  if (!query) {
    return 0
  }

  return Object.keys(query)
    .sort((a, b) => a.localeCompare(b))
    .map(key => `${key}=${query[key]}`)
    .join()
}

/**
 * 轻提示
 * @param {*} str
 * @param {*} duration
 */
export function info(str = '', duration = 2400) {
  /**
   * Taro.showToast会把body改成fixed布局
   * 在iOS微信下, 若页面会出现键盘的时候showToast, 键盘收起后屏幕下方会产生空白
   * 需要等到键盘收起来才showToast
   */
  if (IOS) {
    setTimeout(() => {
      Taro.showToast({
        title: str,
        icon: 'none',
        duration
      })
    }, 80)
  } else {
    Taro.showToast({
      title: str,
      icon: 'none',
      duration
    })
  }
}

/**
 * MobX观察数据转换成纯js对象
 * @param {*} data
 */
export function toJS(data) {
  return JSON.parse(JSON.stringify(data))
}

/**
 * pv格式化
 * @param {*} count
 */
export function formatCount(count) {
  if (count >= 100000) return `${Math.floor(count / 10000)}万`
  if (count >= 10000) return `${Math.floor(count / 1000) / 10}万`
  return count
}
