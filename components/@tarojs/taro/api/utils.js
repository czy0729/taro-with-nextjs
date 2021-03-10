/* eslint-disable guard-for-in */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/*
 * @Author: czy0729
 * @Date: 2021-02-26 20:37:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-26 23:39:28
 */
export function shouleBeObject(target) {
  if (target && typeof target === 'object') return { res: true }
  return {
    res: false,
    msg: getParameterError({
      correct: 'Object',
      wrong: target
    })
  }
}

export function getParameterError({ name = '', para, correct, wrong }) {
  const parameter = para ? `parameter.${para}` : 'parameter'
  const errorType = upperCaseFirstLetter(wrong === null ? 'Null' : typeof wrong)
  return `${name}:fail parameter error: ${parameter} should be ${correct} instead of ${errorType}`
}

export function errorHandler(fail, complete) {
  return function (res) {
    isFunction(fail) && fail(res)
    isFunction(complete) && complete(res)
    return Promise.reject(res)
  }
}

export function isFunction(obj) {
  return typeof obj === 'function'
}

export function upperCaseFirstLetter(string) {
  if (typeof string !== 'string') return string
  string = string.replace(/^./, match => match.toUpperCase())
  return string
}

export function inlineStyle(style) {
  let res = ''
  for (const attr in style) res += `${attr}: ${style[attr]};`
  if (res.indexOf('display: flex;') >= 0) {
    res += 'display: -webkit-box;display: -webkit-flex;'
  }
  res = res.replace(
    /transform:(.+?);/g,
    (s, $1) => `${s}-webkit-transform:${$1};`
  )
  res = res.replace(
    /flex-direction:(.+?);/g,
    (s, $1) => `${s}-webkit-flex-direction:${$1};`
  )
  return res
}

export function serializeParams(params) {
  if (!params) {
    return ''
  }
  return Object.keys(params)
    .map(
      key =>
        `${encodeURIComponent(key)}=${
          typeof params[key] === 'object'
            ? encodeURIComponent(JSON.stringify(params[key]))
            : encodeURIComponent(params[key])
        }`
    )
    .join('&')
}
