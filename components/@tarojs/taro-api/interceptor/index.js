/*
 * @Author: czy0729
 * @Date: 2021-02-26 23:59:53
 * @Last Modified by:   czy0729
 * @Last Modified time: 2021-02-26 23:59:53
 */
import Chain from './chain'

export default class Link {
  constructor(interceptor) {
    this.taroInterceptor = interceptor
    this.chain = new Chain()
  }

  request(requestParams) {
    this.chain.interceptors = this.chain.interceptors.filter(
      interceptor => interceptor !== this.taroInterceptor
    )
    this.chain.interceptors.push(this.taroInterceptor)
    return this.chain.proceed({ ...requestParams })
  }

  addInterceptor(interceptor) {
    this.chain.interceptors.push(interceptor)
  }

  cleanInterceptors() {
    this.chain = new Chain()
  }
}
