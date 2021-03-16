/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:58:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-16 14:35:13
 */
import { configure, extendObservable, computed, action } from 'mobx'
import { getQueryKeyString, toJS } from '@/utils'
import { SERVER, H5 } from '@/constants'

configure({ enforceActions: 'observed' })

export default class Store {
  /**
   * 初始化Store合并约定的SSR数据
   */
  ssr = (data = {}) => {
    if (H5 && !SERVER && this.namespace) {
      return {
        ...data,
        ...(window.__NEXT_DATA__.props.pageProps[this.namespace] || {})
      }
    }

    return data
  }

  /**
   * 生成约定的能初始化Store的SSR数据
   */
  toSSR = (data = {}, query) =>
    toJS({
      props: {
        [this.namespace]: data,
        query
      }
    })

  /**
   * 仿React的setState
   */
  setState = action(state => {
    Object.keys(state).forEach(key => {
      const data = state[key]
      if (!(key in this.state)) {
        // 键值不存在时需手动创建观察
        return extendObservable(this.state, {
          [key]: data
        })
      }

      if (typeof data === 'object' && !Array.isArray(data)) {
        return (this.state[key] = {
          ...this.state[key],
          ...data
        })
      }

      return (this.state[key] = data)
    })
  })

  /**
   * 通过key获取当前query的缓存数据
   *  - 约定缓存接口数据会把query作为key值保存
   *  - 若query没有数据, 会尝试返回key为0的值, 通常放置安全的空结构
   */
  getState = (key, query) => {
    const data = this.state[key]
    return computed(() => data[getQueryKeyString(query)]).get() || data[0]
  }
}
