/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/*
 * @Author: czy0729
 * @Date: 2021-02-26 20:39:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-26 23:29:38
 */
import { shouleBeObject, getParameterError } from '../utils'

export function setStorage(options) {
  // options must be an Object
  const isObject = shouleBeObject(options)
  if (!isObject.res) {
    const res = { errMsg: `setStorage${isObject.msg}` }
    console.error(res.errMsg)
    return Promise.reject(res)
  }

  const { key, data, success, fail, complete } = options
  const res = { errMsg: 'setStorage:ok' }

  if (typeof key !== 'string') {
    res.errMsg = getParameterError({
      name: 'setStorage',
      para: 'key',
      correct: 'String',
      wrong: key
    })
    console.error(res.errMsg)
    typeof fail === 'function' && fail(res)
    typeof complete === 'function' && complete(res)
    return Promise.reject(res)
  }

  setStorageSync(key, data)

  typeof success === 'function' && success(res)
  typeof complete === 'function' && complete(res)

  return Promise.resolve(res)
}

export function setStorageSync(key, data = '') {
  if (typeof key !== 'string') {
    console.error(
      getParameterError({
        name: 'setStorage',
        correct: 'String',
        wrong: key
      })
    )
    return
  }

  const type = typeof data
  let obj = {}

  if (type === 'symbol') {
    obj = { data: '' }
  } else {
    obj = { data }
  }
  localStorage.setItem(key, JSON.stringify(obj))
}

export function getStorage(options) {
  // options must be an Object
  const isObject = shouleBeObject(options)
  if (!isObject.res) {
    const res = { errMsg: `getStorage${isObject.msg}` }
    console.error(res.errMsg)
    return Promise.reject(res)
  }

  const { key, success, fail, complete } = options
  const res = { errMsg: 'getStorage:ok' }

  if (typeof key !== 'string') {
    res.errMsg = getParameterError({
      name: 'getStorage',
      para: 'key',
      correct: 'String',
      wrong: key
    })
    console.error(res.errMsg)
    typeof fail === 'function' && fail(res)
    typeof complete === 'function' && complete(res)
    return Promise.reject(res)
  }

  const { result, data } = getItem(key)
  if (result) {
    res.data = data
  } else {
    res.errMsg = 'getStorage:fail data not found'
    typeof fail === 'function' && fail(res)
    typeof complete === 'function' && complete(res)
    return Promise.reject(res)
  }

  typeof success === 'function' && success(res)
  typeof complete === 'function' && complete(res)

  return Promise.resolve(res)
}

function getItem(key) {
  let item
  try {
    item = JSON.parse(localStorage.getItem(key))
  } catch (e) {
    //
  }

  // 只返回使用 Taro.setStorage API 存储的数据
  // eslint-disable-next-line no-prototype-builtins
  if (item && typeof item === 'object' && item.hasOwnProperty('data')) {
    return { result: true, data: item.data }
  }

  return { result: false }
}
