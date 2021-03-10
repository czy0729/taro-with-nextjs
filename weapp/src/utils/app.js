/*
 * @Author: czy0729
 * @Date: 2021-02-26 22:44:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-01 14:16:35
 */
import { push, replace } from '@/components/link'

/**
 * 判断是否登录并跳转到登陆
 */
export function toLogin() {}

/**
 * 根据model获取项目对应地址
 * @param {*} item
 */
const contentModels = {
  case: 'case/detail',
  images: 'photos/detail',
  video: 'video/detail',
  product: 'item/user',
  zhanting: 'box/detail',
  project: 'project/detail'
}
export function getAppLocation(model) {
  return contentModels[model] || 'news/detail'
}

/**
 * 根据model跳转项目对应地址
 * @param {*} item
 */
export function appLocation(item, action = 'push') {
  const model = item.model || item.type
  if (model === 'zt/forum5th') {
    push('zt/forum5th')
    return true
  }

  if (['jinnang', 'jnjcb'].includes(model)) {
    window.location = `https://www.elicht.com/h5/view/${item.id}.html`
    return true
  }

  const fn = action === 'push' ? push : replace
  return fn(getAppLocation(model), {
    id: item.id
  })
}
