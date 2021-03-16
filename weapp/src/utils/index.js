/*
 * @Author: czy0729
 * @Date: 2021-02-24 18:24:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-16 16:51:21
 */
import Taro from '@tarojs/taro'
import {
  observer
  // inject
} from '@tarojs/mobx'
import { observable, computed } from 'mobx'
import classNames from 'classnames'
import { push, replace, back, getQuery } from '@/components/link'
import { WEAPP, H5, BROWSER, IOS } from '@/constants'

export { observer, computed, observable, push, replace, back, getQuery }

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
    .map(key => (query[key] ? `${key}=${query[key]}` : null))
    .filter(item => !!item)
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

/**
 * 异步加载js
 * @param {*} src
 */
export function loadScript(src) {
  if (!BROWSER) {
    return false
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.async = false
    script.onload = () => resolve(true)
    script.onerror = () => reject()
    document.body.appendChild(script)
  })
}

/**
 * 补零
 * @version 190301 1.0
 * @param {*} n
 * @param {*} c
 */
export function pad(n, count) {
  if (String(n).length < count) {
    return new Array(++count - n.length).join('0') + n
  }
  return n
}

/**
 * 和PHP一样的时间戳格式化函数
 * @version 160421 1.0
 * @version 170104 1.1 变得可以省略format
 * @param  {String} format    格式化格式
 * @param  {Int}    timestamp 时间戳
 * @return {String}
 */
/* eslint-disable */
export function date(format, timestamp) {
  // 假如第二个参数不存在，第一个参数作为timestamp
  if (!timestamp) {
    timestamp = format
    format = 'Y-m-d H:i:s'
  }

  let jsdate = timestamp ? new Date(timestamp * 1000) : new Date()
  let txt_weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  let txt_ordin = {
    1: 'st',
    2: 'nd',
    3: 'rd',
    21: 'st',
    22: 'nd',
    23: 'rd',
    31: 'st'
  }
  let txt_months = [
    '',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  let f = {
    d: function () {
      return pad(f.j(), 2)
    },
    D: function () {
      t = f.l()
      return t.substr(0, 3)
    },
    j: function () {
      return jsdate.getDate()
    },
    l: function () {
      return txt_weekdays[f.w()]
    },
    N: function () {
      return f.w() + 1
    },
    S: function () {
      return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'
    },
    w: function () {
      return jsdate.getDay()
    },
    z: function () {
      return (
        ((jsdate - new Date(jsdate.getFullYear() + '/1/1')) / 86400000) >> 0
      )
    },
    W: function () {
      let a = f.z(),
        b = 364 + f.L() - a
      let nd2,
        nd = (new Date(jsdate.getFullYear() + '/1/1').getDay() || 7) - 1
      if (b <= 2 && (jsdate.getDay() || 7) - 1 <= 2 - b) {
        return 1
      } else {
        if (a <= 2 && nd >= 4 && a >= 6 - nd) {
          nd2 = new Date(jsdate.getFullYear() - 1 + '/12/31')
          return date('W', Math.round(nd2.getTime() / 1000))
        } else {
          return (1 + (nd <= 3 ? (a + nd) / 7 : (a - (7 - nd)) / 7)) >> 0
        }
      }
    },
    F: function () {
      return txt_months[f.n()]
    },
    m: function () {
      return pad(f.n(), 2)
    },
    M: function () {
      t = f.F()
      return t.substr(0, 3)
    },
    n: function () {
      return jsdate.getMonth() + 1
    },
    t: function () {
      let n
      if ((n = jsdate.getMonth() + 1) == 2) {
        return 28 + f.L()
      } else {
        if ((n & 1 && n < 8) || (!(n & 1) && n > 7)) {
          return 31
        } else {
          return 30
        }
      }
    },
    L: function () {
      let y = f.Y()
      return !(y & 3) && (y % 100 || !(y % 400)) ? 1 : 0
    },
    Y: function () {
      return jsdate.getFullYear()
    },
    y: function () {
      return (jsdate.getFullYear() + '').slice(2)
    },
    a: function () {
      return jsdate.getHours() > 11 ? 'pm' : 'am'
    },
    A: function () {
      return f.a().toUpperCase()
    },
    B: function () {
      let off = (jsdate.getTimezoneOffset() + 60) * 60
      let theSeconds =
        jsdate.getHours() * 3600 +
        jsdate.getMinutes() * 60 +
        jsdate.getSeconds() +
        off
      let beat = Math.floor(theSeconds / 86.4)
      if (beat > 1000) {
        beat -= 1000
      }
      if (beat < 0) {
        beat += 1000
      }
      if (String(beat).length == 1) {
        beat = '00' + beat
      }
      if (String(beat).length == 2) {
        beat = '0' + beat
      }
      return beat
    },
    g: function () {
      return jsdate.getHours() % 12 || 12
    },
    G: function () {
      return jsdate.getHours()
    },
    h: function () {
      return pad(f.g(), 2)
    },
    H: function () {
      return pad(jsdate.getHours(), 2)
    },
    i: function () {
      return pad(jsdate.getMinutes(), 2)
    },
    s: function () {
      return pad(jsdate.getSeconds(), 2)
    },
    O: function () {
      let t = pad(Math.abs((jsdate.getTimezoneOffset() / 60) * 100), 4)
      if (jsdate.getTimezoneOffset() > 0) {
        t = '-' + t
      } else {
        t = '+' + t
      }
      return t
    },
    P: function () {
      let O = f.O()
      return O.substr(0, 3) + ':' + O.substr(3, 2)
    },
    c: function () {
      return (
        f.Y() +
        '-' +
        f.m() +
        '-' +
        f.d() +
        'T' +
        f.h() +
        ':' +
        f.i() +
        ':' +
        f.s() +
        f.P()
      )
    },
    U: function () {
      return Math.round(jsdate.getTime() / 1000)
    }
  }
  return format.replace(/[\\]?([a-zA-Z])/g, function (t, s) {
    let ret = ''
    if (t != s) {
      ret = s
    } else {
      if (f[s]) {
        ret = f[s]()
      } else {
        ret = s
      }
    }
    return ret
  })
}
/* eslint-enable */

/**
 * 时间戳距离现在时间的描述
 * @param  {String} *timestamp         时间戳
 * @param  {String} overDaysToShowTime 多少天之后就显示具体时间
 * @return {String} simple             简单模式
 */
export function lastDate(timestamp, overDaysToShowTime = 365, simple = true) {
  const d = new Date(timestamp * 1000)
  const _date = `${d.getFullYear()}/${
    d.getMonth() + 1
  }/${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
  const dateTime = new Date(_date)
  const currentTime = new Date()

  if (overDaysToShowTime) {
    if (
      Math.floor((currentTime - d) / 1000 / (60 * 60 * 24)) > overDaysToShowTime
    ) {
      return date(timestamp)
    }
  }

  let totalTime = currentTime.getTime() - dateTime.getTime()
  let _
  let minutes
  const getNumber = () => Math.floor(totalTime / _)
  const modTimestamp = () => totalTime % _

  _ = 1000 * 60 * 60 * 24
  const days = getNumber()

  _ = 1000 * 60 * 60
  const hours = getNumber()
  totalTime = modTimestamp()

  if (days > 0 || hours > 24) return date('Y.n.j H:i', timestamp)
  // return simple ? `${days}天前` : `${days}天${hours}时前`

  if (hours > 0) return simple ? `${hours}小时前` : `${hours}小时${minutes}分前`

  _ = 1000 * 60
  minutes = getNumber()
  totalTime = modTimestamp()
  if (minutes > 0) return `${minutes}分钟前`

  return '刚刚'
}
